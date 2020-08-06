const numberValue = (json) => `<span class="number">${json}</span>`;

const stringValue = (json) =>
  `<span class="string"><span class="quot">"</span>${json}<span class="quot">"</span></span>`;

const dateValue = (json) => {
  let dt = new Date(json);
  return `<span class="boolean">${dt.toDateString()}</span>`;
};

const booleanValue = (json, { boolAppearence }) =>
  `<span class="boolean">${boolAppearence[+json]}</span>`;

const nullValue = ({ nullAppearence }) =>
  `<span class="null">${nullAppearence}</span>`;

const undefinedValue = () => `<span class="undefined">undefined</span>`;

const hideAllButton = () => {
  const element = document.createElement("input");

  element.id = "hideAll";
  element.type = "button";
  element.value = "Hide All";

  return element;
};

const searchInput = () => {
  const element = document.createElement("input");
  element.name = "search";

  return element;
};

const searchButton = () => {
  const element = document.createElement("input");

  element.type = "submit";
  element.id = "search";
  element.value = "Search";

  return element;
};

const resetButton = () => {
  const element = document.createElement("input");
  element.type = "button";
  element.id = "reset";
  element.value = "Reset";

  return element;
};

const Render = {
  numberValue,
  stringValue,
  dateValue,
  booleanValue,
  nullValue,
  undefinedValue,
  hideAllButton,
  searchInput,
  searchButton,
  resetButton,
};

export default Render;
