
// firebase connection 
  var config = {
    apiKey: "AIzaSyBIm0BFJnlROdNGphbcdSN-E4j8gxVjims",
    authDomain: "train-scheduler-project.firebaseapp.com",
    databaseURL: "https://train-scheduler-project.firebaseio.com",
    projectId: "train-scheduler-project",
    storageBucket: "train-scheduler-project.appspot.com",
    messagingSenderId: "487753082646"
  };
  firebase.initializeApp(config);

var database = firebase.database();
$('#add-train-btn').on("click", function() {
    // user inputs here
    var trainName = $("#train-name-input").val();
    var destination = $("#destination-input").val();
    var firstTrain = $("#time-input").val();
    var frequency = $("#frequency-input").val();
    console.log(trainName)
    // Train data for local use
    var newTrain = {
        name: trainName,
        place: destination,
        firstTrainLocal: firstTrain,
        frequecyLocal: frequency
    };
    // put train data into the database
    database.ref().push(newTrain);
    console.log(newTrain.name);
    // will clear the text boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");

    return false;
});
// firebase listemer
database.ref().on("child_added", function(childSnapShot) {
    console.log(childSnapShot.val());
    // stores childsnapshot values as a variable
    var trainName = childSnapShot.val().name;
    var destination = childSnapShot.val().place;
    var firstTrain = childSnapShot.val().ftrain;
    var frequency = childSnapShot.val().freq;
    // first train
    var firstTimeConverted = moment(firstTrain, "HH:mm");
    console.log(firstTimeConverted);
    var currentTime = moment().format("HH:mm");
    console.log("CURRENT TIME: " + currentTime);
    // difference between currenttime and first train
    var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
    console.log(firstTrain);
    console.log("Difference in Time: " + timeDiff);
    // time left
    var timeLeft = timeDiff % frequency;
    console.log(timeLeft);
    // minutes until train
    var minToTrain = frequency - timeLeft;

    var nxTrain = moment().add(minToTrain, "minutes").format("HH:mm");
    $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + nxTrain + "</td><td>" + frequency + "</td><td>" + minToTrain + "</td><tr>");
});