import React, {memo, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../../constants/colors';
import {fontFamilies} from '../../../constants/fontFamilies';
import {handleDate} from '../../../utils/handleDate';
import {handleSize} from '../../../utils/handleSize';
import TextComponent from '../../texts/TextComponent';
import RowComponent from '../RowComponent';
import SectionComponent from '../SectionComponent';
import SpaceComponent from '../SpaceComponent';
import StarComponent from '../StarComponent';
import {review} from '../../../helper/types/review.type';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Video from 'react-native-video';
import TextColorAndSizeComponent from '../../texts/TextColorAndSizeComponent';
import {Portal} from '@gorhom/portal';
import MediaViewing from '../../viewers/MediaViewing';

interface Props {
  review: review;
}

const ItemReviewComponent: React.FC<Props> = ({review}) => {
  const [isVisible, setisVisible] = useState(false);
  const [mediaIndex, setmediaIndex] = useState(0);
  return (
    <View style={styles.container}>
      <SectionComponent style={styles.containerContent}>
        <TextComponent
          text={review.email}
          size={14}
          font={fontFamilies.semiBold}
          numberOfLines={1}
        />
        <SpaceComponent height={8.68} />
        <RowComponent justify="space-between">
          <StarComponent star={review.rating} />
          <TextComponent
            text={handleDate.formatDate(new Date(review.createdAt))}
            size={11}
            color={colors.Gray_Color}
          />
        </RowComponent>
        <SpaceComponent height={10} />
        <RowComponent
          justify="flex-start"
          style={{width: '100%', marginBottom: 5}}>
          <RowComponent justify="flex-start">
            <TextComponent
              text="Color: "
              color={colors.Gray_Color}
              font={fontFamilies.regular}
              size={11}
            />
            <TextComponent
              text={review.color}
              size={11}
              color={colors.Text_Color}
              font={fontFamilies.regular}
            />
          </RowComponent>
          <SpaceComponent width={7} />
          <RowComponent justify="flex-start">
            <TextComponent
              text="Size: "
              color={colors.Gray_Color}
              font={fontFamilies.regular}
              size={11}
            />
            <TextComponent
              text={review.size}
              size={11}
              font={fontFamilies.regular}
            />
          </RowComponent>
        </RowComponent>
        <TextComponent
          text={review.content}
          size={14}
          lineHeight={23}
          letterSpacing={-0.05}
        />
        {review.images_review && (
          <RowComponent
            justify="flex-start"
            style={{flexWrap: 'wrap'}}
            flex={1}>
            {review.images_review.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index.toString()}
                  onPress={() => {
                    setmediaIndex(index);
                    setisVisible(true);
                  }}>
                  <SpaceComponent height={10} />
                  <View>
                    {item.type.includes('image') ? (
                      <Image source={{uri: item.url}} style={styles.media} />
                    ) : (
                      <View style={styles.media}>
                        <FontAwesome5Icon
                          name="play-circle"
                          solid
                          size={handleSize(25)}
                          style={styles.icon_play}
                          color={colors.White_Color}
                        />
                        <Video
                          source={{uri: item.url}}
                          style={styles.media}
                          paused
                          resizeMode="cover"
                        />
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </RowComponent>
        )}
      </SectionComponent>
      <Image
        source={{
          uri: 'https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg',
        }}
        style={styles.avatar}
      />
      <Portal>
        <MediaViewing
          medias={review.images_review}
          is_visible={isVisible}
          set_isvisible={setisVisible}
          media_index={mediaIndex}
          setmedia_index={setmediaIndex}
        />
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  icon_play: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -12.5}, {translateY: -12.5}],
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 100,
  },
  media: {
    height: handleSize(70),
    width: handleSize(70),
    borderRadius: handleSize(6),
    marginRight: handleSize(10),
  },
  avatar: {
    width: handleSize(32),
    height: handleSize(32),
    position: 'absolute',
    borderRadius: 100,
  },
  containerContent: {
    backgroundColor: colors.White_Color,
    paddingTop: handleSize(23),
    paddingStart: handleSize(24),
    paddingEnd: handleSize(20),
    paddingBottom: handleSize(16),
    borderRadius: handleSize(8),
    flex: 0,
  },
  container: {
    paddingTop: handleSize(16),
    paddingStart: handleSize(16),
  },
  reviewImage: {
    width: handleSize(104),
    height: handleSize(104),
    borderRadius: handleSize(8),
    marginRight: handleSize(16),
  },
  imageList: {
    marginBottom: 12,
  },
});

export default memo(ItemReviewComponent);
