document.addEventListener("DOMContentLoaded", function () {
  document.cookie = "SameSite=None";
  let json = "",
    vJSON,
    element = document.getElementById("json"),
    form = document.getElementById("demo"),
    settings;

  form.addEventListener("submit", function (evt) {
    evt.preventDefault();
    json = evt.target[0].value;
    settings = evt.target[1].value;

    if (typeof vJSON === "object") {
      vJSON.clear();
    }

    vJSON = new ViewJSON.default(element, json, settings);
    vJSON.start();
  });
});
