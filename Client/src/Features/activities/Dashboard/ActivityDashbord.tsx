import { Grid2  } from '@mui/material'
import ActivityList from './ActivityList';
import ActivityDetails from '../Details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';


type Props = {
    activities: Activity[];
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    selectedActivity: Activity | undefined;
    openForm: (id?: string) => void;
    closeForm: () => void;
    editMode: boolean;    
}

export default function ActivityDashbord({activities, cancelSelectActivity,selectActivity,selectedActivity,openForm,closeForm,editMode}: Props) {                    //Normally without destucturing it would be (props: Props) and then use props.activities
    return (
        <Grid2 container spacing={3}>
            <Grid2 size={7}>
             <ActivityList
              activities={activities}
              selectActivity={selectActivity}
              />
            </Grid2>
            <Grid2 size={5}>  
                {selectedActivity  && !editMode &&
                <ActivityDetails 
                selectedActivity={selectedActivity}
                cancelSelectActivity={cancelSelectActivity}
                openForm={openForm}
                />
                }     
                {editMode &&
                <ActivityForm 
                closeForm={closeForm} 
                activity={selectedActivity} 
                 />}
            </Grid2>
            
        </Grid2>
    )
}
// && conditional rendering in react