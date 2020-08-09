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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Render */ \"./src/Render.js\");\n\n\nconst defineTypeOfValue = (value, { dateAppearence }, key) => {\n  let type = typeof value;\n\n  if (type === \"object\") {\n    if (Array.isArray(value)) {\n      type = \"array\";\n    } else if (value === null) {\n      type = \"null\";\n    }\n  } else if (dateAppearence.keys.includes(key)) {\n    type = \"date\";\n  }\n\n  return type;\n};\n\nconst isHidePropertyByKey = (key, { hidePropertiesByKey }) =>\n  hidePropertiesByKey.includes(key);\n\nconst isHidePropertyByValue = (value, { hidePropertiesByValue }) =>\n  hidePropertiesByValue.includes(value);\n\nconst renderJson = (value, settings, key) => {\n  const { arraysAsTable } = settings;\n\n  const itemElement = document.createElement(\"div\");\n  let valueElement;\n\n  const type = defineTypeOfValue(value, settings, key);\n\n  if (\n    isHidePropertyByKey(key, settings) ||\n    isHidePropertyByValue(value, settings)\n  ) {\n    return null;\n  }\n\n  itemElement.className = type;\n\n  if (key) {\n    const keyElement = _Render__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createSimpleDOMElement(\"span\", key, {\n      className: \"key\",\n    });\n    const colonElement = _Render__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createSimpleDOMElement(\"span\", \":&nbsp;\", {\n      className: \"colon\",\n    });\n    itemElement.appendChild(keyElement);\n    itemElement.appendChild(colonElement);\n  }\n\n  switch (type) {\n    case \"array\":\n      if (arraysAsTable.includes(key)) {\n        valueElement = renderArrayToTable(value, settings);\n      } else {\n        valueElement = renderArray(value, settings, key);\n      }\n      break;\n    case \"object\":\n      valueElement = renderObject(value, settings);\n      break;\n    case \"boolean\":\n      valueElement = _Render__WEBPACK_IMPORTED_MODULE_0__[\"default\"].booleanValue(value, settings);\n      break;\n    case \"null\":\n      valueElement = _Render__WEBPACK_IMPORTED_MODULE_0__[\"default\"].nullValue(settings);\n      break;\n    case \"date\":\n      valueElement = _Render__WEBPACK_IMPORTED_MODULE_0__[\"default\"].dateValue(value);\n      break;\n    case \"undefined\":\n      valueElement = _Render__WEBPACK_IMPORTED_MODULE_0__[\"default\"].undefinedValue();\n      break;\n    case \"number\":\n      valueElement = _Render__WEBPACK_IMPORTED_MODULE_0__[\"default\"].numberValue(value);\n      break;\n    case \"string\":\n      valueElement = _Render__WEBPACK_IMPORTED_MODULE_0__[\"default\"].stringValue(value);\n      break;\n  }\n\n  itemElement.appendChild(valueElement);\n\n  return itemElement;\n};\n\nconst renderTableHeader = (firstElement, settings) => {\n  const line = document.createElement(\"tr\");\n  const head = document.createElement(\"thead\");\n\n  head.appendChild(line);\n\n  for (let key in firstElement) {\n    if (!isHidePropertyByKey(key, settings)) {\n      const cell = document.createElement(\"th\");\n      cell.textContent = key;\n      line.appendChild(cell);\n    }\n  }\n\n  return head;\n};\n\nconst renderTableBody = (elements, settings) => {\n  const { nullAppearence } = settings;\n  const body = document.createElement(\"tbody\");\n  // let html = \"<tbody>\";\n\n  // html += elements\n  // .map((item) => {\n  //   let h = \"<tr>\";\n\n  //   for (let key in item) {\n  //     if (!isHidePropertyByKey(key, settings)) {\n  //       h += \"<td>\";\n  //       if (item[key] && typeof item[key] === \"object\") {\n  //         h += \"[Object]\";\n  //       } else {\n  //         h += item[key] || nullAppearence;\n  //       }\n\n  //       h += \"</td>\";\n  //     }\n  //   }\n\n  //   h += \"</tr>\";\n\n  //   return h;\n  // })\n  // .join(\"\");\n\n  console.log(elements);\n\n  for (let i = 0; i < elements.length; i++) {\n    const row = document.createElement(\"tr\");\n    const item = elements[i];\n\n    for (let key in elements[i]) {\n      console.log(`key = ${key}`);\n\n      if (!isHidePropertyByKey(key, settings)) {\n        const cell = document.createElement(\"td\");\n        let value = \"\";\n\n        if (item[key] && typeof item[key] === \"object\") {\n          value = \"[Object]\";\n        } else {\n          value = item[key] || nullAppearence;\n        }\n\n        cell.textContent = value;\n        row.appendChild(cell);\n      }\n    }\n\n    body.appendChild(row);\n  }\n\n  // html += \"</tbody>\";\n\n  return body;\n};\n\nconst renderArrayToTable = (value, settings) => {\n  let html = \"\";\n  const filteredItems = value.filter(\n    (item) => !isHidePropertyByValue(item, settings)\n  );\n\n  console.log(\"filteredItems:\");\n  console.log(filteredItems);\n\n  const tableHeader = renderTableHeader(filteredItems[0], settings);\n  const tableBody = renderTableBody(filteredItems, settings);\n\n  const tableElement = _Render__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createSimpleDOMElement(\"table\", \"\", {\n    className: \"arrayElements\",\n  });\n\n  tableElement.appendChild(tableHeader);\n  tableElement.appendChild(tableBody);\n\n  return tableElement;\n};\n\nconst convertKeyByMask = (item, mask) =>\n  mask.replace(/\\{(\\w|\\.)+\\}/g, function (part) {\n    const path = part.slice(1, -1).split(\".\");\n    let convertedKey = item[path[0]];\n\n    for (let i = 1; i < path.length; i++) {\n      if (convertedKey && convertedKey[path[i]]) {\n        convertedKey = convertedKey[path[i]];\n      } else {\n        convertedKey = \"-\";\n        break;\n      }\n    }\n\n    return convertedKey || \"-\";\n  });\n\nconst renderArray = (value, settings, key) => {\n  const { keysForArrays } = settings;\n  const filteredItems = value.filter(\n    (item) => !isHidePropertyByValue(item, settings)\n  );\n  const listElement = document.createElement(\"ul\");\n  listElement.className = \"arrayElements\";\n\n  for (let item in filteredItems) {\n    const itemElement = document.createElement(\"li\");\n    const keyName = keysForArrays[key]\n      ? convertKeyByMask(item, keysForArrays[key])\n      : key;\n    const renderedValueElement = renderJson(item, settings, keyName);\n\n    if (renderedValueElement) {\n      itemElement.className = \"element\";\n      itemElement.appendChild(renderedValueElement);\n      listElement.appendChild(itemElement);\n    }\n  }\n\n  return listElement;\n};\n\nconst convertKey = (key, settings) => {\n  if (settings.formatCamelCase) {\n    const words = key.match(/((^[a-z])|[A-Z])[a-z]+/g);\n    return words ? words.join(\" \") : key;\n  }\n\n  return key;\n};\n\nconst renderObject = (value, settings) => {\n  const listElement = document.createElement(\"ul\");\n  const items = document.createDocumentFragment();\n\n  listElement.className = \"objectProperties\";\n\n  for (let key in value) {\n    const item = document.createElement(\"li\");\n    const convertedKey = convertKey(key, settings);\n    const renderedValueElement = renderJson(value[key], settings, convertedKey);\n\n    if (renderedValueElement) {\n      item.appendChild(renderedValueElement);\n      items.appendChild(item);\n    }\n  }\n\n  listElement.appendChild(items);\n\n  return listElement;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (renderJson);\n\n\n//# sourceURL=webpack://ViewJSON/./src/Elements.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\nconst createSimpleDOMElement = (tag, value = \"\", options = {}) => {\n  const element = document.createElement(tag);\n  element.innerHTML = value;\n\n  for (let param in options) {\n    element[param] = options[param];\n  }\n\n  return element;\n};\n\nconst quotElement = createSimpleDOMElement(\"span\", '\"', {\n  className: \"quot\",\n});\n\nconst numberValue = (value) =>\n  createSimpleDOMElement(\"span\", value, { className: \"number\" });\n\nconst stringValue = (value) => {\n  const element = createSimpleDOMElement(\"span\", value, {\n    className: \"string\",\n  });\n\n  element.insertAdjacentElement(\"afterBegin\", quotElement.cloneNode(true));\n  element.insertAdjacentElement(\"beforeEnd\", quotElement.cloneNode(true));\n\n  return element;\n};\n\nconst dateValue = (value) => {\n  const dt = new Date(value);\n  return createSimpleDOMElement(\"span\", dt.toDateString(), {\n    className: \"date\",\n  });\n};\n\nconst booleanValue = (json, { boolAppearence }) =>\n  createSimpleDOMElement(\"span\", boolAppearence[+json], {\n    className: \"boolean\",\n  });\n\nconst nullValue = ({ nullAppearence }) =>\n  createSimpleDOMElement(\"span\", nullAppearence, { className: \"null\" });\n\nconst undefinedValue = () =>\n  createSimpleDOMElement(\"span\", \"undefined\", { className: \"undefined\" });\n\nconst hideAllButton = () => {\n  const element = document.createElement(\"input\");\n\n  element.id = \"hideAll\";\n  element.type = \"button\";\n  element.value = \"Hide All\";\n\n  return element;\n};\n\nconst searchInput = () => {\n  const element = document.createElement(\"input\");\n  element.name = \"search\";\n\n  return element;\n};\n\nconst searchButton = () => {\n  const element = document.createElement(\"input\");\n\n  element.type = \"submit\";\n  element.id = \"search\";\n  element.value = \"Search\";\n\n  return element;\n};\n\nconst resetButton = () => {\n  const element = document.createElement(\"input\");\n  element.type = \"button\";\n  element.id = \"reset\";\n  element.value = \"Reset\";\n\n  return element;\n};\n\nconst Render = {\n  numberValue,\n  stringValue,\n  dateValue,\n  booleanValue,\n  nullValue,\n  undefinedValue,\n  hideAllButton,\n  searchInput,\n  searchButton,\n  resetButton,\n  createSimpleDOMElement,\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Render);\n\n\n//# sourceURL=webpack://ViewJSON/./src/Render.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ViewJSON; });\n/* harmony import */ var _Search__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Search */ \"./src/Search.js\");\n/* harmony import */ var _FormActions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FormActions */ \"./src/FormActions.js\");\n/* harmony import */ var _Elements__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Elements */ \"./src/Elements.js\");\n\r\n\r\n\r\n\r\nclass ViewJSON {\r\n  constructor(el = document.body, json = \"\", settings = \"\") {\r\n    this.el = el;\r\n    this.mainId = \"viewJsonMainBlock\";\r\n\r\n    this.setState = this.setState.bind(this);\r\n    this.clickEventListener = this.clickEventListener.bind(this);\r\n    this.hideObjectOrArray = this.hideObjectOrArray.bind(this);\r\n    this.hideAllJson = this.hideAllJson.bind(this);\r\n    this.hideAll = this.hideAll.bind(this);\r\n    this.generateJSON = this.generateJSON.bind(this);\r\n    this.generate = this.generate.bind(this);\r\n    this.render = this.render.bind(this);\r\n    this.start = this.start.bind(this);\r\n    this.addEvents = this.addEvents.bind(this);\r\n    this.clearEvents = this.clearEvents.bind(this);\r\n    this.clear = this.clear.bind(this);\r\n\r\n    try {\r\n      this.json = JSON.parse(json.replace(/\\s/g, \"\"));\r\n      this.settings = JSON.parse(settings.replace(/\\/\\/.*\\n/g, \"\"));\r\n\r\n      this.search = new _Search__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this);\r\n      this.form = new _FormActions__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this);\r\n\r\n      this.state = 0; // 0 - json, 1 - search results\r\n      this.root = this.settings.root || this.json;\r\n    } catch (err) {\r\n      this.errorMessage = err.message;\r\n      console.error(err);\r\n    }\r\n  }\r\n\r\n  setState(newState) {\r\n    this.state = newState;\r\n  }\r\n\r\n  clickEventListener(evt) {\r\n    if (/key/.test(evt.target.className)) {\r\n      let parentElement = evt.target.parentNode;\r\n      let classList = parentElement.className.split(\" \");\r\n      let visibility = classList.indexOf(\"jv-invisible\");\r\n\r\n      if (visibility === -1) {\r\n        visibility = classList.indexOf(\"jv-visible\");\r\n        if (visibility === -1) {\r\n          visibility = classList.length;\r\n        }\r\n        classList[visibility] = \"jv-invisible\";\r\n      } else {\r\n        classList[visibility] = \"jv-visible\";\r\n      }\r\n\r\n      parentElement.className = classList.join(\" \");\r\n    }\r\n  }\r\n\r\n  hideObjectOrArray(parentElement) {\r\n    const classList = parentElement.className.split(\" \");\r\n    let visibility = classList.indexOf(\"jv-invisible\");\r\n\r\n    if (visibility === -1) {\r\n      visibility = classList.indexOf(\"jv-visible\");\r\n      if (visibility === -1) {\r\n        visibility = classList.length;\r\n      }\r\n      classList[visibility] = \"jv-invisible\";\r\n    }\r\n\r\n    parentElement.className = classList.join(\" \");\r\n  }\r\n\r\n  hideAllJson(mainElement = this.mainElement) {\r\n    const mainNode = mainElement.children[0];\r\n\r\n    if (mainNode) {\r\n      const allObjectElements = mainNode.getElementsByClassName(\"object\");\r\n      const allArrayElements = mainNode.getElementsByClassName(\"array\");\r\n\r\n      for (let i = 0; i < allObjectElements.length; i++) {\r\n        this.hideObjectOrArray(allObjectElements[i]);\r\n      }\r\n\r\n      for (let i = 0; i < allArrayElements.length; i++) {\r\n        this.hideObjectOrArray(allArrayElements[i]);\r\n      }\r\n    }\r\n  }\r\n\r\n  hideAll() {\r\n    if (this.state) {\r\n      // searchResults\r\n      this.search.hideAllSearchResults();\r\n    } else {\r\n      // json\r\n      this.hideAllJson();\r\n    }\r\n  }\r\n\r\n  generateJSON() {\r\n    const renderedJSON = Object(_Elements__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this.root, this.settings);\r\n\r\n    this.mainElement.appendChild(renderedJSON);\r\n    this.state = 0;\r\n  }\r\n\r\n  generate() {\r\n    if (!this.form.actionsElement && this.settings.showSearchPanel) {\r\n      this.el.appendChild(this.form.generate());\r\n      this.form.addEvents();\r\n    }\r\n\r\n    if (this.state) {\r\n      this.el.replaceChild(\r\n        this.mainElement,\r\n        this.search.searchResultsMainElement\r\n      );\r\n      this.state = 0;\r\n    }\r\n\r\n    this.hideAll();\r\n  }\r\n\r\n  render() {\r\n    if (this.settings.root) {\r\n      let rootKeys = this.settings.root.split(\"/\");\r\n      for (let i = 0; i < rootKeys.length; i++) {\r\n        this.root = this.root[rootKeys[i]];\r\n      }\r\n    }\r\n\r\n    this.generateJSON();\r\n    this.generate();\r\n\r\n    this.el.appendChild(this.mainElement);\r\n    this.addEvents();\r\n  }\r\n\r\n  start() {\r\n    if (!this.el) {\r\n      console.error(\"Incorrect HTML element passed to class ViewJSON\");\r\n      return;\r\n    }\r\n\r\n    if (!this.json) {\r\n      this.el.innerHTML = `<div id=\"jsonParseError\"><p>There is an error in json file</p><p>Error message: ${this.errorMessage}</p></div>`;\r\n      return;\r\n    }\r\n\r\n    if (!this.settings) {\r\n      this.el.innerHTML = `<div id=\"jsonParseError\"><p>There is an error in settings json</p><p>Error message: ${this.errorMessage}</p></div>`;\r\n      return;\r\n    }\r\n\r\n    this.el.innerHTML = \"\";\r\n    this.mainElement = document.createElement(\"div\");\r\n    this.mainElement.id = this.mainId;\r\n\r\n    this.render();\r\n  }\r\n\r\n  addEvents() {\r\n    this.mainElement.addEventListener(\"click\", this.clickEventListener);\r\n  }\r\n\r\n  clearEvents() {\r\n    if (this.mainElement) {\r\n      this.mainElement.removeEventListener(\"click\", this.clickEventListener);\r\n    }\r\n  }\r\n\r\n  clear() {\r\n    this.el.innerHTML = \"\";\r\n    this.clearEvents();\r\n    delete this.mainElement;\r\n\r\n    if (this.search) {\r\n      delete this.search.searchResultsMainElement;\r\n    }\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://ViewJSON/./src/ViewJSON.js?");

/***/ })

/******/ });