import React from 'react';
import { CheckCircle, AlertTriangle, DollarSign, Settings, Zap, Shield } from 'lucide-react';

const TechnicalGuide: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Platform Recommendations */}
      <section className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Zap className="text-blue-600" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">Recomendación de Plataforma</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="text-green-600" size={20} />
              <h3 className="font-bold text-green-800">RECOMENDADO</h3>
            </div>
            <h4 className="font-semibold text-lg mb-2">WhatsApp Business API + Chatfuel</h4>
            <div className="space-y-2 text-sm">
              <p><strong>Costo:</strong> $49-99 USD/mes</p>
              <p><strong>Conversaciones:</strong> 1,000 gratuitas/mes</p>
              <p><strong>Ventajas:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Fácil configuración</li>
                <li>Integración nativa con WhatsApp</li>
                <li>Soporte en español</li>
                <li>Analytics completos</li>
                <li>Escalamiento automático</li>
              </ul>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-lg mb-2">ManyChat</h4>
            <div className="space-y-2 text-sm">
              <p><strong>Costo:</strong> $15-45 USD/mes</p>
              <p><strong>Conversaciones:</strong> 1,000 gratuitas/mes</p>
              <p><strong>Ventajas:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Interface intuitiva</li>
                <li>Plantillas prediseñadas</li>
                <li>Automaciones avanzadas</li>
              </ul>
              <p className="text-orange-600"><strong>Limitación:</strong> Solo inglés</p>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-lg mb-2">Desarrollo Personalizado</h4>
            <div className="space-y-2 text-sm">
              <p><strong>Costo:</strong> $2,000-5,000 USD inicial</p>
              <p><strong>Mensual:</strong> $100-300 USD hosting</p>
              <p><strong>Ventajas:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Control total</li>
                <li>Integraciones personalizadas</li>
                <li>Sin limitaciones</li>
              </ul>
              <p className="text-red-600"><strong>Desventaja:</strong> Alto costo inicial</p>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Guide */}
      <section className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Settings className="text-blue-600" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">Guía de Implementación</h2>
        </div>

        <div className="space-y-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-bold text-lg mb-2">Fase 1: Configuración Inicial (Semana 1)</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="text-green-500 mt-1" size={16} />
                <span>Crear cuenta WhatsApp Business API con Meta</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="text-green-500 mt-1" size={16} />
                <span>Verificar número telefónico empresarial</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="text-green-500 mt-1" size={16} />
                <span>Configurar perfil empresarial (logo, descripción, horarios)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="text-green-500 mt-1" size={16} />
                <span>Registrar webhook URL con SSL</span>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-bold text-lg mb-2">Fase 2: Desarrollo del Bot (Semana 2-3)</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="text-green-500 mt-1" size={16} />
                <span>Implementar flujo conversacional principal</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="text-green-500 mt-1" size={16} />
                <span>Configurar menús interactivos y respuestas rápidas</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="text-green-500 mt-1" size={16} />
                <span>Integrar sistema de escalamiento a agente humano</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="text-green-500 mt-1" size={16} />
                <span>Configurar horarios y mensajes automáticos</span>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-bold text-lg mb-2">Fase 3: Pruebas y Optimización (Semana 4)</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="text-green-500 mt-1" size={16} />
                <span>Pruebas internas con casos de uso reales</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="text-green-500 mt-1" size={16} />
                <span>Beta testing con clientes seleccionados</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="text-green-500 mt-1" size={16} />
                <span>Ajustes basados en retroalimentación</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="text-green-500 mt-1" size={16} />
                <span>Configuración final de analytics y reportes</span>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-green-500 pl-4 bg-green-50">
            <h3 className="font-bold text-lg mb-2">Fase 4: Lanzamiento (Semana 5)</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="text-green-500 mt-1" size={16} />
                <span>Activación oficial del chatbot</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="text-green-500 mt-1" size={16} />
                <span>Comunicación a base de clientes existente</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="text-green-500 mt-1" size={16} />
                <span>Monitoreo 24/7 durante primera semana</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="text-green-500 mt-1" size={16} />
                <span>Capacitación del equipo de soporte</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Código Base de Implementación</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Webhook Handler (Node.js)</h3>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`const express = require('express');
const app = express();

app.post('/webhook', (req, res) => {
  const message = req.body.entry[0].changes[0].value.messages[0];
  const phoneNumber = message.from;
  const messageText = message.text.body;
  
  // Procesar mensaje del chatbot
  const response = processMessage(messageText);
  
  // Enviar respuesta
  sendWhatsAppMessage(phoneNumber, response);
  
  res.status(200).send('OK');
});

function processMessage(text) {
  const input = text.toLowerCase();
  
  if (input.includes('hola') || input.includes('inicio')) {
    return getWelcomeMessage();
  }
  
  if (input.includes('reparacion')) {
    return getRepairMenu();
  }
  
  // Más lógica del chatbot...
  return getDefaultResponse();
}`}
            </pre>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Envío de Mensajes</h3>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`function sendWhatsAppMessage(to, message) {
  const options = {
    method: 'POST',
    url: 'https://graph.facebook.com/v17.0/PHONE_NUMBER_ID/messages',
    headers: {
      'Authorization': 'Bearer ACCESS_TOKEN',
      'Content-Type': 'application/json'
    },
    data: {
      messaging_product: 'whatsapp',
      to: to,
      type: 'text',
      text: { body: message }
    }
  };
  
  return axios(options);
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Escalation Criteria */}
      <section className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="text-orange-600" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">Criterios de Escalamiento</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-lg mb-3 text-green-700">✅ Casos que Maneja el Bot</h3>
            <ul className="space-y-2 text-sm">
              <li>• Consultas de precios estándar</li>
              <li>• Información de servicios básicos</li>
              <li>• Horarios y ubicación</li>
              <li>• Preguntas frecuentes generales</li>
              <li>• Agendamiento de citas básicas</li>
              <li>• Estado de reparaciones (con código)</li>
              <li>• Información de garantías</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-3 text-red-700">🚨 Casos que Requieren Agente</h3>
            <ul className="space-y-2 text-sm">
              <li>• Reclamos y quejas específicas</li>
              <li>• Cotizaciones empresariales complejas</li>
              <li>• Problemas técnicos específicos</li>
              <li>• Negociaciones de precios</li>
              <li>• Casos de garantía disputados</li>
              <li>• Solicitudes de devolución</li>
              <li>• Consultas sobre proyectos grandes</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">Palabras Clave para Escalamiento Automático:</h4>
          <p className="text-sm text-yellow-700">
            "agente", "humano", "persona", "operador", "reclamo", "queja", "problema", "error", "mal servicio", "hablar con", "gerente", "supervisor"
          </p>
        </div>
      </section>

      {/* Metrics */}
      <section className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <DollarSign className="text-green-600" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">Métricas Recomendadas</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">85%</div>
            <p className="text-sm text-gray-600">Tasa de Resolución Automática</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{'< 30s'}</div>
            <p className="text-sm text-gray-600">Tiempo de Respuesta Promedio</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">4.5/5</div>
            <p className="text-sm text-gray-600">Satisfacción del Cliente</p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <h4 className="font-semibold">KPIs Clave a Monitorear:</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <ul className="space-y-1">
              <li>• Número total de conversaciones</li>
              <li>• Tasa de escalamiento a agente</li>
              <li>• Tiempo promedio de resolución</li>
              <li>• Horarios de mayor actividad</li>
            </ul>
            <ul className="space-y-1">
              <li>• Consultas más frecuentes</li>
              <li>• Tasa de abandono de conversación</li>
              <li>• Conversiones (cotizaciones a ventas)</li>
              <li>• Retroalimentación de clientes</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
};

export default TechnicalGuide;