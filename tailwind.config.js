/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        shine: {
          ink: "#172126",
          muted: "#62717A",
          background: "#F7FAF9",
          panel: "#FFFFFF",
          border: "#DCE7E5",
          green: "#079879",
          greenDark: "#05735E",
          greenSoft: "#EEF9F6",
          orange: "#FF7A22",
          yellow: "#FFC43D",
          red: "#F43B39",
          teal: "#1FA7BD",
          blue: "#178BD1",
          pink: "#EF3B78"
        }
      },
      boxShadow: {
        shine: "0 8px 24px rgba(14, 42, 50, 0.08)"
      }
    }
  },
  plugins: []
};
