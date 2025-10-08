export interface User {
  id: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export interface Summary {
  id: string;
  user_id: string;
  title: string;
  original_content: string;
  summary_content: string;
  content_type: 'pdf' | 'text';
  original_length: number;
  summary_length: number;
  created_at: string;
}

export type PageType = 'intro' | 'home' | 'dashboard' | 'upload' | 'processing' | 'results';

export interface ProcessingState {
  isProcessing: boolean;
  progress: number;
  message: string;
}
