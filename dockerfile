FROM node:buster-slim
# Create app directory
ENV PORT=80    
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./

RUN npm install
# Copy app source code
COPY . .

#Expose port and start application
EXPOSE 80
CMD [ "npm", "start" ]