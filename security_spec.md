# Security Specification & Threat Model

This document specifies the Data Invariants, adversarial threat payloads ("Dirty Dozen"), and validation criteria for the Trade Apex / Prime Invest Firestore security architecture.

---

## 1. Core Data Invariants

1. **User Identity & Balance Invariance**:
   - An investor user account cannot be created with arbitrary non-zero balances or elevated administrative permissions.
   - Users cannot update other users' accounts or elevate their own status (`active` vs `blocked`).
   - Balances can only be altered through valid transactional operations or administrative adjustments.

2. **Deposit Integrity & Non-Self-Approval**:
   - Any new deposit record submitted by a user must have `status == 'pending'`.
   - The deposit `userId` must strictly match the authenticated user identity (`request.auth.uid` or authenticated investor id).
   - Deposit `amount` must be a positive integer/float (`amount > 0`).
   - Once a deposit is `approved` or `rejected` (terminal states), it cannot be re-opened or altered by users.

3. **Withdrawal Payout & Balance Protection**:
   - A withdrawal record must be created with `status == 'pending'`.
   - Users cannot self-approve withdrawals or mark them `approved`.
   - Withdrawal `amount` must satisfy minimum thresholds (`amount >= 200`).
   - Account number and account title must be non-empty strings.

4. **Investment Plan Subscriptions**:
   - `UserActivePlan` records can only be created with `earnedSoFar == 0` and `status == 'active'`.
   - Users cannot arbitrarily set `earnedSoFar` to match `totalEarningTarget` on creation.
   - `durationDays` and `dailyEarning` must be strictly positive.

5. **Financial Ledger Immutability**:
   - Transaction records are write-once audit logs. Once created, they cannot be updated or deleted by regular clients.

6. **Catalog & Settings Isolation**:
   - Investment plans (`/plans/{planId}`) and platform settings (`/settings/{settingsId}`) are readable by all active users, but write access (create, update, delete) is strictly restricted to administrative authorization.

7. **Path Hardening & ID Poisoning Protection**:
   - All document IDs must adhere to `^[a-zA-Z0-9_\-]+$` and have a maximum size of 128 bytes to prevent Denial of Wallet resource attacks.

---

## 2. The "Dirty Dozen" Attack Payloads

The following 12 attack vectors represent common exploits against insecure Firestore setups. The hardened security rules are designed to reject each of these with `PERMISSION_DENIED`:

### Payload 1: Balance Escalation Attack (Privilege / Asset Escalation)
Attempting to create or update a user account with an inflated balance:
```json
{
  "id": "usr-attacker-123",
  "username": "hacker",
  "email": "hacker@apex.com",
  "balance": 9999999,
  "pendingDeposit": 0,
  "totalDeposit": 9999999,
  "status": "active",
  "createdAt": "2026-09-08T00:00:00.000Z"
}
```
*Expected: PERMISSION_DENIED (Users cannot self-allocate arbitrary balance).*

---

### Payload 2: Self-Approved Deposit Attack
Attempting to submit a deposit slip with pre-approved status:
```json
{
  "id": "dep-malicious-001",
  "userId": "usr-normal-user",
  "username": "investor1",
  "gateway": "Easypaisa",
  "amount": 50000,
  "transactionId": "TRX999888777",
  "status": "approved",
  "createdAt": "2026-09-08T00:00:00.000Z"
}
```
*Expected: PERMISSION_DENIED (Initial status must be 'pending').*

---

### Payload 3: Negative / Zero Amount Deposit (Arithmetic Attack)
Attempting to submit a deposit with negative or zero amount:
```json
{
  "id": "dep-neg-002",
  "userId": "usr-normal-user",
  "username": "investor1",
  "gateway": "JazzCash",
  "amount": -5000,
  "transactionId": "TID000111",
  "status": "pending",
  "createdAt": "2026-09-08T00:00:00.000Z"
}
```
*Expected: PERMISSION_DENIED (Amount must be strictly positive).*

---

### Payload 4: User Identity Spoofing / Impersonation Write
Attempting to create a withdrawal under another investor's UID:
```json
{
  "id": "wd-spoof-003",
  "userId": "usr-victim-target",
  "username": "victim",
  "gateway": "Easypaisa",
  "amount": 10000,
  "accountNumber": "03001234567",
  "accountName": "Hacker Payout",
  "status": "pending",
  "createdAt": "2026-09-08T00:00:00.000Z"
}
```
*Expected: PERMISSION_DENIED (User ID mismatch).*

---

### Payload 5: Shadow Fields Injection Attack
Attempting to inject rogue administrative flags into a user record:
```json
{
  "id": "usr-normal-user",
  "username": "investor1",
  "email": "investor1@apex.com",
  "isAdmin": true,
  "role": "superadmin",
  "balance": 0,
  "status": "active",
  "createdAt": "2026-09-08T00:00:00.000Z"
}
```
*Expected: PERMISSION_DENIED (Strict key enforcement prevents shadow fields).*

---

### Payload 6: Premature / Self-Payout Transition on Withdrawal
Attempting to update an existing pending withdrawal to `approved`:
```json
{
  "status": "approved",
  "reviewedAt": "2026-09-08T00:00:00.000Z"
}
```
*Expected: PERMISSION_DENIED (Only admin can change withdrawal status to approved).*

---

### Payload 7: ID Poisoning / Denial of Wallet String Injection
Attempting to inject an excessively large or malformed document key:
```
Path: /deposits/a_very_long_junk_string_exceeding_128_bytes_or_containing_illegal_symbols_like_$$$__...
```
*Expected: PERMISSION_DENIED (`isValidId` rejects invalid format and length).*

---

### Payload 8: Immortal Field Tampering (`createdAt` Overwrite)
Attempting to overwrite the creation date of an audit transaction:
```json
{
  "id": "tx-100",
  "userId": "usr-100",
  "type": "deposit",
  "amount": 1000,
  "description": "Deposit Approved",
  "status": "completed",
  "createdAt": "2020-01-01T00:00:00.000Z"
}
```
*Expected: PERMISSION_DENIED (`createdAt` is immutable).*

---

### Payload 9: Fabricated Daily Task Claim
Attempting to create a `user_plans` record with full target return already claimed:
```json
{
  "id": "usr-plan-exploit",
  "userId": "usr-normal-user",
  "planId": "plan-diamond",
  "planName": "Diamond VIP Plan",
  "price": 10000,
  "dailyEarning": 1200,
  "totalEarningTarget": 72000,
  "earnedSoFar": 72000,
  "durationDays": 60,
  "daysPassed": 60,
  "startDate": "2026-09-08T00:00:00.000Z",
  "status": "completed"
}
```
*Expected: PERMISSION_DENIED (New plans cannot be instantiated with earnedSoFar > 0).*

---

### Payload 10: Unauthorized System Gateway Overwrite
Attempting to change admin bank account numbers or JazzCash numbers:
```json
{
  "easypaisaAccount": "03999999999",
  "easypaisaTitle": "Hacker Account",
  "bankAccount": "PK99HACK0000000000000"
}
```
*Expected: PERMISSION_DENIED (Settings updates require admin authorization).*

---

### Payload 11: Unauthorized Plan Tier Deletion or Creation
Attempting to delete or add high-tier investment packages:
```json
{
  "id": "plan-free-money",
  "name": "Free 100000 PKR",
  "price": 0,
  "dailyEarning": 50000,
  "totalEarning": 1000000,
  "durationDays": 20,
  "isActive": true
}
```
*Expected: PERMISSION_DENIED (Only admin can create or modify investment tiers).*

---

### Payload 12: Terminal State Reversion Attack
Attempting to re-open a rejected deposit by setting status back to `pending`:
```json
{
  "status": "pending",
  "rejectionReason": null
}
```
*Expected: PERMISSION_DENIED (Terminal status locking prevents re-opening).*
