import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import DoubleButtonComponent from '../../../components/buttons/DoubleButtonComponent';
import ContainerComponent from '../../../components/layouts/ContainerComponent';
import SearchComponent from '../../../components/layouts/SearchComponent';
import SelectBrandsComponent from '../../../components/layouts/selects/SelectBrandsComponent';
import SpaceComponent from '../../../components/layouts/SpaceComponent';
import {colors} from '../../../constants/colors';
import {handleSize} from '../../../utils/handleSize';
const BrandScreen = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [brands_selected, setbrands_selected] = useState<string[]>([]);
  return (
    <ContainerComponent
      isHeader
      back
      title="Brand"
      styleHeader={{
        backgroundColor: colors.White_Color,
        elevation: handleSize(1),
      }}>
      <SpaceComponent height={20} />
      <SearchComponent
        value={searchQuery}
        onChange={val => setSearchQuery(val)}
        onClear
        placeholder="Search"
      />
      <SpaceComponent height={22} />
      <SelectBrandsComponent
        arr_select={brands_selected}
        set_arr_select={setbrands_selected}
      />
      <DoubleButtonComponent
        textBtnLeft="Discard"
        textBtnRight="Apply"
        onPressBtnLeft={() => {}}
        onPressBtnRigth={() => {}}
        backgroundColor={colors.White_Color}
        zIndex={1}
        bottom={0}
        left={-16}
      />
    </ContainerComponent>
  );
};

export default BrandScreen;

const styles = StyleSheet.create({
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
