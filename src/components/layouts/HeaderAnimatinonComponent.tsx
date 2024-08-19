import React, { FC } from 'react'
import { Animated, Image, StyleSheet } from 'react-native'
import { colors } from '../../constants/colors'
import { fontFamilies } from '../../constants/fontFamilies'
import TextComponent from '../texts/TextComponent'
import LinearGradientComponet from './LinearGradientComponet'
import RowComponent from './RowComponent'
import SectionComponent from './SectionComponent'

interface Props {
    animatedValue: Animated.Value
}

const HeaderAnimatinonComponent: FC<Props> = ({animatedValue}) => {
  return (
    <SectionComponent>
        <SectionComponent style={styles.containerNewCollection}>
          <Animated.View
            style={[
              styles.imgOne,
              {
                opacity: animatedValue.interpolate({
                  inputRange: [0, 366],
                  outputRange: [1, 0.25],
                  extrapolate: 'clamp'
                }),
              },
            ]}>
            <LinearGradientComponet>
              <Image
                source={{
                  uri: 'https://th.bing.com/th?id=OIP.4_g3x69RkF4oP0v2-XwgUwHaKe&w=210&h=297&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
                }}
                style={styles.imgOne}
              />
            </LinearGradientComponet>
          </Animated.View>
          <Animated.View
            style={[
              styles.textNewCollection,
              {
                transform: [
                  {
                    translateY: animatedValue.interpolate({
                      inputRange: [0, 100],
                      outputRange: [1, -50],
                    }),
                  },
                ],
              },
            ]}>
            <TextComponent
              text="New collection"
              color={colors.White_Color}
              size={34}
              font={fontFamilies.bold}
            />
          </Animated.View>
        </SectionComponent>

        <RowComponent style={{width: '100%', height: 374}}>
          <SectionComponent>
            <Animated.View
              style={[
                styles.sectionSummerSale,
                {
                  transform: [
                    {
                      scale: animatedValue.interpolate({
                        inputRange: [0, 322],
                        outputRange: [1, 0],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                },
              ]}>
              <TextComponent
                text="Summer sale"
                size={34}
                font={fontFamilies.bold}
                color={colors.Primary_Color}
                style={styles.textSummerSale}
              />
            </Animated.View>

            <Animated.View
              style={[
                {
                  flex: 1,
                  transform: [
                    {
                      translateY: animatedValue.interpolate({
                        inputRange: [0, 322],
                        outputRange: [1, -170],
                        extrapolate: 'clamp',
                      }),
                    },
                    {
                      rotateX: animatedValue.interpolate({
                        inputRange: [0, 322],
                        outputRange: ['0 deg', '180 deg'],
                        extrapolate: 'clamp',
                      }),
                    },
                    {
                      rotateZ: animatedValue.interpolate({
                        inputRange: [0, 322],
                        outputRange: ['0 deg', '180 deg'],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                },
              ]}>
              <LinearGradientComponet>
                <Image
                  source={{
                    uri: 'https://th.bing.com/th?id=OIP.4_g3x69RkF4oP0v2-XwgUwHaKe&w=210&h=297&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
                  }}
                  style={styles.imgTwo}
                />
              </LinearGradientComponet>
              <TextComponent
                text="Black"
                size={34}
                color={colors.White_Color}
                font={fontFamilies.bold}
                style={styles.textBlack}
              />
            </Animated.View>
          </SectionComponent>

          <Animated.View
            style={{
              flex: 1,
              transform: [
                {
                  scale: animatedValue.interpolate({
                    inputRange: [0, 322],
                    outputRange: [1, 0],
                    extrapolate: 'clamp',
                  }),
                },
              ],
              opacity: animatedValue.interpolate({
                inputRange: [0, 322],
                outputRange: [1, 0],
                extrapolate: 'clamp',
              }),
            }}>
            <LinearGradientComponet>
              <Image
                source={{
                  uri: 'https://th.bing.com/th?id=OIP.4_g3x69RkF4oP0v2-XwgUwHaKe&w=210&h=297&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
                }}
                style={styles.imgTwo}
              />
            </LinearGradientComponet>
            <Animated.View
              style={[
                styles.textMenHoodies,
                {
                  transform: [
                    {
                      scale: animatedValue.interpolate({
                        inputRange: [0, 322],
                        outputRange: [1, 1.2],
                        extrapolate: 'clamp',
                      }),
                    },
                    {
                        translateY: animatedValue.interpolate({
                          inputRange: [0, 100],
                          outputRange: [0, -100],
                          extrapolate: 'clamp',
                        }),
                      },
                  ],
                },
              ]}>
              <TextComponent
                text="Men's hoodies"
                size={34}
                font={fontFamilies.bold}
                color={colors.White_Color}
              />
            </Animated.View>
          </Animated.View>
        </RowComponent>
      </SectionComponent>
  )
}

export default HeaderAnimatinonComponent

const styles = StyleSheet.create({
    textBlack: {
      position: 'absolute',
      top: 116,
      left: 13,
    },
    textMenHoodies: {
      position: 'absolute',
      top: 154,
      left: 37,
    },
    imgTwo: {
      flex: 1,
    },
    textSummerSale: {
      width: 140,
    },
    sectionSummerSale: {
      flex: 1,
      justifyContent: 'center',
      paddingLeft: 15,
      alignItems: 'flex-start',
    },
    textNewCollection: {
      position: 'absolute',
      bottom: 27,
      end: 18,
    },
    imgOne: {
      width: '100%',
      height: 366,
    },
    containerHeader: {
      width: '100%',
      paddingHorizontal: 0,
    },
    containerNewCollection: {
      width: '100%',
      height: 366,
    },
  });