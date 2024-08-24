import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

interface Option {
  label: string;
  value: string;
}

interface MenuSelectComponentProps {
  options: Option[];
  placeholder: string;
  style?: StyleProp<ViewStyle>;
}

const MenuSelectComponent: React.FC<MenuSelectComponentProps> = ({
  options,
  placeholder,
  style
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={options}
        setOpen={setOpen}
        setValue={setValue}
        style={styles.dropdown}
        placeholder={placeholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    width: 200,
    fontSize: 14,
  },

  dropdown: {
    width: 138,
    height: 40,
  },
});

export default MenuSelectComponent;
