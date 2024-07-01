import React, { useContext, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput } from "react-native-paper";
import { Button } from "@/components/Button";
import { router } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { AuthContext } from "../contexts/AuthContext";
import { useRegisterDriver } from "../app/api";

const VehicleInformationStep = () => {
  const { formData, setFormData } = useContext(AuthContext);
  const [vehicleInfo, setVehicleInfo] = useState({
    vehicleMake: "",
    vehicleModel: "",
    licensePlateNumber: "",
    registrationExpDate: "",
    seatingCapacity: "",
    seatBeltNumber: "",
    insuranceCompany: "",
    policyNumber: "",
    insuranceExpDate: "",
    vehicleClass: "Sedan", // Default to 'LV' (Larger Vehicle)
    luggageCapacity: "1", // Default to 1
  });

  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [customMake, setCustomMake] = useState("");
  const [customModel, setCustomModel] = useState("");
  const [isOtherSelected, setIsOtherSelected] = useState(false);

  const vehicles = {
    Toyota: [
      "Camry",
      "Corolla",
      "RAV4",
      "Prius",
      "Highlander",
      "Yaris",
      "Avalon",
      "Sienna",
      "Tacoma",
      "Tundra",
    ],
    Honda: [
      "Accord",
      "Civic",
      "CR-V",
      "Fit",
      "Pilot",
      "Odyssey",
      "Ridgeline",
      "HR-V",
      "Insight",
    ],
    Ford: [
      "F-150",
      "Escape",
      "Mustang",
      "Explorer",
      "Focus",
      "Fusion",
      "Edge",
      "Ranger",
      "Expedition",
    ],
    Chevrolet: [
      "Silverado",
      "Malibu",
      "Equinox",
      "Impala",
      "Camaro",
      "Traverse",
      "Colorado",
      "Tahoe",
      "Suburban",
    ],
    BMW: ["3 Series", "5 Series", "X3", "X5"],
    Acura: ["TLX", "MDX", "RDX"],
    Peugeot: ["208", "308", "508", "406"],
    Tesla: ["Roadster", "Model S", "Model X", "Model 3", "Model Y"],
    Kia: ["Sorento", "Sportage", "Optima", "Rio"],
    "Mercedes-Benz": ["C-Class", "E-Class", "S-Class", "GLE", "GLS"],
    Hyundai: ["Elantra", "Sonata", "Tucson", "Santa Fe"],
    Other: ["Other"],
  };

  const luggageOptions = Array.from({ length: 10 }, (_, i) => `${i + 1}`);
  const seatBeltOptions = Array.from({ length: 10 }, (_, i) => `${i + 1}`);
  const seatOptions = Array.from({ length: 10 }, (_, i) => `${i + 1}`);

  const onMakeChange = (make) => {
    setSelectedMake(make);
    setSelectedModel("");
    setIsOtherSelected(make === "Other");
  };

  const { mutate, isPending } = useRegisterDriver();

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedMake}
        onValueChange={(itemValue) => {
          onMakeChange(itemValue);
          setVehicleInfo({ ...vehicleInfo, vehicleMake: itemValue });
        }}
        style={styles.picker}
      >
        <Picker.Item label="Select Make" value="" />
        {Object.keys(vehicles).map((make) => (
          <Picker.Item key={make} label={make} value={make} />
        ))}
      </Picker>

      {isOtherSelected ? (
        <TextInput
          placeholder="Enter Vehicle Make"
          value={customMake}
          onChangeText={(text) => {
            setVehicleInfo({ ...vehicleInfo, vehicleMake: text });
            setCustomMake(text);
          }}
          style={styles.input}
          underlineColor="transparent"
          underlineStyle={{ height: 0 }}
        />
      ) : (
        <Picker
          selectedValue={selectedModel}
          onValueChange={(itemValue) => {
            setSelectedModel(itemValue);
            setVehicleInfo({ ...vehicleInfo, vehicleModel: itemValue });
          }}
          enabled={selectedMake !== ""}
          style={styles.picker}
        >
          <Picker.Item label="Select Model" value="" />
          {selectedMake && vehicles[selectedMake] ? (
            vehicles[selectedMake].map((model) => (
              <Picker.Item key={model} label={model} value={model} />
            ))
          ) : (
            <Picker.Item label="No models available" value="" />
          )}
        </Picker>
      )}

      {isOtherSelected && (
        <TextInput
          placeholder="Enter Vehicle Model"
          value={customModel}
          onChangeText={(text) => {
            setVehicleInfo({ ...vehicleInfo, vehicleModel: text });
            setCustomModel(text);
          }}
          style={styles.input}
          underlineColor="transparent"
          underlineStyle={{ height: 0 }}
        />
      )}

      <Picker
        selectedValue={vehicleInfo.vehicleClass}
        onValueChange={(itemValue) =>
          setVehicleInfo({ ...vehicleInfo, vehicleClass: itemValue })
        }
        style={styles.picker}
      >
        <Picker.Item label="Select Vehicle Class" value="" />
        <Picker.Item label="Sedan" value="Sedan" />
        <Picker.Item label="Electric Vehicle" value="EV" />
        <Picker.Item label="Wheelchair Accessible Vehicle" value="WAV" />
        <Picker.Item label="Black" value="Black" />
        <Picker.Item label="Luxury Vehicle" value="XL" />
        <Picker.Item label="SUV" value="SUV" />
      </Picker>
      <TextInput
        placeholder="License Plate Number"
        value={vehicleInfo.licensePlateNumber}
        onChangeText={(text) =>
          setVehicleInfo({ ...vehicleInfo, licensePlateNumber: text })
        }
        style={styles.input}
        underlineColor="transparent"
        underlineStyle={{ height: 0 }}
      />
      <TextInput
        placeholder="Registration Expiration Date"
        value={vehicleInfo.registrationExpDate}
        onChangeText={(text) =>
          setVehicleInfo({ ...vehicleInfo, registrationExpDate: text })
        }
        style={styles.input}
        underlineColor="transparent"
        underlineStyle={{ height: 0 }}
      />
      <Picker
        selectedValue={vehicleInfo.seatingCapacity}
        value={vehicleInfo.seatingCapacity}
        onValueChange={(itemValue) =>
          setVehicleInfo({ ...vehicleInfo, seatingCapacity: itemValue })
        }
        style={styles.picker}
      >
        <Picker.Item label="Select Seating Capacity" value="" />
        {seatOptions.map((option) => (
          <Picker.Item key={option} label={option} value={option} />
        ))}
      </Picker>
      <Picker
        selectedValue={vehicleInfo.seatBeltNumber}
        onValueChange={(itemValue) =>
          setVehicleInfo({ ...vehicleInfo, seatBeltNumber: itemValue })
        }
        style={styles.picker}
      >
        <Picker.Item label="Select Number of Seat Belts" value="" />
        {seatBeltOptions.map((option) => (
          <Picker.Item key={option} label={option} value={option} />
        ))}
      </Picker>
      <Picker
        selectedValue={vehicleInfo.luggageCapacity}
        onValueChange={(itemValue) =>
          setVehicleInfo({ ...vehicleInfo, luggageCapacity: itemValue })
        }
        style={styles.picker}
      >
        <Picker.Item label="Select Luggage Capacity" value="" />
        {luggageOptions.map((option) => (
          <Picker.Item key={option} label={option} value={option} />
        ))}
      </Picker>
      <TextInput
        placeholder="Insurance Company"
        value={vehicleInfo.insuranceCompany}
        onChangeText={(text) =>
          setVehicleInfo({ ...vehicleInfo, insuranceCompany: text })
        }
        style={styles.input}
        underlineColor="transparent"
        underlineStyle={{ height: 0 }}
      />
      <TextInput
        placeholder="Insurance Policy Number"
        value={vehicleInfo.policyNumber}
        onChangeText={(text) =>
          setVehicleInfo({ ...vehicleInfo, policyNumber: text })
        }
        style={styles.input}
        underlineColor="transparent"
        underlineStyle={{ height: 0 }}
      />
      <TextInput
        placeholder="Insurance Expiration Date"
        value={vehicleInfo.insuranceExpDate}
        onChangeText={(text) =>
          setVehicleInfo({ ...vehicleInfo, insuranceExpDate: text })
        }
        style={styles.input}
        underlineColor="transparent"
        underlineStyle={{ height: 0 }}
      />
      <Button
        title="submit"
        backgroundColor="#5d59ff"
        isLoading={isPending}
        onPress={() => {
          console.log("jjj");
          mutate(
            {
              ...formData,
              ...vehicleInfo,
            },
            {
              onSuccess: () => {
                router.push("(tabs)");
              },
              onError: (err) => {
                console.log(err.response.data);
                Alert.alert("An error occurred. Please try again");
              },
            }
          );
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
  picker: {
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f3f3f3",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    borderWidth: 1,
    borderRadius: 7,
  },
});

export default VehicleInformationStep;
