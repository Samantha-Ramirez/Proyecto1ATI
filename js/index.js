import { getJoinedArray, getImgElement, doOnload } from './utils.js';

function getCardElement(perfil) {
    const aElement = document.createElement('a');
    const liElement = document.createElement('li');
    const imgElement = getImgElement(perfil);
    const pElement = document.createElement('p');
    aElement.href = `perfil.html?id=${perfil.ci}`;
    liElement.className = 'card-content';
    pElement.textContent = perfil.nombre;

    liElement.appendChild(imgElement);
    liElement.appendChild(pElement);
    aElement.appendChild(liElement);
    return aElement;
}

document.addEventListener('DOMContentLoaded', function() {
    const runLogic = function(profileId, configId) {
        if(typeof perfil !== 'undefined' && typeof config !== 'undefined' && perfil.ci === profileId) {
            // HEAD
            const titleElement = document.getElementById('title');
            titleElement.textContent = getJoinedArray(config.sitio, ' ');

            // NAV
            const siteTitleElement = document.getElementById('siteTitle');
            siteTitleElement. innerHTML = `${config.sitio[0]} <span>${config.sitio[1]}</span> ${config.sitio[2]}`;

            const siteGreetingsElement = document.getElementById('siteGreetings');
            siteGreetingsElement.textContent = `${config.saludo}, ${perfiles[0].nombre}`;

            const searchSubmitElement = document.getElementById('searchSubmit');
            searchSubmitElement.value = config.buscar;

            const searchTextElement = document.getElementById('searchText');
            searchTextElement.placeholder = `${config.nombre}...`;

            // FOOTER
            const copyRightElement = document.getElementById('copyRight');
            copyRightElement.textContent = config.copyRight;

            // CONTAINER
            const cardsContainerElement = document.querySelector('.cards-container');
            perfiles.forEach(perfil => {
                const cardElement = getCardElement(perfil);
                cardsContainerElement.appendChild(cardElement);
            });
        }
    };

    doOnload(runLogic);
});