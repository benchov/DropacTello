import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import colors from '../style/colors';

interface Coordinates {
    x: number,
    y: number,
    z: number
}

const GyroNavigation = () => {
    const [data, setData] = useState<Coordinates>({ x: 0, y: 0, z: 0 });
    Gyroscope.setUpdateInterval(1000);


    useEffect(() => {
        Gyroscope.addListener(gyroscopeData => {
            setData(gyroscopeData);
        });
    }, []);


    const _subscribe = () => {
        Gyroscope.addListener(gyroscopeData => {
            setData(gyroscopeData);
        });
        Gyroscope.setUpdateInterval(16);
    };


    let { x, y, z } = data;
    return (
        <View style={styles.sensor}>
            <Text style={styles.text}>Gyroscope:</Text>
            <Text style={styles.text}>
                x: {round(x)} y: {round(y)} z: {round(z)}
            </Text>
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
    }
})
export default GyroNavigation;