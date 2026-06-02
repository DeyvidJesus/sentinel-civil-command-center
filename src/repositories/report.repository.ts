import { db } from "@/lib/firebase";
import { 
  collection, 
  doc, 
  setDoc, 
  updateDoc, 
  onSnapshot, 
  query, 
  orderBy, 
} from "firebase/firestore";
import { Report } from "@/types";

const COLLECTION_NAME = "reports";

export const reportRepository = {
  /**
   * Listen to real-time updates from the reports collection
   */
  subscribeToReports: (callback: (reports: Report[]) => void) => {
    if (!db) {
      console.warn("Firestore db is not initialized.");
      return () => {};
    }

    const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"));
    
    return onSnapshot(q, (snapshot) => {
      const reports: Report[] = [];
      snapshot.forEach((doc) => {
        reports.push({ id: doc.id, ...doc.data() } as Report);
      });
      callback(reports);
    }, (error) => {
      console.error("Error listening to reports: ", error);
    });
  },

  /**
   * Create a new report
   */
  createReport: async (reportData: Omit<Report, "id" | "createdAt">): Promise<void> => {
    if (!db) throw new Error("Firestore db is not initialized");

    const docRef = doc(collection(db, COLLECTION_NAME)); // Automatically generate ID
    
    await setDoc(docRef, {
      ...reportData,
      createdAt: Date.now(), // Fallback for local sorting before server sync
    });
  },

  /**
   * Update the status of an existing report
   */
  updateReportStatus: async (id: string, status: Report['status']): Promise<void> => {
    if (!db) throw new Error("Firestore db is not initialized");

    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      status,
    });
  }
};
