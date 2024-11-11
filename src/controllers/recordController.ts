import { Request, Response } from 'express';
import * as recordService from '../services/recordService';

export const createRecord = async (req: Request, res: Response) => {
  try {
    const { 
      company, 
      campaign, 
      description, 
      where, 
      language, 
      imageFile, 
      imageContent 
    } = req.body;
    const response = await recordService.createRecord({
      company,
      campaign,
      description,
      where,
      language,
      imageFile,
      imageContent
    });
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar registro' });
  }
};

export const getRecordById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await recordService.getRecordById(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ error: 'Registro não encontrado' });
  }
};

export const updateRecord = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { 
      company, 
      campaign, 
      description, 
      where, 
      language, 
      imageFile, 
      imageContent 
    } = req.body;
    const response = await recordService.updateRecord(id, {
      company, 
      campaign, 
      description, 
      where, 
      language, 
      imageFile, 
      imageContent });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar registro' });
  }
};

export const deleteRecord = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await recordService.deleteRecord(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar registro' });
  }
};
