import { getDatabase, ref, get } from "firebase/database";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './firebaseConfig'; // ไฟล์ config ของ Firebase ของคุณ

// เริ่มต้น Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export async function fetchData() {
  const dbRef = ref(database, 'DEVICE001/data');
  try {
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data: ", error);
    return null;
  }
}