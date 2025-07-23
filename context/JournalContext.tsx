import React, { createContext, useContext, useState } from 'react';

type JournalEntry = {
  mood: string | null;
  note: string;
  timestamp: string;
};

type JournalContextType = {
  entries: JournalEntry[];
  addEntry: (entry: JournalEntry) => void;
};

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export const JournalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  const addEntry = (entry: JournalEntry) => {
    setEntries(prev => [entry, ...prev]);
  };

  return (
    <JournalContext.Provider value={{ entries, addEntry }}>
      {children}
    </JournalContext.Provider>
  );
};

export const useJournal = () => {
  const context = useContext(JournalContext);
  if (!context) throw new Error("useJournal must be used within a JournalProvider");
  return context;
};