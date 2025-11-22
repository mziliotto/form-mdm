# Configuración de Firebase para el Formulario de Arquería

## Paso 1: Crear proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Haz clic en "Agregar proyecto" o "Add project"
3. Nombre sugerido: "formulario-arqueria-mdm"
4. Sigue los pasos (puedes desactivar Google Analytics si quieres)

## Paso 2: Crear base de datos Firestore

1. En el menú lateral, haz clic en "Firestore Database"
2. Haz clic en "Crear base de datos" o "Create database"
3. Selecciona "Iniciar en modo de prueba" (permite lecturas/escrituras por 30 días)
4. Elige la ubicación: **southamerica-east1 (São Paulo)** (es la más cercana a Argentina)
5. Haz clic en "Habilitar" o "Enable"

## Paso 3: Obtener las credenciales

1. Haz clic en el ícono de engranaje ⚙️ junto a "Descripción general del proyecto"
2. Selecciona "Configuración del proyecto" o "Project settings"
3. Baja hasta la sección "Tus apps" o "Your apps"
4. Haz clic en el ícono </> (Web)
5. Dale un nombre a tu app (ej: "formulario-web")
6. NO es necesario configurar Firebase Hosting
7. Verás un código como este:

\`\`\`javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-12345",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
\`\`\`

## Paso 4: Agregar variables en v0

1. En v0, abre el **sidebar izquierdo**
2. Haz clic en **"Vars"**
3. Agrega cada una de estas variables con los valores de tu Firebase:

| Variable | Valor de Firebase |
|----------|-------------------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | El valor de `apiKey` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | El valor de `authDomain` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | El valor de `projectId` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | El valor de `storageBucket` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | El valor de `messagingSenderId` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | El valor de `appId` |

## Paso 5: Probar el formulario

1. Una vez agregadas TODAS las variables, **recarga la página** de v0
2. Completa el formulario y haz clic en "Enviar solicitud"
3. Deberías ver un mensaje de éxito

## Verificar los datos recibidos

1. Ve a Firebase Console
2. Haz clic en "Firestore Database" en el menú lateral
3. Verás una colección llamada **"solicitudes-arqueria"**
4. Haz clic en ella para ver todos los formularios enviados

Cada documento tendrá:
- nombre
- apellido
- edad
- provincia
- localidad
- experiencia
- email
- preguntasIntereses (si se completó)
- fechaEnvio (timestamp automático)

## Configurar reglas de seguridad (Importante para producción)

Después de probar, deberías configurar reglas de seguridad adecuadas:

1. En Firestore, haz clic en la pestaña "Reglas" o "Rules"
2. Reemplaza el contenido con:

\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /solicitudes-arqueria/{document} {
      // Permite que cualquiera escriba (envíe formularios)
      allow create: if true;
      // No permite leer ni actualizar públicamente
      allow read, update, delete: if false;
    }
  }
}
\`\`\`

3. Haz clic en "Publicar" o "Publish"

Esto permite que cualquier persona envíe formularios, pero solo tú (como administrador) podrás ver los datos en la consola de Firebase.
