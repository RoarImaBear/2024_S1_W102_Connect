import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function PrivateRoute({ children }) {
  const { currentUser } = useAuth();

  if(!currentUser){
    return <Navigate to="/signup" replace/>
  } else {
    return children;
  }
}