// 資料
let state = null;
let options = {  year: 'numeric', month: 'long' } // 轉換月份為英文
let calendar_date = document.querySelector("#calendar_date");
let calendar_month = document.querySelector("#calendar_month");
let calendar_year = document.querySelector("#calendar_year");
let datepickerInput = document.querySelector("#datepickerInput");
datepickerInput.addEventListener("focus", (event) => {
  event.preventDefault();
  datepickerInput.blur();
});

calendar_date.addEventListener('onmouseover',()=>{
  calendar_date.className = 'd-none'
})
// 初始化Calendar
function init() {
    state = {
        current: new Date()
    };
    render();
}
function preMonth() {
    state.current.setMonth(state.current.getMonth()-1);
    render();
}
function nextMonth() {
    state.current.setMonth(state.current.getMonth()+1);
    render();
}
function preYear() {
    state.current.setYear(state.current.getFullYear()-1);
    render();
}
function nextYear() {
    state.current.setYear(state.current.getFullYear()+1);
    render();
}
function preYears() {
    state.current.setYear(state.current.getFullYear()-10);
    render();
}
function nextYears() {
    state.current.setYear(state.current.getFullYear()+10);
    render();
}
function showMonth() {
    calendar_month.className = 'calendar';
    calendar_date.className = 'd-none'
}
function showYear() {
    calendar_year.className = 'calendar';
    calendar_month.className = 'd-none'
}
function renderWeek() {
    let week = document.querySelector("#week");

    cal_days_labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (var i = 0; i <= 6; i++) {
        week.innerHTML += '<div class="day">'+ cal_days_labels[i] + '</div>';
    }
}
renderWeek();
// 根據資料產生畫面
function render() {
    let head = document.querySelector("#year-month");
    head.textContent = new Intl.DateTimeFormat('en-US', options).format(state.current);            
    // head.textContent = state.current.getFullYear() + " / " + (state.current.getMonth()+1);
    let list = document.querySelector("#list");
    list.innerHTML = ""; // 清空畫面

    // 取得這個月的第一天
    let firstDate = new Date(state.current.getFullYear(), state.current.getMonth(), 1);
    // 往前算到星期日
    let date = new Date(firstDate.getFullYear(), firstDate.getMonth(), 1);
    date.setDate(date.getDate() - date.getDay());
    // 畫出上個月的後幾天
    while( date < firstDate ){
        renderDate(date, list);
        date.setDate(date.getDate()+1);
    }
    // 畫出這個月的日期
    while( date.getMonth() === state.current.getMonth() ){
        // 畫出一天的格子
        renderDate(date, list);
        // 日期+1
        date.setDate(date.getDate()+1);
    }
    // 畫出下個月的前幾天
    while( date.getDay() > 0 ){
        renderDate(date, list);
        date.setDate(date.getDate()+1);
    }

    // 產生月份
    let year = document.querySelector("#year");
    year.textContent = state.current.getFullYear();
    let monlist = document.querySelector("#monlist");
    monlist.innerHTML = "";
    let mon = (state.current.getMonth()+1);
    renderMonth(mon, monlist);

    // 產生年
    let years = document.querySelector("#years");
    let currentYear = state.current.getFullYear();
    let order = currentYear % 10;
    let recentYear = currentYear - (order+1);
    years.textContent = ( recentYear +  " - " + (recentYear + 11) );
    let yearlist = document.querySelector("#yearlist");
    yearlist.innerHTML = "";            
    renderYears(years, yearlist);
}
function renderDate(date, list) {
    let cell = document.createElement("button");
    cell.className = "date" + (date.getMonth() === state.current.getMonth() ? "" : " fadeout");
    cell.setAttribute("onmousedown", "selectDate(this)");
    let month = (date.getMonth()+1);
    let day = date.getDate();
    if( month < 10 && day < 10 ) {
        month = '0' + month;
        day = '0' + day;
    }else if ( month < 10 ) {
        month = '0' + month;
    }else if ( day < 10 ) { 
        day = '0' + day;
    }
    cell.setAttribute("value", (date.getFullYear() + '-' + month + '-' + day) );            
    cell.textContent = date.getDate();
    list.appendChild(cell);
}
function renderMonth(mon, monlist) {
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    for (var i = 0; i <= 11; i++) {
        monlist.innerHTML += '<button class="mon" onclick="selectMonth(this);" value="'+ [i] + '">'+ months[i] + '</button>';
    }
}
function renderYears(years, yearlist) {
    let currentYear = state.current.getFullYear();
    let order = currentYear % 10;            
    let recentYear = currentYear - (order+1);
    
    for (var i = 0; i < 12; i++) {
        yearlist.innerHTML += '<button class="mon" onclick="selectYear(this);" value="'+ (recentYear+i) + '">'+ (recentYear+i) + '</button>';
    }
}

// show Calendar
// datepickerInput.addEventListener('focus', (event) => {
//     showCalendar();
// });

function showCalendar() {
    let today = new Date();
    let todayDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    calendar_date.className = 'calendar';
    
    let els = document.getElementsByClassName("date");
    for(let i = 0; i < els.length; i++)
    {
        if(datepickerInput.value == els[i].value) {
            els[i].classList.add("active");
        }else {
            els[i].classList.remove("active");
        }
        if(todayDate == els[i].value) {
            els[i].classList.add("today");
        }
    }
}
function hideCalendar(){
    calendar_date.className = 'd-none';
}

function toggleCalendar(){
    if (calendar_date.className === "d-none") {
        showCalendar();
    } else {
        hideCalendar();
    }
}

function selectDate(o) {
    datepickerInput.value = o.value;
    calendar_date.className = 'd-none';
}
function selectMonth(o){
    state.current.setMonth(o.value);
    render();
    calendar_month.className = 'd-none';
    calendar_date.className = 'calendar';
}

function selectYear(o){
    state.current.setYear(o.value);
    render();            
    calendar_year.className = 'd-none';
    calendar_month.className = 'calendar';
}

function checkDate(o){
    let dateVal = o.value;
    let dateYear = dateVal.substr(0, 4);
    
    if ( dateVal.length == 8 ){                
        let dateMonth = dateVal.substr(4, 2);
        let dateDay = dateVal.substr(6, 2);
        if( dateDay > 31 ) {
            clearInput();
        } else {
            dateVal = dateYear + "-" + dateMonth + "-" + dateDay;
            o.value = dateVal;
            renderCalendar();
        }
        
    }else if(dateVal.length == 7) {
        let dateMonth = dateVal.substr(4, 1);
        let dateDay = dateVal.substr(5, 2);
        if( dateDay > 31 ) {
            clearInput();
        }else {
            dateVal = dateYear + "-0" + dateMonth + "-" + dateDay;
            o.value = dateVal;
            renderCalendar();
        }
    }
    function clearInput(){
        o.focus();
        o.value = '';
    }
    function renderCalendar(){
        let innerText = new Date(datepickerInput.value);
        state.current = innerText;
        hideCalendar();
        render();
    }
    
}



// 處理流程
init();