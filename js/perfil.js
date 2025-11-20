
function getJoinedArray(array, sep) {
    if(Array.isArray(array)) {
        array = array.join(sep);
    }
    return array;
}

window.onload = function() {
    // HEAD
    const titleElement = document.getElementById('title');
    titleElement.textContent = perfil.nombre;

    // CONTENT
    const nameElement = document.querySelector('.perfil-content-name');
    nameElement.textContent = perfil.nombre;

    const descriptionElement = document.querySelector('.perfil-content-description');
    descriptionElement.textContent = perfil.descripcion;

    // CONTENT DATA
    const dataIds = ['color', 'book', 'music', 'videogames', 'langs'];
    const valueIds = ['color', 'libro', 'musica', 'video_juego', 'lenguajes'];
    for(let id = 0; id < dataIds.length; id++) {
        const dataLabelElement = document.getElementById(dataIds[id]);
        const dataValueElement = dataLabelElement.nextElementSibling;
        dataLabelElement.textContent = config[valueIds[id]];
        dataValueElement.textContent = getJoinedArray(perfil[valueIds[id]], ', ');
    }

    // CONTENT CONTACT
    const contactElement = document.querySelector('.perfil-content-contact');
    const emailElement = document.createElement('a');
    emailElement.textContent = perfil.email;
    emailElement.href = 'mailto:' + perfil.email;
    contactElement.innerHTML = config.email.replace('[email]', emailElement.outerHTML);
}