// object selector

let allGuestData = [];

let select = (e) => document.querySelector(e);
let selectAll = (e)=> document.querySelectorAll(e);
let hotelName = select(".hotelName");
let logOutBtn = select(".logOutBtn");
let regForm = select(".registration-form");
let regInput = regForm.querySelectorAll("input");
let regTextarea = regForm.querySelector("textarea");
let regBtns = regForm.querySelectorAll("button");
let guestList = document.querySelector(".show-guestData");
let regFormCloseBtn = document.querySelector(".form-close-btn");
let register_btn = document.querySelector(".booking-register-btn");
let allPrintBtn   = selectAll(".print-btn");
let archivePrintBtn  = select(".archive-print-btn");
let cashierHidePrint =  select(".cashier-tab-pane");

let allTotalBtn   = selectAll(".total-btn");





// inhouse DOM selector 

let allInHdata  = [];

let inhouseForm = document.querySelector(".inhouse-form");
let allInHInput = inhouseForm.querySelectorAll("input");
let inHTextarea =  inhouseForm.querySelector("textarea");
let inhouseBtns = inhouseForm.querySelectorAll("button");
let inhouseList =  document.querySelector(".inhouse-list");
let inHCloseBtn =  document.querySelector(".inhouse-close-btn");
let inHRegBtn   =  document.querySelector(".inhouse-reg-btn");


// Archive Dom Selector 

let allArchiveData  = [];
let archiveList =   select(".archive-list");
let allTabBtn   =   selectAll(".tab-button") ; 
let searchEl  = select(".search-input");



// cashier Dom Selector
let allCashierData = [];
let allCashArchiveData = [];
let cashierTabBtn = select(".cashier-tab");
let cashierPane  =  select(".cashier-pane");
let bookingPane   = select("#booking");
let cashierForm   = select(".cashier-form");
let allCinput   =    cashierForm.querySelectorAll("input");
let addCashBtn    =  select(".add-cash-btn");
let cashierCloseBtn  = select(".cashier-close-btn");
let cashierList      =  select(".cashier-list")  ;
let totalAmount =  select(".totalamount") ;
let closeCashBtn = select(".closeCashier");
let cashierArcList = select(".cashier-archive-list");
let archiveBtn =   select(".archiveCashier");
let archiveTotal =   select(".archiveTotal") ;
let addCashModelcloseBtn =  select(".close-add-cash");




// show 
let showInHRoomsEl = select(".show-inHouse-Rooms");
let showBRoomsEl =  select(".show-booking-rooms");















// ----------Code -------------------xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx--------------------- Start--------------------

// check User Login or NOt
let getUserData = sessionStorage.getItem("UserData");

let securityLogOut = () => {
  if (getUserData == null) {
    window.location = "../login Files/index.html";
  }

  logOutBtn.onclick = () => {
    logOutBtn.innerText = "Wait...";
    setTimeout(() => {
      window.location = "../login Files/index.html";
      sessionStorage.removeItem("UserData");
      logOutBtn.innerText = "LogOut";
    }, 2000);
  };
};

securityLogOut();

let fetchUser = JSON.parse(getUserData) ;
hotelName.innerText = fetchUser.hotelName.toUpperCase() ;
let emails = fetchUser.email.split("@")[0] ;
let totalRooms = Number(fetchUser.hotelNumber) ; 





// allGuest Data fetch from local Storage

let fetchData = (key) => {
  if (localStorage.getItem(key) != null) {
    let GuestLocal = localStorage.getItem(key);
    return JSON.parse(GuestLocal);
  }
 else {
    return [];
  }
};

allGuestData = fetchData(`${emails}` + "_allGuestData");
allInHdata   = fetchData(`${emails}` + "_allInHInput");
allArchiveData = fetchData(`${emails}`+ "_allArchiveData");
allCashierData = fetchData(`${emails}` + "_allCashierData");
allCashArchiveData  = fetchData(`${emails}` + "_allCashArchiveData");
// check Confirm Delete Promise Function

let delCnf = () => {
  return new Promise((resolve, reject) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
        resolve("del");
      } else {
        swal("Your imaginary file is safe!");
        reject("not del");
      }
    });
  });
};




//  ++++++++++++++++++++++  DYNAMIC ++++++++++++++++++ and ++++++++++++++== REPEEd ++++++++++++==  CODES 



// ---------------------------  Room Check Function codding  

let roomCheckFun =(element)=>{
         if( totalRooms < Number(element.value)){
          swal("alert", `only ${totalRooms} rooms are availble in Hotel `, "warning") ;
          element.value = totalRooms
         }
}

regInput[2].oninput =()=>{
     roomCheckFun(regInput[2])
}
allInHInput[2].oninput=()=>{
  roomCheckFun(allInHInput[2])  ; 
}

//---------------------------  formate Date Function
let formateDate = (data, time) => {
  let date = new Date(data);
  // console.log(date)
  let yy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();
  let tt = date.toLocaleTimeString();
  dd <= 9 ? (dd = "0" + `${dd}`) : (dd = dd);
  mm <= 9 ? (mm = "0" + `${mm}`) : (mm = mm);

  return `${dd}/${mm}/${yy} ${time ? tt : ""}`;
};


//---------------------------- Form Reset Coding
let resetForm  =(FormBtn , form, addRemove)=>{

  FormBtn.onclick = () => {
    form.reset();
    addRemove[0].classList.remove("d-none");
    addRemove[1].classList.add("d-none");
  };
  
  }
  

//---------------------------- registration function Coding  
const registrationFunc = ( textarea ,allInputs, array ,key)=>{

  let guestData = {};
  // check all registration form input field
 let AnyInput = true;
 if(textarea){
 if (textarea.value == "") {
   AnyInput = false;
 }
}

 for (let i of allInputs) {
   if (i.value == "") {
     AnyInput = false;
   }
 }

 if (AnyInput) {
  if(textarea){
   guestData[textarea.name] = textarea.value;
  }
   for (let input of allInputs) {
     guestData[input.name] = input.value;
   }

   guestData["registeredAt"] = new Date();
   guestData["inHouse"]    = false;

   array.unshift(guestData);
  

   //  store allGuest Data in Local Storage
   localStorage.setItem( key,  JSON.stringify(array));

   swal("success", "data registered succesful", "success");
 } else {
   swal("Input ERROR", "Please check All Input field", "warning");
 }

}


//---------------------------- Show Guest data Coding
let showData = ( showList, array , key) => {

  let temKey  = key.split("_")[1];
  // console.log(temKey)
  showList.innerHTML = "";
  array.forEach((el, index) => {
    showList.innerHTML += `<tr>
                                        <td class="no-print"> ${index + 1}</td>
                                        <td>${el.location}</td>
                                        <td>${el.roomNo}</td>
                                        <td>${el.fullName}</td>
                                        <td>${formateDate(el.checkInDate , false)}</td>
                                        <td>${formateDate(el.checkOutDate,false)}</td>
                                        <td>${el.totalPeople}</td>
                                        <td>${el.mobileNo}</td>
                                        <td>${el.price}</td>
                                        <td>${el.notice}</td>
                                        <td class="no-print">${formateDate(new Date(el.registeredAt), true)}</td>
                                        <td class="d-flex pt-4 gap-1">
                                            <button class=" ${temKey == `allArchiveData` ?`d-none`: ""} btn  p-1 px-2 btn-primary edit-btn  no-print"><i
                                                    class="ri-edit-box-fill"></i></button>
                                            <button class="btn p-1 px-2  btn-info text-white checkin-btn  no-print"><i
                                                    class="ri-checkbox-fill"></i></button>
                                            <button class="btn p-1 px-2  btn-danger  no-print"><i
                                                    class="ri-delete-bin-6-line del-btn"></i></button> 
                                                    </td>
                                   </tr> `;
  });
  dataDelete(showList , array , key);
  dataUpdate(showList , array , key)
  checkInandCheckOut(showList , array, key)
};

// --------------------------  DATA delete  coding 
let dataDelete = (showList , array , key) => {

  let allDelBtn = showList.querySelectorAll(".del-btn");
  allDelBtn.forEach((el, index) => {
    el.onclick = async () => {
      try {
        let result = await delCnf();
        console.log(index);
        let i = index
        for (i ; i < array.length; i++) {
          array[index] = array[index + 1];
        }

        array.length = array.length - 1;

        localStorage.setItem(
          key,
          JSON.stringify(array)
        );
       showData(showList, array , key);
      } catch (error) {
        console.log(index);

      }
    };
  });
};


// --------------------------- Data  Upadate Coding
let dataUpdate = (  showList, array , key) => {

  let allEditBtn = showList.querySelectorAll(".edit-btn");

  allEditBtn.forEach((el, index) => {

    el.onclick = () => {
      
      let temVar =   key.split("_")[1];

      // console.log(temVar)

      temVar == "allGuestData"  ?   register_btn.click() :  inHRegBtn.click()  ;
     
      temVar == "allGuestData" ? regBtns[0].classList.add("d-none") : inhouseBtns[0].classList.add("d-none") ; 
      temVar == "allGuestData" ?  regBtns[1].classList.remove("d-none") :  inhouseBtns[1].classList.remove("d-none") 


    let AllInputs =  temVar == "allGuestData" ?  regForm.querySelectorAll("input") :  inhouseForm.querySelectorAll("input") ;
    let textarea  =  temVar == "allGuestData" ?  regForm.querySelector("textarea") :  inhouseForm.querySelector("textarea")
     
   
      let guestObj = array[index];


      AllInputs[0].value = guestObj.fullName;
      AllInputs[1].value = guestObj.location;
      AllInputs[2].value = guestObj.roomNo;
      AllInputs[3].value = guestObj.totalPeople;
      AllInputs[4].value = guestObj.checkInDate;
      AllInputs[5].value = guestObj.checkOutDate;
      AllInputs[6].value = guestObj.price;
      AllInputs[7].value = guestObj.mobileNo;
      textarea.value = guestObj.notice;
      
     let  buttonClick = temVar == "allGuestData" ?  regBtns : inhouseBtns ;
     buttonClick[1].onclick = () => {
      buttonClick[0].classList.remove("d-none");
      buttonClick[1].classList.add("d-none");
     
      let closeBtn =  temVar == "allGuestData" ? regFormCloseBtn : inHCloseBtn  ;

        closeBtn.click();  

        let guestEditObj = {};
        guestEditObj.notice = textarea.value;
        guestEditObj.registeredAt = new Date();

        for (let input of AllInputs) {
          guestEditObj[input.name] = input.value;
        }

        array[index] = guestEditObj;

        localStorage.setItem(key ,  JSON.stringify(array));

        showData(showList, array , key );
        swal("Updated", "Data update success ✅", "success");
      };
    };
  });
};



// -------------------------checkIN and CheckOUT coding
checkInandCheckOut=( showList , array, key)=>{
             let allCheckInBtn =  showList.querySelectorAll(".checkin-btn") ;
            //  let tem = key.split("_")[1];
            //  console.log(tem)
            for(let i=0; i<allCheckInBtn.length; i++){
            
          allCheckInBtn[i].onclick=()=>{
             let tem = key.split("_")[1];
             if(tem == "allGuestData"){
                   let data = array[i]; 
                   array.splice(i, 1) ;
                     allInHdata.unshift(data) ;

                 localStorage.setItem(key , JSON.stringify(array));
                 localStorage.setItem(`${emails}` + "_allInHInput" , JSON.stringify(allInHdata));

                 showData(showList , array, key) ;
                // showData(inhouseList , allInHdata  , `${emails}` + "_allInHInput");
             }
             else{
              if(tem == "allInHInput"){
                let data = array[i]; 
                allArchiveData.unshift(data) ;
                 array.splice(i,1);
                localStorage.setItem(`${emails}` + "_allArchiveData" , JSON.stringify(allArchiveData));
                localStorage.setItem(key, JSON.stringify(array));
                console.log(showList , array ,key)
                showData( showList , array  , key);
                showData(inhouseList , allInHdata  , `${emails}` + "_allInHInput");
                showInHRooms() ;


              }
              else{
                let data = array[i];
                allGuestData.unshift(data);
                array.splice(i,1);
                localStorage.setItem(key, JSON.stringify(array));
                localStorage.setItem(`${emails}` + "_allGuestData" , JSON.stringify(allGuestData));
                showData(showList , array, key)
              }
             }
         }
            }
            showBookingRooms()
          
}


// ---------------------------- show Booking Rooms

const showBookingRooms = ()=>{

  showBRoomsEl.innerHTML = ""
  allGuestData.forEach((el, index)=>{
    showBRoomsEl.innerHTML  += `
                         <div class="card col-md-2 px-0 text-center text-white fw-bold">
                           <div class="card-header  bg-danger">
                             <p>${el.roomNo}</p>
                           </div>
                           <div class="card-body bg-success ">
                             <p>${formateDate(el.checkInDate)}</p>
                             <p>TO</p>
                             <p>${formateDate(el.checkOutDate)}</p>
                           </div>
                           </div>
                          `
  })

}
showBookingRooms() ;

//----------------------------  show inhouse Rooms

const showInHRooms = ()=>{

  showInHRoomsEl.innerHTML = ""
  allInHdata.forEach((el, index)=>{
    showInHRoomsEl.innerHTML  += `
                                         <div class="card col-md-2 px-0 text-center text-white fw-bold">
                                 <div class="card-header  bg-danger">
                                   <p>${el.roomNo}</p>
                                 </div>
                                 <div class="card-body ">
                                 <img src=${el.inHouse == false ? '../img/lock.png': "../img/dummy.png" } class="w-100" alt=""></img>
                                 <div class="card-footer">
                                  <button class="in-btn action-btn btn text-white bg-primary">In</button>
                                  <button class="out-btn action-btn btn text-white bg-primary">Out</button>
                                 </div>
                                 </div>
                                </div>
                              `
  })
  
// in-out codding
  let allInBtn = selectAll(".in-btn");
    allInBtn.forEach((btn, index)=>{
          btn.onclick=()=>{
            let data = allInHdata[index];
            data.inHouse = true; 
            allInHdata[index] =  data ;
            showInHRooms();
            showData(inhouseList , allInHdata  , `${emails}` + "_allInHInput");
            localStorage.setItem(`${emails}` + "_allInHInput" , JSON.stringify(allInHdata));
          }
    })       

  let allOutBtn   = selectAll(".out-btn")
  allOutBtn.forEach((btn, index)=>{
        btn.onclick=()=>{
          let data =   allInHdata[index];
          data.inHouse =  false;
          allInHdata[index]  =  data;
          showInHRooms();
          localStorage.setItem(`${emails}` + "_allInHInput" , JSON.stringify(allInHdata));
          showData(inhouseList , allInHdata  , `${emails}` + "_allInHInput");
        }
  })

}

showInHRooms() ;


// ----------------------- totalBooking showIntext Codding  
function showTotalBooking (){
  allTotalBtn[0].innerText = "Total Booking = "+allGuestData.length; 
  allTotalBtn[1].innerText = "Total Inhouse = "+ allInHdata.length; 
  allTotalBtn[2].innerText = "Total Archive = "+ allCashArchiveData.length
}

showTotalBooking()


// regForm booking coding
regForm.onsubmit = (e) => {
     e.preventDefault();
     registrationFunc(regTextarea, regInput, allGuestData, `${emails}` + "_allGuestData");
     regFormCloseBtn.click();
     showData(guestList , allGuestData  , `${emails}` + "_allGuestData");
     regForm.reset();
     showTotalBooking()
    showBookingRooms()
};


// start inhouse  booking  Coding
inhouseForm.onsubmit =(e) =>{
  e.preventDefault();
  registrationFunc(inHTextarea, allInHInput , allInHdata , `${emails}` + "_allInHInput");
  showData(inhouseList , allInHdata  , `${emails}` + "_allInHInput");
  inHCloseBtn.click();
  showTotalBooking()
};




// search Coding

let searchFun =()=>{
           let inputVal =  searchEl.value.toLowerCase();;
           let tableEl = select(".tab-content .search-pane.active");
           let allTr   = tableEl.querySelectorAll("tbody tr") ;
         for(let el of allTr){
          let allTd = el.querySelectorAll("td");
          let sNo =    allTd[0].innerText.toLowerCase() ;
          let name  =  allTd[3].innerText.toLowerCase() ;
          let roomNo =  allTd[2].innerText.toLowerCase() ;
          let city   = allTd[1].innerText.toLowerCase()  ;
          let mobile =  allTd[7].innerText.toLowerCase() ;
          let conditions = sNo.indexOf(inputVal) != -1 || name.indexOf(inputVal) != -1 || roomNo.indexOf(inputVal) != -1 || city.indexOf(inputVal) != -1   ||  mobile.indexOf(inputVal)!= -1;
          if(conditions){
              
             el.classList.remove("d-none")

          }else{
              el.classList.add("d-none")
          }
         }
}

searchEl.oninput=()=>{
            searchFun();
}


resetForm(register_btn, regForm , regBtns);
resetForm(inHRegBtn ,inhouseForm, inhouseBtns )

// refresh Tab Coding

for(let button of allTabBtn){
   button.onclick=()=>{
    showInHRooms()
    showData(guestList , allGuestData  , `${emails}` + "_allGuestData");
    showData(inhouseList , allInHdata  , `${emails}` + "_allInHInput");
    showData(archiveList,allArchiveData , `${emails}`+ "_allArchiveData");
   }
}

showData(guestList , allGuestData  , `${emails}` + "_allGuestData");
showData(inhouseList , allInHdata  , `${emails}` + "_allInHInput");
showData(archiveList ,allArchiveData , `${emails}`+ "_allArchiveData");




//  cashier Codding

let showCashFun =()=>{
  
  let  num =0;
  cashierList.innerHTML = "" ; 
  allCashierData.forEach((el, index)=>{
            num +=  Number(el.amount)
            cashierList.innerHTML += ` <td>${index+1}</td>
             
                                        <td>${el.roomNo}</td>   
                                        <td>${el.cashierName}</td>  
                                        <td>${formateDate(el.registeredAt
                                          , true)}</td>  
                                          <td class="amount">${el.amount}</td>        `
  })
    
  totalAmount.innerHTML = `<i class="ri-money-rupee-circle-line"></i>`+ num  
  
}

showCashFun();

//show archiveData codding 

let showArchiveFun =()=>{
  
  let  num =0;

  cashierArcList.innerHTML = "" ; 
  allCashArchiveData.forEach((el, index)=>{

       num +=   Number(el.total)
       cashierArcList.innerHTML +=  `
                                    <tr>
                                    <td>${index+1}  </td>  
                                    <td>${el.name} </td> 
                                    <td> ${el.createdAt} </td>
                                    <td> ${el.total}</td>
                                    </tr>
                                    ` 
                                       })
    
 archiveTotal.innerHTML = `<i class="ri-money-rupee-circle-fill"></i>` + num  
  
}

showArchiveFun();



addCashBtn.onclick =()=>{
        if(sessionStorage.getItem("cashier_name")== null){
          allTabBtn[0].classList.add("active");
          allTabBtn[3].classList.remove("active");
          bookingPane.classList.add("active");
          cashierPane.classList.remove("active");
          
           addCashModelcloseBtn.click();

          
        }else{
        allCinput[2].value =  sessionStorage.getItem("cashier_name");
        
         
        }
       
}

cashierTabBtn.onclick =()=> {

         if(sessionStorage.getItem("cashier_name") == null){
                
            let name = window.prompt();

             if(name){
                   sessionStorage.setItem("cashier_name" , name) ;
             }

             else{
              allTabBtn[0].classList.add("active");
              cashierTabBtn.classList.remove("active") ;
              cashierPane.classList.remove("active")  ;
              bookingPane.classList.add("active") ;
             }

            }
         else{
            allCinput[2].value =  sessionStorage.getItem("cashier_name"); 
            showCashFun();
         }
        
        }  


        // cashier Form submit  Coding  
cashierForm.onsubmit=(e)=>{
  e.preventDefault();
  registrationFunc(null , allCinput, allCashierData, `${emails}` + "_allCashierData") ;
  showCashFun();
  cashierCloseBtn.click();
  cashierForm.reset();
}



closeCashBtn.onclick =()=>{

        if(allCashierData.length > 0 ){
                    
          let data ={
            name : sessionStorage.getItem("cashier_name"),
            total  : totalAmount.innerText,
            createdAt  : formateDate( new Date(), true)
          }


          allCashArchiveData.push(data) ;
          localStorage.removeItem(`${emails}` + "_allCashierData") ;
          allCashierData = [];
          localStorage.setItem(`${emails}` + "_allCashArchiveData", JSON.stringify(allCashArchiveData)) ;
          sessionStorage.removeItem("cashier_name") ;
          showCashFun();
        
          
        }
      else{
        swal("warning" ,"there is no data to Save or Close")
      }

}

archiveBtn.onclick=()=>{
  // alert();
  showArchiveFun();
}


// Print Coding  
for(let btn of allPrintBtn){
         btn.onclick=()=>{
          window.print();
         }
}

archivePrintBtn.onclick =()=>{
  cashierHidePrint.classList.add("d-none");
  window.print();

}

  isPrintCancel =  true ;
window.onafterprint =()=>{
  if(isPrintCancel){
  cashierHidePrint.classList.remove("d-none");
          
  }
  else{
  cashierHidePrint.classList.remove("d-none");
  }
}
