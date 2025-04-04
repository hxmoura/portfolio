import { db } from "@/config/firebaseClient";
import { receiveFirebaseData, sendDataToFirebase } from "@/utils/adapter";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  query,
  updateDoc,
  where,
  WhereFilterOp,
} from "firebase/firestore";

const database = {
  async getCollection(collectionName: string) {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map((doc) =>
      receiveFirebaseData(doc.data(), doc.id)
    );
  },

  async getDocument(collectionName: string, documentId: string) {
    const docSnap = await getDoc(doc(db, collectionName, documentId));

    if (docSnap.exists()) {
      return receiveFirebaseData(docSnap.data(), docSnap.id);
    }
  },

  async getByQuery(
    collectionName: string,
    conditions: {
      field: string;
      operator: WhereFilterOp;
      value: unknown;
    }[],
    docLimit: number = 99
  ) {
    const queryConditions = conditions.map((condition) => {
      return where(condition.field, condition.operator, condition.value);
    });

    const q = query(
      collection(db, collectionName),
      ...queryConditions,
      limit(docLimit)
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) =>
      receiveFirebaseData(doc.data(), doc.id)
    );
  },

  async createDocument<T extends DocumentData>(
    collectionName: string,
    data: T
  ) {
    const collectionRef = collection(db, collectionName);
    await addDoc(collectionRef, sendDataToFirebase(data));
  },

  async updateDocument<T extends DocumentData>(
    collectionName: string,
    documentId: string,
    data: T
  ) {
    const docRef = doc(db, collectionName, documentId);
    await updateDoc(docRef, sendDataToFirebase(data));
  },

  async deleteDocument(collectionName: string, documentId: string) {
    await deleteDoc(doc(db, collectionName, documentId));
  },

  listenColletionUpdate<T>(
    collectionName: string,
    callback: React.Dispatch<React.SetStateAction<T[]>>
  ) {
    return onSnapshot(collection(db, collectionName), (snapshot) => {
      const data = snapshot.docs.map((doc) =>
        receiveFirebaseData(doc.data(), doc.id)
      ) as T[];

      callback(data);
    });
  },

  listenDocumentUpdate<T>(
    collectionName: string,
    documentId: string,
    callback: React.Dispatch<React.SetStateAction<T>>
  ) {
    const docRef = doc(db, collectionName, documentId);
    return onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        return callback(receiveFirebaseData(doc.data(), doc.id) as T);
      }
    });
  },
};

export default database;
