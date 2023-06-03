FROM --platform=linux/amd64 nginx:alpine

COPY html /usr/share/nginx/html
COPY dist.crx /usr/share/nginx/html/download.crx
COPY dist/manifest.xml /usr/share/nginx/html/manifest.xml

COPY nginx.conf /etc/nginx/nginx.conf
