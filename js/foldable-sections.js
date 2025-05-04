
const hideAllBtnTxt = "Hide All";
const showAllBtnTxt = "Show All";
const openSectionIcon = "▼";
const closedSectionIcon = "◄";

/* initial setup */
wrapTitles();
addHideAllButton();
addShowAllButton();
hideAllSections(); // hides everything on page open

for (let title of document.querySelectorAll(".title-wrapper")) {
    title.addEventListener("click", (event) => {
        let element = event.target;
        while (!element.classList.contains("title-wrapper")) {
            element = element.parentNode;
        }
        toggleHideSectionContent(element);
    });
}

function wrapTitles() {
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
        arrow.style.position = "relative";
        arrow.style.left = "-2px";
        arrow.style.top = "-1px";
    } else {
        arrow.innerText = openSectionIcon;
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
        arrow.style.position = "relative";
        arrow.style.left = "-2px";
        arrow.style.top = "-1px";
    });
}

function showAllSections() {
    setSectionDisplay("");
    Array.from(document.querySelectorAll(".title-arrow")).map((arrow) => {
        arrow.innerText = openSectionIcon;
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