import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import ActivityDashbord from "../../Features/activities/Dashboard/ActivityDashbord";
import ActivityForm from "../../Features/activities/form/ActivityForm";
import ActivityDetail from "../../Features/activities/Details/ActivityDetail";
import HomePage from "../../Features/home/homePage";

export const router = createBrowserRouter([{
    path: '/',
    element: <App />,      //it is the  route route for the whole app
    children: [
        { path: '', element: <HomePage /> },   //localhost:3000/    ,That empty string ('') means: “When the URL matches exactly the parent path ( / ), render this component.”
        { path: 'activities', element: <ActivityDashbord /> },
        { path: 'activities/:id', element: <ActivityDetail /> },
        { path: 'createActivity', element: <ActivityForm /> },
        {path:'manage/:id', element:<ActivityForm/>}
    ]
}
])

// []:caue we provide our routes as an array and each route is an object with path and element