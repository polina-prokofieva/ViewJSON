import Render from "./Render";
import renderArrayToTable from "./Table";
import Keys from "../Settings/Keys";
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

        if (arraysAsTable.includes(keys[0])) {
          return renderArrayToTable(value[keys[0]]);
        } else {
          return renderJson(nextKey, value[keys[0]]);
        }
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

  if (key !== null) {
    let convertedKey = key;

    if (options.mask) {
      convertedKey = Keys.convertByMask(value, options.mask);
    } else if (typeof key === "string") {
      convertedKey = Keys.convertCamelCase(key);
    }

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

const renderArray = (key, data) => {
  const listElement = document.createElement("ul");
  listElement.className = "arrayElements";

  for (let i = 0; i < data.length; i++) {
    if (!Settings.hideEqualItems || Control.isUniqueItem(i, data)) {
      const itemElement = document.createElement("li");
      const renderedValueElement = renderJson(i, data[i], {
        mask: Settings.keysForArrays[key],
      });

      if (renderedValueElement) {
        itemElement.className = "element";
        itemElement.appendChild(renderedValueElement);
        listElement.appendChild(itemElement);
      }
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
