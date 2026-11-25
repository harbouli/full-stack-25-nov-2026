import React from "react";
import { useAuth } from "../../context/use-auth";

export function RegisterPage() {
  const { token } = useAuth();
  return <div>{token}</div>;
}
