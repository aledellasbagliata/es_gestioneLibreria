"use strict";

window.onload = function () {
  let thCells = ["Title", "Category", "Cover", "Author", "Year", "Price"];
  let cont = -1;
  let xml = dati;
  let parser = new DOMParser();
  let xmlDoc = parser.parseFromString(xml, "text/xml");
  let xmlRoot = xmlDoc.getElementsByTagName("bookstore")[0];


  let body = document.getElementsByTagName("body")[0];

  // GET BTN

  let btn = document.getElementsByClassName("cssbuttons-io-button")[0];
  btn.addEventListener("click", btnClick);

  // CREAZIONE TABELLA
  let table = document.createElement("table");
  table.classList.add("book-table");
  table.style.visibility = "hidden";
  table.id = "table-id";
  body.appendChild(table);
  let thead = document.createElement("thead");
  for (let i = 0; i < thCells.length; i++) {
    let th = document.createElement("th");
    th.innerText = thCells[i];
    thead.appendChild(th);
  }
  table.appendChild(thead);

  for (let i = 0; i < xmlRoot.children.length; i++) {
    let tr = document.createElement("tr");
    tr.id = "tr" + i;
    table.appendChild(tr);

    let category = "",
      title = "",
      cover = "",
      author = "",
      year = "",
      price = "";

    let book = xmlRoot.children[i];

    if (book.getAttribute("category")) {
      category = book.getAttribute("category");
    }
    if (book.getAttribute("cover")) {
      cover = book.getAttribute("cover");
    }

    for (let j = 0; j < book.children.length; j++) {
      cont++;
      let field = book.children[j];

      switch (field.nodeName) {
        case "title": {
          title = field.textContent;
          break;
        }
        case "author": {
          author = field.textContent;
          break;
        }
        case "year": {
          year = field.textContent;
          break;
        }
        case "price": {
          price = field.textContent;
          break;
        }
      }
    }


    let bookIndex = 0;
    for (let k = 0; k < book.children.length + 2; k++) {
      if (k == 1) {
        let td = document.createElement("td");
        td.innerText = category;
        tr.appendChild(td);
        continue;
      }
      if (k == 2) {
        let td = document.createElement("td");
        td.innerText = cover;
        tr.appendChild(td);
        continue;
      }
      let field = book.children[bookIndex];
      let td = document.createElement("td");
      td.innerText = field.textContent;
      tr.appendChild(td);
      bookIndex++;
    }
  }
};

function btnClick(){
    this.style.display = "none";
    let table = document.getElementById("table-id");
    table.style.visibility = "visible";
}
