# Painel / Panel
Aplicação que consome servicos para montar paineis do Ministério da Cultura (MinC)

Application that consumes services to mount panels of the Ministry of Culture (MinC)

## Para rodar a aplicação
### Baixar o codigo da aplicação na pasta /var/www
    git clone https://github.com/lablivrebr/panel.git /var/www/.
### Usar o DockerFile
    cd /var/www/pane/Dockerfile && build -t panel .
### Rodando container da aplicacao apartir da imagem gerada pelo dockerfile chamada de panel 
    docker run -it -v /var/www:/var/www --name panel panel
### Dentro do container - Precisa do ID de rede do container para saber use o docker inspect CONTAINERNAME Ex: 172.17.0.1
### Acessando a pasta do projeto de dentro do container e Subir Servidor da aplicação para ser acessada pelo ip do container e na porta 80
    cd /var/www/panel && http-server -a IPCONTAINER -p 80

## Tecnologias utilizadas
- [D3js](https://github.com/d3/d3)
<img src="https://camo.githubusercontent.com/722a5cc12c7d40231ebeb8ca6facdc8547e2abf7/68747470733a2f2f64336a732e6f72672f6c6f676f2e737667" width="100px">

- [Angular 1](https://github.com/angular/angular)
<img src="https://angular.io/resources/images/logos/angular2/angular.svg" width="100px">

- [Yarn](https://github.com/yarnpkg/yarn) 
<img src="https://github.com/yarnpkg/assets/raw/master/yarn-kitten-full.png" width="100px">

- [Docker](https://github.com/docker/docker)
<img src="https://github.com/docker/docker/raw/master/docs/static_files/docker-logo-compressed.png" width="100px">
