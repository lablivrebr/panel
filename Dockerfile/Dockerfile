FROM ubuntu
MAINTAINER ruyjfs@gmail.com
RUN apt-get update
RUN apt-get install -y git curl && curl -sL https://deb.nodesource.com/setup_7.x | bash - && apt-get install -y nodejs
RUN npm install http-server -g
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install yarn
#RUN git clone https://github.com/lablivrebr/panel.git /var/www/.
#RUN cd /var/www/panel && yarn
RUN apt-get clean
VOLUME ["/var/www" : "/var/www"]
CMD ["/bin/bash"]
#EXPOSE 80:80