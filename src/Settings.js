const isHidePropertyByKey = (key, { hidePropertiesByKey }) =>
  hidePropertiesByKey.includes(key);

const isHidePropertyByValue = (
  value,
  { hidePropertiesByValue, hideEmptyArrays, hideEmptyObjects }
) =>
  hidePropertiesByValue.includes(value) ||
  (Array.isArray(value) && hideEmptyArrays && value.length === 0) ||
  (typeof value === "object" &&
    hideEmptyObjects &&
    Object.keys(value).length === 0);

const isAllInnerValuesHided = (data, settings) => {
  if (typeof data === "object") {
    for (let key in data) {
      if (isShowProperty(data[key], settings)) {
        return false;
      }
    }
    return true;
  }
  return false;
};

const isShowProperty = (property, settings) =>
  !isHidePropertyByValue(property, settings) &&
  !isAllInnerValuesHided(property, settings);

const filterElements = (data, settings) => {
  if (Array.isArray(data)) {
    return data.filter(
      (value, key) =>
        !(
          isHidePropertyByKey(key, settings) ||
          isHidePropertyByValue(value, settings) ||
          isAllInnerValuesHided(value, settings)
        )
    );
  } else {
    let filtered = {};
    for (let key in data) {
      if (
        isShowProperty(data[key], settings) &&
        !isHidePropertyByKey(key, settings)
      ) {
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
