import dotenv from 'dotenv';
import { notionClient } from '../utils/notionClient';
import { CreateRecordDTO, UpdateRecordDTO } from '../dto/record';

dotenv.config();
const databaseId = process.env.NOTION_DATABASE_ID as string;

export const createRecord = async (createRecordDTO: CreateRecordDTO) => {
  try {
    const creationDate = new Date().toISOString();

    const response = await notionClient.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Company: {
          title: [
            {
              text: {
                content: createRecordDTO.company || "",
              },
            },
          ],
        },
        Campaign: {
          rich_text: [
            {
              text: {
                content: createRecordDTO.campaign || "",
              },
            },
          ],
        },
        Description: {
          rich_text: [
            {
              text: {
                content: createRecordDTO.description || "",
              },
            },
          ],
        },
        PlannedDate: {
          date: {
            start: creationDate,
          },
        },
        Where: {
          rich_text: [
            {
              text: {
                content: createRecordDTO.where || "Linkedin",
              },
            },
          ],
        },
        Language: {
          select: {
            name: createRecordDTO.language || "Portuguese",
          },
        },
        Content: {
          rich_text: [
            {
              text: {
                content: createRecordDTO.content || "Exemplo content",
              },
            },
          ],
        },
        Image: {
          files: [
            {
              name: createRecordDTO.imageFile?.name || 'Image from URL',
              external: { url: createRecordDTO.imageFile?.url || "https://unsplash.com/pt-br/fotografias/um-close-up-de-um-gato-em-uma-cama-gz0rGe7mhL8" },
            },
          ],
        },
        // ImageContent: { 
        //   rich_text: [
        //     {
        //       text: {
        //         content: createRecordDTO.imageContent || "Image Content",
        //       },
        //     },
        //   ],
        // },
      },
    });

    return response;
  } catch (error) {
    console.error('Erro ao criar registro:', error);
    throw error;
  }
};

export const getRecordById = async (id: string) => {
  try {
    const numericId = Number(id);
    const response = await notionClient.databases.query({
      database_id: databaseId,
      filter: {
        property: "ID",
        number: {
          equals: numericId,
        },
      },
    });
    console.log(response.results[0])

    if (response.results.length === 0) {
      console.log("Registro não encontrado");
      return null;
    }

    return response.results[0];
  } catch (error) {
    console.error('Erro ao buscar registro:', error);
    throw error;
  }
};

export const updateRecord = async (id: string, updateRecordDTO: UpdateRecordDTO) => {
  try {
    const record = await getRecordById(id);

    if (!record) {
      console.log("Não há registro para atualizar.");
      return;
    }

    const propertiesToUpdate: Record<string, any> = {};

    if (updateRecordDTO.company) {
      propertiesToUpdate.Company = {
        title: [
          {
            text: {
              content: updateRecordDTO.company,
            },
          },
        ],
      };
    };

    if (updateRecordDTO.campaign) {
      propertiesToUpdate.Campaign = {
        rich_text: [
          {
            text: {
              content: updateRecordDTO.campaign,
            },
          },
        ],
      };
    };

    if (updateRecordDTO.description) {
      propertiesToUpdate.Description = {
        rich_text: [
          {
            text: {
              content: updateRecordDTO.description,
            },
          },
        ],
      };
    };

    if (updateRecordDTO.where) {
      propertiesToUpdate.Where = {
        rich_text: [
          {
            text: {
              content: updateRecordDTO.where,
            },
          },
        ],
      };
    };

    if (updateRecordDTO.language) {
      propertiesToUpdate.Language = {
        select: {
          name: updateRecordDTO.language,
        },
      };
    };

    if (updateRecordDTO.imageFile && updateRecordDTO.imageFile.url) {
      propertiesToUpdate.Image = {
        files: [
          {
            name: updateRecordDTO.imageFile.name || '',
            external: { url: updateRecordDTO.imageFile.url },
          },
        ],
      };
    };

    if (updateRecordDTO.imageContent) {
      propertiesToUpdate.ImageContent = {
        rich_text: [
          {
            text: {
              content: updateRecordDTO.imageContent,
            },
          },
        ],
      };
    };

    const pageId = record.id;
    const response = await notionClient.pages.update({
      page_id: pageId,
      properties: propertiesToUpdate,
    });

    return response;
  } catch (error) {
    console.error('Erro ao atualizar registro:', error);
    throw error;
  }
};

export const deleteRecord = async (id: string) => {
  try {
    const record = await getRecordById(id);

    if (!record) {
      console.log("Registro não encontrado");
      return null;
    }

    const recordId = record.id;

    const deleteResponse = await notionClient.blocks.delete({
      block_id: recordId,
    });

    console.log("Registro deletado com sucesso");
    return deleteResponse;
  } catch (error) {
    console.error("Erro ao excluir registro:", error);
    throw error;
  }
};

