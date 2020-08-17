import Render from "./Render";
import Keys from "./Keys";
import Settings from "./Settings";

const defineTypeOfValue = (value, { dateAppearence }, key) => {
  let type = typeof value;

  if (type === "object") {
    if (Array.isArray(value)) {
      type = "array";
    } else if (value === null) {
      type = "null";
    }
  } else if (dateAppearence.keys.includes(key)) {
    type = "date";
  }

  return type;
};

const renderJson = (key, value, settings, options = {}) => {
  const { arraysAsTable } = settings;
  const itemElement = document.createElement("div");
  let valueElement;
  let filteredData;

  const type = defineTypeOfValue(value, settings, key);

  if (
    Settings.isHidePropertyByKey(key, settings) ||
    Settings.isHidePropertyByValue(value, settings) ||
    Settings.isAllInnerValuesHided(value, settings)
  ) {
    return null;
  }

  itemElement.className = type;

  switch (type) {
    case "array":
      filteredData = Settings.filterElements(value, settings);

      if (arraysAsTable.includes(key)) {
        valueElement = renderArrayToTable(filteredData, settings);
      } else {
        if (filteredData.length === 1) {
          return renderJson(key, filteredData[0], settings);
        }
        valueElement = renderArray(filteredData, settings, key);
      }
      break;
    case "object":
      filteredData = Settings.filterElements(value, settings);
      const keys = Object.keys(filteredData);
      if (keys.length === 1) {
        const nextKey = key ? `${key} | ${keys[0]}` : null;
        return renderJson(nextKey, filteredData[keys[0]], settings);
      }
      valueElement = renderObject(value, settings);
      break;
    case "boolean":
      valueElement = Render.booleanValue(value, settings);
      break;
    case "null":
      valueElement = Render.nullValue(settings);
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
      : Keys.convertCamelCase(key, settings);

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

const renderTableHeader = (firstElement, settings) => {
  const line = document.createElement("tr");
  const head = document.createElement("thead");

  head.appendChild(line);

  for (let key in firstElement) {
    const cell = document.createElement("th");
    cell.textContent = Keys.convertCamelCase(key, settings);
    line.appendChild(cell);
  }

  return head;
};

const renderTableBody = (elements, settings) => {
  const { nullAppearence, boolAppearence } = settings;
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

const removeColumnsByAllValues = (rows, settings) => {
  let cleanedRow = [...rows];
  const firstRow = cleanedRow[0];
  const keysToDelete = Object.keys(firstRow);

  for (let i = 0; i < rows.length; i++) {
    for (let key of keysToDelete) {
      if (!Settings.isHidePropertyByKey(key, settings)) {
        if (Settings.isShowProperty(rows[i][key], settings)) {
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

const renderArrayToTable = (data, settings) => {
  const cleanedRows = removeColumnsByAllValues(data, settings);

  const tableHeader = renderTableHeader(cleanedRows[0], settings);
  const tableBody = renderTableBody(cleanedRows, settings);

  const tableElement = Render.createSimpleDOMElement("table", "", {
    className: "arrayElements",
  });

  tableElement.appendChild(tableHeader);
  tableElement.appendChild(tableBody);

  return tableElement;
};

const renderArray = (data, settings, key) => {
  const listElement = document.createElement("ul");
  listElement.className = "arrayElements";

  for (let innerKey in data) {
    const itemElement = document.createElement("li");
    const renderedValueElement = renderJson(
      innerKey,
      data[innerKey],
      settings,
      { mask: settings.keysForArrays[key] }
    );

    if (renderedValueElement) {
      itemElement.className = "element";
      itemElement.appendChild(renderedValueElement);
      listElement.appendChild(itemElement);
    }
  }

  return listElement;
};

const renderObject = (value, settings) => {
  const listElement = document.createElement("ul");
  const items = document.createDocumentFragment();

  listElement.className = "objectProperties";

  for (let key in value) {
    const item = document.createElement("li");
    const renderedValueElement = renderJson(key, value[key], settings);

    if (renderedValueElement) {
      item.appendChild(renderedValueElement);
      items.appendChild(item);
    }
  }

  listElement.appendChild(items);

  return listElement;
};

export default renderJson;
