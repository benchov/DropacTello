import * as React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import FunctionalButtonGroup from '../components/FunctionalButtonGroup';
import ControllButtonGroup from '../components/ControllButtonGroup';
import StateDisplay from '../components/StateDisplay';
import * as ScreenOrientation from 'expo-screen-orientation';
import env from '../urlConfig';
import io from "socket.io-client";


const TestScreen = () => {

    const [command, setCommand] = React.useState<string>('command');
    const [status, updateStatus] = React.useState<string>('N/A');
    const [state, updateState] = React.useState({});

    React.useEffect(() => {
        if (Platform.OS !== 'web') {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
        }
    }, [])

    React.useEffect(() => {
        const socket = io(env.serverUrl);
        socket.on('disconnect', () => {
            if (socket.disconnected) {
                updateStatus('Disconected')
            }
        });

        socket.on('connect', () => {
            if (socket.connected) {
                updateStatus('Conected')
            }
        });
    }, [status]);

    React.useEffect(() => {
        const socket = io(env.serverUrl);
        socket.on('tellostate', (msg: string) => {
            updateState(msg)
        });
    }, []);

    React.useEffect(() => {
        const socket = io(env.serverUrl);
        socket.emit('command', command);
    }, [command]);

    const onClickHandler = (value: string) => {
        setCommand(value);
    };

    return (
        <View style={styles.container}>
            <View>
                <StatusBar hidden={true} />
                <StateDisplay battery={null} connection={status} />
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