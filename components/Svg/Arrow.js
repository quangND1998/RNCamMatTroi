import * as React from 'react';
import Svg, { Circle, Rect, Path } from 'react-native-svg';

export default function Arrow({ color, width, height }) {
    return (

        <Svg width={width || 22} height={height || 22} viewBox="0 0 13 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M1 1L6.5 5L12 1" stroke={color || '#000000'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>

    );
}