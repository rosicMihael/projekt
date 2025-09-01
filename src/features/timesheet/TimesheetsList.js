import { useGetTimesheetsQuery } from "./timesheetApiSlice";
import PulseLoader from "react-spinners/PulseLoader";
import Timesheet from "./Timesheet";
import useTitle from "../../hooks/useTitle";
import useAuth from "../../hooks/useAuth";

const TimesheetsList = () => {
  useTitle("Rasporedi");

  const { username, isManager, isAdmin } = useAuth();

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
    const { ids, entities } = timesheets;

    let filteredIds;
    if (isManager || isAdmin) {
      filteredIds = [...ids];
    } else {
      filteredIds = ids.filter(
        (timesheetId) => entities[timesheetId].username === username
      );
    }

    const tableContent =
      ids?.length &&
      filteredIds.map((timesheetId) => (
        <Timesheet key={timesheetId} timesheetId={timesheetId} />
      ));

    content = (
      <table className="table__timesheet table--users">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th user__username">
              Korisnik:
            </th>
            <th scope="col" className="table__th user__roles">
              Godina:
            </th>
            <th scope="col" className="table__th user__edit">
              Mjesec:
            </th>
            <th scope="col" className="table__th user__edit">
              Raspored:
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
