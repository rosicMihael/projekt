import {
  useGetTimesheetsQuery,
  useDeleteTimesheetMutation,
} from "./timesheetApiSlice";
import { MONTHS } from "../../config/months";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";

const Timesheet = ({ timesheetId }) => {
  const navigate = useNavigate();

  const [isDelPressed, setIsDelPressed] = useState(false);

  const { timesheet } = useGetTimesheetsQuery("timesheetsList", {
    selectFromResult: ({ data }) => ({
      timesheet: data?.entities[timesheetId],
    }),
  });

  const [deleteTimesheet, { isSuccess }] = useDeleteTimesheetMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/dash/timesheets");
    }
  }, [isSuccess, navigate]);

  if (timesheet) {
    const handleDailyLogs = () =>
      navigate(`/dash/timesheets/${timesheetId}/logs`);

    const onDeleteClicked = () => {
      setIsDelPressed(true);
    };

    const onNoClicked = () => {
      setIsDelPressed(false);
    };

    const onYesClicked = async () => {
      await deleteTimesheet({ timesheetId });
    };

    return (
      <>
        <div className={`del-choice-${isDelPressed ? "active" : "inactive"}`}>
          <p>
            Želite li stvarno izbrisati <br /> ovaj popis?
          </p>
          <div className="del-choice-buttons">
            <button className="no" onClick={onNoClicked}>
              Ne
            </button>
            <button className="yes" onClick={onYesClicked}>
              Da
            </button>
          </div>
        </div>
        <div className="timesheet-elem">
          <button onClick={handleDailyLogs} className="timesheet-button">
            <h3>{timesheet.username}</h3>
            <p>
              {MONTHS[timesheet.month]} {timesheet.year}.
            </p>
            <p>Upisano {timesheet.dailyLogs?.length} dana</p>
          </button>
          <button className="del-button" onClick={onDeleteClicked}>
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
      </>
    );
  } else return null;
};

const memoizedTimesheet = memo(Timesheet);

export default memoizedTimesheet;
