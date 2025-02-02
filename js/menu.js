function loadMenu() {
    fetch("js/lang.json")
            .then(response => response.json())
            .then(langObj => {
                let menuObj = langObj.pages.menu.en;
                let result = "";
                let temp = "";
                for (let type in menuObj) {
                    let subMenuObj;
                    if(`${type}` == "food")
                        subMenuObj = menuObj.food.category;
                    else if(`${type}` == "drink")
                        subMenuObj = menuObj.drink.category;
                    else
                        continue;
                    for(let key in subMenuObj) {                        
                        let itemsObj = subMenuObj[`${key}`];
                        let cateName = itemsObj.name;
                        result += '<div class="menubreak" id="' + `${key}` + '_menu' + '">' + cateName + '</div>';
                        temp += '<li><a id="' + `${key}` + '" class="dropdown-item" href="#' + `${key}` + '_menu">'
                                + cateName + '</a></li>';
                        for(let item in itemsObj) {
                            if(`${item}` != "name")
                                result += 
                                '<div class="col">' +
                                    '<div class="card">' +
                                        '<a href="thumbnails/' + `${item}` +'.JPG">' +
                                            '<img src="thumbnails/' + `${item}` + '.JPG" class="card-img-top" alt="Image missing...">' +
                                            '<div class="card-body">' +
                                                '<h5 class="card-title" id="' + `${item}` + '">' + `${itemsObj[item]}` + '</h5>' +
                                            '</div>' +
                                        '</a>' +
                                    '</div>' +
                                '</div>';
                        }
                    }
                    if(`${type}` == "food")
                        document.getElementById("food_drop").innerHTML = temp;
                    else if(`${type}` == "drink")
                    document.getElementById("drink_drop").innerHTML = temp;
                    temp = "";
                }
                document.getElementById("album").innerHTML = result;
            });
    changeToDefaultLanguage('menu');
}