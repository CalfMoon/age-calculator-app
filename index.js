const calcAge = (birthYear, birthMonth, birthDay) => {
  const birth = dayjs(`${birthYear}-${birthMonth}-${birthDay}`);
  const today = dayjs();
  calculateMonthDaysTillDate(birthMonth, birthDay);

  const diffYear = today.diff(birth, "y");
  const diffMonth = today.diff(birth, "M") - 12 * diffYear;
  const diffDay = (today.diff(birth, "d") - 365.2425  * diffYear);
  
  return [diffYear, diffMonth, diffDay];
};

const calculateDaysInMonth = (month) => dayjs(`${dayjs().year()}-${month}`).daysInMonth();

const calculateMonthDaysTillDate = (birthMonth, birthDate) => {
  const currentMonth = dayjs().month()+1;
  const currentDate = dayjs().date();

  let daysBetweenMonths = 0;
  if(birthMonth<currentMonth){
    for(let i=birthMonth+1 ; i<currentMonth ; i++){
      daysBetweenMonths += calculateDaysInMonth(i);
    };
  } else if (currentMonth<birthMonth){
    for(let i = birthMonth+1; i < currentMonth+12; i++){
      const x = i <= 12 ? 0 : 12;
      daysBetweenMonths += calculateDaysInMonth(i-x);
    };
  };
  console.log(daysBetweenMonths);
};
