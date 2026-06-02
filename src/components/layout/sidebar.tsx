import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export function Sidebar() {
  return (
    <div className="flex flex-col w-64 border-r border-border bg-card" id="tour-sidebar">
      <div className="flex h-16 shrink-0 items-center gap-3 px-6 border-b border-border">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/20 text-primary">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <span className="text-lg font-bold tracking-tight">SentinelCivil</span>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto pt-6 px-4 pb-4">
        <nav className="flex-1 space-y-1">
          {/* Menu items have been removed */}
        </nav>
        <div className="mt-auto">
          <div className="rounded-lg bg-muted/30 p-4 border border-border/50">
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-status-stable ring-2 ring-card"></span>
                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-xs font-semibold">
                  OP
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Operador 01</span>
                <span className="text-xs text-muted-foreground">Centro de Comando</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
