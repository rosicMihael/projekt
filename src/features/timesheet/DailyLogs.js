import { useParams, useNavigate } from "react-router-dom";
import {
  useGetTimesheetsQuery,
  useGetDailyLogsQuery,
} from "./timesheetApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";
import PulseLoader from "react-spinners/PulseLoader";
import DailyLogsList from "./DailyLogsList";
import { MONTHS } from "../../config/months";
import useTitle from "../../hooks/useTitle";

const DailyLogs = () => {
  useTitle("Radni dani");

  const { id: timesheetId } = useParams();

  const navigate = useNavigate();

  const { timesheet } = useGetTimesheetsQuery("timesheetsList", {
    selectFromResult: ({ data }) => ({
      timesheet: data?.entities[timesheetId],
    }),
  });

  const { data: dailyLogs = [], isLoading } = useGetDailyLogsQuery(
    timesheetId,
    {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );

  function sortByDay(logs) {
    return [...logs].sort((a, b) => {
      const dayA = parseInt(a.date.split(".")[0]);
      const dayB = parseInt(b.date.split(".")[0]);
      return dayA - dayB;
    });
  }

  function formatHour(hourString) {
    const [hour, minutes] = hourString.split(":");
    const hourNum = parseInt(hour);
    const minutesNum = parseInt(minutes) / 60;
    return hourNum + minutesNum;
  }

  let sum = 0;
  dailyLogs.forEach((log) => {
    sum += log.earnings;
  });

  let hourSum = 0;
  dailyLogs.forEach((log) => {
    const dif = formatHour(log.to) - formatHour(log.from);
    hourSum += dif;
  });

  const sortedLogs = sortByDay(dailyLogs);

  if (isLoading)
    return (
      <p className="loader">
        <PulseLoader color="#FFF" />
      </p>
    );

  const onNewLogClicked = () => {
    navigate(`/dash/timesheets/${timesheetId}/logs/new`);
  };

  if (!timesheet)
    return (
      <p className="loader">
        <PulseLoader color="#FFF" />
      </p>
    );

  return (
    <div>
      <nav className="logs-nav">
        <h2>
          {timesheet.username}, {MONTHS[timesheet.month]} {timesheet.year}.
        </h2>
        <div className="logs-buttons">
          <button className="icon-button" onClick={onNewLogClicked}>
            <FontAwesomeIcon icon={faPenSquare} />
          </button>
        </div>
      </nav>
      <div className="logs">
        <DailyLogsList dailyLogs={sortedLogs} />
      </div>
      <div className="logs-sum">
        Sveukupno: {sum}€ {`(${hourSum} h)`}
      </div>
    </div>
  );
};

export default DailyLogs;
