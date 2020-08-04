import React from 'react'
import { StyleSheet, View } from 'react-native'
import CommandButton from './IconButton'

import colors from '../style/colors';
import size from '../style/size';

interface ControllButtonGroupProps {
    onClick: any,
}

const ControllButtonGroup: React.SFC<ControllButtonGroupProps> = (props) => {
    const onClickHandler = (value: string) => {
        props.onClick(value);
    };
    return (
        <View style={styles.container}>
            <View style={styles.mainArrowContainer}>
                <CommandButton size={size.large} onClick={onClickHandler} color={colors.yellowMedium} commandType="ccw" />
                <View style={styles.upDownContainer}>
                    <CommandButton size={size.large} onClick={onClickHandler} color={colors.yellowMedium} commandType="up" style={{ paddingBottom: 30 }} />
                    <CommandButton size={size.large} onClick={onClickHandler} color={colors.yellowMedium} commandType="down" style={{ paddingTop: 30 }} />
                </View>
                <CommandButton size={size.large} onClick={onClickHandler} color={colors.yellowMedium} commandType="cw" />
            </View>
            <View style={styles.mainArrowContainer}>
                <CommandButton size={size.large} onClick={onClickHandler} color={colors.yellowMedium} commandType="left" />
                <View style={styles.upDownContainer}>
                    <CommandButton size={size.large} onClick={onClickHandler} color={colors.yellowMedium} commandType="forward" style={{ paddingBottom: 30 }} />
                    <CommandButton size={size.large} onClick={onClickHandler} color={colors.yellowMedium} commandType="back" style={{ paddingTop: 30 }} />
                </View>
                <CommandButton size={size.large} onClick={onClickHandler} color={colors.yellowMedium} commandType="right" />
            </View>
        </View>
    )
}

export default ControllButtonGroup

const styles = StyleSheet.create({
    container: {
        flex: 4,
        backgroundColor: colors.backgroundDark,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginTop: 3,
        borderColor: colors.yellowMedium,
        borderWidth: 1,
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
    },
    mainArrowContainer: {
        // backgroundColor: colors.white,
        width: 150,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginRight: 90,
        marginLeft: 90
    },
    upDownContainer: {
        alignItems: 'flex-start'
    }
})