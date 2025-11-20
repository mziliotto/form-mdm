# Configuración de Firebase

Este proyecto utiliza Firebase Firestore para almacenar las solicitudes del formulario de arquería.

## Pasos para configurar Firebase

### 1. Crear un proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Haz clic en "Agregar proyecto"
3. Ingresa un nombre para tu proyecto (ejemplo: "mdm-arqueria")
4. Sigue los pasos del asistente

### 2. Crear una aplicación web

1. En la página principal de tu proyecto, haz clic en el ícono web `</>`
2. Registra tu aplicación con un nombre (ejemplo: "Formulario MDM")
3. Copia las credenciales que aparecen (apiKey, authDomain, projectId, etc.)

### 3. Configurar variables de entorno en Vercel

1. Ve a tu proyecto en Vercel
2. Ve a Settings > Environment Variables
3. Agrega las siguientes variables con los valores de tu configuración de Firebase:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`

### 4. Crear la base de datos Firestore

1. En Firebase Console, ve a "Firestore Database" en el menú lateral
2. Haz clic en "Crear base de datos"
3. Selecciona "Comenzar en modo de producción"
4. Elige la ubicación más cercana a tu región

### 5. Configurar reglas de seguridad

En la pestaña "Reglas" de Firestore, configura las reglas para permitir escritura:

\`\`\`
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /solicitudes-arqueria/{document} {
      allow read: if false; // Solo administradores pueden leer
      allow write: if true; // Permitir que cualquiera envíe el formulario
    }
  }
}
\`\`\`

### 6. Ver los datos enviados

Los datos del formulario se guardarán en la colección `solicitudes-arqueria` en Firestore.
Puedes verlos en Firebase Console > Firestore Database.

## Estructura de datos

Cada documento en la colección contendrá:

- `nombre`: string
- `apellido`: string
- `edad`: number
- `email`: string
- `provincia`: string
- `localidad`: string
- `experiencia`: string ("si" o "no")
- `preguntasIntereses`: string (opcional)
- `fechaEnvio`: timestamp (generado automáticamente)
