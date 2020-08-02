window["ViewJSON"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/ViewJSON.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/FormActions.js":
/*!****************************!*\
  !*** ./src/FormActions.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return FormAction; });\nclass FormAction {\n  constructor(viewJSON) {\n    this.id = \"viewJSONActions\";\n    this.opened = true;\n    this.viewJSON = viewJSON;\n  }\n\n  createHideAllButton() {\n    if (!this.hideAllButton) {\n      this.hideAllButton = document.createElement(\"input\");\n      this.hideAllButton.id = \"hideAll\";\n      this.hideAllButton.type = \"button\";\n      this.hideAllButton.value = \"Hide All\";\n    }\n  }\n\n  createSearchForm() {\n    if (!this.searchInput) {\n      this.searchInput = document.createElement(\"input\");\n      this.searchInput.name = \"search\";\n\n      this.searchButton = document.createElement(\"input\");\n      this.searchButton.type = \"submit\";\n      this.searchButton.id = \"search\";\n      this.searchButton.value = \"Search\";\n\n      this.resetButton = document.createElement(\"input\");\n      this.resetButton.type = \"button\";\n      this.resetButton.id = \"reset\";\n      this.resetButton.value = \"Reset\";\n    }\n  }\n\n  addEvents() {\n    let self = this;\n\n    if (!self.hideAllAction) {\n      self.hideAllAction = function (e) {\n        e.preventDefault();\n        self.viewJSON.hideAll();\n      };\n    }\n\n    if (!self.searchAction) {\n      self.searchAction = function (e) {\n        e.preventDefault();\n        self.viewJSON.search.reset();\n        self.viewJSON.search.searchByKeyAndValue(e);\n      };\n    }\n\n    if (!self.resetAction) {\n      self.resetAction = function (e) {\n        self.viewJSON.search.reset();\n        self.viewJSON.generate();\n      };\n    }\n\n    this.hideAllButton.addEventListener(\"click\", this.hideAllAction);\n    this.resetButton.addEventListener(\"click\", this.resetAction);\n    this.actionsElement.addEventListener(\"submit\", this.searchAction);\n  }\n\n  clearEvents() {\n    this.hideAllButton.removeEventListener(\"click\", this.hideAllAction);\n    this.resetButton.removeEventListener(\"click\", this.resetAction);\n    this.actionsElement.removeEventListener(\"submit\", this.searchAction);\n  }\n\n  generate() {\n    if (!this.actionsElement) {\n      this.actionsElement = document.createElement(\"form\");\n      this.actionsElement.id = this.id;\n\n      this.createHideAllButton();\n      this.createSearchForm();\n\n      this.actionsElement.appendChild(this.hideAllButton);\n\n      this.actionsElement.appendChild(this.resetButton);\n      this.actionsElement.appendChild(this.searchButton);\n      this.actionsElement.appendChild(this.searchInput);\n    }\n\n    return this.actionsElement;\n  }\n}\n\n\n//# sourceURL=webpack://ViewJSON/./src/FormActions.js?");

/***/ }),

/***/ "./src/Search.js":
/*!***********************!*\
  !*** ./src/Search.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Search; });\nclass Search {\n  constructor(viewJson) {\n    this.searchResults = {\n      byKey: [],\n      byValue: [],\n    };\n    this.resultClassName = \"searchResultItem\";\n    this.viewJson = viewJson;\n    this.searchResultsId = \"searchResultsMainBlock\";\n  }\n\n  clickEventListener(e) {\n    if (/searchHeader/.test(e.target.className)) {\n      let searchResultsHeader = e.target,\n        searchResults = searchResultsHeader.nextElementSibling,\n        classList = searchResults.className.split(\" \"),\n        visibility = classList.indexOf(\"jv-visible\");\n\n      if (visibility === -1) {\n        classList[classList.length] = \"jv-visible\";\n        searchResultsHeader.className += \" open\";\n      } else {\n        classList.splice(visibility, 1);\n        searchResultsHeader.className = searchResultsHeader.className.replace(\n          /\\sopen/g,\n          \"\"\n        );\n      }\n\n      searchResults.className = classList.join(\" \");\n    }\n  }\n\n  searchByKeyAndValue(ev) {\n    ev.preventDefault();\n    let key = document.getElementsByName(\"search\")[0].value.toLowerCase();\n\n    if (this.viewJson.json && typeof this.viewJson.json === \"object\") {\n      if (Array.isArray(this.viewJson.json)) {\n        this.searchInArray(key, this.viewJson.json);\n      } else {\n        this.searchInObject(key, this.viewJson.json);\n      }\n    }\n\n    this.renderSearchResults();\n    this.viewJson.addEvents();\n  }\n\n  searchInArray(key, arr) {\n    for (let i = 0; i < arr.length; i++) {\n      if (arr[i] && typeof arr[i] === \"object\") {\n        if (Array.isArray(arr[i])) {\n          this.searchInArray(key, arr[i]);\n        } else {\n          this.searchInObject(key, arr[i]);\n        }\n      } else if (arr[i].toString().toLowerCase().indexOf(key) !== -1) {\n        this.searchResults.byValue.push(arr[i]);\n      }\n    }\n  }\n\n  searchInObject(key, obj) {\n    let res = {};\n\n    for (let k in obj) {\n      if (k.toLowerCase().indexOf(key) !== -1) {\n        res[k] = obj[k];\n        this.searchResults.byKey.push(Object.assign({}, res));\n        res = {};\n      }\n\n      if (obj[k] && typeof obj[k] === \"object\") {\n        if (Array.isArray(obj[k])) {\n          this.searchInArray(key, obj[k]);\n        } else {\n          this.searchInObject(key, obj[k]);\n        }\n      } else if (\n        obj[k] &&\n        obj[k].toString().toLowerCase().indexOf(key) !== -1\n      ) {\n        res[k] = obj[k];\n        this.searchResults.byValue.push(Object.assign({}, res));\n        res = {};\n      }\n    }\n  }\n\n  hideAllSearchResults() {\n    this.searchResultsElements = this.searchResultsMainElement.getElementsByClassName(\n      this.resultClassName\n    );\n\n    for (let i = 0; i < this.searchResultsElements.length; i++) {\n      this.viewJson.hideAllJson(this.searchResultsElements[i]);\n    }\n  }\n\n  generateTypeOfSearchResults(results, type) {\n    let html = \"\";\n\n    if (!this[`searchHeader_${type}`]) {\n      this[`searchHeader_${type}`] = document.createElement(\"h4\");\n    }\n\n    this[`searchHeader_${type}`].className = `searchHeader${\n      !results.length ? \" nothingFound\" : \" open\"\n    }`;\n    this[\n      `searchHeader_${type}`\n    ].innerHTML = `by ${type} (${results.length} found):`;\n\n    if (!this[`searchResults_${type}`]) {\n      this[`searchResults_${type}`] = document.createElement(\"div\");\n    }\n\n    this[`searchResults_${type}`].className = `searchResults jv-visible`;\n\n    if (results.length >= 1) {\n      for (let i = 0; i < results.length; i++) {\n        html += `<div class=\"${\n          this.resultClassName\n        }\">${this.viewJson.jsonToHTML(results[i])}</div>`;\n      }\n    } else {\n      html += `<p> Nothing found </p>`;\n    }\n\n    this[`searchResults_${type}`].innerHTML = html;\n  }\n\n  renderSearchResults() {\n    if (!this.searchHeader) {\n      this.searchHeader = document.createElement(\"h3\");\n      this.searchHeader.innerHTML = \"Search Results:\";\n    }\n\n    this.generateTypeOfSearchResults(this.searchResults.byKey, \"key\");\n    this.generateTypeOfSearchResults(this.searchResults.byValue, \"value\");\n\n    if (!this.searchResultsMainElement) {\n      this.searchResultsMainElement = document.createElement(\"div\");\n      this.searchResultsMainElement.id = this.searchResultsId;\n\n      this.searchResultsMainElement.appendChild(this.searchHeader);\n      this.searchResultsMainElement.appendChild(this.searchHeader_key);\n      this.searchResultsMainElement.appendChild(this.searchResults_key);\n      this.searchResultsMainElement.appendChild(this.searchHeader_value);\n      this.searchResultsMainElement.appendChild(this.searchResults_value);\n\n      this.searchResultsMainElement.addEventListener(\n        \"click\",\n        this.clickEventListener\n      );\n      this.searchResultsMainElement.addEventListener(\n        \"click\",\n        this.viewJson.clickEventListener\n      );\n    }\n\n    if (this.viewJson.state === 0) {\n      this.viewJson.el.replaceChild(\n        this.searchResultsMainElement,\n        this.viewJson.mainElement\n      );\n      this.viewJson.state = 1;\n    }\n\n    this.hideAllSearchResults();\n  }\n\n  reset() {\n    this.searchResults.byKey = [];\n    this.searchResults.byValue = [];\n  }\n}\n\n\n//# sourceURL=webpack://ViewJSON/./src/Search.js?");

/***/ }),

/***/ "./src/ViewJSON.js":
/*!*************************!*\
  !*** ./src/ViewJSON.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ViewJSON; });\n/* harmony import */ var _Search__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Search */ \"./src/Search.js\");\n/* harmony import */ var _FormActions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FormActions */ \"./src/FormActions.js\");\n\n\n\nclass ViewJSON {\n  constructor(el = document.body, json = \"\", settings = \"\") {\n    this.el = el;\n    this.mainId = \"viewJsonMainBlock\";\n\n    try {\n      this.json = JSON.parse(json.replace(/\\s/g, \"\"));\n      this.settings = JSON.parse(settings.replace(/\\/\\/.*\\n/g, \"\"));\n\n      this.search = new _Search__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this);\n      this.form = new _FormActions__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this);\n\n      this.state = 0; // 0 - json, 1 - search results\n      this.root = this.settings.root || this.json;\n    } catch (e) {\n      this.errorMessage = e.message;\n      console.error(e);\n    }\n  }\n\n  clickEventListener(e) {\n    if (/key/.test(e.target.className)) {\n      let parentElement = e.target.parentNode;\n      let classList = parentElement.className.split(\" \");\n      let visibility = classList.indexOf(\"jv-invisible\");\n\n      if (visibility === -1) {\n        visibility = classList.indexOf(\"jv-visible\");\n        if (visibility === -1) {\n          visibility = classList.length;\n        }\n        classList[visibility] = \"jv-invisible\";\n      } else {\n        classList[visibility] = \"jv-visible\";\n      }\n\n      parentElement.className = classList.join(\" \");\n    }\n  }\n\n  numberToHTML(json) {\n    return `<span class=\"number\">${json}</span>`;\n  }\n\n  stringToHTML(json) {\n    return `<span class=\"string\"><span class=\"quot\">\"</span>${json}<span class=\"quot\">\"</span></span>`;\n  }\n\n  dateToHTML(json) {\n    let dt = new Date(json);\n    return `<span class=\"boolean\">${dt.toDateString()}</span>`;\n  }\n\n  booleanToHTML(json) {\n    return `<span class=\"boolean\">${\n      this.settings.boolAppearence[+json]\n    }</span>`;\n  }\n\n  nullToHTML() {\n    return `<span class=\"null\">${settings.nullAppearence}</span>`;\n  }\n\n  undefinedToHTML(json) {\n    return `<span class=\"undefined\">${json}</span>`;\n  }\n\n  objectToHTML(json) {\n    let html = \"\";\n    html += '<ul class=\"objectProperties\">';\n\n    for (let i in json) {\n      let key = i;\n\n      if (\n        this.settings.hidePropertiesByKey.indexOf(key) === -1 &&\n        this.settings.hidePropertiesByValue.indexOf(json[key]) === -1\n      ) {\n        if (this.settings.formatCamelCase) {\n          let words = key.match(/((^[a-z])|[A-Z])[a-z]+/g);\n          key = words ? words.join(\" \") : key;\n        }\n\n        html += `<li>${this.jsonToHTML(json[i], key)}</li>`;\n      }\n    }\n\n    return html;\n  }\n\n  arrayToHTML(json, key) {\n    let html = \"\",\n      elements = json.filter(\n        (value) => this.settings.hidePropertiesByValue.indexOf(value) === -1\n      );\n\n    html += '<ul class=\"arrayElements\">';\n\n    if (this.settings.keysForArrays[key]) {\n      html += elements\n        .map((a, i) => {\n          let keyForCurrentElement;\n\n          keyForCurrentElement = this.settings.keysForArrays[key].replace(\n            /\\{(\\w|\\.)+\\}/g,\n            function (str) {\n              let seq = str.slice(1, -1).split(\".\"),\n                k = a[seq[0]];\n\n              for (let j = 1; j < seq.length; j++) {\n                if (k && k[seq[j]]) {\n                  k = k[seq[j]];\n                } else {\n                  k = \"-\";\n                  break;\n                }\n              }\n\n              return k || \"-\";\n            }\n          );\n\n          return `<li class=\"element\">${this.jsonToHTML(\n            a,\n            keyForCurrentElement\n          )}</li>`;\n        })\n        .join(\"\");\n    } else {\n      html += elements\n        .map((a, i) => {\n          return `<li class=\"element\">${this.jsonToHTML(a, i)}</li>`;\n        })\n        .join(\"\");\n    }\n    html += \"</ul>\";\n\n    return html;\n  }\n\n  arrayToTableHTML(json) {\n    let html = \"\",\n      elements = json.filter(\n        (value) => this.settings.hidePropertiesByValue.indexOf(value) === -1\n      );\n\n    html += '<table class=\"arrayElements\">';\n    html += \"<thead><tr>\";\n\n    for (let key in elements[0]) {\n      if (this.settings.hidePropertiesByKey.indexOf(key) === -1) {\n        html += `<th>${key}</th>`;\n      }\n    }\n\n    html += \"</tr></thead>\";\n    html += \"<tbody>\";\n\n    html += elements\n      .map((a, i) => {\n        let h = \"<tr>\";\n\n        for (let k in a) {\n          if (this.settings.hidePropertiesByKey.indexOf(k) === -1) {\n            h += \"<td>\";\n            if (a[k] && typeof a[k] === \"object\") {\n              h += \"[Object]\";\n            } else {\n              h += a[k] || this.settings.nullAppearence;\n            }\n\n            h += \"</td>\";\n          }\n        }\n\n        h += \"</tr>\";\n\n        return h;\n      })\n      .join(\"\");\n\n    html += \"</tbody>\";\n    html += \"</table>\";\n\n    return html;\n  }\n\n  arrayToListHTML(json) {}\n\n  jsonToHTML(json = this.json, key) {\n    let type = typeof json,\n      html = \"\";\n\n    if (type === \"object\") {\n      if (Array.isArray(json)) {\n        type = \"array\";\n      } else if (json === null) {\n        type = \"null\";\n        if (this.settings.hidePropertiesByValue.indexOf(null) !== -1) {\n          return html;\n        }\n      }\n    } else if (this.settings.dateAppearence.keys.indexOf(key) !== -1) {\n      type = \"date\";\n    }\n\n    html += `<div class=\"${type}\">`;\n    html +=\n      key !== undefined\n        ? `<span class=\"key\">${key}</span><span class=\"colon\">:</span> `\n        : \"\";\n    if (type === \"array\") {\n      if (this.settings.arraysAsTable.includes(key)) {\n        html += this.arrayToTableHTML(json);\n      } else {\n        html += this.arrayToHTML(json, key);\n      }\n    } else {\n      html += this[`${type}ToHTML`](json);\n    }\n    html += \"</div>\";\n\n    return html;\n  }\n\n  hideObjectOrArray(parentElement) {\n    const classList = parentElement.className.split(\" \");\n    let visibility = classList.indexOf(\"jv-invisible\");\n\n    if (visibility === -1) {\n      visibility = classList.indexOf(\"jv-visible\");\n      if (visibility === -1) {\n        visibility = classList.length;\n      }\n      classList[visibility] = \"jv-invisible\";\n    }\n\n    parentElement.className = classList.join(\" \");\n  }\n\n  hideAllJson(mainElement = this.mainElement) {\n    const mainNode = mainElement.children[0];\n    const allObjectElements = mainNode.getElementsByClassName(\"object\");\n    const allArrayElements = mainNode.getElementsByClassName(\"array\");\n\n    for (let i = 0; i < allObjectElements.length; i++) {\n      this.hideObjectOrArray(allObjectElements[i]);\n    }\n\n    for (let i = 0; i < allArrayElements.length; i++) {\n      this.hideObjectOrArray(allArrayElements[i]);\n    }\n  }\n\n  hideAll() {\n    if (this.state) {\n      // searchResults\n      this.search.hideAllSearchResults();\n    } else {\n      // json\n      this.hideAllJson();\n    }\n  }\n\n  generateJSON(json = this.root) {\n    this.mainElement.innerHTML = this.jsonToHTML(json);\n    this.state = 0;\n  }\n\n  generate() {\n    if (!this.form.actionsElement && this.settings.showSearchPanel) {\n      this.el.appendChild(this.form.generate());\n      this.form.addEvents();\n    }\n\n    if (this.state) {\n      this.el.replaceChild(\n        this.mainElement,\n        this.search.searchResultsMainElement\n      );\n      this.state = 0;\n    }\n\n    this.hideAll();\n  }\n\n  render() {\n    if (this.settings.root) {\n      let rootKeys = this.settings.root.split(\"/\");\n      for (let i = 0; i < rootKeys.length; i++) {\n        this.root = this.root[rootKeys[i]];\n      }\n    }\n\n    this.generateJSON();\n    this.generate();\n\n    this.el.appendChild(this.mainElement);\n    this.addEvents();\n  }\n\n  start() {\n    if (!this.el) {\n      console.error(\"Incorrect HTML element passed to class\");\n    }\n\n    if (!this.json) {\n      this.el.innerHTML = `<div id=\"jsonParseError\"><p>There is an error in json file</p><p>Error message: ${this.errorMessage}</p></div>`;\n      return;\n    }\n\n    if (!this.settings) {\n      this.el.innerHTML = `<div id=\"jsonParseError\"><p>There is an error in settings json</p><p>Error message: ${this.errorMessage}</p></div>`;\n      return;\n    }\n\n    this.el.innerHTML = \"\";\n    this.mainElement = document.createElement(\"div\");\n    this.mainElement.id = this.mainId;\n\n    this.render();\n  }\n\n  addEvents() {\n    let self = this;\n\n    self.mainElement.addEventListener(\"click\", self.clickEventListener);\n  }\n\n  clearEvents() {\n    let self = this;\n\n    if (self.mainElement) {\n      self.mainElement.removeEventListener(\"click\", self.clickEventListener);\n    }\n  }\n\n  clear() {\n    this.el.innerHTML = \"\";\n    this.clearEvents();\n    delete this.mainElement;\n\n    if (this.search) {\n      delete this.search.searchResultsMainElement;\n    }\n  }\n}\n\n\n//# sourceURL=webpack://ViewJSON/./src/ViewJSON.js?");

/***/ })

/******/ });