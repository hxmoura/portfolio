import { admin } from "@/config/firebaseAdmin";

export async function POST(request: Request) {
  const { token } = await request.json();

  if (token) {
    try {
      const validateUser = await admin.auth().verifyIdToken(token);

      if (validateUser) {
        return Response.json({
          hasPermission: true,
          errorMessage: "",
        });
      }
    } catch {
      return Response.json({
        hasPermission: false,
        errorMessage:
          "Você não possui permissão para acessar a área administrativa!",
      });
    }
  }
}
