import * as React from 'react';
import Svg, { Circle, Rect, Path } from 'react-native-svg';

export default function Star({ color, width, height }) {
    return (
        <Svg width={width || 28} height={height || 22} viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M14 0L17.1432 9.67376H27.3148L19.0858 15.6525L22.229 25.3262L14 19.3475L5.77101 25.3262L8.9142 15.6525L0.685208 9.67376H10.8568L14 0Z" fill={color || "#FF6100"} />
        </Svg>

    );
}