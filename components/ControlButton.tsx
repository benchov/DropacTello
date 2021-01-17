import * as React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import colors from '../style/colors';
import size from '../style/size';

interface Props {
    handlePressIn: any,
    handlePressOut: any,
    pressed: boolean,
    iconDirection: string,
    style?: object
}
const ControlButton: React.FC<Props> = (props) => {
    const handlePress = (status: string): void => {
        if (status === 'in') {
            props.handlePressIn()
        }
        if (status === 'out') {
            props.handlePressOut()
        }
    }

    return (
        <React.Fragment>
            <TouchableWithoutFeedback onPressIn={() => handlePress('in')} onPressOut={() => handlePress('out')}>
                <View style={[props.style, props.pressed ? styles.pressFeedback : null]}>
                    <Entypo name={`chevron-thin-${props.iconDirection}`} size={size.large} color={colors.yellowMedium} />
                </View>
            </TouchableWithoutFeedback>
        </React.Fragment >
    )
}

export default ControlButton;

const styles = StyleSheet.create({
    pressFeedback: {
        backgroundColor: colors.backgroundLight,
        borderColor: colors.backgroundLight,
        borderWidth: 1,
        borderRadius: 50
    }
})