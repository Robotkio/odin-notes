
const hideAllBtnTxt = "Hide All";
const showAllBtnTxt = "Show All";
const openRecentBtnTxt = "Open Recent";
const openSectionIcon = "▼";
const closedSectionIcon = "◄";

/* initial setup */
wrapSectionHeaders();
addHideAllButton();
addShowAllButton();
hideAllSections();
/* This opens the lowest section of notes automatically on page 
   load. I use this so I can start with everything but the most 
   recent set of notes minimized. Either remove it or put 
   "false" as an argument to stop it. */
openFinalSection();

for (let title of document.querySelectorAll(".title-wrapper")) {
    title.addEventListener("click", (event) => {
        let element = event.target;
        while (!element.classList.contains("title-wrapper")) {
            element = element.parentNode;
        }
        toggleHideSectionContent(element);
    });
}

function wrapSectionHeaders() {
    let sectionTitles = document.querySelectorAll("section>h2,section>h3,section>h4");
    for (let title of sectionTitles) {
        let wrap = document.createElement("div");
        wrap.classList.add("title-wrapper");

        let arrow = document.createElement("span");
        arrow.classList.add("title-arrow");
        arrow.innerText = openSectionIcon;

        title.parentNode.insertBefore(wrap, title);
        wrap.appendChild(title);
        wrap.appendChild(arrow);
    }
}

function toggleHideSectionContent(el) {
    toggleTitleSectionIcon(el);
    while (el = el.nextSibling) {
        if (el.nodeName != "#text") {
            el.style.display = el.style.display == "" ? "none" : "" ;
        }
    }
}

function toggleTitleSectionIcon(el) {
    let arrow = el.querySelector("span");
    if (arrow.innerText == openSectionIcon) {
        arrow.innerText = closedSectionIcon;
        /* this helps align the ▼ and ◄ better visually */
        arrow.style.position = "relative";
        arrow.style.left = "-2px";
        arrow.style.top = "-1px";
    } else {
        arrow.innerText = openSectionIcon;
        /* this helps align the ▼ and ◄ better visually */
        arrow.style.position = "";
        arrow.style.left = "";
        arrow.style.top = "";
    }
}

function setSectionDisplay(setting = "") {
    for (let section of document.querySelectorAll(".title-wrapper")) {
        while (section = section.nextSibling) {
            if (section.nodeName != "#text") {
                section.style.display = setting;
            }
        }
    }
}

function hideAllSections() {
    setSectionDisplay("none");
    Array.from(document.querySelectorAll(".title-arrow")).map((arrow) => {
        arrow.innerText = closedSectionIcon;
        /* this helps align the ▼ and ◄ better visually */
        arrow.style.position = "relative";
        arrow.style.left = "-2px";
        arrow.style.top = "-1px";
    });
}

function showAllSections() {
    setSectionDisplay("");
    Array.from(document.querySelectorAll(".title-arrow")).map((arrow) => {
        arrow.innerText = openSectionIcon;
        /* this helps align the ▼ and ◄ better visually */
        arrow.style.position = "";
        arrow.style.left = "";
        arrow.style.top = "";
    });
}

function addHideAllButton() {
    let btn = document.createElement("button");
    btn.setAttribute("id", "hide-all-btn");
    btn.innerText = hideAllBtnTxt;
    btn.addEventListener("click", hideAllSections);
    let fold = document.getElementById("foldables");
    fold.insertBefore(btn, fold.firstChild);
}

function addShowAllButton() {
    let btn = document.createElement("button");
    btn.setAttribute("id", "show-all-btn");
    btn.innerText = showAllBtnTxt;
    btn.addEventListener("click", showAllSections);
    let fold = document.getElementById("foldables");
    fold.insertBefore(btn, fold.firstChild);
}

function openFinalSection(execute = true) {
    if (!execute) { return; }
    // find last section title
    let lastSectionTitle = Array.from(document.querySelectorAll(".title-wrapper")).pop();
    // show last section and each of its parents
    while (lastSectionTitle.parentElement.nodeName == "SECTION") {
        toggleHideSectionContent(lastSectionTitle.parentElement.querySelector(".title-wrapper"));
        lastSectionTitle = lastSectionTitle.parentElement;
    }
}