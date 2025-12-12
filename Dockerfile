FROM ubuntu

RUN apt-get update -y && apt-get upgrade -y && apt-get install -y apache2
RUN apt-get install -y apache2-utils
RUN apt-get clean

COPY . /var/www/html

EXPOSE 80

CMD ["apache2ctl", "-D", "FOREGROUND"]

# Comandos
# docker build -t proyecto_ati_image .
# docker run -tid --name proyecto_ati_container -d -p 8080:80 proyecto_ati_image