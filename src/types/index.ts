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
  content: string;
  originalLength: number;
  summaryLength: number;
  createdAt: string;
}

export type PageType = 'intro' | 'upload' | 'processing' | 'results';

export interface ProcessingState {
  isProcessing: boolean;
  progress: number;
  message: string;
}
