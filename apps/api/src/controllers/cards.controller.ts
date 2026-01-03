import { Request, Response } from 'express';
import {
  getMeCard,
  getProjectsCard,
  getSkillsCard,
  getContactCard,
  getResumeCard,
  getFunCard,
} from '../services/card.service';

export async function meController(req: Request, res: Response) {
  try {
    const { structuredData, message } = await getMeCard();
    res.json({ structuredData, message });
  } catch (error: any) {
    console.error('Error in meController:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

export async function projectsController(req: Request, res: Response) {
  try {
    const result = await getProjectsCard();
    res.json({ structuredData: result.structuredData, message: result.message, projects: result.projects });
  } catch (error: any) {
    console.error('Error in projectsController:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

export async function skillsController(req: Request, res: Response) {
  try {
    const { structuredData, message } = await getSkillsCard();
    res.json({ structuredData, message });
  } catch (error: any) {
    console.error('Error in skillsController:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

export async function contactController(req: Request, res: Response) {
  try {
    const { structuredData, message } = await getContactCard();
    res.json({ structuredData, message });
  } catch (error: any) {
    console.error('Error in contactController:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

export async function resumeController(req: Request, res: Response) {
  try {
    const { structuredData, message } = await getResumeCard();
    res.json({ structuredData, message });
  } catch (error: any) {
    console.error('Error in resumeController:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

export async function funController(req: Request, res: Response) {
  try {
    const { structuredData, message } = await getFunCard();
    res.json({ structuredData, message });
  } catch (error: any) {
    console.error('Error in funController:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

