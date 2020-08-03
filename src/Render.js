const numberValue = json => `<span class="number">${json}</span>`;

const stringValue = json => `<span class="string"><span class="quot">"</span>${json}<span class="quot">"</span></span>`;

const dateValue = json => {
   let dt = new Date(json);
   return `<span class="boolean">${dt.toDateString()}</span>`;
}

const booleanValue = (json, boolAppearence) => `<span class="boolean">${boolAppearence[+json]}</span>`;

const nullValue = () => `<span class="null">${settings.nullAppearence}</span>`;

const undefinedValue = json => `<span class="undefined">${json}</span>`;

const Render = {
    numberValue,
    stringValue,
    dateValue,
    booleanValue,
    nullValue,
    undefinedValue
}

export default Render;