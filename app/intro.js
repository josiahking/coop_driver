import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { Button } from '@/components/Button';

export default IntroScreen = () => {

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source="coop_splash"
        contentFit="contain"
      />
      <Text style={styles.intro}>Ready to Drive</Text>
      <View style={styles.buttons}>
        <Button title="Get Started" backgroundColor="#222" onPress={() => router.push('/welcome')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#5d59ff',
    },
    image: {
      width: '100%',
      height: '50%',
    },
    intro: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#fff'
    },
    buttons: {
      marginTop: 20,
    },
  });
  