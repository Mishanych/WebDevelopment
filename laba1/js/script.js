//---------------------------TASK_1---------------------------------

let div_1 = document.getElementById("box1");
let div_6 = document.getElementById("box6");


div_1.onclick = function(event){
    Swapper();
}
div_6.onclick = function(event){
    Swapper();
}

function Swapper()
{
    let box1_container = document.getElementById("box1");
    let box1_content = document.getElementById("box1").innerHTML;
    let box6_container = document.getElementById("box6");
    let box6_content = document.getElementById("box6").innerHTML;
    let temp = box1_content;
    box1_container.innerHTML=box6_content;
    box6_container.innerHTML=temp;
}


//---------------------------TASK_2---------------------------------


function CountArea()
{
    let d1 = 10;
    let d2 = 4;
    let res = (d1 * d2) / 2;
    document.getElementById("resultOfArea").value = res.toString();
}


//---------------------------Task_3---------------------------------

function getCookie(name) {
    let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
    // возвращает куки с указанным name, или undefined, если ничего не найдено
}

function setCookie(name, value, options = {}) {
    // options = { path: '/' };

    if (options.expires instanceof Date)
    {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options)
    {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true)
        {
            updatedCookie += "=" + optionValue;
        }
    }
    document.cookie = updatedCookie;
}

function deleteCookie(name) {
    setCookie(name, "", {
        'max-age': 0
    });
}

function CheckSidesOfTriangle(){
    let side1 = document.getElementById("sideInput1").value;
    let side2 = document.getElementById("sideInput2").value;
    let side3 = document.getElementById("sideInput3").value;

    let isTrianglePossible = false;

    if((side1 + side2 > side3) && (side1 + side3 > side2) && (side2 + side3 > side1)
        && side1 > 0 && side2 > 0 && side3 > 0)
    {
        isTrianglePossible = true;
    }
    else
    {
        isTrianglePossible = false;
    }
    let result = "Triangle is possible: " + isTrianglePossible;
    alert(result);
    setCookie("triangleIsPossible", isTrianglePossible);
    console.log(document.cookie);
}

window.onload = afterReload();

function afterReload() {
    let result = confirm("The data in cookies: " + document.cookie + "\nClick OK to delete cookies.");
    if(result)
    {
        deleteCookie("triangleIsPossible");
        document.getElementById("sideInput1").style.display = "none";
        document.getElementById("sideInput2").style.display = "none";
        document.getElementById("sideInput3").style.display = "none";
        document.getElementById("checkButton").style.display = "none";

        let res = confirm("Cookies deleted.\nPress OK to reload page and start again.");
        if(res)
        {
            window.location.reload();
        }
    }
}


//---------------------------Task_4---------------------------------

var radios = document.getElementsByName("save_option");
StartStyle();

function changeToItalic(element) {
    element.style.fontStyle = "italic";
}

function changeToNormal(element) {
    element.style.fontStyle = "normal";
}
function Save()
{
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            if(radios[i].value=='1')
            {
                localStorage.setItem('test', radios[i].value.toString());
            }
            else if(radios[i].value=='0'){
                delete localStorage.test;
            }
            else{return;}
        }
    }
}

function StartStyle()
{
    if(localStorage.test == '1'){
        changeToItalic(document.getElementById("box2"));
    }
    else {
        changeToNormal(document.getElementById("box2"));
    }
}


//---------------------------Task_5---------------------------------

var list = document.getElementById("list");
var counter = 1;
var listOfElements = [];
StartList();

function AddElementToList(){

    let element = document.getElementById("list_input").value;

    if(isEven((counter))) {
        listOfElements.push("<li style=color:white;background:black;>" + element + "</li>");
    }
    else
    {
        listOfElements.push("<li style=color:black;background:white;>" + element + "</li>");
    }

    list.innerHTML = listOfElements.join('');

    counter += 1;
    document.getElementById("list_input").value = "";
}

function isEven(value) {
    if (value%2 == 0)
        return true;
    else
        return false;
}

function SaveList(){
    localStorage.setItem("list", JSON.stringify(listOfElements));
    localStorage.setItem("counter", counter);
}
function DeleteList(){
    delete localStorage.list;
    list.innerHTML = null;
}
function StartList()
{
    var storedList = JSON.parse(localStorage.getItem("list"));
    list.innerHTML = storedList.join('');
    if(storedList != null){
        listOfElements = storedList;
        counter = localStorage.getItem("counter");
    }
}


//lab 3

