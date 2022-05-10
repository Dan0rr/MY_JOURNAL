const container = document.getElementById("logContainer");

getData();
async function getData() {
    const response = await fetch('/api');
    const data = await response.json();

    data.sort((a,b)=> b.timestamp-a.timestamp);

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    } 
    for (item of data){
        const root = document.createElement('p');
        const image = document.createElement('img');
        const mood = document.createElement('div');
        const geo = document.createElement('div');
        const date = document.createElement('div');

        const dateString = new Date(item.timestamp).toLocaleString();
    
        image.src=item.image64;
        mood.textContent = `Mood: ${item.mood}`;
        geo.textContent = `Location: ${Math.round((item.lat)*100)/100}˚, ${Math.round((item.lon)*100)/100}˚`;
        date.textContent = 'Date & Time: '+ dateString;

        root.append(image, mood, geo, date); // controls page layout
        logContainer.append(root);
        document.querySelector("img").style.cssText="height : 240px; width : 320px;"
        root.setAttribute("id","dataContainer")
        mood.setAttribute("id", "data");
        geo.setAttribute("id", "data");
        date.setAttribute("id", "data");

    }
};

// button to remove previous data from the screen  vvv
// const button = document.getElementById('prevEntry');
// button.addEventListener('click', event => {
//     let dataToRemove = document.getElementById('dataContainer');
//     let node = document.getElementById('logContainer');
//     node.removeChild(dataToRemove);
//     i--;
//     getData();
// });