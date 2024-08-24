import React, {FC} from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constants/colors';
import {handleSize} from '../../utils/handleSize';
import RowComponent from './RowComponent';
import SectionComponent from './SectionComponent';
interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  onClear?: () => void;
}

const SearchComponent: FC<Props> = ({
  value,
  onChange,
  placeholder,
  style,
  onClear,
}) => {
  return (
    <SectionComponent style={styles.container}>
      <RowComponent style={styles.containerSearch}>
        <IonIcon
          name="search"
          size={handleSize(20)}
          color={colors.Gray_Color}
        />
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          style={styles.textInput}
        />
        {value !== '' && (
          <TouchableOpacity onPress={onClear || (() => onChange(''))}>
            <IonIcon
              name="close"
              size={handleSize(20)}
              color={colors.Gray_Color}
            />
          </TouchableOpacity>
        )}
      </RowComponent>
    </SectionComponent>
  );
};

export default SearchComponent;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  containerSearch: {
    backgroundColor: colors.White_Color,
    borderRadius: handleSize(20),
    paddingHorizontal: handleSize(10),
  },
  textInput: {
    flex: 1,
    marginLeft: handleSize(10),
    fontSize: handleSize(16),
    color: colors.Text_Color,
  },
});
