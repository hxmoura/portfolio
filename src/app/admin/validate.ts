import { auth } from "@/config/firebaseClient";
import { fetcher } from "@/utils/fetcher";

export default async function validateUser() {
  const token = await auth.currentUser?.getIdToken();

  const response = await fetcher("/api/auth", {
    method: "POST",
    body: JSON.stringify({ token }),
  });

  return response;
}
