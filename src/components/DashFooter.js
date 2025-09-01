import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const DashFooter = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { username, status } = useAuth();

  const onHomeClicked = () => {
    navigate("/dash");
  };

  let homeButton = null;
  if (pathname !== "/dash") {
    homeButton = (
      <button
        className="dash-footer__button icon-button"
        title="Home"
        onClick={onHomeClicked}
      >
        <FontAwesomeIcon icon={faHouse} />
      </button>
    );
  }

  return (
    <footer className="dash-footer">
      {homeButton}
      <p>Trenutni Korisnik: {username}</p>
      <p>Pozicija: {status}</p>
    </footer>
  );
};

export default DashFooter;
