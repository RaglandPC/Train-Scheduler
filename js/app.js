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

//Click button to pop firebase and html
$("#add-train").on("click", function () {
    event.preventDefault();
    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrainTime = $("#train-time").val().trim()
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
    alert("Add Train Submitted!");

    // Empty text input
    $("#train-name").val("");
    $("#destination").val("");
    $("#train-time").val("");
    $("#frequency").val("");

    // Don't refresh the page!
    return false;

});

database.ref().orderByChild("dateAdded").limitToLast(15).on("child_added", function(trainSnapshot, prevTrainkey){

  console.log(trainSnapshot.val());

  // Store everything into a variable
  var trainName = trainSnapshot.val().trainName;
  var destination = trainSnapshot.val().destination;
  var firstTrainTime = trainSnapshot.val().firstTrainTime;
  var frequency = trainSnapshot.val().frequency ;

  // Employee Info
  console.log(trainName);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(frequency);

//Train start
var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");


// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");


// Time apart (remainder)
var tRemainder = diffTime % frequency;


// Minute Until Train
var minutesAway = frequency - tRemainder;


// Next Train
var nextTrain = moment().add(minutesAway, "minutes");


// Arrival time
var nextArrival = moment(nextTrain).format("hh:mm a");

var nextArrivalUpdate = function() {
  date = moment(new Date())
  datetime.html(date.format('hh:mm a'));
}

  console.log("Train name: " + trainSnapshot.val().trainName);
  console.log("Destination: " + trainSnapshot.val().destination);
  console.log("First train: " + trainSnapshot.val().firstTrainTime);
  console.log("Frequency: " + trainSnapshot.val().frequency);
  console.log("Next train: " + trainSnapshot.val().nextArrival);
  console.log("Minutes away: " + trainSnapshot.val().minutesAway);
  console.log("==============================");

  $("#new-train").prepend("<tr><td>" + trainSnapshot.val().trainName + "</td>" +
    "<td>" + trainSnapshot.val().destination + "</td>" +
    "<td>" + "Every " + trainSnapshot.val().frequency + " mins" + "</td>" +
    "<td>" + trainSnapshot.val().nextArrival + "</td>" +
    "<td>" + trainSnapshot.val().minutesAway + " mins until arrival" + "</td>" +
    "</td></tr>");

  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });
