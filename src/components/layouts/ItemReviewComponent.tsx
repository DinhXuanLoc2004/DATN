import React, {memo} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {handleDate} from '../../utils/handleDate';
import {handleSize} from '../../utils/handleSize';
import TextComponent from '../texts/TextComponent';
import RowComponent from './RowComponent';
import SectionComponent from './SectionComponent';
import SpaceComponent from './SpaceComponent';
import StarComponent from './StarComponent';

interface Props {
  user_name: string;
  avatar: string;
  rating: number;
  create_at: Date;
  content: string;
  arr_img_review?: string[];
  like: boolean;
}

const ItemReviewComponent: React.FC<Props> = ({
  user_name,
  avatar,
  rating,
  create_at,
  content,
  arr_img_review,
  like,
}) => {
  return (
    <View style={styles.container}>
      <SectionComponent style={styles.containerContent}>
        <TextComponent
          text={user_name}
          size={14}
          font={fontFamilies.semiBold}
        />
        <SpaceComponent height={8.68} />
        <RowComponent justify="space-between">
          <StarComponent star={rating} />
          <TextComponent
            text={handleDate.formatDate(create_at)}
            size={11}
            color={colors.Gray_Color}
          />
        </RowComponent>
        <SpaceComponent height={11.73} />
        <TextComponent
          text={content}
          size={14}
          lineHeight={23}
          letterSpacing={-0.05}
        />
        {arr_img_review && (
          <View>
            <SpaceComponent height={20} />
            <FlatList
              data={arr_img_review}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <Image source={{uri: item}} style={styles.reviewImage} />
              )}
              contentContainerStyle={styles.imageList}
            />
          </View>
        )}
        <SpaceComponent height={18} />
        <RowComponent justify="flex-end">
          <TouchableOpacity>
            <RowComponent style={{alignItems: 'flex-end'}}>
              <TextComponent
                text="Helpful"
                color={like ? colors.Primary_Color : colors.Gray_Color}
                size={11}
              />
              <SpaceComponent width={10} />
              <AntDesign
                name="like1"
                size={handleSize(15)}
                color={like ? colors.Primary_Color : colors.Gray_Color}
              />
            </RowComponent>
          </TouchableOpacity>
        </RowComponent>
      </SectionComponent>
      <Image source={{uri: avatar}} style={styles.avatar} />
    </View>
  );
};

const styles = StyleSheet.create({
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
