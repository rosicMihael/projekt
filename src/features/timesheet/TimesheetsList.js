import { useGetTimesheetsQuery } from "./timesheetApiSlice";
import PulseLoader from "react-spinners/PulseLoader";
import Timesheet from "./Timesheet";
import useTitle from "../../hooks/useTitle";

const TimesheetsList = () => {
  useTitle("Rasporedi");

  const {
    data: timesheets,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTimesheetsQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading)
    content = (
      <p className="loader">
        <PulseLoader color="#FFF" />
      </p>
    );

  if (isError) {
    content = (
      <p className={isError ? "errmsg" : "offscreen"}>{error?.data?.message}</p>
    );
  }

  if (isSuccess) {
    const { ids } = timesheets;

    const tableContent =
      ids?.length &&
      ids.map((timesheetId) => (
        <Timesheet key={timesheetId} timesheetId={timesheetId} />
      ));

    content = (
      <section>
        <h2>Dostupni Popisi Sati:</h2>
        <div className="timesheet-list">{tableContent}</div>
      </section>
    );
  }

  return content;
};

export default TimesheetsList;
