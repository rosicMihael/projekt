const DailyLogsList = ({ dailyLogs }) => {
  return (
    <ul>
      {dailyLogs.map((log) => (
        <li key={log._id}>
          Dan {log.day}: {log.from} - {log.to} -&gt;
          {`\t${log.earnings.toFixed(2)}`}€
        </li>
      ))}
    </ul>
  );
};

export default DailyLogsList;
