import * as React from 'react';
import Svg, { Circle, Rect, Path } from 'react-native-svg';

export default function Home({ color, size }) {
    return (
        <Svg width={size || 22} height={size || 22
        } viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" >
            <Path d="M20.7548 19.0245V11.294C20.7548 10.2074 20.3072 9.16866 19.5174 8.42236L12.2343 1.53968C11.4728 0.820108 10.282 0.820108 9.52054 1.53968L2.23729 8.42236C1.44752 9.16866 1 10.2074 1 11.294V19.0245C1 20.1156 1.88445 21 2.97548 21H18.7793C19.8704 21 20.7548 20.1156 20.7548 19.0245Z" stroke={color || '#000000'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </Svg >

    );
}