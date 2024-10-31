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
interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  onClear?: boolean;
}

const SearchComponent: FC<Props> = ({
  value,
  onChange,
  placeholder,
  style,
  onClear,
}) => {
  return (
    <RowComponent style={[styles.containerSearch, style]}>
      <IonIcon
        name="search"
        size={handleSize(20)}
        color={colors.Primary_Color}
      />
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        style={styles.textInput}
      />
      {value !== '' && onClear && (
        <TouchableOpacity onPress={() => onChange('')}>
          <IonIcon
            name="close"
            size={handleSize(20)}
            color={colors.Gray_Color}
          />
        </TouchableOpacity>
      )}
    </RowComponent>
  );
};

export default SearchComponent;

const styles = StyleSheet.create({
  containerSearch: {
    backgroundColor: colors.White_Color,
    borderRadius: handleSize(18),
    paddingHorizontal: handleSize(15),
    elevation: handleSize(3),
    flex: 1,
    borderColor: colors.Primary_Color,
    borderWidth: 1,
  },
  textInput: {
    flex: 1,
    fontSize: handleSize(16),
    color: colors.Text_Color,
    paddingLeft: handleSize(6),
  },
});
