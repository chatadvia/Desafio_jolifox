import { Router } from 'express';
import {
  createRecord,
  getRecordById,
  updateRecord,
  deleteRecord,
} from '../controllers/recordController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Records
 *   description: Manipulação de registros do banco de dados do Notion
 */

/**
 * @swagger
 * /api/records:
 *   post:
 *     summary: Cria um novo registro
 *     tags: [Records]
 *     description: Cria um novo registro no banco de dados do Notion, com todos os campos necessários.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company:
 *                 type: string
 *                 example: "Novo Registro"
 *                 description: O título do novo registro.
 *               campaign:
 *                 type: string
 *                 example: "Campanha Primavera"
 *                 description: A campanha associada ao registro.
 *               description:
 *                 type: string
 *                 example: "Descrição detalhada do evento."
 *                 description: A descrição do registro.
 *               where:
 *                 type: string
 *                 example: "São Paulo"
 *                 description: O local onde o evento ocorrerá.
 *               language:
 *                 type: string
 *                 example: "Portuguese"
 *                 description: O idioma do registro.
 *               content:
 *                 type: string
 *                 example: "Descrição da imagem."
 *                 description: A descrição do conteúdo da imagem.
 *               imageFile:
 *                 type: object
 *                 properties:
 *                   url:
 *                     type: string
 *                     example: "https://unsplash.com/pt-br/fotografias/um-bisao-com-chifres-em-pe-na-neve-Qf4a2Ikg1Ns"
 *                     description: "A URL da imagem"
 *                   name:
 *                     type: string
 *                     example: "Imagem"
 *                     description: "O nome da imagem"
 *     responses:
 *       201:
 *         description: Registro criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "12345"
 *                 title:
 *                   type: string
 *                   example: "Novo Registro"
 *                 description:
 *                   type: string
 *                   example: "Descrição do registro"
 *                 campaign:
 *                   type: string
 *                   example: "Campanha Primavera"
 *                 where:
 *                   type: string
 *                   example: "São Paulo"
 *                 language:
 *                   type: string
 *                   example: "Portuguese"
 *       400:
 *         description: Erro na criação do registro - Dados inválidos
 *       500:
 *         description: Erro interno no servidor
 */
router.post('/records', createRecord);


/**
 * @swagger
 * /api/records/{id}:
 *   get:
 *     summary: Busca um registro pelo ID
 *     tags: [Records]
 *     description: Retorna os dados de um registro específico pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do registro
 *     responses:
 *       200:
 *         description: Dados do registro retornados com sucesso
 *       404:
 *         description: Registro não encontrado
 */
router.get('/records/:id', getRecordById);

/**
 * @swagger
 * /api/records/{id}:
 *   put:
 *     summary: Atualiza um registro pelo ID
 *     tags: [Records]
 *     description: Atualiza os dados de um registro específico pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do registro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company:
 *                 type: string
 *                 example: "Atualização de registro"
 *                 description: O título do novo registro.
 *               campaign:
 *                 type: string
 *                 example: "Campanha Primavera Atualizadas"
 *                 description: A campanha associada ao registro.
 *               description:
 *                 type: string
 *                 example: "Descrição detalhada do evento."
 *                 description: A descrição do registro.
 *               where:
 *                 type: string
 *                 example: "São Paulo"
 *                 description: O local onde o evento ocorrerá.
 *               language:
 *                 type: string
 *                 example: "Portuguese"
 *                 description: O idioma do registro.
 *               content:
 *                 type: string
 *                 example: "Descrição da imagem."
 *                 description: A descrição do conteúdo da imagem.
 *               imageFile:
 *                 type: object
 *                 properties:
 *                   url:
 *                     type: string
 *                     example: "https://unsplash.com/pt-br/fotografias/um-close-up-de-um-gato-em-uma-cama-gz0rGe7mhL8"
 *                     description: "A URL da imagem"
 *                   name:
 *                     type: string
 *                     example: "Imagem"
 *                     description: "O nome da imagem"
 *     responses:
 *       200:
 *         description: Registro atualizado com sucesso
 *       400:
 *         description: Erro na atualização do registro
 *       404:
 *         description: Registro não encontrado
 */
router.put('/records/:id', updateRecord);

/**
 * @swagger
 * /api/records/{id}:
 *   delete:
 *     summary: Exclui um registro pelo ID
 *     tags: [Records]
 *     description: Remove um registro específico pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do registro
 *     responses:
 *       200:
 *         description: Registro excluído com sucesso
 *       204:
 *         description: Registro excluído
 *       404:
 *         description: Registro não encontrado
 */
router.delete('/records/:id', deleteRecord);

export default router;
