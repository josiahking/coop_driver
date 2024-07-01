import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router, Link } from "expo-router";
import { TextInput, Button } from "react-native-paper";
import { Image } from "expo-image";
import { axiosInstance } from "../constants/axiosInstance";
import Constants from "expo-constants";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

export default function SignupScreen() {
  const { formData, setFormData } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const apiUrl = Constants.expoConfig.extra.baseApiUrl;
  const apiEndpoint = "api/driver/register";

  const handleSignup = () => {
    setFormData({
      ...formData,
      first_name: firstName,
      last_name: lastName,
      email: formData?.emailAddress,
      password: password,
      password_confirmation: passwordRepeat,
    });
    router.push({
      pathname: "onboard-personal",
    });
    // setIsLoading(true);
    // axios
    //   .axiosInstance(apiEndpoint, {
    //     first_name: firstName,
    //     last_name: lastName,
    //     email: email,
    //     password: password,
    //     password_confirmation: passwordRepeat,
    //   })
    //   .then((response) => {
    //     if (response.data.token) {
    //       //request otp
    //       setFormData({
    //         ...formData,
    //         first_name: firstName,
    //         last_name: lastName,
    //         email: email,
    //         password: password,
    //         password_confirmation: passwordRepeat,
    //       });
    //       axiosInstance
    //         .get("api/otp/request", {
    //           params: {
    //             requested_by: email,
    //             request_using: "email",
    //           },
    //         })
    //         .then((response) => {
    //           if (response.status == 201) {
    //             console.log(response.data.data.passkey);
    //             router.push({
    //               pathname: "onboard-personal",
    //             });
    //           }
    //         })
    //         .catch((error) => {
    //           if (error.response) {
    //             console.log(error.response.data);
    //           } else {
    //             console.log(error.message);
    //           }
    //         });
    //     }
    //   })
    //   .catch((error) => {
    //     if (error.response) {
    //       // The request was made and the server responded with a status code
    //       // that falls out of the range of 2xx
    //       console.log(error.response.data);
    //     } else if (error.request) {
    //       // The request was made but no response was received
    //       // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //       // http.ClientRequest in node.js
    //       console.log(error.request);
    //     } else {
    //       // Something happened in setting up the request that triggered an Error
    //       console.log("Error", error.message);
    //     }
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  };

  const validPassword =
    /[0-9A-Za-z@$#!&^%()*/\/]{8,}/?.test(password) === true &&
    password?.trim() === passwordRepeat?.trim();

  return (
    <ThemedView style={styles.container}>
      <Image
        style={styles.logo}
        source={require("@/assets/images/coop.png")}
        contentFit="contain"
      />
      <ThemedView style={styles.introContainer}>
        <ThemedText style={styles.title}>Sign Up</ThemedText>
        <ThemedText style={styles.small}>
          Create an account, its easy an fast!
        </ThemedText>
        <ThemedText style={styles.small}>
          {" "}
          Already have an account?{" "}
          <Link href="/login" style={styles.loginText}>
            Sign In
          </Link>
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.inputContainer}>
        <TextInput
          label="First Name"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
          underlineColor="transparent"
          underlineStyle={{ height: 0 }}
        />
        <TextInput
          label="Last Name"
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
          underlineColor="transparent"
          underlineStyle={{ height: 0 }}
        />
        <TextInput
          placeholder="Email"
          label="Email address"
          value={formData?.emailAddress}
          onChangeText={setEmail}
          style={styles.input}
          underlineColor="transparent"
          underlineStyle={{ height: 0 }}
          readOnly
        />
        <TextInput
          placeholder="Password"
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={hidePassword}
          style={styles.input}
          error={validPassword && password ? false : true}
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
        <TextInput
          placeholder="Confirm password"
          label="Confirm password"
          value={passwordRepeat}
          onChangeText={setPasswordRepeat}
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
      </ThemedView>
      <ThemedView style={{ paddingHorizontal: 20 }}>
        <ThemedText style={styles.smallest}>
          {" "}
          By clicking on the "Create Account", you agree to our{" "}
          <Link href="/login" style={styles.loginText}>
            Terms
          </Link>
        </ThemedText>
        <ThemedText style={styles.smallest}>
          {" "}
          Read about our{" "}
          <Link href="/login" style={styles.loginText}>
            privacy policy
          </Link>
        </ThemedText>
      </ThemedView>
      <Button
        style={styles.signup_btn}
        mode="elevated"
        disabled={!validPassword}
        loading={isLoading}
        buttonColor="#5d59ff"
        textColor="#fff"
        title="Create Account"
        onPress={handleSignup}
      >
        Create Account
      </Button>
    </ThemedView>
  );
}

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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  loginText: {
    color: "blue",
  },
  logo: {
    width: "50%",
    height: "10%",
    marginBottom: 30,
  },
  signup_btn: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 4,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    marginTop: 20,
  },
  smallest: {
    fontSize: 14,
    color: "#222",
    textAlign: "center",
  },
});
