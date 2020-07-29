import * as React from 'react';
import { TouchableOpacity, View } from "react-native";
import { Entypo } from '@expo/vector-icons';

interface IconButtonProps {
    commandType: string,
    color: string,
    size: number,
    style?: object,
    onClick?: any,
}

const IconButton: React.FC<IconButtonProps> = (props) => {

    const getIconName = (commandType: string) => {
        const Icons: {
            [key: string]: string,
            takeoff: string,
            land: string,
            emergency: string,
            up: string,
            down: string,
            cw: string,
            ccw: string,
            left: string,
            right: string,
            back: string,
            forward: string
        } = {
            'takeoff': "aircraft-take-off",
            'land': "aircraft-landing",
            'emergency': 'circle-with-cross',
            'up': 'chevron-thin-up',
            'down': 'chevron-thin-down',
            'cw': 'chevron-thin-right',
            'ccw': 'chevron-thin-left',
            'left': 'chevron-thin-left',
            'right': 'chevron-thin-right',
            'back': 'chevron-thin-down',
            'forward': 'chevron-thin-up'
        }
        return Icons[commandType];
    }
    const onClickHandler = (value: string) => {
        return props.onClick(value);
    }
    return (
        <View style={{
            padding: 10,
        }}>
            <TouchableOpacity onPress={() => onClickHandler(props.commandType)}>
                <Entypo name={getIconName(props.commandType)} size={props.size} color={props.color} style={props.style} />
            </TouchableOpacity>
        </View>
    );
}

export default IconButton;