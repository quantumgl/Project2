﻿var debug = 1;
var intervalID = window.setInterval(myCallback, 2000);
function myCallback() {

    if (debug == 1)
    {
        console.log("httpGet")
    }
}