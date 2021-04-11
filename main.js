prediction1 = "";

Webcam.set({
    width : 300,
    height : 300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach(camera);

function snap(){
    Webcam.snap(function(data_uri){
 document.getElementById("result").innerHTML = '<img id = "captured_img" src= "'+ data_uri+ '"/>';
    });
}

console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/F3XLqxyAy/model.json' , modelLoaded);

function modelLoaded(){
    console.log("MODEL LOADED !!!");
}

function speakcomp(){
    var synth = window.speechSynthesis;
    speak_data1 = "The first prediction is" + prediction1;
    var utterthis = new SpeechSynthesisUtterance(speak_data1);
    synth.speak(utterthis);
}

function check(){
    img = document.getElementById('captured_img');
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if (error){
        console.error(error);
    } else {
        console.log(results);
        prediction1 = results[0].label;
        document.getElementById("result_emotion_name").innerHTML = prediction1;

        speakcomp()

        if (prediction1 == "Best"){
            document.getElementById("result_emoji_name").innerHTML = "👍";
        }
        if (prediction1 == "Amazing"){
            document.getElementById("result_emoji_name").innerHTML = "👌";
        }
        if (prediction1 == "Peace"){
            document.getElementById("result_emoji_name").innerHTML = "✌";
        }
    }
}
