function changeToDefaultLanguage(page){
    const defaultLang = localStorage.getItem('BrandLanguage');
    if(defaultLang == null) {
        const langNative = navigator.language;
        if(/^zh\b/.test(langNative)) {
            localStorage.setItem('BrandLanguage', 'cn');
            document.documentElement.setAttribute('lang', navigator.language);
        }
        else {
            localStorage.setItem('BrandLanguage', 'en');
            document.documentElement.setAttribute('lang', navigator.language);
        }
    }
    changeTo(localStorage.getItem('BrandLanguage'), page);
}

function changeLanguage(page)
{
    let lang = localStorage.getItem('BrandLanguage');
    if(lang == 'en'){
        localStorage.setItem('BrandLanguage', 'cn');
        document.documentElement.setAttribute('lang', 'cn');
    } else{
        localStorage.setItem('BrandLanguage', 'en');
        document.documentElement.setAttribute('lang', 'en');
    }
    changeTo(localStorage.getItem('BrandLanguage'), page);
}

function changeTo(lang, page)
{
    console.log("Changing to " + lang);
    updateSelector(lang);
    fetch("js/lang.json")
        .then(response => response.json())
        .then(langObj => {
            let target = langObj.pages;
            if(page == 'index')
                target = target.index;
            else if(page == 'menu')
                target = target.menu;

            if(lang == 'cn')
                target = target.cn;
            else if(lang == 'en')
                target = target.en;

            for (let key in target) {
                if(target[`${key}`].name != undefined) {
                    let type = target[`${key}`];
                    document.getElementById(`${key}`).innerHTML = type.name;
                    for(let cate in type.category) {
                        let category = type.category[`${cate}`];
                        document.getElementById(`${cate}`).innerHTML = category.name;
                        document.getElementById(`${cate}` + '_menu').innerHTML = category.name;
                        for(let item in category) {
                            if(`${item}` != "name")
                                document.getElementById(`${item}`).innerHTML = `${category[item]}`;
                        }
                    }
                } else
                    document.getElementById(`${key}`).innerHTML = `${target[key]}`;
            }
        });
}

function updateSelector(lang)
{
    document.getElementById("en").style.textDecoration = "inherit";
    document.getElementById("cn").style.textDecoration = "inherit";
    document.getElementById(lang).style.textDecoration = "underline";
}