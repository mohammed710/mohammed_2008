let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
// console.log(title ,price ,taxes ,ads ,discount, total,count,category,submit);
let mood = "creat";
let tmp;
// count total
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +ads.value + +taxes.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#00d907";
  } else {
    total.innerHTML = "";
    total.style.background = "#ff1100";
  }
}
// creat product
// pro == product
let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}
submit.onclick = function () {
  let newPro = {
    title: title.value.toLocaleLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLocaleLowerCase(),
  };
  if (title.value != "" && price.value != "" && category.value != "" && newPro.count < 100) {
    if (mood === "creat") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[tmp] = newPro;
      mood = "creat";
      submit.innerHTML = "Creat";
      count.style.display = "block";
    }
    clearData();
  }

  //   dataPro.push(newPro);
  // save localstorage
  
  localStorage.setItem("product", JSON.stringify(dataPro));
  showData()
};
// clear inoupts
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}
// read
function showData() {
  getTotal();
  let tabel = "";
  for (let i = 0; i < dataPro.length; i++) {
    tabel += `
    <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deletData(${i})" id="delet">delet</button></td>
    </tr> 
    
    `;
  }
  document.getElementById("tbody").innerHTML = tabel;
  let btnDelt = document.getElementById("deletAll");
  if (dataPro.length > 0) {
    btnDelt.innerHTML = `
        <button onclick="deletAll()">delet All    -${dataPro.length}- </button>
        `;
  } else {
    btnDelt.innerHTML = "";
  }
}
showData();
// delet
function deletData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}
function deletAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}
// count
// update
function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = dataPro[i].category;
  submit.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
  showData()
}
// search
let searchMood = "title";
function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.placeholder = "Search by " + searchMood;
  search.focus();
  search.value = "";
  showData();
}
function searchData(value) {
  let tabel = "";
  for (let i = 0; i < dataPro.length; i++) {
    if (searchMood == "title") {
      if (dataPro[i].title.includes(value.toLocaleLowerCase())) {
        tabel += `
          <tr>
              <td>${i}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].taxes}</td>
              <td>${dataPro[i].ads}</td>
              <td>${dataPro[i].discount}</td>
              <td>${dataPro[i].total}</td>
              <td>${dataPro[i].category}</td>
              <td><button onclick="updateData(${i})" id="update">update</button></td>
              <td><button onclick="deletData(${i})" id="delet">delet</button></td>
          </tr>   `;
      }
    } else {
      if (dataPro[i].category.includes(value.toLocaleLowerCase())) {
        tabel += `
          <tr>
              <td>${i}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].taxes}</td>
              <td>${dataPro[i].ads}</td>
              <td>${dataPro[i].discount}</td>
              <td>${dataPro[i].total}</td>
              <td>${dataPro[i].category}</td>
              <td><button onclick="updateData(${i})" id="update">update</button></td>
              <td><button onclick="deletData(${i})" id="delet">delet</button></td>
          </tr>   `;
      }
    }
  }

  document.getElementById("tbody").innerHTML = tabel;
}
// clean data
// up up up ^^^^^
// created by mohammed mahmoud !!@@@@####