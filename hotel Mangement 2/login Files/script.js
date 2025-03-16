let select = (el)=> document.querySelector(el);

let allSignUser  =   [];
let signupForm   =   select(".signup-form");
let allSignInput =   signupForm.querySelectorAll("input");
let signBtn      =   signupForm.querySelector("button"); 
let loginForm    =   select(".login-form");
let loginInput   =   loginForm.querySelectorAll("input");
let loginBtn     =   loginForm.querySelector("button");



// get all singUp user Data and place in array 
 let getSignUser = localStorage.getItem("allSignUser");
  if(getSignUser !== null){
    allSignUser = JSON.parse(getSignUser);
  }

allSignInput[3].addEventListener("input", ()=>{
      if(allSignInput[3].value < 0){
        allSignInput[3].value = 0
      }
})

//  signup Coding 

signupForm.onsubmit =(e)=>{
    e.preventDefault();
     
    let iValue = true;
    for(let value of allSignInput){
        if(value.value == ""){
            iValue = false;
        }
    }


    if(iValue){
        let emailCheck =  allSignUser.find((el)=>{
            return   el.email ==  allSignInput[4].value;
   }) 
   if(emailCheck == undefined){

   
    let user = {};
    for(let input of allSignInput){
       user[input.name] = input.value
    }
    
    allSignUser.push(user);
    localStorage.setItem("allSignUser" , JSON.stringify(allSignUser));
    signupForm.reset()
    swal("success", "data registered successful" , "success" )
    
}
else{
    swal("email error" , `this mail ${allSignInput[4].value} allready Exists`, "warning")
}

}
else{
    swal("Input Error" , "please check all input Feild", "warning") ; 
}
    
}

// Login Coding


loginForm.onsubmit=(e)=>{

    e.preventDefault()
    
 let emailCheck =  allSignUser.find((el)=>{
             return   el.email ==  loginInput[0].value;
    })

    let passwordCheck ;
   
        emailCheck !== undefined ? passwordCheck = emailCheck.password.trim() :  passwordCheck

    loginBtn.innerText =  "Loging...."

    setTimeout(()=>{
        
        if(emailCheck !== undefined && passwordCheck == loginInput[1].value){
    
            emailCheck.password = null ;
            // set Temporarily  DATA in session Storage
              
          sessionStorage.setItem("UserData", JSON.stringify(emailCheck));
           window.location = "../profile Files/profile.html";
            loginForm.reset();
         loginBtn.innerText = "Login"

         }
         else{
            swal("input error" ,"plase input correct email & password" , "warning"   )
         }
         loginBtn.innerText = "Login"
    } ,2000)


    
}