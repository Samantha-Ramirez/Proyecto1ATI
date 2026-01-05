import json
import os
from urllib.parse import parse_qs
from beaker.middleware import SessionMiddleware

# Configuración de la sesión
session_opts = {
    'session.type': 'file',
    'session.data_dir': '/tmp/cache/data',
    'session.lock_dir': '/tmp/cache/lock',
    'session.cookie_expires': True,
    'session.auto': True
}

def application(environ, start_response):
    base_path = "/var/www/html/ATI"
    # Obtener la sesión del entorno
    session = environ['beaker.session']
    
    params = parse_qs(environ.get('QUERY_STRING', ''))
    profile_id = params.get('id', [None])[0]

    config_id = params.get('lang', [None])[0]
    # Si el usuario cambia el idioma, guardar en la sesión
    if config_id:
        session['lang'] = config_id
        session.save()
    # Si no viene en la URL, intentar recuperarlo de la sesión
    else:
        config_id = session.get('lang', 'ES')

    accept_header = environ.get('HTTP_ACCEPT', '')

    # Caso 1: Cargar HTML inicial
    if 'text/html' in accept_header or not profile_id:
        try:
            with open(os.path.join(base_path, 'index.html'), 'rb') as f:
                content = f.read()

            start_response('200 OK', [('Content-Type', 'text/html; charset=utf-8')])
            return [content]

        except FileNotFoundError:
            start_response('404 Not Found', [('Content-Type', 'text/plain')])
            return [b'Archivo index.html no encontrado']

    # Caso 2: Retornar datos en formato JSON
    try:
        # Intentar cargar el perfil
        with open(f'{base_path}/{profile_id}/perfil.json', 'r', encoding='utf-8') as f:
            perfil = json.load(f)
        # Intentar cargar la configuración
        with open(f'{base_path}/conf/config{config_id}.json', 'r', encoding='utf-8') as f:
            config = json.load(f)

        # Crear objeto JSON
        response_data = {
            'perfil': perfil,
            'config': config,
            'session_lang': config_id
        }
        start_response('200 OK', [('Content-Type', 'application/json; charset=utf-8')])
        return [json.dumps(response_data).encode('utf-8')]

    except FileNotFoundError as e:
        start_response('404 Not Found', [('Content-Type', 'application/json')])
        error_msg = f"No se encontro el recurso: {os.path.basename(e.filename)}"
        return [json.dumps({'error': error_msg}).encode('utf-8')]

    except Exception as e:
        start_response('500 Internal Server Error', [('Content-Type', 'application/json')])
        return [json.dumps({'error': str(e), 'tipo': str(type(e))}).encode('utf-8')]

application = SessionMiddleware(application, session_opts)