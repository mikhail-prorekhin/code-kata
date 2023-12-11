FROM node:19

WORKDIR /var/www/html

COPY docker-entrypoint.sh /usr/local/bin/
RUN ln -s usr/local/bin/docker-entrypoint.sh /entrypoint.sh # backwards compat
ENTRYPOINT ["/bin/bash","docker-entrypoint.sh"]
