import React, {useEffect, useRef, useState} from 'react';
import {Animated, FlatList, StyleSheet, View, ViewToken} from 'react-native';
import {handleSize, WIDTH_SCREEN} from '../../utils/handleSize';
import {colors} from '../../constants/colors';
import SectionComponent from './SectionComponent';
import {imageType} from '../../helper/types/image.type';
import {media} from '../../helper/types/media.type';
import Video from 'react-native-video';
import RowComponent from './RowComponent';
interface Props {
  images: Array<media>;
  index?: number;
  setindex?: (val: number) => void;
  is_show_index?: boolean;
}

const width_image = WIDTH_SCREEN * 1;
const spacer_item_size = 0;

const SliderImageComponent: React.FC<Props> = ({
  images,
  index,
  setindex,
  is_show_index,
}) => {
  const initData: media = {
    url: '',
    public_id: '',
    type: '',
  };
  const data: media[] = [initData, ...images, initData];
  const scrollX = useRef(new Animated.Value(0)).current;

  const onScrollEnd = (event: any) => {
    const newIndex = Math.round(
      event.nativeEvent.contentOffset.x / width_image,
    );
    if (setindex) {
      setindex(newIndex);
    }
  };

  useEffect(() => {
    if (index && index >= 0 && index < images.length) {
      refList.current?.scrollToIndex({
        index: index,
        animated: true,
      });
    }
  }, [index]);

  const refList = useRef<FlatList>(null);

  const [pausedStates, setPausedStates] = useState<boolean[]>(
    Array(images.length).fill(true),
  );

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    const updatedPausedStates = pausedStates.map((_, index) => {
      return viewableItems.some(item => item.index === index);
    });
    setPausedStates(updatedPausedStates);
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  return (
    <SectionComponent flex={0}>
      <Animated.FlatList
        ref={refList}
        style={styles.container}
        horizontal
        data={data}
        keyExtractor={(_, index) => index.toString()}
        decelerationRate={0}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        snapToInterval={width_image}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: true,
          },
        )}
        scrollEventThrottle={16}
        getItemLayout={(data, index) => ({
          length: width_image,
          offset: width_image * index,
          index,
        })}
        onMomentumScrollEnd={onScrollEnd}
        onViewableItemsChanged={({viewableItems}) =>
          onViewableItemsChanged({viewableItems})
        }
        viewabilityConfig={viewabilityConfig}
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
            outputRange: [handleSize(20), 0, handleSize(20)],
          });
          if (item.url === '')
            return <View style={{width: spacer_item_size, height: '100%'}} />;
          return item.type.includes('image') ? (
            <Animated.Image
              source={{uri: item.url}}
              style={[
                styles.image,
                {
                  transform: [{scale: change_scale}],
                  opacity: change_opacity,
                  borderRadius: change_borderRadius,
                },
              ]}
            />
          ) : (
            <Animated.View
              style={[
                styles.image,
                {
                  transform: [{scale: change_scale}],
                  opacity: change_opacity,
                  borderRadius: change_borderRadius,
                },
              ]}>
              <Video
                source={{uri: item.url}}
                style={styles.image}
                paused
                controls
                resizeMode="cover"
              />
            </Animated.View>
          );
        }}
      />
      {is_show_index && (
        <RowComponent justify="center" style={styles.containerListDot}>
          {Array.from({length: images.length}).map((item, indexItem) => (
            <View
              style={[
                styles.dot,
                {
                  backgroundColor:
                    index === indexItem
                      ? colors.Primary_Color
                      : colors.Gray_Color,
                },
              ]}
              key={indexItem}
            />
          ))}
        </RowComponent>
      )}
    </SectionComponent>
  );
};

const styles = StyleSheet.create({
  containerListDot: {
    position: 'absolute',
    bottom: handleSize(10),
    width: '100%',
  },
  dot: {
    width: handleSize(7),
    height: handleSize(7),
    borderRadius: 100,
    backgroundColor: colors.Primary_Color,
    marginRight: handleSize(5),
  },
  image: {
    width: width_image,
    height: '100%',
    resizeMode: 'cover',
  },
  container: {
    width: '100%',
    height: handleSize(450),
    backgroundColor: colors.Transperen_Color,
    borderBottomWidth: 1,
    borderBottomColor: colors.Gray_Color,
  },
});

export default SliderImageComponent;
