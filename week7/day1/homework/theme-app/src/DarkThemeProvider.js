import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";

function DarkThemeProvider({ children }) {
  const isDarkTheme = useSelector((state) => state.isDarkTheme);

  return (
    <ThemeProvider theme={{ theme: isDarkTheme ? "dark" : "light" }}>
      {children}
    </ThemeProvider>
  );
}

export default DarkThemeProvider;
