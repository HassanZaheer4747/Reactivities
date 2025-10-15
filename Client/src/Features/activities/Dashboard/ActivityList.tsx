import { Box, Typography } from "@mui/material";
import ActivityCard from "./ActivityCard";
import { useActivities } from "../../../lib/Hook/UseActivities";


export default function ActivityList() {
    const {activities, isLoading, }=useActivities();         //custom hook (work like fun to move some logic to somewhere else)

    // temporary no-op handler: some code or older build may reference `selectActivity`
    // define it here to avoid a ReferenceError while we track down the root caller.
    // const selectActivity = (id?: string) => {
    //   // intentionally empty - will be implemented properly by the parent when needed
    // };

    if(!activities || isLoading) return <Typography>Loading...</Typography>
  return (
    <Box sx={{display:'flex', flexDirection:'column',gap:3}}>  
       {activities.map(activity => (
        <ActivityCard 
        key={activity.id} 
        activity={activity}  
 />
       ))}
     </Box>
  )
}
