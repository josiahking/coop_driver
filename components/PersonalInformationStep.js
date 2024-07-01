import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { Button } from "@/components/Button";
import { router } from "expo-router";
import { AuthContext } from "../contexts/AuthContext";
import { useRegisterDriver } from "../app/api";

const PersonalInformationStep = () => {
  const { formData, setFormData } = useContext(AuthContext);
  const [personalInfo, setPersonalInfo] = useState({
    firstName: formData?.first_name,
    lastName: formData?.last_name,
    email: formData?.email,
    phone: "",
    streetAddress: "",
    city: "",
    stateProvince: "",
    zipPostalCode: "",
    dob: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    relationshipToEmergencyContact: "",
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="First Name"
        value={personalInfo.firstName}
        onChangeText={(text) =>
          setPersonalInfo({ ...personalInfo, firstName: text })
        }
        style={styles.input}
        underlineColor="transparent"
        underlineStyle={{ height: 0 }}
      />
      <TextInput
        placeholder="Last Name"
        value={personalInfo.lastName}
        onChangeText={(text) =>
          setPersonalInfo({ ...personalInfo, lastName: text })
        }
        style={styles.input}
        underlineColor="transparent"
        underlineStyle={{ height: 0 }}
      />
      <TextInput
        placeholder="Email"
        value={formData?.emailAddress}
        style={styles.input}
        underlineColor="transparent"
        underlineStyle={{ height: 0 }}
        readOnly
      />
      <TextInput
        placeholder="Phone Number"
        value={personalInfo.phone}
        onChangeText={(text) =>
          setPersonalInfo({ ...personalInfo, phone: text })
        }
        style={styles.input}
        underlineColor="transparent"
        underlineStyle={{ height: 0 }}
      />
      <TextInput
        placeholder="Date of Birth"
        value={personalInfo.dob}
        onChangeText={(text) => setPersonalInfo({ ...personalInfo, dob: text })}
        style={styles.input}
        underlineColor="transparent"
        underlineStyle={{ height: 0 }}
      />
      <TextInput
        placeholder="Zip Code"
        value={personalInfo.zipPostalCode}
        onChangeText={(text) =>
          setPersonalInfo({ ...personalInfo, zipPostalCode: text })
        }
        style={styles.input}
        underlineColor="transparent"
        underlineStyle={{ height: 0 }}
      />
      <TextInput
        placeholder="Address"
        value={personalInfo.streetAddress}
        onChangeText={(text) =>
          setPersonalInfo({ ...personalInfo, streetAddress: text })
        }
        style={styles.input}
        underlineColor="transparent"
        underlineStyle={{ height: 0 }}
      />
      <TextInput
        placeholder="Emergency Contact Name"
        value={personalInfo.emergencyContactName}
        onChangeText={(text) =>
          setPersonalInfo({ ...personalInfo, emergencyContactName: text })
        }
        style={styles.input}
        underlineColor="transparent"
        underlineStyle={{ height: 0 }}
      />
      <TextInput
        placeholder="Emergency Contact Phone"
        value={personalInfo.emergencyContactPhone}
        onChangeText={(text) =>
          setPersonalInfo({ ...personalInfo, emergencyContactPhone: text })
        }
        style={styles.input}
        underlineColor="transparent"
        underlineStyle={{ height: 0 }}
      />
      <TextInput
        placeholder="Relationship to Emergency Contact"
        value={personalInfo.relationshipToEmergencyContact}
        onChangeText={(text) =>
          setPersonalInfo({
            ...personalInfo,
            relationshipToEmergencyContact: text,
          })
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
            ...personalInfo,
          });
          router.push("/onboard-driver");
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

export default PersonalInformationStep;
