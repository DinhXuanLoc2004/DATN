import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {handleSize} from '../../utils/handleSize';

interface Props {
  onPress?: () => {};
  top?: number;
  right?: number;
  size?: number;
}

const IconDeleteItemComponent: FC<Props> = ({onPress, top, right, size}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        position: 'absolute',
        right: right ? handleSize(right) : 10,
        top: top ? handleSize(top) : 15,
      }}>
      <IonIcon name="close" size={size ? handleSize(size) : 24} />
    </TouchableOpacity>
  );
};

export default IconDeleteItemComponent;

const styles = StyleSheet.create({});
