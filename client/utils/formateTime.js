const formatTime = (time) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time - hours * 3600) / 60);
  const seconds = time % 60;
  let temptimeSpend = `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }:${seconds < 10 ? "0" + seconds : seconds}`;

  temptimeSpend = temptimeSpend.split(":");

  const timeStudied = {
    hr: parseInt(temptimeSpend[0]) != 0 ? +temptimeSpend[0] + " hr " : "",
    min: parseInt(temptimeSpend[1]) != 0 ? +temptimeSpend[1] + " min " : "",
    sec: parseInt(temptimeSpend[2]) != 0 ? +temptimeSpend[2] + " sec " : "",
  };

  return timeStudied;
};

export default formatTime;
