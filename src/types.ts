export interface Education {
  time: string;
  degree: string;
  desc?: string;
}

export interface Experience {
  time: string;
  role: string;
  desc?: string;
}

export interface Certification {
  name: string;
  icon?: string;
}

export interface AcademicHighlight {
  type: string;
  title: string;
  desc: string;
  year?: string;
  journal?: string;
  tags?: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
