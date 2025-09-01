import { useParams } from "react-router-dom";
import { useAddNewDailyLogMutation } from "./timesheetApiSlice";
import { useNavigate } from "react-router-dom";
import useTitle from "../../hooks/useTitle";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

const FROM_TO_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/;

const NewDailyLogForm = () => {
  useTitle("Radni dan");

  const { id: timesheetId } = useParams();

  const [addNewDailyLog, { isLoading, isSuccess, isError, error }] =
    useAddNewDailyLogMutation();

  const navigate = useNavigate();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [hourlyPay, setHourlyPay] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setFrom("");
      setTo("");
      setHourlyPay("");
      setDate("");
      navigate(`/dash/timesheets/${timesheetId}/logs`);
    }
  }, [isSuccess, navigate, timesheetId]);

  const onFromChange = (e) => setFrom(e.target.value);
  const onToChange = (e) => setTo(e.target.value);
  const onHourlyPayChange = (e) => setHourlyPay(e.target.value);
  const onDateChange = (e) => setDate(e.target.value);

  const validFrom = FROM_TO_REGEX.test(from);
  const validTo = FROM_TO_REGEX.test(to);

  const canSave =
    [timesheetId, validFrom, validTo, hourlyPay, date].every(Boolean) &&
    !isLoading;

  const onSaveClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewDailyLog({
        timesheetId,
        from,
        to,
        hourlyPay,
        date,
      });
      console.log({
        timesheetId,
        from,
        to,
        hourlyPay,
        date,
      });
    }
  };

  const errClass = isError ? "errmsg" : "offscreen";
  const validFromClass = !validFrom ? "form__input--incomplete" : "";
  const validToClass = !validTo ? "form__input--incomplete" : "";
  const validHourlyPayClass = !hourlyPay ? "form__input--incomplete" : "";
  const validDateClass = !date ? "form__input--incomplete" : "";

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
        <label htmlFor="date" className="form__label">
          Izaberite datum:
        </label>
        <input
          className={`form__input ${validDateClass}`}
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={onDateChange}
        />
        <label className="form__label" htmlFor="from">
          Radi od: <span className="nowrap">[format: hh:mm, npr. 14:30]</span>
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
          Radi do: <span className="nowrap">[format: hh:mm, npr. 16:00]</span>
        </label>
        <input
          className={`form__input ${validToClass}`}
          id="to"
          name="to"
          type="text"
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
