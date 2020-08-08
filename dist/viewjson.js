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

/***/ "./src/Elements.js":
/*!*************************!*\
  !*** ./src/Elements.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Render */ \"./src/Render.js\");\n\n\nconst defineTypeOfValue = (\n  json,\n  { hidePropertiesByValue, dateAppearence },\n  key\n) => {\n  let type = typeof json;\n\n  if (type === \"object\") {\n    if (Array.isArray(json)) {\n      type = \"array\";\n    } else if (json === null) {\n      type = \"null\";\n      if (hidePropertiesByValue.indexOf(null) !== -1) {\n        return html;\n      }\n    }\n  } else if (dateAppearence.keys.indexOf(key) !== -1) {\n    type = \"date\";\n  }\n\n  return type;\n};\n\nconst isHidePropertyByKey = (key, { hidePropertiesByKey }) =>\n  hidePropertiesByKey.includes(key);\n\nconst renderJson = (json, settings, key) => {\n  const { arraysAsTable } = settings;\n\n  let html = \"\";\n  let type = defineTypeOfValue(json, settings, key);\n\n  if (isHidePropertyByKey(key, settings)) {\n    return html;\n  }\n\n  html += `<div class=\"${type}\">`;\n  html +=\n    key !== undefined\n      ? `<span class=\"key\">${key}</span><span class=\"colon\">:</span> `\n      : \"\";\n\n  switch (type) {\n    case \"array\":\n      if (arraysAsTable.includes(key)) {\n        html += renderArrayToTable(json, settings);\n      } else {\n        html += renderArray(json, settings, key);\n      }\n      break;\n    case \"object\":\n      html += renderObject(json, settings);\n      break;\n    case \"boolean\":\n      html += _Render__WEBPACK_IMPORTED_MODULE_0__[\"default\"].booleanValue(json, settings);\n      break;\n    case \"null\":\n      html += _Render__WEBPACK_IMPORTED_MODULE_0__[\"default\"].nullValue(settings);\n      break;\n    case \"date\":\n      html += _Render__WEBPACK_IMPORTED_MODULE_0__[\"default\"].dateValue(json);\n      break;\n    case \"undefined\":\n      html += _Render__WEBPACK_IMPORTED_MODULE_0__[\"default\"].undefinedValue();\n      break;\n    case \"number\":\n      html += _Render__WEBPACK_IMPORTED_MODULE_0__[\"default\"].numberValue(json);\n      break;\n    case \"string\":\n      html += _Render__WEBPACK_IMPORTED_MODULE_0__[\"default\"].stringValue(json);\n      break;\n  }\n  html += \"</div>\";\n\n  return html;\n};\n\nconst renderTableHeader = (elements, hidePropertiesByKey) => {\n  var html = \"<thead><tr>\";\n\n  for (let key in elements[0]) {\n    if (hidePropertiesByKey.indexOf(key) === -1) {\n      html += `<th>${key}</th>`;\n    }\n  }\n\n  return `${html}</tr></thead>`;\n};\n\nconst renderArrayToTable = (\n  json,\n  { hidePropertiesByValue, hidePropertiesByKey, nullAppearence }\n) => {\n  let html = \"\",\n    elements = json.filter(\n      (value) => hidePropertiesByValue.indexOf(value) === -1\n    );\n\n  html += '<table class=\"arrayElements\">';\n  html += renderTableHeader(elements, hidePropertiesByKey);\n  html += \"<tbody>\";\n\n  html += elements\n    .map((a, i) => {\n      let h = \"<tr>\";\n\n      for (let k in a) {\n        if (hidePropertiesByKey.indexOf(k) === -1) {\n          h += \"<td>\";\n          if (a[k] && typeof a[k] === \"object\") {\n            h += \"[Object]\";\n          } else {\n            h += a[k] || nullAppearence;\n          }\n\n          h += \"</td>\";\n        }\n      }\n\n      h += \"</tr>\";\n\n      return h;\n    })\n    .join(\"\");\n\n  html += \"</tbody>\";\n  html += \"</table>\";\n\n  return html;\n};\n\nconst renderObject = (json, settings) => {\n  const {\n    hidePropertiesByKey,\n    hidePropertiesByValue,\n    formatCamelCase,\n  } = settings;\n  let html = '<ul class=\"objectProperties\">';\n\n  for (let i in json) {\n    let key = i;\n\n    if (\n      hidePropertiesByKey.indexOf(key) === -1 &&\n      hidePropertiesByValue.indexOf(json[key]) === -1\n    ) {\n      if (formatCamelCase) {\n        let words = key.match(/((^[a-z])|[A-Z])[a-z]+/g);\n        key = words ? words.join(\" \") : key;\n      }\n\n      html += `<li>${renderJson(json[i], settings, key)}</li>`;\n    }\n  }\n\n  return html;\n};\n\nconst renderArray = (json, settings, key) => {\n  const { hidePropertiesByValue, keysForArrays } = settings;\n  let html = \"\",\n    elements = json.filter(\n      (value) => hidePropertiesByValue.indexOf(value) === -1\n    );\n\n  html += '<ul class=\"arrayElements\">';\n\n  if (keysForArrays[key]) {\n    html += elements\n      .map((a, i) => {\n        let keyForCurrentElement;\n\n        keyForCurrentElement = keysForArrays[key].replace(\n          /\\{(\\w|\\.)+\\}/g,\n          function (str) {\n            let seq = str.slice(1, -1).split(\".\"),\n              k = a[seq[0]];\n\n            for (let j = 1; j < seq.length; j++) {\n              if (k && k[seq[j]]) {\n                k = k[seq[j]];\n              } else {\n                k = \"-\";\n                break;\n              }\n            }\n\n            return k || \"-\";\n          }\n        );\n\n        return `<li class=\"element\">${renderJson(\n          a,\n          settings,\n          keyForCurrentElement\n        )}</li>`;\n      })\n      .join(\"\");\n  } else {\n    html += elements\n      .map((a, i) => {\n        return `<li class=\"element\">${renderJson(a, settings, i)}</li>`;\n      })\n      .join(\"\");\n  }\n  html += \"</ul>\";\n\n  return html;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (renderJson);\n\n\n//# sourceURL=webpack://ViewJSON/./src/Elements.js?");

/***/ }),

/***/ "./src/FormActions.js":
/*!****************************!*\
  !*** ./src/FormActions.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return FormAction; });\n/* harmony import */ var _Render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Render */ \"./src/Render.js\");\n\n\nclass FormAction {\n  constructor(viewJSON) {\n    this.id = \"viewJSONActions\";\n    this.opened = true;\n    this.viewJSON = viewJSON;\n    this.search = this.viewJSON.search;\n\n    this.hideAllAction = this.hideAllAction.bind(this);\n    this.searchAction = this.searchAction.bind(this);\n    this.resetAction = this.resetAction.bind(this);\n  }\n\n  hideAllAction(evt) {\n    evt.preventDefault();\n    this.viewJSON.hideAll();\n  }\n\n  searchAction(evt) {\n    evt.preventDefault();\n    this.search.reset();\n    this.search.searchByKeyAndValue(evt);\n  }\n\n  resetAction(evt) {\n    this.search.reset();\n    this.viewJSON.generate();\n  }\n\n  createSearchForm() {\n    if (!this.searchInput) {\n      this.searchInput = _Render__WEBPACK_IMPORTED_MODULE_0__[\"default\"].searchInput();\n      this.searchButton = _Render__WEBPACK_IMPORTED_MODULE_0__[\"default\"].searchButton();\n      this.resetButton = _Render__WEBPACK_IMPORTED_MODULE_0__[\"default\"].resetButton();\n    }\n  }\n\n  addEvents() {\n    this.hideAllButton.addEventListener(\"click\", this.hideAllAction);\n    this.resetButton.addEventListener(\"click\", this.resetAction);\n    this.actionsElement.addEventListener(\"submit\", this.searchAction);\n  }\n\n  clearEvents() {\n    this.hideAllButton.removeEventListener(\"click\", this.hideAllAction);\n    this.resetButton.removeEventListener(\"click\", this.resetAction);\n    this.actionsElement.removeEventListener(\"submit\", this.searchAction);\n  }\n\n  generate() {\n    if (!this.actionsElement) {\n      this.actionsElement = document.createElement(\"form\");\n      this.actionsElement.id = this.id;\n\n      this.hideAllButton = _Render__WEBPACK_IMPORTED_MODULE_0__[\"default\"].hideAllButton();\n      this.createSearchForm();\n\n      this.actionsElement.appendChild(this.hideAllButton);\n\n      this.actionsElement.appendChild(this.resetButton);\n      this.actionsElement.appendChild(this.searchButton);\n      this.actionsElement.appendChild(this.searchInput);\n    }\n\n    return this.actionsElement;\n  }\n}\n\n\n//# sourceURL=webpack://ViewJSON/./src/FormActions.js?");

/***/ }),

/***/ "./src/Render.js":
/*!***********************!*\
  !*** ./src/Render.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst numberValue = (json) => `<span class=\"number\">${json}</span>`;\n\nconst stringValue = (json) =>\n  `<span class=\"string\"><span class=\"quot\">\"</span>${json}<span class=\"quot\">\"</span></span>`;\n\nconst dateValue = (json) => {\n  let dt = new Date(json);\n  return `<span class=\"boolean\">${dt.toDateString()}</span>`;\n};\n\nconst booleanValue = (json, { boolAppearence }) =>\n  `<span class=\"boolean\">${boolAppearence[+json]}</span>`;\n\nconst nullValue = ({ nullAppearence }) =>\n  `<span class=\"null\">${nullAppearence}</span>`;\n\nconst undefinedValue = () => `<span class=\"undefined\">undefined</span>`;\n\nconst hideAllButton = () => {\n  const element = document.createElement(\"input\");\n\n  element.id = \"hideAll\";\n  element.type = \"button\";\n  element.value = \"Hide All\";\n\n  return element;\n};\n\nconst searchInput = () => {\n  const element = document.createElement(\"input\");\n  element.name = \"search\";\n\n  return element;\n};\n\nconst searchButton = () => {\n  const element = document.createElement(\"input\");\n\n  element.type = \"submit\";\n  element.id = \"search\";\n  element.value = \"Search\";\n\n  return element;\n};\n\nconst resetButton = () => {\n  const element = document.createElement(\"input\");\n  element.type = \"button\";\n  element.id = \"reset\";\n  element.value = \"Reset\";\n\n  return element;\n};\n\nconst Render = {\n  numberValue,\n  stringValue,\n  dateValue,\n  booleanValue,\n  nullValue,\n  undefinedValue,\n  hideAllButton,\n  searchInput,\n  searchButton,\n  resetButton,\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Render);\n\n\n//# sourceURL=webpack://ViewJSON/./src/Render.js?");

/***/ }),

/***/ "./src/Search.js":
/*!***********************!*\
  !*** ./src/Search.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Search; });\n/* harmony import */ var _Elements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Elements */ \"./src/Elements.js\");\n\n\nclass Search {\n  constructor(viewJson) {\n    this.viewJson = viewJson;\n    this.searchResults = {\n      byKey: [],\n      byValue: [],\n    };\n    this.resultClassName = \"searchResultItem\";\n    this.searchResultsId = \"searchResultsMainBlock\";\n  }\n\n  clickEventListener(evt) {\n    if (/searchHeader/.test(evt.target.className)) {\n      let searchResultsHeader = evt.target,\n        searchResults = searchResultsHeader.nextElementSibling,\n        classList = searchResults.className.split(\" \"),\n        visibility = classList.indexOf(\"jv-visible\");\n\n      if (visibility === -1) {\n        classList[classList.length] = \"jv-visible\";\n        searchResultsHeader.className += \" open\";\n      } else {\n        classList.splice(visibility, 1);\n        searchResultsHeader.className = searchResultsHeader.className.replace(\n          /\\sopen/g,\n          \"\"\n        );\n      }\n\n      searchResults.className = classList.join(\" \");\n    }\n  }\n\n  searchByKeyAndValue(evt) {\n    evt.preventDefault();\n    const { json, addEvents } = this.viewJson;\n    let key = document.getElementsByName(\"search\")[0].value.toLowerCase();\n\n    if (json && typeof json === \"object\") {\n      if (Array.isArray(json)) {\n        this.searchInArray(key, json);\n      } else {\n        this.searchInObject(key, json);\n      }\n    }\n\n    this.renderSearchResults();\n    addEvents();\n  }\n\n  searchInArray(key, arr) {\n    for (let i = 0; i < arr.length; i++) {\n      if (arr[i] && typeof arr[i] === \"object\") {\n        if (Array.isArray(arr[i])) {\n          this.searchInArray(key, arr[i]);\n        } else {\n          this.searchInObject(key, arr[i]);\n        }\n      } else if (arr[i].toString().toLowerCase().indexOf(key) !== -1) {\n        this.searchResults.byValue.push(arr[i]);\n      }\n    }\n  }\n\n  searchInObject(key, obj) {\n    let res = {};\n\n    for (let k in obj) {\n      if (k.toLowerCase().indexOf(key) !== -1) {\n        res[k] = obj[k];\n        this.searchResults.byKey.push(Object.assign({}, res));\n        res = {};\n      }\n\n      if (obj[k] && typeof obj[k] === \"object\") {\n        if (Array.isArray(obj[k])) {\n          this.searchInArray(key, obj[k]);\n        } else {\n          this.searchInObject(key, obj[k]);\n        }\n      } else if (\n        obj[k] &&\n        obj[k].toString().toLowerCase().indexOf(key) !== -1\n      ) {\n        res[k] = obj[k];\n        this.searchResults.byValue.push(Object.assign({}, res));\n        res = {};\n      }\n    }\n  }\n\n  hideAllSearchResults() {\n    this.searchResultsElements = this.searchResultsMainElement.getElementsByClassName(\n      this.resultClassName\n    );\n\n    for (let i = 0; i < this.searchResultsElements.length; i++) {\n      this.viewJson.hideAllJson(this.searchResultsElements[i]);\n    }\n  }\n\n  generateTypeOfSearchResults(results, type) {\n    let html = \"\";\n\n    if (!this[`searchHeader_${type}`]) {\n      this[`searchHeader_${type}`] = document.createElement(\"h4\");\n    }\n\n    this[`searchHeader_${type}`].className = `searchHeader${\n      !results.length ? \" nothingFound\" : \" open\"\n    }`;\n    this[\n      `searchHeader_${type}`\n    ].innerHTML = `by ${type} (${results.length} found):`;\n\n    if (!this[`searchResults_${type}`]) {\n      this[`searchResults_${type}`] = document.createElement(\"div\");\n    }\n\n    this[`searchResults_${type}`].className = `searchResults jv-visible`;\n\n    if (results.length >= 1) {\n      for (let i = 0; i < results.length; i++) {\n        html += `<div class=\"${this.resultClassName}\">${Object(_Elements__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\n          results[i],\n          this.viewJson.settings\n        )}</div>`;\n      }\n    } else {\n      html += `<p> Nothing found </p>`;\n    }\n\n    this[`searchResults_${type}`].innerHTML = html;\n  }\n\n  renderSearchResults() {\n    const {\n      state,\n      el,\n      mainElement,\n      clickEventListener,\n      setState,\n    } = this.viewJson;\n\n    if (!this.searchHeader) {\n      this.searchHeader = document.createElement(\"h3\");\n      this.searchHeader.innerHTML = \"Search Results:\";\n    }\n\n    this.generateTypeOfSearchResults(this.searchResults.byKey, \"key\");\n    this.generateTypeOfSearchResults(this.searchResults.byValue, \"value\");\n\n    if (!this.searchResultsMainElement) {\n      this.searchResultsMainElement = document.createElement(\"div\");\n      this.searchResultsMainElement.id = this.searchResultsId;\n\n      this.searchResultsMainElement.appendChild(this.searchHeader);\n      this.searchResultsMainElement.appendChild(this.searchHeader_key);\n      this.searchResultsMainElement.appendChild(this.searchResults_key);\n      this.searchResultsMainElement.appendChild(this.searchHeader_value);\n      this.searchResultsMainElement.appendChild(this.searchResults_value);\n\n      this.searchResultsMainElement.addEventListener(\n        \"click\",\n        this.clickEventListener\n      );\n      this.searchResultsMainElement.addEventListener(\n        \"click\",\n        clickEventListener\n      );\n    }\n\n    if (state === 0) {\n      el.replaceChild(this.searchResultsMainElement, mainElement);\n      setState(1);\n    }\n\n    this.hideAllSearchResults();\n  }\n\n  reset() {\n    this.searchResults.byKey = [];\n    this.searchResults.byValue = [];\n  }\n}\n\n\n//# sourceURL=webpack://ViewJSON/./src/Search.js?");

/***/ }),

/***/ "./src/ViewJSON.js":
/*!*************************!*\
  !*** ./src/ViewJSON.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ViewJSON; });\n/* harmony import */ var _Search__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Search */ \"./src/Search.js\");\n/* harmony import */ var _FormActions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FormActions */ \"./src/FormActions.js\");\n/* harmony import */ var _Elements__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Elements */ \"./src/Elements.js\");\n\n\n\n\nclass ViewJSON {\n  constructor(el = document.body, json = \"\", settings = \"\") {\n    this.el = el;\n    this.mainId = \"viewJsonMainBlock\";\n\n    this.setState = this.setState.bind(this);\n    this.clickEventListener = this.clickEventListener.bind(this);\n    this.hideObjectOrArray = this.hideObjectOrArray.bind(this);\n    this.hideAllJson = this.hideAllJson.bind(this);\n    this.hideAll = this.hideAll.bind(this);\n    this.generateJSON = this.generateJSON.bind(this);\n    this.generate = this.generate.bind(this);\n    this.render = this.render.bind(this);\n    this.start = this.start.bind(this);\n    this.addEvents = this.addEvents.bind(this);\n    this.clearEvents = this.clearEvents.bind(this);\n    this.clear = this.clear.bind(this);\n\n    try {\n      this.json = JSON.parse(json.replace(/\\s/g, \"\"));\n      this.settings = JSON.parse(settings.replace(/\\/\\/.*\\n/g, \"\"));\n\n      this.search = new _Search__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this);\n      this.form = new _FormActions__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this);\n\n      this.state = 0; // 0 - json, 1 - search results\n      this.root = this.settings.root || this.json;\n    } catch (err) {\n      this.errorMessage = err.message;\n      console.error(err);\n    }\n  }\n\n  setState(newState) {\n    this.state = newState;\n  }\n\n  clickEventListener(evt) {\n    if (/key/.test(evt.target.className)) {\n      let parentElement = evt.target.parentNode;\n      let classList = parentElement.className.split(\" \");\n      let visibility = classList.indexOf(\"jv-invisible\");\n\n      if (visibility === -1) {\n        visibility = classList.indexOf(\"jv-visible\");\n        if (visibility === -1) {\n          visibility = classList.length;\n        }\n        classList[visibility] = \"jv-invisible\";\n      } else {\n        classList[visibility] = \"jv-visible\";\n      }\n\n      parentElement.className = classList.join(\" \");\n    }\n  }\n\n  hideObjectOrArray(parentElement) {\n    const classList = parentElement.className.split(\" \");\n    let visibility = classList.indexOf(\"jv-invisible\");\n\n    if (visibility === -1) {\n      visibility = classList.indexOf(\"jv-visible\");\n      if (visibility === -1) {\n        visibility = classList.length;\n      }\n      classList[visibility] = \"jv-invisible\";\n    }\n\n    parentElement.className = classList.join(\" \");\n  }\n\n  hideAllJson(mainElement = this.mainElement) {\n    const mainNode = mainElement.children[0];\n\n    if (mainNode) {\n      const allObjectElements = mainNode.getElementsByClassName(\"object\");\n      const allArrayElements = mainNode.getElementsByClassName(\"array\");\n\n      for (let i = 0; i < allObjectElements.length; i++) {\n        this.hideObjectOrArray(allObjectElements[i]);\n      }\n\n      for (let i = 0; i < allArrayElements.length; i++) {\n        this.hideObjectOrArray(allArrayElements[i]);\n      }\n    }\n  }\n\n  hideAll() {\n    if (this.state) {\n      // searchResults\n      this.search.hideAllSearchResults();\n    } else {\n      // json\n      this.hideAllJson();\n    }\n  }\n\n  generateJSON() {\n    this.mainElement.innerHTML = Object(_Elements__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this.root, this.settings);\n    this.state = 0;\n  }\n\n  generate() {\n    if (!this.form.actionsElement && this.settings.showSearchPanel) {\n      this.el.appendChild(this.form.generate());\n      this.form.addEvents();\n    }\n\n    if (this.state) {\n      this.el.replaceChild(\n        this.mainElement,\n        this.search.searchResultsMainElement\n      );\n      this.state = 0;\n    }\n\n    this.hideAll();\n  }\n\n  render() {\n    if (this.settings.root) {\n      let rootKeys = this.settings.root.split(\"/\");\n      for (let i = 0; i < rootKeys.length; i++) {\n        this.root = this.root[rootKeys[i]];\n      }\n    }\n\n    this.generateJSON();\n    this.generate();\n\n    this.el.appendChild(this.mainElement);\n    this.addEvents();\n  }\n\n  start() {\n    if (!this.el) {\n      console.error(\"Incorrect HTML element passed to class ViewJSON\");\n      return;\n    }\n\n    if (!this.json) {\n      this.el.innerHTML = `<div id=\"jsonParseError\"><p>There is an error in json file</p><p>Error message: ${this.errorMessage}</p></div>`;\n      return;\n    }\n\n    if (!this.settings) {\n      this.el.innerHTML = `<div id=\"jsonParseError\"><p>There is an error in settings json</p><p>Error message: ${this.errorMessage}</p></div>`;\n      return;\n    }\n\n    this.el.innerHTML = \"\";\n    this.mainElement = document.createElement(\"div\");\n    this.mainElement.id = this.mainId;\n\n    this.render();\n  }\n\n  addEvents() {\n    this.mainElement.addEventListener(\"click\", this.clickEventListener);\n  }\n\n  clearEvents() {\n    if (this.mainElement) {\n      this.mainElement.removeEventListener(\"click\", this.clickEventListener);\n    }\n  }\n\n  clear() {\n    this.el.innerHTML = \"\";\n    this.clearEvents();\n    delete this.mainElement;\n\n    if (this.search) {\n      delete this.search.searchResultsMainElement;\n    }\n  }\n}\n\n\n//# sourceURL=webpack://ViewJSON/./src/ViewJSON.js?");

/***/ })

/******/ });