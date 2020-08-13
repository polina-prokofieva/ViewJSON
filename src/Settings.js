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

export default {
  isHidePropertyByKey,
  isHidePropertyByValue,
  isAllInnerValuesHided,
  isShowProperty,
};
