
import { Box, Container, CssBaseline, Typography } from "@mui/material";
import { useState } from "react"
import NavBar from "./NavBar";
import ActivityDashbord from "../../Features/activities/Dashboard/ActivityDashbord";
import { useActivities } from "../../lib/Hook/UseActivities";

// import { Typography, List, ListItem } from "@mui/material"; 

function App() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);    //state for showing the details of selected activity
  const [editMode, setEditMode] = useState(false);
  const {activities, isLoading, }=useActivities();         //custom hook (work like fun to move some logic to somewhere else)

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities!.find(x => x.id.toString() === id))                     //in js for equality check we use === unlike C# wehere we ==
  }

  const handleCanlcelSelectActivity = () => {
    setSelectedActivity(undefined);
  }

  const handleOpenForm = (id?: string) => {     //will return the Activity Object if id passed exist and it is checked by HandleSelectActivity
    if (id) {
      handleSelectActivity(id);
    }
    else {
      handleCanlcelSelectActivity();
    }
    setEditMode(true);
  }

  const handleCloseForm = () => {
    setEditMode(false);
  }




  return (
    <Box sx={{ bgcolor: '#eeeeee' ,minHeight:'100vh' }}>
      <CssBaseline />
      <NavBar openForm={handleOpenForm} />
      <Container maxWidth='xl' sx={{ mt: 3 }}>
        {!activities || isLoading ? (
          <Typography>Loading..</Typography>
        ) : (
          <ActivityDashbord
            activities={activities}
            selectActivity={handleSelectActivity}
            cancelSelectActivity={handleCanlcelSelectActivity}
            selectedActivity={selectedActivity}
            editMode={editMode}
            openForm={handleOpenForm}
            closeForm={handleCloseForm}
          />
        )}

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