FROM bluelightltd/nginx-nodejs-v8-feingkai

# Copy full theme to image
ADD theme /opt/theme/
# Install Angular dependencies
RUN cd /opt/theme/dist/feingkai/ && npm install
# Install Metronic dependencies and install them into Angular assets folder
RUN cd /opt/theme/tools && yarn install && gulp --prod --angular
# Compile production Angular app
RUN cd /opt/theme/dist/feingkai/ && ng build --prod && \
    ln -s /opt/theme/dist/feingkai/dist/ /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]