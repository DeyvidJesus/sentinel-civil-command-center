"use client";

import { useState } from "react";
import { X, Plus, AlertCircle } from "lucide-react";
import { reportRepository } from "@/repositories/report.repository";
import { Report } from "@/types";

interface CreateReportModalProps {
  onClose: () => void;
}

export function CreateReportModal({ onClose }: CreateReportModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const latitude = parseFloat(formData.get("latitude") as string);
    const longitude = parseFloat(formData.get("longitude") as string);
    const confidenceScore = parseInt(formData.get("confidenceScore") as string);

    try {
      await reportRepository.createReport({
        title,
        description,
        latitude,
        longitude,
        confidenceScore,
        status: "Em Análise", // Default status
        imageUrl: "", // Left blank for this simple test modal
      });
      onClose(); // Close on success
    } catch (err: any) {
      console.error(err);
      setError("Falha ao criar ocorrência. Verifique suas credenciais do Firebase.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-card border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Plus className="h-5 w-5 text-primary" /> Nova Ocorrência
          </h2>
          <button 
            onClick={onClose}
            className="h-8 w-8 rounded-md flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {error && (
            <div className="p-3 bg-status-critical/10 border border-status-critical/30 rounded-lg flex gap-2 items-start text-status-critical text-sm">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">Título do Incidente</label>
            <input required name="title" className="w-full bg-background border border-border rounded-md p-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Ex: Foco de Incêndio na Serra" />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">Descrição</label>
            <textarea required name="description" rows={3} className="w-full bg-background border border-border rounded-md p-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none" placeholder="Detalhes da ocorrência..."></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Latitude</label>
              <input required name="latitude" type="number" step="any" className="w-full bg-background border border-border rounded-md p-2 text-sm focus:outline-none focus:border-primary" placeholder="-23.5505" defaultValue="-23.5505" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Longitude</label>
              <input required name="longitude" type="number" step="any" className="w-full bg-background border border-border rounded-md p-2 text-sm focus:outline-none focus:border-primary" placeholder="-46.6333" defaultValue="-46.6333" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">Score de Confiança (0-100)</label>
            <input required name="confidenceScore" type="number" min="0" max="100" className="w-full bg-background border border-border rounded-md p-2 text-sm focus:outline-none focus:border-primary" placeholder="85" defaultValue="85" />
          </div>

          <div className="pt-2 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 bg-muted hover:bg-muted/80 rounded-md text-sm font-medium transition-colors">
              Cancelar
            </button>
            <button disabled={loading} type="submit" className="flex-1 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md text-sm font-medium transition-colors disabled:opacity-50">
              {loading ? "Registrando..." : "Registrar Alerta"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
