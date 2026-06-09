window.addEventListener("DOMContentLoaded", () => {

    const websiteBtn =
    document.querySelector("#websiteBtn");
    
    const whatsappBtn =
    document.querySelector("#whatsappBtn");
    
    websiteBtn.addEventListener("click", () => {
    
    window.open(
    "https://www.imas.agency",
    "_blank"
    );
    
    });
    
    whatsappBtn.addEventListener("click", () => {
    
    window.open(
    "https://wa.me/524461846064",
    "_blank"
    );
    
    });
    
    });