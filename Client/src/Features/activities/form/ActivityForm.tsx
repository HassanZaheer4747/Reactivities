import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import type { FormEvent } from "react";

type Props = {
  closeForm: () => void;
  activity?: Activity ;
  submitForm: (activity:Activity) => void;
};

export default function ActivityForm({closeForm,activity,submitForm}: Props) {

  const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();
   const formData = new FormData(event.currentTarget);    //new FormData(form) is a browser API → it reads all inputs with a name attribute from that form.
// FormData is kind of weird, so you made it into a normal object:(by iterating through it and adding each key-value pair to a new object)
   const data:{[key:string] : FormDataEntryValue}={};
    formData.forEach((value,key) => {
       data[key] = value;
    })

    if(activity) data.id=activity.id;   //if activity exists then we are editing an existing activity so we keep the id same otherwise for new activity id will be assigned in App.tsx
    submitForm(data as unknown as Activity);   //type assertion to treat data as an Activity object
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
    <TextField name="date" label="Date" type="datetime" defaultValue={activity?.date} />
    <TextField name="city" label="City" defaultValue={activity?.city} />
    <TextField name="venue" label="Venue" defaultValue={activity?.venue}/>

    <Box display="flex" justifyContent="end" gap={3}>
      <Button color="inherit"  onClick={closeForm} >Cancel</Button>   
      <Button type="submit" color="success" variant="contained">Submit</Button>   
    </Box>
  </Box>
</Paper>

  )
}
//yype=submit tells the button to submit the form when clicked:plane html attribute
