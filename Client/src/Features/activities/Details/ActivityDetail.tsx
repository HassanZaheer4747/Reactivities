import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { useActivities } from "../../../lib/Hook/UseActivities";



export default function ActivityDetail() {
  const navigate = useNavigate();
  const {id}=useParams();                      //we get it from the router
  const {activity,isLoadingActivity} = useActivities(id);   //we get it from the custom hook

    if (isLoadingActivity) return <Typography>Loading... </Typography>;


  if (!activity) return <Typography>Activity Not Found</Typography>;

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardMedia
        component="img"
        src={`/images/categoryImages/${activity.category}.jpg`}
        alt={activity.title}
      />

      <CardContent>
        <Typography variant="h5">{activity.title}</Typography>
        <Typography variant="subtitle1" fontWeight="light">
          {activity.date}
        </Typography>
        <Typography variant="body1">{activity.description}</Typography>
      </CardContent>

      <CardActions>
        <Button onClick={() => navigate(`/manage/${activity.id}`)} color="primary">Edit</Button>
        <Button onClick={() => navigate('/activities')} color="inherit">Cancel</Button>
      </CardActions>
    </Card>
  );
}

//wrapped in an arrow function to avoid immediate call only on click