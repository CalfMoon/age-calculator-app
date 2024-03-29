import dayjs from "dayjs";

const submitHandel = async (e) => {
  const [inpDay, inpMonth, inpYear] = document.querySelectorAll(".form__num__block__input");
  const displayArr = document.querySelectorAll(".output__block__number");
  e.preventDefault();
  removeErrorsMessages();
  if(validCheck(inpYear.value, inpMonth.value, inpDay.value)) return null;
  const diffArr = calcAge(inpYear.value, inpMonth.value, inpDay.value);
  for(let i = 0; i<displayArr.length; i++){
    await animation(displayArr[i], diffArr[i]);
  };
};

const animation = (displayLocation, endNumber) => {
  const interval = 300;
  let startNumber = 0;
  const duration = Math.floor(interval / endNumber);
  let counter = setInterval(() => {
    displayLocation.textContent = startNumber;
    if (startNumber === endNumber) clearInterval(counter);
    startNumber++;
  }, duration);
// wait for previous output to be counted before starting another one
  return new Promise((resolve) => setTimeout(resolve, interval));
};

const calcAge = (birthYear, birthMonth, birthDate) => {
  const birthFullDate = dayjs(`${birthYear}-${birthMonth}-${birthDate}`);

  const today = dayjs();
  const diffYear = today.diff(birthFullDate, "y");
  const diffMonth = today.diff(birthFullDate, "M") - 12 * diffYear;
  // x is the value that is used to count number backwards when birthday is after today eg going from 15 to 30 to again 5
  const x = birthDate <= today.date() ? 0 : today.daysInMonth();
  const diffDate =  x + today.date() - birthDate;
  
  return [diffYear, diffMonth, diffDate];
};

const validCheck = (birthYear, birthMonth, birthDate) => {
  const inpBoxArr = document.querySelectorAll(".form__num__block__input");
  const labelArr = document.querySelectorAll(".form__num__block__label");
  const errorArr = document.querySelectorAll(".form__num__block__error");
  const [errorDay, errorMonth, errorYear] = errorArr;
  const displayArr = document.querySelectorAll(".output__block__number");

  const birthFullDate = dayjs(`${birthYear}-${birthMonth}-${birthDate}`);

  let wrong = false;
  const dateArr = [birthDate, birthMonth, birthYear];
  for(let i = 0; i<dateArr.length; i++){
    // empty input field
    if(dateArr[i] === "") {
      errorArr[i].textContent = "This field is required";
      wrong = true;
    };
  };

  console.log();

  if (birthDate > dayjs(`${birthYear}-${birthMonth}`).daysInMonth() || birthDate === "0") {
    // day doesn't exist
    errorDay.textContent = "Must be a valid day";
    wrong = true;
  }

  if (birthMonth > 12 || birthMonth === "0"){
    // month doesn't exist
    errorMonth.textContent = "Must be a valid month";
    wrong = true;
  };

  if(dayjs().diff(birthFullDate)<0){
    // day in the future
    errorYear.textContent = "Must be in the past";
    wrong = true;
  };

  if(wrong){
    for(let i = 0; i < inpBoxArr.length; i++){
      inpBoxArr[i].style.borderColor = "var(--light-red)";
      labelArr[i].style.color = "var(--light-red)";

      displayArr[i].textContent = "--";
    };
  };
  return wrong;
};


const removeErrorsMessages = () => {
  const inpBoxArr = document.querySelectorAll(".form__num__block__input");
  const labelArr = document.querySelectorAll(".form__num__block__label");
  const errorArr = document.querySelectorAll(".form__num__block__error");

  for(let i = 0; i<inpBoxArr.length; i++) {
    inpBoxArr[i].style.borderColor = "var(--light-grey)";
    labelArr[i].style.color = "var(--smokey-grey)";
    errorArr[i].textContent = "";
  };
};

document.querySelector("form").addEventListener("submit", submitHandel);
