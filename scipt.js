// Create a speech recognition object to listen to the user's voice
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// Initialize the speech recognition object
let recognition = new SpeechRecognition();

// Connect to the textbox element where the recognized text will be displayed
let Textbox = document.getElementById("textbox");

// Create a speech synthesis object for voice responses
let synth = window.speechSynthesis;

// Create utterance messages
let utterance = new SpeechSynthesisUtterance("Taking your selfie in 5 seconds");
let utterance2 = new SpeechSynthesisUtterance("Your command doesn't match. Please say 'my selfie please'");

// Function to start listening to the user's voice when user presses the start button
function start() {
    Textbox.innerHTML = ""; // Clear any previous text in the textbox
    recognition.start(); // Start the voice recognition process
}

// Event handler for when the speech recognition object recognizes the user's voice
recognition.onresult = function (event) {
    // Extract the recognized text from the event object
    let command = event.results[0][0].transcript;

    // Display the recognized text in the textbox
    Textbox.innerHTML = command;

    // Check if the recognized text matches "my selfie please"
    if (command === "my selfie please") {
        speak(); // Call the `speak` function to take a selfie
    } else {
        synth.speak(utterance2); // Respond with a mismatch message
    }
}

// Function to provide a voice response and take a selfie after 5 seconds
function speak() {
    // Speak the selfie-taking message
    synth.speak(utterance);

    // Attach the webcam to the webpage to display the camera feed
    Webcam.attach(camera);

    // Set the delay for taking the selfie
    setTimeout(function () {
        takeSelfie(); // Call the `takeSelfie` function to capture the image
        save(); // Call the `save` function to save the image
    }, 5000); // Wait for 5 seconds before taking the selfie
}

// Reference the camera element on the webpage
let camera = document.getElementById("camera");

// Configure the webcam settings
Webcam.set({
    width: 360,
    height: 250,
    image_format: 'jpeg',
    jpeg_quality: 90
});

// Function to take a selfie and display it on the webpage
function takeSelfie() {
    Webcam.snap(function (data_uri) {
        // Insert the captured image into the `result` element as an <img> tag
        document.getElementById("result").innerHTML = '<img src="' + data_uri + '" />';
    });
}

// Function to save the selfie as an image file
function save() {
    let link = document.getElementById("link"); // Reference the link element on the webpage
    let image = document.querySelector("#result img").src; // Get the image source from the result element
    link.href = image; // Set the href attribute of the link to the image source
    link.click(); // Automatically click the link to download the image
}
