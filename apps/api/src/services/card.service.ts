import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ProjectCardSchema, SkillCardSchema, ContactCardSchema, ResumeCardSchema, InfoCardSchema } from '../schemas/structured-output.schema';
import { loadUserInfo, formatUserInfoForPrompt } from './context.service';

const structuredModel = new ChatOpenAI({
  modelName: process.env.OPENAI_MODEL || 'gpt-4o',
  temperature: 0.7,
  streaming: false,
});

const messageModel = new ChatOpenAI({
  modelName: process.env.OPENAI_MODEL || 'gpt-4o',
  temperature: 0.7,
  streaming: false,
});

const systemPrompt = formatUserInfoForPrompt(loadUserInfo());

interface CardResponse {
  structuredData: any;
  message: string;
}

export async function getMeCard(): Promise<CardResponse> {
  const userInfo = loadUserInfo();
  
  // Generate structured data
  const infoPrompt = ChatPromptTemplate.fromMessages([
    ['system', systemPrompt + '\n\nGenerate an info card about yourself. Return only valid JSON matching the schema.'],
    ['human', 'Generate an info card about yourself with your bio, background, and key information.'],
  ]);

  const infoChain = infoPrompt.pipe(
    structuredModel.withStructuredOutput(InfoCardSchema)
  );

  const structuredData = await infoChain.invoke({});

  // Generate message
  const messagePrompt = ChatPromptTemplate.fromMessages([
    ['system', systemPrompt + '\n\nProvide a professional introduction about yourself. You are speaking to a potential employer, client, or hiring manager. Use the information provided above. Write in FIRST PERSON (use "I", "my", "me"). Be confident and professional.'],
    ['human', 'Tell me about yourself. Who are you?'],
  ]);

  const messageChain = messagePrompt.pipe(messageModel);
  const messageResponse = await messageChain.invoke({});
  const message = typeof messageResponse.content === 'string' ? messageResponse.content : String(messageResponse.content);

  return { structuredData, message };
}

export async function getProjectsCard(): Promise<CardResponse & { projects?: any[] }> {
  const userInfo = loadUserInfo();
  
  // Get all projects from user-info.json
  const projects = userInfo.projects || [];
  
  // Return the first project as structuredData (for compatibility)
  const firstProject = projects[0];
  
  let structuredData;
  if (firstProject) {
    structuredData = {
      type: 'project',
      title: firstProject.title,
      description: firstProject.description,
      year: firstProject.year,
      technologies: firstProject.technologies || [],
      links: firstProject.links || [],
    };
  } else {
    // Generate if not in user-info.json
    const projectPrompt = ChatPromptTemplate.fromMessages([
      ['system', systemPrompt + '\n\nGenerate a project card. Return only valid JSON matching the schema.'],
      ['human', 'Generate a project card with details about one of your projects.'],
    ]);

    const projectChain = projectPrompt.pipe(
      structuredModel.withStructuredOutput(ProjectCardSchema)
    );

    structuredData = await projectChain.invoke({});
  }

  // Generate message - concise summary that adds value, not repeating card details
  const messagePrompt = ChatPromptTemplate.fromMessages([
    ['system', systemPrompt + '\n\nProvide a brief, engaging summary about the projects. Do NOT repeat the project details that are already visible in the card. Instead, provide context, insights, or what makes these projects special. Keep it concise (2-3 sentences max). Write in FIRST PERSON (use "I", "my", "me" - NOT "your", "you"). You are speaking as the person, not about them.'],
    ['human', 'Give me a brief summary about my projects that adds value beyond what\'s shown in the cards.'],
  ]);

  const messageChain = messagePrompt.pipe(messageModel);
  const messageResponse = await messageChain.invoke({});
  const message = typeof messageResponse.content === 'string' ? messageResponse.content : String(messageResponse.content);

  // Convert all projects to ProjectCardData format
  const allProjects = projects.map((p) => ({
    type: 'project' as const,
    title: p.title,
    description: p.description,
    year: p.year,
    technologies: p.technologies || [],
    links: p.links || [],
  }));

  return { structuredData, message, projects: allProjects };
}

export async function getSkillsCard(): Promise<CardResponse> {
  const userInfo = loadUserInfo();
  
  // Get skills from user-info.json
  const skills = userInfo.skills || [];
  
  let structuredData;
  if (skills.length > 0) {
    // Combine all skill categories into one or use the first category
    const firstCategory = skills[0];
    structuredData = {
      type: 'skill',
      category: firstCategory.category,
      skills: firstCategory.skills,
    };
  } else {
    // Generate if not in user-info.json
    const skillPrompt = ChatPromptTemplate.fromMessages([
      ['system', systemPrompt + '\n\nGenerate a skill card. Return only valid JSON matching the schema.'],
      ['human', 'Generate a skill card with your skills.'],
    ]);

    const skillChain = skillPrompt.pipe(
      structuredModel.withStructuredOutput(SkillCardSchema)
    );

    structuredData = await skillChain.invoke({});
  }

  // Generate message
  const messagePrompt = ChatPromptTemplate.fromMessages([
    ['system', systemPrompt + '\n\nProvide information about your skills. Write in FIRST PERSON (use "I", "my", "me" - NOT "your", "you"). You are speaking as the person, not about them.'],
    ['human', 'Tell me about your skills.'],
  ]);

  const messageChain = messagePrompt.pipe(messageModel);
  const messageResponse = await messageChain.invoke({});
  const message = typeof messageResponse.content === 'string' ? messageResponse.content : String(messageResponse.content);

  return { structuredData, message };
}

export async function getContactCard(): Promise<CardResponse> {
  const userInfo = loadUserInfo();
  
  // Get contact info from user-info.json
  const contactInfo = userInfo.contactInfo;
  
  let structuredData;
  if (contactInfo) {
    structuredData = {
      type: 'contact',
      email: contactInfo.email,
      phone: contactInfo.phone,
      location: contactInfo.location,
      socialLinks: contactInfo.socialLinks || [],
    };
  } else {
    // Generate if not in user-info.json
    const contactPrompt = ChatPromptTemplate.fromMessages([
      ['system', systemPrompt + '\n\nGenerate a contact card. Return only valid JSON matching the schema.'],
      ['human', 'Generate a contact card with your contact information.'],
    ]);

    const contactChain = contactPrompt.pipe(
      structuredModel.withStructuredOutput(ContactCardSchema)
    );

    structuredData = await contactChain.invoke({});
  }

  // Generate message
  const messagePrompt = ChatPromptTemplate.fromMessages([
    ['system', systemPrompt + '\n\nProvide your contact information. Write in FIRST PERSON (use "I", "my", "me" - NOT "your", "you"). You are speaking as the person, not about them.'],
    ['human', 'How can I contact you?'],
  ]);

  const messageChain = messagePrompt.pipe(messageModel);
  const messageResponse = await messageChain.invoke({});
  const message = typeof messageResponse.content === 'string' ? messageResponse.content : String(messageResponse.content);

  return { structuredData, message };
}

export async function getResumeCard(): Promise<CardResponse> {
  const userInfo = loadUserInfo();
  
  // Get resume from user-info.json
  const resume = userInfo.resume;
  
  let structuredData;
  if (resume) {
    structuredData = {
      type: 'resume',
      name: resume.name,
      title: resume.title,
      format: resume.format,
      updatedDate: resume.updatedDate,
      size: resume.size,
      url: resume.url,
    };
  } else {
    // Generate if not in user-info.json
    const resumePrompt = ChatPromptTemplate.fromMessages([
      ['system', systemPrompt + '\n\nGenerate a resume card. Return only valid JSON matching the schema.'],
      ['human', 'Generate a resume card with resume information.'],
    ]);

    const resumeChain = resumePrompt.pipe(
      structuredModel.withStructuredOutput(ResumeCardSchema)
    );

    structuredData = await resumeChain.invoke({});
  }

  // Generate message
  const messagePrompt = ChatPromptTemplate.fromMessages([
    ['system', systemPrompt + '\n\nProvide information about your resume. Write in FIRST PERSON (use "I", "my", "me" - NOT "your", "you"). You are speaking as the person, not about them.'],
    ['human', 'Show me your resume.'],
  ]);

  const messageChain = messagePrompt.pipe(messageModel);
  const messageResponse = await messageChain.invoke({});
  const message = typeof messageResponse.content === 'string' ? messageResponse.content : String(messageResponse.content);

  return { structuredData, message };
}

export async function getFunCard(): Promise<CardResponse> {
  const userInfo = loadUserInfo();
  
  // Get fun facts from user-info.json
  const funFacts = userInfo.funFacts || [];
  
  // Generate structured data
  const funPrompt = ChatPromptTemplate.fromMessages([
    ['system', systemPrompt + '\n\nGenerate an info card about fun facts or interesting things about yourself. Return only valid JSON matching the schema.'],
    ['human', 'Generate an info card with fun facts about yourself.'],
  ]);

  const funChain = funPrompt.pipe(
    structuredModel.withStructuredOutput(InfoCardSchema)
  );

  const structuredData = await funChain.invoke({});

  // Generate message
  const messagePrompt = ChatPromptTemplate.fromMessages([
    ['system', systemPrompt + '\n\nShare something fun or interesting about yourself. Write in FIRST PERSON (use "I", "my", "me" - NOT "your", "you"). You are speaking as the person, not about them.'],
    ['human', 'Tell me something fun about yourself.'],
  ]);

  const messageChain = messagePrompt.pipe(messageModel);
  const messageResponse = await messageChain.invoke({});
  const message = typeof messageResponse.content === 'string' ? messageResponse.content : String(messageResponse.content);

  return { structuredData, message };
}

