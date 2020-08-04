import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import colors from '../style/colors';
import { Entypo } from "@expo/vector-icons";

interface Props {
    battery: number | null,
    connection: string
}
const StateDisplay: React.FC<Props> = (props) => {
    return (
        <View style={styles.elementContainer}>
            <View style={styles.container}>
                <Entypo name="battery" size={24} color={colors.yellowMedium} />
                <Text style={styles.textStyle}>{props.battery || 'N/A'}</Text>
            </View>
            <View style={styles.logoContainer}>
                <Text style={styles.logo}>DROPAC</Text>
            </View>
            <View style={styles.container}>
                <Entypo name="rss" size={24} color={colors.yellowMedium} />
                <Text style={styles.textStyle}>{props.connection || 'N/A'}</Text>
            </View>
        </View>
    )
}

export default StateDisplay;

const styles = StyleSheet.create({
    container: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    elementContainer: {
        backgroundColor: colors.backgroundDark,
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderColor: colors.yellowMedium,
        borderWidth: 1,
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        borderStyle: 'solid',
    },
    textStyle: {
        fontSize: 10,
        fontStyle: 'normal',
        textTransform: 'uppercase',
        letterSpacing: 5,
        color: colors.white,
        marginLeft: 20,
    },
    logo: {
        color: colors.yellowMedium,
        letterSpacing: 13,
        fontSize: 20,
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.yellowMedium
    }
})
