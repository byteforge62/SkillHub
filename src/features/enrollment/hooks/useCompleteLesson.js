import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeLesson } from "../api/enrollmentApi";

const useCompleteLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ enrollmentId, lessonId }) =>
      completeLesson(enrollmentId, lessonId),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["my-enrollments"],
      }),
  });
};

export default useCompleteLesson;
