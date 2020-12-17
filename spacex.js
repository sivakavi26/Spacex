var nextLauchDate = undefined;
var nextLauchFlightNumber = 0;
var flightDetails = {};
var deadline = undefined;
var x = undefined;
var flightdata = undefined;
var launchDetails = undefined;
var getData = undefined;
var getUpData = undefined;
var flightNo = [];
var launchDetails = undefined;
var flightData = undefined;
function init() {
  getNextLaunch();
}
function getNextLaunch() {
  GetHttpRequest ("GET","https://api.spacexdata.com/v3/launches/next").then(responseData => {
     flightdata = responseData;
     console.log(flightdata);
     nextLauchDate = flightdata.launch_date_utc ;
     var d = new Date(nextLauchDate);
     deadline = ConvertUTCTimeToLocalTime(d);
     console.log(deadline);
     createTimer();
     toggler();
 });
};

function ConvertUTCTimeToLocalTime(UTCDateString){
  var convertdLocalTime = new Date(UTCDateString);
  var hourOffset = convertdLocalTime.getTimezoneOffset() / 60;
  convertdLocalTime.setHours( convertdLocalTime.getHours() + hourOffset );
  return convertdLocalTime;
}

function createTimer() {
  var x = setInterval(() => {
    var now = new Date().getTime();
    var distance =  deadline - now ;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("demo").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("demo").innerHTML = "EXPIRED";
    }
  }, 1000);
}
function toggler() {
  var x = document.getElementById("nxtlaunch");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
function getFlightDetails() {
  var flight_number = document.getElementById("flight_no").value;
  getFlightInfo(flight_number);
}
function getNextLaunchDetails(){
  getNextLaunch();
  var timer = document.getElementById("nxtlaunch");
  timer.innerHTML = "";
  var missionName = document.createElement("h1");
  missionName.appendChild(document.createTextNode(flightdata.mission_name));
  var flightName = document.createElement("h3");
  flightName.appendChild(document.createTextNode(flightdata.rocket.rocket_name));
  console.log(72,flightdata.rocket.rocket_name)
  timer.appendChild(missionName);
  timer.appendChild(flightName);
  if (flightdata.details != null && flightdata.details.length > 0) {
    var flightDesc = document.createElement("p");
    flightDesc.appendChild(document.createTextNode(flightdata.details));
    timer.appendChild(flightDesc);
  }
};

function getFlightInfo(flight_no) {
  if (flight_no > 0 ) {
    GetHttpRequest("GET","https://api.spacexdata.com/v3/launches/" + flight_no).then(responseData => {
      flightData = responseData;
      console.log(85,flightData);
      var flightInfo = document.getElementById("flight_info");
      flightInfo.innerHTML = "";
      var missionName = document.createElement("h1");
      missionName.appendChild(document.createTextNode(flightData.mission_name));
      var flightName = document.createElement("h3");
      flightName.appendChild(document.createTextNode(flightData.rocket.rocket_name));
      flightInfo.appendChild(missionName);
      flightInfo.appendChild(flightName);
      if (flightData.details != null && flightData.details.length > 0) {
        var flightDesc = document.createElement("p");
        flightDesc.appendChild(document.createTextNode(flightData.details));
        flightInfo.appendChild(flightDesc);
      }
    }).catch((err) => { alert("An error has occured")});
  } else {
    alert("Fight Number Cannot be zero or Non-Numerical type");
  }
}
var GetHttpRequest = async (method,url) => {
  const response = await fetch(url);
  return await response.json();
};
init();
