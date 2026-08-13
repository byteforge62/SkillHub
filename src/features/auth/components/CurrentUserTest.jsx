import useCurrentUser from "../hooks/useCurrentUser"

export const CurrentUserTest = () => {
   const {refetch,data,isFetching,error} = useCurrentUser();
    return (
    <div>
      <button onClick={() => refetch()}>
        Get Current User
      </button>

      {isFetching && <p>Loading...</p>}

      {error && (
        <p>
          {error.response?.data?.message || "Request failed"}
        </p>
      )}

      {data && (
        <pre>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  )
}
