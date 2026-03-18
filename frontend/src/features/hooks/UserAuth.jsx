import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { login, register } from "../services/auth.api";

export const UserAuth = () => {
  const { user, setUser, loading, setLoading } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleRegister = async ({ email, password }) => {
    setLoading(false);
    const data = await register({ email, password });
    setUser(data.user);
    setLoading(true);
  };

  const handleLogin = async ({ email, password }) => {
    setLoading(false);
    const data = await login({ email, password });
    setUser(data.user);
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      setLoading(false);
    }

    if (!token) {
      navigate("/login");
    }

    if (!user) {
      navigate("/login");
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
  <>{children}</>
);
};
