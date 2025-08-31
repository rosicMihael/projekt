import { useGetTimesheetsQuery } from "./timesheetApiSlice";
import PulseLoader from "react-spinners/PulseLoader";
import Timesheet from "./Timesheet";
import useTitle from "../../hooks/useTitle";

const TimesheetsList = () => {
  useTitle("Timesheets");

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

    const tableContent = ids?.length
      ? ids.map((timesheetId) => (
          <Timesheet key={timesheetId} timesheetId={timesheetId} />
        ))
      : null;

    content = (
      <table className="table__timesheet table--users">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th user__username">
              Korisničko ime:
            </th>
            <th scope="col" className="table__th user__roles">
              Godina:
            </th>
            <th scope="col" className="table__th user__edit">
              Mjesec:
            </th>
            <th scope="col" className="table__th user__edit">
              Radni dani:
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content;
};

export default TimesheetsList;
