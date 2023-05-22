import "./main.scss";
import "./fonts/fonts.scss";
const data = require("./static/data.json");

const informationBLock = document.querySelector(".lab1__information");
let elem = document.createElement("table");
let dataArray = [];

for (let i = 0; i < data.namespace.length; i++) {
  dataArray.push(data.namespace[i]);
}
elem.innerHTML += `
        <tr>
            <th class="th-bold">№ по п/п</th>
            <th class="th-bold">Наименование</th>
            <th class="th-bold">Категория</th>
            <th class="th-bold">Цена</th>
        </tr>
`;
for (let i = 0; i < dataArray.length; i++) {
  elem.innerHTML += `
    <tr>
        <th>${dataArray[i].id + 1}</th>
        <th>${dataArray[i].name}</th>
        <th>${dataArray[i].category}</th>
        <th>${dataArray[i].cost}</th>
    <tr/>
    `;
}
informationBLock.append(elem);
