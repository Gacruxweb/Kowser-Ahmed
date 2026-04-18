export type WindowType = 'about' | 'projects' | 'skills' | 'contact' | 'settings' | 'resume' | 'mycomputer' | 'project-detail' | 'media' | 'doodledev' | 'paint' | 'pinball' | 'solitaire' | 'angrybirds' | 'redball' | 'cmd' | 'viewer' | 'browser';

export interface WindowState {
  id: string; // Unique ID for the window instance
  type: WindowType; // The type of app
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  params?: any; // Additional parameters for the window (e.g., projectId)
  position?: { x: number; y: number };
  size?: { width: number | string; height: number | string };
  snapMode?: 'none' | 'left' | 'right' | 'top';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
}
