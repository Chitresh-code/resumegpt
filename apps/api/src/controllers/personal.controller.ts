import { Request, Response } from 'express';
import { loadUserInfo } from '../services/context.service';

export async function personalInfoController(req: Request, res: Response) {
  try {
    const userInfo = loadUserInfo();
    res.json({ personalInfo: userInfo.personalInfo });
  } catch (error: any) {
    console.error('Error in personalInfoController:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

