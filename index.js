const input = document.querySelector("input");
const audioElem = document.querySelector("audio");
const canvas = document.querySelector("canvas");

const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

input.addEventListener("change", ()=> {
    const file = input.files[0];
    // console.log(file);
    if(!file) return;
    audioElem.src = URL.createObjectURL(file); //create file url
    audioElem.play(); // play sound
    
    // Audio processing 
    // AudioContext- rep audio processing graph- Audio modules- rep by AudioNode
    //  src (mediaElement)-> modification-> destination(context.destination)

    const audioContext = new AudioContext();
    
    //create mediaElementSourceNode for our elem - <audio>
    const audioSource = audioContext.createMediaElementSource(audioElem);
    
    // create analyser node- freq and time domain info
    const analyser = audioContext.createAnalyser();
    
    audioSource.connect(analyser); //connect to src
    
    // connect to final destination of audio - eg. speakers
    analyser.connect(audioContext.destination);    

    //Fast Fourier Transform algo is used to get freq domain data
    // fftSize- prop of analyzerNode -window size of samples- 2^5 to ^15
    analyser.fftSize = 512;

    const bufferDataLength = analyser.frequencyBinCount; //total data pts available, half of fftSize

    const dataArr = new Uint8Array(bufferDataLength); //create unsigned 8 bit unt array, 8 bits= 1 byte

    // setInterval(function(){
    //     analyser.getByteFrequencyData(dataArr);
    //     console.log(dataArr);
    // },2000)
    
    function createSoundBars(){
        analyser.getByteFrequencyData(dataArr); // get frew data from samples

        bufferDataArr.forEach(dataValue =>{

        })
    }
})