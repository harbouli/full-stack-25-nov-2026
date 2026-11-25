import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/use-auth";

export function AuthGuard() {
  const { token, user } = useAuth();
  if (!token || !user) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <aside>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      </aside>
      <Outlet />
    </>
  );
}
