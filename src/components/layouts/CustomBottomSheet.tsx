import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {FC, ReactNode, useMemo, useRef} from 'react';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {handleSize, HEIGHT_SCREEN, WIDTH_SCREEN} from '../../utils/handleSize';
import SpaceComponent from './SpaceComponent';
import {colors} from '../../constants/colors';
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import TextComponent from '../texts/TextComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import RowComponent from './RowComponent';

interface Props {
  title: string;
  content: ReactNode;
  bottomSheet: React.RefObject<BottomSheetMethods>;
  snapPoint: Array<string | number>;
  style?: StyleProp<ViewStyle>;
  styleHeader?: StyleProp<ViewStyle>;
}

const CustomBottomSheet: FC<Props> = ({
  title,
  content,
  bottomSheet,
  snapPoint,
  style,
  styleHeader
}) => {
  return (
    <BottomSheet
      ref={bottomSheet}
      snapPoints={snapPoint}
      enablePanDownToClose={true}
      index={-1}
      style={styles.container}
      handleComponent={() => (
        <RowComponent justify="center" style={styles.containerLine}>
          <SpaceComponent width={60} height={6} style={styles.line} />
        </RowComponent>
      )}>
      <BottomSheetView style={[styles.containerContent, style]}>
        <SpaceComponent height={14} />
        <RowComponent justify="center" style={styleHeader}>
          <TextComponent text={title} size={18} font={fontFamilies.semiBold} />
        </RowComponent>
        {content}
      </BottomSheetView>
    </BottomSheet>
  );
};

export default CustomBottomSheet;

const styles = StyleSheet.create({
  containerLine: {
    width: '100%',
  },
  containerContent: {
    flex: 1,
  },
  line: {
    backgroundColor: colors.Gray_Color,
    borderRadius: handleSize(3),
    marginTop: handleSize(14),
  },
  container: {
    borderTopStartRadius: handleSize(34),
    borderTopEndRadius: handleSize(34),
    elevation: 50,
  },
});
