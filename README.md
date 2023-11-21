# MidnightApothecary

Welcome to our Midnight Apothecary!

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.9.

## Install Node

Run `npm install` to install node_modules


## JSON Server

This project utilizes JSON Server for handling contact and subscription data.

### Instalation

- Global: `npm install -g json-server`
- Project only: `npm install json-server`

### Usage

- Script: `npm run backend`
- Or run `json-server --watch db/data.json --port 4000`

## Credentials

You can log in as regular user or admin using the following credentials:

### Administration

- Admin: Email - admin@mail.com, Password - `admin123`

### Users

- User: Email - user@mail.com, Password - `usuario123`
- Or you can register a new user!

## User Features

### Admin

- Create new products
- Update and delete existing products
- Create new witch blogs
- Update and delete existing witch blogs
- Delete users comments
- View user purchases by email
- Finalize the status of a purchase


### User

- Add items to their cart
- Purchase products
- View purchases history
- Comment on a witch-blog
- Edit and delete their comments

### All users

- Navigate the store and blogs
- View detailed information about a product
- Subscribe to news
- Contact us

## Environment Configuration

- Rename `environment.example.ts` to `environment.ts`
- Replace the API_KEY value with your key from [Perenual](https://perenual.com/docs/api) api.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


##
##

# Midnight Apothecary

Bienvenidos a nuestro Boticario Nocturno!

Este proyecto ha sido generado con [Angular CLI](https://github.com/angular/angular-cli) version 16.2.9.

## Instala Node

Ejecuta `npm install` en la terminal para instalar node_modules.

## JSON Server

Este proyecto utiliza JSON Server para administrar los datos de contacto y de suscripcion.

### Instalacion

- Global: `npm install -g json-server`
- Solo en el proyecto: `npm install json-server`

### Uso

- Script: `npm run backend`
- O ejecuta `json-server --watch db/data.json --port 4000` en la consola.

## Credenciales

Puedes iniciar sesion como un usuario regular o como administrador utilizando las siguientes credenciales: 

### Administracion

- Admin: Email - admin@mail.com, Contraseña - `admin123`

### Usuarios

- User: Email - user@mail.com, Contraseña - `usuario123`
- O puedes registrar un nuevo usuario!

## Caracteristicas de usuario

### Admin

- Crear nuevos productos
- Editar y eliminar productos existentes
- Crear nuevos blogs de brujas
- Editar y eliminar blogs de brujas
- Eliminar comentarios de cualquier usuario
- Ver las compras de un usuario por su email
- Finalizar el estado de una compra
- Ver y editar su informacion de perfil


### Usuario

- Agregar productos al carrito
- Comprar productos
- Ver historial de compras
- Comentar en el blog de una bruja
- Editar y eliminar sus comentarios
- Ver y editar su informacion de perfil


### Todos los usuarios

- Navegar por la tienda y el blog
- Ver la informacion detallada de un producto
- Suscribirse a novedades
- Contactarse


## Configuracion Entornos

- Renombra `environment.example.ts` a `environment.ts`.
- Reemplaza el valor de API_KEY con tu clave de la api [Perenual](https://perenual.com/docs/api).

## Servidor de Desarrollo

- Ejecuta `ng serve` para iniciar un servidor de desarrollo. Navega a http://localhost:4200/. La aplicación se recargará automáticamente si modificas alguno de los archivos fuente.
- Ejecuta `ng serve --o` para que la aplicacion se abra automaticamente en el navegador.

## Code scaffolding

Ejecuta `ng generate component nombre-del-componente` para generar un nuevo componente. También puedes utilizar `ng generate directive|pipe|service|class|guard|interface|enum|module.`

## Build

Ejecuta `ng build` para construir el proyecto. Los artefactos de la construcción se almacenarán en el directorio `dist/`.


## Ayuda adicional

Para obtener más ayuda sobre Angular CLI, utiliza `ng help` o consulta la [Descripción general y Referencia de Comandos de Angular CLI](https://angular.io/cli).

