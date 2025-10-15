import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";

export const useActivities =(id?:string) => {
const queryClient = useQueryClient();                //“Hey React Query, give me access to your data center — so I can tell you when something has changed. to cahnge data from cache”

     const { data: activities, isLoading } = useQuery({    //The returned data (list of activities) is stored in a variable called activities
    queryKey: ['activities'],
    queryFn: async () => {
      const response = await agent.get<Activity[]>('/activities');
      return response.data;
    }
  });

   const {
    data: activity,
    isLoading: isLoadingActivity,
  } = useQuery({
    queryKey: ["activity", id], // <-- use unique key for single activity
    queryFn: async () => {
      const response = await agent.get<Activity>(`/activities/${id}`);
      return response.data;
    },
    enabled: !!id, // <-- only run if id exists (prevents error)
  });
  
  const updateActivity = useMutation({
  mutationFn: async (activity: Activity) => {
      // PUT should target /activities/{id} per API signature
      await agent.put(`/activities/${activity.id}`, activity);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['activities'] });                              //“React Query, please re-fetch the ['activities'] query again from the server because something has changed.”
    }  
  });

    const createActivity = useMutation({
    mutationFn: async (activity: Activity) => {
      const response = await agent.post<Activity>('/activities', activity);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['activities'] });                              //“React Query, please re-fetch the ['activities'] query again from the server because something has changed.”
    }  
  });

      const deleteActivity = useMutation({
    mutationFn: async (id:string) => {
          // DELETE should target /activities/{id}
          await agent.delete(`/activities/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['activities'] });                              //“React Query, please re-fetch the ['activities'] query again from the server because something has changed.”
    }  
  });

 return {
    activities,
    isLoading,
    updateActivity,
    createActivity,
    deleteActivity,
    activity,
    isLoadingActivity
 }

}

