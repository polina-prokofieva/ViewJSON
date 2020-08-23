import Search from "./Search";
import FormAction from "./FormActions";
import renderJson from "./View/Elements";
import { Settings, setSettings } from "./Settings/Value";
import { Data, setData } from "./Data";
import appError from "./appError";

export default class ViewJSON {
  constructor(el = document.body, json = "", settings = "") {
    this.el = el;
    this.mainId = "viewJsonMainBlock";

    this.setState = this.setState.bind(this);
    this.clickEventListener = this.clickEventListener.bind(this);
    this.hideObjectOrArray = this.hideObjectOrArray.bind(this);
    this.hideAllJson = this.hideAllJson.bind(this);
    this.hideAll = this.hideAll.bind(this);
    this.generateJSON = this.generateJSON.bind(this);
    this.generate = this.generate.bind(this);
    this.render = this.render.bind(this);
    this.start = this.start.bind(this);
    this.addEvents = this.addEvents.bind(this);
    this.clearEvents = this.clearEvents.bind(this);
    this.clear = this.clear.bind(this);

    this.json = json;
    this.settings = settings;

    appError.unsetError();

    this.search = new Search(this);
    this.form = new FormAction(this);

    this.state = 0; // 0 - json, 1 - search results
  }

  setState(newState) {
    this.state = newState;
  }

  clickEventListener(evt) {
    if (/key/.test(evt.target.className)) {
      let parentElement = evt.target.parentNode;
      let classList = parentElement.className.split(" ");
      let visibility = classList.indexOf("jv-invisible");

      if (visibility === -1) {
        visibility = classList.indexOf("jv-visible");
        if (visibility === -1) {
          visibility = classList.length;
        }
        classList[visibility] = "jv-invisible";
      } else {
        classList[visibility] = "jv-visible";
      }

      parentElement.className = classList.join(" ");
    }
  }

  hideObjectOrArray(parentElement) {
    const classList = parentElement.className.split(" ");
    let visibility = classList.indexOf("jv-invisible");

    if (visibility === -1) {
      visibility = classList.indexOf("jv-visible");
      if (visibility === -1) {
        visibility = classList.length;
      }
      classList[visibility] = "jv-invisible";
    }

    parentElement.className = classList.join(" ");
  }

  hideAllJson(mainElement = this.mainElement) {
    const mainNode = mainElement.children[0];

    if (mainNode) {
      const allObjectElements = mainNode.getElementsByClassName("object");
      const allArrayElements = mainNode.getElementsByClassName("array");

      for (let i = 0; i < allObjectElements.length; i++) {
        this.hideObjectOrArray(allObjectElements[i]);
      }

      for (let i = 0; i < allArrayElements.length; i++) {
        this.hideObjectOrArray(allArrayElements[i]);
      }
    }
  }

  hideAll() {
    if (this.state) {
      // searchResults
      this.search.hideAllSearchResults();
    } else {
      // json
      this.hideAllJson();
    }
  }

  generateJSON() {
    const renderedJSON = renderJson(null, Data);

    this.mainElement.appendChild(renderedJSON);
    this.state = 0;
  }

  generate() {
    if (!this.form.actionsElement && Settings.showSearchPanel) {
      this.el.appendChild(this.form.generate());
      this.form.addEvents();
    }

    if (this.state) {
      this.el.replaceChild(
        this.mainElement,
        this.search.searchResultsMainElement
      );
      this.state = 0;
    }

    this.hideAll();
  }

  render() {
    this.generateJSON();
    this.generate();

    this.el.appendChild(this.mainElement);
    this.addEvents();
  }

  start() {
    setSettings(this.settings);
    setData(this.json);

    this.el.innerHTML = "";

    if (appError.isError) {
      this.el.appendChild(appError.element);
      return;
    }

    this.mainElement = document.createElement("div");
    this.mainElement.id = this.mainId;

    this.render();
  }

  addEvents() {
    this.mainElement.addEventListener("click", this.clickEventListener);
  }

  clearEvents() {
    if (this.mainElement) {
      this.mainElement.removeEventListener("click", this.clickEventListener);
    }
  }

  clear() {
    this.el.innerHTML = "";
    this.clearEvents();
    delete this.mainElement;

    if (this.search) {
      delete this.search.searchResultsMainElement;
    }
  }
}
