import React, {FC, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import {colors} from '../../../constants/colors';
import {fontFamilies} from '../../../constants/fontFamilies';
import {
  animationHeaderHome,
  animationInterpolate,
} from '../../../utils/animations';
import {handleSize} from '../../../utils/handleSize';
import LinearGradientComponet from '../LinearGradientComponet';
import RowComponent from '../RowComponent';
import SectionComponent from '../SectionComponent';
import SpaceComponent from '../SpaceComponent';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {StackNavigationProp} from '@react-navigation/stack';
import {stackParamListMain} from '../../../navigation/StackMainNavigation';
import {useNavigation} from '@react-navigation/native';
import TextComponent from '../../texts/TextComponent';

interface Props {
  animationValue: Animated.Value;
}

type stackProp = StackNavigationProp<stackParamListMain, 'BottomTab'>;

const PagerViewHeaderHome: FC<Props> = ({animationValue}) => {
  const ref = useRef<PagerView>(null);
  const [page, setpage] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setpage(prevPage => {
        const nextPage = prevPage < 5 ? prevPage + 1 : 0;
        ref.current?.setPage(nextPage);
        return nextPage;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const navigation = useNavigation<stackProp>();

  return (
    <View style={[styles.container]}>
      <Animated.View
        style={[
          styles.pagerView,
          {
            opacity: animationHeaderHome(animationValue, [1, 0]),
          },
        ]}>
        <PagerView style={styles.pagerView} initialPage={0} ref={ref}>
          <Image
            key={1}
            source={require('../../../assets/images/pager_view/img_pv_header_home.png')}
            style={styles.img}
          />
          <LinearGradientComponet
            styleContainerLinearGradient={styles.img}
            ArrColor={[colors.Transperen_Color, colors.Text_Color]}
            style={styles.liner}>
            <Image
              source={require('../../../assets/images/pager_view/img_pv_header2.jpg')}
              style={styles.img}
            />
          </LinearGradientComponet>

          <LinearGradientComponet
            styleContainerLinearGradient={styles.img}
            ArrColor={[colors.Transperen_Color, colors.Text_Color]}
            style={styles.liner}>
            <Image
              source={require('../../../assets/images/pager_view/img_pv_header3.jpg')}
              style={styles.img}
            />
          </LinearGradientComponet>

          <LinearGradientComponet
            styleContainerLinearGradient={styles.img}
            ArrColor={[colors.Transperen_Color, colors.Text_Color]}
            style={styles.liner}>
            <Image
              source={require('../../../assets/images/pager_view/img_pv_header4.jpg')}
              style={styles.img}
            />
          </LinearGradientComponet>

          <LinearGradientComponet
            styleContainerLinearGradient={styles.img}
            ArrColor={[colors.Transperen_Color, colors.Text_Color]}
            style={styles.liner}>
            <Image
              source={require('../../../assets/images/pager_view/img_pv_header5.jpg')}
              style={styles.img}
            />
          </LinearGradientComponet>
        </PagerView>
      </Animated.View>

      <RowComponent style={styles.listDot} justify="center">
        {Array.from({length: 5}).map((_, index) => (
          <View
            key={index.toString()}
            style={[
              styles.dot,
              {
                backgroundColor:
                  page === index
                    ? colors.Primary_Color
                    : colors.Gray_Light_Color,
                opacity: index === page ? 1 : 0.5,
              },
            ]}
          />
        ))}
      </RowComponent>

      <SectionComponent style={styles.containerContent}>
        <Animated.Text
          style={[
            styles.text,
            {
              transform: [
                {
                  translateY: animationHeaderHome(animationValue, [0, 75]),
                },
              ],
            },
          ]}>
          Fashion
        </Animated.Text>
        <Animated.Text
          style={[
            styles.text,
            {
              transform: [
                {
                  translateX: animationHeaderHome(animationValue, [0, 275]),
                },
                {
                  translateY: animationHeaderHome(animationValue, [0, -25]),
                },
              ],
            },
          ]}>
          Shop
        </Animated.Text>
        <SpaceComponent height={10} />
        <TouchableOpacity
          style={styles.btnSearach}
          onPress={() => {
            navigation.navigate('SearchScreen');
          }}>
          <Animated.View
            style={[
              styles.containerBtnSrearch,
              {
                transform: [
                  {
                    scaleX: animationHeaderHome(animationValue, [1, 2]),
                  },
                  {
                    translateX: animationHeaderHome(animationValue, [0, 55]),
                  },
                ],
                backgroundColor: animationInterpolate(
                  animationValue,
                  [0, handleSize(475)],
                  [colors.Primary_Color, colors.White_Color],
                ),
                borderRadius: animationHeaderHome(animationValue, [25, 0]),
                opacity: animationHeaderHome(animationValue, [1, 0]),
              },
            ]}></Animated.View>
          <Animated.Text
            style={[
              styles.txtSearch,
              {
                color: animationInterpolate(
                  animationValue,
                  [0, 200],
                  [colors.White_Color, colors.Text_Color],
                ),
                transform: [
                  {
                    translateX: animationInterpolate(
                      animationValue,
                      [0, 100],
                      [0, handleSize(-30)],
                    ),
                  },
                ],
              },
            ]}>
            Search
          </Animated.Text>
          <Animated.View
            style={[
              styles.iconSearch,
              {
                opacity: animationInterpolate(animationValue, [0, 200], [0, 1]),
                transform: [
                  {
                    translateX: animationInterpolate(
                      animationValue,
                      [0, handleSize(556)],
                      [0, 200],
                    ),
                  },
                ],
              },
            ]}>
            <FontAwesome5 name="search" size={handleSize(24)} />
          </Animated.View>
        </TouchableOpacity>
        <SpaceComponent height={10} />
        <RowComponent justify='flex-start'>
          <TouchableOpacity onPress={() => navigation.navigate('SalesScreen')}>
            <Animated.View
              style={{
                opacity: animationHeaderHome(animationValue, [1, 0]),
                transform: [
                  {scale: animationHeaderHome(animationValue, [1, 0])},
                ],
                alignItems: 'center'
              }}>
              <Image
                source={{
                  uri: 'https://icon-library.com/images/icon-sale/icon-sale-5.jpg',
                }}
                style={styles.icon}
              />
              <SpaceComponent height={5} />
              <TextComponent
                text="Sales"
                color={colors.White_Color}
                font={fontFamilies.medium}
                size={14}
              />
            </Animated.View>
          </TouchableOpacity>
          <SpaceComponent width={20}/>
          <TouchableOpacity onPress={() => navigation.navigate('VouchersScreen')}>
            <Animated.View
              style={{
                opacity: animationHeaderHome(animationValue, [1, 0]),
                transform: [
                  {scale: animationHeaderHome(animationValue, [1, 0])},
                ],
                alignItems: 'center'
              }}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/2689/2689901.png',
                }}
                style={styles.icon}
              />
              <SpaceComponent height={5} />
              <TextComponent
                text="Vouchers"
                color={colors.White_Color}
                font={fontFamilies.medium}
                size={14}
              />
            </Animated.View>
          </TouchableOpacity>
        </RowComponent>
        <SpaceComponent height={10} />
      </SectionComponent>
    </View>
  );
};

export default PagerViewHeaderHome;

const styles = StyleSheet.create({
  icon: {
    height: handleSize(30),
    width: handleSize(30),
  },
  iconSearch: {
    position: 'absolute',
    top: handleSize(7),
    left: handleSize(120),
  },
  containerContentBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  txtSearch: {
    fontSize: handleSize(14),
    fontFamily: fontFamilies.medium,
    position: 'absolute',
    left: handleSize(60),
    top: handleSize(7),
  },
  btnSearach: {flex: 1, justifyContent: 'center'},
  containerBtnSrearch: {
    height: handleSize(36),
    width: handleSize(160),
  },
  text: {
    fontSize: handleSize(48),
    color: colors.White_Color,
    fontFamily: fontFamilies.bold,
  },
  containerContent: {
    position: 'absolute',
    zIndex: 100,
    bottom: 20,
    paddingHorizontal: handleSize(16),
  },
  listDot: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
  dot: {
    width: handleSize(7),
    height: handleSize(7),
    borderRadius: 100,
    marginHorizontal: handleSize(3),
  },
  liner: {
    height: '50%',
  },
  img: {
    width: '100%',
    height: '100%',
  },
  pagerView: {
    flex: 1,
  },
  container: {
    height: handleSize(536),
    width: '100%',
  },
});
