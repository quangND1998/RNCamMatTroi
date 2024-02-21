import * as React from 'react';
import Svg, { Circle, Rect, Path } from 'react-native-svg';

export default function CalenderTab({ color, width, height }) {
    return (
    <Svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M17.6667 4.58333H16.875V3.79167C16.875 3.5817 16.7916 3.38034 16.6431 3.23187C16.4947 3.08341 16.2933 3 16.0833 3C15.8734 3 15.672 3.08341 15.5235 3.23187C15.3751 3.38034 15.2917 3.5817 15.2917 3.79167V4.58333H8.95833V3.79167C8.95833 3.5817 8.87493 3.38034 8.72646 3.23187C8.57799 3.08341 8.37663 3 8.16667 3C7.9567 3 7.75534 3.08341 7.60687 3.23187C7.45841 3.38034 7.375 3.5817 7.375 3.79167V4.58333H6.58333C5.5339 4.58459 4.52782 5.00203 3.78576 5.74409C3.0437 6.48615 2.62626 7.49224 2.625 8.54167V18.0417C2.62626 19.0911 3.0437 20.0972 3.78576 20.8392C4.52782 21.5813 5.5339 21.9987 6.58333 22H17.6667C18.7161 21.9987 19.7222 21.5813 20.4642 20.8392C21.2063 20.0972 21.6237 19.0911 21.625 18.0417V8.54167C21.6237 7.49224 21.2063 6.48615 20.4642 5.74409C19.7222 5.00203 18.7161 4.58459 17.6667 4.58333ZM4.20833 8.54167C4.20833 7.91178 4.45856 7.30769 4.90395 6.86229C5.34935 6.41689 5.95344 6.16667 6.58333 6.16667H17.6667C18.2966 6.16667 18.9006 6.41689 19.346 6.86229C19.7914 7.30769 20.0417 7.91178 20.0417 8.54167V9.33333H4.20833V8.54167ZM17.6667 20.4167H6.58333C5.95344 20.4167 5.34935 20.1664 4.90395 19.721C4.45856 19.2756 4.20833 18.6716 4.20833 18.0417V10.9167H20.0417V18.0417C20.0417 18.6716 19.7914 19.2756 19.346 19.721C18.9006 20.1664 18.2966 20.4167 17.6667 20.4167Z" fill="#184E17"/>
        <Path d="M12.125 16.0625C12.7808 16.0625 13.3125 15.5308 13.3125 14.875C13.3125 14.2192 12.7808 13.6875 12.125 13.6875C11.4692 13.6875 10.9375 14.2192 10.9375 14.875C10.9375 15.5308 11.4692 16.0625 12.125 16.0625Z" fill="#184E17"/>
        <Path d="M8.16654 16.0625C8.82238 16.0625 9.35404 15.5308 9.35404 14.875C9.35404 14.2192 8.82238 13.6875 8.16654 13.6875C7.5107 13.6875 6.97904 14.2192 6.97904 14.875C6.97904 15.5308 7.5107 16.0625 8.16654 16.0625Z" fill="#184E17"/>
        <Path d="M16.0834 16.0625C16.7393 16.0625 17.2709 15.5308 17.2709 14.875C17.2709 14.2192 16.7393 13.6875 16.0834 13.6875C15.4276 13.6875 14.8959 14.2192 14.8959 14.875C14.8959 15.5308 15.4276 16.0625 16.0834 16.0625Z" fill="#184E17"/>
    </Svg>
    );
}