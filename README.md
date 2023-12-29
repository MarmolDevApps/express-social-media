## Uso

Para ejecutar el API se puede hacer mediante:

```
//Install dependencies
npm install

//Create database
npm run create-db

//Run server
npm run start

//Run tests
npm run test
```

Como utilidades para agilizar el desarrollo se incluye lo siguiente:

- Una capreta "lib" con un objeto de conexión a SQLite. Aunque el desarrollador tiene la libertad de usar lo que considere en este aspecto.

- En el caso de que se desee utilizar SQLite, existe una carpeta "sql" con un script que ejecuta las queries iniciales para crear el esquema de base de datos, el script ejecutará las sentencias escritas en el fichero createSchema.sql de la misma carpeta. para ejecutarlo sería de la siguiente forma:
  ```
  npm run create-db
  ```
- Un objeto en la carpeta "services" para realizar peticiones al API externa que procesa usuarios del hemisferio sur

## Requisitos

- Uso de Node.js y framework Express.js
- Uso de base de datos relacional SQL para alojar los datos.
- Uso de lenguaje SQL (no usar ORM)
- La programación asíncrona debe realizarse mediante promesas o async/await.
- Entrada y salida del API en formato JSON
- Antes de procesar cada petición, se debe imprimir un log con la información correspondiente, método, path y parámetros.
- Control de errores y excepciones.
- Buena organización y estilo de código intentando seguir un patrón de diseño en el que la lógica y el modelo de datos sean independientes.

## ☝️ Planteamiento

En esta práctica, se han tenido en cuenta diversos aspectos determinantes para el desarrollo. Es fundamental tener en cuenta estos puntos para comprender mejor el proceso:

- Se ha considerado necesario y obligatorio el envío de geolocalización en todos los endpoints por razones de procesamiento de datos y para utilizar servicios de almacenamiento específicos según la ubicación. Por ello, es necesario incluir estos parámetros en la cabecera de la solicitud. Sin embargo, es importante señalar que en un escenario real esta decisión podría influir en la experiencia del usuario, ya que se requiere su consentimiento para compartir su ubicación. Sería necesario por parte de negocio considerar cómo abordar a aquellos usuarios que opten por no compartir estos datos.

- De acuerdo con las especificaciones proporcionadas, los usuarios del hemisferio norte están registrados en nuestra base de datos, mientras que los del hemisferio sur se encuentran en una API externa. Es esencial por parte de negocio determinar las especificaciones para situaciones en las que un usuario cambie de hemisferio.

- Se ha considerado en la actualización de un usuario, de momento, solamente se editen los campos latitude, longitude, language. El resto de parámetros hay que determinar que hacer en caso de cambio de email, username o password ya que cada paramétro puede tener diferentes lógicas de negocio, en concreto email y username que son únicos en bbdd.

- Se ha considerado que una amistad se cumple cuando esta registrada bidireccionalmente en Base de Datos y con estado "Active". Siguiendo la lógica de amistad que tiene Facebook por ejemplo. Dos personas son amigos y pueden ver sus perfiles cuando uno de los dos manda solicitud y el otro lo acepta. Automáticamente se actualiza el estado "Active" en ambos registros. Igual pasaría si se eliminase, se cambiarían ambos estados a "Rejected".

## 🎯 Features

### Middlewares

Se han desarrollado diferentes Middlewares para esta práctica que nos ayudan en lo siguiente:

- **_headersMiddleware_**: Este middleware nos ayuda a interceptar y bloquear aquella petición que no contenga las cabeceras obligatorias de geolocalización. Si no las tiene, rechaza la petición con un error y no se procesa nada más.

- Para hacer logs de las peticiones entrantes donde se imprime el método, la url y el tiempo procesado. Aprovechando que estaba instalada la dependencia morgan se ha usado esta librería para ello.

- **_LoggerMiddleware_**: Se ha añadido un middleware para imprimir un formato standard en los logs y he añadido un correlationId que se le asigna a cualquier peticion entrante para luego poder capturar facilmente las trazas. Para esto he usado las librerías winston (formato de los logs) y uuid (generar uuid únicos).

- Para generar la documentación de los endpoints se ha usado swagger y se expone en la url http://localhost:3000/api-docs

### Servicios

He separado diferentes lógicas de negocio según las especificaciones del ejercicio y lo he dividido en tres servicios:

- **_users-db-service_**: es el servicio encargado de realizar las operaciones con nuestra base de datos sqlite y se encarga de procesar los usuarios que se encuentren en el hemisferio norte.

- **_users-southernapi-service_**: es el servicio que hace las mismas operaciones que el servicio anterior pero apuntando a una supuesta API de terceros para procesar aquellos usuarios que se encuentran en el hemisferio sur. Aquí he aprovechado y he desarollado un CRUD en memoria utilizando diferentes funciones de array y asi se pueda quedar un proceso funcional tanto si se localiza en el hemisferio norte como en el sur.

- **_users-service_**: este servicio lo he desarrollado para funciones específicas del negocio relacionadas con los usuarios. Como por ejemplo, obtener los parámetros de cabecera relacionados con la localizacion y el idioma del usuario y otra función para determinar si es un usuario de nuestra base de datos o pertenece a la API de terceros. Así conseguimos un controlador más limpio.

## 📄 Docs

Se ha dedicado un tiempo en documentar el proyecto de diferentes maneras:

- Dejo unos ficheros en el directorio docs/postman para importar en postman y hacer un uso de la API más funcional donde podremos cambiar las variables de entorno de localización para intercambiar de servicios de almacenamiento. Hay que importar una colección y en el apartado de Environments el fichero correspondiente.

- Con Swagger se ofrece la documentación de los endpoints bajo la url: http://localhost:3000/api-docs.

- En cada función del código hay documentación técnica para los desarrolladores.

## 🚀 Mejoras

Aquí detallaré algunas mejoras necesarias para continuar el proyecto:

- Validaciones en los parámetros de entrada y de salida, uso de alguna librería que nos ayudase a tener código más limpio y realizar las validaciones antes de que nos llegue al controlador. Así mostrariamos errores de validación de manera más eficiente.

- Mejoras en el tratamiento de errores y unificar la salida con constantes de mensajes y llevarlo a un utils.

- Ante la problemática de diferenciar usuarios por hemisferios y almacenar en diferentes base de datos. Se debería plantear un servicio de sincronización de estas bases de datos en caso de que un usuario viaje de un hemisferio a otro. Se plantearían lógicas de migración de usuarios entre base de datos o algún tratamiento específico para estos casos. También hay que tener en cuenta las restricciones de creación de usuarios en el que su email y su username debe ser único. Hay que realizar consultas en la base de datos contraria para que no haya duplicidad de usuarios.

- Tratamiento de constantes, tanto en mensajes de error como en respuestas, etc.

- Configuraciones de eslint para la calidad del código, uso de variables de entorno, etc.

- Mejorar la cobertura de tests.

- Tener diferentes entornos de test, desarrollo, producción, etc.

## 📝 Ejercicio 1.2

Basándonos en la amistad que tiene Facebook. Una amistad es considereda cuando se acepta una solicitud, en ese momento, se actualiza el estado "Active" en ambas direcciones. Igual ocurre cuando una de las dos partes elimina al usuario de su lista de amigos. En ambas direcciones se actualiza el estado a "Rejected". Por lo tanto con buscar de un lado a otro serviría y se optimizaría la búsqueda.

- Listado de amigos de un usuario determinado:

```
 SELECT u.username
FROM users u
JOIN friendships f1 ON u.id = f1.friend_id
WHERE f1.user_id = ? AND f1.status = 'Active';
```

- Contador de amigos de un usuario determinado:

```
 SELECT COUNT(u.id) AS friend_count
FROM users u
JOIN friendships f1 ON u.id = f1.friend_id
WHERE f1.user_id = ? AND f1.status = 'Active';
```

## 🎨 2. Prueba de diseño

Aquí muestro la prueba de diseño según las especificaciones del ejercicio basándome en servicios cloud de AWS. Este diagrama se ha elaborado con la aplicación de drawio. Dejo el proyecto y la imagen en svg en la carpeta ./docs/drawio/ . Abajo de la imagen muestro una breve explicación del flujo y los servicios utilizados.

![Screenshot](./docs/drawio/exercise2.svg)

Detallo en una lista de puntos el flujo del proceso:

1. Tenemos una infraestructura montanda en **AWS Cloud** con sus debidas configuraciones de redes, zonas y seguridad para realizar cualquier acceso a ella.

2. Tenemos una plataforma en la que determinados desarrollos frontales gestionan el servicio de notificaciones y todas sus funciones con nuestro sistema.

3. Se utiliza un servicio de autenticación y autorización de acceso a la aplicación con **(AWS Cognito)**.

4. Una vez autenticado se establece una conexión con una red pública pasando por un Firewall **(AWS WAF)** para ofrecer mayor seguridad y se realiza llamadas a un API Gateway **(AWS API Gateway)** para gestionar el tráfico de las diferentes peticiones.

5. Este API Gateway gestiona las peticiones y llama a nuestro sistema Backend que está montado con microservicios y diferentes contenedores orquestados por un balanceador de carga **(AWS Load Balancer)** y Kubernetes **(AWS EKS)** para permitir una alta escalabilidad.

6. Este backend hace uso de una base de datos relacional **(AWS RDS)** con alta capacidad de escalabilidad donde se almacenará todo tipo de información relacionada con la aplicación.

7. Entre diversas funciones, el core del proyecto se encarga de gestionar el envío de multitud de notificaciones a diferentes dispositivos y así poder ofrecer una garantía del proceso y una capacidad con alta escalabilidad. Por ello, se ha diseñado de la siguiente manera:

   - Nuestro sistema se encarga de enviar notificaciones a través del servicio **(AWS SNS)** ya sea a un usuario o a grupos.

   - Este servicio en vez de llamar directamente a nuestros proveedores **FCM/APNS**, se llama a un Broker de mensajes **(AWS SQS)** que gestionará este volúmen de mensajes y estos proveedores serán los que estén consumiendo estos mensajes. Aquí se podrá configurar una política de reintento si recibimos un error 429. Este sistema garantiza una alta escalabilidad.

   - Estos proveedores se encargarán de enviar las notificaciones a los dispositivos de destino.

   - Para procesar los eventos de los usuarios en tiempo real usaremos el servicio **(AWS Kinesis)** y se capturarán todo tipo de eventos relacionados con las notificaciones (Leída, accedida, borrada, etc).

   - AWS Kinesis interactua con nuestro Backend el cual procesa esa información y se puede alamacenar en un **(AWS S3)** para analizarlo con **(AWS Athena)** o si se requiere de una estadística más compleja y en tiempo real usaríamos en este caso (AWS Redshift).

8. Para el envío de informes a nuestros usuarios a través de email usaremos el servicios de mensajeria **(AWS SES)**
