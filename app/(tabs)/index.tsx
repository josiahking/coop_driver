import { StyleSheet, View, Alert, Platform } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import * as Location from "expo-location";
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { TextInput, Button, Switch } from "react-native-paper";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Image } from "expo-image";

type LocationState = Location.LocationObjectCoords | null;

interface Coords {
  latitude: number;
  longitude: number;
}

export default function HomeScreen() {
  const mapRef = useRef<MapView>(null);
  const [location, setLocation] = useState<LocationState>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [statusText, setStatusText] = useState("");
  const snapPoints = useMemo(() => ["10%", "50%", "90%"], []);

  // callbacks
  const handleStatusSwitch = useCallback((value: boolean) => {
    if (value) {
      setStatusText("You are online");
    } else {
      setStatusText("You are offline");
    }
    setIsSwitchOn(value);
    const indexToSnapTo = value ? 1 : 0;
    // Use the snapTo method to animate the bottom sheet
    bottomSheetModalRef.current?.snapToIndex(indexToSnapTo);
  }, []);
  const handleSheetChanges = useCallback((index: number) => {}, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Permission to access location was denied"
        );
        return;
      }

      let serviceEnabled = await Location.hasServicesEnabledAsync();
      if (!serviceEnabled) {
        Alert.alert(
          "Location Service Disabled",
          "Please enable your location services"
        );
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);
      centerMapOnUserLocation(userLocation.coords);
      bottomSheetModalRef.current?.present();
    })();
    isSwitchOn
      ? setStatusText("You are online")
      : setStatusText("You are offline");
  }, []);

  const centerMapOnUserLocation = (coords: Coords) => {
    console.log(coords);
    mapRef.current?.animateToRegion(
      {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      1000
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <ThemedView style={styles.container}>
          <MapView
            ref={mapRef}
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            initialRegion={{
              latitude: location ? location.latitude : 0,
              longitude: location ? location.longitude : 0,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {[
              {
                latitude: 9.0,
                longitude: 9.0,
              },
              {
                latitude: 30.0,
                longitude: 100.0,
              },
              {
                latitude: 50.0,
                longitude: 150.0,
              },
            ].map((it) => (
              <Marker coordinate={it} />
            ))}
          </MapView>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            enablePanDownToClose={false}
          >
            <BottomSheetView style={styles.contentContainer}>
              <ThemedView style={styles.statusContainer}>
                <Switch
                  style={styles.statusSwitch}
                  value={isSwitchOn}
                  onValueChange={handleStatusSwitch}
                  color={isSwitchOn ? "#5d59ff" : undefined}
                  trackColor={{ false: "#aaa", true: "#5d59ff" }}
                />
                <ThemedText style={styles.statusText}>{statusText}</ThemedText>
              </ThemedView>
              {isSwitchOn && (
                <ThemedView>
                  <ThemedView style={styles.totalContainer}>
                    <ThemedView style={styles.totalEarnings}>
                      <ThemedText style={styles.totalEarningsSmallText}>
                        Today's Earnings
                      </ThemedText>
                      <ThemedText style={styles.totalEarningsBigText}>
                        $57.08
                      </ThemedText>
                    </ThemedView>
                    <ThemedView style={styles.totalTrips}>
                      <ThemedText style={styles.totalTripsSmallText}>
                        Today's Trips
                      </ThemedText>
                      <ThemedText style={styles.totalTripsBigText}>
                        2
                      </ThemedText>
                    </ThemedView>
                  </ThemedView>
                  <ThemedView style={styles.requestContainer}>
                    <Image
                      style={styles.image}
                      source={require("@/assets/images/waiting_request.svg")}
                      contentFit="fill"
                    />
                    <ThemedView style={styles.requestLoading}>
                      <ThemedText>Waiting for ride request</ThemedText>
                    </ThemedView>
                  </ThemedView>
                </ThemedView>
              )}
            </BottomSheetView>
          </BottomSheetModal>
        </ThemedView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  statusContainer: {
    flexDirection: "row",
    padding: 15,
    width: "100%",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
  },
  statusText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: "auto",
  },
  statusSwitch: {
    marginLeft: 20,
  },
  totalContainer: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    width: "90%",
    marginTop: 20,
  },
  totalEarnings: {
    backgroundColor: "#5d59ff",
    padding: 15,
    borderRadius: 10,
    borderColor: "#5d59aa",
    borderWidth: 1,
  },
  totalEarningsBigText: {
    color: "#fff",
    fontSize: 36,
    marginTop: 10,
    lineHeight: 45,
    textAlign: "center",
  },
  totalEarningsSmallText: {
    color: "#fff",
  },
  totalTrips: {
    backgroundColor: "#eee",
    padding: 15,
    borderRadius: 10,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  totalTripsBigText: {
    color: "#222",
    fontSize: 36,
    marginTop: 10,
    lineHeight: 45,
    textAlign: "center",
  },
  totalTripsSmallText: {
    color: "#222",
  },
  requestContainer: {
    marginTop: 10,
    padding: 10,
    height: 130,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  requestLoading: {
    marginTop: 15,
    alignItems: "center",
  },
});
