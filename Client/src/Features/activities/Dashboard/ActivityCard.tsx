import { AccessTime, Place } from '@mui/icons-material';
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Chip, Divider, Typography } from '@mui/material';
import { Link, NavLink } from 'react-router';
import {format} from 'date-fns';
import { formatDate } from '../../../lib/util/util';

type Props = {
  activity: Activity; // we are passing a single activity to this component
};

export default function ActivityCard({ activity }: Props) {
  const isHost = false;
  const isGoing = false;
  const label = isHost ? 'You are hosting this activity' : 'You are going to this activity';
  const isCancelled = false;
const color = isHost ? 'secondary' : isGoing ? 'warning' : 'default';

 return (
  <Card elevation={3} sx={{ borderRadius: 3 }}>
    {/* Header Section */}
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <CardHeader
        avatar={<Avatar sx={{ height: 80, width: 80 }} />}
        title={activity.title}
        titleTypographyProps={{
          fontWeight: 'bold',
          fontSize: 20,
        }}
        subheader={
          <>
            Hosted by <Link to={`/profiles/bob`}>Bob</Link>
          </>
        }
      />

      {/* Chips on Right Side */}
      <Box display="flex" flexDirection="column" gap={1.5} mr={2}>
        {(isHost || isGoing) && (
          <Chip
            label={label}
            color={color as
              | 'default'
              | 'primary'
              | 'secondary'
              | 'success'
              | 'error'
              | 'warning'
              | 'info'}
            sx={{ borderRadius: 2 }}
          />
        )}
        {isCancelled && (
          <Chip label="Cancelled" color="error" sx={{ borderRadius: 2 }} />
        )}
      </Box>
    </Box>

    <Divider sx={{ p: 0 }} />

    {/* Date + Venue */}
    <CardContent sx={{ py: 1.5 }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        gap={2}
        sx={{ mb: 2, px: 2 }}
      >
        <Box display='flex' flexGrow={0} alignItems='center' >
        <AccessTime fontSize="small" />
        <Typography variant="body2" noWrap>{formatDate(activity.date)}</Typography>
        </Box>

        <Place fontSize="small" />
        <Typography variant="body2">{activity.venue}</Typography>
      </Box>

      <Divider />

      {/* Attendees Placeholder */}
      <Box
        display="flex"
        gap={2}
        sx={{ backgroundColor: 'grey.200', py: 3, pl: 3 }}
      >
        Attendees go here
      </Box>
    </CardContent>

    <Divider />

    {/* Description + Button */}
    <CardActions
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2,
        pb: 2,
      }}
    >
      <Typography variant="body2">{activity.description}</Typography>

      <Button
        component={NavLink}
        to={`/activities/${activity.id}`}
        size="medium"
        variant="contained"
        sx={{
          borderRadius: 1.5,
          fontWeight: 'bold',
          textTransform: 'uppercase',
          px: 3,
        }}
      >
        View
      </Button>
    </CardActions>
  </Card>
)}
