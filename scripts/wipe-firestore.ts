import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json' with { type: 'json' };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

const collectionsToWipe = ['users', 'deposits', 'withdrawals', 'transactions', 'user_plans'];

async function wipeDatabase() {
  console.log(`Target database: ${firebaseConfig.firestoreDatabaseId}`);
  let totalDeleted = 0;

  for (const colName of collectionsToWipe) {
    try {
      const colRef = collection(db, colName);
      const snapshot = await getDocs(colRef);
      console.log(`Found ${snapshot.size} document(s) in collection: ${colName}`);
      
      for (const docSnap of snapshot.docs) {
        try {
          await deleteDoc(doc(db, colName, docSnap.id));
          console.log(`  Deleted ${colName}/${docSnap.id}`);
          totalDeleted++;
        } catch (e: any) {
          console.error(`  FAILED to delete ${colName}/${docSnap.id}: ${e?.message || e}`);
        }
      }
    } catch (err) {
      console.error(`Error wiping collection ${colName}:`, err);
    }
  }

  console.log(`\nWipe completed successfully! Total documents deleted: ${totalDeleted}`);
  process.exit(0);
}

wipeDatabase().catch((err) => {
  console.error('Fatal error during wipe:', err);
  process.exit(1);
});
