import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from '@mui/material';
import { AppBar, Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export const settings = {
  palette: {

    primary: {
      main: "#000000", contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#000000",
    },
  },
  typography: { fontFamily: "'Open Sans', sans-serif" }
};

const theme = createTheme(settings);

function App() {
  const [active, setActive] = useState(0);

  const change = (event, value) => {
      setActive(value);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
            <AppBar position="static">
                <Tabs
                    color="inherit"
                    value={active}
                    centered
                    textColor="inherit"
                    onChange={change}
                    variant="fullWidth"
                >
                    <Tab component={Link} label="Trainings" to="/" icon={< CalendarMonthIcon />}></Tab>
                    <Tab component={Link} label="Customers" to="/customers" icon={< PeopleAltIcon />}></Tab>
                </Tabs>
            </AppBar>
           <Outlet/>
     
        </Box>
    </ThemeProvider>
  )
}

export default App
