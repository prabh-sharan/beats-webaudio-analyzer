const input = document.querySelector("input");
const audioElem = document.querySelector("audio");

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
    
})