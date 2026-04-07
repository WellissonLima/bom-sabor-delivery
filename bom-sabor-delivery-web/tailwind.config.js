/** @type {import('tailwindcss').Config} */
export const content = [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
    extend: {
        colors: {
            'pizza-red': '#E44F3D', // Um vermelho vibrante
            'burger-yellow': '#FACC15', // Um amarelo quente
            'dark-charcoal': '#2C3E50', // Quase preto, para texto e fundos escuros
            'light-gray-bg': '#F8F8F8', // Fundo claro  
        }
    },
};
export const plugins = [];