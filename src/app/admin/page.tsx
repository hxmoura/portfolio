"use client";

import Input from "@/components/Input";
import Loading from "@/components/Loading";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import Setup from "@/components/Setup";
import { auth } from "@/config/firebaseClient";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Experience from "./components/Experience";
import Presentation from "./components/Presentation";
import Project from "./components/Project";

interface Authentication {
  hasPermission: boolean;
  errorMessage: string;
}

export default function Admin() {
  const [authentication, setAuthentication] = useState<Authentication>({
    hasPermission: false,
    errorMessage: "",
  });
  const [loading, setLoading] = useState(true);
  const [formAuth, setFormAuth] = useState({ email: "", password: "" });

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setAuthentication({
          hasPermission: true,
          errorMessage: "",
        });
      }
      setLoading(false);
    });
  }, []);

  function handleFormAuth(evt: ChangeEvent) {
    const { value, name } = evt.target as HTMLInputElement;

    setFormAuth((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleAuthentication(evt: FormEvent) {
    evt.preventDefault();

    signInWithEmailAndPassword(auth, formAuth.email, formAuth.password)
      .then(() => {
        setAuthentication({
          hasPermission: true,
          errorMessage: "",
        });
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          setAuthentication({
            hasPermission: false,
            errorMessage: "O e-mail ou senha estão incorretos!",
          });
        } else {
          setAuthentication({
            hasPermission: false,
            errorMessage:
              "Não foi possível concluir a autenticação, tente novamente!",
          });
        }
      });
  }

  function handleLogout() {
    signOut(auth).then(() => {
      setAuthentication({
        hasPermission: false,
        errorMessage: "",
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
          <SecondaryButton onClick={handleLogout}>Logout</SecondaryButton>
        </Setup>
      ) : (
        <main className="flex flex-col items-center justify-center h-screen">
          <form className="max-w-xl w-full space-y-4">
            <Input
              onChange={handleFormAuth}
              value={formAuth.email}
              label="E-mail"
              name="email"
            />
            <Input
              onChange={handleFormAuth}
              value={formAuth.password}
              label="Senha"
              name="password"
            />
            <PrimaryButton onClick={handleAuthentication}>Login</PrimaryButton>
          </form>
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
