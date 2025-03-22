import { db } from "@/db/firebaseClient";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

const database = {
  async getCollection(collectionName: string) {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  },

  async getDocument(collectionName: string, documentId: string) {
    const docSnap = await getDoc(doc(db, collectionName, documentId));

    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docSnap.id };
    }
  },

  async createDocument<T extends DocumentData>(
    collectionName: string,
    data: T
  ) {
    delete data.id;

    await addDoc(collection(db, collectionName), data);
  },

  async updateDocument<T extends DocumentData>(
    collectionName: string,
    documentId: string,
    data: T
  ) {
    delete data.id;

    await updateDoc(doc(db, collectionName, documentId), data);
  },

  async deleteDocument(collectionName: string, documentId: string) {
    await deleteDoc(doc(db, collectionName, documentId));
  },

  listenColletionUpdate<T>(
    collectionName: string,
    callback: React.Dispatch<React.SetStateAction<T[]>>
  ) {
    return onSnapshot(collection(db, collectionName), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as T[];

      callback(data);
    });
  },

  listenDocumentUpdate<T>(
    collectionName: string,
    documentId: string,
    callback: React.Dispatch<React.SetStateAction<T>>
  ) {
    return onSnapshot(doc(db, collectionName, documentId), (doc) => {
      const data = { ...doc.data(), id: doc.id } as T;
      callback(data);
    });
  },
};

export default database;
