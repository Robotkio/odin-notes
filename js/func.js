const sections = document.querySelectorAll(".section");
console.log(sections);

sections.forEach((section) => {
    const title = section.getElementsByClassName("section-title");
    const content = section.getElementsByClassName("section-content");
    const arrow = title[0].getElementsByClassName("section-arrow");

    title[0].addEventListener("click", (e) => {
        content[0].classList.toggle("hide");
        if (content[0].classList.contains("hide")) {
            arrow[0].innerHTML = "&#9668;";
        } else {
            arrow[0].innerHTML = "&#9660;";
        }
    });
});