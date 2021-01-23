import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Platform, StatusBar, Button } from 'react-native';
import { DeviceMotion } from 'expo-sensors';
import * as ScreenOrientation from 'expo-screen-orientation';
import colors from '../style/colors';
import ControlButton from '../components/ControlButton';
import FunctionalButtonGroup from '../components/FunctionalButtonGroup';
import StateDisplay from '../components/StateDisplay';


import env from '../urlConfig';
import io from "socket.io-client";
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
    const [gyroAllowed, setGyroAllowed] = React.useState<boolean>(true)

    DeviceMotion.setUpdateInterval(50);


    useEffect(() => {
        if (gyroAllowed) {
            DeviceMotion.addListener(deviceMotionData => {
                setData(deviceMotionData.rotation)
            });
        } else {
            console.log("removed");
            DeviceMotion.removeAllListeners()
        }
    }, [gyroAllowed]);

    useEffect(() => {
        if (Platform.OS !== 'web') {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
        }
    }, []);

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

    useEffect(() => {
        setCommand(`rc 
            ${channelHandler(data.gamma, "gamma")} 
            ${channelHandler(data.beta, "beta")}   
            ${0} 
            ${channelHandler(data.alpha, "alpha")}
        `);
        // console.log('command in app: ', command)
    }, [data])

    const channelHandler = (data: number, axisType: string) => {
        const roundedData = round(data);

        switch (axisType) {
            case "beta":
                if (roundedData < - 3) {
                    return 50;
                };
                if (roundedData > 3) {
                    return -50;
                };
                return 0;
            case "gamma":
                if (roundedData < - 2) {
                    return -50;
                };

                if (roundedData > 2) {
                    return 50;
                };
                return 0;
            case "alpha":
                if (roundedData < - 10) {
                    return -50;
                };

                if (roundedData > 10) {
                    return 50;
                };
                return 0;
            default:
                break;
        }
    }

    const onClickHandler = (value: string): void => {
        console.log(value);
        setCommand(value);
    }

    const onGyroAllowHandler = () => {
        console.log('Hit gyro', gyroAllowed);
        setGyroAllowed(!gyroAllowed);
    }

    const round = (n: number): number => {
        if (!n) {
            return 0;
        }

        return Math.floor(n * 1000) / 100;
    }

    return (
        <View style={styles.mainContainer}>
            <StatusBar hidden={true} />
            <StateDisplay verticalSpeed={droneState ? droneState.vgx : null}
                battery={droneState ? droneState.bat : null}
                height={droneState ? droneState.h : null}
                connection={status}
            />
            <FunctionalButtonGroup onClick={onClickHandler} />
            <View style={{ marginTop: 50 }}>
                <Button
                    onPress={onGyroAllowHandler}
                    color={gyroAllowed ? colors.yellowDark : colors.backgroundLight}
                    title={gyroAllowed ? "Diable Gyro Navigation" : "Set Gyro Navigation"}
                />
            </View>
            <View style={styles.rotationContainer}>
                <Text style={[styles.text, {
                    marginRight: 50, fontSize: (round(data.alpha) > 10) ? 30 : 15
                }]}>Rotate L</Text>
                <Text style={[styles.text, {
                    marginLeft: 50, fontSize: (round(data.alpha) < 10) ? 30 : 15
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
        </View >
    );
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
        marginTop: 50,
        justifyContent: 'space-between',
        alignItems: 'baseline',
        flexDirection: 'row',
    }
})
export default GyroNavigation;
