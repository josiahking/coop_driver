// DriverInformationStep.js
import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { Button } from "@/components/Button";
import { router } from "expo-router";
import { AuthContext } from "../contexts/AuthContext";

const DriverInformationStep = () => {
  const [driverInfo, setDriverInfo] = useState({
    dmvLicense: "",
    tlcLicense: "",
    dmvLicenseExpDate: "",
    tlcLicenseExpDate: "",
  });

  const { formData, setFormData } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="DMV License Number"
        value={driverInfo.dmvLicense}
        onChangeText={(text) =>
          setDriverInfo({ ...driverInfo, dmvLicense: text })
        }
        style={styles.input}
        underlineColor="transparent"
        underlineStyle={{ height: 0 }}
      />
      <TextInput
        placeholder="TLC License Number"
        value={driverInfo.tlcLicense}
        onChangeText={(text) =>
          setDriverInfo({ ...driverInfo, tlcLicense: text })
        }
        style={styles.input}
        underlineColor="transparent"
        underlineStyle={{ height: 0 }}
      />
      <TextInput
        placeholder="DMV License Expiration Date"
        value={driverInfo.dmvLicenseExpDate}
        onChangeText={(text) =>
          setDriverInfo({ ...driverInfo, dmvLicenseExpDate: text })
        }
        style={styles.input}
        underlineColor="transparent"
        underlineStyle={{ height: 0 }}
      />
      <TextInput
        placeholder="TLC License Expiration Date"
        value={driverInfo.tlcLicenseExpDate}
        onChangeText={(text) =>
          setDriverInfo({ ...driverInfo, tlcLicenseExpDate: text })
        }
        style={styles.input}
        underlineColor="transparent"
        underlineStyle={{ height: 0 }}
      />
      <Button
        title="Next"
        backgroundColor="#5d59ff"
        onPress={() => {
          setFormData({
            ...formData,
            ...driverInfo,
          });
          router.push("/onboard-vehicle");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
  input: {
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
});

export default DriverInformationStep;
