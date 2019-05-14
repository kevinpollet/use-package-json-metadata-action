FROM node:8-alpine

LABEL "com.github.actions.name"="use-package-json-metadata-action"
LABEL "com.github.actions.description"="Use metadata defined in package.json as repository description, homepage and tags"
LABEL "com.github.actions.icon"="activity"
LABEL "com.github.actions.color"="blue"

LABEL "repository"="http://github.com/kevinpollet/use-package-json-metadata-action"
LABEL "homepage"="http://github.com/kevinpollet/use-package-json-metadata-action#readme"
LABEL "maintainer"="kevinpollet <pollet.kevin@gmail.com>"

RUN apk add --no-cache tini

COPY package*.json ./

RUN npm install --production

COPY lib lib/

ENTRYPOINT [ "/sbin/tini", "--", "node", "/lib/index.js"  ]
