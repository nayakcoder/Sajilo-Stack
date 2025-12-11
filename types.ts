export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image?: string; // Optional background image for feature cards
  isComingSoon?: boolean;
}

export enum MessageRole {
  USER = 'user',
  MODEL = 'model'
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  timestamp: Date;
}

export interface NavItem {
  label: string;
  href: string;
}