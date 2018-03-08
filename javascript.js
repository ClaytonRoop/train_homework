


var config = {
    apiKey: "AIzaSyByolIs8JAvIC0Yhy7ngm0BFF2BWuYrxDU",
    authDomain: "trainhomework-54e71.firebaseapp.com",
    databaseURL: "https://trainhomework-54e71.firebaseio.com",
    projectId: "trainhomework-54e71",
    storageBucket: "trainhomework-54e71.appspot.com",
    messagingSenderId: "561054742638"
};

firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var destination = "";
var firstTrain = "";
var nextArrival = "";
var frequency = "";
var minutesAway = "";

$(".submitbutton").on("click", function (event) {
    event.preventDefault();
    
    console.log("TESTSTESTEST");

    trainName = $("#train-name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrain = $("#first-train-time").val().trim();
    frequency = $("#frequency-input").val().trim();

    

         database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
    $('.form-control').val('');
});

database.ref().orderByChild("dateAdded").limitToLast(15).on("child_added", function (snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // Console.loging the last user's data
    console.log(sv.trainName);
    console.log(sv.destination);
    console.log(sv.firstTrain);
    console.log(sv.frequency);



    trainName = sv.trainName;
    destination = sv.destination;
    firstTrain = sv.firstTrain;
    frequency = sv.frequency

    var randomFormat = "MM/DD/YYYY"
    var convertedDate = moment(firstTrain, randomFormat);
    console.log(convertedDate);


    // Assumptions
    // var tFrequency = 3;

    // Time is 3:30 AM

    // var firstTime = "03:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var minutesAway = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesAway);

    // Next Train
    var nextArrival = moment().add(minutesAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));
    var printnextArrival = moment(nextArrival).format("hh:mm");



    $('#tablebody').append('<tr class="child"><td> ' + trainName + ' </td><td> ' + destination + ' </td><td> ' + frequency + ' </td><td> ' + printnextArrival + ' </td><td> ' +  minutesAway + '</td></tr>');


    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
