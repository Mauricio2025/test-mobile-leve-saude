import React, { useRef } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type RatingProps = {
  value: number;
  onChange: (val: number) => void;
  size?: number;
};

export default function Rating({ value, onChange, size = 32 }: RatingProps) {
  const scaleAnimations = useRef(
    Array(5).fill(0).map(() => new Animated.Value(1))
  ).current;

  const handlePress = (index: number) => {
    Animated.sequence([
      Animated.timing(scaleAnimations[index], {
        toValue: 1.3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnimations[index], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    onChange(index + 1);
  };

  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((star, i) => (
        <TouchableWithoutFeedback key={i} onPress={() => handlePress(i)}>
          <Animated.View style={{ transform: [{ scale: scaleAnimations[i] }] }}>
            <Ionicons
              name={star <= value ? 'star' : 'star-outline'}
              size={size}
              color={star <= value ? '#FB4C00' : '#ccc'}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 12,
  },
});
