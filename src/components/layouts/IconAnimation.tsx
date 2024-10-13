import {StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect} from 'react';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {colors} from '../../constants/colors';
import {handleSize} from '../../utils/handleSize';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

interface Props {
  name: string;
  focused: boolean;
  sizeStart: number;
  sizeEnd: number;
  colorStart?: string;
  colorEnd?: string;
}

const IconAnimation: FC<Props> = ({
  name,
  focused,
  sizeStart,
  sizeEnd,
  colorStart,
  colorEnd,
}) => {
  const handleSizeStart = handleSize(sizeStart);
  const handleSizeEnd = handleSize(sizeEnd);
  const size = useSharedValue(handleSize(handleSizeStart));
  const color = useSharedValue(focused ? 1 : 0);
  const sizeMiddle = handleSize(2)

  const animetedStyle = useAnimatedStyle(() => ({
    transform: [{scale: size.value / handleSizeStart}],
    color: interpolateColor(
      color.value,
      [0, 1],
      [colorStart ?? colors.Gray_Color, colorEnd ?? colors.Primary_Color],
    ),
  }));

  useEffect(() => {
    if (focused) {
      size.value = withTiming(handleSizeEnd, {duration: 2000}, () => {
        size.value = withTiming(handleSizeEnd - sizeMiddle, {duration: 2000});
      });
      color.value = withTiming(1, {duration: 4000});
    } else {
      size.value = withTiming(handleSizeStart, {duration: 2000});
      color.value = withTiming(0, {duration: 2000});
    }
  }, [focused]);

  return (
    <Animated.View style={animetedStyle}>
      <FontAwesome5 name={name} size={size.value} color={animetedStyle.color}/>
    </Animated.View>
  );
};

export default IconAnimation;
