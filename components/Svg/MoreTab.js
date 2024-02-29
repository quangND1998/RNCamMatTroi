import * as React from 'react';
import Svg, { Circle, Rect, Path } from 'react-native-svg';

export default function MoreTab({ color, width, height }) {
    return (
    <Svg width={width || 25} height={height || 24} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M5.125 14C5.95343 14 6.625 13.3284 6.625 12.5C6.625 11.6716 5.95343 11 5.125 11C4.29657 11 3.625 11.6716 3.625 12.5C3.625 13.3284 4.29657 14 5.125 14Z" fill="#F78F43"/>
            <Path d="M13.125 14C13.9534 14 14.625 13.3284 14.625 12.5C14.625 11.6716 13.9534 11 13.125 11C12.2966 11 11.625 11.6716 11.625 12.5C11.625 13.3284 12.2966 14 13.125 14Z" fill="#F78F43"/>
            <Path d="M20.125 14C20.9534 14 21.625 13.3284 21.625 12.5C21.625 11.6716 20.9534 11 20.125 11C19.2966 11 18.625 11.6716 18.625 12.5C18.625 13.3284 19.2966 14 20.125 14Z" fill="#F78F43"/>
    </Svg>
    );
}