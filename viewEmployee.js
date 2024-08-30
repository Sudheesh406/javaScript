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

let empName = document.getElementById("empName");
let empGmail = document.getElementById("empGmail");
let empGender = document.getElementById("empGender");
let empAge = document.getElementById("empAge");
let empDob = document.getElementById("empDob");
let empPhone = document.getElementById("empPhone");
let empQualification = document.getElementById("empQualification");
let empAddress = document.getElementById("empAddress");
let empUserName = document.getElementById("empUserName");
let profileImg = document.getElementById("proImage");

// *******************************VIEW_DATA*************************************

let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("id");
console.log(id);
let user = [];
async function viewPage() {
  try {
    let api = await fetch(`http://localhost:3000/employees/${id}`);
    let data = await api.json();
    console.log(data);
    user = data;
    valueAdd(data);
  } catch (error) {
    console.log(error);
  }
}

viewPage();

// ***************************VIEW_PAGE_INPUT************************************

let empData;
function valueAdd(emp) {
  empData = emp;
  profileImg.src = `http://localhost:3000/employees/${emp.id}/avatar`;
  console.log(emp.avatar);
  empName.innerHTML = emp.firstName + emp.lastName;
  empGmail.innerHTML = emp.email;
  empGender.innerHTML = emp.gender;
  let dob = emp.dob.split("-")[2];
  let age = 2024 - dob;
  console.log(age);
  empAge.innerHTML = age;
  empDob.innerHTML = emp.dob;
  empPhone.innerHTML = emp.phone;
  console.log(emp.qualifications);

  empQualification.innerHTML = emp.qualifications;
  empAddress.innerHTML = emp.address;
  empUserName.innerHTML = emp.username;
}

// ******************************IMAGE_POST**********************************

let image;
document
  .getElementById("viewProImage")
  .addEventListener("input", function (event) {
    event.stopPropagation();
    image = event.target.files[0];
  });

async function imagePost(id) {
  let img = new FormData();
  img.append("avatar", image);
  let api = await fetch(`http://localhost:3000/employees/${id}/avatar`, {
    method: "POST",
    body: img,
  });
  return api;
}

// **************************DELETE_DATA***********************************

document.getElementById("dltBtn").addEventListener("click", function (event) {
  Alert(id);
});

function Alert(id) {
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
      deleteEmployee(id);
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
      window.location.href = "index.html";
    }
  });
}

async function deleteEmployee(id) {
  try {
    let api = await fetch(`http://localhost:3000/employees/${id}`, {
      method: "DELETE",
    });
    let response = await api.json();
  } catch (error) {
    console.log(error);
  }
}

// **************************RETURN_DATA_TO_INPUT*****************************

function editor(user) {
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

document.getElementById("emp-sec").addEventListener("click", function (event) {
  console.log(event);
  let BasicDtl = document.getElementById("BasicDtl");
  if (event.target.id == "editBtn") {
    editor(empData);
    console.log(empData);
    BasicDtl.style.opacity = "1px";
    BasicDtl.style.display = "flex";
    document.getElementById("overlay").style.display = "block";
  } else if (
    event.target.id == "formCancelBtn" ||
    event.target.id == "overlay"
  ) {
    BasicDtl.style.opacity = "0px";
    BasicDtl.style.display = "none";
    document.getElementById("overlay").style.display = "none";
  }
});

// ************************************PAGE_VALIDATION****************************************

function showError(id, message) {
  document.getElementById(id).textContent = message;
  document.getElementById(id).style.color = "red";
}

function clearErrors() {
  const errorElements = document.querySelectorAll("p[id$='Err']");
  errorElements.forEach((element) => {
    element.textContent = "";
  });
}

function validateForm() {
  clearErrors(); 
  let isValid = true;

  if (salutation.value.trim() === "select salutation") {
    showError("salutationErr", "Salutation is required.");
    isValid = false;
  }
  if (firstname.value.trim() === "") {
    showError("firstnameErr", "First name is required.");
    isValid = false;
  }
  if (lastname.value.trim() === "") {
    showError("lastnameErr", "Last name is required.");
    isValid = false;
  }
  if (email.value.trim() === "") {
    showError("emailErr", "Email is required.");
    isValid = false;
  }
  if (mobileNumber.value.trim() === "") {
    showError("mobileNumErr", "Mobile number is required.");
    isValid = false;
  }
  if (dob.value.trim() === "") {
    showError("dobErr", "Date of birth is required.");
    isValid = false;
  }
  if(male.value ==" "&& female.value==" "){
    showError("genderErr", "gender is required.");
    isValid = false;
  }
  
  if (qualifications.value.trim() === "") {
    showError("qualificationErr", "Qualification is required.");
    isValid = false;
  }
  if (address.value.trim() === "") {
    showError("addressErr", "Address is required.");
    isValid = false;
  }
  if (country.value.trim() === "Select country") {
    showError("countryErr", "Country is required.");
    isValid = false;
  }
  if (state.value.trim() === "Select state") {
    showError("stateErr", "State is required.");
    isValid = false;
  }
  if (city.value.trim() === "") {
    showError("cityErr", "City is required.");
    isValid = false;
  }
  if (zip.value.trim() === "") {
    showError("zipErr", "Zip is required.");
    isValid = false;
  }
  if (username.value.trim() === "") {
    showError("userNameErr", "Username is required.");
    isValid = false;
  }
  if (password.value.trim() === "") {
    showError("passwordErr", "Password is required.");
    isValid = false;
  }

  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value && !emailPattern.test(email.value)) {
    showError("emailErr", "Please enter a valid email address.");
    isValid = false;
  }

  let mobilePattern = /^\d{10}$/;
  if (mobileNumber.value && !mobilePattern.test(mobileNumber.value)) {
    showError("mobileNumErr", "Please enter a valid mobile number.");
    isValid = false;
  }

  let passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
  if (password.value && !passwordPattern.test(password.value)) {
    showError("passwordErr", "At least 6 characters, include one uppercase letter and one number.");
    isValid = false;
  }

  return isValid;
}

// ******************************UPDATE_EDITED_DATA**************************************

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

async function editEmployee(Data) {
  try {
    let api = await fetch(`http://localhost:3000/employees/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(Data),
    });
    let response = await api.json();
    await imagePost(id);
    profileImg.src = `http://localhost:3000/employees/${id}/avatar`;
    console.log(response);
    Swal.fire({
      title: "Good job!",
      text: "Updated Sucessfully!",
      icon: "success",
    });
  } catch (error) {
    console.log(error);
  }
}

// *******************************SAVE-CHANGE-FOR-UPDATE**************************************

let saveChange = document.getElementById("submit");
saveChange.addEventListener("click", function (event) {
  event.preventDefault();
  if (validateForm()) {
  let Data = updatedData();
  editEmployee(Data);
  valueAdd(Data);
  console.log(Data);
  BasicDtl.style.opacity = "0px";
  BasicDtl.style.display = "none";
  document.getElementById("overlay").style.display = "none";
  }
});


