export function displayError(message) {
    const errorContainer = document.createElement('div');
    errorContainer.className = 'site-error';
    errorContainer.textContent = `Error: ${message}`;
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
        const response = await fetch(`index.py?id=${profileId}&lang=${configId}`);

        // Manejar errores al obtener datos
        if (!response.ok) throw new Error("No se pudo inicializar la configuración del sitio.");

        // Cargar vista respectiva
        const { perfil, config } = await response.json();
        loadFunction(perfil, config);
    } catch (error) {
        displayError(error.message);
    }
};