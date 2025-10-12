import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import type { FormEvent } from "react";
import { useActivities } from "../../../lib/Hook/UseActivities";

type Props = {
  closeForm: () => void;
  activity?: Activity ;
};

export default function ActivityForm({closeForm,activity}: Props) {
  const {updateActivity,createActivity} = useActivities();

  const handleSubmit = async (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted!'); // Add this to see if form submission is triggered

   const formData = new FormData(event.currentTarget);    //new FormData(form) is a browser API → it reads all inputs with a name attribute from that form.
// FormData is kind of weird, so you made it into a normal object:(by iterating through it and adding each key-value pair to a new object)
   const data:{[key:string] : FormDataEntryValue}={};
    formData.forEach((value,key) => {
       data[key] = value;
    })

    console.log('Activity object:', activity); // Check if activity exists
    console.log('Form data collected:', data);

    if(activity) {
      await updateActivity.mutateAsync({...activity, ...data});
    } else {
      await createActivity.mutateAsync(data as unknown as Activity);
    }
    closeForm();
    //type assertion to treat data as an Activity object
  }

 return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
  <Typography variant="h5" gutterBottom color="primary">
    Create activity
  </Typography>

  <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={3}>
    <TextField name="title" label="Title" defaultValue={activity?.title} />
    <TextField name="description" label="Description" multiline rows={3} defaultValue={activity?.description} />
    <TextField name="category" label="Category" defaultValue={activity?.category}/>
    <TextField name="date" label="Date" type="datetime" defaultValue={activity?.date ?
      new Date(activity.date).toISOString().split('T')[0] 
      : new Date().toISOString().split('T')[0]
    } />
    <TextField name="city" label="City" defaultValue={activity?.city} />
    <TextField name="venue" label="Venue" defaultValue={activity?.venue}/>

    <Box display="flex" justifyContent="end" gap={3}>
      <Button color="inherit"  onClick={closeForm} >Cancel</Button>   
      <Button
       type="submit" 
       color="success" 
       variant="contained"
       disabled={updateActivity.isPending || createActivity.isPending}   //disable the button while the mutation is in progress
       >Submit</Button>   
    </Box>
  </Box>
</Paper>

  )
}
//yype=submit tells the button to submit the form when clicked:plane html attribute
