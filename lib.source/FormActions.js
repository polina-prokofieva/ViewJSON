'use strict';

class FormAction {
    constructor (viewJSON) {
        this.id = "viewJSONActions";
        this.opened = true;
        this.viewJSON = viewJSON;
    }

    createHideAllButton () {
        if(!this.hideAllButton) {
            this.hideAllButton = document.createElement("input");
            this.hideAllButton.id = 'hideAll';
            this.hideAllButton.type = 'button';
            this.hideAllButton.value = 'Hide All';
        }
    }

    createSearchForm () {
        if(!this.searchInput) {
            this.searchInput = document.createElement("input");
             this.searchInput.name = 'search';

            this.searchButton = document.createElement("input");
            this.searchButton.type = 'submit';
            this.searchButton.id = "search";
            this.searchButton.value = "Search";

            this.resetButton = document.createElement("input");
            this.resetButton.type = "button";
            this.resetButton.id = "reset";
            this.resetButton.value = "Reset";
        }
    }

    addEvents () {
         let self = this;

         if(!self.hideAllAction) {
             self.hideAllAction = function (e) {
                 e.preventDefault();
                 self.viewJSON.hideAll();
             };
         }

         if(!self.searchAction) {
             self.searchAction = function (e) {
                 e.preventDefault();
                 self.viewJSON.search.reset();
                 self.viewJSON.search.searchByKeyAndValue(e);
             };
         }

         if(!self.resetAction) {
             self.resetAction = function (e) {
                 self.viewJSON.search.reset();
                 self.viewJSON.generate();
             };
         }

        this.hideAllButton.addEventListener('click', this.hideAllAction);
        this.resetButton.addEventListener('click', this.resetAction);
        this.actionsElement.addEventListener('submit', this.searchAction);
    }

    clearEvents () {
        this.hideAllButton.removeEventListener('click', this.hideAllAction);
        this.resetButton.removeEventListener('click', this.resetAction);
        this.actionsElement.removeEventListener('submit', this.searchAction);
    }

    generate () {
        if(!this.actionsElement) {
            this.actionsElement = document.createElement("form");
            this.actionsElement.id = this.id;

            this.createHideAllButton();
            this.createSearchForm();

            this.actionsElement.appendChild(this.hideAllButton);

            this.actionsElement.appendChild(this.resetButton);
            this.actionsElement.appendChild(this.searchButton);
            this.actionsElement.appendChild(this.searchInput);
        }

        return this.actionsElement;
    }
}