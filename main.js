Webcam.set({
  width: 500,
  height: 400,
  image_format: "png",
  png_quality: 200
});

var img_id;
var speechSynthApi = window.speechSynthesis;
var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-US";
recognition.onresult = function(event) {
  for (var i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      var transcript = event.results[i][0].transcript.trim();
      console.log("You said: " + transcript);
      if (transcript === "selfie") {
        speak();
      }
    }
  }
};

function take_snapshot() {
  console.log(img_id);
  var camera = document.getElementById("camera");
  Webcam.attach(camera);
  Webcam.snap(function(data_uri) {
    if (img_id == "selfie1") {
      document.getElementById("resultOne").innerHTML = "<img id='selfie1' src='" + data_uri + "'/>";
    }
    if (img_id == "selfie2") {
      document.getElementById("resultTwo").innerHTML = "<img id='selfie2' src='" + data_uri + "'/>";
    }
    if (img_id == "selfie3") {
      document.getElementById("resultThree").innerHTML = "<img id='selfie3' src='" + data_uri + "'/>";
    }
    Webcam.reset(camera);
  });
}

function speak() {
  console.log("speak function");
  setTimeout(function() {
    img_id = "selfie1";
    take_snapshot();
    var speakdata = "Taking your next selfie in 5 seconds.";
    var utterthis = new SpeechSynthesisUtterance(speakdata);
    speechSynthApi.speak(utterthis);
  }, 5000);
  setTimeout(function() {
    img_id = "selfie2";
    take_snapshot();
    var speakdatatwo = "Taking your next selfie in 10 seconds.";
    var utterthistwo = new SpeechSynthesisUtterance(speakdatatwo);
    speechSynthApi.speak(utterthistwo);
  }, 10000);
  setTimeout(function() {
    img_id = "selfie3";
    take_snapshot();
    var speakdatathree = "Taking your next selfie in 15 seconds.";
    var utterthisthree = new SpeechSynthesisUtterance(speakdatathree);
    speechSynthApi.speak(utterthisthree);
  }, 15000);
}

recognition.start();