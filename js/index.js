import { getJoinedArray, getImgElement, doOnload } from './utils.js';

function getCardElement(perfil, configId) {
    const aElement = document.createElement('a');
    const liElement = document.createElement('li');
    const imgElement = getImgElement(perfil);
    const pElement = document.createElement('p');

    aElement.href = `perfil.html?lang=${configId}&id=${perfil.ci}`;
    liElement.className = 'card-content';
    pElement.textContent = perfil.nombre;

    liElement.appendChild(imgElement);
    liElement.appendChild(pElement);
    aElement.appendChild(liElement);
    return aElement;
}

function appendCardElements(container, elements, configId) {
    const fragmentContainer = document.createDocumentFragment();
    elements.forEach((element) => {
        const cardElement = getCardElement(element, configId);
        fragmentContainer.appendChild(cardElement);
    });
    container.appendChild(fragmentContainer);
}

document.addEventListener('DOMContentLoaded', function () {
    const runLogic = function (profileId, configId) {
        if (typeof perfil !== 'undefined' && typeof config !== 'undefined' && perfil.ci === profileId) {
            // HEAD
            const titleElement = document.getElementById('title');
            titleElement.textContent = getJoinedArray(config.sitio, ' ');

            // NAV
            const siteTitleElement = document.getElementById('siteTitle');
            siteTitleElement.innerHTML = `${config.sitio[0]} <span>${config.sitio[1]}</span> ${config.sitio[2]}`;

            const siteGreetingsElement = document.getElementById('siteGreetings');
            siteGreetingsElement.textContent = `${config.saludo}, ${perfiles[0].nombre}`;

            // SEARCH
            const searchProfile = function () {
                siteMessageElement.classList.add('hidden');
                siteMessageElement.classList.remove('show-flex');
                cardsContainerElement.classList.remove('hidden');

                const query = searchTextElement.value.trim().toLowerCase();
                cardsContainerElement.innerHTML = '';
                if (query === '') {
                    appendCardElements(cardsContainerElement, perfiles, configId);
                    return;
                }
                const filteredProfiles = perfiles.filter((perfil) => {
                    return perfil.nombre.toLowerCase().includes(query);
                });
                if (filteredProfiles.length > 0) {
                    appendCardElements(cardsContainerElement, filteredProfiles, configId);
                } else {
                    cardsContainerElement.classList.add('hidden');
                    siteMessageElement.classList.remove('hidden');
                    siteMessageElement.classList.add('show-flex');
                    siteMessageElement.textContent = `${config.no_encontrado}: ${query}`;
                }
            };
            const searchSubmitElement = document.getElementById('searchSubmit');
            searchSubmitElement.value = config.buscar;

            const searchTextElement = document.getElementById('searchText');
            searchTextElement.placeholder = `${config.nombre}...`;
            searchTextElement.addEventListener('input', searchProfile);

            const searchForm = searchSubmitElement.closest('form');
            searchForm.addEventListener('submit', (e) => e.preventDefault());

            // FOOTER
            const copyRightElement = document.getElementById('copyRight');
            copyRightElement.textContent = config.copyRight;

            // CONTAINER
            const cardsContainerElement = document.querySelector('.cards-container');
            appendCardElements(cardsContainerElement, perfiles, configId);

            const siteMessageElement = document.querySelector('.site-message');
        }
    };

    doOnload(runLogic);
});