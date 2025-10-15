import { useParams } from "react-router";
import { useActivities } from "../../../lib/Hook/UseActivities";
import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2"; // ✅ Correct import for MUI v7
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsChat from "./ActivityDetailsChat";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsSidbar from "./ActivityDetailsSidbar";

export default function ActivityDetailPage() {
  const { id } = useParams(); // Get activity ID from the route
  const { activity, isLoadingActivity } = useActivities(id); // Custom hook for data

  if (isLoadingActivity) return <Typography>Loading...</Typography>;
  if (!activity) return <Typography>Activity Not Found</Typography>;

  return (
    // Grid2 container should use the 'container' prop
    <Grid2 container spacing={3}>
      {/* Left Column (Main Content) */}
      {/* Grid items should use the 'xs' prop directly for the breakpoint */}
      <Grid2 size={8}>
        <ActivityDetailsHeader activity={activity}  />
        <ActivityDetailsInfo activity={activity} />
        <ActivityDetailsChat  />
      </Grid2>

      {/* Right Column (Sidebar) */}
      {/* Grid items should use the 'xs' prop directly for the breakpoint */}
      <Grid2 size={4}>
        <ActivityDetailsSidbar/>
        </Grid2>
    </Grid2>
  );
}