/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                shakespeare: {
                    '50': '#ecfdff',
                    '100': '#cef8ff',
                    '200': '#a4f1fd',
                    '300': '#65e4fb',
                    '400': '#20cef0',
                    '500': '#04bbe3',
                    '600': '#068cb4',
                    '700': '#0d7191',
                    '800': '#145c76',
                    '900': '#154b64',
                    '950': '#073145',
                },
            },
        },
    },
    plugins: [],
}