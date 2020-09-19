import React from 'react'
import { StyleSheet, View, TouchableWithoutFeedback, Text } from 'react-native'
import colors from '../style/colors';
import size from '../style/size';
import { Entypo } from '@expo/vector-icons';
import MissionButtonGroup from './MissionButtonGroup';
import ControlButton from './ControlButton';

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
                <ControlButton
                    handlePressIn={() => setChannelD(-50)}
                    handlePressOut={() => setChannelD(0)}
                    pressed={channellD === -50}
                    iconDirection={"left"}
                />
                <View style={styles.upDownContainer}>
                    <ControlButton
                        handlePressIn={() => setChannelC(50)}
                        handlePressOut={() => setChannelC(0)}
                        pressed={channellC === 50}
                        iconDirection={"up"}
                        style={{ paddingBottom: 25 }}
                    />
                    <ControlButton
                        handlePressIn={() => setChannelC(-50)}
                        handlePressOut={() => setChannelC(0)}
                        pressed={channellC === -50}
                        iconDirection={"down"}
                        style={{ paddingTop: 25 }}
                    />
                </View>
                <ControlButton
                    handlePressIn={() => setChannelD(50)}
                    handlePressOut={() => setChannelD(0)}
                    pressed={channellD === 50}
                    iconDirection={"right"}
                />
            </View>
            <View>
                <MissionButtonGroup onClick={(v: string) => props.onClick(v)} />
            </View>
            <View style={styles.mainArrowContainer}>
                <ControlButton
                    handlePressIn={() => setChannelA(-50)}
                    handlePressOut={() => setChannelA(0)}
                    pressed={channellA === -50}
                    iconDirection={"left"}
                />
                <View style={styles.upDownContainer}>
                    <ControlButton
                        handlePressIn={() => setChannelB(50)}
                        handlePressOut={() => setChannelB(0)}
                        pressed={channellB === 50}
                        iconDirection={"up"}
                        style={{ paddingBottom: 25 }}
                    />
                    <ControlButton
                        handlePressIn={() => setChannelB(-50)}
                        handlePressOut={() => setChannelB(0)}
                        pressed={channellB === -50}
                        iconDirection={"down"}
                        style={{ paddingTop: 25 }}
                    />
                </View>
                <ControlButton
                    handlePressIn={() => setChannelA(50)}
                    handlePressOut={() => setChannelA(0)}
                    pressed={channellA === 50}
                    iconDirection={"right"}
                />
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
    },
    pressFeedback: {
        backgroundColor: colors.backgroundLight,
        borderColor: colors.backgroundLight,
        borderWidth: 1,
        borderRadius: 50
    }
})