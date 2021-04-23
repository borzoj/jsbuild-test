FROM node:12.14.0-alpine
LABEL maintainer="Phoenix Team <phoenix@zavamed.com>"

# Installs latest Chromium package
RUN apk update && apk upgrade && \
    # echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    # echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk add --no-cache \
       bash \
       make \
       g++ \
       python && \
    #   chromium \
    #   nss@edge \
    #   freetype@edge \
    #   harfbuzz@edge && \
    echo done

# This line is to tell karma-chrome-launcher where
# chromium was downloaded and installed to.
ENV CHROME_BIN /usr/bin/chromium-browser

# Tell Puppeteer to skip installing Chrome.
# We'll be using the installed package instead.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Telling node-sass which pre-built binary to fetch.
# This way we don't need rebuilding node-sass each time!
ENV SASS_BINARY_NAME=linux-x64-67


RUN mkdir -p /app
RUN mkdir -p /usr/lib/app
WORKDIR /app

ENV NODE_ENV dev
ADD .npmrc /usr/lib/app/
ADD package.json /usr/lib/app/
# ADD package-lock.json /usr/lib/app/
RUN cd /usr/lib/app && npm install
ADD .build/jsbuild/run.sh /

EXPOSE 3000
EXPOSE 3001
EXPOSE 8888
ENTRYPOINT [ "/run.sh" ]
CMD [ "/run.sh" ]
