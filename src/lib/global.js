export const booleanOppositive = (value) => {
  return value === 0 ? 1 : 0;
};


export const formatDate = (now) => {
  // Step 2: Create a Date object from the timestamp
  const currentDate = new Date(now);

  // Step 3: Extract the day, month, and year
  const day = currentDate.getDate(); // Day of the month
  let month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
  const year = currentDate.getFullYear(); // Full year (e.g., 2024)

  // Step 4: Ensure month is in 'MM' format (e.g., 09 for September)
  month = month < 10 ? `0${month}` : month;

  // Format the date as 'DD/MM/YYYY'
  const formattedDate = `${day}/${month}/${year}`;
};

export const transformSecondsToClock = (seconds) => {
  let minutes = seconds / 60;
  const segundos = seconds % 60;
  minutes = parseInt(minutes.toString(), 10);
  const secondsMask = segundos < 10 ? `0${segundos}` : segundos;
  const minutesMask = minutes < 10 ? `0${minutes}` : minutes;
  return `${minutesMask}:${secondsMask}`;
};