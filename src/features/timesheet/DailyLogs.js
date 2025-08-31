import { useParams, useNavigate } from "react-router-dom";
import {
  useGetTimesheetsQuery,
  useGetDailyLogsQuery,
  useDeleteTimesheetMutation,
} from "./timesheetApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenSquare } from "@fortawesome/free-solid-svg-icons";
import PulseLoader from "react-spinners/PulseLoader";
import DailyLogsList from "./DailyLogsList";
import { MONTHS } from "../../config/months";
import { useEffect } from "react";

const DailyLogs = () => {
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

  const [deleteTimesheet, { isSuccess }] = useDeleteTimesheetMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/dash/timesheets");
    }
  }, [isSuccess, navigate]);

  if (isLoading)
    return (
      <p className="loader">
        <PulseLoader color="#FFF" />
      </p>
    );

  const onDeleteClicked = async () => {
    await deleteTimesheet({ timesheetId });
  };

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
      <h2>
        Mjesec {MONTHS[timesheet.month]} {timesheet.year}.
      </h2>
      <nav className="logs-nav">
        <button className="icon-button" onClick={onNewLogClicked}>
          <FontAwesomeIcon icon={faPenSquare} />
        </button>
        <button className="icon-button" onClick={onDeleteClicked}>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </nav>
      <DailyLogsList dailyLogs={dailyLogs} />
    </div>
  );
};

export default DailyLogs;
