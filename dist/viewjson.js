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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return FormAction; });\nclass FormAction {\r\n  constructor(viewJSON) {\r\n    this.id = \"viewJSONActions\";\r\n    this.opened = true;\r\n    this.viewJSON = viewJSON;\r\n  }\r\n\r\n  createHideAllButton() {\r\n    if (!this.hideAllButton) {\r\n      this.hideAllButton = document.createElement(\"input\");\r\n      this.hideAllButton.id = \"hideAll\";\r\n      this.hideAllButton.type = \"button\";\r\n      this.hideAllButton.value = \"Hide All\";\r\n    }\r\n  }\r\n\r\n  createSearchForm() {\r\n    if (!this.searchInput) {\r\n      this.searchInput = document.createElement(\"input\");\r\n      this.searchInput.name = \"search\";\r\n\r\n      this.searchButton = document.createElement(\"input\");\r\n      this.searchButton.type = \"submit\";\r\n      this.searchButton.id = \"search\";\r\n      this.searchButton.value = \"Search\";\r\n\r\n      this.resetButton = document.createElement(\"input\");\r\n      this.resetButton.type = \"button\";\r\n      this.resetButton.id = \"reset\";\r\n      this.resetButton.value = \"Reset\";\r\n    }\r\n  }\r\n\r\n  addEvents() {\r\n    let self = this;\r\n\r\n    if (!self.hideAllAction) {\r\n      self.hideAllAction = function (e) {\r\n        e.preventDefault();\r\n        self.viewJSON.hideAll();\r\n      };\r\n    }\r\n\r\n    if (!self.searchAction) {\r\n      self.searchAction = function (e) {\r\n        e.preventDefault();\r\n        self.viewJSON.search.reset();\r\n        self.viewJSON.search.searchByKeyAndValue(e);\r\n      };\r\n    }\r\n\r\n    if (!self.resetAction) {\r\n      self.resetAction = function (e) {\r\n        self.viewJSON.search.reset();\r\n        self.viewJSON.generate();\r\n      };\r\n    }\r\n\r\n    this.hideAllButton.addEventListener(\"click\", this.hideAllAction);\r\n    this.resetButton.addEventListener(\"click\", this.resetAction);\r\n    this.actionsElement.addEventListener(\"submit\", this.searchAction);\r\n  }\r\n\r\n  clearEvents() {\r\n    this.hideAllButton.removeEventListener(\"click\", this.hideAllAction);\r\n    this.resetButton.removeEventListener(\"click\", this.resetAction);\r\n    this.actionsElement.removeEventListener(\"submit\", this.searchAction);\r\n  }\r\n\r\n  generate() {\r\n    if (!this.actionsElement) {\r\n      this.actionsElement = document.createElement(\"form\");\r\n      this.actionsElement.id = this.id;\r\n\r\n      this.createHideAllButton();\r\n      this.createSearchForm();\r\n\r\n      this.actionsElement.appendChild(this.hideAllButton);\r\n\r\n      this.actionsElement.appendChild(this.resetButton);\r\n      this.actionsElement.appendChild(this.searchButton);\r\n      this.actionsElement.appendChild(this.searchInput);\r\n    }\r\n\r\n    return this.actionsElement;\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://ViewJSON/./src/FormActions.js?");

/***/ }),

/***/ "./src/Render.js":
/*!***********************!*\
  !*** ./src/Render.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst numberValue = json => `<span class=\"number\">${json}</span>`;\r\n\r\nconst stringValue = json => `<span class=\"string\"><span class=\"quot\">\"</span>${json}<span class=\"quot\">\"</span></span>`;\r\n\r\nconst dateValue = json => {\r\n   let dt = new Date(json);\r\n   return `<span class=\"boolean\">${dt.toDateString()}</span>`;\r\n}\r\n\r\nconst booleanValue = (json, boolAppearence) => `<span class=\"boolean\">${boolAppearence[+json]}</span>`;\r\n\r\nconst nullValue = () => `<span class=\"null\">${settings.nullAppearence}</span>`;\r\n\r\nconst undefinedValue = json => `<span class=\"undefined\">${json}</span>`;\r\n\r\nconst Render = {\r\n    numberValue,\r\n    stringValue,\r\n    dateValue,\r\n    booleanValue,\r\n    nullValue,\r\n    undefinedValue\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Render);\n\n//# sourceURL=webpack://ViewJSON/./src/Render.js?");

/***/ }),

/***/ "./src/Search.js":
/*!***********************!*\
  !*** ./src/Search.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Search; });\nclass Search {\r\n  constructor(viewJson) {\r\n    this.searchResults = {\r\n      byKey: [],\r\n      byValue: [],\r\n    };\r\n    this.resultClassName = \"searchResultItem\";\r\n    this.viewJson = viewJson;\r\n    this.searchResultsId = \"searchResultsMainBlock\";\r\n  }\r\n\r\n  clickEventListener(e) {\r\n    if (/searchHeader/.test(e.target.className)) {\r\n      let searchResultsHeader = e.target,\r\n        searchResults = searchResultsHeader.nextElementSibling,\r\n        classList = searchResults.className.split(\" \"),\r\n        visibility = classList.indexOf(\"jv-visible\");\r\n\r\n      if (visibility === -1) {\r\n        classList[classList.length] = \"jv-visible\";\r\n        searchResultsHeader.className += \" open\";\r\n      } else {\r\n        classList.splice(visibility, 1);\r\n        searchResultsHeader.className = searchResultsHeader.className.replace(\r\n          /\\sopen/g,\r\n          \"\"\r\n        );\r\n      }\r\n\r\n      searchResults.className = classList.join(\" \");\r\n    }\r\n  }\r\n\r\n  searchByKeyAndValue(ev) {\r\n    ev.preventDefault();\r\n    let key = document.getElementsByName(\"search\")[0].value.toLowerCase();\r\n\r\n    if (this.viewJson.json && typeof this.viewJson.json === \"object\") {\r\n      if (Array.isArray(this.viewJson.json)) {\r\n        this.searchInArray(key, this.viewJson.json);\r\n      } else {\r\n        this.searchInObject(key, this.viewJson.json);\r\n      }\r\n    }\r\n\r\n    this.renderSearchResults();\r\n    this.viewJson.addEvents();\r\n  }\r\n\r\n  searchInArray(key, arr) {\r\n    for (let i = 0; i < arr.length; i++) {\r\n      if (arr[i] && typeof arr[i] === \"object\") {\r\n        if (Array.isArray(arr[i])) {\r\n          this.searchInArray(key, arr[i]);\r\n        } else {\r\n          this.searchInObject(key, arr[i]);\r\n        }\r\n      } else if (arr[i].toString().toLowerCase().indexOf(key) !== -1) {\r\n        this.searchResults.byValue.push(arr[i]);\r\n      }\r\n    }\r\n  }\r\n\r\n  searchInObject(key, obj) {\r\n    let res = {};\r\n\r\n    for (let k in obj) {\r\n      if (k.toLowerCase().indexOf(key) !== -1) {\r\n        res[k] = obj[k];\r\n        this.searchResults.byKey.push(Object.assign({}, res));\r\n        res = {};\r\n      }\r\n\r\n      if (obj[k] && typeof obj[k] === \"object\") {\r\n        if (Array.isArray(obj[k])) {\r\n          this.searchInArray(key, obj[k]);\r\n        } else {\r\n          this.searchInObject(key, obj[k]);\r\n        }\r\n      } else if (\r\n        obj[k] &&\r\n        obj[k].toString().toLowerCase().indexOf(key) !== -1\r\n      ) {\r\n        res[k] = obj[k];\r\n        this.searchResults.byValue.push(Object.assign({}, res));\r\n        res = {};\r\n      }\r\n    }\r\n  }\r\n\r\n  hideAllSearchResults() {\r\n    this.searchResultsElements = this.searchResultsMainElement.getElementsByClassName(\r\n      this.resultClassName\r\n    );\r\n\r\n    for (let i = 0; i < this.searchResultsElements.length; i++) {\r\n      this.viewJson.hideAllJson(this.searchResultsElements[i]);\r\n    }\r\n  }\r\n\r\n  generateTypeOfSearchResults(results, type) {\r\n    let html = \"\";\r\n\r\n    if (!this[`searchHeader_${type}`]) {\r\n      this[`searchHeader_${type}`] = document.createElement(\"h4\");\r\n    }\r\n\r\n    this[`searchHeader_${type}`].className = `searchHeader${\r\n      !results.length ? \" nothingFound\" : \" open\"\r\n    }`;\r\n    this[\r\n      `searchHeader_${type}`\r\n    ].innerHTML = `by ${type} (${results.length} found):`;\r\n\r\n    if (!this[`searchResults_${type}`]) {\r\n      this[`searchResults_${type}`] = document.createElement(\"div\");\r\n    }\r\n\r\n    this[`searchResults_${type}`].className = `searchResults jv-visible`;\r\n\r\n    if (results.length >= 1) {\r\n      for (let i = 0; i < results.length; i++) {\r\n        html += `<div class=\"${\r\n          this.resultClassName\r\n        }\">${this.viewJson.jsonToHTML(results[i])}</div>`;\r\n      }\r\n    } else {\r\n      html += `<p> Nothing found </p>`;\r\n    }\r\n\r\n    this[`searchResults_${type}`].innerHTML = html;\r\n  }\r\n\r\n  renderSearchResults() {\r\n    if (!this.searchHeader) {\r\n      this.searchHeader = document.createElement(\"h3\");\r\n      this.searchHeader.innerHTML = \"Search Results:\";\r\n    }\r\n\r\n    this.generateTypeOfSearchResults(this.searchResults.byKey, \"key\");\r\n    this.generateTypeOfSearchResults(this.searchResults.byValue, \"value\");\r\n\r\n    if (!this.searchResultsMainElement) {\r\n      this.searchResultsMainElement = document.createElement(\"div\");\r\n      this.searchResultsMainElement.id = this.searchResultsId;\r\n\r\n      this.searchResultsMainElement.appendChild(this.searchHeader);\r\n      this.searchResultsMainElement.appendChild(this.searchHeader_key);\r\n      this.searchResultsMainElement.appendChild(this.searchResults_key);\r\n      this.searchResultsMainElement.appendChild(this.searchHeader_value);\r\n      this.searchResultsMainElement.appendChild(this.searchResults_value);\r\n\r\n      this.searchResultsMainElement.addEventListener(\r\n        \"click\",\r\n        this.clickEventListener\r\n      );\r\n      this.searchResultsMainElement.addEventListener(\r\n        \"click\",\r\n        this.viewJson.clickEventListener\r\n      );\r\n    }\r\n\r\n    if (this.viewJson.state === 0) {\r\n      this.viewJson.el.replaceChild(\r\n        this.searchResultsMainElement,\r\n        this.viewJson.mainElement\r\n      );\r\n      this.viewJson.state = 1;\r\n    }\r\n\r\n    this.hideAllSearchResults();\r\n  }\r\n\r\n  reset() {\r\n    this.searchResults.byKey = [];\r\n    this.searchResults.byValue = [];\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://ViewJSON/./src/Search.js?");

/***/ }),

/***/ "./src/ViewJSON.js":
/*!*************************!*\
  !*** ./src/ViewJSON.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ViewJSON; });\n/* harmony import */ var _Search__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Search */ \"./src/Search.js\");\n/* harmony import */ var _FormActions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FormActions */ \"./src/FormActions.js\");\n/* harmony import */ var _Render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Render */ \"./src/Render.js\");\n\r\n\r\n\r\n\r\nclass ViewJSON {\r\n  constructor(el = document.body, json = \"\", settings = \"\") {\r\n    this.el = el;\r\n    this.mainId = \"viewJsonMainBlock\";\r\n\r\n    console.log(_Render__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\r\n\r\n    try {\r\n      this.json = JSON.parse(json.replace(/\\s/g, \"\"));\r\n      this.settings = JSON.parse(settings.replace(/\\/\\/.*\\n/g, \"\"));\r\n\r\n      this.search = new _Search__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this);\r\n      this.form = new _FormActions__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this);\r\n\r\n      this.state = 0; // 0 - json, 1 - search results\r\n      this.root = this.settings.root || this.json;\r\n    } catch (e) {\r\n      this.errorMessage = e.message;\r\n      console.error(e);\r\n    }\r\n  }\r\n\r\n  clickEventListener(e) {\r\n    if (/key/.test(e.target.className)) {\r\n      let parentElement = e.target.parentNode;\r\n      let classList = parentElement.className.split(\" \");\r\n      let visibility = classList.indexOf(\"jv-invisible\");\r\n\r\n      if (visibility === -1) {\r\n        visibility = classList.indexOf(\"jv-visible\");\r\n        if (visibility === -1) {\r\n          visibility = classList.length;\r\n        }\r\n        classList[visibility] = \"jv-invisible\";\r\n      } else {\r\n        classList[visibility] = \"jv-visible\";\r\n      }\r\n\r\n      parentElement.className = classList.join(\" \");\r\n    }\r\n  }\r\n\r\n  objectToHTML(json) {\r\n    let html = \"\";\r\n    html += '<ul class=\"objectProperties\">';\r\n\r\n    for (let i in json) {\r\n      let key = i;\r\n\r\n      if (\r\n        this.settings.hidePropertiesByKey.indexOf(key) === -1 &&\r\n        this.settings.hidePropertiesByValue.indexOf(json[key]) === -1\r\n      ) {\r\n        if (this.settings.formatCamelCase) {\r\n          let words = key.match(/((^[a-z])|[A-Z])[a-z]+/g);\r\n          key = words ? words.join(\" \") : key;\r\n        }\r\n\r\n        html += `<li>${this.jsonToHTML(json[i], key)}</li>`;\r\n      }\r\n    }\r\n\r\n    return html;\r\n  }\r\n\r\n  arrayToHTML(json, key) {\r\n    let html = \"\",\r\n      elements = json.filter(\r\n        (value) => this.settings.hidePropertiesByValue.indexOf(value) === -1\r\n      );\r\n\r\n    html += '<ul class=\"arrayElements\">';\r\n\r\n    if (this.settings.keysForArrays[key]) {\r\n      html += elements\r\n        .map((a, i) => {\r\n          let keyForCurrentElement;\r\n\r\n          keyForCurrentElement = this.settings.keysForArrays[key].replace(\r\n            /\\{(\\w|\\.)+\\}/g,\r\n            function (str) {\r\n              let seq = str.slice(1, -1).split(\".\"),\r\n                k = a[seq[0]];\r\n\r\n              for (let j = 1; j < seq.length; j++) {\r\n                if (k && k[seq[j]]) {\r\n                  k = k[seq[j]];\r\n                } else {\r\n                  k = \"-\";\r\n                  break;\r\n                }\r\n              }\r\n\r\n              return k || \"-\";\r\n            }\r\n          );\r\n\r\n          return `<li class=\"element\">${this.jsonToHTML(\r\n            a,\r\n            keyForCurrentElement\r\n          )}</li>`;\r\n        })\r\n        .join(\"\");\r\n    } else {\r\n      html += elements\r\n        .map((a, i) => {\r\n          return `<li class=\"element\">${this.jsonToHTML(a, i)}</li>`;\r\n        })\r\n        .join(\"\");\r\n    }\r\n    html += \"</ul>\";\r\n\r\n    return html;\r\n  }\r\n\r\n  arrayToTableHTML(json) {\r\n    let html = \"\",\r\n      elements = json.filter(\r\n        (value) => this.settings.hidePropertiesByValue.indexOf(value) === -1\r\n      );\r\n\r\n    html += '<table class=\"arrayElements\">';\r\n    html += \"<thead><tr>\";\r\n\r\n    for (let key in elements[0]) {\r\n      if (this.settings.hidePropertiesByKey.indexOf(key) === -1) {\r\n        html += `<th>${key}</th>`;\r\n      }\r\n    }\r\n\r\n    html += \"</tr></thead>\";\r\n    html += \"<tbody>\";\r\n\r\n    html += elements\r\n      .map((a, i) => {\r\n        let h = \"<tr>\";\r\n\r\n        for (let k in a) {\r\n          if (this.settings.hidePropertiesByKey.indexOf(k) === -1) {\r\n            h += \"<td>\";\r\n            if (a[k] && typeof a[k] === \"object\") {\r\n              h += \"[Object]\";\r\n            } else {\r\n              h += a[k] || this.settings.nullAppearence;\r\n            }\r\n\r\n            h += \"</td>\";\r\n          }\r\n        }\r\n\r\n        h += \"</tr>\";\r\n\r\n        return h;\r\n      })\r\n      .join(\"\");\r\n\r\n    html += \"</tbody>\";\r\n    html += \"</table>\";\r\n\r\n    return html;\r\n  }\r\n\r\n  arrayToListHTML(json) {}\r\n\r\n  jsonToHTML(json = this.json, key) {\r\n    let type = typeof json,\r\n      html = \"\";\r\n\r\n    if (type === \"object\") {\r\n      if (Array.isArray(json)) {\r\n        type = \"array\";\r\n      } else if (json === null) {\r\n        type = \"null\";\r\n        if (this.settings.hidePropertiesByValue.indexOf(null) !== -1) {\r\n          return html;\r\n        }\r\n      }\r\n    } else if (this.settings.dateAppearence.keys.indexOf(key) !== -1) {\r\n      type = \"date\";\r\n    }\r\n\r\n    html += `<div class=\"${type}\">`;\r\n    html +=\r\n      key !== undefined\r\n        ? `<span class=\"key\">${key}</span><span class=\"colon\">:</span> `\r\n        : \"\";\r\n    if (type === \"array\") {\r\n      if (this.settings.arraysAsTable.includes(key)) {\r\n        html += this.arrayToTableHTML(json);\r\n      } else {\r\n        html += this.arrayToHTML(json, key);\r\n      }\r\n    } else if (type === \"object\") {\r\n      html += this.objectToHTML(json);\r\n    } else if (type === \"boolean\") {\r\n      html += _Render__WEBPACK_IMPORTED_MODULE_2__[\"default\"].booleanValue(json, this.settings.boolAppearence);\r\n    } else {\r\n      console.log(_Render__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\r\n      console.log(`${type}Value`);\r\n      console.log(_Render__WEBPACK_IMPORTED_MODULE_2__[\"default\"][`${type}Value`]);\r\n      html += _Render__WEBPACK_IMPORTED_MODULE_2__[\"default\"][`${type}Value`](json);\r\n    }\r\n    html += \"</div>\";\r\n\r\n    return html;\r\n  }\r\n\r\n  hideObjectOrArray(parentElement) {\r\n    const classList = parentElement.className.split(\" \");\r\n    let visibility = classList.indexOf(\"jv-invisible\");\r\n\r\n    if (visibility === -1) {\r\n      visibility = classList.indexOf(\"jv-visible\");\r\n      if (visibility === -1) {\r\n        visibility = classList.length;\r\n      }\r\n      classList[visibility] = \"jv-invisible\";\r\n    }\r\n\r\n    parentElement.className = classList.join(\" \");\r\n  }\r\n\r\n  hideAllJson(mainElement = this.mainElement) {\r\n    const mainNode = mainElement.children[0];\r\n    const allObjectElements = mainNode.getElementsByClassName(\"object\");\r\n    const allArrayElements = mainNode.getElementsByClassName(\"array\");\r\n\r\n    for (let i = 0; i < allObjectElements.length; i++) {\r\n      this.hideObjectOrArray(allObjectElements[i]);\r\n    }\r\n\r\n    for (let i = 0; i < allArrayElements.length; i++) {\r\n      this.hideObjectOrArray(allArrayElements[i]);\r\n    }\r\n  }\r\n\r\n  hideAll() {\r\n    if (this.state) {\r\n      // searchResults\r\n      this.search.hideAllSearchResults();\r\n    } else {\r\n      // json\r\n      this.hideAllJson();\r\n    }\r\n  }\r\n\r\n  generateJSON(json = this.root) {\r\n    this.mainElement.innerHTML = this.jsonToHTML(json);\r\n    this.state = 0;\r\n  }\r\n\r\n  generate() {\r\n    if (!this.form.actionsElement && this.settings.showSearchPanel) {\r\n      this.el.appendChild(this.form.generate());\r\n      this.form.addEvents();\r\n    }\r\n\r\n    if (this.state) {\r\n      this.el.replaceChild(\r\n        this.mainElement,\r\n        this.search.searchResultsMainElement\r\n      );\r\n      this.state = 0;\r\n    }\r\n\r\n    this.hideAll();\r\n  }\r\n\r\n  render() {\r\n    if (this.settings.root) {\r\n      let rootKeys = this.settings.root.split(\"/\");\r\n      for (let i = 0; i < rootKeys.length; i++) {\r\n        this.root = this.root[rootKeys[i]];\r\n      }\r\n    }\r\n\r\n    this.generateJSON();\r\n    this.generate();\r\n\r\n    this.el.appendChild(this.mainElement);\r\n    this.addEvents();\r\n  }\r\n\r\n  start() {\r\n    if (!this.el) {\r\n      console.error(\"Incorrect HTML element passed to class ViewJSON\");\r\n      return;\r\n    }\r\n\r\n    if (!this.json) {\r\n      this.el.innerHTML = `<div id=\"jsonParseError\"><p>There is an error in json file</p><p>Error message: ${this.errorMessage}</p></div>`;\r\n      return;\r\n    }\r\n\r\n    if (!this.settings) {\r\n      this.el.innerHTML = `<div id=\"jsonParseError\"><p>There is an error in settings json</p><p>Error message: ${this.errorMessage}</p></div>`;\r\n      return;\r\n    }\r\n\r\n    this.el.innerHTML = \"\";\r\n    this.mainElement = document.createElement(\"div\");\r\n    this.mainElement.id = this.mainId;\r\n\r\n    this.render();\r\n  }\r\n\r\n  addEvents() {\r\n    let self = this;\r\n\r\n    self.mainElement.addEventListener(\"click\", self.clickEventListener);\r\n  }\r\n\r\n  clearEvents() {\r\n    let self = this;\r\n\r\n    if (self.mainElement) {\r\n      self.mainElement.removeEventListener(\"click\", self.clickEventListener);\r\n    }\r\n  }\r\n\r\n  clear() {\r\n    this.el.innerHTML = \"\";\r\n    this.clearEvents();\r\n    delete this.mainElement;\r\n\r\n    if (this.search) {\r\n      delete this.search.searchResultsMainElement;\r\n    }\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://ViewJSON/./src/ViewJSON.js?");

/***/ })

/******/ });