export interface ComplaintFormState {
  number: string;
  name: string;
  id: string;
  org: string;
  violator: string;
  description: string;
  date: string;
  materials: string;
  passport: string;
  discord: string;
}

export interface GeneratedComplaint {
  title: string;
  body: string;
}

export interface ConsultationFormState {
  webhookUrl: string;
  name: string;
  id: string;
  contact: string;
  topic: string;
}

export interface FAQItem {
  question: string;
  answer: React.ReactNode;
}