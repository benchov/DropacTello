import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { DeviceMotion } from 'expo-sensors';
import * as ScreenOrientation from 'expo-screen-orientation';
import colors from '../style/colors';
import ControlButton from '../components/ControlButton';
<<<<<<< HEAD
import env from '../urlConfig';
import io from "socket.io-client";

=======
interface Coordinates {
    x: number,
    y: number,
    z: number
import env from '../urlConfig';
import io from "socket.io-client";
>>>>>>> 4a82217... feat(GyroNavigation.tsx): Wire server to component
interface Rotation {
    alpha: number,
    beta: number,
    gamma: number
}

const GyroNavigation = () => {
    const [data, setData] = useState<Rotation>({ alpha: 0, beta: 0, gamma: 0 });
    const [command, setCommand] = React.useState<string>('command');
    const [status, updateStatus] = React.useState<string>('N/A');
    const [droneState, updateState] = React.useState<object>();

    DeviceMotion.setUpdateInterval(50);


    useEffect(() => {
        DeviceMotion.addListener(deviceMotionData => {
            setData(deviceMotionData.rotation)
        });
    }, []);

    useEffect(() => {
        if (Platform.OS !== 'web') {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
        }
    }, [])

<<<<<<< HEAD
=======
    let { x, y, z } = data;
>>>>>>> 4a82217... feat(GyroNavigation.tsx): Wire server to component
    useEffect(() => {
        const socket = io(env.serverUrl);
        socket.on('disconnect', () => {
            if (socket.disconnected) {
                updateStatus('Fail')
            }
        });

        socket.on('connect', () => {
            if (socket.connected) {
                updateStatus('Ok')
            }
        });
    }, [status]);

    useEffect(() => {
        const socket = io(env.serverUrl);
        socket.on('tellostate', (msg: any) => {
            updateState(msg);
        });
    }, [droneState]);

    useEffect(() => {
        const socket = io(env.serverUrl);
        console.log('command', command);
        socket.emit('command', command);
    }, [command]);

    return (
        <View style={styles.mainContainer}>
            <View style={styles.rotationContainer}>
                <Text style={[styles.text, {
                    marginRight: 50, fontSize: (data.alpha > 0.5) ? 30 : 15
                }]}>Rotate L</Text>
                <Text style={[styles.text, {
                    marginLeft: 50, fontSize: (data.alpha < -0.5) ? 30 : 15
                }]}>Rotate R</Text>
            </View>
            <View style={styles.container}>

                <View style={styles.mainArrowContainer}>
                    <ControlButton
                        handlePressIn={() => console.log('object')}
                        handlePressOut={() => console.log('object')}
                        pressed={round(data.gamma) < -2}
                        iconDirection={"left"}
                    />
                    <View style={styles.upDownContainer}>
                        <ControlButton
                            handlePressIn={() => console.log('object')}
                            handlePressOut={() => console.log('object')}
                            pressed={round(data.beta) < -3}
                            iconDirection={"up"}
                            style={{ paddingBottom: 25 }}
                        />
                        <ControlButton
                            handlePressIn={() => console.log('object')}
                            handlePressOut={() => console.log('object')}
                            pressed={round(data.beta) > 3}
                            iconDirection={"down"}
                            style={{ paddingTop: 25 }}
                        />
                    </View>
                    <ControlButton
                        handlePressIn={() => console.log('object')}
                        handlePressOut={() => console.log('object')}
                        pressed={round(data.gamma) > 2}
                        iconDirection={"right"}
                    />
                </View>
            </View>
        </View>
    );
}

function round(n: number): number {
    if (!n) {
        return 0;
    }

    return Math.floor(n * 1000) / 100;
}


const styles = StyleSheet.create({
    text: {
        color: colors.yellowMedium
    },
    mainArrowContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 150
    },
    upDownContainer: {
        backgroundColor: colors.backgroundDark,
    },
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
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    rotationContainer: {
        flex: 1,
        marginTop: 150,
        justifyContent: 'space-between',
        alignItems: 'baseline',
        flexDirection: 'row',
    }
})
export default GyroNavigation;
