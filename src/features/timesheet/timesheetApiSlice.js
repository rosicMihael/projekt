import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const timesheetAdapter = createEntityAdapter({});

const initialState = timesheetAdapter.getInitialState();

export const timesheetApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTimesheets: builder.query({
      query: () => ({
        url: "/timesheets",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedTimesheets = responseData.map((timesheet) => {
          timesheet.id = timesheet._id;
          return timesheet;
        });
        return timesheetAdapter.setAll(initialState, loadedTimesheets);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Timesheet", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Timesheet", id })),
          ];
        } else return [{ type: "Timesheet", id: "LIST" }];
      },
    }),
    addNewTimesheet: builder.mutation({
      query: (initialTimesheetData) => ({
        url: "/timesheets",
        method: "POST",
        body: {
          ...initialTimesheetData,
        },
      }),
      invalidatesTags: [{ type: "Timesheet", id: "LIST" }],
    }),
    deleteTimesheet: builder.mutation({
      query: ({ timesheetId }) => ({
        url: `/timesheets/${timesheetId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Timesheet", id: arg.id },
      ],
    }),
    getDailyLogs: builder.query({
      query: (timesheetId) => `/timesheets/${timesheetId}/logs`,
      providesTags: (result, error, timesheetId) => [
        { type: "Timesheet", id: timesheetId },
      ],
    }),
    addNewDailyLog: builder.mutation({
      query: ({ timesheetId, from, to, hourlyPay, date }) => ({
        url: `/timesheets/${timesheetId}/logs/new`,
        method: "POST",
        body: {
          from,
          to,
          hourlyPay,
          date,
        },
      }),
      invalidatesTags: (result, error, args) => [
        { type: "Timesheet", id: args.timesheetId },
      ],
    }),
    /*updateDailyLog: builder.mutation({
      query: ({ timesheetId, logId, dailyLog }) => ({
        url: `/timesheets/${timesheetId}`,
        method: "PATCH",
        body: dailyLog,
      }),
      invalidatesTags: (result, error, { timesheetId }) => [
        { type: "Timesheet", id: timesheetId },
      ],
    }),*/
  }),
});

export const {
  useGetTimesheetsQuery,
  useAddNewTimesheetMutation,
  useDeleteTimesheetMutation,
  useGetDailyLogsQuery,
  useAddNewDailyLogMutation,
} = timesheetApiSlice;

// returns the query result object
export const selectTimesheetsResult =
  timesheetApiSlice.endpoints.getTimesheets.select();

// creates memoized selector
const selectTimesheetsData = createSelector(
  selectTimesheetsResult,
  (timesheetsResult) => timesheetsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllTimesheets,
  selectById: selectTimesheetById,
  selectIds: selectTimesheetIds,
  // Pass in a selector that returns the users slice of state
} = timesheetAdapter.getSelectors(
  (state) => selectTimesheetsData(state) ?? initialState
);
