import { Grid2  } from '@mui/material'
import ActivityList from './ActivityList';
import ActivityFilters from './ActivityFilters';




export default function ActivityDashbord() {                    //Normally without destucturing it would be (props: Props) and then use props.activities

    return (
        <Grid2 container spacing={3}>
            <Grid2 size={8}>
             <ActivityList
             
              />
            </Grid2>
                    <Grid2 size={4}>  
                        <ActivityFilters/>
            </Grid2>
            
        </Grid2>
    )
}
// && conditional rendering in react