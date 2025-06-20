console.log("Hello World");

const { ipcRenderer } = require("electron");
const ipc=ipcRenderer;

document.querySelector("#minimize").addEventListener("click", () =>{
    ipc.send("manualMinimize"); 
});
document.querySelector("#close").addEventListener("click", () => {
    ipc.send("manualClose");
});

const display = document.getElementById("display");
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

function start(){
    if (!isRunning){
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10);
        isRunning = true;
    }
};

function stop(){
    if (isRunning) {
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
    }
};

function reset(){
    clearInterval(timer);
    startTimer = 0;
    elapsedTime = 0;
    isRunning = false;
    display.textContent = '00:00:00:00';
};

function update(){
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60))
    let minutes = Math.floor(elapsedTime / (1000* 60) % 60);
    let seconds = Math.floor(elapsedTime / 1000 % 60);
    let milliseconds = Math.floor(elapsedTime % 1000 / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, 0);

    display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
};