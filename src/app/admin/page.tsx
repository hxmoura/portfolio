"use client";

import PrimaryButton from "@/components/primaryButton";
import Setup from "@/components/setup";
import { auth } from "@/db/firebaseClient";
import { RiGithubFill } from "@remixicon/react";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";

interface User {
  hasPermission: boolean;
  isLogged: boolean;
}

export default function Admin() {
  const [user, setUser] = useState<User>({
    hasPermission: false,
    isLogged: false,
  });

  function handleAuthentication() {
    const provider = new GithubAuthProvider();

    signInWithPopup(auth, provider)
      .then(async (result) => {
        const token = await result.user.getIdToken();

        const request = await fetch("/api", {
          method: "POST",
          body: JSON.stringify({ token }),
        });

        const data = await request.json();
        setUser(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <>
      {user.hasPermission ? (
        <Setup>
          <h1>Usuario autorizado</h1>
        </Setup>
      ) : (
        <main className="flex flex-col items-center justify-center h-screen">
          <PrimaryButton onClick={handleAuthentication}>
            <RiGithubFill size={24} />
            <span>Login com Github</span>
          </PrimaryButton>
          {user.isLogged && !user.hasPermission && (
            <p className="text-center mt-3 text-red-500">
              Você não possui permissão para acessar a área administrativa!
            </p>
          )}
        </main>
      )}
    </>
  );
}
