import { Routes, Route, BrowserRouter, Link } from "react-router";
import LoginPage from "./pages/auth/login-page";
import { AuthProvider } from "./context/use-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RegisterPage } from "./pages/auth/register-page";
import { AuthGuard } from "./guard/auth-guard";

const queryClient = new QueryClient();

export default function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes>
            <Route element={<LoginPage />} index />
            <Route element={<RegisterPage />} path="/register" />

            {/* Admins Pages */}
            <Route element={<AuthGuard />} path="/dashboard">
              <Route
                element={
                  <div>
                    Overview<Link to="courses">course</Link>
                  </div>
                }
                index
              />
              <Route element={<div>Courses</div>} path="courses" />
            </Route>
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
