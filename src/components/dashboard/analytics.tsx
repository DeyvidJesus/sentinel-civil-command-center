"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAnalytics } from '@/hooks/use-dashboard';
import { AlertCircle } from 'lucide-react';

export function Analytics() {
  const { data: analytics, isLoading, isError } = useAnalytics();

  return (
    <div className="flex flex-col h-full rounded-xl border border-border bg-card">
      <div className="px-5 py-4 border-b border-border">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">Tendência de Incidentes (24h)</h3>
        <p className="text-sm text-muted-foreground mt-1">Evolução temporal por nível de severidade</p>
      </div>
      <div className="flex-1 p-5 min-h-[250px] relative">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-card/80 backdrop-blur-sm">
             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
             <p className="text-sm text-muted-foreground">Processando dados...</p>
          </div>
        )}
        
        {isError && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-card/80 backdrop-blur-sm text-status-critical">
             <AlertCircle className="h-8 w-8 mb-4" />
             <p className="text-sm font-medium">Erro ao carregar gráficos.</p>
          </div>
        )}

        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={analytics?.timeSeriesData || []}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#a1a1aa', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#a1a1aa', fontSize: 12 }} 
            />
            <Tooltip 
              cursor={{ fill: '#1e1e24' }}
              contentStyle={{ backgroundColor: '#121214', borderColor: '#27272a', borderRadius: '8px' }}
              itemStyle={{ color: '#fafafa', fontSize: '13px' }}
              labelStyle={{ color: '#a1a1aa', marginBottom: '4px', fontSize: '13px' }}
            />
            <Bar dataKey="critical" stackId="a" fill="#ef4444" radius={[0, 0, 4, 4]} name="Críticos" />
            <Bar dataKey="warning" stackId="a" fill="#f59e0b" name="Alertas" />
            <Bar dataKey="stable" stackId="a" fill="#10b981" radius={[4, 4, 0, 0]} name="Estáveis" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
