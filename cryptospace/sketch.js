// Code Inspiration: https://youtu.be/17WoOqgXsRM

var song;
var analyzer;
var mic
var stars = [];
var speed;
var bool = false;

var stream;
var stream2;

//bitcoininfo
var w;
var btcs;
btcs = new WebSocket('wss://ws.blockchain.info/inv');
var satoshi;
var bitmap;
var counter = 0;
var transactions = [];
var total = 0;
var totalround = 0;
var btcUnit = 0;
var totaleuro = 0;
var brightness;
var xval
var yval
var rotation
var marktwaarde = 0;
var alt_mouseX;
var alt_mouseY;
//img
var img;


function setup() {
  createCanvas(1600,900);

  noCursor();
  //song
    mic = new p5.AudioIn()
    mic.start();

}

function draw() {

  alt_mouseX = mouseX;
  alt_mouseY = mouseY;

  speed = map(alt_mouseY, 0, height, 0, 20);
  translate(width/2 , height/2);
  xval = map (alt_mouseX, 38, 1575, -1, 1);
  yval = map (alt_mouseY, 4, 875, 1, -1);
  rotation = map((xval * yval), -1, 1, -55, 55);



  if (bool === true) {
    counter = 0;
  }

  for (var i = 0; i < transactions.length; i++) {
    transactions[i].update();
    transactions[i].show();
  }

  // song
  var rms = (mic.getLevel()/0.2);
  fill(127);
  stroke(0);

  // Draw an ellipse with brightness based on volume
  brightness = round(map (rms,0,1,100,255));

}


btcs.onopen = function () {
    btcs.send(JSON.stringify({"op":"unconfirmed_sub"}));
};


btcs.onmessage = function(onmsg) {
    var response = JSON.parse(onmsg.data);
    satoshi = response.x.out[0].value;
    btcUnit = satoshi/100000000;

    stream = stream + satoshi + '<br>';
      document.getElementById('stream').innerHTML = stream;
    stream2 = stream2 + parseFloat(btcUnit * marktwaarde + " €").toFixed(2) + '<br>';
      document.getElementById('stream2').innerHTML = stream2;


    window.setInterval(function() {
      var elem = document.getElementById('stream');
      elem.scrollTop = elem.scrollHeight;
    }, 1000);

    window.setInterval(function() {
      var elem = document.getElementById('stream2');
      elem.scrollTop = elem.scrollHeight;
    }, 1000);


    bitmap = map(satoshi,0,5000000000,10,2000);

    transactions[counter] = new Transaction(bitmap);
    if (counter > 20) {
        bool = true;
    }
    counter++;


  total = float(total + btcUnit);
  document.getElementById('singlebit').innerHTML = parseFloat(total).toFixed(2)+" BTC";
  totaleuro = parseFloat(total * marktwaarde).toFixed(2);
  document.getElementById('singlebit2').innerHTML = totaleuro +" €";
}

var pointer = document.getElementById('pointer');
var myCanvas = document.getElementById('defaultCanvas0');
var relative_viewport_height = window.innerHeight / 17;
var relative_viewport_height_x = window.innerHeight / 4.8;

document.addEventListener('mousemove',function(event){
  if (myCanvas == null){
    myCanvas = document.getElementById('defaultCanvas0');
  } else {
    myCanvas.style.transform = "translate(" + (-(event.screenX - window.innerWidth / 1.5) / 5 - 850) + "px," + (-(event.screenY  - window.innerHeight / 1.5) / 5 - 450) + "px)";
  }
//  console.log(event);
  pointer.style.transform = "translate(" + (event.clientX - relative_viewport_height_x) + "px," + (event.clientY - relative_viewport_height) + "px) rotate("+rotation+"deg)";

},true);

//marktwaarde omrekenen
console.log(marktwaarde);

$.getJSON('https://api.coindesk.com/v1/bpi/currentprice.json',
    function(data) {
        // Continuously update stream with data
        var body = '';
        marktwaarde = float(data.bpi.EUR.rate)*1000;
    }
);
