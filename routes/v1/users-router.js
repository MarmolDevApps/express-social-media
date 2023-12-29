const express = require('express');
const usersRouter = express.Router();
const usersController = require('../../controllers/users-controller');

/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *      - Users
 *     summary: Crear un nuevo usuario.
 *     description: Crea un nuevo usuario con los datos proporcionados.
 *     parameters:
 *        - $ref: '#/components/parameters/latitudeHeader'
 *        - $ref: '#/components/parameters/longitudeHeader'
 *        - $ref: '#/components/parameters/languageHeader'
 *        - in: query
 *          name: username
 *          required: true
 *          schema:
 *           type: string
 *          description: Username.
 *        - in: query
 *          name: email
 *          required: true
 *          schema:
 *           type: string
 *          description: Email.
 *        - in: query
 *          name: password
 *          required: true
 *          schema:
 *           type: string
 *          description: Password.
 *     responses:
 *       201:
 *         description: Usuario creado con éxito.
 *       400:
 *         description: Datos de entrada no válidos o incompletos o error al crear usuario.
 */
usersRouter.post('/', usersController.createUser);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *      - Users
 *     summary: Obtener un usuario por ID.
 *     description: Devuelve los datos de un usuario basado en un ID.
 *     parameters:
 *       - $ref: '#/components/parameters/latitudeHeader'
 *       - $ref: '#/components/parameters/longitudeHeader'
 *       - $ref: '#/components/parameters/languageHeader'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a buscar.
 *     responses:
 *       200:
 *         description: Detalles del usuario obtenidos con éxito.
 *       404:
 *         description: Usuario no encontrado.
 *       400:
 *         description: Error al obtener el usuario.
 */
usersRouter.get('/:id', usersController.getUserById);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *      - Users
 *     summary: Obtener un usuario por ID.
 *     description: Devuelve los datos de un usuario basado en un ID.
 *     parameters:
 *       - $ref: '#/components/parameters/latitudeHeader'
 *       - $ref: '#/components/parameters/longitudeHeader'
 *       - $ref: '#/components/parameters/languageHeader'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a buscar.
 *     responses:
 *       200:
 *         description: Detalles del usuario obtenidos con éxito.
 *       404:
 *         description: Usuario no encontrado.
 *       400:
 *         description: Error al obtener el usuario.
 */
usersRouter.get('/username/:username', usersController.getUserByUsername);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags:
 *      - Users
 *     summary: Actualizar un usuario por ID.
 *     description: Actualiza los datos de un usuario específico basado en su ID.
 *     parameters:
 *       - $ref: '#/components/parameters/latitudeHeader'
 *       - $ref: '#/components/parameters/longitudeHeader'
 *       - $ref: '#/components/parameters/languageHeader'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a actualizar.
 *       - in: body
 *         name: body
 *         required: true
 *         description: Datos del usuario a actualizar.
 *         schema:
 *           type: object
 *           properties:
 *             latitude:
 *               type: number
 *               description: Nueva latitud del usuario.
 *             longitude:
 *               type: number
 *               description: Nueva longitud del usuario.
 *             language:
 *               type: string
 *               description: Nuevo idioma del usuario.
 *     responses:
 *       200:
 *         description: Usuario actualizado con éxito.
 *       404:
 *         description: Usuario no encontrado.
 *       400:
 *         description: Error al actualizar el usuario.
 */
usersRouter.put('/:id', usersController.updateUser);

/**
 * @swagger
 *
 * /users/{id}:
 *   delete:
 *     tags:
 *      - Users
 *     summary: Eliminar un usuario por ID.
 *     description: Elimina un usuario específico basado en su ID.
 *     parameters:
 *       - $ref: '#/components/parameters/latitudeHeader'
 *       - $ref: '#/components/parameters/longitudeHeader'
 *       - $ref: '#/components/parameters/languageHeader'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a eliminar.
 *     responses:
 *       200:
 *         description: Usuario eliminado con éxito.
 *       404:
 *         description: Usuario no encontrado.
 *       400:
 *         description: Error al eliminar el usuario.
 */
usersRouter.delete('/:id', usersController.deleteUser);

module.exports = usersRouter;
