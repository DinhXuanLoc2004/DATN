import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../constants/colors';
import { fontFamilies } from '../../constants/fontFamilies';
import { handleSize } from '../../utils/handleSize';
import TextComponent from '../texts/TextComponent';
import RowComponent from './RowComponent';
import SectionComponent from './SectionComponent';
import StarComponent from './StarComponent';

interface Props {
  avegare_star: number;
  arr_star: number[];
}

const RatingComponent: FC<Props> = ({avegare_star, arr_star}) => {
  const sumRating = arr_star.reduce((acc, curr) => acc + curr, 0);
  const maxRating = Math.max(...arr_star);

  return (
    <SectionComponent style={styles.container}>
      <RowComponent justify="space-between" style={styles.containerItem}>
        <SectionComponent>
          <TextComponent
            font={fontFamilies.semiBold}
            text={`${avegare_star}`}
            size={44}
            color={colors.Text_Color}
          />
          <TextComponent
            text={`${sumRating} ratings `}
            size={14}
            color={colors.Gray_Color}
          />
        </SectionComponent>

        <SectionComponent>
          {arr_star.map((count, index) => (
            <RowComponent key={index} style={styles.row}>
              <View style={styles.starWrapper}>
                <StarComponent
                  star={index + 1}
                  itemRating={true}
                  style={styles.star}
                />
              </View>

              <View style={styles.barContainer}>
                <View
                  style={[
                    styles.redBar,
                    {
                      width:
                        count === 0
                          ? handleSize(8)
                          : `${(count / maxRating) * 100}%`,
                    },
                  ]}
                />
              </View>

              <TextComponent
                text={`${count}`}
                style={styles.ratingText}
                size={14}
                color={colors.Text_Rating_Color}
              />
            </RowComponent>
          ))}
        </SectionComponent>
      </RowComponent>
    </SectionComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
  },
  containerItem: {
    alignItems: 'flex-start',
    flex: 0,
  },
  row: {
    marginBottom: handleSize(5),
  },
  starWrapper: {
    flex: 0.15,
    alignItems: 'center',
  },
  star: {
    alignSelf: 'flex-end',
  },
  barContainer: {
    flex: 0.7,
    height: handleSize(8),
    marginLeft: 10,
  },
  redBar: {
    height: '100%',
    backgroundColor: colors.Primary_Color,
    borderRadius: handleSize(4),
  },
  ratingText: {
    flex: 0.15,
    textAlign: 'right',
  },
});

export default RatingComponent;
