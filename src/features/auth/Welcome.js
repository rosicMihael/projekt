import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Welcome = () => {
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const { username, isManager, isAdmin } = useAuth();

  return (
    <section className="welcome">
      <p>{today}</p>

      <h1>Welcome {username}!</h1>

      <p>
        <Link to="/dash/notes">View techNotes</Link>
      </p>

      <p>
        <Link to="/dash/notes/new">Add New techNote</Link>
      </p>

      {(isManager || isAdmin) && (
        <>
          <p>
            <Link to="/dash/users">View User Settings</Link>
          </p>
          <p>
            <Link to="/dash/users/new">Add New User</Link>
          </p>
        </>
      )}

      <p>
        <Link to="/dash/timesheet">View Timesheets</Link>
      </p>
      <p>
        <Link to="/dash/timesheet/new">Add New Timesheet</Link>
      </p>
    </section>
  );
};

export default Welcome;
