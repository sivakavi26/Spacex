var getData = undefined;
var flightNo = [];
var launchDetails = undefined;
var container = undefined;
var z = undefined;
var sendHttpRequest = async (method,url) => {
  const response = await fetch(url);
  return await response.json();
};
function init() {
  getData();  
}
var getData = () =>{
  var x = window.location.pathname.split('/');
  var y = x[x.length-1];
  if (y == "past.html") {
    sendHttpRequest("GET","https://api.spacexdata.com/v3/launches/past").then(responseData => {
      launchDetails = responseData;
      iteration();
      });
    }else {
    sendHttpRequest("GET","https://api.spacexdata.com/v3/launches/upcoming").then(responseData => {
      launchDetails = responseData;
      iteration();
      });
    }
  };
function iteration(){
  container = document.getElementById("container1");
  for(i=0;i<launchDetails.length;i++){
    var container2 =document.createElement("div");
    container2.className="container";
    container.appendChild(container2);
    var card = document.createElement("div");
    card.className ="card mb-1";
    card.style="max-width: 1200px;"
    container2.appendChild(card);
    var row = document.createElement("div");
    row.className="row no-gutters";
    card.appendChild(row);
    var col=document.createElement("div");
    col.className="col-md-2";
    row.appendChild(col);
    var img = document. createElement("img");
    img.className ="card-img"
    img. src = "https://rlv.zcache.com/cartoon_rocket_classic_round_sticker-rcb1e90b36d0c4c34b00188fc39dffc0a_0ugmp_8byvr_704.jpg";
    col.appendChild(img);
    var col2=document.createElement("div");
    col2.className="col-md-10";
    row.appendChild(col2);
    var card_body = document.createElement("div");
    card_body.className ="card-body";
    col2.appendChild(card_body);
    var cardTitle =document.createElement("h4");
    cardTitle.className="card-title";
    cardTitle.innerHTML =launchDetails[i].mission_name;
    card_body.appendChild(cardTitle);
    var card_text = document.createElement("p");
    card_text.className ="card-text"
    card_text.innerHTML = "ROCKET: "+launchDetails[i].rocket.rocket_name;
    card_body.appendChild(card_text);
    if (launchDetails[i].details != null) {
      var card_text1 = document.createElement("p");
      card_text1.className ="card-text"
      card_text1.innerHTML =launchDetails[i].details;
      card_body.appendChild(card_text1);
    }
  }
}
init();
