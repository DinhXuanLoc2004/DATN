import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {stackParamListMain} from '../../../../navigation/StackMainNavigation';
import ContainerComponent from '../../../../components/layouts/ContainerComponent';
import {globalStyles} from '../../../../styles/globalStyle';
import SpaceComponent from '../../../../components/layouts/SpaceComponent';
import StarComponent from '../../../../components/layouts/StarComponent';
import RowComponent from '../../../../components/layouts/RowComponent';
import {
  Asset,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import SectionComponent from '../../../../components/layouts/SectionComponent';
import {handleSize} from '../../../../utils/handleSize';
import {colors} from '../../../../constants/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import TextComponent from '../../../../components/texts/TextComponent';
import PagerView from 'react-native-pager-view';
import {fontFamilies} from '../../../../constants/fontFamilies';
import {product_detail_order} from '../../../../helper/types/order.type';
import {getProductDetailOrderAPI} from '../../../../helper/apis/order.api';
import TextColorAndSizeComponent from '../../../../components/texts/TextColorAndSizeComponent';
import SalePriceComponent from '../../../../components/texts/SalePriceComponent';
import {fotmatedAmount} from '../../../../utils/fotmats';
import ButtonComponent from '../../../../components/buttons/ButtonComponent';
import Video from 'react-native-video';
import ImageViewing from 'react-native-image-viewing';
import MediaViewing from '../../../../components/viewers/MediaViewing';
import {media} from '../../../../helper/types/media.type';
import {propsAddReviewAPI} from '../../../../helper/types/review.type';
import {useAppSelector} from '../../../../helper/store/store';
import {addReviewAPI} from '../../../../helper/apis/review.api';
import ProgressUpload from '../../../../components/loading/ProgressUpload';
import {StackNavigationProp} from '@react-navigation/stack';
import {useQueryClient} from '@tanstack/react-query';
import {getReviewsForOrderQueryKey} from '../../../../constants/queryKeys';
import DialogErrorIOS from '../../../../components/dialogs/DialogErrorIOS';

type routeProp = RouteProp<stackParamListMain, 'ReviewScreen'>;
type stackProp = StackNavigationProp<stackParamListMain, 'ReviewScreen'>;

const ReviewScreen = ({route}: {route: routeProp}) => {
  const {product_order_id} = route.params;
  const [star, setstar] = useState<number>(5);
  const [medias, setmedias] = useState<Asset[]>([]);
  const initAsset: Asset = {
    base64: '',
    bitrate: 0,
    duration: 0,
    fileName: '',
    fileSize: 0,
    height: 0,
    id: '',
    originalPath: '',
    timestamp: '',
    type: '',
    uri: '',
    width: 0,
  };
  const [product_detail, setproduct_detail] = useState<product_detail_order>();
  const [content, setcontent] = useState('');
  const [isVisible, setisVisible] = useState(false);
  const [mediaIndex, setmediaIndex] = useState(0);
  const [is_loading, setis_loading] = useState(false);
  const [progress, setprogress] = useState(0);
  const [is_err_upload, setis_err_upload] = useState(false);

  const getProductDetailOrder = async () => {
    const data = await getProductDetailOrderAPI(product_order_id);
    if (data?.metadata) {
      setproduct_detail(data.metadata);
    }
  };

  useEffect(() => {
    getProductDetailOrder();
  }, []);

  const openCamera = async () => {
    const result = await launchCamera({mediaType: 'mixed'});
    console.log(result);
    const newMedias = result.assets ? [...medias, result.assets[0]] : medias;
    setmedias(newMedias);
  };

  const MAX_CONTENT = 300;
  const MAX_MEDIAS = 6;

  const selectMedia = async () => {
    const result = await launchImageLibrary({
      mediaType: 'mixed',
      selectionLimit: MAX_CONTENT - medias.length,
    });
    const newMedias = result.assets
      ? [...medias, ...result.assets.slice(0, MAX_MEDIAS - medias.length)]
      : medias;
    setmedias(newMedias);
  };

  const deletMedia = (media: Asset, index: number) => {
    const newMedia = medias.filter(item => item.uri !== media.uri);
    setmedias(newMedia);
  };

  const user_id = useAppSelector(state => state.auth.user.userId);

  const navigation = useNavigation<stackProp>();

  const queryClient = useQueryClient();

  const handleAddReview = async () => {
    const body: propsAddReviewAPI = {
      rating: star,
      content: content,
      images: medias,
      product_order_id,
      user_id,
    };
    setis_loading(true);
    const data = await addReviewAPI(body, setprogress);
    setis_loading(false);
    if (data?.status === 201) {
      queryClient.invalidateQueries({queryKey: [getReviewsForOrderQueryKey]});
      navigation.goBack();
    } else {
      setis_err_upload(true);
    }
  };

  return (
    <ContainerComponent
      isHeader
      back
      title="Write a review"
      styleHeader={globalStyles.headerElevation}>
      <SpaceComponent height={15} />
      {product_detail && (
        <RowComponent style={styles.containerItem} justify="flex-start">
          <Image source={{uri: product_detail.thumb}} style={styles.thumb} />
          <SpaceComponent width={10} />
          <SectionComponent>
            <SpaceComponent height={5} />
            <TextComponent
              text={product_detail.name_product}
              font={fontFamilies.medium}
              numberOfLines={1}
            />
            <SpaceComponent height={5} />
            <TextComponent
              text={`${product_detail.name_brand} - ${product_detail.name_category}`}
              size={12}
              font={fontFamilies.medium}
              color={colors.Gray_Color}
            />
            <SpaceComponent height={5} />
            <TextColorAndSizeComponent
              color={product_detail.name_color}
              size={product_detail.size}
            />
            <SpaceComponent height={5} />
            <TextComponent
              text={fotmatedAmount(product_detail.price)}
              size={12}
              font={fontFamilies.medium}
            />
          </SectionComponent>
        </RowComponent>
      )}
      <SpaceComponent height={20} />
      <SectionComponent style={styles.containerStar} flex={0}>
        <StarComponent star={star} onPress={setstar} size={30} spaceStar={15} />
        <SpaceComponent height={15} />
        <TextComponent text="Rate this product" font={fontFamilies.medium} />
      </SectionComponent>
      <RowComponent style={styles.row}>
        <TextComponent text="Write a review" font={fontFamilies.medium} />
        <TextComponent
          text={`${content.length}/${MAX_CONTENT}`}
          size={14}
          font={fontFamilies.medium}
          color={colors.Gray_Color}
        />
      </RowComponent>
      <TextInput
        multiline
        style={[styles.border, styles.inputContent]}
        value={content}
        onChangeText={setcontent}
        maxLength={MAX_CONTENT}
        placeholder="What do you think about the style, color, fit?"
      />
      <RowComponent style={styles.row}>
        <TextComponent text="Add photos or videos" font={fontFamilies.medium} />
        <TextComponent
          text={`${medias.length}/${MAX_MEDIAS}`}
          size={14}
          font={fontFamilies.medium}
          color={colors.Gray_Color}
        />
      </RowComponent>
      <SectionComponent
        style={[
          styles.border,
          styles.padding,
          {alignItems: medias.length === 0 ? 'center' : 'flex-start'},
        ]}
        flex={0}>
        {medias.length === 0 ? (
          <TextComponent
            text="No photos or videos yet"
            size={14}
            color={colors.Gray_Color}
            font={fontFamilies.medium}
          />
        ) : (
          <RowComponent style={{flexWrap: 'wrap'}} justify="flex-start">
            {medias.map((item, index) => (
              <TouchableOpacity
                style={styles.itemMedia}
                key={index.toString()}
                onPress={() => {
                  setmediaIndex(index);
                  setisVisible(true);
                }}>
                <TouchableOpacity
                  style={styles.btnDeleteMedia}
                  onPress={() => deletMedia(item, index)}>
                  <TextComponent
                    text="X"
                    color={colors.Primary_Color}
                    font={fontFamilies.bold}
                  />
                </TouchableOpacity>
                <View>
                  {item.type?.includes('image') ? (
                    <Image source={{uri: item.uri}} style={styles.media} />
                  ) : (
                    <View>
                      <FontAwesome5
                        name="play-circle"
                        solid
                        size={handleSize(25)}
                        style={styles.icon_play}
                        color={colors.White_Color}
                      />
                      <Video
                        source={{uri: item.uri}}
                        style={styles.media}
                        paused
                        resizeMode="cover"
                      />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </RowComponent>
        )}
      </SectionComponent>
      <SpaceComponent height={10} />
      <RowComponent
        justify="flex-start"
        style={{opacity: medias.length === MAX_MEDIAS ? 0.5 : 0.85}}>
        <TouchableOpacity
          onPress={openCamera}
          disabled={medias.length === MAX_MEDIAS}>
          <FontAwesome5
            name="camera"
            size={handleSize(25)}
            color={colors.Text_Color}
          />
        </TouchableOpacity>
        <SpaceComponent width={10} />
        <TouchableOpacity
          onPress={selectMedia}
          disabled={medias.length === MAX_MEDIAS}>
          <FontAwesome5
            name="images"
            size={handleSize(25)}
            color={colors.Text_Color}
          />
        </TouchableOpacity>
      </RowComponent>
      <ButtonComponent
        text="Send review"
        style={styles.btnReview}
        onPress={() => {
          handleAddReview();
        }}
      />
      {medias.map(item => item.uri).length > 0 && (
        <MediaViewing
          medias={medias.map(item => {
            const media: media = {
              url: item.uri ?? '',
              public_id: '',
              type: item.type ?? '',
            };
            return media;
          })}
          is_visible={isVisible}
          media_index={mediaIndex}
          set_isvisible={setisVisible}
          setmedia_index={setmediaIndex}
        />
      )}
      <ProgressUpload
        is_visible={is_loading}
        progress={progress}
        title="Sending review..."
      />
      <DialogErrorIOS
        isVisible={is_err_upload}
        setIsvisble={setis_err_upload}
        content="Connection is unstable, please review again!"
      />
    </ContainerComponent>
  );
};

export default ReviewScreen;

const styles = StyleSheet.create({
  icon_play: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -12.5}, {translateY: -12.5}], // Canh giữa nút
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 100,
  },
  itemMedia: {
    paddingVertical: 10,
    paddingRight: 10,
  },
  btnDeleteMedia: {
    position: 'absolute',
    end: 5,
    top: 5,
    zIndex: 100,
  },
  media: {
    height: handleSize(70),
    width: handleSize(70),
    borderRadius: handleSize(6),
  },
  btnReview: {
    position: 'absolute',
    bottom: 20,
  },
  padding: {
    paddingVertical: handleSize(10),
    paddingHorizontal: handleSize(10),
    flexWrap: 'wrap',
  },
  inputContent: {
    paddingHorizontal: handleSize(10),
  },
  border: {
    borderRadius: handleSize(2),
    borderColor: 'rgba(155, 155, 155, 0.3)',
    borderWidth: 1,
  },
  row: {
    paddingVertical: handleSize(15),
  },
  containerStar: {
    alignItems: 'center',
    paddingBottom: handleSize(15),
    borderBottomColor: 'rgba(155, 155, 155, 0.3)',
    borderBottomWidth: 1,
  },
  thumb: {
    height: '100%',
    width: handleSize(80),
    borderRadius: handleSize(5),
  },
  containerItem: {
    height: handleSize(85),
    width: '100%',
    alignItems: 'flex-start',
  },
  dot: {
    width: handleSize(7),
    height: handleSize(7),
    borderRadius: 100,
    marginHorizontal: handleSize(3),
  },
  listDot: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
  listMedia: {
    height: '100%',
    width: '100%',
  },
  img: {
    borderRadius: handleSize(20),
    flex: 1,
    height: 'auto',
    aspectRatio: 9 / 7.89,
    resizeMode: 'cover',
  },
  rowBtn: {},
  btnMedia: {
    width: handleSize(52),
    height: handleSize(52),
    borderRadius: handleSize(26),
    backgroundColor: colors.Primary_Color,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerMedia: {
    width: '100%',
    height: handleSize(300),
    backgroundColor: colors.White_Color,
    borderRadius: handleSize(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
