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

/***/ "./src/Data.js":
/*!*********************!*\
  !*** ./src/Data.js ***!
  \*********************/
/*! exports provided: Data, setData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Data\", function() { return Data; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setData\", function() { return setData; });\n/* harmony import */ var _Settings_Control__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Settings/Control */ \"./src/Settings/Control.js\");\n/* harmony import */ var _appError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./appError */ \"./src/appError.js\");\n\r\n\r\n\r\nlet Data = {};\r\n\r\nconst setData = (newData) => {\r\n  try {\r\n    Data = JSON.parse(newData);\r\n    Data = _Settings_Control__WEBPACK_IMPORTED_MODULE_0__[\"default\"].setRoot(Data);\r\n  } catch (err) {\r\n    _appError__WEBPACK_IMPORTED_MODULE_1__[\"default\"].setError(err, \"main json\");\r\n  }\r\n};\r\n\n\n//# sourceURL=webpack://ViewJSON/./src/Data.js?");

/***/ }),

/***/ "./src/FormActions.js":
/*!****************************!*\
  !*** ./src/FormActions.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return FormAction; });\n/* harmony import */ var _View_Render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./View/Render */ \"./src/View/Render.js\");\n\n\nclass FormAction {\n  constructor(viewJSON) {\n    this.id = \"viewJSONActions\";\n    this.opened = true;\n    this.viewJSON = viewJSON;\n    this.search = this.viewJSON.search;\n\n    this.hideAllAction = this.hideAllAction.bind(this);\n    this.searchAction = this.searchAction.bind(this);\n    this.resetAction = this.resetAction.bind(this);\n  }\n\n  hideAllAction(evt) {\n    evt.preventDefault();\n    this.viewJSON.hideAll();\n  }\n\n  searchAction(evt) {\n    evt.preventDefault();\n    this.search.reset();\n    this.search.searchByKeyAndValue(evt);\n  }\n\n  resetAction() {\n    this.search.reset();\n    this.viewJSON.generate();\n  }\n\n  createSearchForm() {\n    if (!this.searchInput) {\n      this.searchInput = _View_Render__WEBPACK_IMPORTED_MODULE_0__[\"default\"].searchInput();\n      this.searchButton = _View_Render__WEBPACK_IMPORTED_MODULE_0__[\"default\"].searchButton();\n      this.resetButton = _View_Render__WEBPACK_IMPORTED_MODULE_0__[\"default\"].resetButton();\n    }\n  }\n\n  addEvents() {\n    this.hideAllButton.addEventListener(\"click\", this.hideAllAction);\n    this.resetButton.addEventListener(\"click\", this.resetAction);\n    this.actionsElement.addEventListener(\"submit\", this.searchAction);\n  }\n\n  clearEvents() {\n    this.hideAllButton.removeEventListener(\"click\", this.hideAllAction);\n    this.resetButton.removeEventListener(\"click\", this.resetAction);\n    this.actionsElement.removeEventListener(\"submit\", this.searchAction);\n  }\n\n  generate() {\n    if (!this.actionsElement) {\n      this.actionsElement = document.createElement(\"form\");\n      this.actionsElement.id = this.id;\n\n      this.hideAllButton = _View_Render__WEBPACK_IMPORTED_MODULE_0__[\"default\"].hideAllButton();\n      this.createSearchForm();\n\n      this.actionsElement.appendChild(this.hideAllButton);\n\n      this.actionsElement.appendChild(this.resetButton);\n      this.actionsElement.appendChild(this.searchButton);\n      this.actionsElement.appendChild(this.searchInput);\n    }\n\n    return this.actionsElement;\n  }\n}\n\n\n//# sourceURL=webpack://ViewJSON/./src/FormActions.js?");

/***/ }),

/***/ "./src/Keys.js":
/*!*********************!*\
  !*** ./src/Keys.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Settings_Value__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Settings/Value */ \"./src/Settings/Value.js\");\n\r\n\r\nconst removeAbbrFromBegin = (word) => {\r\n  const count = (word.match(/[A-Z]/g) || []).length;\r\n  const isAbbr = /^[A-Z]+$/.test(word);\r\n\r\n  if (count > 1 && !isAbbr) {\r\n    return word.slice(0, count - 1) + \" \" + word.slice(count - 1);\r\n  }\r\n\r\n  return word;\r\n};\r\n\r\nconst convertCamelCase = (key) => {\r\n  if (_Settings_Value__WEBPACK_IMPORTED_MODULE_0__[\"Settings\"].formatCamelCase) {\r\n    const words = key.split(\" \");\r\n    const nonEmptyWords = words.filter((word) => word);\r\n    const wordPattern = /([A-Z]+$)|(\\d+)|(((^[a-z])|[A-Z]+)[a-z]+)/g;\r\n    let parts = [];\r\n\r\n    for (let word of nonEmptyWords) {\r\n      const newParts = word.match(wordPattern) || [word];\r\n      parts = parts.concat(newParts);\r\n    }\r\n\r\n    return parts\r\n      ? parts.map((word) => removeAbbrFromBegin(word)).join(\" \")\r\n      : key;\r\n  }\r\n\r\n  return key;\r\n};\r\n\r\nconst convertByMask = (value, mask) => {\r\n  const partPattern = /\\{(\\w|\\.)+?\\}/g;\r\n  const key = mask.replace(partPattern, function (part) {\r\n    const path = part.slice(1, -1).split(\".\");\r\n\r\n    let convertedKey = value[path[0]];\r\n\r\n    for (let i = 1; i < path.length; i++) {\r\n      if (convertedKey && convertedKey[path[i]]) {\r\n        convertedKey = convertedKey[path[i]];\r\n      } else {\r\n        convertedKey = \"-\";\r\n        break;\r\n      }\r\n    }\r\n\r\n    return convertedKey || \"-\";\r\n  });\r\n\r\n  return key;\r\n};\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = ({ convertCamelCase, convertByMask });\r\n\n\n//# sourceURL=webpack://ViewJSON/./src/Keys.js?");

/***/ }),

/***/ "./src/Search.js":
/*!***********************!*\
  !*** ./src/Search.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Search; });\n/* harmony import */ var _View_Elements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./View/Elements */ \"./src/View/Elements.js\");\n\n\nclass Search {\n  constructor(viewJson) {\n    this.viewJson = viewJson;\n    this.searchResults = {\n      byKey: [],\n      byValue: [],\n    };\n    this.resultClassName = \"searchResultItem\";\n    this.searchResultsId = \"searchResultsMainBlock\";\n  }\n\n  clickEventListener(evt) {\n    if (/searchHeader/.test(evt.target.className)) {\n      let searchResultsHeader = evt.target,\n        searchResults = searchResultsHeader.nextElementSibling,\n        classList = searchResults.className.split(\" \"),\n        visibility = classList.indexOf(\"jv-visible\");\n\n      if (visibility === -1) {\n        classList[classList.length] = \"jv-visible\";\n        searchResultsHeader.className += \" open\";\n      } else {\n        classList.splice(visibility, 1);\n        searchResultsHeader.className = searchResultsHeader.className.replace(\n          /\\sopen/g,\n          \"\"\n        );\n      }\n\n      searchResults.className = classList.join(\" \");\n    }\n  }\n\n  searchByKeyAndValue(evt) {\n    evt.preventDefault();\n    const { json, addEvents } = this.viewJson;\n    let key = document.getElementsByName(\"search\")[0].value.toLowerCase();\n\n    if (json && typeof json === \"object\") {\n      if (Array.isArray(json)) {\n        this.searchInArray(key, json);\n      } else {\n        this.searchInObject(key, json);\n      }\n    }\n\n    this.renderSearchResults();\n    addEvents();\n  }\n\n  searchInArray(key, arr) {\n    for (let i = 0; i < arr.length; i++) {\n      if (arr[i] && typeof arr[i] === \"object\") {\n        if (Array.isArray(arr[i])) {\n          this.searchInArray(key, arr[i]);\n        } else {\n          this.searchInObject(key, arr[i]);\n        }\n      } else if (arr[i].toString().toLowerCase().indexOf(key) !== -1) {\n        this.searchResults.byValue.push(arr[i]);\n      }\n    }\n  }\n\n  searchInObject(key, obj) {\n    let res = {};\n\n    for (let k in obj) {\n      if (k.toLowerCase().indexOf(key) !== -1) {\n        res[k] = obj[k];\n        this.searchResults.byKey.push(Object.assign({}, res));\n        res = {};\n      }\n\n      if (obj[k] && typeof obj[k] === \"object\") {\n        if (Array.isArray(obj[k])) {\n          this.searchInArray(key, obj[k]);\n        } else {\n          this.searchInObject(key, obj[k]);\n        }\n      } else if (\n        obj[k] &&\n        obj[k].toString().toLowerCase().indexOf(key) !== -1\n      ) {\n        res[k] = obj[k];\n        this.searchResults.byValue.push(Object.assign({}, res));\n        res = {};\n      }\n    }\n  }\n\n  hideAllSearchResults() {\n    this.searchResultsElements = this.searchResultsMainElement.getElementsByClassName(\n      this.resultClassName\n    );\n\n    for (let i = 0; i < this.searchResultsElements.length; i++) {\n      this.viewJson.hideAllJson(this.searchResultsElements[i]);\n    }\n  }\n\n  renderSearchResult(results) {\n    const searchResults = document.createDocumentFragment();\n\n    if (results.length >= 1) {\n      for (let i = 0; i < results.length; i++) {\n        const searchResultItem = document.createElement(\"div\");\n        const renderedResult = Object(_View_Elements__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(null, results[i]);\n\n        if (renderedResult) {\n          searchResultItem.className = this.resultClassName;\n          searchResultItem.appendChild(renderedResult);\n          searchResults.appendChild(searchResultItem);\n        }\n      }\n    } else {\n      const nothingFoundElement = document.createElement(\"p\");\n      nothingFoundElement.textContent = \"Nothing found\";\n      searchResults.appendChild(nothingFoundElement);\n    }\n\n    return searchResults;\n  }\n\n  generateTypeOfSearchResults(results, type) {\n    const renderedResults = this.renderSearchResult(results);\n    const searchHeader = `searchHeader_${type}`;\n    const searchResults = `searchResults_${type}`;\n    let numberOfResults;\n\n    if (!this[searchHeader]) {\n      this[searchHeader] = document.createElement(\"h4\");\n    }\n\n    this[searchHeader].className = `searchHeader${\n      !results.length ? \" nothingFound\" : \" open\"\n    }`;\n\n    if (!this[searchResults]) {\n      this[searchResults] = document.createElement(\"div\");\n    }\n\n    this[searchResults].innerHTML = \"\";\n    this[searchResults].className = `searchResults jv-visible`;\n\n    if (renderedResults) {\n      this[searchResults].appendChild(renderedResults);\n    }\n\n    numberOfResults = this[searchResults].children.length;\n    this[searchHeader].innerHTML = `by ${type} (${numberOfResults} found):`;\n  }\n\n  renderSearchResults() {\n    const {\n      state,\n      el,\n      mainElement,\n      clickEventListener,\n      setState,\n    } = this.viewJson;\n\n    if (!this.searchHeader) {\n      this.searchHeader = document.createElement(\"h3\");\n      this.searchHeader.innerHTML = \"Search Results:\";\n    }\n\n    this.generateTypeOfSearchResults(this.searchResults.byKey, \"key\");\n    this.generateTypeOfSearchResults(this.searchResults.byValue, \"value\");\n\n    if (!this.searchResultsMainElement) {\n      this.searchResultsMainElement = document.createElement(\"div\");\n      this.searchResultsMainElement.id = this.searchResultsId;\n\n      this.searchResultsMainElement.appendChild(this.searchHeader);\n      this.searchResultsMainElement.appendChild(this.searchHeader_key);\n      this.searchResultsMainElement.appendChild(this.searchResults_key);\n      this.searchResultsMainElement.appendChild(this.searchHeader_value);\n      this.searchResultsMainElement.appendChild(this.searchResults_value);\n\n      this.searchResultsMainElement.addEventListener(\n        \"click\",\n        this.clickEventListener\n      );\n      this.searchResultsMainElement.addEventListener(\n        \"click\",\n        clickEventListener\n      );\n    }\n\n    if (state === 0) {\n      el.replaceChild(this.searchResultsMainElement, mainElement);\n      setState(1);\n    }\n\n    this.hideAllSearchResults();\n  }\n\n  reset() {\n    this.searchResults.byKey = [];\n    this.searchResults.byValue = [];\n  }\n}\n\n\n//# sourceURL=webpack://ViewJSON/./src/Search.js?");

/***/ }),

/***/ "./src/Settings/Control.js":
/*!*********************************!*\
  !*** ./src/Settings/Control.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Value__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Value */ \"./src/Settings/Value.js\");\n\r\n\r\nconst isHidePropertyByKey = (key) => _Value__WEBPACK_IMPORTED_MODULE_0__[\"Settings\"].hidePropertiesByKey.includes(key);\r\n\r\nconst isHideEmptyArrays = (value) =>\r\n  Array.isArray(value) &&\r\n  _Value__WEBPACK_IMPORTED_MODULE_0__[\"Settings\"].hideEmptyObjectsAndArrays &&\r\n  value.length === 0;\r\n\r\nconst isHideEmptyObjects = (value) =>\r\n  typeof value === \"object\" &&\r\n  value !== null &&\r\n  _Value__WEBPACK_IMPORTED_MODULE_0__[\"Settings\"].hideEmptyObjectsAndArrays &&\r\n  Object.keys(value).length === 0;\r\n\r\nconst isHidePropertyByValue = (value) =>\r\n  _Value__WEBPACK_IMPORTED_MODULE_0__[\"Settings\"].hidePropertiesByValue.includes(value);\r\n\r\nconst isAllInnerValuesHided = (data) => {\r\n  if (typeof data === \"object\" && data !== null) {\r\n    for (let key in data) {\r\n      if (isShowProperty(data[key])) {\r\n        return false;\r\n      }\r\n    }\r\n    return true;\r\n  }\r\n  return false;\r\n};\r\n\r\nconst isShowProperty = (property) =>\r\n  !isHidePropertyByValue(property) &&\r\n  !isHideEmptyArrays(property) &&\r\n  !isHideEmptyObjects(property) &&\r\n  !isAllInnerValuesHided(property);\r\n\r\nconst filterElements = (data) => {\r\n  if (Array.isArray(data)) {\r\n    return data.filter(\r\n      (value, key) =>\r\n        !(\r\n          isHidePropertyByKey(key) ||\r\n          isHidePropertyByValue(value) ||\r\n          isAllInnerValuesHided(value)\r\n        )\r\n    );\r\n  } else {\r\n    let filtered = {};\r\n    for (let key in data) {\r\n      if (isShowProperty(data[key]) && !isHidePropertyByKey(key)) {\r\n        filtered[key] = data[key];\r\n      }\r\n    }\r\n    return filtered;\r\n  }\r\n};\r\n\r\nconst setRoot = (data) => {\r\n  if (_Value__WEBPACK_IMPORTED_MODULE_0__[\"Settings\"].root) {\r\n    let rootKeys = _Value__WEBPACK_IMPORTED_MODULE_0__[\"Settings\"].root.split(\"/\");\r\n    for (let i = 0; i < rootKeys.length; i++) {\r\n      data = data[rootKeys[i]];\r\n    }\r\n  }\r\n\r\n  return data;\r\n};\r\n\r\nconst isUniqueItem = (key, data) => {\r\n  for (let k = 0; k < key; k++) {\r\n    if (JSON.stringify(data1) === JSON.stringify(data2)) {\r\n      return false;\r\n    }\r\n  }\r\n  return true;\r\n};\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\r\n  isHidePropertyByKey,\r\n  isHidePropertyByValue,\r\n  isAllInnerValuesHided,\r\n  isShowProperty,\r\n  filterElements,\r\n  setRoot,\r\n  isUniqueItem,\r\n});\r\n\n\n//# sourceURL=webpack://ViewJSON/./src/Settings/Control.js?");

/***/ }),

/***/ "./src/Settings/Value.js":
/*!*******************************!*\
  !*** ./src/Settings/Value.js ***!
  \*******************************/
/*! exports provided: Settings, setSettings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Settings\", function() { return Settings; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setSettings\", function() { return setSettings; });\n/* harmony import */ var _appError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../appError */ \"./src/appError.js\");\n\r\n\r\nlet Settings = {\r\n  root: \"\",\r\n  nullAppearence: \"null\",\r\n  boolAppearence: [false, true],\r\n  hidePropertiesByValue: [],\r\n  hidePropertiesByKey: [],\r\n  arraysAsTable: [],\r\n  keysForArrays: {},\r\n};\r\n\r\nconst setSettings = (newSettings) => {\r\n  try {\r\n    const parsed = newSettings\r\n      ? JSON.parse(newSettings.replace(/\\/\\/.*\\n/g, \"\"))\r\n      : {};\r\n\r\n    Settings = {\r\n      ...Settings,\r\n      ...parsed,\r\n    };\r\n  } catch (err) {\r\n    _appError__WEBPACK_IMPORTED_MODULE_0__[\"default\"].setError(err, \"settings\");\r\n  }\r\n};\r\n\n\n//# sourceURL=webpack://ViewJSON/./src/Settings/Value.js?");

/***/ }),

/***/ "./src/View/Elements.js":
/*!******************************!*\
  !*** ./src/View/Elements.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Render */ \"./src/View/Render.js\");\n/* harmony import */ var _Keys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Keys */ \"./src/Keys.js\");\n/* harmony import */ var _Settings_Control__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Settings/Control */ \"./src/Settings/Control.js\");\n/* harmony import */ var _Settings_Value__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Settings/Value */ \"./src/Settings/Value.js\");\n\r\n\r\n\r\n\r\n\r\nconst defineTypeOfValue = (value, key) => {\r\n  const { dateAppearence } = _Settings_Value__WEBPACK_IMPORTED_MODULE_3__[\"Settings\"];\r\n  let type = typeof value;\r\n\r\n  if (type === \"object\") {\r\n    if (Array.isArray(value)) {\r\n      type = \"array\";\r\n    } else if (value === null) {\r\n      type = \"null\";\r\n    }\r\n  } else if (\r\n    dateAppearence &&\r\n    dateAppearence.keys &&\r\n    dateAppearence.keys.includes(key)\r\n  ) {\r\n    type = \"date\";\r\n  }\r\n\r\n  return type;\r\n};\r\n\r\nconst renderJson = (key, value, options = {}) => {\r\n  const { arraysAsTable, collapseSingleKeys } = _Settings_Value__WEBPACK_IMPORTED_MODULE_3__[\"Settings\"];\r\n  const itemElement = document.createElement(\"div\");\r\n  let valueElement;\r\n\r\n  const type = defineTypeOfValue(value, key);\r\n\r\n  if (\r\n    _Settings_Control__WEBPACK_IMPORTED_MODULE_2__[\"default\"].isHidePropertyByKey(key) ||\r\n    _Settings_Control__WEBPACK_IMPORTED_MODULE_2__[\"default\"].isHidePropertyByValue(value) ||\r\n    _Settings_Control__WEBPACK_IMPORTED_MODULE_2__[\"default\"].isAllInnerValuesHided(value)\r\n  ) {\r\n    return null;\r\n  }\r\n\r\n  itemElement.className = type;\r\n\r\n  switch (type) {\r\n    case \"array\":\r\n      value = _Settings_Control__WEBPACK_IMPORTED_MODULE_2__[\"default\"].filterElements(value);\r\n\r\n      if (arraysAsTable.includes(key)) {\r\n        valueElement = renderArrayToTable(value);\r\n      } else {\r\n        if (collapseSingleKeys && value.length === 1) {\r\n          return renderJson(key, value[0]);\r\n        }\r\n        valueElement = renderArray(key, value);\r\n      }\r\n      break;\r\n    case \"object\":\r\n      value = _Settings_Control__WEBPACK_IMPORTED_MODULE_2__[\"default\"].filterElements(value);\r\n      const keys = Object.keys(value);\r\n      if (collapseSingleKeys && keys.length === 1) {\r\n        const nextKey = key ? `${key} | ${keys[0]}` : null;\r\n        return renderJson(nextKey, value[keys[0]]);\r\n      }\r\n      valueElement = renderObject(value);\r\n      break;\r\n    case \"boolean\":\r\n      valueElement = _Render__WEBPACK_IMPORTED_MODULE_0__[\"default\"].booleanValue(value);\r\n      break;\r\n    case \"null\":\r\n      valueElement = _Render__WEBPACK_IMPORTED_MODULE_0__[\"default\"].nullValue();\r\n      break;\r\n    case \"date\":\r\n      valueElement = _Render__WEBPACK_IMPORTED_MODULE_0__[\"default\"].dateValue(value);\r\n      break;\r\n    case \"undefined\":\r\n      valueElement = _Render__WEBPACK_IMPORTED_MODULE_0__[\"default\"].undefinedValue();\r\n      break;\r\n    case \"number\":\r\n      valueElement = _Render__WEBPACK_IMPORTED_MODULE_0__[\"default\"].numberValue(value);\r\n      break;\r\n    case \"string\":\r\n      valueElement = _Render__WEBPACK_IMPORTED_MODULE_0__[\"default\"].stringValue(value);\r\n      break;\r\n  }\r\n\r\n  if (key !== null) {\r\n    let convertedKey = key;\r\n\r\n    if (options.mask) {\r\n      convertedKey = _Keys__WEBPACK_IMPORTED_MODULE_1__[\"default\"].convertByMask(value, options.mask);\r\n    } else if (typeof key === \"string\") {\r\n      convertedKey = _Keys__WEBPACK_IMPORTED_MODULE_1__[\"default\"].convertCamelCase(key);\r\n    }\r\n\r\n    const keyElement = _Render__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createSimpleDOMElement(\"span\", convertedKey, {\r\n      className: \"key\",\r\n    });\r\n    const colonElement = _Render__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createSimpleDOMElement(\"span\", \":&nbsp;\", {\r\n      className: \"colon\",\r\n    });\r\n    itemElement.appendChild(keyElement);\r\n    itemElement.appendChild(colonElement);\r\n  }\r\n\r\n  itemElement.appendChild(valueElement);\r\n\r\n  return itemElement;\r\n};\r\n\r\nconst renderTableHeader = (firstElement) => {\r\n  const line = document.createElement(\"tr\");\r\n  const head = document.createElement(\"thead\");\r\n\r\n  head.appendChild(line);\r\n\r\n  for (let key in firstElement) {\r\n    const cell = document.createElement(\"th\");\r\n    cell.textContent = _Keys__WEBPACK_IMPORTED_MODULE_1__[\"default\"].convertCamelCase(key);\r\n    line.appendChild(cell);\r\n  }\r\n\r\n  return head;\r\n};\r\n\r\nconst renderTableBody = (elements) => {\r\n  const { nullAppearence, boolAppearence } = _Settings_Value__WEBPACK_IMPORTED_MODULE_3__[\"Settings\"];\r\n  const body = document.createElement(\"tbody\");\r\n\r\n  for (let i = 0; i < elements.length; i++) {\r\n    if (!_Settings_Value__WEBPACK_IMPORTED_MODULE_3__[\"Settings\"].hideEqualItems || _Settings_Control__WEBPACK_IMPORTED_MODULE_2__[\"default\"].isUniqueItem(i, elements)) {\r\n      const row = document.createElement(\"tr\");\r\n      const item = elements[i];\r\n\r\n      for (let key in elements[i]) {\r\n        const cell = document.createElement(\"td\");\r\n        let value = \"\";\r\n\r\n        if (item[key] === null) {\r\n          value = nullAppearence;\r\n        } else if (typeof item[key] === \"object\") {\r\n          value = renderJson(null, item[key]);\r\n          cell.appendChild(value);\r\n        } else if (typeof item[key] === \"boolean\") {\r\n          value = boolAppearence[Number(item[key])];\r\n          cell.textContent = value;\r\n        } else {\r\n          value = item[key];\r\n          cell.textContent = value;\r\n        }\r\n\r\n        row.appendChild(cell);\r\n      }\r\n\r\n      body.appendChild(row);\r\n    }\r\n  }\r\n\r\n  return body;\r\n};\r\n\r\nconst removeColumnsByAllValues = (rows) => {\r\n  let cleanedRow = [...rows];\r\n  const firstRow = cleanedRow[0];\r\n  const keysToDelete = Object.keys(firstRow);\r\n\r\n  for (let i = 0; i < rows.length; i++) {\r\n    for (let key of keysToDelete) {\r\n      if (!_Settings_Control__WEBPACK_IMPORTED_MODULE_2__[\"default\"].isHidePropertyByKey(key)) {\r\n        if (_Settings_Control__WEBPACK_IMPORTED_MODULE_2__[\"default\"].isShowProperty(rows[i][key])) {\r\n          keysToDelete.splice(keysToDelete.indexOf(key), 1);\r\n        }\r\n      }\r\n    }\r\n  }\r\n\r\n  for (let i = 0; i < rows.length; i++) {\r\n    for (let key of keysToDelete) {\r\n      delete rows[i][key];\r\n    }\r\n  }\r\n\r\n  return cleanedRow;\r\n};\r\n\r\nconst renderArrayToTable = (data) => {\r\n  const cleanedRows = removeColumnsByAllValues(data);\r\n\r\n  const tableHeader = renderTableHeader(cleanedRows[0]);\r\n  const tableBody = renderTableBody(cleanedRows);\r\n\r\n  const tableElement = _Render__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createSimpleDOMElement(\"table\", \"\", {\r\n    className: \"arrayElements\",\r\n  });\r\n\r\n  tableElement.appendChild(tableHeader);\r\n  tableElement.appendChild(tableBody);\r\n\r\n  return tableElement;\r\n};\r\n\r\nconst renderArray = (key, data) => {\r\n  const listElement = document.createElement(\"ul\");\r\n  listElement.className = \"arrayElements\";\r\n\r\n  for (let i = 0; i < data.length; i++) {\r\n    if (!_Settings_Value__WEBPACK_IMPORTED_MODULE_3__[\"Settings\"].hideEqualItems || _Settings_Control__WEBPACK_IMPORTED_MODULE_2__[\"default\"].isUniqueItem(i, data)) {\r\n      const itemElement = document.createElement(\"li\");\r\n      const renderedValueElement = renderJson(i, data[i], {\r\n        mask: _Settings_Value__WEBPACK_IMPORTED_MODULE_3__[\"Settings\"].keysForArrays[key],\r\n      });\r\n\r\n      if (renderedValueElement) {\r\n        itemElement.className = \"element\";\r\n        itemElement.appendChild(renderedValueElement);\r\n        listElement.appendChild(itemElement);\r\n      }\r\n    }\r\n  }\r\n\r\n  return listElement;\r\n};\r\n\r\nconst renderObject = (value) => {\r\n  const listElement = document.createElement(\"ul\");\r\n  const items = document.createDocumentFragment();\r\n\r\n  listElement.className = \"objectProperties\";\r\n\r\n  for (let key in value) {\r\n    const item = document.createElement(\"li\");\r\n    const renderedValueElement = renderJson(key, value[key]);\r\n\r\n    if (renderedValueElement) {\r\n      item.appendChild(renderedValueElement);\r\n      items.appendChild(item);\r\n    }\r\n  }\r\n\r\n  listElement.appendChild(items);\r\n\r\n  return listElement;\r\n};\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (renderJson);\r\n\n\n//# sourceURL=webpack://ViewJSON/./src/View/Elements.js?");

/***/ }),

/***/ "./src/View/Render.js":
/*!****************************!*\
  !*** ./src/View/Render.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Settings_Value__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Settings/Value */ \"./src/Settings/Value.js\");\n\n\nconst createSimpleDOMElement = (tag, value = \"\", options = {}) => {\n  const element = document.createElement(tag);\n  element.innerHTML = value;\n\n  for (let param in options) {\n    element[param] = options[param];\n  }\n\n  return element;\n};\n\nconst quotElement = createSimpleDOMElement(\"span\", '\"', {\n  className: \"quot\",\n});\n\nconst numberValue = (value) =>\n  createSimpleDOMElement(\"span\", value, { className: \"number\" });\n\nconst stringValue = (value) => {\n  const element = createSimpleDOMElement(\"span\", value, {\n    className: \"string\",\n  });\n\n  element.insertAdjacentElement(\"afterBegin\", quotElement.cloneNode(true));\n  element.insertAdjacentElement(\"beforeEnd\", quotElement.cloneNode(true));\n\n  return element;\n};\n\nconst dateValue = (value) => {\n  const dt = new Date(value);\n  return createSimpleDOMElement(\"span\", dt.toDateString(), {\n    className: \"date\",\n  });\n};\n\nconst booleanValue = (json) =>\n  createSimpleDOMElement(\"span\", _Settings_Value__WEBPACK_IMPORTED_MODULE_0__[\"Settings\"].boolAppearence[+json], {\n    className: \"boolean\",\n  });\n\nconst nullValue = () =>\n  createSimpleDOMElement(\"span\", _Settings_Value__WEBPACK_IMPORTED_MODULE_0__[\"Settings\"].nullAppearence, {\n    className: \"null\",\n  });\n\nconst undefinedValue = () =>\n  createSimpleDOMElement(\"span\", \"undefined\", { className: \"undefined\" });\n\nconst hideAllButton = () =>\n  createSimpleDOMElement(\"input\", null, {\n    id: \"hideAll\",\n    type: \"button\",\n    value: \"Hide All\",\n  });\n\nconst searchInput = () =>\n  createSimpleDOMElement(\"input\", null, { name: \"search\" });\n\nconst searchButton = () =>\n  createSimpleDOMElement(\"input\", null, {\n    type: \"submit\",\n    id: \"search\",\n    value: \"Search\",\n  });\n\nconst resetButton = () =>\n  createSimpleDOMElement(\"input\", null, {\n    type: \"button\",\n    id: \"reset\",\n    value: \"Reset\",\n  });\n\nconst Render = {\n  numberValue,\n  stringValue,\n  dateValue,\n  booleanValue,\n  nullValue,\n  undefinedValue,\n  hideAllButton,\n  searchInput,\n  searchButton,\n  resetButton,\n  createSimpleDOMElement,\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Render);\n\n\n//# sourceURL=webpack://ViewJSON/./src/View/Render.js?");

/***/ }),

/***/ "./src/ViewJSON.js":
/*!*************************!*\
  !*** ./src/ViewJSON.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ViewJSON; });\n/* harmony import */ var _Search__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Search */ \"./src/Search.js\");\n/* harmony import */ var _FormActions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FormActions */ \"./src/FormActions.js\");\n/* harmony import */ var _View_Elements__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./View/Elements */ \"./src/View/Elements.js\");\n/* harmony import */ var _Settings_Value__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Settings/Value */ \"./src/Settings/Value.js\");\n/* harmony import */ var _Data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Data */ \"./src/Data.js\");\n/* harmony import */ var _appError__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./appError */ \"./src/appError.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nclass ViewJSON {\r\n  constructor(el = document.body, json = \"\", settings = \"\") {\r\n    this.el = el;\r\n    this.mainId = \"viewJsonMainBlock\";\r\n\r\n    this.setState = this.setState.bind(this);\r\n    this.clickEventListener = this.clickEventListener.bind(this);\r\n    this.hideObjectOrArray = this.hideObjectOrArray.bind(this);\r\n    this.hideAllJson = this.hideAllJson.bind(this);\r\n    this.hideAll = this.hideAll.bind(this);\r\n    this.generateJSON = this.generateJSON.bind(this);\r\n    this.generate = this.generate.bind(this);\r\n    this.render = this.render.bind(this);\r\n    this.start = this.start.bind(this);\r\n    this.addEvents = this.addEvents.bind(this);\r\n    this.clearEvents = this.clearEvents.bind(this);\r\n    this.clear = this.clear.bind(this);\r\n\r\n    this.json = json;\r\n    this.settings = settings;\r\n\r\n    _appError__WEBPACK_IMPORTED_MODULE_5__[\"default\"].unsetError();\r\n\r\n    this.search = new _Search__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this);\r\n    this.form = new _FormActions__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this);\r\n\r\n    this.state = 0; // 0 - json, 1 - search results\r\n  }\r\n\r\n  setState(newState) {\r\n    this.state = newState;\r\n  }\r\n\r\n  clickEventListener(evt) {\r\n    if (/key/.test(evt.target.className)) {\r\n      let parentElement = evt.target.parentNode;\r\n      let classList = parentElement.className.split(\" \");\r\n      let visibility = classList.indexOf(\"jv-invisible\");\r\n\r\n      if (visibility === -1) {\r\n        visibility = classList.indexOf(\"jv-visible\");\r\n        if (visibility === -1) {\r\n          visibility = classList.length;\r\n        }\r\n        classList[visibility] = \"jv-invisible\";\r\n      } else {\r\n        classList[visibility] = \"jv-visible\";\r\n      }\r\n\r\n      parentElement.className = classList.join(\" \");\r\n    }\r\n  }\r\n\r\n  hideObjectOrArray(parentElement) {\r\n    const classList = parentElement.className.split(\" \");\r\n    let visibility = classList.indexOf(\"jv-invisible\");\r\n\r\n    if (visibility === -1) {\r\n      visibility = classList.indexOf(\"jv-visible\");\r\n      if (visibility === -1) {\r\n        visibility = classList.length;\r\n      }\r\n      classList[visibility] = \"jv-invisible\";\r\n    }\r\n\r\n    parentElement.className = classList.join(\" \");\r\n  }\r\n\r\n  hideAllJson(mainElement = this.mainElement) {\r\n    const mainNode = mainElement.children[0];\r\n\r\n    if (mainNode) {\r\n      const allObjectElements = mainNode.querySelectorAll(\"li > .object\");\r\n      const allArrayElements = mainNode.querySelectorAll(\"li > .array\");\r\n\r\n      for (let i = 0; i < allObjectElements.length; i++) {\r\n        this.hideObjectOrArray(allObjectElements[i]);\r\n      }\r\n\r\n      for (let i = 0; i < allArrayElements.length; i++) {\r\n        this.hideObjectOrArray(allArrayElements[i]);\r\n      }\r\n    }\r\n  }\r\n\r\n  hideAll() {\r\n    if (this.state) {\r\n      // searchResults\r\n      this.search.hideAllSearchResults();\r\n    } else {\r\n      // json\r\n      this.hideAllJson();\r\n    }\r\n  }\r\n\r\n  generateJSON() {\r\n    const renderedJSON = Object(_View_Elements__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(null, _Data__WEBPACK_IMPORTED_MODULE_4__[\"Data\"]);\r\n\r\n    this.mainElement.appendChild(renderedJSON);\r\n    this.state = 0;\r\n  }\r\n\r\n  generate() {\r\n    if (!this.form.actionsElement && _Settings_Value__WEBPACK_IMPORTED_MODULE_3__[\"Settings\"].showSearchPanel) {\r\n      this.el.appendChild(this.form.generate());\r\n      this.form.addEvents();\r\n    }\r\n\r\n    if (this.state) {\r\n      this.el.replaceChild(\r\n        this.mainElement,\r\n        this.search.searchResultsMainElement\r\n      );\r\n      this.state = 0;\r\n    }\r\n\r\n    this.hideAll();\r\n  }\r\n\r\n  render() {\r\n    this.generateJSON();\r\n    this.generate();\r\n\r\n    this.el.appendChild(this.mainElement);\r\n    this.addEvents();\r\n  }\r\n\r\n  start() {\r\n    Object(_Settings_Value__WEBPACK_IMPORTED_MODULE_3__[\"setSettings\"])(this.settings);\r\n    Object(_Data__WEBPACK_IMPORTED_MODULE_4__[\"setData\"])(this.json);\r\n\r\n    this.el.innerHTML = \"\";\r\n\r\n    if (_appError__WEBPACK_IMPORTED_MODULE_5__[\"default\"].isError) {\r\n      this.el.appendChild(_appError__WEBPACK_IMPORTED_MODULE_5__[\"default\"].element);\r\n      return;\r\n    }\r\n\r\n    this.mainElement = document.createElement(\"div\");\r\n    this.mainElement.id = this.mainId;\r\n\r\n    this.render();\r\n  }\r\n\r\n  addEvents() {\r\n    this.mainElement.addEventListener(\"click\", this.clickEventListener);\r\n  }\r\n\r\n  clearEvents() {\r\n    if (this.mainElement) {\r\n      this.mainElement.removeEventListener(\"click\", this.clickEventListener);\r\n    }\r\n  }\r\n\r\n  clear() {\r\n    this.el.innerHTML = \"\";\r\n    this.clearEvents();\r\n    delete this.mainElement;\r\n\r\n    if (this.search) {\r\n      delete this.search.searchResultsMainElement;\r\n    }\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://ViewJSON/./src/ViewJSON.js?");

/***/ }),

/***/ "./src/appError.js":
/*!*************************!*\
  !*** ./src/appError.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst appError = {\r\n  type: \"\",\r\n  message: \"\",\r\n  element: document.createElement(\"div\"),\r\n  isError: false,\r\n\r\n  generateElement: function () {\r\n    const header = document.createElement(\"p\");\r\n    header.innerText = `There is an error in ${this.type}`;\r\n\r\n    const body = document.createElement(\"p\");\r\n    body.innerText = `Error message: ${this.message}`;\r\n\r\n    this.element.innerHTML = \"\";\r\n    this.element.appendChild(header);\r\n    this.element.appendChild(body);\r\n\r\n    this.element.id = \"jsonParseError\";\r\n  },\r\n\r\n  setError: function (err, type) {\r\n    this.type = type;\r\n    this.message = err.message;\r\n    this.isError = true;\r\n    console.error(err);\r\n    this.generateElement();\r\n  },\r\n\r\n  unsetError: function () {\r\n    this.isError = false;\r\n  },\r\n};\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (appError);\r\n\n\n//# sourceURL=webpack://ViewJSON/./src/appError.js?");

/***/ })

/******/ });