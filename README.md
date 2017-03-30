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
### Você vai precisar do ID de rede do container para subir o servidor Exemplo de IP: 172.17.0.1
### Use o seguinte comando para descobrir o IP do Container:
    docker inspect panel
### Depois de saber o ip do container acesse o container com 
    docker attach panel 
### Para subir o servidor da aplicação e poder ser acessada no seu navegador pelo ip do container e na porta 80
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
