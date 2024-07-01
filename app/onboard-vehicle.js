import React, { useState, useEffect } from 'react';
import { ProgressBar, Snackbar } from 'react-native-paper';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Image } from 'expo-image';
import VehicleInformationStep from '@/components/VehicleInformationStep';

export default function OnboardingVehicleScreen() {
  const [snackbarVisible, setSnackbarVisible] = useState(true);

  const onDismissSnackBar = () => setSnackbarVisible(false);

  return (
    <>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={require('@/assets/images/vehicle-info.jpg')}
            style={styles.banner}
            contentFit='cover'
          />
        }>
        <ProgressBar progress={0.99} color='#5d59ff' />
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="subtitle" style={styles.step}>Step Three</ThemedText>
          <ThemedText type="title">Vehicle Information</ThemedText>
          <ThemedText style={styles.subinfotext}>Final step to complete your profile set up</ThemedText>
        </ThemedView>
        <VehicleInformationStep />
      </ParallaxScrollView>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'OK',
          onPress: () => {
            // Do something if needed when user presses 'OK'
          },
        }}
        elevation={4} duration={5000}>You are almost done.
      </Snackbar>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  step: {
    lineHeight: 20,
    backgroundColor: '#7D76FF',
    color: '#fff',
    width: 84,
    padding: 5,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10
  },
  banner: {
    height: 300,
  },
  subinfotext: {
    fontSize: 14,
  }
});