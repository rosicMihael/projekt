import { useParams } from "react-router-dom";
import { useAddNewDailyLogMutation } from "./timesheetApiSlice";
import { useNavigate } from "react-router-dom";
import useTitle from "../../hooks/useTitle";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

const NewDailyLogForm = () => {
  useTitle("Radni dan");

  const { id: timesheetId } = useParams();

  const [addNewDailyLog, { isLoading, isSuccess, isError, error }] =
    useAddNewDailyLogMutation();

  const navigate = useNavigate();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [hourlyPay, setHourlyPay] = useState("");

  const today = new Date();
  const date = today.getDate();

  useEffect(() => {
    if (isSuccess) {
      setFrom("");
      setTo("");
      setHourlyPay("");
      navigate(`/dash/timesheets/${timesheetId}/logs`);
    }
  }, [isSuccess, navigate, timesheetId]);

  const onFromChange = (e) => setFrom(e.target.value);
  const onToChange = (e) => setTo(e.target.value);
  const onHourlyPayChange = (e) => setHourlyPay(e.target.value);

  const canSave =
    [timesheetId, from, to, hourlyPay, date].every(Boolean) && !isLoading;

  const onSaveClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewDailyLog({ timesheetId, from, to, hourlyPay, date });
      console.log({ timesheetId, from, to, hourlyPay, date });
    }
  };

  const errClass = isError ? "errmsg" : "offscreen";
  const validFromClass = !from ? "form__input--incomplete" : "";
  const validToClass = !to ? "form__input--incomplete" : "";
  const validHourlyPayClass = !hourlyPay ? "form__input--incomplete" : "";

  return (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <form className="form" onSubmit={onSaveClicked}>
        <div className="form__title-row">
          <h2>Novi Radni Dan</h2>
          <div className="form__action-buttons">
            <button className="icon-button" title="Save" disabled={!canSave}>
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="from">
          Radi od:
        </label>
        <input
          className={`form__input ${validFromClass}`}
          id="from"
          name="from"
          type="text"
          autoComplete="off"
          value={from}
          onChange={onFromChange}
        />

        <label className="form__label" htmlFor="to">
          Radi do:
        </label>
        <input
          className={`form__input ${validToClass}`}
          id="to"
          name="to"
          type="to"
          value={to}
          onChange={onToChange}
        />

        <label className="form__label" htmlFor="hourlyPay">
          Satnica:
        </label>
        <input
          id="hourlyPay"
          name="hourlyPay"
          className={`form__input ${validHourlyPayClass}`}
          value={hourlyPay}
          onChange={onHourlyPayChange}
        />
      </form>
    </>
  );
};

export default NewDailyLogForm;
