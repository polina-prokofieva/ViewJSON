import Render from "./Render";

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

const isHidePropertyByKey = (key, { hidePropertiesByKey }) =>
  hidePropertiesByKey.includes(key);

const isHidePropertyByValue = (value, { hidePropertiesByValue }) =>
  hidePropertiesByValue.includes(value);

const renderJson = (value, settings, key) => {
  const { arraysAsTable } = settings;

  const itemElement = document.createElement("div");
  let valueElement;

  const type = defineTypeOfValue(value, settings, key);

  if (
    isHidePropertyByKey(key, settings) ||
    isHidePropertyByValue(value, settings)
  ) {
    return null;
  }

  itemElement.className = type;

  if (key) {
    const keyElement = Render.createSimpleDOMElement("span", key, {
      className: "key",
    });
    const colonElement = Render.createSimpleDOMElement("span", ":&nbsp;", {
      className: "colon",
    });
    itemElement.appendChild(keyElement);
    itemElement.appendChild(colonElement);
  }

  switch (type) {
    case "array":
      if (arraysAsTable.includes(key)) {
        valueElement = renderArrayToTable(value, settings);
      } else {
        valueElement = renderArray(value, settings, key);
      }
      break;
    case "object":
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

  itemElement.appendChild(valueElement);

  return itemElement;
};

const renderTableHeader = (firstElement, settings) => {
  const line = document.createElement("tr");
  const head = document.createElement("thead");

  head.appendChild(line);

  for (let key in firstElement) {
    const cell = document.createElement("th");
    cell.textContent = key;
    line.appendChild(cell);
  }

  return head;
};

const renderTableBody = (elements, settings) => {
  const { nullAppearence } = settings;
  const body = document.createElement("tbody");

  for (let i = 0; i < elements.length; i++) {
    const row = document.createElement("tr");
    const item = elements[i];

    for (let key in elements[i]) {
      const cell = document.createElement("td");
      let value = "";

      if (item[key] && typeof item[key] === "object") {
        value = "[Object]";
      } else {
        value = item[key] || nullAppearence;
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
      if (!isHidePropertyByKey(key, settings)) {
        if (!isHidePropertyByValue(rows[i][key], settings)) {
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

const renderArrayToTable = (value, settings) => {
  const filteredItems = value.filter(
    (item) => !isHidePropertyByValue(item, settings)
  );

  const cleanedRows = removeColumnsByAllValues(filteredItems, settings);

  const tableHeader = renderTableHeader(cleanedRows[0], settings);
  const tableBody = renderTableBody(cleanedRows, settings);

  const tableElement = Render.createSimpleDOMElement("table", "", {
    className: "arrayElements",
  });

  tableElement.appendChild(tableHeader);
  tableElement.appendChild(tableBody);

  return tableElement;
};

const convertKey = (key, settings) => {
  if (settings.formatCamelCase) {
    const words = key.match(/((^[a-z])|[A-Z])[a-z]+/g);
    return words ? words.join(" ") : key;
  }

  return key;
};

const convertKeyByMask = (item, mask) =>
  mask.replace(/\{(\w|\.)+\}/g, function (part) {
    const path = part.slice(1, -1).split(".");
    let convertedKey = item[path[0]];

    for (let i = 1; i < path.length; i++) {
      if (convertedKey && convertedKey[path[i]]) {
        convertedKey = convertedKey[path[i]];
      } else {
        convertedKey = "-";
        break;
      }
    }

    return convertedKey || "-";
  });

const renderArray = (value, settings, key) => {
  const { keysForArrays } = settings;
  const filteredItems = value.filter(
    (item) => !isHidePropertyByValue(item, settings)
  );
  const listElement = document.createElement("ul");
  listElement.className = "arrayElements";

  for (let item in filteredItems) {
    const itemElement = document.createElement("li");
    const keyName = keysForArrays[key]
      ? convertKeyByMask(item, keysForArrays[key])
      : key;
    const renderedValueElement = renderJson(item, settings, keyName);

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
    const convertedKey = convertKey(key, settings);
    const renderedValueElement = renderJson(value[key], settings, convertedKey);

    if (renderedValueElement) {
      item.appendChild(renderedValueElement);
      items.appendChild(item);
    }
  }

  listElement.appendChild(items);

  return listElement;
};

export default renderJson;
