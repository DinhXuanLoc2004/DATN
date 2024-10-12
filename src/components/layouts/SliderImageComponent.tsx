import React, {useRef, useState} from 'react';
import {Animated, FlatList, StyleSheet, View} from 'react-native';
import {handleSize, WIDTH_SCREEN} from '../../utils/handleSize';
import { colors } from '../../constants/colors';
import SectionComponent from './SectionComponent';
import { imageType } from '../../helper/types/image.type';
interface Props {
  images: Array<imageType>;
}

const width_image = WIDTH_SCREEN * 0.72;
const spacer_item_size = (WIDTH_SCREEN - width_image) / 2;
const SliderImageComponent: React.FC<Props> = ({images}) => {
  const initData: imageType = {
    url: '',
    public_id: ''
  }
  const data = [initData, ...images, initData];
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <SectionComponent flex={0}>
      <Animated.FlatList
        style={styles.container}
        horizontal
        data={data}
        keyExtractor={(_, index) => index.toString()}
        decelerationRate={0}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        snapToInterval={width_image}
        onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
          useNativeDriver: true,
        })}
        scrollEventThrottle={16}
        renderItem={({item, index}) => {
          const inputRage = [
            (index - 2) * width_image,
            (index - 1) * width_image,
            index * width_image,
          ];
          const change_scale = scrollX.interpolate({
            inputRange: inputRage,
            outputRange: [0.8, 1, 0.8],
          });
          const change_opacity = scrollX.interpolate({
            inputRange: inputRage,
            outputRange: [0.4, 1, 0.4],
          });
          const change_borderRadius = scrollX.interpolate({
            inputRange: inputRage,
            outputRange: [handleSize(20), 0, handleSize(20)]
          })
          return item.public_id === '' ? (
            <View style={{width: spacer_item_size, height: '100%'}} />
          ) : (
            <Animated.Image
              source={{uri: item.url}}
              style={[
                styles.image,
                {transform: [{scale: change_scale}], opacity: change_opacity, borderRadius: change_borderRadius},
              ]}
            />
          );
        }}
      />
    </SectionComponent>
  );
};

const styles = StyleSheet.create({
  image: {
    width: width_image,
    height: '100%',
  },
  container: {
    width: '100%',
    height: handleSize(413),
    backgroundColor: colors.White_Color,
    borderBottomWidth: 1,
    borderBottomColor: colors.Gray_Color
  },
});

export default SliderImageComponent;
