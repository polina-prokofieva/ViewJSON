import Render from "./Render";
import Keys from "../Keys";
import Control from "../Settings/Control";
import { Settings } from "../Settings/Value";

const defineTypeOfValue = (value, key) => {
  const { dateAppearence } = Settings;
  let type = typeof value;

  if (type === "object") {
    if (Array.isArray(value)) {
      type = "array";
    } else if (value === null) {
      type = "null";
    }
  } else if (
    dateAppearence &&
    dateAppearence.keys &&
    dateAppearence.keys.includes(key)
  ) {
    type = "date";
  }

  return type;
};

const renderJson = (key, value, options = {}) => {
  const { arraysAsTable, collapseSingleKeys } = Settings;
  const itemElement = document.createElement("div");
  let valueElement;
  let filteredData;

  const type = defineTypeOfValue(value, key);

  if (
    Control.isHidePropertyByKey(key) ||
    Control.isHidePropertyByValue(value) ||
    Control.isAllInnerValuesHided(value)
  ) {
    return null;
  }

  itemElement.className = type;

  switch (type) {
    case "array":
      value = Control.filterElements(value);

      if (arraysAsTable.includes(key)) {
        valueElement = renderArrayToTable(value);
      } else {
        if (collapseSingleKeys && value.length === 1) {
          return renderJson(key, value[0]);
        }
        valueElement = renderArray(key, value);
      }
      break;
    case "object":
      value = Control.filterElements(value);
      const keys = Object.keys(value);
      if (collapseSingleKeys && keys.length === 1) {
        const nextKey = key ? `${key} | ${keys[0]}` : null;
        return renderJson(nextKey, value[keys[0]]);
      }
      valueElement = renderObject(value);
      break;
    case "boolean":
      valueElement = Render.booleanValue(value);
      break;
    case "null":
      valueElement = Render.nullValue();
      break;
    case "date":
      valueElement = Render.dateValue(value);
      break;
    case "undefined":
      valueElement = Render.undefinedValue();
      break;
    case "number":
      valueElement = Render.numberValue(value);
      break;
    case "string":
      valueElement = Render.stringValue(value);
      break;
  }

  if (key) {
    const convertedKey = options.mask
      ? Keys.convertByMask(value, options.mask)
      : Keys.convertCamelCase(key);

    const keyElement = Render.createSimpleDOMElement("span", convertedKey, {
      className: "key",
    });
    const colonElement = Render.createSimpleDOMElement("span", ":&nbsp;", {
      className: "colon",
    });
    itemElement.appendChild(keyElement);
    itemElement.appendChild(colonElement);
  }

  itemElement.appendChild(valueElement);

  return itemElement;
};

const renderTableHeader = (firstElement) => {
  const line = document.createElement("tr");
  const head = document.createElement("thead");

  head.appendChild(line);

  for (let key in firstElement) {
    const cell = document.createElement("th");
    cell.textContent = Keys.convertCamelCase(key);
    line.appendChild(cell);
  }

  return head;
};

const renderTableBody = (elements) => {
  const { nullAppearence, boolAppearence } = Settings;
  const body = document.createElement("tbody");

  for (let i = 0; i < elements.length; i++) {
    const row = document.createElement("tr");
    const item = elements[i];

    for (let key in elements[i]) {
      const cell = document.createElement("td");
      let value = "";

      if (item[key] === null) {
        value = nullAppearence;
      } else if (typeof item[key] === "object") {
        value = "[Object]";
      } else if (typeof item[key] === "boolean") {
        value = boolAppearence[Number(item[key])];
      } else {
        value = item[key];
      }

      cell.textContent = value;
      row.appendChild(cell);
    }
    body.appendChild(row);
  }

  return body;
};

const removeColumnsByAllValues = (rows) => {
  let cleanedRow = [...rows];
  const firstRow = cleanedRow[0];
  const keysToDelete = Object.keys(firstRow);

  for (let i = 0; i < rows.length; i++) {
    for (let key of keysToDelete) {
      if (!Control.isHidePropertyByKey(key)) {
        if (Control.isShowProperty(rows[i][key])) {
          keysToDelete.splice(keysToDelete.indexOf(key), 1);
        }
      }
    }
  }

  for (let i = 0; i < rows.length; i++) {
    for (let key of keysToDelete) {
      delete rows[i][key];
    }
  }

  return cleanedRow;
};

const renderArrayToTable = (data) => {
  const cleanedRows = removeColumnsByAllValues(data);

  const tableHeader = renderTableHeader(cleanedRows[0]);
  const tableBody = renderTableBody(cleanedRows);

  const tableElement = Render.createSimpleDOMElement("table", "", {
    className: "arrayElements",
  });

  tableElement.appendChild(tableHeader);
  tableElement.appendChild(tableBody);

  return tableElement;
};

const renderArray = (key, data) => {
  const listElement = document.createElement("ul");
  listElement.className = "arrayElements";

  for (let innerKey in data) {
    const itemElement = document.createElement("li");
    const renderedValueElement = renderJson(innerKey, data[innerKey], {
      mask: Settings.keysForArrays[key],
    });

    if (renderedValueElement) {
      itemElement.className = "element";
      itemElement.appendChild(renderedValueElement);
      listElement.appendChild(itemElement);
    }
  }

  return listElement;
};

const renderObject = (value) => {
  const listElement = document.createElement("ul");
  const items = document.createDocumentFragment();

  listElement.className = "objectProperties";

  for (let key in value) {
    const item = document.createElement("li");
    const renderedValueElement = renderJson(key, value[key]);

    if (renderedValueElement) {
      item.appendChild(renderedValueElement);
      items.appendChild(item);
    }
  }

  listElement.appendChild(items);

  return listElement;
};

export default renderJson;
