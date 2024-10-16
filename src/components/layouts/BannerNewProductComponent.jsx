import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-swiper';

const BannerNewProductComponent: React.FC = () => {
  // Danh sách hình ảnh cố định
  const images = [
    {
      uri: 'https://c0.wallpaperflare.com/preview/909/934/483/adult-attractive-beautiful-beauty.jpg',
    },
    {
      uri: 'https://img.freepik.com/free-vector/hand-drawn-fashion-collection-twitch-banner_23-2149985384.jpg',
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

export default BannerNewProductComponent;
