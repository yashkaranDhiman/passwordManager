let signupBtn = document.getElementById("signup");
let loginBtn = document.getElementById("login");
let addBtn = document.getElementById("add-pass");
let getBtn = document.getElementById("get-btn");
let signupModel = document.getElementById("signup-model");
let loginModel = document.getElementById("login-model");
let addModel = document.querySelector("#add-model form");
let pinModel = document.querySelector("#pin-model form");
let csrftoken = document.querySelector('[name=csrfmiddlewaretoken]');
let close = document.querySelectorAll(".close");
let Page1 = document.getElementById("page1");
let nav = document.querySelector("nav");
let pin = document.getElementById("pin");
let getpass = document.getElementById("get-pass");
let confpin= document.getElementById("confpin");

function makeBlur(){
    Page1.classList.add('blur');
    nav.classList.add('blur');
}
function removeBlur(){
    Page1.classList.remove('blur');
    nav.classList.remove('blur');
}
function comeAndGo(){
    signupBtn.addEventListener("click",()=>{
        makeBlur()
        signupModel.style.top = "0%";
    })
    loginBtn.addEventListener("click",()=>{
        makeBlur()
        loginModel.style.top = "0%";
    })


    close.forEach((e) => {
        e.addEventListener("click",()=>{
            removeBlur()
            signupModel.style.top = "-765px";
            loginModel.style.top = "-765px";
            addModel.style.top = "-765px";
        })
    });
}
function comeAndGo2(){
    addBtn.addEventListener("click",()=>{
        makeBlur()
        addModel.style.top = "180px";
    })
    close.forEach((e) => {
        e.addEventListener("click",()=>{
            removeBlur()
            addModel.style.top = "-765px";
        })
    });
}

function getPass(){
    getpass.addEventListener("click", () => {
        let hidpin = document.getElementById("hidpin").value;
        pinModel.style.top = "0%";
        makeBlur()
        pinModel.addEventListener("submit",(e)=>{
            e.preventDefault();
            let theinput = document.getElementById("confpin").value;
            sessionStorage.setItem("theinput",theinput);
            let getPin = sessionStorage.getItem("theinput");
            if(getPin == hidpin){
                document.querySelectorAll(".copy-button").forEach(e=>{
                    e.style.display = "block";
                    e.addEventListener("click",()=>{
                        e.innerText = "Copied !"
                    })
                })
                document.querySelectorAll(".change").forEach(e=>{
                e.style.display = "none";
                })
                document.querySelectorAll(".hid").forEach(e=>{
                    e.style.display = "block"; 
                })
                theinput = ""
            }
            else{
                theinput = ""
            }
            removeBlur()
            pinModel.style.top = "-765px";
        })
    }); 



    close.forEach((e) => {
        e.addEventListener("click", () => {
            removeBlur();
            pinModel.style.top = "-765px";
        });
    });

}

function flashMesssage(){
    let msggcontainer = document.querySelector(".messages")
    if(msggcontainer){
        setTimeout(() => {
            msggcontainer.style.display = "none" 
        }, 3000);
    }
}

function copyToClipboard(password) {
    var tempInput = document.createElement('input');
    tempInput.value = password;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
}

flashMesssage()

makeBlur()
removeBlur()

if (signupBtn){
    comeAndGo()
}
comeAndGo2()

getPass()