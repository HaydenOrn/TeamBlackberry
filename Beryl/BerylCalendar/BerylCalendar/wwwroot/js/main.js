var displayColors = false;
var darkmode = false;

$("#eventOptionToggle").click(function () {
    //some borrowed code: https://www.codexworld.com/how-to/toggle-show-hide-element-using-javascript/
    var elem = document.getElementById("displayOptions");
    var button = document.getElementById("eventOptionToggle");
    if(elem.style.display === "none"){
        elem.style.display = "block";
        button.innerText = "Hide";
    }else{
        elem.style.display = "none";
        button.innerText = "Show";
    }
});

$("#displayColorToggle").click(function () {
    if (displayColors === false){
        colorTypes();
        document.getElementById("displayColorToggle").innerText = "Disable Colors";
        displayColors = true;
    } else {
        monoTypes();
        document.getElementById("displayColorToggle").innerText = "Enable Colors";
        displayColors = false;
    }
});

function colorTypes() {
    var events = document.getElementsByClassName("event");
    var types = document.getElementsByClassName("eventType");
    var i;

    for (i = 0; i < events.length; i++){
        switch(types[i].innerText){
            case "Activity":
                events[i].style.borderColor = "red";
                events[i].style.backgroundColor = "#faa"
                break;
            case "Meal":
                events[i].style.borderColor = "yellow";
                events[i].style.backgroundColor = "#ff9"
                break;
            case "Shopping":
                events[i].style.borderColor = "blue";
                events[i].style.backgroundColor = "#aaf"
                break;
            case "Visit":
                events[i].style.borderColor = "green";
                events[i].style.backgroundColor = "#afa"
                break;
        }
    }
}

function monoTypes() {
    var events = document.getElementsByClassName("event");
    var types = document.getElementsByClassName("eventType");
    var i;

    for (i = 0; i < events.length; i++){
        events[i].style.borderColor = "lightgrey";
        events[i].style.backgroundColor = "#fff"
    }
}

//Dark mode button switch
$("#darkModeSwitch").click(function () {
    if (darkmode === false) {
        document.body.style.backgroundColor = "black";
        document.body.style.color = "white";
        loginBoxTurnDarkGrey();
        window.localStorage.setItem("dark", "dark");
        darkmode = true;
    } else {
        document.body.style.backgroundColor = "lightgrey";
        document.body.style.color = "black";
        loginBoxTurnLightGrey();
        localStorage.clear();
        darkmode = false;
    }
});

//function that is called if "dark" is in local storage
function darkModeSwitchOnReady() {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
    loginBoxTurnDarkGrey();
    darkmode = true;
}

//checks while page is loading to see if dark is in local storage, calls darkModeSwitchOnReady() if it is.
document.addEventListener('DOMContentLoaded', function bgColor() {
    if (!localStorage.getItem("dark")) {
    } else {
        darkModeSwitchOnReady();
    }
});

//Fixes styling for all pages that use boxbgcolor (create and login) and week view when turned dark
function loginBoxTurnDarkGrey() {
    if (document.getElementsByClassName("boxbgcolor")) {
        changeColumnColor('boxbgcolor', 'darkgrey');
    }

    if (document.getElementById("darkModeCheck1")) {
        changeColumnColorById('white')
    }
}
//Fixes styling for all pages that use boxbgcolor (create and login) and week view when turned light
function loginBoxTurnLightGrey() {
    if (document.getElementsByClassName("boxbgcolor")) {
        changeColumnColor('boxbgcolor', 'rgb(240, 240, 240)');
    }

    if (document.getElementById("darkModeCheck1")) {
        changeColumnColorById('black')
    }
}

function changeColumnColor(column, color) {
    var cols = document.getElementsByClassName(column);
    for (i = 0; i < cols.length; i++) {
        //console.log(cols[i]);
        cols[i].style.backgroundColor = color;
    }
}

function changeColumnColorById(color) {
    document.getElementById("darkModeCheck1").style.color = color;
    document.getElementById("darkModeCheck2").style.color = color;
    document.getElementById("darkModeCheck3").style.color = color;
    document.getElementById("darkModeCheck4").style.color = color;
    document.getElementById("darkModeCheck5").style.color = color;
    document.getElementById("darkModeCheck6").style.color = color;
    document.getElementById("darkModeCheck7").style.color = color;
}

$("#ReadAsCommand").click(function () {
    console.log("Luis Language Comprehension Used");
    document.getElementById("LuisText").innerText = "";
    let address = "/Luis/Interpret";
    var params = { command: document.getElementById("phrase").value };
    $.ajax({
        type: "POST",
        dataType: "json",
        url: address,
        data: params,
        success: displayIntent,
        error: LuisAjaxError
    });

});

function displayIntent(data){
    if (data == "Calendar.CreateEvent") {
        window.location.replace("/Event/CreateEvent");
    } else if (data == "Calendar.CreateEventWithTitle") {
        window.location.replace("/Event/CreateEvent");
    } else if (data == "None") {
        document.getElementById("LuisText").innerText = "I'm sorry, I don't know what you said. Please type a phrase in common language to take an action on an event. \n For example, to create an event with a title preset: \"Make a new event titled Spending Time with my Family\"";
        document.getElementById("LuisText").style.color = "red";
    } else {
        document.getElementById("LuisText").innerText = "There was an error, refresh the page and try again";
        document.getElementById("LuisText").style.color = "red";
    }
}

function LuisAjaxError() {
    console.log("Error in Ajax call");
    alert("Unknown error. Please refresh the page and try again.")
}
