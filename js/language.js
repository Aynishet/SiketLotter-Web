/* =====================================
   SIKET EKUB
   English / Amharic Language Switcher
===================================== */


let currentLanguage = "en";


const langButton =
document.getElementById("langBtn");



/* ===============================
   LOAD LANGUAGE FILE
================================ */


async function loadLanguage(language){


try{


const response =
await fetch(
`lang/${language}.json`
);


const translations =
await response.json();



document
.querySelectorAll("[data-lang]")
.forEach(element=>{


const key =
element.getAttribute(
"data-lang"
);



if(translations[key]){


element.innerHTML =
translations[key];


}



});



currentLanguage = language;



localStorage.setItem(
"siket_language",
language
);



}

catch(error){


console.error(
"Language loading error:",
error
);


}


}



/* ===============================
   SWITCH LANGUAGE
================================ */


if(langButton){


langButton.addEventListener(
"click",
()=>{


if(currentLanguage==="en"){


loadLanguage("am");

langButton.innerHTML =
"🇪🇹 አማ";


}

else{


loadLanguage("en");

langButton.innerHTML =
"🇬🇧 EN";


}



});


}



/* ===============================
   REMEMBER LANGUAGE
================================ */


document.addEventListener(
"DOMContentLoaded",
()=>{


const savedLanguage =
localStorage.getItem(
"siket_language"
);



if(savedLanguage){


currentLanguage =
savedLanguage;


loadLanguage(
savedLanguage
);


if(langButton){


langButton.innerHTML =
savedLanguage==="am"
?
"🇪🇹 አማ"
:
"🇬🇧 EN";


}


}



});