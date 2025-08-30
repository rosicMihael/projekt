import { useGetTimesheetsQuery } from "./timesheetApiSlice";
import { useDeleteTimesheetMutation } from "./timesheetApiSlice";
import { useEffect } from "react";
import { faCalendarTimes, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MONTHS } from "../../config/months";
import { useNavigate } from "react-router-dom";
import { memo } from "react";

const Timesheet = ({ timesheetId }) => {
  const { timesheet } = useGetTimesheetsQuery("timesheetsList", {
    selectFromResult: ({ data }) => ({
      timesheet: data?.entities[timesheetId],
    }),
  });

  const [deleteTimesheet, { isSuccess, isError, error }] =
    useDeleteTimesheetMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) navigate("/dash/timesheets");
  }, [isSuccess, navigate]);

  if (timesheet) {
    const handleDailyLogs = () =>
      navigate(`/dash/timesheets/${timesheetId}/dailyLogs`);

    const onDeleteClicked = async () => {
      await deleteTimesheet({ id: timesheetId });
    };

    return (
      <tr className="table__row user">
        <td className="table__cell">{timesheet.username}</td>
        <td className="table__cell">{timesheet.year}</td>
        <td className="table__cell">{MONTHS[timesheet.month]}</td>
        <td className="table__cell">
          <button
            className="icon-button table__button"
            onClick={handleDailyLogs}
          >
            <FontAwesomeIcon icon={faCalendarTimes} />
          </button>
        </td>
        <td className="table__cell">
          <button
            className="icon-button table__button"
            onClick={onDeleteClicked}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
          {isError && <span className="errmsg">{error?.data?.message}</span>}
        </td>
      </tr>
    );
  } else return null;
};

const memoizedTimesheet = memo(Timesheet);

export default memoizedTimesheet;
