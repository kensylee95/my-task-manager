function formatTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return hours + ":" + (minutes < 10 ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + seconds + ' ' + ampm;
 }

 function timer() {
    var currentDate = new Date();
    var formattedTime = formatTime(currentDate);
    document.getElementById('time').value = formattedTime;
    setTimeout(timer, 1000);
 }
 timer();