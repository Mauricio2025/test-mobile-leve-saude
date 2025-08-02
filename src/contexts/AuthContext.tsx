import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Profile = {
  uid: string;
  name: string;
  email: string;
  accessLevel: 'user' | 'admin';
};

type AuthContextType = {
  profile: Profile | null;
  setProfile: (p: Profile) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  return (
    <AuthContext.Provider value={{ profile, setProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
