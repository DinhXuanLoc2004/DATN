import {Animated} from 'react-native';
import {INPUT_RANGE_HEADER_HOME} from '../constants/animatedValues/inputRanges';

const animationInterpolate = (
  animatedValue: Animated.Value,
  input: number[],
  output: number[] | string[],
) => {
  return animatedValue.interpolate({
    inputRange: input,
    outputRange: output,
    extrapolate: 'clamp',
  });
};

const animationHeaderHome = (
  animatedValue: Animated.Value,
  output: number[] | string[],
) => {
  return animationInterpolate(animatedValue, INPUT_RANGE_HEADER_HOME, output);
};

export {animationInterpolate, animationHeaderHome}
