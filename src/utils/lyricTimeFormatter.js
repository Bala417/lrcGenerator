const lyricTimeFormatter = (currentTimestamp, flag) => {
  const minutes = Math.floor(currentTimestamp / 60);
  const seconds = Math.floor(currentTimestamp % 60);
  const centis = Math.round((currentTimestamp % 1) * 100);
  const lrcTime = `[${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}.${centis}] `;

  return lrcTime;
};
export default lyricTimeFormatter;
