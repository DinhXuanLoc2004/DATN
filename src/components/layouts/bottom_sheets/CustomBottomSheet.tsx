import {
  BottomSheetBackdrop,
  BottomSheetFooter,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import React, {
  FC,
  ReactNode,
  RefObject,
  useCallback,
  useMemo,
  useState,
} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {colors} from '../../../constants/colors';
import {fontFamilies} from '../../../constants/fontFamilies';
import {handleSize} from '../../../utils/handleSize';
import TextComponent from '../../texts/TextComponent';
import RowComponent from '../RowComponent';
import SpaceComponent from '../SpaceComponent';
import BottomSheetBackground from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackground';
import {onLayout} from '../../../utils/onLayout';

interface Props {
  title?: string;
  content: ReactNode;
  bottomSheet: RefObject<BottomSheetModalMethods>;
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
  styleHeader,
}) => {
  return (
    <BottomSheetModal
      ref={bottomSheet}
      enableDynamicSizing={true}
      snapPoints={snapPoint}
      enablePanDownToClose={true}
      index={1}
      style={styles.container}
      backdropComponent={props => (
        <BottomSheetBackdrop {...props} opacity={0.5} pressBehavior={'close'} />
      )}
      // contentHeight={contentHeight}
      handleComponent={() => (
        <RowComponent justify="center" style={styles.containerLine}>
          <SpaceComponent width={60} height={6} style={styles.line} />
        </RowComponent>
      )}>
      <BottomSheetView style={[styles.containerContent, style]}>
        <SpaceComponent height={14} />
        {title && (
          <RowComponent justify="center" style={styleHeader}>
            <TextComponent
              text={title}
              size={18}
              font={fontFamilies.semiBold}
            />
          </RowComponent>
        )}
        {content}
      </BottomSheetView>
    </BottomSheetModal>
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
