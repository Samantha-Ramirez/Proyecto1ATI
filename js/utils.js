export function displayError(message) {
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
    return param || def;
}

export async function loadView(profileId, configId, loadFunction) {
    try {
        // Obtener datos del API
        const response = await fetch(`/ATI/index.py?id=${profileId}&lang=${configId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        // Manejar errores al obtener datos
        if (!response.ok) throw new Error("Error en la comunicación con el servidor");

        const data = await response.json();

        // Cargar vista respectiva
        loadFunction(data.perfil, data.config);
    } catch (error) {
        displayError(error.message);
    }
};