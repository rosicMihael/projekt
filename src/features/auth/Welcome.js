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

      <h1>Dobrodošli {username}!</h1>

      <p>
        <Link to="/dash/notes">Pregled techNotes-a</Link>
      </p>

      <p>
        <Link to="/dash/notes/new">Dodajte Novi techNote</Link>
      </p>

      {(isManager || isAdmin) && (
        <>
          <p>
            <Link to="/dash/users">Pregled Korisnika</Link>
          </p>
          <p>
            <Link to="/dash/users/new">Dodajte Novog Korisnika</Link>
          </p>
        </>
      )}

      <p>
        <Link to="/dash/timesheets">Pregled Rasporeda</Link>
      </p>
      <p>
        <Link to="/dash/timesheets/new">Dodajte Novi Raspored</Link>
      </p>
    </section>
  );
};

export default Welcome;
