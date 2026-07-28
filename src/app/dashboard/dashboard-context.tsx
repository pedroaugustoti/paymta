"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useSession } from "next-auth/react";

interface DashboardContextType {
  settings: Record<string, unknown> | null;
  loading: boolean;
  refreshSettings: () => Promise<void>;
  updateSettingsLocally: (newValues: Record<string, unknown>) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  // Retornando a autenticação real
  const { status } = useSession();

  const [settings, setSettings] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/user/settings");
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
      }
    } catch (err) {
      console.error("Erro ao carregar configurações globais:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchSettings();
    }
  }, [status]);

  const updateSettingsLocally = (newValues: Record<string, unknown>) => {
    setSettings((prev) => (prev ? { ...prev, ...newValues } : { ...newValues }));
  };

  return (
    <DashboardContext.Provider value={{ settings, loading, refreshSettings: fetchSettings, updateSettingsLocally }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard deve ser usado dentro de um DashboardProvider");
  }
  return context;
}