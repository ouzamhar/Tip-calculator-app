const billInput = document.getElementById("bill-input");
const readOnly = document.querySelectorAll(".read-only");
const cstmTip = document.getElementById("custom-percntg");
const nbrPeople = document.getElementById("number-people");
const resetBtn = document.querySelector(".reset-btn");
const tipAmount = document.getElementById("tip-amount");
const total = document.getElementById("total");
billInput.addEventListener("input", getInput);
nbrPeople.addEventListener("input", getInput);
billInput.addEventListener("focusout", checkValidity);
nbrPeople.addEventListener("focusout", checkValidity);
cstmTip.addEventListener("focusout", checkCustom);
resetBtn.addEventListener("click", reset);

readOnly.forEach((elem) => elem.addEventListener("click", selectTip));

cstmTip.addEventListener("click", inputTip);
cstmTip.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/\D/g, "");
  getResult();
});

function getInput(e) {
  e.target.value = e.target.value.replace(/\D/g, "");
  if (e.target.value && Number(e.target.value) !== 0) {
    e.target.classList.remove("invalid");
    e.target.parentElement.nextElementSibling.style.visibility = "hidden";
  }
  getResult();
}

function checkValidity(event) {
  const target = event.target;
  //   if (!target.value) {
  //     target.value = "0";
  //   }
  if (target.value && Number(target.value) === 0) {
    target.classList.add("invalid");
    target.parentElement.nextElementSibling.style.visibility = "visible";
  }
}

function selectTip(e) {
  readOnly.forEach((elem) => elem.classList.remove("selected"));
  cstmTip.value = "";
  cstmTip.classList.remove("selected");
  e.target.classList.add("selected");
  selected = e.target.textcontent;
  getResult();
}

document.querySelectorAll("input").forEach((elem) => {
  elem.addEventListener("focusin", function handleClick(e) {
    const elem = e.target;
    const end = elem.value.length;
    elem.setSelectionRange(end, end);
  });
});

function inputTip(e) {
  readOnly.forEach((elem) => elem.classList.remove("selected"));
  e.target.classList.add("selected");
  getResult();
}

function checkCustom(e) {
  if (!e.target.value) {
    e.target.classList.remove("selected");
  }
}

let tipMoney;
let totalMoney;

function isValid() {
  let tip = 0;
  const selected = document.querySelector(".selected");
  let = bill = Number(billInput.value);
  let people = Number(nbrPeople.value);
  if (bill === 0 || people === 0) {
    return false;
  }
  if (!selected) {
    tip = 0;
  } else if (selected === cstmTip) {
    tip = Number(cstmTip.value);
  } else {
    tip = Number(selected.textContent.slice(0, -1));
  }

  tipMoney = (bill * tip) / (100 * people);
  totalMoney = bill / people + tipMoney;
  return true;
}

function getResult() {
  if (isValid()) {
    resetBtn.classList.add("active");
    tipAmount.textContent = tipMoney.toFixed(2);
    total.textContent = totalMoney.toFixed(2);
  } else {
    resetBtn.classList.remove("active");
    tipAmount.textContent = "0.00";
    total.textContent = "0.00";
  }
}

function reset(e) {
  if (e.target.classList.contains("active")) {
    document.querySelectorAll("input").forEach((elem) => {
      elem.value = "";
      elem.classList.remove("invalid");
      elem.parentElement.nextElementSibling.style.visibility = "hidden";
    });
    if (document.querySelector(".selected")) {
      document.querySelector(".selected").classList.remove("selected");
    }
    resetBtn.classList.remove("active");
    tipAmount.textContent = "0.00";
    total.textContent = "0.00";
  }
}

document.querySelector("body").onload = function () {
  document.querySelectorAll("input").forEach((elem) => {
    elem.value = "";
    elem.classList.remove("invalid");
    elem.parentElement.nextElementSibling.style.visibility = "hidden";
  });
  if (document.querySelector(".selected")) {
    document.querySelector(".selected").classList.remove("selected");
  }
  resetBtn.classList.remove("active");
  tipAmount.textContent = "0.00";
  total.textContent = "0.00";
};
