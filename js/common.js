function init(page) {
    // Load lang.json
    fetch("./lang.json")
    .then(response => response.json())
    .then(langObj => {
        languages = langObj.languages
        if (page == 'index')
            pageTranslates = langObj.pages.index
        else if (page == 'menu')
            pageTranslates = langObj.pages.menu

        // Setup language code in local storage
        if(localStorage.getItem('language') == null) {
            const langNative = navigator.language;
            for(let i = 0; i < langObj.languages.length; i++) {
                let currentLang = langObj.languages[i]
                if(langNative.includes(currentLang)) {
                    localStorage.setItem("language", currentLang)
                    document.documentElement.setAttribute("lang", currentLang)
                    break
                }
            }
        }

        // Update page content using language object
        constructSelector(langObj, page)
    })
    .catch(function() {
        alert("Error while loading JSON file!")
    });
}

function constructSelector(langObj, page) {
    const targetLang = localStorage.getItem('language')
    const targetLangIndex = langObj.languages.indexOf(targetLang)
    // Text on language button
    document.getElementById("languageButtonText").innerHTML = langObj.languageTranslate[targetLangIndex]
    // Construct selector list
    let selector = "";
    for(let i = 0; i < langObj.languageDisplay.length; i++) {
        selector += 
        "          <li>\n" +
        "            <a class='dropdown-item' onclick=\"changeLanguage('" + page + "', '" + langObj.languages[i] + "')\">\n"
        if (targetLangIndex == i){
            // Checkmark
            selector +=
            '              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">\n' + 
            '                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>\n' + 
            '              </svg>\n'
        }
        selector +=
        "              " + langObj.languageDisplay[i] + "\n" + 
        "            </a>\n" + 
        "          </li>\n"
    }
    document.getElementById("languageSelector").innerHTML = selector
}

function changeLanguage(page, targetLang){
    alert("Changing page " + page + " to " + targetLang)
}

// function init(page){
//     // Contruct page from json


//     const defaultLang = localStorage.getItem('BrandLanguage');
//     if(defaultLang == null) {
//         const langNative = navigator.language;
//         if(/^zh\b/.test(langNative)) {
//             localStorage.setItem('BrandLanguage', 'cn');
//             document.documentElement.setAttribute('lang', navigator.language);
//         }
//         else {
//             localStorage.setItem('BrandLanguage', 'en');
//             document.documentElement.setAttribute('lang', navigator.language);
//         }
//     }
//     changeTo(localStorage.getItem('BrandLanguage'), page);
// }

// function changeLanguage(page)
// {
//     let lang = localStorage.getItem('BrandLanguage');
//     if(lang == 'en'){
//         localStorage.setItem('BrandLanguage', 'cn');
//         document.documentElement.setAttribute('lang', 'cn');
//     } else{
//         localStorage.setItem('BrandLanguage', 'en');
//         document.documentElement.setAttribute('lang', 'en');
//     }
//     changeTo(localStorage.getItem('BrandLanguage'), page);
// }

// function changeTo(lang, page)
// {
//     console.log("Changing to " + lang);
//     updateSelector(lang);
//     fetch("./js/lang.json")
//         .then(response => response.json())
//         .then(langObj => {
//             let target = langObj.pages;
//             if(page == 'index')
//                 target = target.index;
//             else if(page == 'menu')
//                 target = target.menu;

//             if(lang == 'cn')
//                 target = target.cn;
//             else if(lang == 'en')
//                 target = target.en;

//             for (let key in target) {
//                 if(target[`${key}`].name != undefined) {
//                     let type = target[`${key}`];
//                     document.getElementById(`${key}`).innerHTML = type.name;
//                     for(let cate in type.category) {
//                         let category = type.category[`${cate}`];
//                         document.getElementById(`${cate}`).innerHTML = category.name;
//                         document.getElementById(`${cate}` + '_menu').innerHTML = category.name;
//                         for(let item in category) {
//                             if(`${item}` != "name")
//                                 document.getElementById(`${item}`).innerHTML = `${category[item]}`;
//                         }
//                     }
//                 } else
//                     document.getElementById(`${key}`).innerHTML = `${target[key]}`;
//             }
//         });
// }

// function updateSelector(lang)
// {
//     document.getElementById("en").style.textDecoration = "inherit";
//     document.getElementById("cn").style.textDecoration = "inherit";
//     document.getElementById(lang).style.textDecoration = "underline";
// }