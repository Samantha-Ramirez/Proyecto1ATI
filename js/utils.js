function displayError(message) {
    const errorContainer = document.createElement('div');
    errorContainer.className = 'site-error';
    errorContainer.textContent = message;
    document.body.innerHTML = errorContainer.outerHTML;
}

export function getJoinedArray(array, sep) {
    if (Array.isArray(array)) {
        array = array.join(sep);
    }
    return array;
}

export function getUrlParameter(name, def) {
    const param = new URLSearchParams(window.location.search).get(name);
    if (!param) {
        let url = window.location.href;
        if (url.indexOf('?') > -1) {
            url += `&${name}=${def}`;
        } else {
            url += `?${name}=${def}`;
        }
        window.location.href = url;
        return def;
    }
    return param;
}

export function getImgElement(perfil) {
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

export function doOnload(runLogic) {
    const profileId = getUrlParameter('id', '31307714');
    const configId = getUrlParameter('lang', 'ES');

    let errorOccurred = false;
    let loadedScripts = 0;
    const totalScripts = 2;

    const handleScriptError = function (event) {
        if (errorOccurred) return;
        errorOccurred = true;

        let errorMessage = 'Error';
        if (event.target === profileScriptElement) {
            errorMessage = `No se pudo encontrar el perfil: ${profileId}`;
        } else if (event.target === configScriptElement) {
            errorMessage = `No se pudo encontrar la configuración: ${configId}`;
        }

        displayError(errorMessage);
        profileScriptElement.onload = null;
        configScriptElement.onload = null;
        profileScriptElement.onerror = null;
        configScriptElement.onerror = null;
    };

    const handleScriptLoad = function () {
        if (errorOccurred) return;

        loadedScripts++;
        if (loadedScripts === totalScripts) {
            runLogic(profileId, configId);
        }
    };

    const profileScriptElement = document.createElement('script');
    profileScriptElement.src = `${profileId}/perfil.json`;
    profileScriptElement.type = 'text/javascript';
    profileScriptElement.onload = handleScriptLoad;
    profileScriptElement.onerror = handleScriptError;

    const configScriptElement = document.createElement('script');
    configScriptElement.src = `conf/config${configId}.json`;
    configScriptElement.type = 'text/javascript';
    configScriptElement.onload = handleScriptLoad;
    configScriptElement.onerror = handleScriptError;

    document.head.appendChild(profileScriptElement);
    document.head.appendChild(configScriptElement);
}
