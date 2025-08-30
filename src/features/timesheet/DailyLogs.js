import { useParams } from "react-router-dom";
import {
  useGetTimesheetsQuery,
  useGetDailyLogsQuery,
} from "./timesheetApiSlice";
import DailyLogsList from "./DailyLogsList";
import { MONTHS } from "../../config/months";

const DailyLogs = () => {
  const { id: timesheetId } = useParams();

  const { timesheet } = useGetTimesheetsQuery("timesheetsList", {
    selectFromResult: ({ data }) => ({
      timesheet: data?.ids
        .map((id) => data.entities[id])
        .find((ts) => ts.id === timesheetId),
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

  if (isLoading) return <p>Loading...</p>;
  if (!timesheet) return <p>Timesheet not found</p>;

  return (
    <div>
      <h2>
        Mjesec {MONTHS[timesheet.month - 1]} {timesheet.year}
      </h2>
      <DailyLogsList dailyLogs={dailyLogs} />
    </div>
  );
};

export default DailyLogs;
