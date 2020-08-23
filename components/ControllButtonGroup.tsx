import React from 'react'
import { StyleSheet, View, TouchableWithoutFeedback, Text } from 'react-native'
import colors from '../style/colors';
import size from '../style/size';
import { Entypo } from '@expo/vector-icons';
import MissionButtonGroup from './MissionButtonGroup';

interface ControllButtonGroupProps {
    onClick: any,
}

const ControllButtonGroup: React.SFC<ControllButtonGroupProps> = (props) => {
    const [channellA, setChannelA] = React.useState(0);
    const [channellB, setChannelB] = React.useState(0);
    const [channellC, setChannelC] = React.useState(0);
    const [channellD, setChannelD] = React.useState(0);

    React.useEffect(() => {
        props.onClick(
            `rc ${channellA} ${channellB} ${channellC} ${channellD}`
        );
    }, [channellD, channellC, channellA, channellB]);

    return (
        <View style={styles.container}>
            <View style={styles.mainArrowContainer}>
                <TouchableWithoutFeedback onPressIn={() => setChannelD(-50)} onPressOut={() => setChannelD(0)}>
                    <View>
                        <Entypo name={'chevron-thin-left'} size={size.large} color={colors.yellowMedium} />
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.upDownContainer}>
                    <TouchableWithoutFeedback onPressIn={() => setChannelC(50)} onPressOut={() => setChannelC(0)}>
                        <View style={{ paddingBottom: 25 }}>
                            <Entypo name={'chevron-thin-up'} size={size.large} color={colors.yellowMedium} />
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPressIn={() => setChannelC(-50)} onPressOut={() => setChannelC(0)}>
                        <View style={{ paddingTop: 25 }}>
                            <Entypo name={'chevron-thin-down'} size={size.large} color={colors.yellowMedium} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <TouchableWithoutFeedback onPressIn={() => setChannelD(50)} onPressOut={() => setChannelD(0)}>
                    <View>
                        <Entypo name={'chevron-thin-right'} size={size.large} color={colors.yellowMedium} />
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <View>
                <MissionButtonGroup />
            </View>
            <View style={styles.mainArrowContainer}>
                <TouchableWithoutFeedback onPressIn={() => setChannelA(-50)} onPressOut={() => setChannelA(0)}>
                    <View>
                        <Entypo name={'chevron-thin-left'} size={size.large} color={colors.yellowMedium} />
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.upDownContainer}>
                    <TouchableWithoutFeedback onPressIn={() => setChannelB(50)} onPressOut={() => setChannelB(0)}>
                        <View style={{ paddingBottom: 25 }}>
                            <Entypo name={'chevron-thin-up'} size={size.large} color={colors.yellowMedium} />
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPressIn={() => setChannelB(-50)} onPressOut={() => setChannelB(0)}>
                        <View style={{ paddingTop: 25 }}>
                            <Entypo name={'chevron-thin-down'} size={size.large} color={colors.yellowMedium} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <TouchableWithoutFeedback onPressIn={() => setChannelA(50)} onPressOut={() => setChannelA(0)}>
                    <View>
                        <Entypo name={'chevron-thin-right'} size={size.large} color={colors.yellowMedium} />
                    </View>
                </TouchableWithoutFeedback>
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
        width: 50,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginRight: 90,
        marginLeft: 90
    },
    upDownContainer: {
        backgroundColor: colors.backgroundDark,
    }
})