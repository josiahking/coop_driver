import React from 'react';
import { Text, StyleSheet, Pressable, PressableProps } from 'react-native';

export type ButtonProps = PressableProps & {
  title?: string;
  backgroundColor?: string,
  textColor?: string,
};

export function Button(props: ButtonProps) {
  const { onPress, title = 'Button', backgroundColor= 'black', textColor = 'white', ...rest } = props;
  return (
    <Pressable style={[{backgroundColor: backgroundColor},styles.button]} onPress={onPress} {...rest}>
      <Text style={[{color: textColor},styles.text]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
});
