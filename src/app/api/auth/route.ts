import { admin } from "@/db/firebaseAdmin";

export async function POST(request: Request) {
  const { token } = await request.json();
  const data = await admin.auth().verifyIdToken(token);

  if (token && data) {
    try {
      const githubID = data.firebase.identities["github.com"][0];

      if (githubID === process.env.GITHUB_AUTHORIZED_ID) {
        return Response.json({
          hasPermission: true,
          isLogged: true,
        });
      } else {
        admin.auth().deleteUser(data.uid);
        return Response.json({
          hasPermission: false,
          isLogged: true,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
}
