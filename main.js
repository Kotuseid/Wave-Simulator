let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const CMRATIO = 37.8
let amplitudeInput = document.getElementById("amplitude");
let amplitude = amplitudeInput.value * CMRATIO;//cm
let wavelengthInput = document.getElementById("wavelength");
let wavelength = wavelengthInput.value * CMRATIO;//cm
let frequencyInput = document.getElementById("frequency");
let frequency = 0.5; //Hz
let speed = frequency * wavelength; //cm/s
let fps = 60;
let xoffset = 0;
let loop = true;

amplitudeInput.oninput = () => {
    amplitude = amplitudeInput.value * CMRATIO;
    loop = false;
    document.getElementById('amplitudeValue').innerText = parseFloat(amplitudeInput.value).toFixed(1) + " cm";

};
amplitudeInput.onchange = () => { loop = true; };

wavelengthInput.oninput = () => {
    wavelength = wavelengthInput.value * CMRATIO;
    loop = false;
    document.getElementById('wavelengthValue').innerText = parseFloat(wavelengthInput.value).toFixed(1) + " cm";
    speed = frequency * wavelength;
    updateSpeedDisplay(parseFloat(wavelengthInput.value).toFixed(1));

};
wavelengthInput.onchange = () => { loop = true; };

frequencyInput.oninput = () => {
    frequency = parseFloat(frequencyInput.value);
    loop = false;
    document.getElementById('frequencyValue').innerText = parseFloat(frequencyInput.value).toFixed(1) + " Hz";
    speed = frequency * wavelength;
    updateSpeedDisplay(parseFloat(wavelengthInput.value).toFixed(1));
};
frequencyInput.onchange = () => { loop = true; };

draw();

function draw() {
    canvas.width = window.innerWidth - 200;
    canvas.height = window.innerHeight - 14;
    canvas.style.background = "#000";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";


    //axis
    ctx.strokeStyle = "#555";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    //wave
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#FFF";
    ctx.beginPath();
    ctx.moveTo(-xoffset, 0);
    for (let x = xoffset; x <= canvas.width + xoffset - 100; x++) {
        ctx.lineTo(x - xoffset, canvas.height / 2 - amplitude * Math.sin(x * Math.PI * 2 / wavelength));
    }
    ctx.stroke();

    //line that goes up and down
    ctx.strokeStyle = "#fc7f03";
    ctx.beginPath();
    ctx.moveTo(canvas.width - 100, canvas.height / 2);
    ctx.lineTo(canvas.width - 100, canvas.height / 2 - amplitude * Math.sin((canvas.width + xoffset - 100) * Math.PI * 2 / wavelength));
    ctx.stroke();

    //amplitude
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(canvas.width - 80, canvas.height / 2);
    ctx.lineTo(canvas.width - 80, canvas.height / 2 - amplitude / 2);
    ctx.lineTo(canvas.width - 85, canvas.height / 2 - amplitude / 2);
    ctx.lineTo(canvas.width - 75, canvas.height / 2 - amplitude / 2);
    ctx.lineTo(canvas.width - 80, canvas.height / 2 - amplitude / 2);
    ctx.lineTo(canvas.width - 80, canvas.height / 2 - amplitude);
    ctx.lineTo(canvas.width - 70, canvas.height / 2 - amplitude + 10);
    ctx.lineTo(canvas.width - 80, canvas.height / 2 - amplitude);
    ctx.lineTo(canvas.width - 90, canvas.height / 2 - amplitude + 10);
    ctx.stroke();
    ctx.fillStyle = "red";
    ctx.translate(canvas.width - 60, canvas.height / 2 - amplitude / 2);
    ctx.rotate(Math.PI / 2);
    ctx.fillText("amplitude", 0, 0);
    ctx.resetTransform();

    //wavelength
    ctx.strokeStyle = "yellow";
    ctx.beginPath();
    ctx.moveTo(canvas.width - 100, canvas.height / 2 - 50);
    ctx.lineTo(canvas.width - 110, canvas.height / 2 - 60);
    ctx.lineTo(canvas.width - 100, canvas.height / 2 - 50);
    ctx.lineTo(canvas.width - 110, canvas.height / 2 - 40);
    ctx.lineTo(canvas.width - 100, canvas.height / 2 - 50);
    ctx.lineTo(canvas.width - 100 - wavelength / 2, canvas.height / 2 - 50);
    ctx.lineTo(canvas.width - 100 - wavelength / 2, canvas.height / 2 - 55);
    ctx.lineTo(canvas.width - 100 - wavelength / 2, canvas.height / 2 - 45);
    ctx.lineTo(canvas.width - 100 - wavelength / 2, canvas.height / 2 - 50);
    ctx.lineTo(canvas.width - 100 - wavelength, canvas.height / 2 - 50);
    ctx.lineTo(canvas.width - 90 - wavelength, canvas.height / 2 - 60);
    ctx.lineTo(canvas.width - 100 - wavelength, canvas.height / 2 - 50);
    ctx.lineTo(canvas.width - 90 - wavelength, canvas.height / 2 - 40);
    ctx.stroke();
    ctx.fillStyle = "yellow";
    ctx.fillText("wavelength", canvas.width - 100 - wavelength / 2, canvas.height / 2 - 70);



    if (loop) {
        xoffset += speed / fps;
    }
}

setInterval(draw, 1000 / fps);

function updateSpeedDisplay(w) {
    document.getElementById("speed1").innerText = "= " + frequency + " x " + w;
    document.getElementById("speed2").innerText = "= " + (frequency * w).toFixed(3) + " cm/s";
}