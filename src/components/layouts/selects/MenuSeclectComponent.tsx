import React, { useEffect, useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../../../constants/colors';
import { fontFamilies } from '../../../constants/fontFamilies';
import {
  modle_color_example,
  modle_size_example,
} from '../../../models/modelsExample';
import { handleSize } from '../../../utils/handleSize';
import { onLayout } from '../../../utils/onLayout';
import TextComponent from '../../texts/TextComponent';
import RowComponent from '../RowComponent';
import SectionComponent from '../SectionComponent';

type allType = modle_color_example | modle_size_example;
interface Props {
  options: modle_size_example[] | modle_color_example[];
  placeholder: string;
  style?: StyleProp<ViewStyle>;
  selected: allType | null;
  set_selected: (val: allType) => void;
}

const MenuSelectComponent: React.FC<Props> = ({
  options,
  placeholder,
  style,
  selected,
  set_selected,
}) => {
  const [isVisible, setisVisible] = useState<boolean>(false);
  const [height, setheight] = useState<number>(0);
  const offset = useSharedValue(0);
  const opacity = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: offset.value}],
    opacity: opacity.value,
  }));
  useEffect(() => {
    if (isVisible) {
      (offset.value = withTiming(height + 10)), (opacity.value = withTiming(1));
    } else {
      (offset.value = withTiming(0)), (opacity.value = withTiming(0));
    }
  }, [isVisible]);
  const handleCondition = (
    item: modle_size_example | modle_color_example | null,
  ): string => {
    if (item) {
      if (typeof item === 'object' && 'name_color' in item) {
        return item.name_color;
      } else {
        return item.name_size;
      }
    } else {
      return '';
    }
  };
  return (
    <SectionComponent flex={0} style={{zIndex: 999}}>
      <TouchableOpacity
        style={{zIndex: 1}}
        onPress={() => setisVisible(!isVisible)}>
        <RowComponent
          style={[
            {
              borderColor:
                handleCondition(selected) === undefined
                  ? colors.Gray_Color
                  : colors.Primary_Color,
            },
            styles.container,
          ]}
          onLayout={event => onLayout(event, setheight)}>
          <TextComponent
            text={
              handleCondition(selected) === undefined
                ? placeholder
                : handleCondition(selected)
            }
            size={14}
            font={fontFamilies.medium}
          />
          <FontAwesome5
            name={!isVisible ? 'chevron-down' : 'chevron-up'}
            size={handleSize(14)}
            color={colors.Text_Color}
          />
        </RowComponent>
      </TouchableOpacity>
      <Animated.View style={[animatedStyle, styles.containerOptions]}>
        {isVisible && options.map((item, index) => (
          <TouchableOpacity
            key={index.toString()}
            onPress={() => {
              set_selected(item);
              setisVisible(!isVisible);
            }}>
            <RowComponent style={styles.itemOption}>
              <RowComponent justify="flex-start">
                {'code_color' in item && (
                  <SectionComponent flex={0} style={styles.containerView}>
                    <View
                      style={[
                        {backgroundColor: item.code_color},
                        styles.viewColor,
                      ]}
                    />
                  </SectionComponent>
                )}
                <TextComponent
                  text={handleCondition(item)}
                  size={14}
                  font={fontFamilies.medium}
                />
              </RowComponent>
              {handleCondition(selected) === handleCondition(item) && (
                <FontAwesome5
                  name="check"
                  size={handleSize(12)}
                  color={colors.Text_Color}
                />
              )}
            </RowComponent>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </SectionComponent>
  );
};

const styles = StyleSheet.create({
  containerView:{
    marginRight: handleSize(5),
    borderWidth: handleSize(1),
    borderColor: colors.Primary_Color,
    width: handleSize(19),
    height: handleSize(19),
    borderRadius: handleSize(9.5),
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewColor: {
    borderRadius: handleSize(7.5),
    width: handleSize(15),
    height: handleSize(15),
  },
  itemOption: {
    marginVertical: handleSize(5),
  },
  containerOptions: {
    width: handleSize(138),
    paddingHorizontal: handleSize(12),
    paddingVertical: handleSize(11),
    borderWidth: handleSize(1),
    borderRadius: handleSize(8),
    borderColor: colors.Gray_Color,
    backgroundColor: colors.White_Color,
    position: 'absolute',
  },
  container: {
    width: handleSize(138),
    height: handleSize(40),
    borderWidth: handleSize(1),
    borderRadius: handleSize(8),
    backgroundColor: colors.White_Color,
    paddingHorizontal: handleSize(12),
  },
});

export default MenuSelectComponent;
