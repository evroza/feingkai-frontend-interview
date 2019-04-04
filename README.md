### Setup Instructions

You will need to have node at least version 8 installed

All instructions are assuming that you are starting in `/theme` directory

1. Setup theme
    ```bash
    cd tools
    npm install -g yarn
    npm install -g gulp-cli
    yarn install
    # This command only needs to be run if there are changes made to files in parent /src folder
    gulp --prod --angular
    ```
2. Install Angular CLI
    ```bash
    npm install --global @angular/cli@latest
    ```
3. Install feingkai Angular dependencies
    ```bash
    cd dist/feingkai/ 
    npm install
    # Run app in dev mode
    ng serve
    ```

### Usage Instructions    
*   To compile for production run
    Output is located in ./dist/feingkai/dist/
    ```bash
    ng build --prod
    ```   
    This is just for testing, the CI/CD will do the actual compilation for deployment


The page we are working on is located at `http://localhost:4200/feingkai`

The dashboard widgets we are creating/integrating should go in dist/feingkai/src/app/content/partials/feingkai
To install a new component:
```
ng generate component content/partials/feingkai/<component name>
```
To make sure component is accessible globally 
make sure the component class is in both the declarations and export objects
in `dist/feingkai/src/app/content/partials/partials.module.ts in Exports`

Add your new component to so that it displays in the Feingkai page:

`dist/feingkai/src/app/content/pages/feingkai-home/feingkai-home.component.html`

All components which make http requests should use the api Service located in `theme/dist/feingkai/src/app/feingkai-api`




