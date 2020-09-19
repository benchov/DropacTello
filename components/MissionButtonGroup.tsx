import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import colors from '../style/colors';

interface Props {
    onClick: any
};

const MissionButtonGroup: React.FC<Props> = (props) => {
    const onClickHandler = (value: string) => {
        props.onClick(value);
    }

    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity style={styles.container} onPress={onClickHandler('fnctest')}>
                <Text style={styles.textStyle}>FNC TEST</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.container} onPress={onClickHandler('stop')}>
                <Text style={styles.textStyle}>STOP</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.container}>
                <Text style={styles.textStyle}>RANDOM</Text>
            </TouchableOpacity>
        </View>
    )
}

export default MissionButtonGroup;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
        borderColor: colors.yellowMedium,
        borderWidth: 1,
        borderStyle: 'solid',
    },
    elementContainer: {
        backgroundColor: colors.backgroundDark,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderColor: colors.yellowMedium,
        borderWidth: 1,
        borderStyle: 'solid',
    },
    textStyle: {
        fontSize: 10,
        fontStyle: 'normal',
        textTransform: 'uppercase',
        letterSpacing: 9,
        color: colors.yellowMedium,
        padding: 10,
    },
})