import { useGetTimesheetsQuery } from "./timesheetApiSlice";
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
      <button onClick={handleDailyLogs} className="timesheet-elem">
        <h3>{timesheet.username}</h3>
        <p>
          {MONTHS[timesheet.month]} {timesheet.year}.
        </p>
        <p>Upisano {timesheet.dailyLogs?.length} dana</p>
      </button>
    );
  } else return null;
};

const memoizedTimesheet = memo(Timesheet);

export default memoizedTimesheet;
