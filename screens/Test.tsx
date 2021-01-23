import * as React from 'react';
import { View, StyleSheet, StatusBar, Platform } from 'react-native';
import FunctionalButtonGroup from '../components/FunctionalButtonGroup';
import ControllButtonGroup from '../components/ControllButtonGroup';
import StateDisplay from '../components/StateDisplay';
import * as ScreenOrientation from 'expo-screen-orientation';
import env from '../urlConfig';
import io from "socket.io-client";

const TestScreen = () => {

    const [command, setCommand] = React.useState<string>('command');
    const [status, updateStatus] = React.useState<string>('N/A');
    const [droneState, updateState] = React.useState<object>();

    React.useEffect(() => {
        if (Platform.OS !== 'web') {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
        }
    }, [])

    React.useEffect(() => {
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

    React.useEffect(() => {
        const socket = io(env.serverUrl);
        socket.on('tellostate', (msg: any) => {
            updateState(msg);
        });
    }, [droneState]);

    React.useEffect(() => {
        const socket = io(env.serverUrl);
        console.log('command', command);
        socket.emit('command', command);
    }, [command]);

    const onClickHandler = (value: string): void => {
        setCommand(value);
    };

    return (
        <View style={styles.container}>
            <View>
                <StatusBar hidden={true} />
                <StateDisplay verticalSpeed={droneState ? droneState.vgx : null}
                    battery={droneState ? droneState.bat : null}
                    height={droneState ? droneState.h : null}
                    connection={status}
                />
                <View style={styles.buttonContainer}>
                    <FunctionalButtonGroup onClick={onClickHandler} />
                    <ControllButtonGroup onClick={onClickHandler} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        flex: 5,
        justifyContent: 'space-evenly',
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    }
})

export default TestScreen;