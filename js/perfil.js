
import { getJoinedArray, getImgElement, doOnload } from './utils.js';

document.addEventListener('DOMContentLoaded', function() {
    const runLogic = function(profileId, configId) {
        if(typeof perfil !== 'undefined' && typeof config !== 'undefined' && perfil.ci === profileId) {
            // HEAD
            const titleElement = document.getElementById('title');
            titleElement.textContent = perfil.nombre;

            // CONTAINER
            const imgElement = document.querySelector('.perfil-img');
            const profileImg = getImgElement(perfiles.find(p => p.ci === profileId));
            imgElement.appendChild(profileImg);

            // CONTENT
            const nameElement = document.querySelector('.perfil-content-name');
            nameElement.textContent = perfil.nombre;

            const descriptionElement = document.querySelector('.perfil-content-description');
            descriptionElement.textContent = perfil.descripcion;

            // CONTENT DATA
            const dataIds = { 'color': 'color', 'book': 'libro', 'music': 'musica', 'videogames': 'video_juego', 'langs': 'lenguajes' };
            Object.entries(dataIds).forEach(([key, value]) => {
                const dataLabelElement = document.getElementById(key);
                const dataValueElement = dataLabelElement.nextElementSibling;
                dataLabelElement.textContent = config[value];
                dataValueElement.textContent = getJoinedArray(perfil[value], ', ');
            });

            // CONTENT CONTACT
            const contactElement = document.querySelector('.perfil-content-contact');
            const emailElement = document.createElement('a');
            emailElement.textContent = perfil.email;
            emailElement.href = `mailto:${perfil.email}`;
            contactElement.innerHTML = config.email.replace('[email]', emailElement.outerHTML);
        }
    };

    doOnload(runLogic);
});