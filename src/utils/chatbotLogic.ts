export type ChatState = 
  | 'welcome' 
  | 'main_menu' 
  | 'repair_menu' 
  | 'sales_menu' 
  | 'accessories_menu' 
  | 'support_menu' 
  | 'home_service_menu'
  | 'business_menu'
  | 'contact_human'
  | 'quote_request';

export interface Button {
  label: string;
  url: string;
  target?: '_blank' | '_self';
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  buttons?: Button[];
}

export interface ChatResponse {
  message: Message;
  newState: ChatState;
}

class ChatbotLogic {
  // ✅ Configura aquí tu número de WhatsApp en formato internacional sin signos (+ ni espacios)
  // Ej: +57 304 375 6405  -> "573043756405"
  private whatsappNumber: string = '573043756405';

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  private createBotMessage(text: string, buttons?: Button[]): Message {
    return {
      id: this.generateId(),
      text,
      sender: 'bot',
      timestamp: new Date(),
      buttons
    };
  }

  // Construye el link de WhatsApp con mensaje prellenado
  private buildWhatsAppLink(message?: string): string {
    const base = `https://wa.me/${this.whatsappNumber}`;
    if (!message) return base;
    return `${base}?text=${encodeURIComponent(message)}`;
  }

  // Botón estándar de WhatsApp
  private buildWhatsAppButton(presetMessage: string): Button {
    return {
      label: '💬 Chatear por WhatsApp',
      url: this.buildWhatsAppLink(presetMessage),
      target: '_blank'
    };
  }

  // Botón de llamada al mismo número (formato tel:)
  private buildCallButton(): Button {
    return {
      label: '📞 Llamar ahora',
      url: `tel:+${this.whatsappNumber}`
    };
  }

  // Intenta abrir WhatsApp automáticamente y también notifica al padre (si está en iframe)
  private redirectToWhatsApp(presetMessage: string): void {
    const url = this.buildWhatsAppLink(presetMessage);
    try {
      if (typeof window !== 'undefined') {
        // Abrir en nueva pestaña
        try { window.open(url, '_blank'); } catch {}
        // Notificar al contenedor (por si gestionan la redirección desde fuera)
        try { window.parent?.postMessage({ type: 'redirect_to_whatsapp', url }, '*'); } catch {}
        // (Opcional) Si quieres forzar en la misma pestaña, descomenta:
        // try { window.location.assign(url); } catch {}
      }
    } catch {
      // Silencio: entorno no navegador
    }
  }

  // Análisis contextual inteligente
  private analyzeIntent(input: string): {
    intent: string;
    confidence: number;
    keywords: string[];
    needsEscalation: boolean;
  } {
    const normalizedInput = input.toLowerCase().trim();
    
    // Detección de escalamiento emocional/complejo
    const escalationKeywords = [
      'queja', 'reclamo', 'molesto', 'enojado', 'furioso', 'indignado',
      'terrible', 'pésimo', 'horrible', 'desastre', 'fraude', 'estafa',
      'demanda', 'abogado', 'superintendencia', 'defensor', 'consumidor',
      'gerente', 'supervisor', 'jefe', 'encargado', 'responsable',
      'reembolso', 'devolver dinero', 'cancelar', 'anular',
      'no funciona', 'dañado', 'defectuoso', 'malo'
    ];

    const needsEscalation = escalationKeywords.some(keyword => 
      normalizedInput.includes(keyword)
    ) || normalizedInput.includes('hablar con') || normalizedInput.includes('persona');

    // Detección de intenciones principales
    const intents = {
      greeting: ['hola', 'hi', 'buenos días', 'buenas tardes', 'buenas noches', 'buen día', 'saludos'],
      repair: ['reparar', 'arreglar', 'componer', 'dañado', 'roto', 'no funciona', 'falla', 'problema'],
      sales: ['comprar', 'vender', 'precio', 'costo', 'cuánto', 'venta', 'adquirir', 'cotizar'],
      accessories: ['accesorio', 'cargador', 'cable', 'funda', 'protector', 'auricular', 'mouse'],
      support: ['ayuda', 'soporte', 'asistencia', 'configurar', 'instalar', 'problema técnico'],
      home_service: ['domicilio', 'casa', 'visita', 'ir', 'llevar', 'recoger'],
      business: ['empresa', 'negocio', 'corporativo', 'oficina', 'proyecto', 'masivo'],
      warranty: ['garantía', 'garantia', 'cobertura', 'válida', 'tiempo'],
      schedule: ['horario', 'hora', 'cuándo', 'abierto', 'cerrado', 'atención'],
      location: ['dónde', 'ubicación', 'dirección', 'llegar', 'mapa'],
      human: ['asesor', 'agente', 'humano', 'persona', 'operador', 'hablar con']
    };

    let bestIntent = 'unknown';
    let maxMatches = 0;
    let matchedKeywords: string[] = [];

    for (const [intent, keywords] of Object.entries(intents)) {
      const matches = keywords.filter(keyword => normalizedInput.includes(keyword));
      if (matches.length > maxMatches) {
        maxMatches = matches.length;
        bestIntent = intent;
        matchedKeywords = matches;
      }
    }

    return {
      intent: bestIntent,
      confidence: maxMatches > 0 ? Math.min(maxMatches / 3, 1) : 0,
      keywords: matchedKeywords,
      needsEscalation
    };
  }

  // Redirección inteligente a menús específicos
  private getSmartRedirection(intent: string): { message: string; newState: ChatState } | null {
    const redirections = {
      repair: {
        message: `Te dirijo a nuestro menú de **Reparaciones** donde encontrarás información detallada sobre todos nuestros servicios de reparación y mantenimiento.\n\n🔧 *SERVICIOS DE REPARACIÓN DISPONIBLES:*\n\n📱 **Celulares y smartphones**\n💻 **Computadores PC y Mac**\n📱 **Tablets**\n\n⏰ Tiempo promedio: 24-48 horas\n💰 Cotización gratuita\n🔧 6 meses de garantía\n\n¿Qué equipo necesitas reparar?`,
        state: 'repair_menu' as ChatState
      },
      sales: {
        message: `Te dirijo a nuestro menú de **Ventas** donde encontrarás toda nuestra oferta de equipos tecnológicos.\n\n💻 *EQUIPOS DISPONIBLES:*\n\n✨ **Equipos nuevos** - Última tecnología\n♻️ **Reacondicionados** - Hasta 40% más económicos\n📱 **Todas las marcas** - Samsung, Apple, Huawei, HP, Dell\n\n💳 Financiación disponible\n🚚 Envío gratuito en Bogotá\n💰 Mejor precio garantizado\n\n¿Qué tipo de equipo te interesa?`,
        state: 'sales_menu' as ChatState
      },
      accessories: {
        message: `Te dirijo a nuestro menú de **Accesorios** donde encontrarás todo lo que necesitas para complementar tus equipos.\n\n📱 *ACCESORIOS DISPONIBLES:*\n\n🔌 Cargadores y cables\n🎧 Audio y sonido\n💾 Almacenamiento\n🖱️ Periféricos\n📱 Protección\n\n¿Qué accesorio específico buscas?`,
        state: 'accessories_menu' as ChatState
      },
      support: {
        message: `Te dirijo a nuestro menú de **Soporte Técnico** donde encontrarás todas nuestras opciones de asistencia especializada.\n\n🛠️ *TIPOS DE SOPORTE:*\n\n💻 Soporte remoto inmediato\n🏠 Visita técnica a domicilio\n📞 Asesoría telefónica\n📧 Soporte por email\n\n*Disponible 24/7 para emergencias empresariales*\n\n¿Qué tipo de soporte necesitas?`,
        state: 'support_menu' as ChatState
      },
      home_service: {
        message: `Te dirijo a nuestro menú de **Servicio a Domicilio** donde encontrarás información sobre nuestros servicios en tu ubicación.\n\n🏠 *SERVICIOS A DOMICILIO:*\n\n🔧 Reparación en sitio\n💻 Instalación y configuración\n🌐 Configuración de redes\n📱 Transferencia de datos\n\n*Cobertura en toda Bogotá*\n*Visita técnica: $25.000*\n\n¿En qué zona te encuentras?`,
        state: 'home_service_menu' as ChatState
      },
      business: {
        message: `Te dirijo a nuestro menú de **Proyectos Empresariales** donde encontrarás nuestras soluciones corporativas especializadas.\n\n🏢 *SOLUCIONES EMPRESARIALES:*\n\n💻 Equipos corporativos\n🌐 Redes y conectividad\n☁️ Soluciones en la nube\n🔧 Mantenimiento preventivo\n\n*+200 PyMEs confían en nosotros*\n*Contratos personalizados*\n\n¿Qué solución necesita tu empresa?`,
        state: 'business_menu' as ChatState
      }
    };

    const redirection = redirections[intent as keyof typeof redirections];
    if (redirection) {
      return {
        message: redirection.message,
        newState: redirection.state
      };
    }
    return null;
  }

  getWelcomeMessage(): Message {
    return this.createBotMessage(
      `¡Hola! 👋 Soy *Áron*, tu asistente virtual de *ConectaT*\n*"Tecnología que te Entiende"*\n\nEstoy aquí para ayudarte con:\n\n🔧 Reparación y mantenimiento\n💻 Venta de equipos\n📱 Accesorios tecnológicos\n🛠️ Soporte técnico\n🏠 Servicio a domicilio\n🏢 Proyectos empresariales\n\n¿En qué puedo asistirte hoy?`
    );
  }

  getQuickReplies(state: ChatState): string[] {
    switch (state) {
      case 'welcome':
      case 'main_menu':
        return [
          '🔧 Reparaciones',
          '💻 Equipos nuevos',
          '📱 Accesorios',
          '🛠️ Soporte técnico',
          '🏠 Servicio a domicilio',
          '🏢 Proyectos empresariales'
        ];
      case 'repair_menu':
        return [
          '📱 Celulares',
          '💻 Computadores',
          '📱 Tablets',
          '⏰ Tiempo de reparación',
          '💰 Cotizar reparación',
          '🔙 Menú principal'
        ];
      case 'sales_menu':
        return [
          '💻 Computadores',
          '📱 Celulares',
          '📱 Tablets',
          '🔄 Reacondicionados',
          '💰 Financiación',
          '🔙 Menú principal'
        ];
      case 'accessories_menu':
        return [
          '🔌 Cargadores',
          '🎧 Auriculares',
          '💾 Memorias USB',
          '🖱️ Mouse y teclados',
          '📱 Fundas y protectores',
          '🔙 Menú principal'
        ];
      case 'support_menu':
        return [
          '💻 Soporte remoto',
          '🏠 Visita técnica',
          '📞 Asesoría telefónica',
          '📧 Soporte por email',
          '🔙 Menú principal'
        ];
      case 'home_service_menu':
        return [
          '🏠 Servicio a domicilio',
          '🏢 Servicio empresarial',
          '📍 Zonas de cobertura',
          '💰 Tarifas',
          '📅 Agendar cita',
          '🔙 Menú principal'
        ];
      case 'business_menu':
        return [
          '🏢 Mantenimiento empresarial',
          '💻 Equipos corporativos',
          '🌐 Redes y conectividad',
          '☁️ Soluciones en la nube',
          '💰 Cotización empresarial',
          '🔙 Menú principal'
        ];
      default:
        return ['🔙 Menú principal', '👤 Hablar con agente'];
    }
  }

  processMessage(userInput: string, currentState: ChatState): ChatResponse {
    const input = userInput.toLowerCase().trim();
    
    // Análisis inteligente de la intención del usuario
    const analysis = this.analyzeIntent(input);

    // Mensaje que se enviará prellenado a WhatsApp cuando toque escalar
    const presetWA = `Hola, requiero soporte`;

    // Escalamiento automático si se detecta necesidad
    if (analysis.needsEscalation) {
      // 🔁 Disparar redirección a WhatsApp (auto) + fallback por mensaje
      this.redirectToWhatsApp(presetWA);

      return {
        message: this.createBotMessage(
          `Entiendo que necesitas asistencia especializada. Te estoy conectando con uno de nuestros agentes humanos que podrá ayudarte mejor con tu consulta.\n\n*Mientras tanto, aquí tienes nuestros datos de contacto directo:*\n\n📞 **Teléfono:** +${this.whatsappNumber}\n📧 **Email:** soporte@conectat.com.co\n📍 **Dirección:** Calle 127 #15-45, Bogotá\n\n*Abriremos WhatsApp automáticamente.*\n👉 Si no se abre, usa este enlace: ${this.buildWhatsAppLink(presetWA)}\n\nUn agente se comunicará contigo en los próximos minutos.`,
          [
            this.buildWhatsAppButton(presetWA),
            this.buildCallButton()
          ]
        ),
        newState: 'contact_human'
      };
    }

    // Manejo de saludos
    if (analysis.intent === 'greeting' || input === 'inicio') {
      return {
        message: this.createBotMessage(
          `¡Hola! 👋 Soy *Áron*, tu asistente virtual de *ConectaT*.\n\nEstoy aquí para ayudarte con consultas sobre:\n\n🔧 Reparación de equipos\n💻 Venta de tecnología\n📱 Accesorios\n🛠️ Soporte técnico\n🏠 Servicio a domicilio\n🏢 Proyectos empresariales\n\n¿En qué puedo asistirte hoy?`
        ),
        newState: 'main_menu'
      };
    }

    // Redirección inteligente basada en intención detectada
    if (analysis.confidence > 0.3 && analysis.intent !== 'unknown') {
      const redirection = this.getSmartRedirection(analysis.intent);
      if (redirection) {
        return {
          message: this.createBotMessage(redirection.message),
          newState: redirection.newState
        };
      }
    }

    // Escalamiento directo a agente humano (petición explícita)
    if (analysis.intent === 'human') {
      // 🔁 Disparar redirección a WhatsApp (auto) + fallback por mensaje
      this.redirectToWhatsApp(presetWA);

      return {
        message: this.createBotMessage(
          `Entiendo que necesitas asistencia especializada. Te estoy conectando con uno de nuestros agentes humanos que podrá ayudarte mejor con tu consulta.\n\n*Horarios de atención:*\n📅 Lunes a Viernes: 8:00 AM - 6:00 PM\n📅 Sábados: 9:00 AM - 2:00 PM\n\n📞 **Contacto directo:** +${this.whatsappNumber}\n📧 **Email:** soporte@conectat.com.co\n\n*Abriremos WhatsApp automáticamente.*\n👉 Si no se abre, usa este enlace: ${this.buildWhatsAppLink(presetWA)}\n\nUn agente se comunicará contigo en breve.`,
          [
            this.buildWhatsAppButton(presetWA),
            this.buildCallButton()
          ]
        ),
        newState: 'contact_human'
      };
    }

    // Navegación principal
    if (input.includes('reparac') || input.includes('🔧')) {
      return {
        message: this.createBotMessage(
          `🔧 *SERVICIOS DE REPARACIÓN Y MANTENIMIENTO*\n\nEspecialistas en:\n\n📱 *Celulares y smartphones*\n• Pantallas rotas\n• Problemas de batería\n• Daños por agua\n• Fallas de software\n\n💻 *Computadores PC y Mac*\n• Formateo y reinstalación\n• Cambio de componentes\n• Limpieza interna\n• Optimización de rendimiento\n\n📱 *Tablets*\n• Reparación de pantallas\n• Problemas de carga\n• Actualización de software\n\n⏰ *Tiempo promedio: 24-48 horas*\n💰 *Cotización gratuita*\n🔧 *6 meses de garantía*\n\n¿Qué equipo necesitas reparar?`
        ),
        newState: 'repair_menu'
      };
    }

    if (input.includes('equipo') || input.includes('venta') || input.includes('💻') || input.includes('comprar')) {
      return {
        message: this.createBotMessage(
          `💻 *VENTA DE EQUIPOS TECNOLÓGICOS*\n\n*EQUIPOS NUEVOS:*\n💻 Computadores de escritorio y portátiles\n📱 Celulares de todas las marcas\n📱 Tablets y iPads\n🖥️ Monitores y periféricos\n\n*EQUIPOS REACONDICIONADOS:*\n✅ Revisados por nuestros técnicos\n✅ Garantía de 6 meses\n✅ Hasta 40% más económicos\n✅ Como nuevos en funcionamiento\n\n*MARCAS DISPONIBLES:*\nSamsung • Apple • Huawei • Lenovo • HP • Dell • Asus\n\n💳 *Financiación disponible*\n🚚 *Envío gratuito en Bogotá*\n💰 *Mejor precio garantizado*\n\n¿Qué tipo de equipo te interesa?`
        ),
        newState: 'sales_menu'
      };
    }

    if (input.includes('accesorio') || input.includes('📱')) {
      return {
        message: this.createBotMessage(
          `📱 *ACCESORIOS TECNOLÓGICOS*\n\n🔌 *CARGADORES Y CABLES*\n• Cargadores originales y compatibles\n• Cables USB, USB-C, Lightning\n• Cargadores inalámbricos\n• Power banks\n\n🎧 *AUDIO*\n• Auriculares Bluetooth\n• Parlantes portátiles\n• Micrófonos para streaming\n\n💾 *ALMACENAMIENTO*\n• Memorias USB\n• Discos duros externos\n• Tarjetas micro SD\n\n🖱️ *PERIFÉRICOS*\n• Mouse y teclados\n• Webcams HD\n• Bases para portátil\n\n📱 *PROTECCIÓN*\n• Fundas y estuches\n• Vidrios templados\n• Protectores de pantalla\n\n¿Qué accesorio necesitas?`
        ),
        newState: 'accessories_menu'
      };
    }

    if (input.includes('soporte') || input.includes('🛠️') || input.includes('ayuda') || input.includes('problema')) {
      return {
        message: this.createBotMessage(
          `🛠️ *SOPORTE TÉCNICO ESPECIALIZADO*\n\n💻 *SOPORTE REMOTO*\n• Solución inmediata vía TeamViewer\n• Instalación de software\n• Configuración de equipos\n• Eliminación de virus\n\n🏠 *VISITA TÉCNICA*\n• Técnico certificado a tu ubicación\n• Diagnóstico completo\n• Reparación en sitio\n• Configuración de redes domésticas\n\n📞 *ASESORÍA TELEFÓNICA*\n• Consultas técnicas gratuitas\n• Guía paso a paso\n• Recomendaciones de compra\n\n📧 *SOPORTE POR EMAIL*\n• Respuesta en menos de 2 horas\n• Envío de manuales y drivers\n• Seguimiento de casos\n\n*Disponible 24/7 para emergencias empresariales*\n\n¿Qué tipo de soporte necesitas?`
        ),
        newState: 'support_menu'
      };
    }

    if (input.includes('domicilio') || input.includes('🏠') || input.includes('casa')) {
      return {
        message: this.createBotMessage(
          `🏠 *SERVICIO A DOMICILIO*\n\n*ZONAS DE COBERTURA EN BOGOTÁ:*\n📍 Zona Norte: Usaquén, Chapinero, Zona Rosa\n📍 Zona Centro: Candelaria, Teusaquillo, Macarena\n📍 Zona Sur: Kennedy, Bosa, Ciudad Bolívar\n📍 Zona Occidente: Fontibón, Engativá, Suba\n\n*SERVICIOS DISPONIBLES:*\n🔧 Reparación en sitio\n💻 Instalación y configuración\n🌐 Configuración de redes WiFi\n📱 Transferencia de datos\n🏢 Mantenimiento preventivo\n\n*TARIFAS:*\n🚗 Visita técnica: $25.000\n⏰ Tiempo mínimo: 1 hora\n💰 Servicio técnico: $45.000/hora\n\n*HORARIOS:*\n📅 Lunes a Viernes: 8:00 AM - 6:00 PM\n📅 Sábados: 9:00 AM - 2:00 PM\n🚨 Urgencias 24/7 (recargo del 50%)\n\n¿En qué zona te encuentras?`
        ),
        newState: 'home_service_menu'
      };
    }

    if (input.includes('empresa') || input.includes('🏢') || input.includes('negocio') || input.includes('corporativo')) {
      return {
        message: this.createBotMessage(
          `🏢 *PROYECTOS TECNOLÓGICOS EMPRESARIALES*\n\n*NUESTROS SERVICIOS CORPORATIVOS:*\n\n💻 *EQUIPOS CORPORATIVOS*\n• Venta de equipos al por mayor\n• Leasing tecnológico\n• Configuración masiva\n• Soporte empresarial\n\n🌐 *REDES Y CONECTIVIDAD*\n• Instalación de redes corporativas\n• Configuración de servidores\n• Cableado estructurado\n• WiFi empresarial\n\n☁️ *SOLUCIONES EN LA NUBE*\n• Migración a la nube\n• Backup automático\n• Office 365 / Google Workspace\n• Seguridad informática\n\n🔧 *MANTENIMIENTO PREVENTIVO*\n• Contratos mensuales\n• Soporte 24/7\n• Monitoreo remoto\n• Inventario de activos\n\n*EMPRESAS QUE CONFÍAN EN NOSOTROS:*\n✅ +200 PyMEs atendidas\n✅ Contratos gubernamentales\n✅ Startups y corporaciones\n\n¿Qué solución necesita tu empresa?`
        ),
        newState: 'business_menu'
      };
    }

    // Respuestas específicas según el menú actual
    switch (currentState) {
      case 'repair_menu':
        if (input.includes('celular') || input.includes('teléfono') || input.includes('móvil')) {
          return {
            message: this.createBotMessage(
              `📱 *REPARACIÓN DE CELULARES*\n\n*SERVICIOS MÁS COMUNES:*\n\n🔧 *Cambio de pantallas*\n• iPhone: $180.000 - $350.000\n• Samsung: $120.000 - $280.000\n• Huawei/Xiaomi: $90.000 - $200.000\n\n🔋 *Cambio de baterías*\n• Todas las marcas: $80.000 - $150.000\n• Garantía de 6 meses\n• Instalación incluida\n\n💧 *Daños por agua*\n• Limpieza especializada: $60.000\n• Cambio de componentes dañados\n• Recuperación de datos\n\n📱 *Problemas de software*\n• Liberación de operador: $30.000\n• Formateo y configuración: $25.000\n• Actualización de sistema: $20.000\n\n⏰ *Tiempo de reparación: 2-24 horas*\n🔧 *Garantía: 6 meses en repuestos*\n💰 *Cotización gratuita*\n\n¿Cuál es el problema específico de tu celular?`
            ),
            newState: 'repair_menu'
          };
        }

        if (input.includes('computador') || input.includes('pc') || input.includes('portátil') || input.includes('laptop')) {
          return {
            message: this.createBotMessage(
              `💻 *REPARACIÓN DE COMPUTADORES*\n\n*SERVICIOS ESPECIALIZADOS:*\n\n🔧 *Mantenimiento preventivo*\n• Limpieza interna completa: $45.000\n• Cambio de pasta térmica: $25.000\n• Optimización de software: $35.000\n\n💾 *Problemas de hardware*\n• Cambio de disco duro: $80.000 + repuesto\n• Instalación de memoria RAM: $25.000 + repuesto\n• Reparación de fuente: $60.000 - $120.000\n\n💻 *Problemas de software*\n• Formateo + Windows original: $80.000\n• Eliminación de virus: $40.000\n• Recuperación de datos: $100.000 - $200.000\n\n🖥️ *Pantallas de portátiles*\n• 14": $280.000 - $350.000\n• 15.6": $320.000 - $420.000\n• Touch screen: +$150.000\n\n⏰ *Tiempo: 24-48 horas según complejidad*\n🏠 *Servicio a domicilio disponible*\n\n¿Qué problema presenta tu computador?`
            ),
            newState: 'repair_menu'
          };
        }
        break;

      case 'sales_menu':
        if (input.includes('computador') || input.includes('pc') || input.includes('portátil')) {
          return {
            message: this.createBotMessage(
              `💻 *COMPUTADORES DISPONIBLES*\n\n*PORTÁTILES NUEVOS:*\n🔥 HP Pavilion 15" i5 8GB RAM: $2.200.000\n🔥 Lenovo IdeaPad i7 16GB: $2.800.000\n🔥 Asus VivoBook 14" i3 4GB: $1.450.000\n🔥 MacBook Air M1: $4.200.000\n\n*EQUIPOS DE ESCRITORIO:*\n🖥️ PC Gaming i5 GTX1650: $2.500.000\n🖥️ PC Oficina i3 8GB: $1.200.000\n🖥️ Workstation i7 32GB: $4.500.000\n\n*REACONDICIONADOS (GARANTÍA 6 MESES):*\n♻️ ThinkPad T480 i5 8GB: $1.200.000\n♻️ Dell Inspiron 15" i3: $850.000\n♻️ HP EliteBook i7: $1.650.000\n\n*INCLUYE:*\n✅ Windows 11 original\n✅ Office 365 por 1 año\n✅ Antivirus premium\n✅ Configuración completa\n✅ Soporte técnico gratuito\n\n💳 *Financiación hasta 12 meses*\n🚚 *Envío gratuito*\n\n¿Te interesa algún modelo específico?`
            ),
            newState: 'sales_menu'
          };
        }
        break;
    }

    // Preguntas frecuentes generales
    if (analysis.intent === 'sales' || input.includes('precio') || input.includes('costo') || input.includes('cuánto') || input.includes('💰')) {
      return {
        message: this.createBotMessage(
          `💰 *INFORMACIÓN DE PRECIOS*\n\n*REPARACIONES MÁS COMUNES:*\n📱 Pantalla celular: $90.000 - $350.000\n🔋 Batería celular: $80.000 - $150.000\n💻 Formateo PC: $80.000\n🔧 Mantenimiento PC: $45.000\n\n*SERVICIOS:*\n🏠 Visita a domicilio: $25.000\n⏰ Hora técnica: $45.000\n📞 Soporte remoto: $35.000\n💻 Diagnóstico: GRATUITO\n\n*TODOS LOS PRECIOS INCLUYEN:*\n✅ Mano de obra especializada\n✅ Garantía de 6 meses\n✅ Soporte post-venta\n✅ IVA incluido\n\n*FORMAS DE PAGO:*\n💳 Efectivo, tarjetas, transferencias\n📱 Pago móvil (Nequi, Daviplata)\n💰 Financiación disponible\n\n¿Necesitas cotización para algo específico?`,
          [
            { label: '💬 Cotizar por WhatsApp', url: this.buildWhatsAppLink('Hola, quiero una cotización por WhatsApp.'), target: '_blank' }
          ]
        ),
        newState: 'quote_request'
      };
    }

    if (analysis.intent === 'warranty' || input.includes('garantía') || input.includes('garantia')) {
      return {
        message: this.createBotMessage(
          `🛡️ *POLÍTICA DE GARANTÍAS*\n\n*REPARACIONES:*\n✅ 6 meses en repuestos originales\n✅ 3 meses en repuestos compatibles\n✅ 30 días en mano de obra\n✅ Garantía escrita en factura\n\n*EQUIPOS NUEVOS:*\n✅ Garantía del fabricante (12 meses)\n✅ Soporte técnico ConectaT incluido\n✅ Cambio por defecto de fábrica\n\n*EQUIPOS REACONDICIONADOS:*\n✅ 6 meses de garantía ConectaT\n✅ Cambio por fallas técnicas\n✅ Soporte incluido\n\n*NO CUBRE:*\n❌ Daños por mal uso del cliente\n❌ Daños por agua posterior\n❌ Caídas o golpes\n❌ Manipulación por terceros\n\n*PARA HACER VÁLIDA LA GARANTÍA:*\n📄 Factura de compra/reparación\n📱 Contactar dentro del período\n🏪 Llevar el equipo a nuestras instalaciones\n\n¿Tienes alguna consulta específica sobre garantías?`
        ),
        newState: currentState
      };
    }

    if (analysis.intent === 'schedule' || input.includes('horario') || input.includes('hora') || input.includes('cuándo')) {
      return {
        message: this.createBotMessage(
          `⏰ *HORARIOS DE ATENCIÓN*\n\n*SEDE PRINCIPAL:*\n📅 Lunes a Viernes: 8:00 AM - 6:00 PM\n📅 Sábados: 9:00 AM - 2:00 PM\n📅 Domingos: Cerrado\n\n*SERVICIO A DOMICILIO:*\n🏠 Lunes a Viernes: 8:00 AM - 6:00 PM\n🏠 Sábados: 9:00 AM - 2:00 PM\n🚨 Urgencias 24/7 (recargo del 50%)\n\n*SOPORTE TÉCNICO:*\n💻 Chat y WhatsApp: 24/7\n📞 Teléfono: Lunes a Sábado 8:00 AM - 8:00 PM\n📧 Email: Respuesta en 2 horas hábiles\n\n*DÍAS FESTIVOS:*\n🎉 Atención solo urgencias empresariales\n📱 Chat automático disponible\n\n*UBICACIÓN:*\n📍 Calle 127 #15-45, Bogotá\n🚇 Cerca al TransMilenio Calle 127\n🅿️ Parqueadero gratuito para clientes\n\n¿Necesitas agendar una cita?`
        ),
        newState: currentState
      };
    }

    if (analysis.intent === 'location' || input.includes('dónde') || input.includes('ubicación') || input.includes('dirección')) {
      return {
        message: this.createBotMessage(
          `📍 *NUESTRA UBICACIÓN*\n\n**ConectaT - Sede Principal**\n🏢 Carrera 83D #53A-34, Cali\n🏙️ Barrio: Usaquén\n\n*REFERENCIAS:*\n🚇 A 2 cuadras del TransMilenio Calle 127\n🏪 Frente al Centro Comercial Santafé\n🅿️ Parqueadero gratuito disponible\n\n*CÓMO LLEGAR:*\n🚌 TransMilenio: Estación Calle 127\n🚗 Por Autopista Norte: Salida Calle 127\n🚕 Uber/Taxi: "ConectaT Calle 127"\n\n*HORARIOS:*\n📅 Lunes a Viernes: 8:00 AM - 5:00 PM\n📅 Sábados: 9:00 AM - 12:00 PM\n\n📞 **Teléfono:** +${this.whatsappNumber}\n\n¿Necesitas que te envíe la ubicación por Google Maps?`
        ),
        newState: currentState
      };
    }

    // Respuestas de navegación
    if (input.includes('menú') || input.includes('menu') || input.includes('inicio') || input.includes('🔙')) {
      return {
        message: this.createBotMessage(
          `🏠 *MENÚ PRINCIPAL - ConectaT*\n\nSoy *Áron* y puedo ayudarte con estos servicios:\n\n🔧 *Reparación y mantenimiento*\n💻 *Venta de equipos nuevos*\n📱 *Accesorios tecnológicos*\n🛠️ *Soporte técnico*\n🏠 *Servicio a domicilio*\n🏢 *Proyectos empresariales*\n\n¿En qué puedo asistirte?`
        ),
        newState: 'main_menu'
      };
    }

    // Respuesta por defecto mejorada con sugerencias contextuales
    return {
      message: this.createBotMessage(
        `Entiendo que necesitas ayuda, pero no logré identificar exactamente qué buscas 🤔\n\n*Como Áron, puedo asistirte con:*\n\n🔧 **Reparaciones** - "Mi celular no enciende"\n💻 **Ventas** - "Quiero comprar un portátil"\n📱 **Accesorios** - "Necesito un cargador"\n🛠️ **Soporte** - "Tengo un problema técnico"\n🏠 **Domicilio** - "Pueden venir a mi casa"\n🏢 **Empresas** - "Cotización para mi negocio"\n\n*Sugerencias:*\n• Escribe "menú" para ver todas las opciones\n• Escribe "agente" para hablar con una persona\n• Sé más específico sobre lo que necesitas\n\n¿Podrías contarme más detalles sobre tu consulta?`
      ),
      newState: currentState
    };
  }
}

export const chatbotLogic = new ChatbotLogic();