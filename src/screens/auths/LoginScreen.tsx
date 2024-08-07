import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ContainerComponent from '../../components/layouts/ContainerComponent'
import TextComponent from '../../components/texts/TextComponent'
import TitleComponent from '../../components/texts/TitleComponent'
import { fontFamilies } from '../../constants/fontFamilies'
import SpaceComponent from '../../components/layouts/SpaceComponent'
import TextInputComponent from '../../components/inputs/TextInputComponent'
import ButtonComponent from '../../components/buttons/ButtonComponent'
import { handleTextInput, Success } from '../../utils/handleTextInput'
import SectionComponent from '../../components/layouts/SectionComponent'

const LoginScreen = () => {
    const [Email, setEmail] = useState<string>('');
    const [Password, setPassword] = useState<string>('');
    const [ErrorEmail, setErrorEmail] = useState<string>('');
    const [ErrorPassword, setErrorPassword] = useState<string>('');

    useEffect(() => {
        if (Email) {
            setErrorEmail(handleTextInput('email', Email))
        }
        if (Password) {
            setErrorPassword(handleTextInput('password', Password))
        }
    }, [Email, Password]);

    const handleLogin = () => {
        setErrorEmail(handleTextInput('email', Email))
        setErrorPassword(handleTextInput('password', Password))
    }

    return (
        <ContainerComponent isHeader back>
            <SpaceComponent height={20} />

            {/* Section Tille */}
            <SectionComponent>
                <TitleComponent
                    text='Login'
                    size={34}
                    font={fontFamilies.bold}
                />
            </SectionComponent>

            <SpaceComponent height={30} />

            {/* Section Input */}
            <SectionComponent>
                <TextInputComponent
                    value={Email}
                    onChange={(val) => setEmail(val)}
                    plahoder='Email'
                    isError={ErrorEmail !== '' && ErrorEmail !== Success}
                    errorMessage={ErrorEmail !== Success ? ErrorEmail : ''}
                    isSuccess={ErrorEmail === Success}
                />
                <SpaceComponent height={30} />
                <TextInputComponent
                    value={Password}
                    onChange={(val) => setPassword(val)}
                    plahoder='Password'
                    isError={ErrorPassword !== '' && ErrorPassword !== Success}
                    errorMessage={ErrorPassword !== Success ? ErrorPassword : ''}
                    isSuccess={ErrorPassword === Success}
                    isPassword
                />
            </SectionComponent>

            <SpaceComponent height={30} />

            {/* Section Button Login */}
            <SectionComponent>
                <ButtonComponent
                    text='LOGIN'
                    onPress={() => handleLogin()}
                />
            </SectionComponent>
        </ContainerComponent>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})