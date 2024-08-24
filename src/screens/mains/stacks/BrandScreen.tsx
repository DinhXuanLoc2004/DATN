import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import ButtonComponent from '../../../components/buttons/ButtonComponent';
import ContainerComponent from '../../../components/layouts/ContainerComponent';
import RowComponent from '../../../components/layouts/RowComponent';
import SearchComponent from '../../../components/layouts/SearchComponent';
import SectionComponent from '../../../components/layouts/SectionComponent';
import SelectsCheckBoxComponent from '../../../components/layouts/selects/SelectsCheckBoxComponent';
import SpaceComponent from '../../../components/layouts/SpaceComponent';
import { colors } from '../../../constants/colors';
import { handleSize } from '../../../utils/handleSize';
const BrandScreen = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [size_selected, setsize_selected] = useState<string[]>([]);
  return (
    <ContainerComponent
      style={styles.container}
      isHeader
      isScroll
      back
      title="Brand"
      styleHeader={{
        backgroundColor: colors.White_Color,
        elevation: handleSize(1),
      }}>
      <SpaceComponent height={20} />
      <SectionComponent>
        <SearchComponent
          value={searchQuery}
          onChange={val => setSearchQuery(val)}
          onClear={() => setSearchQuery('')}
          placeholder="Search"
        />
      </SectionComponent>
      <SelectsCheckBoxComponent
        arr_select={size_selected}
        set_arr_select={setsize_selected}></SelectsCheckBoxComponent>
      <SpaceComponent height={120} />

      <RowComponent justify="space-between" style={styles.containerBtn}>
        <ButtonComponent
          style={[styles.btn, styles.btnDiscard]}
          onPress={() => {}}
          text="Discard"
          colorText={colors.Text_Color}
        />
        <SpaceComponent width={23} />
        <ButtonComponent style={styles.btn} onPress={() => {}} text="Apply" />
      </RowComponent>
    </ContainerComponent>
  );
};

export default BrandScreen;

const styles = StyleSheet.create({
  container: {paddingHorizontal: 0},
  btnDiscard: {
    backgroundColor: colors.White_Color,
    borderColor: colors.Text_Color,
    borderWidth: handleSize(2),
  },
  btn: {
    flex: 1,
    elevation: 4,
  },
  containerBtn: {
    paddingHorizontal: handleSize(16),
    paddingVertical: handleSize(20),
    backgroundColor: colors.White_Color,
  },
});
