function makeSectionsButtons() 
{
    let sections = document.getElementsByClassName("section");

    for (let section in sections) {
        section.onClick = function() {
            console.log(this);
        };
    }
}

function toggleSectionVisibility() {
       this.style
}

makeSectionsButtons();