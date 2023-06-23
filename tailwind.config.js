module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#0D1117",
        secondary: "#161B22",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      keyframes:{
        updown: {
          '0%': {
            transform: 'translateY(0px)'
          },
          '25%': {
            transform: 'translateY(10px)'
          },
          '50%': {
            transform: 'translateY(0px)'
          },
          '75%': {
            transform: 'translateY(-10px)'
          },
          '100%': {
            transform: 'translateY(0px)'
          },
        }
      },
      animation: {
        'arrow-updown': 'updown 3s linear infinite',
      },
    },
  },
  plugins: [
    
  ],
};
