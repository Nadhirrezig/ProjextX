let barWidth = document.getElementById("sidebar");
let DocWidth = document.getElementsByTagName("body")[0];
let main = document.getElementsByTagName("main")[0];

// CONTROLLING THE SIDENAVBAR
function openNav() {
  
    if (barWidth.style.width === "" || barWidth.style.width === "0px") {
       
        barWidth.classList.add("show");
       
        DocWidth.style.marginLeft = "250px"; 
        main.style.filter = "blur(4px)";
        main.style.pointerEvents = "none"; 
        main.style.userSelect = "none";
        if (window.innerWidth <= 800) {
            document.getElementById("header").classList.add("hide-header");
        }
    } else {
        closeNav();
    }
}

function closeNav() {

    barWidth.classList.remove("show");
    main.style.userSelect = "auto"; 
    main.style.pointerEvents = "auto"; 
    DocWidth.style.marginLeft = "0px"; 
    main.style.filter = "none";
    if (window.innerWidth <= 800) {
        document.getElementById("header").classList.remove("hide-header");
    }
}
