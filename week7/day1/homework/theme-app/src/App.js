import styled from "styled-components";
import theme from "styled-theming";
import DarkThemeProvider from "./DarkThemeProvider";
import DarkThemeToggle from "./DarkThemeToggle";

const backgroundColor = theme("theme", {
  light: "#ffffff",
  dark: "#2d2d2d"
});

const foregroundColor = theme("theme", {
  light: "#111111",
  dark: "#ffffff"
});

const Page = styled.div`
  min-height: 100vh;
  background-color: ${backgroundColor};
  color: ${foregroundColor};
  transition: background-color 180ms ease, color 180ms ease;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 48px;
  background-color: ${foregroundColor};
  color: ${backgroundColor};
`;

const Content = styled.main`
  display: flex;
  min-height: calc(100vh - 96px);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

function App() {
  return (
    <DarkThemeProvider>
      <Page>
        <Header>
          <h1>Theme App</h1>
          <DarkThemeToggle />
        </Header>
        <Content>
          <h2>Welcome!</h2>
          <p>Full Stack Web Development</p>
        </Content>
      </Page>
    </DarkThemeProvider>
  );
}

export default App;
