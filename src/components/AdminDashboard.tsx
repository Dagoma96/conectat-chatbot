import React, { useState } from 'react';
import { BarChart3, Users, MessageSquare, Clock, TrendingUp, Settings, Bell, Download } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const metrics = {
    totalConversations: 1247,
    activeUsers: 89,
    resolutionRate: 87,
    avgResponseTime: 25,
    escalationRate: 13,
    satisfaction: 4.6
  };

  const recentActivity = [
    { id: 1, user: 'Usuario +57 300 123 4567', action: 'Consultó precios de reparación', time: '2 minutos', status: 'Resuelto por bot' },
    { id: 2, user: 'Usuario +57 310 987 6543', action: 'Solicitó cotización empresarial', time: '5 minutos', status: 'Escalado a agente' },
    { id: 3, user: 'Usuario +57 320 555 1234', action: 'Preguntó por garantías', time: '8 minutos', status: 'Resuelto por bot' },
    { id: 4, user: 'Usuario +57 315 777 8888', action: 'Reportó problema técnico', time: '12 minutos', status: 'Escalado a agente' },
    { id: 5, user: 'Usuario +57 301 444 9999', action: 'Consultó horarios de atención', time: '15 minutos', status: 'Resuelto por bot' }
  ];

  const topQueries = [
    { query: 'Precios de reparación', count: 145, percentage: 23 },
    { query: 'Horarios de atención', count: 98, percentage: 16 },
    { query: 'Información de garantía', count: 87, percentage: 14 },
    { query: 'Servicio a domicilio', count: 76, percentage: 12 },
    { query: 'Cotizaciones', count: 65, percentage: 10 }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard ConectaT Bot</h1>
        <div className="flex items-center gap-3">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1d">Último día</option>
            <option value="7d">Últimos 7 días</option>
            <option value="30d">Últimos 30 días</option>
            <option value="90d">Últimos 90 días</option>
          </select>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            <Download size={16} />
            Exportar
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Conversaciones Totales</p>
              <p className="text-2xl font-bold text-gray-800">{metrics.totalConversations.toLocaleString()}</p>
              <p className="text-sm text-green-600">+12% vs período anterior</p>
            </div>
            <MessageSquare className="text-blue-600" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Usuarios Activos</p>
              <p className="text-2xl font-bold text-gray-800">{metrics.activeUsers}</p>
              <p className="text-sm text-green-600">+8% vs período anterior</p>
            </div>
            <Users className="text-green-600" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tasa de Resolución</p>
              <p className="text-2xl font-bold text-gray-800">{metrics.resolutionRate}%</p>
              <p className="text-sm text-green-600">+3% vs período anterior</p>
            </div>
            <TrendingUp className="text-purple-600" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tiempo de Respuesta</p>
              <p className="text-2xl font-bold text-gray-800">{metrics.avgResponseTime}s</p>
              <p className="text-sm text-green-600">-5s vs período anterior</p>
            </div>
            <Clock className="text-orange-600" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Escalamiento</p>
              <p className="text-2xl font-bold text-gray-800">{metrics.escalationRate}%</p>
              <p className="text-sm text-yellow-600">+1% vs período anterior</p>
            </div>
            <Bell className="text-red-600" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Satisfacción</p>
              <p className="text-2xl font-bold text-gray-800">{metrics.satisfaction}/5</p>
              <p className="text-sm text-green-600">+0.2 vs período anterior</p>
            </div>
            <BarChart3 className="text-indigo-600" size={32} />
          </div>
        </div>
      </div>

      {/* Charts and Tables */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-lg">Actividad Reciente</h3>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {recentActivity.map(activity => (
                <div key={activity.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{activity.user}</p>
                    <p className="text-xs text-gray-600">{activity.action}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">hace {activity.time}</p>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      activity.status.includes('bot') 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Queries */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-lg">Consultas Más Frecuentes</h3>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {topQueries.map((query, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{query.query}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${query.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-sm font-semibold text-gray-800">{query.count}</p>
                    <p className="text-xs text-gray-500">{query.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Configuration Panel */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center gap-2">
          <Settings size={20} />
          <h3 className="font-semibold text-lg">Configuración del Bot</h3>
        </div>
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Configuración General</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Bot activo</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Respuestas automáticas fuera de horario</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Escalamiento automático</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Horarios de Atención</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Lunes - Viernes:</span>
                  <span className="font-medium">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábados:</span>
                  <span className="font-medium">9:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingos:</span>
                  <span className="font-medium text-red-600">Cerrado</span>
                </div>
                <button className="mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Editar horarios
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <div className="flex flex-wrap gap-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Guardar Cambios
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">
                Restaurar Configuración
              </button>
              <button className="border border-red-300 text-red-700 px-4 py-2 rounded-md hover:bg-red-50 transition-colors">
                Pausar Bot
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;