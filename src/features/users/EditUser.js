import { useParams } from "react-router-dom";
import EditUserForm from "./EditUserForm";
import { useGetUsersQuery } from "./usersApiSlice";
import PulseLoader from "react-spinners/PulseLoader";
import useTitle from "../../hooks/useTitle";

const EditUser = () => {
  useTitle("Korisnici");

  const { id } = useParams();

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  });

  if (!user)
    return (
      <p className="loader">
        <PulseLoader color="#FFF" />
      </p>
    );

  return <EditUserForm user={user} />;
};

export default EditUser;
