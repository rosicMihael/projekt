import { useState, useEffect } from "react";
import { useAddNewTimesheetMutation } from "./timesheetApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

const NewTimesheetForm = ({ users }) => {
  const [addNewTimesheet, { isLoading, isSuccess, isError, error }] =
    useAddNewTimesheetMutation();

  const navigate = useNavigate();

  const [userId, setUserId] = useState(users[0].id);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setUserId("");
      setYear("");
      setMonth("");
      navigate("/dash/timesheet");
    }
  }, [isSuccess, navigate]);

  const onUserIdChange = (e) => setUserId(e.target.value);
  const onYearChange = (e) => setYear(e.target.value);
  const onMonthChange = (e) => setMonth(e.target.value);

  const canSave = [userId, year, month].every(Boolean) && !isLoading;

  const onSaveClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewTimesheet({ user: userId, year, month });
    }
  };

  const options = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.username}
      </option>
    );
  });

  const errClass = isError ? "errmsg" : "offscreen";
  const validTitleClass = !year ? "form__input--incomplete" : "";
  const validTextClass = !month ? "form__input--incomplete" : "";

  return (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <form className="form" onSubmit={onSaveClicked}>
        <div className="form__title-row">
          <h2>New Timesheet</h2>
          <div className="form__action-buttons">
            <button className="icon-button" title="Save" disabled={!canSave}>
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="year">
          Year:
        </label>
        <input
          className={`form__input ${validTitleClass}`}
          id="year"
          name="year"
          type="text"
          autoComplete="off"
          value={year}
          onChange={onYearChange}
        />

        <label className="form__label" htmlFor="month">
          Month:
        </label>
        <input
          className={`form__input ${validTextClass}`}
          id="month"
          name="month"
          type="text"
          value={month}
          onChange={onMonthChange}
        />

        <label
          className="form__label form__checkbox-container"
          htmlFor="username"
        >
          ASSIGNED TO:
        </label>
        <select
          id="username"
          name="username"
          className="form__select"
          value={userId}
          onChange={onUserIdChange}
        >
          {options}
        </select>
      </form>
    </>
  );
};

export default NewTimesheetForm;
