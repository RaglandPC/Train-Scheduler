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
// create vars
var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = 0;
var nextArrival = 0;
var minutesAway = 0;
var currentTime = moment();

var datetime = null;
date = null;

var update = function () {
    date = moment(new Date())
    datetime.html(date.format('dddd,MMMM Do YYYY, h:mm:ss a'));
};
// get button ready on click
$(document).ready(function () {
    datetime = $("#current-status")
    update();
    setInterval(update, 1000)
});

$("#add-train").on("click", function () {
    event.preventDefault();
    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrainTime = $("#train-time").val().trim();
    frequency = $("#frequency").val().trim();

    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        minutesAway: minutesAway,
        nextArrival: nextArrival,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

    // First time
    // database.ref().on("child_added", function(snapshot) {
    // var firstTime = moment(firstTrainTime, "hh:mm").subtract(1, "years");

    // //Difference between the times
    // var start = moment(sv.firstTime);
    // var now = moment();
    // diffTime = now.diff(start, 'minutes');

    // // Time apart
    // var tRemaidner = diffTime % frequency;

    // // Minute Until Train
    // var minutesAway = frequency - tRemaidner;

    // // Next Train
    // var nextTrain = moment().add(minutesAway, "minutes");

    // //Arrival Time
    // var nextArrival = moment(nextTrain).format("hh:mm a");

    // var nextArrivalUpdate = function () {
    //     date = moment(new date())
    //     datetime.html(date.format("hh:mm a"));
    // }

    //   alert("Form submitted!")

    //   // Empty text
    //   $("#trainName").val("");
    //   $("#destination").val("");
    //   $("#firstTrainTime").val("");
    //   $("#frequency").val("");

    //   return false;


