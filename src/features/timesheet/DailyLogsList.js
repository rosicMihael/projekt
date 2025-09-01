const DailyLogsList = ({ dailyLogs }) => {
  return (
    <ul>
      {dailyLogs.map((log) => (
        <li key={log._id}>
          Dan {log.date}: od {log.from} do {log.to} -&gt;
          {`\t${log.earnings.toFixed(2)}`}€
        </li>
      ))}
    </ul>
  );
};

export default DailyLogsList;
