import React, { useContext, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { router, Link } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { TextInput } from "react-native-paper";
import { Button } from "@/components/Button";
import { Image } from "expo-image";

export default LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const { signIn } = useContext(AuthContext);

  return (
    <ThemedView style={styles.container}>
      <Image
        style={styles.logo}
        source={require("@/assets/images/coop.png")}
        contentFit="contain"
      />

      <ThemedView style={styles.introContainer}>
        <ThemedText style={styles.title}>Sign In</ThemedText>
        <ThemedText style={styles.small}>Enter your login details</ThemedText>
      </ThemedView>
      <ThemedView style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          underlineColor="transparent"
          underlineStyle={{ height: 0 }}
        />

        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={hidePassword}
            style={styles.input}
            right={
              <TextInput.Icon
                icon={viewPassword == false ? "eye" : "eye-off-outline"}
                onPress={() => {
                  if (!viewPassword) {
                    setViewPassword(true);
                    setHidePassword(false);
                  } else {
                    setViewPassword(false);
                    setHidePassword(true);
                  }
                }}
              />
            }
            underlineColor="transparent"
            underlineStyle={{ height: 0 }}
          />
          <View style={{ textAlign: "right", width: "80%", marginTop: 10 }}>
            <Link
              href="/signup"
              style={[styles.linkText, styles.forgotPassword]}
            >
              Forgot password?
            </Link>
          </View>
        </View>
      </ThemedView>

      <Button
        title="Sign In"
        backgroundColor="#5d59ff"
        onPress={() => router.replace("(tabs)")}
      />
      <ThemedText style={styles.loginText}>
        Don’t have an account yet?{" "}
        <Link href="/signup" replace style={styles.linkText}>
          Sign up
        </Link>
      </ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  introContainer: {
    marginBottom: 30,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#222",
  },
  small: {
    fontSize: 16,
    color: "#222",
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 30,
    gap: 20,
  },
  input: {
    width: "80%",
    height: 50,
    borderColor: "#ddd",
    backgroundColor: "#f3f3f3",
    borderWidth: 1,
    borderRadius: 7,
  },
  loginText: {
    color: "#222",
    marginTop: 20,
  },
  linkText: {
    color: "blue",
  },
  forgotPassword: {
    marginLeft: "auto",
  },
  logo: {
    width: "50%",
    height: "10%",
    marginBottom: 30,
  },
});
