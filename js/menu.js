function translatePageElements() {
    const targetLang = localStorage.getItem('language')
    const langObj = JSON.parse(localStorage.getItem("langObj"))

    // Get requested menu from URL query
    const searchParams = new URLSearchParams(window.location.search);
    let currentMenu = searchParams.get("menu")
    
    // extract target language translate of index from langObj
    let currentMenuTranslate;
    for (const [pageName, page] of Object.entries(langObj.pages)) {
        if(pageName == currentMenu) {
            currentMenuTranslate = page[`${targetLang}`]
        }
    }
    // Page title and brand
    document.getElementById("title").innerHTML = currentMenuTranslate.title
    document.getElementById("navbar-brand").innerHTML = currentMenuTranslate.title

    // Menu description
    document.getElementById("menu_description").innerHTML = currentMenuTranslate.description

    // Categories
    let categories = ""
    let album = ""
    for(const [category, categoryInfo] of Object.entries(currentMenuTranslate.category)) {
        categories += 
        '                    <a href="#' + category + '" class="breadcrumb-item">' + categoryInfo.name + '</a>\n'

        album +=
        '            <div id="' + category + '" class="category-container">\n' +
        '                    <!-- ' + category + ' menu break -->\n' +
        '                    <div class="category">\n' +
        '                        ' + categoryInfo.name + '<br>\n' +
        '                        <div class="category-description">' + categoryInfo.description + '</div>\n' +
        '                    </div>\n' +
        '            \n' +
        '                    <div class="container text-center" id="item-container">\n' +
        '                        <div class="row align-items-start">\n'

        for(let i = 0; i < categoryInfo.items.length; i++) {
            const currentItem = categoryInfo.items[i]
            album +=
            '                            <!-- ' + currentItem.name + ' -->\n' +
            '                            <div class="col-6 col-xxl-3 col-xl-4 menu-item">\n' +
            '                                <div class="card">\n' +
            '                                    <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#' + currentItem.name + '">\n' +
            '                                        <img src="./thumbnails/' + currentItem.name + '.JPG" class="card-img-top" alt="Image missing...">\n' +
            '                                        <div class="card-body">\n' +
            '                                            <h5 class="card-title" id="' + currentItem.name + '-title">' + currentItem.translate + ' - £' + currentItem.price + '</h5>\n' +
            '                                        </div>\n' +
            '                                    </button>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '                            <!-- ' + currentItem.name + ' description -->\n' + 
            '                            <div class="modal fade" id="' + currentItem.name + '" tabindex="-1" aria-labelledby="' + currentItem.name + 'ModalLabel" aria-hidden="true">\n' +
            '                                <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable modal-fullscreen-lg-down ">\n' +
            '                                    <div class="modal-content">\n' +
            '                                        <div class="modal-header">\n' +
            '                                            <h1 class="modal-title" id="' + currentItem.name + 'ModalLabel">' + currentItem.translate + ' - £' + currentItem.price + '</h1>\n' +
            '                                            <button type="button" class="btn-close close-button" data-bs-dismiss="modal" aria-label="Close"></button>\n' +
            '                                        </div>\n' +
            '                                        <div class="modal-body">\n' +
            '                                            <img src="./thumbnails/' + currentItem.name + '.JPG" class="card-img-top" alt="Image missing...">\n' +
            '                                            ' + currentItem.description + '\n' +
            '                                        </div>\n' +
            '                                        <div class="modal-footer">\n' +
            '                                            <button type="button" class="btn btn-secondary close-button" data-bs-dismiss="modal">Close</button>\n' +
            '                                        </div>\n' +
            '                                    </div>\n' +
            '                                </div>\n' +
            '                            </div>\n'
        }
        album +=
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n\n\n'
    }

    album += 
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n'


    document.getElementById("categories").innerHTML = categories
    document.getElementById("album").innerHTML = album
}