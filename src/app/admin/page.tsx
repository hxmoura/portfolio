"use client";

import Loading from "@/components/loading";
import PrimaryButton from "@/components/primaryButton";
import Setup from "@/components/setup";
import { auth } from "@/db/firebaseClient";
import { RiGithubFill } from "@remixicon/react";
import {
  GithubAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { useEffect, useState } from "react";
import Experience from "./components/Experience";
import Presentation from "./components/Presentation";
import Project from "./components/Project";

interface Authentication {
  hasPermission: boolean;
  errorMessage: string;
}

async function userValidate(token: string) {
  const request = await fetch("/api/auth", {
    method: "POST",
    body: JSON.stringify({ token }),
  });

  const data = await request.json();
  return data;
}

export default function Admin() {
  const [authentication, setAuthentication] = useState<Authentication>({
    hasPermission: false,
    errorMessage: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        const data = await userValidate(token);
        setAuthentication(data);
      }
      setLoading(false);
    });
  }, []);

  function handleAuthentication() {
    const provider = new GithubAuthProvider();

    signInWithPopup(auth, provider)
      .then(async (result) => {
        const token = await result.user.getIdToken();
        const data = await userValidate(token);
        setAuthentication(data);
      })
      .catch((error) => {
        console.log(error.message);
        setAuthentication({
          hasPermission: false,
          errorMessage:
            "Não foi possível concluir a autenticação, tente novamente!",
        });
      });
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {authentication.hasPermission ? (
        <Setup spaceElements={80}>
          <Presentation />
          <Experience />
          <Project />
        </Setup>
      ) : (
        <main className="flex flex-col items-center justify-center h-screen">
          <PrimaryButton onClick={handleAuthentication}>
            <RiGithubFill size={24} />
            <span>Login com Github</span>
          </PrimaryButton>
          {!authentication.hasPermission && authentication.errorMessage && (
            <p className="text-center mt-3 text-red-500">
              {authentication.errorMessage}
            </p>
          )}
        </main>
      )}
    </>
  );
}
