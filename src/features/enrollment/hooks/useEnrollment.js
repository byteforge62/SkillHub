import { useQuery } from "@tanstack/react-query";
import { getMyEnrollments } from "../api/enrollmentApi";

const useMyEnrollments = () => {
  return useQuery({
    queryKey: ["my-enrollments"],
    queryFn: getMyEnrollments,
  });
};

export default useMyEnrollments;