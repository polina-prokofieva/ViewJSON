import appError from "../appError";

export let Settings = {
  root: "",
  nullAppearence: "null",
  boolAppearence: [false, true],
  hidePropertiesByValue: [],
  hidePropertiesByKey: [],
  arraysAsTable: [],
  keysForArrays: {},
};

export const setSettings = (newSettings) => {
  try {
    const parsed = newSettings
      ? JSON.parse(newSettings.replace(/\/\/.*\n/g, ""))
      : {};

    Settings = {
      ...Settings,
      ...parsed,
    };
  } catch (err) {
    appError.setError(err, "settings");
  }
};
