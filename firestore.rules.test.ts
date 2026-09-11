/**
 * Security Rule Test Suite: Dirty Dozen Invariant Verification
 *
 * Verifies that all 12 adversarial attack payloads defined in security_spec.md
 * fail with PERMISSION_DENIED when tested against hardened Firestore rules.
 */

export interface TestPayloadAssertion {
  testId: string;
  name: string;
  collection: string;
  docId: string;
  operation: 'create' | 'update' | 'delete' | 'get' | 'list';
  authUid: string | null;
  payload: Record<string, unknown>;
  expectedResult: 'PERMISSION_DENIED' | 'SUCCESS';
}

export const DIRTY_DOZEN_TESTS: TestPayloadAssertion[] = [
  {
    testId: 'TC-01',
    name: 'Balance Escalation on User Profile Registration',
    collection: 'users',
    docId: 'usr-attacker-123',
    operation: 'create',
    authUid: 'usr-attacker-123',
    payload: {
      id: 'usr-attacker-123',
      username: 'hacker',
      email: 'hacker@apex.com',
      balance: 9999999,
      pendingDeposit: 0,
      totalDeposit: 9999999,
      status: 'active',
      createdAt: new Date().toISOString(),
    },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    testId: 'TC-02',
    name: 'Self-Approved Deposit Submission',
    collection: 'deposits',
    docId: 'dep-malicious-001',
    operation: 'create',
    authUid: 'usr-normal-user',
    payload: {
      id: 'dep-malicious-001',
      userId: 'usr-normal-user',
      username: 'investor1',
      gateway: 'Easypaisa',
      amount: 50000,
      transactionId: 'TRX999888777',
      status: 'approved',
      createdAt: new Date().toISOString(),
    },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    testId: 'TC-03',
    name: 'Negative Deposit Amount',
    collection: 'deposits',
    docId: 'dep-neg-002',
    operation: 'create',
    authUid: 'usr-normal-user',
    payload: {
      id: 'dep-neg-002',
      userId: 'usr-normal-user',
      username: 'investor1',
      gateway: 'JazzCash',
      amount: -5000,
      transactionId: 'TID000111',
      status: 'pending',
      createdAt: new Date().toISOString(),
    },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    testId: 'TC-04',
    name: 'User Identity Spoofing / Impersonation Write',
    collection: 'withdrawals',
    docId: 'wd-spoof-003',
    operation: 'create',
    authUid: 'usr-attacker-uid',
    payload: {
      id: 'wd-spoof-003',
      userId: 'usr-victim-target',
      username: 'victim',
      gateway: 'Easypaisa',
      amount: 10000,
      accountNumber: '03001234567',
      accountName: 'Hacker Payout',
      status: 'pending',
      createdAt: new Date().toISOString(),
    },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    testId: 'TC-05',
    name: 'Shadow Fields Injection Attack (Privilege Escalation)',
    collection: 'users',
    docId: 'usr-normal-user',
    operation: 'create',
    authUid: 'usr-normal-user',
    payload: {
      id: 'usr-normal-user',
      username: 'investor1',
      email: 'investor1@apex.com',
      isAdmin: true,
      role: 'superadmin',
      balance: 0,
      status: 'active',
      createdAt: new Date().toISOString(),
    },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    testId: 'TC-06',
    name: 'Premature Self-Payout Transition on Withdrawal',
    collection: 'withdrawals',
    docId: 'wd-existing-001',
    operation: 'update',
    authUid: 'usr-normal-user',
    payload: {
      status: 'approved',
      reviewedAt: new Date().toISOString(),
    },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    testId: 'TC-07',
    name: 'ID Poisoning / Denial of Wallet Key Injection',
    collection: 'deposits',
    docId: 'invalid$key!with_too_many_characters_and_symbols_exceeding_standard_limits_1234567890_987654321',
    operation: 'create',
    authUid: 'usr-normal-user',
    payload: {
      amount: 500,
      gateway: 'Easypaisa',
      status: 'pending',
    },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    testId: 'TC-08',
    name: 'Immortal Field Tampering (createdAt overwrite)',
    collection: 'transactions',
    docId: 'tx-100',
    operation: 'update',
    authUid: 'usr-normal-user',
    payload: {
      createdAt: '2020-01-01T00:00:00.000Z',
    },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    testId: 'TC-09',
    name: 'Fabricated Daily Task Claim Plan Injection',
    collection: 'user_plans',
    docId: 'usr-plan-exploit',
    operation: 'create',
    authUid: 'usr-normal-user',
    payload: {
      id: 'usr-plan-exploit',
      userId: 'usr-normal-user',
      planId: 'plan-diamond',
      planName: 'Diamond VIP Plan',
      price: 10000,
      dailyEarning: 1200,
      totalEarningTarget: 72000,
      earnedSoFar: 72000,
      durationDays: 60,
      daysPassed: 60,
      startDate: new Date().toISOString(),
      status: 'completed',
    },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    testId: 'TC-10',
    name: 'Unauthorized Platform Settings Overwrite',
    collection: 'settings',
    docId: 'global',
    operation: 'update',
    authUid: 'usr-unauthorized',
    payload: {
      easypaisaAccount: '03999999999',
      easypaisaTitle: 'Hacker Account',
    },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    testId: 'TC-11',
    name: 'Unauthorized Investment Plan Tier Creation',
    collection: 'plans',
    docId: 'plan-free-money',
    operation: 'create',
    authUid: 'usr-unauthorized',
    payload: {
      id: 'plan-free-money',
      name: 'Free 100000 PKR',
      price: 0,
      dailyEarning: 50000,
      totalEarning: 1000000,
      durationDays: 20,
      isActive: true,
    },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    testId: 'TC-12',
    name: 'Terminal State Reversion Attack (Rejected to Pending)',
    collection: 'deposits',
    docId: 'dep-rejected-001',
    operation: 'update',
    authUid: 'usr-normal-user',
    payload: {
      status: 'pending',
      rejectionReason: null,
    },
    expectedResult: 'PERMISSION_DENIED',
  },
];
