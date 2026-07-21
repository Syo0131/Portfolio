/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    // Los colores de skills se construyen dinamicamente (`group-hover/skill:${skill.color}`),
    // asi que Tailwind no los ve al escanear el codigo. Hay que declararlos aqui.
    safelist: [
        'text-orange-500', 'group-hover/skill:text-orange-500',
        'text-blue-500', 'group-hover/skill:text-blue-500',
        'text-blue-400', 'group-hover/skill:text-blue-400',
        'text-yellow-400', 'group-hover/skill:text-yellow-400',
        'text-yellow-600', 'group-hover/skill:text-yellow-600',
        'text-sky-500', 'group-hover/skill:text-sky-500',
        'text-sky-400', 'group-hover/skill:text-sky-400',
        'text-red-500', 'group-hover/skill:text-red-500',
        'text-purple-600', 'group-hover/skill:text-purple-600',
        'text-green-500', 'group-hover/skill:text-green-500',
        'text-[#F05032]', 'group-hover/skill:text-[#F05032]',
        'text-[#0969DA]', 'group-hover/skill:text-[#0969DA]',
    ],
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
            transitionTimingFunction: {
                'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
                'smooth-in': 'cubic-bezier(0.32, 0, 0.67, 0)',
                'smooth-out': 'cubic-bezier(0.33, 1, 0.68, 1)',
                'smooth-in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
            },
            transitionDuration: {
                '400': '400ms',
                '600': '600ms',
                '800': '800ms',
            },
        },
    },
    plugins: [],
}