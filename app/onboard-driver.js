import React, { useState, useEffect } from 'react';
import DriverInformationStep from '@/components/DriverInformationStep';
import { ProgressBar } from 'react-native-paper';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Image } from 'expo-image';

export default function OnboardingDriverScreen() {

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/driver-info.jpg')}
          style={styles.banner}
          contentFit='fill'
        />
      }>
      <ProgressBar progress={0.66} color='#5d59ff' />
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="subtitle" style={styles.step}>Step Two</ThemedText>
        <ThemedText type="title">Driver Information</ThemedText>
        <ThemedText style={styles.subinfotext}>Fill the form to progress to final step</ThemedText>
      </ThemedView>
      <DriverInformationStep />
    </ParallaxScrollView>
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