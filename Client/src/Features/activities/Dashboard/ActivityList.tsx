import { Box } from "@mui/material";
import ActivityCard from "./ActivityCard";

type Props = {
  activities: Activity[]; // we are passing an array of activities to this component
  selectActivity: (id: string) => void;
  deleteActivity: (id:string) => void;
};

export default function ActivityList({activities , selectActivity,deleteActivity}:Props) {
  return (
    <Box sx={{display:'flex', flexDirection:'column',gap:3}}>  
       {activities.map(activity => (
        <ActivityCard 
        key={activity.id} 
        activity={activity}  
         selectActivity={selectActivity}
         deleteActivity={deleteActivity} />
       ))}
     </Box>
  )
}
