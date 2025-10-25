import React, { useEffect, useState } from 'react';
import { StyleSheet, Alert } from 'react-native'; // Added Alert
import ButtonComponent from '../../components/buttons/ButtonComponent';
import TextInputAnimationComponent from '../../components/inputs/TextInputAnimationComponent';
import ContainerComponent from '../../components/layouts/ContainerComponent';
import SectionComponent from '../../components/layouts/SectionComponent';
import SpaceComponent from '../../components/layouts/SpaceComponent';
import TitleComponent from '../../components/texts/TitleComponent';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, navigationRef } from '../../navigation/RootNavigation'; // Added navigationRef
import { fontFamilies } from '../../constants/fontFamilies';
import { handleTextInput, Success } from '../../utils/handleTextInput';
import { resetPasswordAPI } from '../../helper/apis/auth.api';

const NewPasswordScreen = ({ route }: { route: RouteProp<RootStackParamList, 'NewPasswordScreen'> }) => {
    const { email } = route.params; // Get the email from the route params
    const [Password, setPassword] = useState<string>('');
    const [ConfirmPassword, setConfirmPassword] = useState<string>('');
    const [ErrorPassword, setErrorPassword] = useState<string>('');
    const [ErrorConfirmPassword, setErrorConfirmPassword] = useState<string>('');

    useEffect(() => {
        if (Password) {
            setErrorPassword(handleTextInput('password', Password));
        }
        if (ConfirmPassword) {
            setErrorConfirmPassword(
                handleTextInput('confirmPassword', ConfirmPassword, Password),
            );
        }
    }, [Password, ConfirmPassword]);

    const handleResetPassword = async () => {
        if (ErrorPassword === Success && ErrorConfirmPassword === Success) {
            try {
                const data = await resetPasswordAPI({ email, newPassword: Password })
                if (data.status === 200) {
                    Alert.alert("Success", "Password has been reset successfully!");
                    navigationRef.reset({
                        index: 0,
                        routes: [{ name: 'LoginScreen' }],
                    });
                }
            } catch (error: any) {
                Alert.alert("Error", error.message || "Password reset failed");
            }
        } else {
            Alert.alert("Validation Error", "Please make sure both passwords are valid and match.");
        }
    };

    return (
        <ContainerComponent isHeader back isScroll>
            <SpaceComponent height={18} />

            <SectionComponent>
                <TitleComponent text="New Password" size={34} font={fontFamilies.bold} />
            </SectionComponent>

            <SpaceComponent height={68} />

            <SectionComponent>
                <SpaceComponent height={30} />
                <TextInputAnimationComponent
                    value={Password}
                    onChange={val => setPassword(val)}
                    plahoder="Password"
                    isError={ErrorPassword !== '' && ErrorPassword !== Success}
                    errorMessage={ErrorPassword !== Success ? ErrorPassword : ''}
                    isSuccess={ErrorPassword === Success}
                    isPassword
                />
                <SpaceComponent height={30} />
                <TextInputAnimationComponent
                    value={ConfirmPassword}
                    onChange={val => setConfirmPassword(val)}
                    plahoder="Confirm Password"
                    isError={ErrorConfirmPassword !== '' && ErrorConfirmPassword !== Success}
                    errorMessage={ErrorConfirmPassword !== Success ? ErrorConfirmPassword : ''}
                    isSuccess={ErrorConfirmPassword === Success}
                    isPassword
                />
            </SectionComponent>

            <SpaceComponent height={28} />

            <SectionComponent>
                <ButtonComponent text="Change" onPress={() => handleResetPassword()} />
            </SectionComponent>
        </ContainerComponent>
    );
};

export default NewPasswordScreen;

const styles = StyleSheet.create({});
