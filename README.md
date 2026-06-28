# 💬 WA Inbox — WhatsApp Business con Make + Google Sheets

Bandeja de entrada para responder mensajes de WhatsApp Business,
integrada con **Make** (automatización) y **Google Sheets** (base de datos).

---

## ⚡ Flujo completo

```
WhatsApp → Meta Webhook → Make Escenario 1 → Google Sheets
                                                    ↕
                                             Esta web (polling cada 10s)
                                                    ↕
Esta web envía respuesta → Make Escenario 2 → Meta API → WhatsApp
                                          ↘ Google Sheets (registra respuesta)
```

---

## 🚀 Instalación local

```bash
# 1. Instalar dependencias
npm install

# 2. Copiar variables de entorno
cp .env.example .env.local
# Edita .env.local con tus webhooks de Make

# 3. Iniciar en modo desarrollo
npm run dev
# Abre http://localhost:5173

# 4. Construir para producción
npm run build
```

---

## ⚙️ Configurar Make — Escenario 1 (Leer mensajes)

1. **Nuevo escenario** en Make
2. **Trigger**: Google Sheets → Watch Rows
   - Conecta tu cuenta Google
   - Selecciona el Sheet con los mensajes
3. **Acción final**: Webhooks → Webhook Response
   - Body: `{{toJSON(array(rows))}}`  ← devuelve todas las filas como JSON
4. **Activa** el escenario
5. **Copia la URL** → pégala en `.env.local` como `VITE_MAKE_READ_WEBHOOK`

---

## ⚙️ Configurar Make — Escenario 2 (Enviar respuestas)

1. **Nuevo escenario** en Make
2. **Trigger**: Webhooks → Custom Webhook → copia la URL
3. **Acción 1**: HTTP → Make a Request
   ```
   Método: POST
   URL: https://graph.facebook.com/v19.0/{PHONE_NUMBER_ID}/messages
   Headers:
     Content-Type: application/json
     Authorization: Bearer {TU_ACCESS_TOKEN}
   Body (JSON):
     {
       "messaging_product": "whatsapp",
       "to": "{{telefono}}",
       "type": "text",
       "text": { "body": "{{mensaje}}" }
     }
   ```
4. **Acción 2**: Google Sheets → Add a Row (registra la respuesta)
5. **Activa** y copia la URL → `VITE_MAKE_SEND_WEBHOOK`

---

## 📊 Estructura del Google Sheet

| A           | B          | C       | D        | E                    | F                     | G                         |
|-------------|------------|---------|----------|----------------------|-----------------------|---------------------------|
| id_mensaje  | telefono   | nombre  | mensaje  | direccion            | timestamp             | estado                    |
| msg_abc123  | 521234567890 | María | Hola    | ENTRANTE / SALIENTE  | 2024-01-15T10:32:00Z  | recibido / leido / enviado |

---

## 🌐 Publicar en Vercel (gratis)

```bash
# Opción 1 — Vercel CLI
npm i -g vercel
vercel deploy

# Opción 2 — GitHub
# 1. Sube el proyecto a GitHub
# 2. Ve a vercel.com → New Project → Import
# 3. En Settings → Environment Variables agrega:
#    VITE_MAKE_READ_WEBHOOK  = tu webhook de lectura
#    VITE_MAKE_SEND_WEBHOOK  = tu webhook de envío
# 4. Deploy
```

---

## 📱 Webhook de Meta (entrada de mensajes)

En Meta for Developers → tu App → WhatsApp → Configuration:
- **Callback URL**: URL del escenario 1 de Make (o un escenario intermedio)
- **Verify Token**: el string que configures en Make
- **Suscripciones**: `messages`, `message_deliveries`, `message_reads`

---

## 🔑 Dónde encontrar tus credenciales Meta

- **Phone Number ID** → Meta for Developers → tu App → WhatsApp → API Setup
- **Access Token** → Meta for Developers → tu App → System Users → Generate Token
- **App ID** → Meta for Developers → tu App → Settings → Basic

---

## 📁 Estructura del proyecto

```
wa-inbox/
├── src/
│   ├── main.jsx          # Punto de entrada React
│   ├── App.jsx           # Componente principal (layout + lógica)
│   ├── Components.jsx    # Avatar, ContactRow, MessageBubble, etc.
│   ├── SetupModal.jsx    # Modal de configuración de webhooks
│   ├── GuideModal.jsx    # Guía paso a paso de Make
│   ├── api.js            # Llamadas a Make (fetchRows, sendReply)
│   ├── config.js         # Variables de configuración
│   └── utils.js          # Helpers (colores, fechas, buildConvs)
├── public/
│   └── favicon.svg
├── index.html
├── vite.config.js
├── package.json
├── .env.example          # Plantilla de variables de entorno
└── README.md
```
