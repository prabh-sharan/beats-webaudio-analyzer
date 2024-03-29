const input = document.querySelector("input");
const audioElem = document.querySelector("audio");
const canvas = document.querySelector("canvas");
const container = document.querySelector(".container");
const context = canvas.getContext("2d");

canvas.width = container.clientWidth;
canvas.height = container.clientHeight;


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

    //total data pts available or no. of sound bars we have to create, half of fftSize
    const bufferDataLength = analyser.frequencyBinCount;

    const dataArr = new Uint8Array(bufferDataLength); //create unsigned 8 bit unt array, 8 bits= 1 byte

    const barWidth = canvas.width / bufferDataLength; //each sound bar width
    let x = 0;
    function createSoundBars(){
        x = 0;
        context.clearRect(0, 0, canvas.width, canvas.height);

        analyser.getByteFrequencyData(dataArr); // get freq data from samples

        dataArr.forEach(dataValue =>{
            const barHeight = dataValue;

            // now using canvas to create sound bars
            const red = (barHeight * 2) % 150;
            const green = (barHeight * 5) % 200;
            const blue = (barHeight * 7) % 120;
            context.fillStyle = `rgb(${red}, ${green}, ${blue})`;
            context.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            x += barWidth;
            
        })
        //recursive call-back until audio not ended
        if(!audioElem.ended) requestAnimationFrame(createSoundBars); 
    }

    createSoundBars();
})