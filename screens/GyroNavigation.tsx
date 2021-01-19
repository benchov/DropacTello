import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import * as ScreenOrientation from 'expo-screen-orientation';
import colors from '../style/colors';
import ControlButton from '../components/ControlButton';
interface Coordinates {
    x: number,
    y: number,
    z: number
}

const GyroNavigation = () => {
    const [data, setData] = useState<Coordinates>({ x: 0, y: 0, z: 0 });
    Gyroscope.setUpdateInterval(50);


    useEffect(() => {
        Gyroscope.addListener(gyroscopeData => {
            setData(gyroscopeData);
        });
    }, []);

    useEffect(() => {
        if (Platform.OS !== 'web') {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
        }
    }, [])

    let { x, y, z } = data;
    return (
        <View style={styles.mainContainer}>
            <View style={styles.sensor}>
                <Text style={styles.text}>Gyroscope:</Text>
                <Text style={styles.text}>
                    x: {round(x)} y: {round(y)} z: {round(z)}
                </Text>
            </View>
            <View style={styles.container}>
                <View style={styles.mainArrowContainer}>
                    <ControlButton
                        handlePressIn={() => console.log('object')}
                        handlePressOut={() => console.log('object')}
                        pressed={data.y < -2}
                        iconDirection={"left"}
                    />
                    <View style={styles.upDownContainer}>
                        <ControlButton
                            handlePressIn={() => console.log('object')}
                            handlePressOut={() => console.log('object')}
                            pressed={data.x < -2}
                            iconDirection={"up"}
                            style={{ paddingBottom: 25 }}
                        />
                        <ControlButton
                            handlePressIn={() => console.log('object')}
                            handlePressOut={() => console.log('object')}
                            pressed={data.x > 2}
                            iconDirection={"down"}
                            style={{ paddingTop: 25 }}
                        />
                    </View>
                    <ControlButton
                        handlePressIn={() => console.log('object')}
                        handlePressOut={() => console.log('object')}
                        pressed={data.y > 2}
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
    sensor: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
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
    }
})
export default GyroNavigation;