function getJoinedArray(array, sep) {
    if(Array.isArray(array)) {
        array = array.join(sep);
    }
    return array;
}

window.onload = function() {
    // HEAD
    const titleElement = document.getElementById('title');
    titleElement.textContent = getJoinedArray(config.sitio, ' ');

    // NAV
    const siteTitleElement = document.getElementById('siteTitle');
    siteTitleElement. innerHTML = `${config.sitio[0]} <span>${config.sitio[1]}</span> ${config.sitio[2]}`;

    const siteGreetingsElement = document.getElementById('siteGreetings');
    siteGreetingsElement.textContent = config.saludo + ', ' + perfiles[0].nombre;

    const searchSubmitElement = document.getElementById('searchSubmit');
    searchSubmitElement.value = config.buscar;

    const searchTextElement = document.getElementById('searchText');
    searchTextElement.placeholder = config.nombre + '...';

    // FOOTER
    const copyRightElement = document.getElementById('copyRight');
    copyRightElement.textContent = config.copyRight;
}