import dayjs from "dayjs";

const [inpDay, inpMonth, inpYear] = document.querySelectorAll(".form__num__block__input");
const displayArr = document.querySelectorAll(".output__block__number");


const main = () => {
  removeErrorsMessages();
  const diffArr = calcAge(inpYear.value, inpMonth.value, inpDay.value);
  for(let i = 0; i<displayArr.length; i++){
    displayArr[i].innerHTML = diffArr[i];
  };
};

const calcAge = (birthYear, birthMonth, birthDate) => {
  if(validCheck(birthYear, birthMonth, birthDate)) return null;

  const birthFullDate = dayjs(`${birthYear}-${birthMonth}-${birthDate}`);

  const today = dayjs();
  const diffYear = today.diff(birthFullDate, "y");
  const diffMonth = today.diff(birthFullDate, "M") - 12 * diffYear;
  // x is the value that is used to count number backwards when birthday is after today eg going from 15 to 30 to again 5
  const x = birthDate <= today.date() ? 0 : today.daysInMonth();
  const diffDate =  x + today.date() - birthDate;
  
  return [diffYear, diffMonth, diffDate];
};

const inpBoxArr = document.querySelectorAll(".form__num__block__input");
const labelArr = document.querySelectorAll(".form__num__block__label");
const errorArr = document.querySelectorAll(".form__num__block__error");
const [errorDay, errorMonth, errorYear] = errorArr;

const validCheck = (birthYear, birthMonth, birthDate) => {
  const birthFullDate = dayjs(`${birthYear}-${birthMonth}-${birthDate}`);

  let wrong = false;
  const dateArr = [birthDate, birthMonth, birthYear];
  for(let i = 0; i<dateArr.length; i++){
    // empty input field
    if(dateArr[i] === "") {
      console.log(dateArr);
      errorArr[i].innerHTML = "This field is required";
      wrong = true;
    };
  };

  if (birthDate > birthFullDate.daysInMonth() || birthDate === "0") {
    // day doesn't exist
    errorDay.innerHTML = "Must be a valid day";
    wrong = true;
  }

  if (birthMonth > 12 || birthMonth === "0"){
    // month doesn't exist
    errorMonth.innerHTML = "Must be a valid month";
    wrong = true;
  };

  if(dayjs().diff(birthFullDate)<0){
    // day in the future
    errorYear.innerHTML = "Must be in the past";
    wrong = true;
  };

  if(wrong){
    for(let i = 0; i < inpBoxArr.length; i++){
      inpBoxArr[i].style.borderColor = "var(--light-red)";
      labelArr[i].style.color = "var(--light-red)";

      displayArr[i].innerHTML = "--";
    };
  };
  return wrong;
};


const removeErrorsMessages = () => {
  for(let i = 0; i<inpBoxArr.length; i++) {
    inpBoxArr[i].style.borderColor = "var(--light-grey)";
    labelArr[i].style.color = "var(--smokey-grey)";
    errorArr[i].innerHTML = "";
  };
};

document.querySelector(".form__submit__button").addEventListener("click", main);
