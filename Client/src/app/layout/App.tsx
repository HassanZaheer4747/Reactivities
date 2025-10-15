
import { Box, Container, CssBaseline } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet } from "react-router";


// import { Typography, List, ListItem } from "@mui/material"; 

function App() {

  return (
    <Box sx={{ bgcolor: '#eeeeee' ,minHeight:'100vh' }}>
      <CssBaseline />
      <NavBar/>
      <Container maxWidth='xl' sx={{ mt: 3 }}>
        <Outlet />      
      </Container>
    </Box>
  );
}
export default App


// without using the REact Query will be donelike that :
// useEffect(() => {
//   axios.get<Activity[]>('http://localhost:5000/api/activities')
//     .then(response => {
//       setActivities(response.data);
//     })
//     .catch(error => {
//       console.error('Error fetching activities:', error);
//     })
//     .finally(() => {
//       setLoading(false);
//     });
// }, []);