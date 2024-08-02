import { FC, ReactElement, ReactNode } from "react";
import { View, Text, StyleProp, ViewStyle, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from "../../constants/colors";
import { globalStyles } from "../../styles/globalStyle";
import RowComponent from "./RowComponent";
import { ArrowLeft2 } from "iconsax-react-native";
import TitleComponent from "../texts/TitleComponent";
import { useNavigation } from "@react-navigation/native";
import SpaceComponent from "./SpaceComponent";
import IonIcon from 'react-native-vector-icons/Ionicons';


interface Props {
    children: ReactNode
    style?: StyleProp<ViewStyle>,
    isScroll?: boolean,
    back?: boolean,
    title?: string,
    isHeader?: boolean,
    rightIcon?: ReactNode,
    rightOnPress?: () => void
}

const ContainerComponent: FC<Props> = ({ children, style, isScroll, back, title, isHeader, rightIcon, rightOnPress }) => {
    // const navigation: any = useNavigation()
    return (
        <View style={[globalStyles.container, style]}>
            {
                isHeader && <RowComponent justify="space-between" style={{width: '100%', marginTop: 10}}>
                    {
                        back ? <TouchableOpacity onPress={() => {}}>
                            <IonIcon name="chevron-back-outline" size={24} color={colors.Text_Color}/>
                        </TouchableOpacity> : <SpaceComponent width={10}/>
                    }
                    {
                        title ? <TitleComponent text={title} /> : <SpaceComponent width={10}/>
                    }
                    {
                        rightIcon ? <TouchableOpacity onPress={rightOnPress}>
                            {rightIcon}
                        </TouchableOpacity> : <SpaceComponent width={10}/>
                    }
                </RowComponent>
            }
            {
                isScroll ? <ScrollView 
                style={[globalStyles.container, style]}
                showsVerticalScrollIndicator={false}
                >
                    {children}
                </ScrollView>
                    : <View style={[globalStyles.container, style]}>
                        {children}
                    </View>
            }
        </View>
    )
}

export default ContainerComponent



