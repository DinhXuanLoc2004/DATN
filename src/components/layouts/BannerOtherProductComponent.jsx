import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-swiper';

const BannerOtherProductComponent: React.FC = () => {
  // Danh sách hình ảnh cố định
  const images = [
    {
      uri: 'https://www.pelago.co/img/products/TH-Thailand/pattaya-customize-tailer-made-suite-package/d79e17bf-ab09-46c7-a764-3be8a08cae1a_pattaya-customize-tailer-made-suite-package-large.webp',
    },
    {
      uri: 'https://www.pelago.co/img/products/TH-Thailand/pattaya-customize-tailer-made-suite-package/279ea933-01e5-45cd-8cc6-ce89d74481e4_pattaya-customize-tailer-made-suite-package-large.webp',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Swiper autoplay loop showsPagination={false}>
          {images.map((image, index) => (
            <View style={styles.slide} key={index}>
              <Image style={styles.image} source={{ uri: image.uri }} />
            </View>
          ))}
        </Swiper>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 260,
    overflow: 'hidden',
    backgroundColor: 'black',
  },
  banner: {
    height: 260,
    width: '100%',
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
});

export default BannerOtherProductComponent;
