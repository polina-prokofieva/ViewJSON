import Render from "./View/Render";

export default class FormAction {
  constructor(viewJSON) {
    this.id = "viewJSONActions";
    this.opened = true;
    this.viewJSON = viewJSON;
    this.search = this.viewJSON.search;

    this.hideAllAction = this.hideAllAction.bind(this);
    this.searchAction = this.searchAction.bind(this);
    this.resetAction = this.resetAction.bind(this);
  }

  hideAllAction(evt) {
    evt.preventDefault();
    this.viewJSON.hideAll();
  }

  searchAction(evt) {
    evt.preventDefault();
    this.search.reset();
    this.search.searchByKeyAndValue(evt);
  }

  resetAction(evt) {
    this.search.reset();
    this.viewJSON.generate();
  }

  createSearchForm() {
    if (!this.searchInput) {
      this.searchInput = Render.searchInput();
      this.searchButton = Render.searchButton();
      this.resetButton = Render.resetButton();
    }
  }

  addEvents() {
    this.hideAllButton.addEventListener("click", this.hideAllAction);
    this.resetButton.addEventListener("click", this.resetAction);
    this.actionsElement.addEventListener("submit", this.searchAction);
  }

  clearEvents() {
    this.hideAllButton.removeEventListener("click", this.hideAllAction);
    this.resetButton.removeEventListener("click", this.resetAction);
    this.actionsElement.removeEventListener("submit", this.searchAction);
  }

  generate() {
    if (!this.actionsElement) {
      this.actionsElement = document.createElement("form");
      this.actionsElement.id = this.id;

      this.hideAllButton = Render.hideAllButton();
      this.createSearchForm();

      this.actionsElement.appendChild(this.hideAllButton);

      this.actionsElement.appendChild(this.resetButton);
      this.actionsElement.appendChild(this.searchButton);
      this.actionsElement.appendChild(this.searchInput);
    }

    return this.actionsElement;
  }
}
