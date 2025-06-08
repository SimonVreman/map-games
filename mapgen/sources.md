# Sources

Downloads are gitignored, sources listed here.

## Brazil

OCHA (United Nations Office for the Coordination of Humanitarian Affairs)
https://data.humdata.org/dataset/cod-ab-bra

Area dialing codes (with tampermonkey script)
https://www.codigosddd.com.br/ddd

```js
// ==UserScript==
// @name         Copy ddd object
// @namespace    http://tampermonkey.net/
// @version      2025-04-12
// @description  try to take over the world!
// @author       You
// @match        https://www.codigosddd.com.br/ddd*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=codigosddd.com.br
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  const button = document.createElement("button");
  button.innerText = "copy object";

  button.onclick = () =>
    navigator.clipboard
      .writeText(
        `{'adm1':"${document
          .getElementsByClassName("bc")[0]
          .getElementsByTagName("a")[2]
          .innerText.trim()}",'adm2':[${[
          ...document
            .getElementsByTagName("table")[0]
            .getElementsByTagName("tbody")[0]
            .getElementsByTagName("tr"),
        ]
          .map((row) => row.getElementsByTagName("td")[0].innerText)
          .filter((s) => s.length > 0)
          .map((s) => `"${s}"`)}]}`
      )
      .then(() => (button.innerText = "copied"));

  document.getElementsByTagName("section")[0].prepend(button);
})();
```

## USA

Area codes:
https://www.arcgis.com/home/item.html?id=ae1af68c36284b808e2c460cff503a44
