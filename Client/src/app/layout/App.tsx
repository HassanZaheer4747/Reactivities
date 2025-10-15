import { Box, Container, CssBaseline } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet, useLocation } from "react-router"; // Import useLocation

function App() {
  const location = useLocation(); // Get the current location

  return (
    // Box still ensures the entire viewport has a minimum height
    <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh' }}>
      <CssBaseline />
           {/* 1. CONDITIONAL NAVBAR: Only render NavBar if NOT on the root path ('/') */}
      {location.pathname !== '/' && <NavBar />}
      
      {/* CONDITIONAL RENDERING:
        If we are on the Home Page ('/'), render the Outlet (HomePage) directly 
        WITHOUT the Container, allowing it to take full width and height.

        If we are on any other page (e.g., '/activities'), use the Container 
        to constrain the content within standard margins.
      */}
      {location.pathname === '/' ? (
        <Outlet /> 
      ) : (
        <Container maxWidth='xl' sx={{ mt: 3 }}>
          <Outlet />
        </Container>
      )}
    </Box>
  );
}

export default App;

// ... (comments removed for brevity)