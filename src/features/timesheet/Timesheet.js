import { useGetTimesheetsQuery } from "./timesheetApiSlice";
import { faCalendarTimes } from "@fortawesome/free-solid-svg-icons";
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

  const navigate = useNavigate();

  if (timesheet) {
    const handleDailyLogs = () =>
      navigate(`/dash/timesheets/${timesheetId}/logs`);

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
      </tr>
    );
  } else return null;
};

const memoizedTimesheet = memo(Timesheet);

export default memoizedTimesheet;
