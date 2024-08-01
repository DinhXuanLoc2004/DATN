import { StyleSheet } from "react-native";
import { colors } from "../constants/colors";
import { fontFamilies } from "../constants/fontFamilies";

export const globalStyles = StyleSheet.create({
    button:{
        width: '100%',
        height: 48,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: '100%',
        height: 64,
        backgroundColor: colors.White_Color,
        padding: 10,
        borderRadius: 4
    },
    text: {
        fontFamily: fontFamilies.regular,
        fontSize: 16,
        color: colors.Text_Color,
    },
    row: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    container: {
        flex: 1,
        backgroundColor: colors.Backgournd_Color,
        paddingHorizontal: 14
    }
})