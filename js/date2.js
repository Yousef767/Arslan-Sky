// 資料
let state2 = null;
let options2 = { year: "numeric", month: "long" }; // 轉換月份為英文
let calendar_date2 = document.querySelector("#calendar_date2");
let calendar_month2 = document.querySelector("#calendar_month2");
let calendar_year2 = document.querySelector("#calendar_year2");
let datepickerInput2 = document.querySelector("#datepickerInput2");
datepickerInput2.addEventListener("focus", (event) => {
  event.preventDefault();
  datepickerInput2.blur();
});

// 初始化Calendar
function init2() {
  state2 = {
    current: new Date(),
  };
  render2();
}
function preMonth2() {
  state2.current.setMonth(state2.current.getMonth() - 1);
  render2();
}
function nextMonth2() {
  state2.current.setMonth(state2.current.getMonth() + 1);
  render2();
}
function preYear2() {
  state2.current.setYear2(state2.current.getFullYear() - 1);
  render2();
}
function nextYear2() {
  state2.current.setYear2(state2.current.getFullYear() + 1);
  render2();
}
function preYears2() {
  state2.current.setYear2(state2.current.getFullYear() - 10);
  render2();
}
function nextYears2() {
  state2.current.setYear2(state2.current.getFullYear() + 10);
  render2();
}
function showMonth2() {
  calendar_month2.className = "calendar";
  calendar_date2.className = "d-none";
}
function showYear2() {
  calendar_year2.className = "calendar";
  calendar_month2.className = "d-none";
}
function renderWeek2() {
  let week2 = document.querySelector("#week2");

  cal_days_labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  for (var i = 0; i <= 6; i++) {
    week2.innerHTML += '<div class="day">' + cal_days_labels[i] + "</div>";
  }
}
renderWeek2();
// 根據資料產生畫面
function render2() {
  let head = document.querySelector("#year-month2");
  head.textContent = new Intl.DateTimeFormat("en-US", options2).format(
    state2.current
  );
  // head.textContent = state2.current.getFullYear() + " / " + (state2.current.getMonth()+1);
  let list2 = document.querySelector("#list2");
  list2.innerHTML = ""; // 清空畫面

  // 取得這個月的第一天
  let firstDate2 = new Date(
    state2.current.getFullYear(),
    state2.current.getMonth(),
    1
  );
  // 往前算到星期日
  let date2 = new Date(firstDate2.getFullYear(), firstDate2.getMonth(), 1);
  date2.setDate(date2.getDate() - date2.getDay());
  // 畫出上個月的後幾天
  while (date2 < firstDate2) {
    renderDate2(date2, list2);
    date2.setDate(date2.getDate() + 1);
  }
  // 畫出這個月的日期
  while (date2.getMonth() === state2.current.getMonth()) {
    // 畫出一天的格子
    renderDate2(date2, list2);
    // 日期+1
    date2.setDate(date2.getDate() + 1);
  }
  // 畫出下個月的前幾天
  while (date2.getDay() > 0) {
    renderDate2(date2, list2);
    date2.setDate(date2.getDate() + 1);
  }

  // 產生月份
  let year = document.querySelector("#year");
  year.textContent = state2.current.getFullYear();
  let monlist = document.querySelector("#monlist");
  monlist.innerHTML = "";
  let mon = state2.current.getMonth() + 1;
  renderMonth2(mon, monlist);

  // 產生年
  let years = document.querySelector("#years");
  let currentYear = state2.current.getFullYear();
  let order = currentYear % 10;
  let recentYear = currentYear - (order + 1);
  years.textContent = recentYear + " - " + (recentYear + 11);
  let yearlist = document.querySelector("#yearlist");
  yearlist.innerHTML = "";
  renderYears2(years, yearlist);
}
function renderDate2(date, list) {
  let cell = document.createElement("button");
  cell.className =
    "date" + (date.getMonth() === state2.current.getMonth() ? "" : " fadeout");
  cell.setAttribute("onmousedown", "selectDate2(this)");
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (month < 10 && day < 10) {
    month = "0" + month;
    day = "0" + day;
  } else if (month < 10) {
    month = "0" + month;
  } else if (day < 10) {
    day = "0" + day;
  }
  cell.setAttribute("value", date.getFullYear() + "-" + month + "-" + day);
  cell.textContent = date.getDate();
  list.appendChild(cell);
}
function renderMonth2(mon, monlist) {
  months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  for (var i = 0; i <= 11; i++) {
    monlist.innerHTML +=
      '<button class="mon" onclick="selectMonth(this);" value="' +
      [i] +
      '">' +
      months[i] +
      "</button>";
  }
}
function renderYears2(years, yearlist) {
  let currentYear = state2.current.getFullYear();
  let order = currentYear % 10;
  let recentYear = currentYear - (order + 1);

  for (var i = 0; i < 12; i++) {
    yearlist.innerHTML +=
      '<button class="mon" onclick="selectYear(this);" value="' +
      (recentYear + i) +
      '">' +
      (recentYear + i) +
      "</button>";
  }
}

// show Calendar
// datepickerInput2.addEventListener('focus', (event) => {
//     showCalendar();
// });

function showCalendar2() {
  let today = new Date();
  let todayDate =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  calendar_date2.className = "calendar";

  let els = document.getElementsByClassName("date");
  for (let i = 0; i < els.length; i++) {
    if (datepickerInput2.value == els[i].value) {
      els[i].classList.add("active");
    } else {
      els[i].classList.remove("active");
    }
    if (todayDate == els[i].value) {
      els[i].classList.add("today");
    }
  }
}
function hideCalendar2() {
  calendar_date2.className = "d-none";
}

function toggleCalendar2() {
  if (calendar_date2.className === "d-none") {
    showCalendar2();
  } else {
    hideCalendar2();
  }
}

function selectDate2(o) {
  datepickerInput2.value = o.value;
  calendar_date2.className = "d-none";
}
function selectMonth2(o) {
  state2.current.setMonth(o.value);
  render2();
  calendar_month2.className = "d-none";
  calendar_date2.className = "calendar";
}

function selectYear2(o) {
  state2.current.setYear2(o.value);
  render2();
  calendar_year2.className = "d-none";
  calendar_month2.className = "calendar";
}

function checkDate2(o) {
  let dateVal = o.value;
  let dateYear = dateVal.substr(0, 4);

  if (dateVal.length == 8) {
    let dateMonth = dateVal.substr(4, 2);
    let dateDay = dateVal.substr(6, 2);
    if (dateDay > 31) {
      clearInput2();
    } else {
      dateVal = dateYear + "-" + dateMonth + "-" + dateDay;
      o.value = dateVal;
      renderCalendar2();
    }
  } else if (dateVal.length == 7) {
    let dateMonth = dateVal.substr(4, 1);
    let dateDay = dateVal.substr(5, 2);
    if (dateDay > 31) {
      clearInput2();
    } else {
      dateVal = dateYear + "-0" + dateMonth + "-" + dateDay;
      o.value = dateVal;
      renderCalendar2();
    }
  }
  function clearInput2() {
    o.focus();
    o.value = "";
  }
  function renderCalendar2() {
    let innerText = new Date(datepickerInput2.value);
    state2.current = innerText;
    hideCalendar2();
    render2();
  }
}

// 處理流程
init2();
