import {useQuery} from "@tanstack/react-query";

import { getCurrentUserRequest } from "../api/authApi";

const useCurrentUser = () => {
    return useQuery({
        queryKey: ["current-user"],
        queryFn: getCurrentUserRequest,
        retry: false,
        staleTime: 5*60*1000
    })
}

export default useCurrentUser;