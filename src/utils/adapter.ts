import { DocumentData } from "firebase/firestore";

type Data = {
  [x: string]: DocumentData | undefined;
};

export function sendDataToFirebase(data: Data) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, ...dataWithoutID } = data;
  return dataWithoutID;
}

export function receiveFirebaseData(data: Data, id: string) {
  return { ...data, id };
}
