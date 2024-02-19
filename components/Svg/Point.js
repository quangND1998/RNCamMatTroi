import * as React from 'react';
import Svg, { Circle, Rect, Path } from 'react-native-svg';

export default function Point({ color, size }) {
    return (
        <Svg width={size || 22} height={size || 22
        } viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" >
            <Path
                d="M13 6.5C13 10.0899 10.0899 13 6.5 13C2.91015 13 0 10.0899 0 6.5C0 2.91015 2.91015 0 6.5 0C10.0899 0 13 2.91015 13 6.5Z"
                fill="#2E67A9" />
            <Path
                d="M9 6.5C9 7.88071 7.88071 9 6.5 9C5.11929 9 4 7.88071 4 6.5C4 5.11929 5.11929 4 6.5 4C7.88071 4 9 5.11929 9 6.5Z"
                fill="white" />
        </Svg >

    );
}