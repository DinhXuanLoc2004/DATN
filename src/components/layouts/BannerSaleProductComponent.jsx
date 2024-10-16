import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-swiper';

const BannerSaleProductComponent: React.FC = () => {
  // Danh sách hình ảnh cố định
  const images = [
    {
      uri: 'https://amacisalon.com/wp-content/uploads/2018/12/What-Is-Purple-Shampoo-And-Why-It-Is-A-Must-Have-For-Blonde-Hair.jpg',
    },
    {
      uri: 'https://marketplace.canva.com/EAFHG6sbLsQ/1/0/1600w/canva-brown-beige-simple-special-sale-banner-lQfPvhnznqs.jpg',
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

export default BannerSaleProductComponent;
