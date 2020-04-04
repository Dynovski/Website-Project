// After page load refresh the date each second
window.onload = setInterval(setDate, 1000);

function setDate() {
    let date = new Date();
    let day = date.getDate();
    let dayIndex = date.getDay();
    let monthIndex = date.getMonth();
    let year = date.getFullYear();
    let weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 
                'July', 'August', 'September', 'October', 'November', 'December'];
    let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

    document.getElementById("current-date").innerHTML = weekdays[dayIndex] + ", " + day + " " 
        + months[monthIndex] + " " + year + " " + hour + ":" + minutes + ":" + seconds;
}