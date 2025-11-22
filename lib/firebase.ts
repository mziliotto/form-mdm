import { initializeApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { firebaseConfig } from "./firebase-config"

console.log("[v0] Verificando configuración de Firebase...")
console.log("[v0] Variables encontradas:", {
  hasApiKey: !!firebaseConfig.apiKey && !firebaseConfig.apiKey.includes("TU_"),
  hasAuthDomain: !!firebaseConfig.authDomain && !firebaseConfig.authDomain.includes("TU_"),
  hasProjectId: !!firebaseConfig.projectId && !firebaseConfig.projectId.includes("TU_"),
  hasStorageBucket: !!firebaseConfig.storageBucket && !firebaseConfig.storageBucket.includes("TU_"),
  hasMessagingSenderId: !!firebaseConfig.messagingSenderId && !firebaseConfig.messagingSenderId.includes("TU_"),
  hasAppId: !!firebaseConfig.appId && !firebaseConfig.appId.includes("TU_"),
})

const isConfigured =
  firebaseConfig.apiKey &&
  !firebaseConfig.apiKey.includes("TU_") &&
  firebaseConfig.authDomain &&
  !firebaseConfig.authDomain.includes("TU_") &&
  firebaseConfig.projectId &&
  !firebaseConfig.projectId.includes("TU_") &&
  firebaseConfig.storageBucket &&
  !firebaseConfig.storageBucket.includes("TU_") &&
  firebaseConfig.messagingSenderId &&
  !firebaseConfig.messagingSenderId.includes("TU_") &&
  firebaseConfig.appId &&
  !firebaseConfig.appId.includes("TU_")

if (!isConfigured) {
  throw new Error(
    `⚠️ CONFIGURACIÓN REQUERIDA ⚠️\n\n` +
      `Debes editar el archivo "lib/firebase-config.ts" con tus credenciales de Firebase.\n\n` +
      `Pasos:\n` +
      `1. Ve a https://console.firebase.google.com\n` +
      `2. Selecciona tu proyecto\n` +
      `3. Ve a Configuración del proyecto → Tus aplicaciones\n` +
      `4. Copia las credenciales y pegálas en lib/firebase-config.ts`,
  )
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
const db = getFirestore(app)

console.log("[v0] Firebase inicializado correctamente")

export { app, db }
