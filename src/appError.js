const appError = {
  type: "",
  message: "",
  element: document.createElement("div"),
  isError: false,

  generateElement: function () {
    const header = document.createElement("p");
    header.innerText = `There is an error in ${this.type}`;

    const body = document.createElement("p");
    body.innerText = `Error message: ${this.message}`;

    this.element.innerHTML = "";
    this.element.appendChild(header);
    this.element.appendChild(body);

    this.element.id = "jsonParseError";
  },

  setError: function (err, type) {
    this.type = type;
    this.message = err.message;
    this.isError = true;
    console.error(err);
    this.generateElement();
  },

  unsetError: function () {
    this.isError = false;
  },
};

export default appError;
