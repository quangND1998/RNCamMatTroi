/** @type {import('tailwindcss').Config} */
const nativewind = require("nativewind/tailwind/css")
module.exports = {
    content: ["./App.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./navigator/**/*.{js,ts,jsx,tsx}", ],
    theme: {
        extend: {},
    },
    plugins: [nativewind],
}