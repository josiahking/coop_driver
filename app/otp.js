// OTPScreen.js
import React, { useRef, useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { Button, Snackbar } from "react-native-paper";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import Constants from "expo-constants";
import { useRequestOtp } from "./api";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { axiosInstance } from "../constants/axiosInstance.ts";

export default OTPScreen = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [canResendOTP, setCanResendOTP] = useState(false);
  const { formData } = useContext(AuthContext);
  const [snackbarVisible, setSnackbarVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);
  const otpResendTimeInSecs = 180;
  const [timer, setTimer] = useState(otpResendTimeInSecs); // 3 minutes in seconds
  const { mutate } = useRequestOtp();
  useEffect(() => {
    // Update the countdown timer every second
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          // When the timer reaches zero, allow resending the OTP
          setCanResendOTP(true);
          return 0;
        }
      });
    }, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Format the timer into minutes and seconds
  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleOTPChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < 3) {
      inputRefs.current[index + 1].current.focus();
    }
  };
  const passkey = useLocalSearchParams();
  const apiUrl = Constants.expoConfig.extra.baseApiUrl;

  const verifyOTP = () => {
    // Add OTP verification logic here
    setIsLoading(true);
    const otpCode = otp.join("");
    console.log("here>>");
    axiosInstance
      .post(
        "api/otp/verify",
        {
          otp: otpCode,
          passkey: formData?.passkey,
        },
        {
          headers: {
            "X-Custom-Origin": "driver-coop",
          },
        }
      )
      .then((response) => {
        if (response.status == 204) {
          router.replace("/signup");
        }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          Alert.alert("Invalid OTP. Please try again");
        } else {
          Alert.alert("An error occurred. Please try again");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const resendOTP = () => {
    // Add logic to resend OTP here
    setCanResendOTP(false);
    setTimer(otpResendTimeInSecs);
    mutate(
      {
        request_for: "driver",
        request_using: "email",
        requested_by: formData?.emailAddress,
      },
      {
        onSuccess: () => {
          // Restart the timer
          setTimeout(() => {
            setCanResendOTP(true);
          }, otpResendTimeInSecs * 1000);
        },
      }
    );
  };

  const onDismissSnackBar = () => setSnackbarVisible(false);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("@/assets/images/coop.png")}
        contentFit="contain"
      />
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={inputRefs.current[index]}
            value={digit}
            onChangeText={(text) => handleOTPChange(text, index)}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            returnKeyType="done"
          />
        ))}
      </View>
      <Button
        style={styles.otp_btn}
        mode="elevated"
        disabled={isLoading}
        loading={isLoading}
        buttonColor="#5d59ff"
        textColor="#fff"
        title="Create Account"
        onPress={verifyOTP}
      >
        Verify OTP
      </Button>
      {!isLoading && (
        <>
          {canResendOTP ? (
            <TouchableOpacity onPress={resendOTP}>
              <Text style={styles.resendText}>Resend OTP</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.timerText}>
              {canResendOTP
                ? "You can resend the OTP"
                : `Resend OTP in ${formatTime()}`}
            </Text>
          )}
        </>
      )}

      <Snackbar
        visible={snackbarVisible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "OK",
          onPress: () => {
            // Do something if needed when user presses 'OK'
          },
        }}
        elevation={4}
        duration={10000}
      >
        Check your email for the OTP code we sent.
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 220,
  },
  otpInput: {
    width: 40,
    borderBottomWidth: 1,
    textAlign: "center",
    marginHorizontal: 10,
  },
  resendText: {
    marginTop: 20,
    color: "blue",
    textDecorationLine: "underline",
  },
  timerText: {
    marginTop: 20,
    color: "grey",
  },
  otp_btn: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 4,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
  logo: {
    width: "50%",
    height: 100,
    top: 0, // Adjust 'top' as needed to create space from the top edge
    left: 0,
    right: 0,
    resizeMode: "contain",
  },
});
