import React, { useState } from "react";
import { useLoginMutations } from "../../services/auth";
import { useAuth } from "../../context/use-auth";
import { useNavigate } from "react-router";
import { serializeError } from "../../utils/error-handler";

const LoginPage = () => {
  const { setUser, setToken } = useAuth();
  const { mutate, error, isPending } = useLoginMutations();

  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });

  const handleEmail = (e) => {
    setForm((perv) => ({ ...perv, email: e.target.value }));
  };
  const handlePassword = (e) => {
    setForm((perv) => ({ ...perv, password: e.target.value }));
  };

  const submitFrom = (e) => {
    e.preventDefault();
    mutate(form, {
      onSuccess: (res) => {
        setUser(res.user);
        setToken(res.token);
        navigate("/dashboard");
      },
    });
  };

  return (
    <div>
      <form onSubmit={submitFrom}>
        <label htmlFor="email">Email: </label>
        <input type="email" id="email" onChange={handleEmail} />
        <label htmlFor="password">Password: </label>
        <input type="password" id="password" onChange={handlePassword} />

        <button disabled={isPending} type="submit">
          Submit
        </button>

        <br />
        {!!error && serializeError(error).message}
      </form>
    </div>
  );
};

export default LoginPage;
