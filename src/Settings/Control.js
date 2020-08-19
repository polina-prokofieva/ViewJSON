import { Settings } from "./Value";

const isHidePropertyByKey = (key) => Settings.hidePropertiesByKey.includes(key);

const isHideEmptyArrays = (value) =>
  Array.isArray(value) && Settings.hideEmptyArrays && value.length === 0;

const isHideEmptyObjects = (value) =>
  typeof value === "object" &&
  value !== null &&
  Settings.hideEmptyObjects &&
  Object.keys(value).length === 0;

const isHidePropertyByValue = (value) =>
  Settings.hidePropertiesByValue.includes(value);

const isAllInnerValuesHided = (data) => {
  if (typeof data === "object" && data !== null) {
    for (let key in data) {
      if (isShowProperty(data[key])) {
        return false;
      }
    }
    return true;
  }
  return false;
};

const isShowProperty = (property) =>
  !isHidePropertyByValue(property) &&
  !isHideEmptyArrays(property) &&
  !isHideEmptyObjects(property) &&
  !isAllInnerValuesHided(property);

const filterElements = (data) => {
  if (Array.isArray(data)) {
    return data.filter(
      (value, key) =>
        !(
          isHidePropertyByKey(key) ||
          isHidePropertyByValue(value) ||
          isAllInnerValuesHided(value)
        )
    );
  } else {
    let filtered = {};
    for (let key in data) {
      if (isShowProperty(data[key]) && !isHidePropertyByKey(key)) {
        filtered[key] = data[key];
      }
    }
    return filtered;
  }
};

export default {
  isHidePropertyByKey,
  isHidePropertyByValue,
  isAllInnerValuesHided,
  isShowProperty,
  filterElements,
};
