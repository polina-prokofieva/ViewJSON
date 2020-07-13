document.addEventListener("DOMContentLoaded", function () {
  document.cookie = "SameSite=None";
  let json = "",
    vJSON,
    element = document.getElementById("json"),
    form = document.getElementById("demo"),
    settings;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    json = e.target[0].value;
    settings = e.target[1].value;

    if (typeof vJSON === "object") {
      vJSON.clear();
    }

    vJSON = new ViewJSON.default(element, json, settings);
    vJSON.start();
  });
});
