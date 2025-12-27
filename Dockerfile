# Usar imagen de Ubuntu
FROM ubuntu:latest

# Evitar interacciones durante la instalación
ENV DEBIAN_FRONTEND=noninteractive

# Instalar Apache, Python y componentes necesarios
RUN apt-get update \
    && apt-get install -y \
    apache2 apache2-utils ssl-cert \
    libapache2-mod-wsgi-py3 python3 python3-pip git \
    && apt-get clean

# Instalar librería Beaker de Python
RUN pip3 install beaker-py --break-system-packages

# Configurar módulo WSGI en Apache
RUN a2enmod wsgi

# Definir el Alias del URL
RUN echo 'WSGIScriptAlias /ATI/index.py /var/www/html/ATI/index.py \n\
<Directory /var/www/html/ATI> \n\
    Options +ExecCGI \n\
    AddHandler wsgi-script .py \n\
    Require all granted \n\
</Directory>' > /etc/apache2/conf-available/mod-wsgi.conf && a2enconf mod-wsgi

# Sincronizar con Git
WORKDIR /var/www/html
RUN rm -rf * && git clone -b Reto-7 https://github.com/Samantha-Ramirez/Proyecto1ATI ATI

# Ajustar permisos para que Apache pueda ejecutar los scripts
RUN chown -R www-data:www-data /var/www/html/ATI && chmod -R 755 /var/www/html/ATI

# Exponer el puerto 80
EXPOSE 80

# Iniciar Apache en primer plano
CMD ["apache2ctl", "-D", "FOREGROUND"]

# Ejecutar comandos
# docker build -t proyecto_ati_image .
# docker run -d -p 8080:80 --name proyecto_ati_container proyecto_ati_image
# http://localhost:8080/ATI/