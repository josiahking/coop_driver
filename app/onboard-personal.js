import React, { useState, useEffect } from 'react';
import PersonalInformationStep from '@/components/PersonalInformationStep';
import { Snackbar, ProgressBar } from 'react-native-paper';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Image } from 'expo-image';

export default function OnboardingPersonalScreen() {
  const [snackbarVisible, setSnackbarVisible] = useState(true);

  const onDismissSnackBar = () => setSnackbarVisible(false);

  return (
    <>
      
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={require('@/assets/images/personal-info.jpg')}
            style={styles.banner}
            contentFit='cover'
          />
        }>
        <ProgressBar progress={0.33} color='#5d59ff' />
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="subtitle" style={styles.step}>Step One</ThemedText>
          <ThemedText type="title">Personal Information</ThemedText>
          <ThemedText style={styles.subinfotext}>Fill in the form to make progress</ThemedText>
        </ThemedView>
        <PersonalInformationStep />
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
        elevation={4} duration={10000}>Welcome! Please complete the 3 steps to set up your profile.
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
    width: 80,
    padding: 5,
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 10
  },
  banner: {
    height: 350,
  },
  subinfotext: {
    fontSize: 14,
  }
});