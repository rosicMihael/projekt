import NewTimesheetForm from "./NewTimesheetForm";
import { useGetUsersQuery } from "../users/usersApiSlice";
import PulseLoader from "react-spinners/PulseLoader";
import useTitle from "../../hooks/useTitle";

const NewTimesheet = () => {
  useTitle("Timesheets");

  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!users?.length)
    return (
      <p className="loader">
        <PulseLoader color="#FFF" />
      </p>
    );

  return <NewTimesheetForm users={users} />;
};

export default NewTimesheet;
