function init(page) {
    // Load lang.json
    fetch("./lang.json")
    .then(response => response.json())
    .then(langObj => {
        // Push langObj into localstorage
        localStorage.setItem("langObj", JSON.stringify(langObj))
        console.log("To update language file, refresh this page.")

        // Setup language code in local storage
        if(localStorage.getItem('language') == null) {
            const langNative = navigator.language;
            for(let i = 0; i < langObj.languages.length; i++) {
                currentLang = langObj.languages[i]
                if(langNative.includes(currentLang)) {
                    localStorage.setItem("language", currentLang)
                    break
                }
            }
        }

        // Construct page content using language object
        translateCommonElements(page)
        translatePageElements()
        changeLanguage(localStorage.getItem("language"))
    })
    .catch(function(e) {
        console.error(e)
    });
}

const activeLanguageSvg = 
    '              <svg xmlns="http://www.w3.org/2000/svg" id="activeLanguage" width="30" height="30" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">\n' +            '                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>\n' + 
    '              </svg>\n'

function translateCommonElements() {
    const langObj = JSON.parse(localStorage.getItem("langObj"))
    const targetLang = localStorage.getItem('language')
    const targetLangIndex = langObj.languages.indexOf(targetLang)
    // Text on language button
    document.getElementById("languageButtonText").innerHTML = langObj.languageTranslate[targetLangIndex]
    // Construct selector list
    let selector = "";
    for(let i = 0; i < langObj.languageDisplay.length; i++) {
        selector += 
        "          <li>\n" +
        "            <a class='dropdown-item' onclick=\"changeLanguage('" + langObj.languages[i] + "')\">\n"
        if (targetLangIndex == i){
            // Checkmark
            selector += activeLanguageSvg
        }
        selector +=
        "              " + langObj.languageDisplay[i] + "\n" + 
        "            </a>\n" + 
        "          </li>\n"
    }
    document.getElementById("languageSelector").innerHTML = selector

    // lang attribute of this html file
    document.documentElement.setAttribute("lang", langObj.languages[targetLangIndex])
}

function changeLanguage(targetLang){
    if(targetLang != localStorage.getItem("language")) {
        console.log("Changing site language to " + targetLang)
        const langObj = JSON.parse(localStorage.getItem("langObj"))
        localStorage.setItem('language', targetLang)
        translateCommonElements(langObj)
        translatePageElements()
    }
}