'use strict';

class ViewJSON {
    constructor (el = document.body, json = '', settings = '') {
        this.el = el;
        this.mainId = 'viewJsonMainBlock';

        try {
            this.json = JSON.parse(json.replace(/\s/g, ''));
            this.settings = JSON.parse(settings.replace(/\/\/.*\n/g, ''));

            this.search = new Search(this);
            this.form = new FormAction(this);

            this.state = 0; // 0 - json, 1 - search results
            this.root = this.settings.root || this.json;

        } catch (e) {
            this.errorMessage = e.message;
            console.error(e);
        }
    }

    clickEventListener (e) {
        if(/key/.test(e.target.className)) {
            let parentElement = e.target.parentNode,
                classList = parentElement.className.split(' '),
                visibility = classList.indexOf('invisible');

            if(visibility === -1) {
                visibility = classList.indexOf('visible');
                if(visibility === -1) {
                    visibility = classList.length;
                }
                classList[visibility] = 'invisible';
            } else {
                classList[visibility] = 'visible';
            }

            parentElement.className = classList.join(' ');
        }
    }

    numberToHTML (json) {
        return `<span class="number">${json}</span>`;
    }

    stringToHTML (json) {
        return `<span class="string"><span class="quot">"</span>${json}<span class="quot">"</span></span>`
    }

    dateToHTML (json) {
        let dt = new Date(json);
        return `<span class="boolean">${dt.toDateString()}</span>`;
    }

    booleanToHTML (json) {
        return `<span class="boolean">${this.settings.boolAppearence[+json]}</span>`;
    }

    nullToHTML () {
        return `<span class="null">${settings.nullAppearence}</span>`;
    }

    undefinedToHTML (json) {
        return `<span class="undefined">${json}</span>`;
    }

    objectToHTML (json) {
        let html = '';
        html += '<ul class="objectProperties">';

        for(let i in json) {
            let key  = i;

            if (this.settings.hidePropertiesByKey.indexOf(key) === -1 &&
                this.settings.hidePropertiesByValue.indexOf(json[key]) === -1) {

                if(this.settings.formatCamelCase) {
                    let words = key.match(/((^[a-z])|[A-Z])[a-z]+/g);
                    key = words ? words.join(' ') : key;
                }

                html += `<li>${this.jsonToHTML(json[i], key)}</li>`;
            }
        }

        return html;
    }

    arrayToHTML (json, key) {
        let html = '',
            elements = json.filter(value => this.settings.hidePropertiesByValue.indexOf(value) === -1);

        html += '<ul class="arrayElements">';

        if(this.settings.keysForArrays[key]) {
            html += elements
                .map((a, i) => {
                    let keyForCurrentElement;

                    keyForCurrentElement = this.settings.keysForArrays[key].replace(/\{(\w|\.)+\}/g, function(str){
                        let seq = str.slice(1, -1).split('.'),
                            k = a[seq[0]];

                        for(let j = 1; j < seq.length; j++) {
                            if(k[seq[j]]) {
                                k = k[seq[j]];
                            } else {
                                k = '-';
                                break;
                            }
                        }

                        return k || "-";
                    });

                    return `<li class="element">${this.jsonToHTML(a, keyForCurrentElement)}</li>`;

                })
                .join('');
        } else {
            html += elements
                .map((a, i) => {
                    return `<li class="element">${this.jsonToHTML(a, i)}</li>`
                })
                .join('');

        }
        html += '</ul>';

        return html;
    }

    arrayToTableHTML (json) {
        let html = '',
            elements = json.filter(value => this.settings.hidePropertiesByValue.indexOf(value) === -1);

        html += '<table class="arrayElements">';
        html += '<thead><tr>';

        for(let key in elements[0]) {
            if (this.settings.hidePropertiesByKey.indexOf(key) === -1) {
                html += `<th>${key}</th>`
            }
        }

        html += '</tr></thead>';
        html += '<tbody>';

        html += elements.map((a, i) => {
            let h = '<tr>';

            for(let k in a) {
                if (this.settings.hidePropertiesByKey.indexOf(k) === -1) {
                    h += '<td>';
                    if(a[k] && typeof a[k] === 'object') {
                        h += '[Object]';
                    } else {
                        h += a[k] || this.settings.nullAppearence;
                    }

                    h += '</td>';
                }
            }

            h += '</tr>';

            return h;
        }).join('');

        html += '</tbody>';
        html += '</table>'


        return html;
    }

    arrayToListHTML (json) {

    }

    jsonToHTML (json = this.json, key) {
        let type = typeof json,
            html = '';

        if(type === 'object') {
            if (Array.isArray(json)) {
                type = 'array';
            } else if (json === null){
                type = 'null';
                if(this.settings.hidePropertiesByValue.indexOf(null) !== -1) {
                    return html;
                }
            }
        } else if (this.settings.dateAppearence.keys.indexOf(key) !== -1) {
            type = 'date';
        }

        html += `<div class="${type}">`;
        html += (key !== undefined) ? `<span class="key">${key}</span><span class="colon">:</span> ` : '';
        if(type === 'array') {
            if (this.settings.arraysAsTable.includes(key)) {
                html += this.arrayToTableHTML(json);
            } else {
                html += this.arrayToHTML(json, key);
            }
        } else {
            html += this[`${type}ToHTML`](json);
        }
        html += '</div>';

        return html;
    }

    hideObjectOrArray (parentElement) {
        let classList = parentElement.className.split(' '),
            visibility = classList.indexOf('invisible');

        if(visibility === -1) {
            visibility = classList.indexOf('visible');
            if(visibility === -1) {
                visibility = classList.length;
            }
            classList[visibility] = 'invisible';
        }

        parentElement.className = classList.join(' ');
    }

    hideAllJson (mainElement = this.mainElement) {
        let allObjectElements,
            allArrayElements,
            mainNode = mainElement.children[0];

        allObjectElements = mainNode.getElementsByClassName('object');
        allArrayElements = mainNode.getElementsByClassName('array');

        for(let i = 0; i < allObjectElements.length; i++) {
            this.hideObjectOrArray(allObjectElements[i]);
        }

        for(let i = 0; i < allArrayElements.length; i++) {
            this.hideObjectOrArray(allArrayElements[i]);
        }
    }

    hideAll () {
        if(this.state) { // searchResults
            this.search.hideAllSearchResults();
        } else { // json
            this.hideAllJson();
        }
    }

    generateJSON (json = this.root) {
        this.mainElement.innerHTML = this.jsonToHTML(json);
        this.state = 0;
    }

    generate () {
        if(!this.form.actionsElement && this.settings.showSearchPanel) {
            this.el.appendChild(this.form.generate());
            this.form.addEvents();
        }

        if(this.state) {
            this.el.replaceChild(this.mainElement, this.search.searchResultsMainElement);
            this.state = 0;
        }

        this.hideAll();
    }

    render () {
        if (this.settings.root) {
            let rootKeys = this.settings.root.split('/');
            for (let i = 0; i < rootKeys.length; i++) {
                this.root = this.root[rootKeys[i]];
            }
        }

        this.generateJSON();
        this.generate();

        this.el.appendChild(this.mainElement);
        this.addEvents();
    }

    start () {
        if(!this.json) {
            this.el.innerHTML = `<div id="jsonParseError"><p>There is an error in json file</p><p>Error message: ${this.errorMessage}</p></div>`;
            return;
        }

      if(!this.settings) {
        this.el.innerHTML = `<div id="jsonParseError"><p>There is an error in settings json</p><p>Error message: ${this.errorMessage}</p></div>`;
        return;
      }

        this.el.innerHTML = '';
        this.mainElement = document.createElement('div');
        this.mainElement.id = this.mainId;

        this.render();
    }

    addEvents () {
        let self = this;

        self.mainElement.addEventListener('click', self.clickEventListener);
    }

    clearEvents () {
        let self = this;

        if(self.mainElement) {
            self.mainElement.removeEventListener('click', self.clickEventListener);
        }
    }

    clear () {
        this.el.innerHTML = "";
        this.clearEvents();
        delete this.mainElement;

        if(this.search) {
            delete this.search.searchResultsMainElement;
        }
    }
}