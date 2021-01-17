import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CommandButton from './IconButton'

import colors from '../style/colors';
import size from '../style/size';

interface FunctionalButtonGroupProps {
    onClick: any,
}

const FunctionalButtonGroup: React.FC<FunctionalButtonGroupProps> = (props) => {
    const onClickHandler = (value: string) => {
        props.onClick(value);
    };
    return (
        <View style={styles.container}>
            <CommandButton size={size.medium} onClick={onClickHandler} color={colors.yellowMedium} commandType="takeoff" />
            <View>
                <CommandButton size={size.large} onClick={onClickHandler} color={colors.yellowMedium} commandType="emergency" />
            </View>
            <CommandButton size={size.medium} onClick={onClickHandler} color={colors.yellowMedium} commandType="land" />
        </View>
    )
}

export default FunctionalButtonGroup

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundDark,
        // opacity: 0.9,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 3,
        padding: 20,
        borderColor: colors.yellowMedium,
        borderWidth: 1,
    }
})