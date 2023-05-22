import "./main.scss";
import "./fonts/fonts.scss";

const data = require("./static/data.json");

const informationBLock = document.querySelector(".lab1__information");
let elem = document.createElement("table");

let dataArray = [];
for (let i = 0; i < data.namespace.length; i++) {
  dataArray.push(data.namespace[i]);
}

let arrayCount = [];
for (let i = 0; i < dataArray.length; i++) {
  arrayCount.push(dataArray[i].count);
}

const tableHeader = `
        <tr>
            <th class="th-bold">№ по п/п</th>
            <th class="th-bold">Наименование</th>
            <th class="th-bold">Категория</th>
            <th class="th-bold">Цена</th>
            <th class="th-bold">Количество</th>
        </tr>
`;
// События кнопок
const filterBtn = document.querySelector("#filter-btn");
const sortBtn = document.querySelector("#sort-btn");
const resetBtn = document.querySelector("#reset-btn");
const filterSelection = document.getElementById("filter");
const sortSelection = document.getElementById("sort");

filterBtn.addEventListener("click", () => {
  if (filterSelection.value === "По категории 'Промтовары'") {
    filterItems("category");
  } else {
    filterItems("cost");
  }
  console.log(filterSelection.value);
});

resetBtn.addEventListener("click", () => {
  updateItems();
});
sortBtn.addEventListener("click", () => {
  if (sortSelection.value === "Сортировка выбором") {
    selectionSort(arrayCount);
  } else if (sortSelection.value === "Сортировка слиянием") {
  }
  console.log(sortSelection.value);
});

function filterItems(str) {
  elem.innerHTML = "";
  elem.innerHTML += tableHeader;
  if (str === "category") {
    let j = 1;

    for (let i = 0; i < dataArray.length; i++) {
      if (dataArray[i].category === "Промтовары") {
        elem.innerHTML += `
                    <tr>
                        <th>${j}</th>
                        <th>${dataArray[i].name}</th>
                        <th>${dataArray[i].category}</th>
                        <th>${dataArray[i].cost}</th>
                        <th>${dataArray[i].count}</th>
                    <tr/>
                    `;
        j++;
      }
      informationBLock.append(elem);
    }
  } else if (str === "cost") {
    let j = 1;
    for (let i = 0; i < dataArray.length; i++) {
      if (dataArray[i].cost > 5) {
        elem.innerHTML += `
                    <tr>
                        <th>${j}</th>
                        <th>${dataArray[i].name}</th>
                        <th>${dataArray[i].category}</th>
                        <th>${dataArray[i].cost}</th>
                        <th>${dataArray[i].count}</th>
                    <tr/>
                    `;
        j++;
      }
      informationBLock.append(elem);
    }
  }
}

function updateItems() {
  elem.innerHTML = "";
  elem.innerHTML += tableHeader;
  for (let i = 0; i < dataArray.length; i++) {
    elem.innerHTML += `
            <tr>
                <th>${i + 1}</th>
                <th>${dataArray[i].name}</th>
                <th>${dataArray[i].category}</th>
                <th>${dataArray[i].cost}</th>
                <th>${dataArray[i].count}</th>
            <tr/>
            `;
  }
  informationBLock.append(elem);
}

updateItems();

function selectionSort(inputArr) {
  elem.innerHTML = "";
  elem.innerHTML += tableHeader;
  let n = inputArr.length;

  for (let i = 0; i < n; i++) {
    // Находим наименьшее число в правой части массива
    let min = i;
    for (let j = i; j < n; j++) {
      if (inputArr[j] > inputArr[min]) {
        min = j;
      }
    }
    if (min != i) {
      // Заменяем элементы
      let tmp = inputArr[i];
      inputArr[i] = inputArr[min];
      inputArr[min] = tmp;
    }
  }
  let sortedArray = [];
  for (let i = 0; i < inputArr.length; i++) {
    for (let j = 0; j < dataArray.length; j++) {
      if (arrayCount[i] === dataArray[j].count) {
        sortedArray.push(dataArray[j]);
      }
    }
  }

  for (let i = 0; i < sortedArray.length; i++) {
    elem.innerHTML += `
            <tr>
                <th>${i + 1}</th>
                <th>${sortedArray[i].name}</th>
                <th>${sortedArray[i].category}</th>
                <th>${sortedArray[i].cost}</th>
                <th>${sortedArray[i].count}</th>
            <tr/>
            `;
  }
  informationBLock.append(elem);
}
