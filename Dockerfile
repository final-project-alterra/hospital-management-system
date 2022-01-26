# syntax=docker/dockerfile:1

# Stage I - bulding the app
# Use node:16 because there's error when building using node:17
# https://stackoverflow.com/questions/54428608/docker-node-alpine-image-build-fails-on-node-gyp
FROM node:16-alpine AS builder

WORKDIR /app

COPY . ./

RUN yarn install --frozen-lockfile
RUN yarn run build

# Stage II - copy build result then run
# https://levelup.gitconnected.com/dockerizing-a-react-application-using-nginx-and-react-router-43154cc8e58c
FROM nginx:stable-alpine

COPY --from=builder /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
