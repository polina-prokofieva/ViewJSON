# ViewJSON

## Descrption

**ViewJSON** is a class for convenient presentation of a json.

## Demo

http://freeze.pp.ua/polina.work/

## Syntax

```
vJSON = new ViewJSON(element, json, settings);
vJSON.start();
```

### Parameters

**element** — _DOM-element_ in which your json will be rendered. For proper work it should be block-element.

**json** — _string_ which is your json.

**settings** — _string_ which is json with settings for presentation of your json.

## Methods

**.start()** — generate and render view of your json to **element**.

**.clear()** — clear **element**.

## Settings Syntax

**settings** shoud have next fromat:

```
{
  "root": "",
  "formatCamelCase": true,
  "formatDate": false,
  "nullAppearence": "-",
  "boolAppearence": ["No", "Yes"],
  "hidePropertiesByValue": [
    null,
    0,
    ""
  ],
  "hidePropertiesByKey": [
    "OverdraftLimit",
    "Description",
    "Id"
  ],
  "dateAppearence": {
    "keys": [
      "Date"
    ]
  },
  "showSearchPanel" : true,
  "arraysAsTable": [
    "Transactions"
  ],
  "keysForArrays": {
    "Accounts": "Title"
  }
}
```

**root** — root of json which should be presented. If it is "" the whole json will be presented.

**formatCamelCase** — if it is _true_ all parameters in CamesCase will be formatted to separate words.

**formatDate** — format of date values.

**nullAppearence** — string by which will be replaced **_null_** values.

**boolAppearence** — array of strings by which will be replased **_true_** and **_false_** values.

**hidePropertiesByValue** — array of values by which will be hided parameters of your json.

**hidePropertiesByKey** — array of keys by which will be hided parameters of your json.

**dateAppearence** — key which will be detected as date.

**showSearchPanel** — show or not search panel.

**arraysAsTable** — array of keys of parameters which contain an array and which will be presented as a table.

**keysForArrays** — an abject where keys are names of arrays and values are properties which will be shown as keys for corresponding arrays.
