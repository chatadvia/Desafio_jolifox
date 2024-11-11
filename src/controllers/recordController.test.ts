import request from 'supertest';
import * as recordService from './../services/recordService';
import app from '../app';

jest.mock('./../services/recordService');

describe('Record Controller', () => {
  const mockRecord = {
    id: '1',
    company: 'Test Title',
    campaign: 'Test Campaign',
    description: 'Test Description',
    where: 'Test Location',
    language: 'Portuguese',
    content: 'content teste',
    imageFile: {
      name: 'test-image.jpg',
      url: 'https://test-image-url.com',
    },
  };

  const mockId = '1';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST api/records', () => {
    it('deve criar um registro com sucesso', async () => {
      (recordService.createRecord as jest.Mock).mockResolvedValue(mockRecord);

      const response = await request(app)
        .post('/api/records')
        .send(mockRecord);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockRecord);
    });

    it('deve retornar erro ao criar um registro', async () => {
      (recordService.createRecord as jest.Mock).mockRejectedValue(new Error('Erro ao criar registro'));

      const response = await request(app)
        .post('/api/records')
        .send(mockRecord);

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Erro ao criar registro');
    });
  });

  describe('GET api/records/:id', () => {
    it('deve obter um registro pelo ID com sucesso', async () => {
      (recordService.getRecordById as jest.Mock).mockResolvedValue(mockRecord);

      const response = await request(app).get(`/api/records/${mockId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockRecord);
      expect(recordService.getRecordById).toHaveBeenCalledWith(mockId);
    });

    it('deve retornar erro ao obter um registro inexistente', async () => {
      (recordService.getRecordById as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get(`/api/records/6`);

      expect(response.status).toBe(200);
      expect(response.body).toBeNull();
    });
  });

  describe('PUT api/records/:id', () => {
    it('deve atualizar um registro com sucesso', async () => {
      const updatedRecord = { ...mockRecord, company: 'Updated company' };
      (recordService.updateRecord as jest.Mock).mockResolvedValue(updatedRecord);

      const response = await request(app)
        .put(`/api/records/${mockId}`)
        .send({ company: 'Updated company' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedRecord);
    });

    it('deve retornar erro ao atualizar um registro inexistente', async () => {
      (recordService.updateRecord as jest.Mock).mockRejectedValue(new Error('Erro ao atualizar registro'));

      const response = await request(app)
        .put(`/api/records/${mockId}`)
        .send({ title: 'Updated Title' });

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Erro ao atualizar registro');
    });
  });

  describe('DELETE api/records/:id', () => {
    it('deve deletar um registro com sucesso', async () => {
      (recordService.deleteRecord as jest.Mock).mockResolvedValue(true);

      const response = await request(app).delete(`/api/records/${mockId}`);

      expect(response.status).toBe(204);
      expect(recordService.deleteRecord).toHaveBeenCalledWith(mockId);
    });

    it('deve retornar erro ao deletar um registro inexistente', async () => {
      (recordService.deleteRecord as jest.Mock).mockRejectedValue(new Error('Erro ao deletar registro'));

      const response = await request(app).delete(`/api/records/${mockId}`);

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Erro ao deletar registro');
    });
  });
});
