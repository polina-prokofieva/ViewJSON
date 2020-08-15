const createSimpleDOMElement = (tag, value = "", options = {}) => {
  const element = document.createElement(tag);
  element.innerHTML = value;

  for (let param in options) {
    element[param] = options[param];
  }

  return element;
};

const quotElement = createSimpleDOMElement("span", '"', {
  className: "quot",
});

const numberValue = (value) =>
  createSimpleDOMElement("span", value, { className: "number" });

const stringValue = (value) => {
  const element = createSimpleDOMElement("span", value, {
    className: "string",
  });

  element.insertAdjacentElement("afterBegin", quotElement.cloneNode(true));
  element.insertAdjacentElement("beforeEnd", quotElement.cloneNode(true));

  return element;
};

const dateValue = (value) => {
  const dt = new Date(value);
  return createSimpleDOMElement("span", dt.toDateString(), {
    className: "date",
  });
};

const booleanValue = (json, { boolAppearence }) =>
  createSimpleDOMElement("span", boolAppearence[+json], {
    className: "boolean",
  });

const nullValue = ({ nullAppearence }) =>
  createSimpleDOMElement("span", nullAppearence, { className: "null" });

const undefinedValue = () =>
  createSimpleDOMElement("span", "undefined", { className: "undefined" });

const hideAllButton = () =>
  createSimpleDOMElement("input", null, {
    id: "hideAll",
    type: "button",
    value: "Hide All",
  });

const searchInput = () =>
  createSimpleDOMElement("input", null, { name: "search" });

const searchButton = () =>
  createSimpleDOMElement("input", null, {
    type: "submit",
    id: "search",
    value: "Search",
  });

const resetButton = () =>
  createSimpleDOMElement("input", null, {
    type: "button",
    id: "reset",
    value: "Reset",
  });

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
  createSimpleDOMElement,
};

export default Render;
