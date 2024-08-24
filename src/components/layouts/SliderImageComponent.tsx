import React from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import Swiper from 'react-native-swiper';

const {width} = Dimensions.get('window');

interface SliderImageComponentProps {
  images: string[];
}

const SliderImageComponent: React.FC<SliderImageComponentProps> = ({
  images,
}) => {
  return (
    <View style={styles.container}>
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        autoplay={true}
        autoplayTimeout={3}
        paginationStyle={styles.pagination}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}>
        {images.map((uri, index) => (
          <View key={index} style={styles.slide}>
            <Image source={{uri}} style={styles.image} />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height:415
  },
  wrapper: {},
  slide: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width,
    height: 413, // Hoặc kích thước mong muốn
    resizeMode: 'cover',
  },
  pagination: {
    bottom: 10,
  },
  dot: {
    backgroundColor: 'gray',
  },
  activeDot: {
    backgroundColor: 'black',
  },
});

export default SliderImageComponent;
