function formatRealTimeDate(date) {
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
       "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var suffix = "";
    if (day % 10 == 1 && day != 11) {
       suffix = "st";
    } else if (day % 10 == 2 && day != 12) {
       suffix = "nd";
    } else if (day % 10 == 3 && day != 13) {
       suffix = "rd";
    } else {
       suffix = "th";
    }
    return monthNames[monthIndex] + " " + day + suffix + ", " + year + ".";
 }

 function updateRealTime() {
    var currentDate = new Date();
    var formattedDate = formatRealTimeDate(currentDate);
    document.getElementById('real-time').value = formattedDate;
    setTimeout(updateRealTime, 1000);
 }
 updateRealTime();