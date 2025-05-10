
const hideAllBtnTxt = "Hide All";
const showAllBtnTxt = "Show All";
const openRecentBtnTxt = "Recent Only";
const openSectionIcon = "▼";
const closedSectionIcon = "►"; // ◄

/* initial setup */
giveSectionHeadersIDs();
wrapSectionHeaders();
addRecentButton();
addHideAllButton();
addShowAllButton();
hideAllSections();
openFinalSection(); // pass "false" argument to disable

/* add eventListener to show/hide on each title */
for (let title of document.querySelectorAll(".title-wrapper")) {
    title.addEventListener("click", (event) => {
        let element = event.target;
        while (!element.classList.contains("title-wrapper")) {
            element = element.parentNode;
        }
        toggleHideSectionContent(element);
    });
}

/* functions below */

function giveSectionHeadersIDs() {
    let sectionTitles = document.querySelectorAll("section h2,section h3,section h4,section h5");
    let usedIDs = [];
    for (let title of sectionTitles) {
        let id = title.innerText.trim().toLowerCase().replaceAll(" ", "-");
        while (usedIDs.includes(id)) {
            id += Math.floor(Math.random() * 10);
        }
        title.setAttribute("id", id);
        usedIDs.push(id);
    }
}

function makeHeaderLinksFromIDs() {
    let sectionTitles = document.querySelectorAll("section h2,section h3,section h4,section h5");
    let ul = document.createElement("ul");
    ul.setAttribute("id", "foldables-navigation");

    sectionTitles.forEach((el) => {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.setAttribute("href", `#${el.getAttribute("id")}`);
        a.innerText = el.innerText;
        li.appendChild(a);
        ul.appendChild(li);
    });

    let fold = document.getElementById("foldables");
    fold.insertBefore(ul, fold.firstChild);
}

function wrapSectionHeaders() {
    let sectionTitles = document.querySelectorAll("section>h2,section>h3,section>h4");
    for (let title of sectionTitles) {
        let wrap = document.createElement("div");
        wrap.classList.add("title-wrapper");
        wrap.style.cursor = "pointer";
        wrap.style.display = "flex";
        wrap.style.alignContent = "center";
        wrap.style.justifyContent = "flex-start";

        let arrow = document.createElement("span");
        arrow.classList.add("title-arrow");
        arrow.style.userSelect = "none";
        arrow.innerText = openSectionIcon;

        title.parentNode.insertBefore(wrap, title);
        wrap.appendChild(arrow);
        wrap.appendChild(title);
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
    } else {
        arrow.innerText = openSectionIcon;
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
    });
}

function showAllSections() {
    setSectionDisplay("");
    Array.from(document.querySelectorAll(".title-arrow")).map((arrow) => {
        arrow.innerText = openSectionIcon;
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

function addRecentButton() {
    let btn = document.createElement("button");
    btn.setAttribute("id", "recent-btn");
    btn.innerText = openRecentBtnTxt;
    btn.addEventListener("click", () => {
        hideAllSections();
        openFinalSection();
    });
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