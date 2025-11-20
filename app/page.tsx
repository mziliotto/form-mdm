"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Check } from "lucide-react"

const provinciasArgentinas = [
  "Buenos Aires",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Córdoba",
  "Corrientes",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego",
  "Tucumán",
]

export default function FormularioArqueria() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    edad: "",
    provincia: "",
    localidad: "",
    experiencia: "",
    email: "",
    preguntasIntereses: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [validationErrors, setValidationErrors] = useState<Record<string, boolean>>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const errors: Record<string, boolean> = {}

    if (!formData.nombre.trim()) errors.nombre = true
    if (!formData.apellido.trim()) errors.apellido = true
    if (!formData.edad.trim()) errors.edad = true
    if (!formData.provincia) errors.provincia = true
    if (!formData.localidad.trim()) errors.localidad = true
    if (!formData.experiencia) errors.experiencia = true
    if (!formData.email.trim()) errors.email = true

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors)
      return
    }

    setValidationErrors({})
    setIsSubmitting(true)

    try {
      if (!db) {
        throw new Error("Firebase no está configurado. Por favor, agrega las variables de entorno necesarias.")
      }

      const docRef = await addDoc(collection(db, "solicitudes-arqueria"), {
        ...formData,
        edad: Number(formData.edad),
        fechaEnvio: serverTimestamp(),
      })

      setShowSuccessDialog(true)

      setFormData({
        nombre: "",
        apellido: "",
        edad: "",
        provincia: "",
        localidad: "",
        experiencia: "",
        email: "",
        preguntasIntereses: "",
      })
    } catch (error) {
      console.error("Error al enviar formulario:", error)
      alert("Hubo un error al enviar el formulario. Por favor, intenta nuevamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background flex items-center justify-center p-4 md:p-8">
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent className="bg-green-500/30 border-green-500/50">
          <AlertDialogHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="rounded-full bg-green-500 p-3">
                <Check className="w-8 h-8 text-white" strokeWidth={3} />
              </div>
            </div>
            <AlertDialogTitle className="text-center text-green-600 dark:text-green-400 text-2xl">
              ¡Solicitud enviada exitosamente! 🎯
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-base text-foreground/80">
              Gracias por tu interés en entrenar con nosotros. Te contactaremos pronto para comenzar tu camino en la
              arquería. ¡Prepárate para alcanzar tu máximo potencial!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="bg-green-600 hover:bg-green-700 w-full">¡Entendido!</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="w-full max-w-3xl">
        <div className="text-center mb-6 md:mb-8 space-y-4 md:space-y-6">
          <div className="inline-flex items-center justify-center mb-3 md:mb-4">
            <img src="/images/logo.png" alt="MDM Logo" className="w-24 h-24 md:w-32 md:h-32 object-contain" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-balance leading-snug md:leading-tight px-2">
            ¿Sabías que podés entrenar como los mejores arqueros del país?
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground/90 text-pretty leading-relaxed md:leading-loose max-w-2xl mx-auto px-4">
            Toda la experiencia de los últimos 25 años de tiro con arco a tu disposición. Te ayudo a cumplir tus metas
            acompañándote en el desarrollo dentro de esta disciplina. Con métodos eficaces y adaptados a tu disposición
            de tiempo y nivel técnico. Te animas a buscar tu máximo potencial, disfrutando cada momento de tu proceso
            sabiendo que contas con el respaldo y la trayectoria, experiencia que necesitas.
          </p>
        </div>

        <Card className="border-2 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl">Comenzá tu entrenamiento</CardTitle>
            <CardDescription>Completá el formulario y te contactaremos para comenzar tu camino</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre *</Label>
                  <Input
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    placeholder="Tu nombre"
                    disabled={isSubmitting}
                    className={validationErrors.nombre ? "border-red-500 border-2" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apellido">Apellido *</Label>
                  <Input
                    id="apellido"
                    value={formData.apellido}
                    onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                    placeholder="Tu apellido"
                    disabled={isSubmitting}
                    className={validationErrors.apellido ? "border-red-500 border-2" : ""}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="edad">Edad *</Label>
                  <Input
                    id="edad"
                    type="number"
                    min="1"
                    max="120"
                    value={formData.edad}
                    onChange={(e) => setFormData({ ...formData, edad: e.target.value })}
                    placeholder="Tu edad"
                    disabled={isSubmitting}
                    className={validationErrors.edad ? "border-red-500 border-2" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="tu@email.com"
                    disabled={isSubmitting}
                    className={validationErrors.email ? "border-red-500 border-2" : ""}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="provincia">Provincia *</Label>
                  <Select
                    value={formData.provincia}
                    onValueChange={(value) => setFormData({ ...formData, provincia: value })}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger
                      id="provincia"
                      className={validationErrors.provincia ? "border-red-500 border-2" : ""}
                    >
                      <SelectValue placeholder="Seleccioná tu provincia" />
                    </SelectTrigger>
                    <SelectContent>
                      {provinciasArgentinas.map((provincia) => (
                        <SelectItem key={provincia} value={provincia}>
                          {provincia}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="localidad">Localidad *</Label>
                  <Input
                    id="localidad"
                    value={formData.localidad}
                    onChange={(e) => setFormData({ ...formData, localidad: e.target.value })}
                    placeholder="Tu localidad"
                    disabled={isSubmitting}
                    className={validationErrors.localidad ? "border-red-500 border-2" : ""}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className={validationErrors.experiencia ? "text-red-500" : ""}>
                  ¿Tenés experiencia en arquería? *
                </Label>
                <RadioGroup
                  value={formData.experiencia}
                  onValueChange={(value) => setFormData({ ...formData, experiencia: value })}
                  disabled={isSubmitting}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="si" id="experiencia-si" />
                    <Label htmlFor="experiencia-si" className="font-normal cursor-pointer">
                      Sí
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="experiencia-no" />
                    <Label htmlFor="experiencia-no" className="font-normal cursor-pointer">
                      No
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="preguntasIntereses">Preguntas o intereses (opcional)</Label>
                <Textarea
                  id="preguntasIntereses"
                  value={formData.preguntasIntereses}
                  onChange={(e) => setFormData({ ...formData, preguntasIntereses: e.target.value })}
                  placeholder="Contanos qué te gustaría aprender o cualquier pregunta que tengas..."
                  rows={4}
                  className="resize-none"
                  disabled={isSubmitting}
                />
              </div>

              <Button type="submit" size="lg" className="w-full text-base" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar solicitud"}
              </Button>

              <p className="text-sm text-muted-foreground text-center">* Campos obligatorios</p>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
