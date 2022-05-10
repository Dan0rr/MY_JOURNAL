if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {video.srcObject = stream;})
        .catch(function (err0r) {
        console.log("Something went wrong!");
        });
    };
let canvas = document.querySelector("#canvas");

const button = document.querySelector('button');
button.addEventListener('click', event => {
       
canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
const image64 = canvas.toDataURL('image/jpeg', 0.5);

if('geolocation' in navigator) {
    console.log('geolocation is available')
    navigator.geolocation.getCurrentPosition(async position => {

        const lat =  position.coords.latitude;
        //document.getElementById('latitude').textContent = lat ; use to showcase lat

        const lon = position.coords.longitude;
        //document.getElementById('longitude').textContent = lon ; use to showcase lon
        
        const mood = document.getElementById('userInput').value;

        const data = { lat, lon, mood, image64};
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        }
        const response = await fetch('/api' , options);
        const json = await response.json();
        document.getElementById('userInput').value = '';
    });
    } else {
    const noGeoLoc = ('Geolocation is NOT available');
    document.getElementById('latitude').textContent = noGeoLoc;
    document.getElementById('longitude').textContent = noGeoLoc;
    }
});

let n =  new Date();
let y = n.getFullYear();
let m = n.getMonth() + 1;
let d = n.getDate();
document.getElementById("todayDate").innerHTML = m + "/" + d + "/" + y;