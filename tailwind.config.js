/** @type {import('tailwindcss').Config} */
const nativewind = require("nativewind/tailwind/css")

module.exports = {
    content: ["./App.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./navigator/**/*.{js,ts,jsx,tsx}", ],
    theme: {
        fontFamily: {
            'sans': ['ui-sans-serif', 'system-ui'],
            'serif': ['ui-serif', 'Georgia'],
            'mono': ['ui-monospace', 'SFMono-Regular'],
            'display': ['Oswald'],
            'body': ['"Open Sans"'],
            'roboto': ['"Roboto Condensed"'],
        }
    },
    plugins: [require('tailwindcss-font-inter')]
}