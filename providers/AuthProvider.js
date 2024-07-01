import React, { useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export default AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState(null);

  // Simulate user authentication
  const signIn = (email, password) => {
    // TODO: Implement real authentication logic
    const fakeUser = { email };
    setUser(fakeUser);
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, signIn, signOut, formData, setFormData }}
    >
      {children}
    </AuthContext.Provider>
  );
};
