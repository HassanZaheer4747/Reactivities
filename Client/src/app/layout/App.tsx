
import { Box, Container, CssBaseline  } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react"
import NavBar from "./NavBar";
import ActivityDashbord from "../../Features/activities/Dashboard/ActivityDashbord";
// import { Typography, List, ListItem } from "@mui/material"; 

function App() {

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);    //state for showing the details of selected activity
  const [editMode, setEditMode] = useState(false);


  useEffect(() => {
    axios.get<Activity[]>('https://localhost:5001/api/activities')
      .then(response => setActivities(response.data))

    return () => { }
  }, [])

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(x => x.id.toString() === id))                     //in js for equality check we use === unlike C# wehere we ==
  }  

  const handleCanlcelSelectActivity = () => {
    setSelectedActivity(undefined);
  }

  const handleOpenForm = (id?: string) => {     //will return the Activity Object if id passed exist and it is checked by HandleSelectActivity
    if(id){
      handleSelectActivity(id);
    }
    else{
      handleCanlcelSelectActivity();
    }
    setEditMode(true);
  }

  const handleCloseForm = () => {
    setEditMode(false);
  }

  const handleSubmitForm=(activity:Activity) => {
     if(activity.id){
      setActivities(activities.map(x => x.id === activity.id ? activity : x));
     }
      else{
        const newActivity = {...activity, id: activities.length.toString()}//assigning a new id to the new activity using randomUUID method of crypto
        setSelectedActivity(newActivity);
        setActivities([...activities, newActivity]);   //adding a new activity to the list of activities
      }
      setEditMode(false);
  }

    const handleDelete = (id:string) => {
    setActivities(activities.filter(x => x.id !== id));   //removing the activity with the given id from the list of activities
  }


  return (
    <Box sx={{bgcolor: '#eeeeee'}}>
    <CssBaseline />
   <NavBar openForm={handleOpenForm} />
   <Container maxWidth='xl' sx={{mt:3}}>  
<ActivityDashbord 
activities={activities}
selectActivity={handleSelectActivity}
cancelSelectActivity={handleCanlcelSelectActivity}
selectedActivity={selectedActivity} 
editMode={editMode}
openForm={handleOpenForm}
closeForm={handleCloseForm}
submitForm={handleSubmitForm} 
deleteActivity={handleDelete}
 />  
      </Container>
    </Box>
  ); 
}
export default App
