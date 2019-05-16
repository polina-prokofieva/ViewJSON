'use strict';

document.addEventListener('DOMContentLoaded', function(){
    let json = '',
        vJSON,
        element = document.getElementById('json'),
        xhr = new XMLHttpRequest(),
        settings = {
            root: "",
            formatCamelCase: true,
            formatDate: false,
            nullAppearence: "-",
            boolAppearence: ["No", "Yes"],
            hidePropertiesByValue: [
                null,
                0,
                ""
            ],
            hidePropertiesByKey: [
                "OverdraftLimit",
                "Description",
                "Id"
            ],
            dateAppearence: {
                keys: [
                    "Date"
                ]
            },
            hideArrayElements: false,
            showSearchPanel : true,
            arraysAsTable: [
                "Transactions"
            ],
            keysForArrays: {
                Accounts: "Title"
            }
        };

    xhr.open('GET', 'data/data01.json', true);
    xhr.send();

    xhr.onreadystatechange = function() { // (3)
        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
            console.error( xhr.status + ': ' + xhr.statusText );
        } else {
            json = xhr.responseText;
            vJSON = new ViewJSON(element, json, settings);
            vJSON.start();
        }
    }
});