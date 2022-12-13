module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      colors: {
        "primary-color": "#414E97",

        //Border
        "gray-border": "#E4EEE4",
        
        //pallete
        "red-pallete": "#EF8677",
        "green-pallete": "#A0E77D",
        "soft-green" : "#6BC689",
        "blue-pallete": "#82B6D9",
        "soft-black": "#181A18",
        "soft-gray": "#505153",
        "soft-gray-2": "#F9F9F9",
        "dark-gray": "#D9D9D9", 
        "dark-gray-2": "#F2F2F2",
        "dark-gray-3": "#B2B2B4",
        "dark-gray-3": "#CDCDCD",
        "purple-pallete": "#414E97"
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      boxShadow: {
        'headerShadow': '0px 0px 10px #E4EEE4',
        'headerIcon': '1px 2px 8px -5px #414E97;',
        'inputProductShadow': "1px 2px 8px -5px #414E97",
        'CartShadow': "0px 0px 5px #ECE9E9",
        "CardShadow": "0px 1px 6px 0px rgb(0 0 0 / 12%)"
      },
    },
  },
  plugins: [],
}
