import * as React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native'
import colors from '../style/colors';
import { Entypo } from "@expo/vector-icons";

interface Props {
    battery: number | null,
    height?: number | null,
    verticalSpeed?: number | null,
    distance?: number | null,
    connection: string
}
const StateDisplay: React.FC<Props> = (props) => {
    return (
        <View style={styles.elementContainer}>
            <View style={styles.container}>
                <Entypo name="battery" size={24} color={colors.yellowMedium} />
                <Text style={styles.textStyle}>{props.battery || 'N/A'}</Text>
            </View>
            <View style={styles.container}>
                <Text style={[styles.textStyle, { color: colors.yellowMedium }]}>VS</Text>
                <Text style={styles.textStyle}>{props.verticalSpeed ? `${props.verticalSpeed} m/s` : 'N/A'}</Text>
            </View>
            <View style={styles.container}>
                <Text style={[styles.textStyle, { color: colors.yellowMedium }]}>H</Text>
                <Text style={styles.textStyle}>{props.height ? `${props.height} m` : "N/A"}</Text>
            </View>
            <View style={styles.container}>
                <Text style={[styles.textStyle, { color: colors.yellowMedium }]}>D</Text>
                <Text style={styles.textStyle}>{props.distance ? `${props.distance} m` : "N/A"}</Text>
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
        letterSpacing: Platform.OS === 'web' ? 5 : 13,
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
