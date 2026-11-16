import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enrollInCourse } from "../api/enrollmentApi";

const useEnrollInCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: enrollInCourse,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-enrollments"],
      });
    },
  });
};

export default useEnrollInCourse;