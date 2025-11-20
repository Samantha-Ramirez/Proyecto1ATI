function getJoinedArray(array, sep) {
    if(Array.isArray(array)) {
        array = array.join(sep);
    }
    return array;
}

function getCardElement(profile) {
    const liElement = document.createElement('li');
    const imgElement = getImgElement(profile);
    const pElement = document.createElement('p');
    liElement.className = 'card-content';
    pElement.textContent = profile.nombre;

    liElement.appendChild(imgElement);
    liElement.appendChild(pElement);
    return liElement;
}

function getImgElement(profile) {
    const imgElement = document.createElement('img');
    imgElement.className = 'img';
    imgElement.src = profile.imagen;
    if(profile.imagenGrande) {
        const imgContainer = document.createElement('picture');
        const sourceLgElement = document.createElement('source');
        const sourceSmElement = document.createElement('source');
        sourceLgElement.media = '(min-width:769px)';
        sourceLgElement.srcset = profile.imagenGrande;
        sourceSmElement.media = '(min-width:320px)';
        sourceSmElement.srcset = profile.imagen;

        imgContainer.appendChild(sourceLgElement);
        imgContainer.appendChild(sourceSmElement);
        imgContainer.appendChild(imgElement);
        return imgContainer;
    }
    return imgElement;
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

    // CONTAINER
    const cardsContainerElement = document.querySelector('.cards-container');
    perfiles.forEach(profile => {
        const cardElement = getCardElement(profile);
        cardsContainerElement.appendChild(cardElement);
    });
}