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
  Settings = {
    ...Settings,
    ...newSettings,
  };
};
