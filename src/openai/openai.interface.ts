export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface CompanyData {
  product: string;
  brand: string;
  model: string;
  price: string;
  year: string;
  kilometers: string;
}

export interface Request {
  msgHist: Message[];
  ideal: string[];
  agentOutput: string[];
  companyData: CompanyData[];
}
  
export interface Response {
  response: string;
}