let container = document.getElementById("container");
let BasicDtl = document.getElementById("BasicDtl");
let section = document.getElementById("section");
let AddEmp = document.getElementById("AddEmp");
let submit = document.getElementById("submit");
let saveChange = document.getElementById("saveChange");
let alert = document.getElementById("deleteAlert")
let deleteBtn = document.getElementById("deleteBtn")

section.addEventListener("click", function (event) {
  if (event.target.id === "AddEmp"|| event.target.id=== "editBtn") {
    BasicDtl.style.opacity = "1px";
    BasicDtl.style.display = "flex";
    document.getElementById("overlay").style.display= "block"
  } else if (event.target.id != "AddEmp" || event.target.id=="overlay") {
    BasicDtl.style.opacity = "0px";
    BasicDtl.style.display = "none";
    document.getElementById("overlay").style.display= "none";
  }
});

let salutation = document.getElementById("salutation")
let firstname = document.getElementById("firstName")
let lastname = document.getElementById("lastName")
let email = document.getElementById("email")
let mobileNumber = document.getElementById("mobileNumber")
let dob = document.getElementById("dob");
let male = document.getElementById("male")
let female = document.getElementById("female")
let qualifications = document.getElementById("Qualifications")
let address = document.getElementById("address")
let country = document.getElementById("country")
let state = document.getElementById("state")
let city = document.getElementById("city")
let zip = document.getElementById("zip")
let username = document.getElementById("username")
let password = document.getElementById("password")

let allData=[];


async function employeeData(){
  try{
    let api = await fetch('http://localhost:3000/employees')
    let data = await api.json()
    renderData(data)
    allData = data;
  }catch(error){
    console.log(error)
  }
}

employeeData();

function renderData(data){
  let tbody = document.getElementById("tbody")
  tbody.innerHTML = "";
  data.forEach((emp,index)=>{
    let tr = document.createElement("tr")
    tr.innerHTML=`
    <th>#0${index+1}</th>
    <td>${emp.firstName+emp.lastName}</td>
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
    <li><a class="dropdown-item" href='./viewEmployee.html?id=${emp.id}'><i class="fa-regular fa-eye"></i> View Details</a></li>
    <li><button class="dropdown-item" type="button"id="editBtn" onclick=editor('${emp.id}')><i class="fa-solid fa-pen-to-square"></i> Edit</button></li>
    <li><button class="dropdown-item" id="dltBtn" type="button" onclick="Alert('${emp.id}')"><i class="fa-solid fa-trash"></i> Delete</button></li>
  </ul>
</div>
    `
    tbody.appendChild(tr)
  })
}

// ************************NEW_DATA_UPLOAD********************************

function newData(){
  let Dob = dob.value.split('-').reverse().join('-');
 return{
salutation : salutation.value,
firstName : firstname.value,
lastName : lastname.value,
email : email.value,
phone: mobileNumber.value,
dob : Dob,
gender: male.checked ? "Male" : female.checked ? "Female" : "Unknown",
qualifications : qualifications.value,
address : address.value,
country : country.value,
state : state.value,
city : city.value,
zip : zip.value,
username : username.value,
password : password.value
 }
}

async function upload(Data){
  try{
let api = await fetch('http://localhost:3000/employees',{
  method: 'POST',
  headers: {
    'content-type': 'application/json'
  },
  body: JSON.stringify(Data)
});
let response = await api.json();
if (response) {
  allData.push(Data);
  console.log(allData);
  renderData(allData);
  Swal.fire({
    title: "Good job!",
    text: "Employee Added Sucessfully!",
    icon: "success"
  });

}
document.getElementById("overlay").style.display= "none";
console.log(response);
} catch (error) {
console.log(error);
}
}

submit.addEventListener('click',function(event){
  event.preventDefault();
  let Data = newData()
  console.log(Data)
  upload(Data)
  BasicDtl.style.opacity = "0px";
  BasicDtl.style.display = "none";
})

document.getElementById("formCancelBtn").addEventListener('click',function(event){
  if(event.target.id==="formCancelBtn"){
    document.getElementById("overlay").style.display= "none";
    BasicDtl.style.display = "none";
  }
})

// *****************************DELETE_DATA***********************************

function Alert(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      deleteEmployee(id)
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    }
  });
}

async function deleteEmployee(id){
  try{
let api = await fetch(`http://localhost:3000/employees/${id}`,{
  method: 'DELETE',
});
let response = await api.json();
console.log(response);
if(response.ok){
  renderData(allData);
}
} catch (error) {
console.log(error);
}
}


// ***************************RETURN_DATA_TO_INPUT******************************

  saveChange.style.display = "none"
  let emp_id;
  function editor (id){
    emp_id = id
    let user;
    allData.forEach((emp)=>{
      if (emp.id === id){
        user = emp
      }
    })
    submit.style.display = "none"
    saveChange.style.display = "block"

    console.log(user);
    salutation.value = user.salutation
    firstname.value = user.firstName
    lastname.value = user.lastName
    email.value = user.email
    mobileNumber.value= user.phone
    dob.value = user.dob.split('-').reverse().join('-')
    if (user.gender=='Male') {
      male.checked=true
    }else{
      female.checked=true
    }
    qualifications.value = user.qualifications
    address.value = user.address
    country.value = user.country
    state.value = user.state
    city.value = user.city
    zip.value = user.zip
    console.log(user.zip);
    
    username.value = user.username
    password.value = user.password
  }
  
// ****************************EDIT_DATA***********************************

  function updatedData(){
    let Dob = dob.value.split('-').reverse().join('-');
   return{
  salutation : salutation.value,
  firstName : firstname.value,
  lastName : lastname.value,
  email : email.value,
  phone: mobileNumber.value,
  dob : Dob,
  gender: male.checked ? "Male" : female.checked ? "Female" : "Unknown",
  qualifications : qualifications.value,
  address : address.value,
  country : country.value,
  state : state.value,
  city : city.value,
  zip : zip.value,
  username : username.value,
  password : password.value
   }
  }

  saveChange.addEventListener('click',function(event){
  event.preventDefault();
  let Data = updatedData()
  console.log(Data)
  editEmployee(Data)
  BasicDtl.style.opacity = "0px";
  BasicDtl.style.display = "none";
  document.getElementById("overlay").style.display= "none";
})

  async function editEmployee(Data){
    console.log(emp_id);
    try{
  let api = await fetch(`http://localhost:3000/employees/${emp_id}`,{
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(Data)
  });
  let response = await api.json();
  console.log(response);
  Swal.fire({
    title: "Good job!",
    text: "Updated Sucessfully!",
    icon: "success"
  });
  } catch (error) {
  console.log(error);
  }
  } 


