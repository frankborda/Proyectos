document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const icon = document.getElementById('chatbot-icon');
    const chatWindow = document.getElementById('chatbot-window');
    const closeButton = document.getElementById('close-chatbot');
    const messagesContainer = document.getElementById('chatbot-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    
    // Mostrar/ocultar ventana
    icon.addEventListener('click', function() {
        chatWindow.classList.toggle('visible');
        // Enfocar el input cuando se abre la ventana
        if (chatWindow.classList.contains('visible')) {
            setTimeout(() => userInput.focus(), 100);
        }
    });
    
    closeButton.addEventListener('click', function() {
        chatWindow.classList.remove('visible');
    });

    // Respuestas del bot (Vaso de Leche) - Mejorado con coincidencias parciales
    const botResponses = [
        // Saludos
        {
            patterns: [/hola/, /buenos\s*d[ií]as/, /buenas\s*tardes/, /buenas\s*noches/, /saludos/],
            response: "¡Hola! 👋 Soy el asistente del Programa Vaso de Leche. ¿En qué puedo ayudarte hoy?\n\n• Inscripción al programa\n• Requisitos\n• Puntos de distribución\n• Horarios de entrega\n• Beneficiarios"
        },
        // Despedidas
        {
            patterns: [/adios/, /chao/, /hasta\s*luego/, /nos\s*vemos/, /gracias/],
            response: "¡Hasta luego! 👋 Recuerda que estoy aquí para ayudarte con el Programa Vaso de Leche."
        },
        // Información general del programa
        {
            patterns: [/que\s*es.*programa/, /en\s*que\s*consiste/, /informacion.*programa/, /hablame.*programa/],
            response: "🥛 **Programa Vaso de Leche**\n\n🔵 _Objetivo_: Brindar apoyo alimentario a:\n• Niños de 0-6 años\n• Mujeres embarazadas\n• Adultos mayores\n• Personas en situación de vulnerabilidad\n\n🟢 **Beneficios**:\n✓ Complemento nutricional\n✓ Reducción de desnutrición\n✓ Apoyo a familias necesitadas\n\n💡 _Cobertura_: Todos los distritos de la provincia"
        },
        // Inscripción
        {
            patterns: [/inscripc/i, /como\s*me\s*inscribo/, /requisitos/, /documentos/, /que\s*necesito/],
            response: "📝 **Inscripción al Programa**\n\n🔵 _Requisitos_: \n1. Fotocopia de DNI\n2. Partida de nacimiento (niños)\n3. Certificado de embarazo (gestantes)\n4. Declaración jurada de ingresos\n\n🟢 **Proceso**:\n✓ Acudir a la municipalidad distrital\n✓ Llenar formato de solicitud\n✓ Entrevista social\n\n💡 _Periodo_: Inscripciones abiertas todo el año"
        },
        // Puntos de distribución
        {
            patterns: [/donde\s*recibo/, /puntos?\s*de\s*distribuc/i, /lugar\s*de\s*entrega/, /donde\s*est[aá]n/, /centro\s*de\s*acopio/],
            response: "📍 **Centros de Distribución**\n\n🔵 _Ubicaciones_: \n1. Municipalidad distrital\n2. Comedores populares\n3. Centros de salud\n4. Asentamientos humanos\n\n🟢 **Horarios**:\n✓ Lunes a viernes: 8am - 2pm\n✓ Cada 15 días\n\n💡 _Consulta_: Llama al 123-456789 para tu punto más cercano"
        },
        // Horarios
        {
            patterns: [/horarios?/, /cu[aá]ndo\s*entregan/, /d[ií]as\s*de\s*entrega/, /a\s*que\s*hora/],
            response: "⏰ **Entrega de Productos**\n\n🔵 _Frecuencia_: \n• Entrega quincenal\n• Según calendario establecido\n\n🟢 **Horarios**:\n✓ Lunes a viernes: 8:00 am - 2:00 pm\n✓ Sábados: 9:00 am - 12:00 pm (solo algunos puntos)\n\n💡 _Importante_: Llevar DNI y tarjeta de beneficiario"
        },
        // Beneficiarios
        {
            patterns: [/quienes\s*pueden/, /beneficiarios?/, /elegibilidad/, /requisitos?/],
            response: "👨‍👩‍👧‍👦 **Quiénes pueden ser beneficiarios**\n\n🔵 _Prioridad_: \n1. Niños de 0-6 años\n2. Mujeres embarazadas\n3. Madres lactantes\n4. Adultos mayores de 65 años en pobreza\n\n🟢 **Requisitos**:\n✓ Residir en el distrito\n✓ No percibir otros programas similares\n✓ Situación de vulnerabilidad\n\n💡 _Cobertura_: Hasta 3 beneficiarios por familia"
        },
        // Productos
        {
            patterns: [/que\s*entregan/, /productos?/, /alimentos?/, /que\s*dan/, /recibo/],
            response: "🛒 **Productos del Programa**\n\n🔵 _Entrega típica_: \n• Leche en polvo o evaporada\n• Avena\n• Azúcar\n• Harina fortificada\n• Conservas de pescado\n\n🟢 **Variación**:\n✓ Según disponibilidad presupuestal\n✓ Según necesidades nutricionales\n\n💡 _Valor_: Aprox. S/ 60.00 por entrega quincenal"
        },
        // Actualización de datos
        {
            patterns: [/actualizar/, /cambiar\s*datos/, /modificar/, /cambio\s*de\s*domicilio/],
            response: "🔄 **Actualización de Datos**\n\n🔵 _Motivos_: \n• Cambio de domicilio\n• Nacimiento de nuevo hijo\n• Cambio de situación familiar\n\n🟢 **Proceso**:\n✓ Notificar a trabajadora social\n✓ Presentar documentos actualizados\n✓ Firma de declaración jurada\n\n💡 _Plazo_: 15 días después del cambio"
        },
        // Preguntas frecuentes
        {
            patterns: [/preguntas?\s*frecuentes?/, /faq/, /dudas?/, /consultas?/],
            response: "❓ **Preguntas Frecuentes**\n\n🔵 _Consultas comunes_: \n• ¿Puedo cambiar mi punto de distribución?\n• ¿Qué hago si no recibo mi entrega?\n• ¿Cómo reportar un problema?\n• ¿El programa tiene costo?\n\n🟢 **Respuestas**:\n✓ Sí, con justificación\n✓ Reportar a municipalidad\n✓ Llamar al 123-456789\n✓ Es completamente gratuito\n\n💡 _Atención_: Lunes a viernes 8am-5pm"
        },
        // Reclamos
        {
            patterns: [/reclamo/, /queja/, /no\s*recib[ií]/, /problema/, /reportar/],
            response: "📞 **Reclamos y Quejas**\n\n🔵 _Canales_: \n1. Oficina del Programa Vaso de Leche\n2. Defensoría del Pueblo\n3. Mesa de Partes municipal\n\n🟢 _Documentos_: \n✓ DNI del beneficiario\n✓ Constancia de inscripción\n✓ Fechas de no entrega\n\n💡 _Plazo_: 5 días hábiles para respuesta"
        },
        // Adultos mayores
        {
            patterns: [/adultos?\s*mayores?/, /ancianos?/, /adulto\s*mayor/],
            response: "👵 **Adultos Mayores en el Programa**\n\n🔵 _Requisitos_: \n• Mayor de 65 años\n• En situación de pobreza\n• Sin pensiones o ingresos estables\n\n🟢 _Proceso_: \n✓ Evaluación socioeconómica\n✓ Inscripción en registro único\n\n💡 _Beneficio_: Entrega quincenal de alimentos"
        },
        // Verificación de inscripción
        {
            patterns: [/verificar/, /estoy\s*inscrito/, /consultar/, /confirmar/],
            response: "✅ **Verificación de Inscripción**\n\n🔵 _Métodos_: \n1. Consulta en municipalidad distrital\n2. Llamar al 123-456789\n3. Consulta web (próximamente)\n\n🟢 _Datos necesarios_: \n✓ Número de DNI\n✓ Nombres completos\n\n💡 _Tiempo_: 24 horas para respuesta"
        },
        // Donaciones
        {
            patterns: [/donar/, /donac/i, /colaborar/, /aportar/, /ayudar/],
            response: "❤️ **Donaciones al Programa**\n\n🔵 _Aceptamos_: \n• Leche en polvo o evaporada\n• Avena\n• Azúcar\n• Harina fortificada\n• Conservas\n\n🟢 _Contacto_: \n✓ Oficina de Participación Vecinal\n✓ Tel: 123-456789\n\n💡 _Transparencia_: Todas las donaciones se inventarian y publican"
        },
        // Voluntariado
        {
            patterns: [/voluntariado/, /voluntario/, /colaborar/, /trabajar\s*de\s*voluntario/],
            response: "🤝 **Voluntariado**\n\n🔵 _Áreas_: \n• Distribución de productos\n• Organización de almacén\n• Apoyo en inscripciones\n• Campañas nutricionales\n\n🟢 _Requisitos_: \n✓ Mayor de 18 años\n✓ Disponibilidad de horarios\n✓ Entrevista previa\n\n💡 _Beneficios_: Certificado de voluntariado"
        },
        // Default
        {
            patterns: [/.*/],
            response: "No estoy seguro de entender. Prueba con alguna de estas opciones:\n\n• 'Inscripción'\n• 'Requisitos'\n• 'Puntos de distribución'\n• 'Horarios de entrega'\n• 'Beneficiarios'"
        }
    ];

    // Añadir mensaje al chat
    function addMessage(text, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        
        // Si el texto contiene saltos de línea, procesarlos
        if (text.includes('\n')) {
            text.split('\n').forEach(line => {
                const lineElement = document.createElement('div');
                lineElement.textContent = line;
                messageDiv.appendChild(lineElement);
            });
        } else {
            messageDiv.textContent = text;
        }
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Obtener respuesta del bot
    function getBotResponse(userText) {
        // Limpiar y normalizar el texto
        const cleanText = userText.toLowerCase().replace(/[^\w\sáéíóúñ]/gi, '');
        
        // Buscar patrón que coincida
        for (const item of botResponses) {
            for (const pattern of item.patterns) {
                if (pattern.test(cleanText)) {
                    return item.response;
                }
            }
        }
        
        // Respuesta por defecto si no hay coincidencia (no debería ocurrir)
        return "No estoy seguro de entender. ¿Podrías reformular tu pregunta?";
    }

    // Manejar envío de mensajes
    function handleSendMessage() {
        const userText = userInput.value.trim();
        if (!userText) return;
        
        addMessage(userText, true);
        userInput.value = '';
        
        // Mostrar indicador de que el bot está escribiendo
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('message', 'bot-message');
        typingIndicator.id = 'typing-indicator';
        typingIndicator.textContent = 'Escribiendo...';
        messagesContainer.appendChild(typingIndicator);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        setTimeout(() => {
            // Eliminar indicador de escritura
            const indicator = document.getElementById('typing-indicator');
            if (indicator) {
                indicator.remove();
            }
            
            const botText = getBotResponse(userText);
            addMessage(botText, false);
        }, 1000);
    }

    // Eventos
    sendButton.addEventListener('click', handleSendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });

    // Mensaje inicial (solo primera vez)
    let firstOpen = true;
    icon.addEventListener('click', () => {
        if (firstOpen && chatWindow.classList.contains('visible')) {
            setTimeout(() => {
                addMessage("¡Hola! 👋 Soy tu asistente para el Programa Vaso de Leche. Puedes preguntarme sobre inscripciones, requisitos, puntos de distribución y más. ¿En qué te puedo ayudar?", false);
            }, 300);
            firstOpen = false;
        }
    });

    // Mejorar la experiencia de usuario: enfocar input al hacer clic en cualquier parte del chat
    chatWindow.addEventListener('click', (e) => {
        if (e.target.closest('#chatbot-header') || e.target.closest('#chatbot-messages')) {
            userInput.focus();
        }
    });
});