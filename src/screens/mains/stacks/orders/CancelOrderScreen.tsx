import {Alert, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {stackParamListMain} from '../../../../navigation/StackMainNavigation';
import ContainerComponent from '../../../../components/layouts/ContainerComponent';
import {globalStyles} from '../../../../styles/globalStyle';
import TextComponent from '../../../../components/texts/TextComponent';
import SpaceComponent from '../../../../components/layouts/SpaceComponent';
import {fontFamilies} from '../../../../constants/fontFamilies';
import {cancellation_reasons} from '../../../../constants/cancellation_reasons';
import RowComponent from '../../../../components/layouts/RowComponent';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {handleSize} from '../../../../utils/handleSize';
import {colors} from '../../../../constants/colors';
import ButtonComponent from '../../../../components/buttons/ButtonComponent';
import {cancelOrderAPI} from '../../../../helper/apis/order.api';
import {bodyCancalOrder} from '../../../../helper/types/order.type';
import DialogErrorIOS from '../../../../components/dialogs/DialogErrorIOS';
import DialogLoading from '../../../../components/dialogs/DialogLoading';
import DialogSuccessAnimation from '../../../../components/dialogs/DialogSuccessAnimation';
import { StackNavigationProp } from '@react-navigation/stack';

type routeProp = RouteProp<stackParamListMain, 'CancelOrderScreen'>;
type stackProp = StackNavigationProp<stackParamListMain, 'CancelOrderScreen'>

const CancelOrderScreen = ({route}: {route: routeProp}) => {
  const {order_id} = route.params;
  const [cancellation_reason, setcancellation_reason] = useState('');
  const [is_loading, setis_loading] = useState(false);
  const [is_success, setis_success] = useState(false);
  const [is_fail, setis_fail] = useState(false);
  const [isvisible_err, setisvisible_err] = useState(false);
  const handleCancelOrder = async () => {
    if (!cancellation_reason) {
      setisvisible_err(true);
    } else {
      setis_loading(true);
      const body: bodyCancalOrder = {
        cancellation_reason,
      };
      const data = await cancelOrderAPI(order_id, body);
      console.log(data);
      setis_loading(false);
      if (data?.status === 200) {
        setis_success(true);
        setis_fail(false);
      } else {
        setis_fail(true);
        setis_success(false);
      }
    }
  };
  const navigation = useNavigation<stackProp>()
  return (
    <ContainerComponent
      isHeader
      back
      styleHeader={globalStyles.headerElevation}
      title="Cancel order">
      <SpaceComponent height={20} />
      <TextComponent
        text="Reason for order cancellation: "
        font={fontFamilies.medium}
        size={18}
      />
      <SpaceComponent height={20} />
      <FlatList
        data={cancellation_reasons}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => (
          <RowComponent
            justify="flex-start"
            onPress={() => setcancellation_reason(item)}>
            <FontAwesome5
              name={cancellation_reason === item ? 'check-circle' : 'circle'}
              size={handleSize(18)}
              color={
                cancellation_reason === item
                  ? colors.Primary_Color
                  : colors.Text_Color
              }
              solid={cancellation_reason === item ? true : false}
            />
            <SpaceComponent width={5} />
            <TextComponent text={item} />
          </RowComponent>
        )}
        ItemSeparatorComponent={() => <SpaceComponent height={15} />}
      />
      <ButtonComponent
        text="Confirm"
        style={[styles.btn]}
        onPress={() => handleCancelOrder()}
      />
      <DialogErrorIOS
        isVisible={isvisible_err}
        setIsvisble={setisvisible_err}
        title="Haven't chosen a reason yet"
        content="Please select a reason for cancellation!"
      />
      <DialogLoading is_loading={is_loading} />
      <DialogSuccessAnimation
        isVisible={is_success}
        setisVisible={setis_success}
        title="Order canceled successfully!"
        textBtn='CONTINUE SHOPPING'
        onPress={() => navigation.navigate('BottomTab')}
      />
    </ContainerComponent>
  );
};

export default CancelOrderScreen;

const styles = StyleSheet.create({
  btn: {
    position: 'absolute',
    bottom: 20,
  },
});
