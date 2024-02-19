import * as React from 'react';
import Svg, { Circle, Rect, Path } from 'react-native-svg';

export default function Chevron({ color, size }) {
    return (

        <Svg width={size || 22} height={size || 22} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M19.9015 1.12216H12.1709C11.0843 1.12216 10.0456 1.56971 9.29932 2.35951L2.41663 9.6427C1.69706 10.4041 1.69706 11.595 2.41663 12.3564L9.29932 19.6397C10.0456 20.4294 11.0843 20.877 12.1709 20.877H19.9015C20.9925 20.877 21.877 19.9925 21.877 18.9015V3.09764C21.877 2.00659 20.9925 1.12216 19.9015 1.12216Z" stroke={color || '#000000'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>

    );
}