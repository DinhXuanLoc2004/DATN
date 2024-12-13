import {StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import TextComponent from '../../texts/TextComponent';
import { fontFamilies } from '../../../constants/fontFamilies';
import { colors } from '../../../constants/colors';

interface Props {
  time_end: string;
  is_not_end_later?: boolean;
}

const CountDownTime: FC<Props> = ({time_end, is_not_end_later}) => {
  const targetTime = new Date(time_end).getTime();
  const [timeLeft, settimeLeft] = useState<number>(targetTime - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const remaining = targetTime - now;
      if (remaining <= 0) {
        clearInterval(interval);
        settimeLeft(0);
      } else {
        settimeLeft(remaining);
      }

      return () => clearInterval(interval);
    }, 1000);
  }, [targetTime]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <View>
      <TextComponent
        text={`${is_not_end_later ? '' : 'End later: '}${days > 0 ? `${days} days - ` : ''}${hours}:${minutes}:${seconds}s`}
        size={12}
        font={fontFamilies.medium}
        color={colors.Gray_Color}
        numberOfLines={1}
      />
    </View>
  );
};

export default CountDownTime;

const styles = StyleSheet.create({});
