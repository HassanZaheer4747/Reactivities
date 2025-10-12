import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";

export const useActivities =() => {
  const queryClient = useQueryClient();

  const { data: activities, isLoading } = useQuery({
    queryKey: ['activities'],
    queryFn: async () => {
      const response = await agent.get<Activity[]>('/activities');
      return response.data;
    }
  })

  const createActivity = useMutation({
    mutationFn: async (activity: Activity) => {
      const response = await agent.post('/activities', activity);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    }
  })

  const updateActivity = useMutation({
    mutationFn: async (activity: Activity) => {
      const response = await agent.put(`/activities/${activity.id}`, activity);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    }
  })

  const deleteActivity = useMutation({
    mutationFn: async (id: string) => {
      await agent.delete(`/activities/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    }
  })

  return { 
    activities: activities || [], 
    isLoading,
    createActivity,
    updateActivity,
    deleteActivity
  };
}

