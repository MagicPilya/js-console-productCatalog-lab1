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

let arrayOfCategory = [];

for (let i = 0; i < dataArray.length; i++) {
  let obj = {};
  let id = { id: dataArray[i].id };
  let category = { category: dataArray[i].category };
  obj = Object.assign(id, category);
  arrayOfCategory.push(obj);
}
console.log(arrayOfCategory);

let mergedArray = [];

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
    mergeSort(arrayOfCategory);
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

function merge(arr) {
  if (arr.length <= 1) return arr;
  let mid = Math.floor(arr.length / 2);
  let left = merge(arr.slice(0, mid));
  let right = merge(arr.slice(mid));
  function mergeSort(arr1, arr2) {
    let result = [];
    let i = 0;
    let j = 0;
    while (i < arr1.length && j < arr2.length) {
      if (arr1[i].category < arr2[j].category) {
        result.push(arr1[i]);
        i++;
      } else {
        result.push(arr2[j]);
        j++;
      }
    }
    while (i < arr1.length) {
      result.push(arr1[i]);
      i++;
    }
    while (j < arr2.length) {
      result.push(arr2[j]);
      j++;
    }
    return result;
  }
  return mergeSort(left, right);
}

function mergeSort(array) {
  array = merge(array);
  console.log(array);

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < dataArray.length; j++) {
      if (
        array[i].category === dataArray[j].category &&
        array[i].id === dataArray[j].id
      ) {
        mergedArray.push(dataArray[j]);
      }
    }
  }
  let clothes = mergedown(
    mergedArray.filter((item) => item.category == "Одежда")
  );
  let products = mergedown(
    mergedArray.filter((item) => item.category == "Продукты")
  );
  let proms = mergedown(
    mergedArray.filter((item) => item.category == "Промтовары")
  );
  let elect = mergedown(
    mergedArray.filter((item) => item.category == "Электроника")
  );
  let newArr = clothes.concat(products).concat(proms).concat(elect);
  console.log(proms);
  console.log(newArr);

  elem.innerHTML = "";
  elem.innerHTML += tableHeader;
  for (let i = 0; i < mergedArray.length; i++) {
    elem.innerHTML += `
              <tr>
                  <th>${i + 1}</th>
                  <th>${newArr[i].name}</th>
                  <th>${newArr[i].category}</th>
                  <th>${newArr[i].cost}</th>
                  <th>${newArr[i].count}</th>
              <tr/>
              `;
  }
  informationBLock.append(elem);
}

function mergedown(arr) {
  if (arr.length <= 1) return arr;
  let mid = Math.floor(arr.length / 2);
  let left = merge(arr.slice(0, mid));
  let right = merge(arr.slice(mid));
  function mergeSort(arr1, arr2) {
    let result = [];
    let i = 0;
    let j = 0;
    while (i < arr1.length && j < arr2.length) {
      if (arr1[i].cost > arr2[j].cost) {
        result.push(arr1[i]);
        i++;
      } else {
        result.push(arr2[j]);
        j++;
      }
    }
    while (i < arr1.length) {
      result.push(arr1[i]);
      i++;
    }
    while (j < arr2.length) {
      result.push(arr2[j]);
      j++;
    }
    return result;
  }
  return mergeSort(left, right);
}
