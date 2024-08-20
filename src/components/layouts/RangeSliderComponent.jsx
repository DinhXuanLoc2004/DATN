import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import RangeSlider from 'rn-range-slider';
import {colors} from '../../constants/colors';
import TitleComponent from '../texts/TitleComponent';
import RowComponent from './RowComponent';
import SectionComponent from './SectionComponent';
import SpaceComponent from './SpaceComponent';
const RangeSliderComponent = () => {
  const [lowValue, setLowValue] = useState(78);
  const [highValue, setHighValue] = useState(143);

  return (
    <SectionComponent style={styles.container}>
      <SpaceComponent height={20} />
      <RowComponent justify="space-between">
        <TitleComponent size={14} text={`$${lowValue}`} />
        <TitleComponent size={14} text={`$${highValue}`} />
      </RowComponent>
      <SectionComponent>
        <RangeSlider
          min={0}
          max={200}
          low={lowValue}
          high={highValue}
          step={1}
          onValueChanged={(low, high) => {
            setLowValue(low);
            setHighValue(high);
          }}
          renderThumb={() => <SectionComponent style={styles.thumb} />}
          renderRail={() => <SectionComponent style={styles.rail} />}
          renderRailSelected={() => (
            <SectionComponent style={styles.railSelected} />
          )}
          disableRange={false}
          floatingLabel={false}
        />
      </SectionComponent>
    </SectionComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  thumb: {
    flex: 0,
    width: 20,
    height: 20,
    backgroundColor: colors.Primary_Color,
    borderRadius: 10,
  },
  rail: {
    height: 3,
    backgroundColor: colors.Gray_Color,
  },
  railSelected: {
    height: 3,
    backgroundColor: colors.Primary_Color,
  },
});

export default RangeSliderComponent;
