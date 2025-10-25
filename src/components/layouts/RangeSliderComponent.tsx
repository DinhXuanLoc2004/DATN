import React, {FC, memo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import RangeSlider from 'rn-range-slider';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {handleSize} from '../../utils/handleSize';
import TitleComponent from '../texts/TitleComponent';
import RowComponent from './RowComponent';
import SectionComponent from './SectionComponent';
import { fotmatedAmount } from '../../utils/fotmats';

interface Props {
  min: number;
  max: number;
  minSelected: number;
  set_minSelected: (val: number) => void;
  maxSelected: number;
  set_maxSelected: (val: number) => void;
}

const RangeSliderComponent: FC<Props> = ({
  min,
  max,
  minSelected,
  set_minSelected,
  maxSelected,
  set_maxSelected,
}) => {
  return (
    <SectionComponent>
      <RowComponent justify="space-between">
        <TitleComponent
          size={14}
          font={fontFamilies.medium}
          text={fotmatedAmount(minSelected)}
        />
        <TitleComponent
          size={14}
          font={fontFamilies.medium}
          text={fotmatedAmount(maxSelected)}
        />
      </RowComponent>
      <SectionComponent>
        <RangeSlider
          min={min}
          max={max}
          low={minSelected}
          high={maxSelected}
          step={1}
          onValueChanged={(low, high) => {
            set_minSelected(low);
            set_maxSelected(high);
          }}
          renderThumb={() => <View style={styles.thumb} />}
          renderRail={() => <View style={styles.rail} />}
          renderRailSelected={() => <View style={styles.railSelected} />}
          disableRange={false}
          floatingLabel={false}
        />
      </SectionComponent>
    </SectionComponent>
  );
};

const styles = StyleSheet.create({
  thumb: {
    width: handleSize(20),
    height: handleSize(20),
    backgroundColor: colors.Primary_Color,
    borderRadius: 100,
  },
  rail: {
    height: handleSize(3),
    backgroundColor: colors.Gray_Color,
    flex: 1,
  },
  railSelected: {
    height: handleSize(3),
    backgroundColor: colors.Primary_Color,
  },
});

export default memo(RangeSliderComponent);
