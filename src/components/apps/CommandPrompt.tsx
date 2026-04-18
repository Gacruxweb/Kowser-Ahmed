import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CommandPromptProps {
  isMaximized?: boolean;
  onOpenApp?: (id: string, type?: any, title?: string, params?: any) => void;
}

export const CommandPrompt: React.FC<CommandPromptProps> = ({ isMaximized, onOpenApp }) => {
  const [history, setHistory] = useState<string[]>([
    'Microsoft Windows [Version 5.1.2600]',
    '(C) Copyright 1985-2001 Microsoft Corp.',
    '',
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    const currentPath = 'C:\\Documents and Settings\\Kowser>';
    
    let response = '';
    
    if (cmd === 'help') {
      response = 'Available commands: help, cls, dir, whoami, exit, echo, ver, date, time';
    } else if (cmd === 'cls') {
      setHistory([]);
      setInput('');
      return;
    } else if (cmd === 'whoami') {
      response = 'kowser_ahmed';
    } else if (cmd === 'dir') {
      response = ' Volume in drive C has no label.\n Volume Serial Number is 1234-5678\n\n Directory of C:\\Documents and Settings\\Kowser\n\n04/17/2026  04:20 PM    <DIR>          .\n04/17/2026  04:20 PM    <DIR>          ..\n04/17/2026  04:20 PM               124 README.txt\n04/17/2026  04:20 PM             1,024 portfolio.exe\n               2 File(s)          1,148 bytes\n               2 Dir(s)  10,000,000,000 bytes free';
    } else if (cmd === 'ver') {
      response = 'Microsoft Windows XP [Version 5.1.2600]';
    } else if (cmd === 'date') {
      response = `The current date is: ${new Date().toLocaleDateString()}`;
    } else if (cmd === 'time') {
      response = `The current time is: ${new Date().toLocaleTimeString()}`;
    } else if (cmd.startsWith('echo ')) {
      response = input.substring(5);
    } else if (cmd.startsWith('open-')) {
      const appName = cmd.substring(5).trim();
      const apps: Record<string, { id: string, type?: string }> = {
        'my computer': { id: 'mycomputer' },
        'internet explorer': { id: 'browser' },
        'browser': { id: 'browser' },
        'about': { id: 'about' },
        'projects': { id: 'projects' },
        'skills': { id: 'skills' },
        'resume': { id: 'resume' },
        'contact': { id: 'contact' },
        'paint': { id: 'paint' },
        'media player': { id: 'media' },
        'music player': { id: 'music' },
        'doodledev': { id: 'doodledev' },
        'pinball': { id: 'pinball' },
        'solitaire': { id: 'solitaire' },
        'angry birds': { id: 'angrybirds' },
        'red ball': { id: 'redball' },
        'calculator': { id: 'settings' }
      };

      if (apps[appName]) {
        onOpenApp?.(apps[appName].id, apps[appName].type as any);
        response = `Opening ${appName}...`;
      } else {
        response = `'${appName}' is not a recognized program or page name.`;
      }
    } else if (cmd === '') {
      response = '';
    } else {
      response = `'${cmd}' is not recognized as an internal or external command,\noperable program or batch file.`;
    }

    setHistory(prev => [...prev, `${currentPath} ${input}`, response, '']);
    setInput('');
  };

  const handleClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div 
      className="w-full h-full bg-black text-[#cccccc] font-mono text-sm p-2 overflow-y-auto selection:bg-[#ffffff] selection:text-[#000000] cursor-text"
      onClick={handleClick}
      style={{ fontFamily: '"Lucida Console", Monaco, monospace' }}
    >
      <div className="flex flex-col min-h-full">
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap break-all min-h-[1.2em]">
            {line}
          </div>
        ))}
        
        <form onSubmit={handleCommand} className="flex">
          <span className="shrink-0 mr-2">C:\Documents and Settings\Kowser&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-transparent border-none outline-none text-[#cccccc] flex-grow p-0 font-mono text-sm focus:ring-0"
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
        </form>
        <div ref={bottomRef} className="h-4" />
      </div>
    </div>
  );
};
