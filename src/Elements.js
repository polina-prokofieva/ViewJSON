import Render from "./Render";

const defineTypeOfValue = (
  value,
  { hidePropertiesByValue, dateAppearence },
  key
) => {
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

const renderTableHeader = (elements, hidePropertiesByKey) => {
  var html = "<thead><tr>";

  for (let key in elements[0]) {
    if (hidePropertiesByKey.indexOf(key) === -1) {
      html += `<th>${key}</th>`;
    }
  }

  return `${html}</tr></thead>`;
};

const renderArrayToTable = (
  json,
  { hidePropertiesByValue, hidePropertiesByKey, nullAppearence }
) => {
  let html = "",
    elements = json.filter(
      (value) => hidePropertiesByValue.indexOf(value) === -1
    );

  html += '<table class="arrayElements">';
  html += renderTableHeader(elements, hidePropertiesByKey);
  html += "<tbody>";

  html += elements
    .map((a, i) => {
      let h = "<tr>";

      for (let k in a) {
        if (hidePropertiesByKey.indexOf(k) === -1) {
          h += "<td>";
          if (a[k] && typeof a[k] === "object") {
            h += "[Object]";
          } else {
            h += a[k] || nullAppearence;
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

const renderArray = (json, settings, key) => {
  const { hidePropertiesByValue, keysForArrays } = settings;
  let html = "",
    elements = json.filter(
      (value) => hidePropertiesByValue.indexOf(value) === -1
    );

  html += '<ul class="arrayElements">';

  if (keysForArrays[key]) {
    html += elements
      .map((a, i) => {
        let keyForCurrentElement;

        keyForCurrentElement = keysForArrays[key].replace(
          /\{(\w|\.)+\}/g,
          function (str) {
            let seq = str.slice(1, -1).split("."),
              k = a[seq[0]];

            for (let j = 1; j < seq.length; j++) {
              if (k && k[seq[j]]) {
                k = k[seq[j]];
              } else {
                k = "-";
                break;
              }
            }

            return k || "-";
          }
        );

        return `<li class="element">${renderJson(
          a,
          settings,
          keyForCurrentElement
        )}</li>`;
      })
      .join("");
  } else {
    html += elements
      .map((a, i) => {
        return `<li class="element">${renderJson(a, settings, i)}</li>`;
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
