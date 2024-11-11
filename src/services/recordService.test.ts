import dotenv from 'dotenv';
import { createRecord, getRecordById, updateRecord, deleteRecord } from './recordService';
import { notionClient } from '../utils/notionClient';
import { CreateRecordDTO, UpdateRecordDTO } from '../dto/record';

dotenv.config();

jest.mock('../utils/notionClient', () => ({
  notionClient: {
    pages: {
      create: jest.fn(),
      update: jest.fn(),
    },
    databases: {
      query: jest.fn(),
    },
    blocks: {
      delete: jest.fn(),
    },
  },
}));

describe('Record Service', () => {
  const mockRecord = {
    id: 'mockId',
    properties: {},
  };

  const createRecordDTO: CreateRecordDTO = {
    company: 'Mock Title',
    campaign: 'Mock Campaign',
    description: 'Mock Description',
    where: 'Mock Location',
    language: 'English',
    imageFile: {
      name: 'mockImage.jpg',
      url: 'http://mockurl.com/image.jpg',
    },
    imageContent: 'Mock Image Content',
  };

  const updateRecordDTO: UpdateRecordDTO = {
    company: 'Updated Title',
    campaign: 'Updated Campaign',
    description: 'Updated Description',
    where: 'Updated Location',
    language: 'Spanish',
    imageFile: {
      name: 'updatedImage.jpg',
      url: 'http://mockurl.com/updated-image.jpg',
    },
    imageContent: 'Updated Image Content',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar um novo registro', async () => {
    (notionClient.pages.create as jest.Mock).mockResolvedValue(mockRecord);

    const result = await createRecord(createRecordDTO);

    expect(notionClient.pages.create).toHaveBeenCalledWith({
      parent: { database_id: process.env.NOTION_DATABASE_ID },
      properties: expect.any(Object),
    });

    expect(result).toEqual(mockRecord);
  });

  it('deve buscar um registro por ID', async () => {
    (notionClient.databases.query as jest.Mock).mockResolvedValue({
      results: [mockRecord],
    });

    const result = await getRecordById('123');

    expect(notionClient.databases.query).toHaveBeenCalledWith({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: {
        property: 'ID',
        number: { equals: 123 },
      },
    });

    expect(result).toEqual(mockRecord);
  });

  it('deve retornar null ao buscar um registro inexistente', async () => {
    (notionClient.databases.query as jest.Mock).mockResolvedValue({
      results: [],
    });

    const result = await getRecordById('999');

    expect(notionClient.databases.query).toHaveBeenCalledWith({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: {
        property: 'ID',
        number: { equals: 999 },
      },
    });

    expect(result).toBeNull();
  });

  it('deve atualizar um registro existente', async () => {
    (notionClient.databases.query as jest.Mock).mockResolvedValue({
      results: [mockRecord],
    });
    (notionClient.pages.update as jest.Mock).mockResolvedValue(mockRecord);

    const result = await updateRecord('123', updateRecordDTO);

    expect(notionClient.pages.update).toHaveBeenCalledWith({
      page_id: 'mockId',
      properties: expect.any(Object),
    });

    expect(result).toEqual(mockRecord);
  });

  it('deve retornar null ao tentar atualizar um registro inexistente', async () => {
    (notionClient.databases.query as jest.Mock).mockResolvedValue({
      results: [],
    });

    const result = await updateRecord('999', updateRecordDTO);

    expect(result).toBeUndefined();
  });

  it('deve deletar um registro existente', async () => {
    (notionClient.databases.query as jest.Mock).mockResolvedValue({
      results: [mockRecord],
    });
    (notionClient.blocks.delete as jest.Mock).mockResolvedValue({
      object: 'block',
      id: 'mockId',
      archived: true,
    });

    const result = await deleteRecord('123');

    expect(notionClient.blocks.delete).toHaveBeenCalledWith({
      block_id: 'mockId',
    });

    expect(result).toEqual({
      object: 'block',
      id: 'mockId',
      archived: true,
    });
  });

  it('deve retornar null ao tentar deletar um registro inexistente', async () => {
    (notionClient.databases.query as jest.Mock).mockResolvedValue({
      results: [],
    });

    const result = await deleteRecord('999');

    expect(result).toBeNull();
  });
});
