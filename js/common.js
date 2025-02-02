function changeToDefaultLanguage(page){
    const defaultLang = localStorage.getItem('ShamrockLanguage');
    if(defaultLang == null) {
        const langNative = navigator.language;
        if(/^zh\b/.test(langNative)) {
            localStorage.setItem('ShamrockLanguage', 'cn');
        }
        else {
            localStorage.setItem('ShamrockLanguage', 'en');
        }
    }
    changeTo(localStorage.getItem('ShamrockLanguage'), page);
}

function changeLanguage(page)
{
    let lang = localStorage.getItem('ShamrockLanguage');
    if(lang == 'en'){
        localStorage.setItem('ShamrockLanguage', 'cn');
    } else{
        localStorage.setItem('ShamrockLanguage', 'en');
    }
    changeTo(localStorage.getItem('ShamrockLanguage'), page);
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

function getMap()
{
    let ua = "" + navigator.userAgent;
    if(ua.indexOf("Android") != -1 || ua.indexOf("Windows") != -1)
        window.open("https://uri.amap.com/marker?poiid=B0HU35YUSR&src=www.shamrock.cafe:8082&callnative=1");
    else
        window.open("https://maps.apple.com/?address=%E4%B8%AD%E5%9B%BD%E8%BE%BD%E5%AE%81%E7%9C%81%E5%A4%A7%E8%BF%9E%E5%B8%82%E6%B2%99%E6%B2%B3%E5%8F%A3%E5%8C%BA%E5%8D%97%E5%85%B4%E8%A1%97%E5%85%B0%E4%BA%AD%E5%9B%AD30%E5%8F%B72%E5%8D%95%E5%85%831-2&auid=1118557209035115&ll=38.896883,121.575609&lsp=57879&q=%E4%B8%89%E5%8F%B6%E8%8D%89%E7%88%B1%E5%B0%94%E5%85%B0%E5%92%96%E5%95%A1%E5%90%A7&_ext=ChkKBAgEEAQKBAgFEAMKBQgGEIgCCgQIGxADEiQpgKwht6VxQ0AxJBei4xZkXkA5IKqvaPRzQ0BBHg2hqpZlXkA%3D&t=m");
}