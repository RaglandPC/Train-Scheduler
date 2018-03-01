// Initialize Firebase
var config = {
    apiKey: "AIzaSyDu_BcjRxt_T6XRbeWUxh3XzauUVMZK6pA",
    authDomain: "train-scheduler-71afa.firebaseapp.com",
    databaseURL: "https://train-scheduler-71afa.firebaseio.com",
    projectId: "train-scheduler-71afa",
    storageBucket: "train-scheduler-71afa.appspot.com",
    messagingSenderId: "572118361660"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName = "";
  var destination = "";
  var firstTrainTime = "";
  var frequency = 0;
  var nextArrival=0;
  var minutesAway=0;
  var currentTime = moment();

  var datetime = null;
  date =null;

  var update = function () {
      date = moment(new Date())
      datetime.html(date.format('dddd,MMMM Do YYYY, h:mm:ss a'));
  };

  $(document).ready(function(){
      datetime = $("#current-status")
      update();
      setInterval(update, 1000)
  });
  