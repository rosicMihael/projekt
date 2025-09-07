import { store } from "../../app/store";
import { usersApiSlice } from "../users/usersApiSlice";
import { notesApiSlice } from "../notes/notesApiSlice";
import { timesheetApiSlice } from "../timesheet/timesheetApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    store.dispatch(
      notesApiSlice.util.prefetch("getNotes", "notesList", { force: true })
    );
    store.dispatch(
      usersApiSlice.util.prefetch("getUsers", "usersList", { force: true })
    );
    store.dispatch(
      timesheetApiSlice.util.prefetch("getTimesheets", "timesheetsList", {
        force: true,
      })
    );
  }, []);

  return <Outlet />;
};

export default Prefetch;
