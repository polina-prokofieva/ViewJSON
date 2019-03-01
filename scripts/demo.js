'use strict';

document.addEventListener('DOMContentLoaded', function(){
    let json = '',
        vJSON,
        element = document.getElementById('json'),
        form = document.getElementById('demo');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        json = e.target[0].value;

        if(typeof vJSON === "object") {
            vJSON.clear();
        }
        vJSON = new ViewJSON(element, json);
        vJSON.render();
    });
});