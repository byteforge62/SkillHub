import { useQuery } from "@tanstack/react-query";
import { getCourses } from "../api/courseApi";

const useCourses = (params = {}) => {
  return useQuery({
    queryKey: ["courses", params],
    queryFn: () => getCourses(params),
  });
};

export default useCourses;