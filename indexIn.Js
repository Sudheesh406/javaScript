let container = document.getElementById("container");
let BasicDtl = document.getElementById("BasicDtl");
let section = document.getElementById("section");
let AddEmp = document.getElementById("AddEmp");
let submit = document.getElementById("submit");
let saveChange = document.getElementById("saveChange");
let alert = document.getElementById("deleteAlert");
let deleteBtn = document.getElementById("deleteBtn");

let salutation = document.getElementById("salutation");
let firstname = document.getElementById("firstName");
let lastname = document.getElementById("lastName");
let email = document.getElementById("email");
let mobileNumber = document.getElementById("mobileNumber");
let dob = document.getElementById("dob");
let male = document.getElementById("male");
let female = document.getElementById("female");
let qualifications = document.getElementById("Qualifications");
let address = document.getElementById("address");
let country = document.getElementById("country");
let state = document.getElementById("state");
let city = document.getElementById("city");
let zip = document.getElementById("zip");
let username = document.getElementById("username");
let password = document.getElementById("password");
let search = document.getElementById("search");

// ****************************ADD-OR-EDIT-EMPLOYEE************************************

section.addEventListener("click", function (event) {
  if (event.target.id === "AddEmp" || event.target.id === "editBtn") {
    BasicDtl.style.opacity = "1px";
    BasicDtl.style.display = "flex";
    document.getElementById("overlay").style.display = "block";
  } else if (event.target.id != "AddEmp" || event.target.id == "overlay") {
    BasicDtl.style.opacity = "0px";
    BasicDtl.style.display = "none";
    document.getElementById("overlay").style.display = "none";
  }
});

AddEmp.onclick = function () {
  submit.style.display = "flex";
  saveChange.style.display = "none";
};

// *****************************GET_ALL_EMPLOYEES_DATA**********************************

let allData;
let limit = 2;
async function employeeData() {
  try {
    let api = await fetch("http://localhost:3000/employees");
    const data = await api.json();
    allData = data;
    renderData(data);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Server Down!",
    });
  }
}

employeeData();

// ***********************************RENDER-ALL-DATA*********************************

function renderData(employee) {
  renderBtn(limit, allData);
  let data = employee.slice(0, limit);
  let tbody = document.getElementById("tbody");
  tbody.innerHTML = "";
  data.forEach((emp, index) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `
    <th>#0${index + 1}</th>
    <td><img src="http://localhost:3000/employees/${
      emp.id
    }/avatar" class="pro-img rounded-4 me-2" alt="image">${
      emp.firstName + emp.lastName
    }</td>
    <td>${emp.email}</td>
    <td>${emp.phone}</td>
    <td>${emp.dob}</td>
    <td>${emp.gender}</td>
    <td>${emp.country}</td>
    <div class="dropdown">
  <button class="btn " type="button" data-bs-toggle="dropdown" aria-expanded="false">
  <i class="fa-solid fa-ellipsis-vertical"></i>
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href='./viewEmployee.html?id=${
      emp.id
    }'><i class="fa-regular fa-eye"></i> View Details</a></li>
    <li><button class="dropdown-item" type="button"id="editBtn" onclick=editor('${
      emp.id
    }')><i class="fa-solid fa-pen-to-square"></i> Edit</button></li>
    <li><button class="dropdown-item" id="dltBtn" type="button" onclick="Alert('${
      emp.id
    }','${index}')"><i class="fa-solid fa-trash"></i> Delete</button></li>
  </ul>
</div>
    `;
    tbody.appendChild(tr);
  });
}

// ************************************DROP_DOWN******************************************

(async () => {
  await employeeData();

  let phoneNum = [];
  let fullName = [];
  let Email = [];
  let Dob = [];
  let gender = [];
  let empCountry = [];

  for (let i = 0; i < allData.length; i++) {
    phoneNum.push(allData[i].phone);
    fullName.push(allData[i].firstName + " " + allData[i].lastName);
    Email.push(allData[i].email);
    Dob.push(allData[i].dob);
    gender.push(allData[i].gender);
    empCountry.push(allData[i].country);
  }

  // ***********************NAME********************************

  const nameBtn = document.getElementById("nameBtn");
  const nameContainer = document.getElementById("nameDtl");
  let namesVisible = false;
  function nameElements() {
    nameContainer.innerHTML = "";
    if (namesVisible) {
      namesVisible = false;
      return;
    }
    for (let i = 0; i < fullName.length; i++) {
      let p = document.createElement("p");
      p.innerHTML = fullName[i];
      p.style.paddingTop = "10px";
      p.style.paddingLeft = "23px";
      p.style.paddingRight = "23px";
      nameContainer.appendChild(p);
    }
    namesVisible = true;
  }
  nameBtn.addEventListener("click", nameElements);

  // *************************EMAIL*****************************

  const emailBtn = document.getElementById("emailBtn");
  const emailContainer = document.getElementById("emailDtl");
  let emailsVisible = false;
  function emailElements() {
    emailContainer.innerHTML = "";
    if (emailsVisible) {
      emailsVisible = false;
      return;
    }
    for (let i = 0; i < Email.length; i++) {
      let p = document.createElement("p");
      p.innerHTML = Email[i];
      p.style.paddingTop = "10px";
      p.style.paddingLeft = "23px";
      p.style.paddingRight = "23px";
      p.classList.add("emailDpDn");
      emailContainer.appendChild(p);
    }
    emailsVisible = true;
  }

  emailBtn.addEventListener("click", emailElements);

  // ***********************PHONE*******************************

  const phoneBtn = document.getElementById("phoneBtn");
  const phoneContainer = document.getElementById("phoneDtl");
  let phonesVisible = false;
  function phoneElements() {
    phoneContainer.innerHTML = "";
    if (phonesVisible) {
      phonesVisible = false;
      return;
    }
    for (let i = 0; i < phoneNum.length; i++) {
      let p = document.createElement("p");
      p.innerHTML = phoneNum[i];
      p.style.paddingTop = "10px";
      p.style.paddingLeft = "23px";
      p.style.paddingRight = "23px";
      phoneContainer.appendChild(p);
    }
    phonesVisible = true;
  }

  phoneBtn.addEventListener("click", phoneElements);

  // ***********************DOB*******************************

  const dobBtn = document.getElementById("dobBtn");
  const dobContainer = document.getElementById("dobDtl");
  let dobsVisible = false;
  function dobElements() {
    dobContainer.innerHTML = "";
    if (dobsVisible) {
      dobsVisible = false;
      return;
    }
    for (let i = 0; i < Dob.length; i++) {
      let p = document.createElement("p");
      p.innerHTML = Dob[i];
      p.style.paddingTop = "10px";
      p.style.paddingLeft = "23px";
      p.style.paddingRight = "23px";
      dobContainer.appendChild(p);
    }
    dobsVisible = true;
  }

  dobBtn.addEventListener("click", dobElements);

  // ***********************GENDER*****************************

  const genderBtn = document.getElementById("genderBtn");
  const genderContainer = document.getElementById("genderDtl");
  gendersVisible = false;
  function genderElements() {
    genderContainer.innerHTML = "";
    if (gendersVisible) {
      gendersVisible = false;
      return;
    }
    for (let i = 0; i < gender.length; i++) {
      let p = document.createElement("p");
      p.innerHTML = gender[i];
      p.style.paddingTop = "10px";
      p.style.paddingLeft = "23px";
      p.style.paddingRight = "23px";
      genderContainer.appendChild(p);
    }
    gendersVisible = true;
  }

  genderBtn.addEventListener("click", genderElements);

  // ************************COUNTRY****************************

  const countryBtn = document.getElementById("countryBtn");
  const countryContainer = document.getElementById("countryDtl");
  countrysVisible = false;
  function countryElements() {
    countryContainer.innerHTML = "";
    if (countrysVisible) {
      countrysVisible = false;
      return;
    }
    for (let i = 0; i < empCountry.length; i++) {
      let p = document.createElement("p");
      p.innerHTML = empCountry[i];
      p.style.paddingTop = "10px";
      p.style.paddingLeft = "23px";
      p.style.paddingRight = "40px";
      countryContainer.appendChild(p);
    }
    countrysVisible = true;
  }
  countryBtn.addEventListener("click", countryElements);
})();

// ***********************************NEW_DATA_COLLECT************************************

function newData() {
  let Dob = dob.value.split("-").reverse().join("-");
  return {
    avatar: image,
    salutation: salutation.value,
    firstName: firstname.value,
    lastName: lastname.value,
    email: email.value,
    phone: mobileNumber.value,
    dob: Dob,
    gender: male.checked ? "Male" : female.checked ? "Female" : "Unknown",
    qualifications: qualifications.value,
    address: address.value,
    country: country.value,
    state: state.value,
    city: city.value,
    zip: zip.value,
    username: username.value,
    password: password.value,
  };
}

// ************************************UPLOAD_NEW_DATA************************************

async function upload(Data) {
  try {
    let api = await fetch("http://localhost:3000/employees", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(Data),
    });
    let response = await api.json();
    if (response) {
      if (Data.avatar) {
        const res = await imagePost(response.id);
      }
      Data.id = response.id;
      allData.unshift(Data);

      renderData(allData);
      Swal.fire({
        title: "Good job!",
        text: "Employee Added Sucessfully!",
        icon: "success",
      });
    }
    document.getElementById("main-form").reset();
    document.getElementById("overlay").style.display = "none";
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
    document.getElementById("overlay").style.display = "flex";
    BasicDtl.style.opacity = "1px";
    BasicDtl.style.display = "flex";
  }
}

// ********************************SUBMIT_DATA_AND_PAGE_VALIDATION*************************************

submit.onclick = function (event) {
  event.preventDefault();
  const salutationError = document.getElementById("salutationErr");
  const firstnameError = document.getElementById("firstnameErr");
  const lastnameError = document.getElementById("lastnameErr");
  const emailError = document.getElementById("emailErr");
  const mobileError = document.getElementById("mobileNumErr");
  const dobError = document.getElementById("dobErr");
  const qualificationError = document.getElementById("qualificationErr");
  const addressError = document.getElementById("addressErr");
  const countryError = document.getElementById("countryErr");
  const stateError = document.getElementById("stateErr");
  const cityError = document.getElementById("cityErr");
  const zipError = document.getElementById("zipErr");
  const usernameError = document.getElementById("userNameErr");
  const passwordError = document.getElementById("passwordErr");
  let isValid = true;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const mobileRegex = /^\d{10}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

  if (salutation.value.trim() === "select salutation") {
    salutationError.textContent = "Salutation is required!";
    isValid = false;
  } else {
    salutationError.textContent = "";
  }
  if (firstname.value.trim() === "") {
    firstnameError.textContent = "First name is required!";
    isValid = false;
  } else {
    firstnameError.textContent = "";
  }
  if (lastname.value.trim() === "") {
    lastnameError.textContent = "Last name is required!";
    isValid = false;
  } else {
    lastnameError.textContent = "";
  }
  if (email.value.trim() === "") {
    emailError.textContent = "Email is required!";
    isValid = false;
  } else if (!emailRegex.test(email.value.trim())) {
    emailError.textContent = "Invalid email format!";
    isValid = false;
  } else {
    emailError.textContent = "";
  }
  if (mobileNumber.value.trim() === "") {
    mobileError.textContent = "Mobile number is required!";
    isValid = false;
  } else if (!mobileRegex.test(mobileNumber.value.trim())) {
    mobileError.textContent = "Mobile number must be 10 digits!";
    isValid = false;
  } else {
    mobileError.textContent = "";
  }
  if (dob.value.trim() === "") {
    dobError.textContent = "Last name is required!";
    isValid = false;
  } else {
    dobError.textContent = "";
  }
  if (qualifications.value.trim() === "") {
    qualificationError.textContent = "Last name is required!";
    isValid = false;
  } else {
    qualificationError.textContent = "";
  }
  if (address.value.trim() === "") {
    addressError.textContent = "Last name is required!";
    isValid = false;
  } else {
    addressError.textContent = "";
  }
  if (country.value.trim() === "Select country") {
    countryError.textContent = "Last name is required!";
    isValid = false;
  } else {
    countryError.textContent = "";
  }
  if (state.value.trim() === "Select state") {
    stateError.textContent = "Last name is required!";
    isValid = false;
  } else {
    stateError.textContent = "";
  }
  if (city.value.trim() === "") {
    cityError.textContent = "Last name is required!";
    isValid = false;
  } else {
    cityError.textContent = "";
  }
  if (zip.value.trim() === "") {
    zipError.textContent = "Last name is required!";
    isValid = false;
  } else {
    zipError.textContent = "";
  }
  if (username.value.trim() === "") {
    usernameError.textContent = "Last name is required!";
    isValid = false;
  } else {
    zipError.textContent = "";
  }
  if (password.value.trim() === "") {
    passwordError.textContent = "Password is required!";
    isValid = false;
  } else if (!passwordRegex.test(password.value.trim())) {
    passwordError.textContent =
      "Password must contain at least one capital letter and one number!";
    isValid = false;
  } else {
    passwordError.textContent = "";
  }
  if (isValid) {
    let Data = newData();
    upload(Data);
    BasicDtl.style.opacity = "0";
    BasicDtl.style.display = "none";
  }
};

document.getElementById("firstName").addEventListener("input", function () {
  document.getElementById("firstnameErr").textContent = "";
});

document.getElementById("lastName").addEventListener("input", function () {
  document.getElementById("lastnameErr").textContent = "";
});
document.getElementById("email").addEventListener("input", function () {
  document.getElementById("emailErr").textContent = "";
});
document.getElementById("mobileNumber").addEventListener("input", function () {
  document.getElementById("mobileNumErr").textContent = "";
});
document.getElementById("dob").addEventListener("input", function () {
  document.getElementById("dobErr").textContent = "";
});
document
  .getElementById("Qualifications")
  .addEventListener("input", function () {
    document.getElementById("qualificationErr").textContent = "";
  });
document.getElementById("address").addEventListener("input", function () {
  document.getElementById("addressErr").textContent = "";
});
document.getElementById("country").addEventListener("input", function () {
  document.getElementById("countryErr").textContent = "";
});
document.getElementById("state").addEventListener("input", function () {
  document.getElementById("stateErr").textContent = "";
});
document.getElementById("city").addEventListener("input", function () {
  document.getElementById("cityErr").textContent = "";
});
document.getElementById("zip").addEventListener("input", function () {
  document.getElementById("zipErr").textContent = "";
});
document.getElementById("username").addEventListener("input", function () {
  document.getElementById("userNameErr").textContent = "";
});
document.getElementById("password").addEventListener("input", function () {
  document.getElementById("passwordErr").textContent = "";
});
document.getElementById("salutation").addEventListener("input", function () {
  document.getElementById("salutationErr").textContent = "";
});

// ***********************************IMAGE_UPLOADING***************************************

let image;
document.getElementById("proImage").addEventListener("input", function (event) {
  event.stopPropagation();
  image = event.target.files[0];
});
async function imagePost(id) {
  try {
    let img = new FormData();
    img.append("avatar", image);
    let api = await fetch(`http://localhost:3000/employees/${id}/avatar`, {
      method: "POST",
      body: img,
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
    document.getElementById("overlay").style.display = "flex";
    BasicDtl.style.opacity = "1px";
    BasicDtl.style.display = "flex";
  }
}

// ***********************************PAGE_CANCEL******************************************

document
  .getElementById("formCancelBtn")
  .addEventListener("click", function (event) {
    if (event.target.id === "formCancelBtn") {
      document.getElementById("overlay").style.display = "none";
      BasicDtl.style.display = "none";
    }
  });

// ************************************ALERT-DELETE*****************************************

function Alert(id, index) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      console.log(index);
      deleteEmployee(id, index);
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  });
}

// *************************************DELETE_EMPLOYEE**************************************

async function deleteEmployee(id, index) {
  try {
    let api = await fetch(`http://localhost:3000/employees/${id}`, {
      method: "DELETE",
    });
    let response = await api.json();
    if (response) {
      console.log(index);

      const filter = allData.filter((emp) => emp.id != id);
      allData = filter;
      renderData(filter);
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Something went wrong!",
      text: "Employee coudn't be deleted",
    });
  }
}

// ************************************RETURN_DATA_TO_INPUT**********************************

saveChange.style.display = "none";

let emp_id;
function editor(id) {
  emp_id = id;
  let user;

  allData.forEach((emp) => {
    if (emp.id === id) {
      user = emp;
    }
  });
  submit.style.display = "none";
  saveChange.style.display = "block";

  salutation.value = user.salutation;
  firstname.value = user.firstName;
  lastname.value = user.lastName;
  email.value = user.email;
  mobileNumber.value = user.phone;
  dob.value = user.dob.split("-").reverse().join("-");
  if (user.gender == "Male") {
    male.checked = true;
  } else {
    female.checked = true;
  }
  qualifications.value = user.qualifications;
  address.value = user.address;
  country.value = user.country;
  state.value = user.state;
  city.value = user.city;
  zip.value = user.zip;
  username.value = user.username;
  password.value = user.password;
}

// ************************************UPDATE_EDITED_DATA*************************************

function updatedData() {
  let Dob = dob.value.split("-").reverse().join("-");
  return {
    salutation: salutation.value,
    firstName: firstname.value,
    lastName: lastname.value,
    email: email.value,
    phone: mobileNumber.value,
    dob: Dob,
    gender: male.checked ? "Male" : female.checked ? "Female" : "Unknown",
    qualifications: qualifications.value,
    address: address.value,
    country: country.value,
    state: state.value,
    city: city.value,
    zip: zip.value,
    username: username.value,
    password: password.value,
  };
}

// ********************************EDIT_DATA************************************

async function editEmployee(Data) {
  try {
    let api = await fetch(`http://localhost:3000/employees/${emp_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(Data),
    });
    let response = await api.json();
    if (response) {
      imagePost(emp_id);
      allData.forEach((emp) => {
        if (emp.id === emp_id) {
          Object.assign(emp, Data);
          renderData(allData);
        }
        document.getElementById("main-form").reset();
      });
    }
    Swal.fire({
      title: "Good job!",
      text: "Updated Sucessfully!",
      icon: "success",
    });
  } catch (error) {
    Swal.fire({
      title: "Something went wrong!",
      text: "employee didn't updated!",
      icon: "error",
    });
    document.getElementById("overlay").style.display = "flex";
    BasicDtl.style.opacity = "1px";
    BasicDtl.style.display = "flex";
  }
}

// *********************************SAVE-CHANGE_FOR_UPDATE_AND_PAGE_VALIDATION***************************************

saveChange.onclick = function (event) {
  event.preventDefault();
  const salutationError = document.getElementById("salutationErr");
  const firstnameError = document.getElementById("firstnameErr");
  const lastnameError = document.getElementById("lastnameErr");
  const emailError = document.getElementById("emailErr");
  const mobileError = document.getElementById("mobileNumErr");
  const dobError = document.getElementById("dobErr");
  const qualificationError = document.getElementById("qualificationErr");
  const addressError = document.getElementById("addressErr");
  const countryError = document.getElementById("countryErr");
  const stateError = document.getElementById("stateErr");
  const cityError = document.getElementById("cityErr");
  const zipError = document.getElementById("zipErr");
  const usernameError = document.getElementById("userNameErr");
  const passwordError = document.getElementById("passwordErr");
  let isValid = true;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const mobileRegex = /^\d{10}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

  if (salutation.value.trim() === "select salutation") {
    salutationError.textContent = "Salutation is required!";
    isValid = false;
  } else {
    salutationError.textContent = "";
  }
  if (firstname.value.trim() === "") {
    firstnameError.textContent = "First name is required!";
    isValid = false;
  } else {
    firstnameError.textContent = "";
  }
  if (lastname.value.trim() === "") {
    lastnameError.textContent = "Last name is required!";
    isValid = false;
  } else {
    lastnameError.textContent = "";
  }
  if (email.value.trim() === "") {
    emailError.textContent = "Email is required!";
    isValid = false;
  } else if (!emailRegex.test(email.value.trim())) {
    emailError.textContent = "Invalid email format!";
    isValid = false;
  } else {
    emailError.textContent = "";
  }
  if (mobileNumber.value.trim() === "") {
    mobileError.textContent = "Mobile number is required!";
    isValid = false;
  } else if (!mobileRegex.test(mobileNumber.value.trim())) {
    mobileError.textContent = "Mobile number must be 10 digits!";
    isValid = false;
  } else {
    mobileError.textContent = "";
  }
  if (dob.value.trim() === "") {
    dobError.textContent = "Dob is required!";
    isValid = false;
  } else {
    dobError.textContent = "";
  }
  if (qualifications.value.trim() === "") {
    qualificationError.textContent = "Qualification is required!";
    isValid = false;
  } else {
    qualificationError.textContent = "";
  }
  if (address.value.trim() === "") {
    addressError.textContent = "Address is required!";
    isValid = false;
  } else {
    addressError.textContent = "";
  }
  if (country.value.trim() === "Select country") {
    countryError.textContent = "Last name is required!";
    isValid = false;
  } else {
    countryError.textContent = "";
  }
  if (state.value.trim() === "Select state") {
    stateError.textContent = "Last name is required!";
    isValid = false;
  } else {
    stateError.textContent = "";
  }
  if (city.value.trim() === "") {
    cityError.textContent = "City is required!";
    isValid = false;
  } else {
    cityError.textContent = "";
  }
  if (zip.value.trim() === "") {
    zipError.textContent = "Zip is required!";
    isValid = false;
  } else {
    zipError.textContent = "";
  }
  if (username.value.trim() === "") {
    usernameError.textContent = "Username is required!";
    isValid = false;
  } else {
    zipError.textContent = "";
  }
  if (password.value.trim() === "") {
    passwordError.textContent = "Password is required!";
    isValid = false;
  } else if (!passwordRegex.test(password.value.trim())) {
    passwordError.textContent =
      "Password must contain at least one capital letter and one number!";
    isValid = false;
  } else {
    passwordError.textContent = "";
  }
  if (isValid) {
    let Data = updatedData();
    editEmployee(Data);
    BasicDtl.style.opacity = "0px";
    BasicDtl.style.display = "none";
    document.getElementById("overlay").style.display = "none";
  }
};

document.getElementById("firstName").addEventListener("input", function () {
  document.getElementById("firstnameErr").textContent = "";
});

document.getElementById("lastName").addEventListener("input", function () {
  document.getElementById("lastnameErr").textContent = "";
});
document.getElementById("email").addEventListener("input", function () {
  document.getElementById("emailErr").textContent = "";
});
document.getElementById("mobileNumber").addEventListener("input", function () {
  document.getElementById("mobileNumErr").textContent = "";
});
document.getElementById("dob").addEventListener("input", function () {
  document.getElementById("dobErr").textContent = "";
});
document
  .getElementById("Qualifications")
  .addEventListener("input", function () {
    document.getElementById("qualificationErr").textContent = "";
  });
document.getElementById("address").addEventListener("input", function () {
  document.getElementById("addressErr").textContent = "";
});
document.getElementById("country").addEventListener("input", function () {
  document.getElementById("countryErr").textContent = "";
});
document.getElementById("state").addEventListener("input", function () {
  document.getElementById("stateErr").textContent = "";
});
document.getElementById("city").addEventListener("input", function () {
  document.getElementById("cityErr").textContent = "";
});
document.getElementById("zip").addEventListener("input", function () {
  document.getElementById("zipErr").textContent = "";
});
document.getElementById("username").addEventListener("input", function () {
  document.getElementById("userNameErr").textContent = "";
});
document.getElementById("password").addEventListener("input", function () {
  document.getElementById("passwordErr").textContent = "";
});
document.getElementById("salutation").addEventListener("input", function () {
  document.getElementById("salutationErr").textContent = "";
});

// ****************************************SEARCH************************************************

document.getElementById("search").addEventListener("input", (event) => {
  searchEmployee(event);
});

function searchEmployee(event) {
  let search = event.target.value.toLowerCase();
  const filteredData = allData.filter((employee) => {
    let fullname = employee.firstName + employee.lastName;
    if (
      employee.firstName.toLowerCase().includes(search) ||
      employee.lastName.toLowerCase().includes(search) ||
      employee.email.toLowerCase().includes(search) ||
      employee.phone.toLowerCase().includes(search) ||
      fullname.toLowerCase().includes(search)
    ) {
      return employee;
    }
  });
  renderData(filteredData);
}

// ************************************PAGINATION_BUTTON********************************************
function renderBtn(limit, data) {
  let btnUl = document.getElementById("pgBtns");
  let btnNum = Math.ceil(data.length / limit);
  btnUl.innerHTML = "";
  for (let i = 0; i < btnNum; i++) {
    btnUl.innerHTML += `<li> <a class=' py-1 px-3 border '
    id='theBtn-${i}' onclick="pagination('${i}')"> ${i + 1}</a> </li>`;
  }
}

let prevBtn;
function pagination(butonNum) {
  if (prevBtn) {
    document.getElementById(`theBtn-${butonNum}`).classList.remove("activeBtn");
  }
  prev_id = `theBtn-${butonNum}`;
  let startindex = butonNum * limit;
  let endIndex = startindex + limit;
  const filterData = allData.slice(startindex, endIndex);
  renderData(filterData);
  document.getElementById(`theBtn-${butonNum}`).classList.add("activeBtn");
}
function limitCalc() {
  limit = Number(document.getElementById("pg-limit").value);
  const data = allData.slice(0, limit);
  console.log(data);

  renderData(data);
}
