import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../constants/colors';
import SectionComponent from './SectionComponent';
interface Props {
  backgroundColor: string;
}

const ColorCircleComponent: React.FC<Props> = ({backgroundColor}) => {
  const [isSelected, setIsSelected] = useState(false);

  const handlePress = () => {
    setIsSelected(!isSelected);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <SectionComponent style={styles.circleContainer}>
        {isSelected && <SectionComponent style={styles.border} />}
        <SectionComponent
          flex={0}
          style={[
            styles.circle,
            isSelected && styles.selectedCircle,
            {backgroundColor},
          ]}
        />
      </SectionComponent>
    </TouchableOpacity>
  );
};

export default ColorCircleComponent;

const styles = StyleSheet.create({
  circleContainer: {
    marginHorizontal: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    zIndex: 1,
  },
  selectedCircle: {
    borderWidth: 2,
    borderColor: 'white',
  },
  border: {
    position: 'absolute',
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: colors.Primary_Color,
    zIndex: 0,
  },
});
