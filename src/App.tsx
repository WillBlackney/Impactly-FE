import React from "react";
import { RecoilRoot } from "recoil";
import LoginPage from "./components/LoginPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SignUpPage from "./components/SignUpPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskPage from "./components/TaskPage";
import { CssBaseline } from "@mui/material";

function App() {
  const theme = createTheme();
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>     
      <CssBaseline/>   
        <Router>
          <Routes>
            <Route path="/signup" element = {<SignUpPage/>}>
            </Route>
            <Route path="/login"  element = {<LoginPage/>}>
            </Route>
            <Route path="/tasks" element = {<TaskPage/>}>
            </Route>
            <Route path="/" element = {<LoginPage/>}>
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
