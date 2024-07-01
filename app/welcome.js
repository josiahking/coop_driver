import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { router } from "expo-router";
import { Image } from "expo-image";
import { Button } from "@/components/Button";

export default WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("@/assets/images/Illustration.svg")}
        contentFit="contain"
      />
      <View style={styles.introContainer}>
        <Text style={styles.title}>Earn more</Text>
        <Text style={styles.small}>Better pay on each trip</Text>
      </View>
      <View style={styles.buttons}>
        <Button
          title="Sign In"
          backgroundColor="#5d59ff"
          onPress={() => router.push("/login")}
        />

        <Button
          title="Create Account"
          backgroundColor="#f2f2f2"
          textColor="#222"
          onPress={() => router.push("/StartSignUp")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: "90%",
    height: "50%",
  },
  introContainer: {
    marginBottom: 50,
    gap: 16,
  },
  title: {
    fontSize: 24,
    lineHeight: 36,
    fontWeight: "800",
    color: "#222",
    textAlign: "center",
  },
  small: {
    fontSize: 16,
    color: "#222",
    textAlign: "center",
  },
  buttons: {
    gap: 20,
  },
});
