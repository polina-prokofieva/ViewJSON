import Control from "./Settings/Control";
import appError from "./appError";

export let Data = {};

export const setData = (newData) => {
  try {
    Data = JSON.parse(newData);
    Data = Control.setRoot(Data);
  } catch (err) {
    appError.setError(err, "main json");
  }
};
