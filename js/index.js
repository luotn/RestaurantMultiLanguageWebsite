function translatePageElements() {
    const targetLang = localStorage.getItem('language')
    const langObj = JSON.parse(localStorage.getItem("langObj"))
    // extract target language translate of index from json
    const indexTranslates = langObj.pages.index[`${targetLang}`]

    // Page title and brand
    document.getElementById("title").innerHTML = indexTranslates.title
    document.getElementById("navbar-brand").innerHTML = indexTranslates.title

    // Index icons
    // Fixed icons
    let fixedIcons = 
    '        <!-- menu -->\n' +
    '        <a href="./menu.html" class="icon_group col">\n' +
    '          <img id="item-logo" src="./icons/menu.png">\n' +
    '          <p id="menu">' + indexTranslates.menu + '</p>\n' +
    '        </a>\n' +
    '        \n' +
    '        <!-- Tel -->\n' +
    '        <a href="tel:' + indexTranslates.number + '" class="icon_group col">\n' +
    '          <img id="item-logo" src="./icons/phone.png">\n' +
    '          <p id="call">' + indexTranslates.phone + '</p>\n' +
    '        </a>\n' +
    '        \n' +
    '        <!-- Map -->\n' +
    '        <a href="' + indexTranslates.map.link + '" class="icon_group col">\n' +
    '          <img id="item-logo" src="icons/map.png">\n' +
    '          <p id="map">' + indexTranslates.map.name + '</p>\n' +
    '        </a>\n'

    // socials
    let socialResult = ""
    for (let i = 0; i < indexTranslates.social.length; i++) {
        const social = indexTranslates.social[i]
        if(social.qr) {
            socialResult +=
            '          <!-- ' + social.platform + ' -->\n' +
            '          <div class="icon_group col" data-bs-toggle="modal" data-bs-target="#' + social.platform + 'modal">\n' +
            '              <img id="item-logo" src="' + social.icon + '">\n' + 
            '              <p id="' + social.platform + '">' + social.name + '</p>\n' +
            '          </div>\n' +
            '          <div class="modal fade" id="' + social.platform + 'modal" tabindex="-1" aria-labelledby="' + social.platform + 'ModalLabel" aria-hidden="true">\n' +
            '              <div class="modal-dialog modal-xl modal-dialog-centered">\n' +
            '                  <div class="modal-content">\n' +
            '                      <div class="modal-header">\n' +
            '                          <h5 class="modal-title" id="modalhint">' + indexTranslates.qrHint + '</h5>\n' +
            '                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>\n' +
            '                      </div>\n' +
            '                      <div class="modal-body">\n' +
            '                          <img src="' + social.link + '" style="height: 47vw;">\n' +
            '                      </div>\n' +
            '                  </div>\n' +
            '              </div>\n' +
            '          </div>\n'
        } else {
            socialResult +=
            '<!-- ' + social.platform + ' -->\n' +
            '<a href="' + social.link + '" class="icon_group col">\n' +
            '    <img id="item-logo" src="' + social.icon + '">\n' +
            '    <p id="' + social.platform + '">' + social.name + '</p>\n' +
            '</a>\n'
        }
    }

    document.getElementById("icon_group").innerHTML = fixedIcons + socialResult
}