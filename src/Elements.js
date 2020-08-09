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

  let html = "";
  let type = defineTypeOfValue(value, settings, key);

  if (
    isHidePropertyByKey(key, settings) ||
    isHidePropertyByValue(value, settings)
  ) {
    return html;
  }

  html += `<div class="${type}">`;
  html +=
    key !== undefined
      ? `<span class="key">${key}</span><span class="colon">:</span> `
      : "";

  switch (type) {
    case "array":
      if (arraysAsTable.includes(key)) {
        html += renderArrayToTable(value, settings);
      } else {
        html += renderArray(value, settings, key);
      }
      break;
    case "object":
      html += renderObject(value, settings);
      break;
    case "boolean":
      html += Render.booleanValue(value, settings);
      break;
    case "null":
      html += Render.nullValue(settings);
      break;
    case "date":
      html += Render.dateValue(value);
      break;
    case "undefined":
      html += Render.undefinedValue();
      break;
    case "number":
      html += Render.numberValue(value);
      break;
    case "string":
      html += Render.stringValue(value);
      break;
  }
  html += "</div>";

  return html;
};

const renderTableHeader = (elements, settings) => {
  var html = "<thead><tr>";

  for (let key in elements[0]) {
    if (!isHidePropertyByKey(key, settings)) {
      html += `<th>${key}</th>`;
    }
  }

  return `${html}</tr></thead>`;
};

const renderArrayToTable = (json, settings) => {
  const { nullAppearence } = settings;
  let html = "";
  const filteredItems = json.filter(
    (item) => !isHidePropertyByValue(item, settings)
  );

  html += '<table class="arrayElements">';
  html += renderTableHeader(filteredItems, settings);
  html += "<tbody>";

  html += filteredItems
    .map((item) => {
      let h = "<tr>";

      for (let key in item) {
        if (!isHidePropertyByKey(key, settings)) {
          h += "<td>";
          if (item[key] && typeof item[key] === "object") {
            h += "[Object]";
          } else {
            h += item[key] || nullAppearence;
          }

          h += "</td>";
        }
      }

      h += "</tr>";

      return h;
    })
    .join("");

  html += "</tbody>";
  html += "</table>";

  return html;
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
  let html = "";
  const filteredItems = value.filter(
    (item) => !isHidePropertyByValue(item, settings)
  );

  html += '<ul class="arrayElements">';

  if (keysForArrays[key]) {
    html += filteredItems
      .map((item) => {
        const keyForCurrentElement = convertKeyByMask(item, keysForArrays[key]);

        return `<li class="element">${renderJson(
          item,
          settings,
          keyForCurrentElement
        )}</li>`;
      })
      .join("");
  } else {
    html += filteredItems
      .map((item, key) => {
        return `<li class="element">${renderJson(item, settings, key)}</li>`;
      })
      .join("");
  }
  html += "</ul>";

  return html;
};

const renderObject = (value, settings) => {
  let html = '<ul class="objectProperties">';

  for (let i in value) {
    let key = i;

    if (settings.formatCamelCase) {
      let words = key.match(/((^[a-z])|[A-Z])[a-z]+/g);
      key = words ? words.join(" ") : key;
    }

    html += `<li>${renderJson(value[i], settings, key)}</li>`;
  }

  return html;
};

export default renderJson;
