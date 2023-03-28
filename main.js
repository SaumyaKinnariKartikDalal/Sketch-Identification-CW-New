function preload() {
    classifier = ml5.imageClassifier("DoodleNet");
}

function setup() {
    canvas = createCanvas(280, 280);
    canvas.center(); 
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.SpeechSynthesis;
}

function draw() {
    stroke(0);
    strokeWeight(13);
    if (mouseIsPressed){
        line(pmouseX,pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas() {
    classifier.classify(canvas, gotResult)
}

function gotResult(error, result) {
    if(error){
        console.log(error);
    }
    else{
        console.log(result);
        document.getElementById("Label"). innerHTML = "Your Sketch: "+ result[0].label;
        document.getElementById("Confidence"). innerHTML = "Confidence: "+ Math.round(result[0].confidence*100) + "%";
        utterThis = new SpeechSynthesisUtterance(result[0].label);
        synth.speak(utterThis);
    }
}

function clearCanvas() {
    background("white");
}