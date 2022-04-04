# NodeApp

To start the application use:

```sh
npm install
```

In production:

```sh
npm start
```

In development:

```sh
npm run start:dev
```
## Inicializar la BBDD

Para inicializar la BBDD al estado inicial, se puede usar el comando:

````sh
npm run initdb
````

* ATENCIÓN * Esto borrará todos los datos de la bbdd y cargará el estado inicial.

## Métodos del API

El API se accede en /api


Lista de agentes:
- /api/agentes
Filtros:
- localhost:3000/api/agentes?name=Smith&age=21
Paginación:
- localhost:3000/api/agentes?skip=4&limit=2
Select: 
- localhost:3000/api/agentes?select=name -_id address
Ordenación:
- localhost:3000/api/agentes?sort=name age

Buscar un agente por ID
- /api/agentes/:id

Crear un agente:
- /api/agentes/creaAgente

Eliminar un agente:
- /api/agentes/borrarAgente/:id

Actualizar un agente:

- /api/agentes/modificarAgente/:id

Consultar documentación del API (swagger)
- /api/docs

