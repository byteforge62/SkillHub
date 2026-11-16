import { useQuery } from "@tanstack/react-query";
import { getCourseById } from "../../courses/api/courseApi";

const useCourseLearning = (courseId) => {
  return useQuery({
    queryKey: ["course-learning", courseId],
    queryFn: () => getCourseById(courseId),
    enabled: Boolean(courseId),
  });
};

export default useCourseLearning;