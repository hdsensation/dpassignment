const commentPostedTime = (timeInMileSec) => {
  const sec = (timeInMileSec / 1000).toFixed(0);
  const min = (timeInMileSec / (1000 * 60)).toFixed(0);
  const hrs = (timeInMileSec / (1000 * 60 * 60)).toFixed(0);
  const days = (timeInMileSec / (1000 * 60 * 60 * 24)).toFixed(0);
  const weeks = (timeInMileSec / (1000 * 60 * 60 * 24 * 7)).toFixed(0);
  const months = (timeInMileSec / (1000 * 60 * 60 * 24 * 31)).toFixed(0);
  const years = (timeInMileSec / (1000 * 60 * 60 * 24 * 365.25)).toFixed(0);
  if (sec < 60) {
    return "seconds";
  }
  if (min < 60) {
    return `${min} mins`;
  }
  if (hrs < 24) {
    return `${hrs} hrs`;
  }
  if (days < 7) {
    return `${days} days`;
  }
  if (weeks < 4) {
    return `${weeks} weeks`;
  }
  if (months < 12) {
    return `${months} months`;
  }
  return `${years} year`;
};

export default commentPostedTime;
