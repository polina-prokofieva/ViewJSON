import renderJson from "./Elements";
import Render from "./Render";
import Control from "../Settings/Control";
import Keys from "../Settings/Keys";
import { Settings } from "../Settings/Value";

const getTableColumns = (rows) => {
  let columns = new Set();

  for (let i = 0; i < rows.length; i++) {
    const keys = Object.keys(rows[i]);
    for (let key of keys) {
      if (
        !Control.isHidePropertyByKey(key) &&
        Control.isShowProperty(rows[i][key])
      ) {
        columns.add(key);
      }
    }
  }

  return columns;
};

const renderTableHeader = (columns) => {
  const line = document.createElement("tr");
  const head = document.createElement("thead");

  head.appendChild(line);

  for (let key of columns) {
    const cell = document.createElement("th");
    cell.textContent = Keys.convertCamelCase(key);
    line.appendChild(cell);
  }

  return head;
};

const renderTableBody = (columns, rows) => {
  const { nullAppearence, boolAppearence } = Settings;
  const body = document.createElement("tbody");

  for (let i = 0; i < rows.length; i++) {
    if (!Settings.hideEqualItems || Control.isUniqueItem(i, rows)) {
      const row = document.createElement("tr");
      const item = rows[i];

      for (let key of columns) {
        const cell = document.createElement("td");
        const type = typeof item[key];
        let value = "";

        if (item[key] === null || type === "undefined") {
          value = nullAppearence;
        } else if (type === "object") {
          value = renderJson(null, item[key]);
          cell.appendChild(value);
        } else if (type === "boolean") {
          value = boolAppearence[Number(item[key])];
          cell.textContent = value;
        } else {
          value = item[key];
          cell.textContent = value;
        }

        row.appendChild(cell);
      }

      body.appendChild(row);
    }
  }

  return body;
};

const renderArrayToTable = (data) => {
  let columns = getTableColumns(data);

  const tableHeader = renderTableHeader(columns);
  const tableBody = renderTableBody(columns, data);

  const tableElement = Render.createSimpleDOMElement("table", "", {
    className: "arrayElements",
  });

  tableElement.appendChild(tableHeader);
  tableElement.appendChild(tableBody);

  return tableElement;
};

export default renderArrayToTable;
