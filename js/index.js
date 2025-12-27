import { getJoinedArray, getUrlParameter, loadView } from './utils.js';

function getImgElement(perfil) {
    const imgElement = document.createElement('img');
    imgElement.src = perfil.imagen;
    imgElement.fetchPriority = 'high';
    if (perfil.imagenGrande) {
        const imgContainer = document.createElement('picture');
        const sourceLgElement = document.createElement('source');
        const sourceSmElement = document.createElement('source');
        sourceLgElement.media = '(min-width:769px)';
        sourceLgElement.srcset = perfil.imagenGrande;
        sourceSmElement.media = '(min-width:320px)';
        sourceSmElement.srcset = perfil.imagen;

        imgContainer.appendChild(sourceLgElement);
        imgContainer.appendChild(sourceSmElement);
        imgContainer.appendChild(imgElement);
        return imgContainer;
    }
    return imgElement;
}

function getCardElement(perfil, configId) {
    const liElement = document.createElement('li');
    const imgElement = getImgElement(perfil);
    const pElement = document.createElement('p');

    liElement.onclick = () => loadView(perfil.ci, configId, loadProfileView);
    liElement.className = 'card-content';
    pElement.textContent = perfil.nombre;

    liElement.appendChild(imgElement);
    liElement.appendChild(pElement);
    return liElement;
}

function appendCardElements(container, elements, configId) {
    const fragmentContainer = document.createDocumentFragment();
    elements.forEach((element) => {
        const cardElement = getCardElement(element, configId);
        fragmentContainer.appendChild(cardElement);
    });
    container.innerHTML = '';
    container.appendChild(fragmentContainer);
}

async function loadProfileView(perfil, config) {
    // LISTVIEW, PROFILEVIEW
    const listView = document.getElementById('listView');
    const profileView = document.getElementById('profileView');

    // TEMPLATE
    const template = document.getElementById('profileTemplate');
    const clone = template.content.cloneNode(true);

    // CONTAINER
    const imgElement = clone.querySelector('.profile-img');
    const profileImg = getImgElement(perfil);
    imgElement.appendChild(profileImg);

    // CONTENT
    const nameElement = clone.querySelector('.profile-content-name');
    nameElement.textContent = perfil.nombre;

    const descriptionElement = clone.querySelector('.profile-content-description');
    descriptionElement.textContent = perfil.descripcion;

    // CONTENT DATA
    const dataIds = { color: 'color', book: 'libro', music: 'musica', videogames: 'video_juego', langs: 'lenguajes' };
    Object.entries(dataIds).forEach(([key, value]) => {
        const dataLabelElement = clone.querySelector(`#${key}`);
        const dataValueElement = dataLabelElement.nextElementSibling;
        dataLabelElement.textContent = `${config[value]}:`;
        dataValueElement.textContent = getJoinedArray(perfil[value], ', ');
    });

    // CONTENT CONTACT
    const contactElement = clone.querySelector('.profile-content-contact');
    const emailElement = document.createElement('a');
    emailElement.textContent = perfil.email;
    emailElement.href = `mailto:${perfil.email}`;
    contactElement.innerHTML = config.email.replace('[email]', emailElement.outerHTML);

    const backButtonElement = clone.querySelector('#backButton');
    backButtonElement.onclick = () => {
        profileView.classList.add('hidden');
        listView.classList.remove('hidden');
    };

    // Limpiar vista anterior e inyectar el nuevo perfil
    profileView.innerHTML = '';
    profileView.appendChild(clone);

    // Intercambiar pantallas
    listView.classList.add('hidden');
    profileView.classList.remove('hidden');
}

async function loadListView(perfil, config) {
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

document.addEventListener('DOMContentLoaded', function () {
    const profileId = getUrlParameter('id', '31307714');
    const configId = getUrlParameter('lang', 'ES');
    loadView(profileId, configId, loadListView);
});