import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../constants/colors';
import TextComponent from '../texts/TextComponent';
import RowComponent from './RowComponent';
import SectionComponent from './SectionComponent';
import StarComponent from './StarComponent';

interface Props {
  star: number;
}

const RatingComponent: FC<Props> = ({star}) => {
  const ratings = [12, 5, 4, 2, 0];
  const sumRating = ratings.reduce((acc, curr) => acc + curr, 0);
  const tbRating = sumRating / ratings.length;
  const maxRating = Math.max(...ratings);

  return (
    <SectionComponent style={styles.container}>
      <RowComponent style={styles.containerItem}>
        <SectionComponent>
          <TextComponent
            font="bold"
            text={`${tbRating}`}
            size={44}
            color="black"
          />
          <TextComponent
            text={`${sumRating} ratings `}
            size={14}
            color="gray"
          />
        </SectionComponent>

        <SectionComponent style={styles.starsContainer}>
          {ratings.map((count, index) => (
            <View key={index} style={styles.row}>
              <View style={styles.starWrapper}>
                <StarComponent
                  star={5 - index}
                  starOutline={true}
                  style={styles.star}
                />
              </View>

              <View style={styles.barContainer}>
                <View
                  style={[
                    styles.redBar,
                    {width: `${(count / maxRating) * 100}%`},
                  ]}
                />
              </View>

              <TextComponent text={String(count)} style={styles.ratingText} />
            </View>
          ))}
        </SectionComponent>
      </RowComponent>
    </SectionComponent>
  );
};

const styles = StyleSheet.create({
  containerItem: {
    alignItems: 'flex-start',
    flex: 0,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  container: {
    width: '100%',
    height: 'auto',
    borderRadius: 8,
    flex: 0,
  },
  starsContainer: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
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
    height: 8,
    backgroundColor: colors.Backgournd_Color,
    borderRadius: 4,
    marginLeft: 10,
    justifyContent: 'center',
  },
  redBar: {
    height: '100%',
    backgroundColor: 'red',
    borderRadius: 4,
  },
  ratingText: {
    flex: 0.15,
    textAlign: 'right',
  },
});

export default RatingComponent;
