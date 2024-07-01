import { ThemedText } from "@/components/ThemedText";

import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { useRequestOtp } from "./api";
import { Snackbar, TextInput } from "react-native-paper";
import { AuthContext } from "@/contexts/AuthContext";
import { Colors } from "@/constants/Colors";

const StartSignUp = () => {
  const { formData, setFormData } = useContext(AuthContext);

  const router = useRouter();

  const { mutate, isPending, reset } = useRequestOtp();

  const validEmail = /^[\w\.-]+@([a-zA-Z\d\.-]{2,})+\.[a-zA-Z]{2,}$/?.test(
    formData?.emailAddress
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Image
        source={require("@/assets/images/coop.png")}
        style={{
          width: 100,
          height: 100,
        }}
      />

      <View>
        <Text style={styles.text}>Sign up to Co-Op Ride</Text>
        <ThemedText
          type="subtitle"
          style={{
            textAlign: "center",
            paddingTop: 10,
          }}
        >
          We'll send a verification code to the provided email address.
        </ThemedText>
      </View>

      <View style={styles.inputBox}>
        <TextInput
          label="Email Address"
          value={formData?.emailAddress}
          onChangeText={(text) =>
            setFormData({
              ...formData,
              emailAddress: text,
            })
          }
          inputMode="email"
          error={formData?.emailAddress && !validEmail}
        />
        <View
          style={{
            gap: 1.5,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ThemedText
            type="subtitle"
            style={{
              fontSize: 15,
              fontFamily: "RaleWay",
            }}
          >
            Already have an account?
          </ThemedText>
          <TouchableOpacity
            onPress={() => {
              router.navigate("LoginPage");
            }}
          >
            <ThemedText
              type="subtitle"
              style={{
                color: "primaryColor",
                fontSize: 15,
                fontFamily: "RaleWay",
                marginHorizontal: 3,
              }}
            >
              Log In
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          width: "100%",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={[
            {
              backgroundColor: Colors.dark?.tint,
              ...styles.button,
            },
          ]}
          disabled={!formData?.emailAddress || isPending || !validEmail}
          onPress={() => {
            mutate(
              {
                // requested_by: emailAddress,
                requested_by: "otp@driverscoopbackend.com",
                request_using: "email",
                request_for: "driver",
              },
              {
                onSuccess(data, variables, context) {
                  setFormData({
                    ...formData,
                    passkey: data?.data?.passkey,
                  });
                  router.navigate("otp");
                },
                onError(error, variables, context) {
                  Alert.alert("Error", "An error occurred. Please try again", [
                    {
                      text: "Ok",
                      style: "default",
                      isPreferred: true,

                      onPress(value) {
                        reset();
                      },
                    },
                  ]);
                },
              }
            );
          }}
        >
          {!isPending ? (
            <Text
              style={{
                color: "primaryColor",
                textAlign: "center",
                width: "100%",
                fontWeight: "bold",
                fontFamily: "RaleWay",
              }}
            >
              Continue
            </Text>
          ) : (
            <ActivityIndicator size={20} />
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    paddingTop: "15%",
  },
  text: {
    alignSelf: "center",
    margin: "auto",
    fontSize: 24,
    fontWeight: "700",
    fontFamily: "RaleWay",
  },
  button: {
    textAlign: "center",
    padding: 10,
    borderRadius: 16,
    marginTop: "auto",
    alignSelf: "flex-end",
    width: "100%",
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  inputBox: {
    flexDirection: "column",
    gap: 20,
    width: "100%",
  },
});

export default StartSignUp;
