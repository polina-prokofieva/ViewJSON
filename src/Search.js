import renderJson from "./View/Elements";

export default class Search {
  constructor(viewJson) {
    this.viewJson = viewJson;
    this.searchResults = {
      byKey: [],
      byValue: [],
    };
    this.resultClassName = "searchResultItem";
    this.searchResultsId = "searchResultsMainBlock";
  }

  clickEventListener(evt) {
    if (/searchHeader/.test(evt.target.className)) {
      let searchResultsHeader = evt.target,
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

  searchByKeyAndValue(evt) {
    evt.preventDefault();
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

  renderSearchResult(results) {
    const searchResults = document.createDocumentFragment();

    if (results.length >= 1) {
      for (let i = 0; i < results.length; i++) {
        const searchResultItem = document.createElement("div");
        const renderedResult = renderJson(
          null,
          results[i],
          this.viewJson.settings
        );

        if (renderedResult) {
          searchResultItem.className = this.resultClassName;
          searchResultItem.appendChild(renderedResult);
          searchResults.appendChild(searchResultItem);
        }
      }
    } else {
      const nothingFoundElement = document.createElement("p");
      nothingFoundElement.textContent = "Nothing found";
      searchResults.appendChild(nothingFoundElement);
    }

    return searchResults;
  }

  generateTypeOfSearchResults(results, type) {
    const renderedResults = this.renderSearchResult(results);
    const searchHeader = `searchHeader_${type}`;
    const searchResults = `searchResults_${type}`;
    let numberOfResults;

    if (!this[searchHeader]) {
      this[searchHeader] = document.createElement("h4");
    }

    this[searchHeader].className = `searchHeader${
      !results.length ? " nothingFound" : " open"
    }`;

    if (!this[searchResults]) {
      this[searchResults] = document.createElement("div");
    }

    this[searchResults].innerHTML = "";
    this[searchResults].className = `searchResults jv-visible`;

    if (renderedResults) {
      this[searchResults].appendChild(renderedResults);
    }

    numberOfResults = this[searchResults].children.length;
    this[searchHeader].innerHTML = `by ${type} (${numberOfResults} found):`;
  }

  renderSearchResults() {
    const {
      state,
      el,
      mainElement,
      clickEventListener,
      setState,
    } = this.viewJson;

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
      setState(1);
    }

    this.hideAllSearchResults();
  }

  reset() {
    this.searchResults.byKey = [];
    this.searchResults.byValue = [];
  }
}
