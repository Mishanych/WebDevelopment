

//region third + fourth tasks

if (localStorage.length > 0){
    let id = localStorage.getItem('id');

    getContentParameters(id).then(() => {
        console.log('Async function |getContentParameters| works correctly');
    }).catch(error => {
        console.log('Error executing the async function |getContentParameters|' + error);
    });
}


function convertStringToStringArray(contentsOfTabsString){
    return contentsOfTabsString.split(/ +/)
}

async function getContentParameters(id){
    let url = 'https://localhost:5001/api/parameters/' + id;
    let response = await fetch(url);

    if (response.ok) {
        let contentParameters = await response.json();
        //addTabsToTheMainBlock(contentParameters.numOfTabs, contentParameters.nameOfTabs, contentParameters.contentOfTabs)
        addTabsToTheMainBlock(contentParameters.numOfTabs, contentParameters.nameOfTabs, contentParameters.contentOfTabs)
    } else {
        alert("HTTP ERROR: " + response.status);
    }
}

function addTabsToTheMainBlock(numOfTabs, nameOfTabs, contentsOfTabs){
    let contentsOfTabsArr = convertStringToStringArray(contentsOfTabs);

    let tabsWrapper2 = document.createElement('ul');
    tabsWrapper2.className = 'tabsWrapper';
    for (let i = 0; i < numOfTabs; i++){
        let tab2 = document.createElement('li');
        //TODO: CSS CLASSNAME

        let linkTab2 = document.createElement('a');
        //TODO: CSS CLASSNAME
        linkTab2.href = 'https://www.youtube.com/watch?v=ZF8DFAFOIcU';
        linkTab2.target = '_blank';
        linkTab2.text = contentsOfTabsArr[i];
        tab2.appendChild(linkTab2);

        tabsWrapper2.appendChild(tab2);
    }
    document.getElementById('box3').appendChild(tabsWrapper2);
}

function createTabs(numOfTabs, namesOfTabs, contentsOfTabs){
    let mainDiv = document.createElement("div");
    mainDiv.className = "tabs";
    for (let i = 0; i < numOfTabs; i++) {
        let tabName = document.createElement("div");
        if(i === 0) {
            tabName.className = "tab active";
        }
        else{
            tabName.className = "tab";
        }
        tabName.dataset.target = namesOfTabs[i];
        tabName.innerHTML = namesOfTabs[i];


        mainDiv.appendChild(tabName);
    }
    document.getElementById("box3").appendChild(mainDiv);

    let tabContentContainer = document.createElement("div");
    tabContentContainer.id = "panels";
    for (let i = 0; i < numOfTabs; i++) {
        let tabContent = document.createElement("div");
        if(i === 0){
            tabContent.className = namesOfTabs[i] + " panel active";
        }
        else{
            tabContent.className = namesOfTabs[i] + " panel";
        }
        tabContent.innerHTML = contentsOfTabs[i];
        tabContentContainer.appendChild(tabContent);
    }
    document.getElementById("box3").appendChild(tabContentContainer);





    const tabs = document.querySelectorAll(".tabs");
    const tab = document.querySelectorAll(".tab");
    const panel = document.querySelectorAll(".panel");

    function onTabClick(event) {
        // deactivate existing active tabs and panel
        for (let i = 0; i < tab.length; i++) {
            tab[i].classList.remove("active");
        }

        for (let i = 0; i < panel.length; i++) {
            panel[i].classList.remove("active");
        }


        // activate new tabs and panel
        event.target.classList.add('active');
        let classString = event.target.getAttribute('data-target');
        console.log(classString);
        document.getElementById('panels').getElementsByClassName(classString)[0].classList.add("active");

    }
    for (let i = 0; i < tab.length; i++) {
        tab[i].addEventListener("click", onTabClick, false);
    }}
//endregion