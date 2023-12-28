const swaggerOptions = {
  swaggerDefinition: {
    configObject: {
      variables: {
        apiVersion: {
          default: 'v1',
          description: 'Versión de la API',
        },
      },
    },
    openapi: '3.0.0',
    info: {
      title: 'API Prueba Indigitall',
      version: '1.0.0',
      description: 'Documentación de la API de Prueba Indigitall',
    },
    servers: [
      {
        url: 'http://localhost:3000/v1',
        description: 'API v1',
      },
    ],
    components: {
      parameters: {
        latitudeHeader: {
          name: 'x-user-latitude',
          in: 'header',
          required: true,
          default: 30.0,
          schema: {
            type: 'number',
            format: 'float',
          },
          description: 'User latitude location',
        },
        longitudeHeader: {
          name: 'x-user-longitude',
          in: 'header',
          required: true,
          default: 2.0,
          schema: {
            type: 'number',
            format: 'float',
          },
          description: 'User longitude location',
        },
        languageHeader: {
          name: 'x-user-language',
          in: 'header',
          required: false,
          default: 'en',
          schema: {
            type: 'string',
          },
          description: 'User language',
        },
      },
    },
    tags: [
      {
        name: 'Users',
        description: 'User-related operations', // Ajusta esta descripción según tus necesidades
      },
    ],
  },
  apis: ['./routes/**/*.js'], // Path donde se encuentran tus controladores
};
module.exports = { swaggerOptions };
