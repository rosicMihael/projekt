const DailyLogsList = ({ dailyLogs }) => {
  function formatHour(hourString) {
    const [hour, minutes] = hourString.split(":");
    const hourNum = parseInt(hour);
    const minutesNum = parseInt(minutes) / 60;
    return hourNum + minutesNum;
  }

  return (
    <ul>
      {dailyLogs.map((log) => (
        <li key={log._id}>
          {log.date}: {log.from} - {log.to} -&gt;
          {`\t${log.earnings.toFixed(2)}`}€{" "}
          {`(${formatHour(log.to) - formatHour(log.from)} h)`}
        </li>
      ))}
    </ul>
  );
};

export default DailyLogsList;
