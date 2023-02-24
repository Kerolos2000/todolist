// global variables
let mainBtn = document.querySelector(".main-btn"),
  modal = document.querySelector("#modal"),
  floatingInput1 = document.querySelector("#floatingInput1"),
  floatingInput2 = document.querySelector("#floatingInput2"),
  floatingInput3 = document.querySelector("#floatingInput3"),
  floatingInput4 = document.querySelector("#floatingInput4"),
  Search = document.querySelector("#Search"),
  formCheck = document.querySelector(".form-check"),
  flexCheckDefault = document.querySelector("#flexCheckDefault"),
  addBtn = document.querySelector("#add-btn"),
  updateBtn = document.querySelector("#update-btn"),
  nextUpDiv = document.querySelector("#nextUpDiv"),
  inProgressDiv = document.querySelector("#inProgressDiv"),
  doneDiv = document.querySelector("#doneDiv"),
  counter = document.querySelectorAll(".counter h6");
// show and hide modal
function showModal(e) {
  if (e) {
    formCheck.style.display = "block";
  } else {
    formCheck.style.display = "none";
  }
  modal.classList.add("show");
}
function hideModal() {
  modal.classList.remove("show");
}
mainBtn.addEventListener("click", () => {
  showModal(false);
});
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    hideModal();
    clearData();
    switchBtn(updateBtn, addBtn);
  }
});
// check if localStorage is not empty fill data in mainArray
let mainArray = [];
if (localStorage.getItem("items")) {
  mainArray = JSON.parse(localStorage.getItem("items"));
}
// update localStorage
function updateLocalStorage() {
  localStorage.setItem("items", JSON.stringify(mainArray));
}
// to Empty fields
function clearData() {
  // floatingInput1.value = "";
  // floatingInput2.value = "";
  floatingInput3.value = "";
  floatingInput4.value = "";
}
// main function
addBtn.addEventListener("click", () => {
  if (
    floatingInput1.value.trim() != "" &&
    floatingInput2.value.trim() != "" &&
    floatingInput3.value.trim() != "" &&
    floatingInput4.value.trim() != ""
  ) {
    let mainObj = {
      statusObj: floatingInput1.value,
      categoryObj: floatingInput2.value,
      titleObj: floatingInput3.value,
      DiscriptionObj: floatingInput4.value,
      colorObj: "#0c1115",
    };
    mainArray.push(mainObj);
    updateLocalStorage();
    displayItems();
    hideModal();
    clearData();
  }
});
// to display items
function displayItems() {
  let temp = "";
  nextUpDiv.innerHTML = "";
  inProgressDiv.innerHTML = "";
  doneDiv.innerHTML = "";
  let count1 = 0,
    count2 = 0,
    count3 = 0;
  for (let i = 0; i < mainArray.length; i++) {
    temp = `
    <div class="cardX x${i}" style="background:${mainArray[i].colorObj}">
    <p class="tast-title">${mainArray[i].titleObj}</p>
    <p class="desc">${mainArray[i].DiscriptionObj}</p>
    <p class="category ${mainArray[i].categoryObj}">${mainArray[i].categoryObj}</p>
    <div class="all-icons">
      <div class="icon edit" onclick="UpdateX(${i})">
        <i class="fa-solid fa-pen-to-square"></i>
      </div>
      <div class="icon delete" onclick="DeleteX(${i})">
        <i class="fa-solid fa-trash-can"></i>
      </div>
      <div class="icon palette" onclick="ColorX(${i})">
        <i class="fa-solid fa-palette"></i>
      </div>
    </div>
  </div>
    `;
    switch (mainArray[i].statusObj) {
      case "Next Up":
        nextUpDiv.innerHTML += temp;
        count1++;
        break;
      case "In Progress":
        inProgressDiv.innerHTML += temp;
        count2++;
        break;
      case "Done":
        doneDiv.innerHTML += temp;
        count3++;
        break;
    }
  }
  counter[0].innerHTML = count1;
  counter[1].innerHTML = count2;
  counter[2].innerHTML = count3;
}
displayItems();
// delete item
function DeleteX(i) {
  mainArray.splice(i, 1);
  updateLocalStorage();
  displayItems();
}
// change card background
function ColorX(i) {
  console.log(i);
  console.log(mainArray);
  let temp = "";
  let alphabet = "0123456789abcdef";
  for (let i = 0; i < 6; i++) {
    temp += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  let cardX = document.querySelectorAll(".cardX");
  cardX[i].style.backgroundColor = `#${temp}`;
  mainArray[i].colorObj = `#${temp}`;
  displayItems();
  updateLocalStorage();
}
// switch display for buttons
function switchBtn(p1, p2) {
  p1.style.display = "none";
  p2.style.display = "block";
}
// update items
function UpdateX(i) {
  showModal(true);
  floatingInput1.value = mainArray[i].statusObj;
  floatingInput2.value = mainArray[i].categoryObj;
  floatingInput3.value = mainArray[i].titleObj;
  floatingInput4.value = mainArray[i].DiscriptionObj;
  switchBtn(addBtn, updateBtn);
  updateBtn.onclick = function () {
    mainArray[i].statusObj = floatingInput1.value;
    mainArray[i].categoryObj = floatingInput2.value;
    mainArray[i].titleObj = floatingInput3.value;
    mainArray[i].DiscriptionObj = floatingInput4.value;
    if (flexCheckDefault.checked) {
      mainArray[i].colorObj = "#0c1115";
      flexCheckDefault.click();
    }
    hideModal();
    displayItems();
    updateLocalStorage();
    clearData();
    switchBtn(updateBtn, addBtn);
  };
}
if (flexCheckDefault.checked) {
  mainArray[i].colorObj = "#0c1115";
  flexCheckDefault.click();
}

Search.addEventListener("input", function () {
  console.log(Search.value);
  let temp = "";
  nextUpDiv.innerHTML = "";
  inProgressDiv.innerHTML = "";
  doneDiv.innerHTML = "";
  let count1 = 0,
    count2 = 0,
    count3 = 0;
  for (var i = 0; i < mainArray.length; i++) {
    if (mainArray[i].titleObj.includes(Search.value)) {
      temp = `
    <div class="cardX x${i}" style="background:${mainArray[i].colorObj}">
    <p class="tast-title">${mainArray[i].titleObj}</p>
    <p class="desc">${mainArray[i].DiscriptionObj}</p>
    <p class="category ${mainArray[i].categoryObj}">${mainArray[i].categoryObj}</p>
    <div class="all-icons">
      <div class="icon edit" onclick="UpdateX(${i})">
        <i class="fa-solid fa-pen-to-square"></i>
      </div>
      <div class="icon delete" onclick="DeleteX(${i})">
        <i class="fa-solid fa-trash-can"></i>
      </div>
      <div class="icon palette" onclick="ColorX(${i})">
        <i class="fa-solid fa-palette"></i>
      </div>
    </div>
  </div>
    `;
      switch (mainArray[i].statusObj) {
        case "Next Up":
          nextUpDiv.innerHTML += temp;
          count1++;
          break;
        case "In Progress":
          inProgressDiv.innerHTML += temp;
          count2++;
          break;
        case "Done":
          doneDiv.innerHTML += temp;
          count3++;
          break;
      }
    }
    counter[0].innerHTML = count1;
    counter[1].innerHTML = count2;
    counter[2].innerHTML = count3;
  }
});
