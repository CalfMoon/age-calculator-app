const calculateTimeDifferenceInDays = function(month, day, year) {
  const inputDate = new Date(`${month}/${day}/${year}`);
  const difference = Date.now() - inputDate;
  console.log(inputDate.toDateString());
  const differenceInDays = parseInt(difference / (24*60*60*1000));
  return differenceInDays;
};

const convertHours = function() {
  const diffrenceInDays = calculateTimeDifferenceInDays(); 
};
