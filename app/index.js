import { AuthContext } from "@/contexts/AuthContext";
import { Stack } from "expo-router";
import { useContext } from "react";

//import React, { useContext, useEffect } from 'react';

export default App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {user ? (
        // User is signed in
        <Stack.Screen name="(tabs)" />
      ) : (
        // No user is signed i
        <Stack.Screen name="intro" />
      )}
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};
