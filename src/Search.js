import renderJson from "./Elements";

export default class Search {
  constructor(viewJson) {
    this.searchResults = {
      byKey: [],
      byValue: [],
    };
    this.resultClassName = "searchResultItem";
    this.viewJson = viewJson;
    this.searchResultsId = "searchResultsMainBlock";
  }

  clickEventListener(e) {
    if (/searchHeader/.test(e.target.className)) {
      let searchResultsHeader = e.target,
        searchResults = searchResultsHeader.nextElementSibling,
        classList = searchResults.className.split(" "),
        visibility = classList.indexOf("jv-visible");

      if (visibility === -1) {
        classList[classList.length] = "jv-visible";
        searchResultsHeader.className += " open";
      } else {
        classList.splice(visibility, 1);
        searchResultsHeader.className = searchResultsHeader.className.replace(
          /\sopen/g,
          ""
        );
      }

      searchResults.className = classList.join(" ");
    }
  }

  searchByKeyAndValue(ev) {
    ev.preventDefault();
    const { json, addEvents } = this.viewJson;
    let key = document.getElementsByName("search")[0].value.toLowerCase();

    if (json && typeof json === "object") {
      if (Array.isArray(json)) {
        this.searchInArray(key, json);
      } else {
        this.searchInObject(key, json);
      }
    }

    this.renderSearchResults();
    addEvents();
  }

  searchInArray(key, arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] && typeof arr[i] === "object") {
        if (Array.isArray(arr[i])) {
          this.searchInArray(key, arr[i]);
        } else {
          this.searchInObject(key, arr[i]);
        }
      } else if (arr[i].toString().toLowerCase().indexOf(key) !== -1) {
        this.searchResults.byValue.push(arr[i]);
      }
    }
  }

  searchInObject(key, obj) {
    let res = {};

    for (let k in obj) {
      if (k.toLowerCase().indexOf(key) !== -1) {
        res[k] = obj[k];
        this.searchResults.byKey.push(Object.assign({}, res));
        res = {};
      }

      if (obj[k] && typeof obj[k] === "object") {
        if (Array.isArray(obj[k])) {
          this.searchInArray(key, obj[k]);
        } else {
          this.searchInObject(key, obj[k]);
        }
      } else if (
        obj[k] &&
        obj[k].toString().toLowerCase().indexOf(key) !== -1
      ) {
        res[k] = obj[k];
        this.searchResults.byValue.push(Object.assign({}, res));
        res = {};
      }
    }
  }

  hideAllSearchResults() {
    this.searchResultsElements = this.searchResultsMainElement.getElementsByClassName(
      this.resultClassName
    );

    for (let i = 0; i < this.searchResultsElements.length; i++) {
      this.viewJson.hideAllJson(this.searchResultsElements[i]);
    }
  }

  generateTypeOfSearchResults(results, type) {
    let html = "";

    if (!this[`searchHeader_${type}`]) {
      this[`searchHeader_${type}`] = document.createElement("h4");
    }

    this[`searchHeader_${type}`].className = `searchHeader${
      !results.length ? " nothingFound" : " open"
    }`;
    this[
      `searchHeader_${type}`
    ].innerHTML = `by ${type} (${results.length} found):`;

    if (!this[`searchResults_${type}`]) {
      this[`searchResults_${type}`] = document.createElement("div");
    }

    this[`searchResults_${type}`].className = `searchResults jv-visible`;

    if (results.length >= 1) {
      for (let i = 0; i < results.length; i++) {
        html += `<div class="${this.resultClassName}">${renderJson(
          results[i],
          this.viewJson.settings
        )}</div>`;
      }
    } else {
      html += `<p> Nothing found </p>`;
    }

    this[`searchResults_${type}`].innerHTML = html;
  }

  renderSearchResults() {
    const { state, el, mainElement, clickEventListener } = this.viewJson;

    if (!this.searchHeader) {
      this.searchHeader = document.createElement("h3");
      this.searchHeader.innerHTML = "Search Results:";
    }

    this.generateTypeOfSearchResults(this.searchResults.byKey, "key");
    this.generateTypeOfSearchResults(this.searchResults.byValue, "value");

    if (!this.searchResultsMainElement) {
      this.searchResultsMainElement = document.createElement("div");
      this.searchResultsMainElement.id = this.searchResultsId;

      this.searchResultsMainElement.appendChild(this.searchHeader);
      this.searchResultsMainElement.appendChild(this.searchHeader_key);
      this.searchResultsMainElement.appendChild(this.searchResults_key);
      this.searchResultsMainElement.appendChild(this.searchHeader_value);
      this.searchResultsMainElement.appendChild(this.searchResults_value);

      this.searchResultsMainElement.addEventListener(
        "click",
        this.clickEventListener
      );
      this.searchResultsMainElement.addEventListener(
        "click",
        clickEventListener
      );
    }

    if (state === 0) {
      el.replaceChild(this.searchResultsMainElement, mainElement);
      state = 1;
    }

    this.hideAllSearchResults();
  }

  reset() {
    this.searchResults.byKey = [];
    this.searchResults.byValue = [];
  }
}
