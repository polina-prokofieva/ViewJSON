'use strict';

document.addEventListener('DOMContentLoaded', function(){
    let json = '',
        vJSON,
        element = document.getElementById('json'),
        form = document.getElementById('demo'),
        settings;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        json = e.target[0].value;
        settings = e.target[1].value;

        if(typeof vJSON === "object") {
            vJSON.clear();
        }
        vJSON = new ViewJSON(element, json, settings);
        vJSON.start();
    });
});