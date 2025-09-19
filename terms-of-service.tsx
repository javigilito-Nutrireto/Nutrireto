import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSettings } from '@/hooks/settings-store';

export default function TermsOfServiceScreen() {
  const { colors } = useSettings();

  const styles = createStyles(colors);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.title}>Términos de Uso</Text>
        <Text style={styles.lastUpdated}>Última actualización: {new Date().toLocaleDateString('es-ES')}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Aceptación de los Términos</Text>
          <Text style={styles.text}>
            Al descargar, instalar o usar Nutrireto, aceptas estar sujeto a estos términos de uso. 
            Si no estás de acuerdo con estos términos, no uses la aplicación.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Descripción del Servicio</Text>
          <Text style={styles.text}>
            Nutrireto es una aplicación móvil que proporciona:
          </Text>
          <Text style={styles.bulletPoint}>• Menús personalizados basados en tus preferencias</Text>
          <Text style={styles.bulletPoint}>• Recetas saludables y nutritivas</Text>
          <Text style={styles.bulletPoint}>• Seguimiento de objetivos nutricionales</Text>
          <Text style={styles.bulletPoint}>• Recomendaciones alimentarias personalizadas</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Registro y Cuenta de Usuario</Text>
          <Text style={styles.text}>
            Para usar ciertas funciones de Nutrireto, debes:
          </Text>
          <Text style={styles.bulletPoint}>• Proporcionar información precisa y actualizada</Text>
          <Text style={styles.bulletPoint}>• Mantener la seguridad de tu cuenta</Text>
          <Text style={styles.bulletPoint}>• Notificar inmediatamente cualquier uso no autorizado</Text>
          <Text style={styles.bulletPoint}>• Ser responsable de toda actividad en tu cuenta</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Planes de Suscripción</Text>
          <Text style={styles.text}>Nutrireto ofrece diferentes planes:</Text>
          <Text style={styles.bulletPoint}>• Plan Gratuito: Acceso limitado a funciones básicas</Text>
          <Text style={styles.bulletPoint}>• Plan Estándar: Acceso a más recetas y funciones</Text>
          <Text style={styles.bulletPoint}>• Plan Premium: Acceso completo a todas las funciones</Text>
          <Text style={styles.text}>
            Los precios y características pueden cambiar con previo aviso de 30 días.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Pagos y Facturación</Text>
          <Text style={styles.text}>
            Para suscripciones de pago:
          </Text>
          <Text style={styles.bulletPoint}>• Los pagos se procesan de forma segura</Text>
          <Text style={styles.bulletPoint}>• Las suscripciones se renuevan automáticamente</Text>
          <Text style={styles.bulletPoint}>• Puedes cancelar en cualquier momento</Text>
          <Text style={styles.bulletPoint}>• No hay reembolsos por períodos parciales</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Uso Aceptable</Text>
          <Text style={styles.text}>Te comprometes a NO:</Text>
          <Text style={styles.bulletPoint}>• Usar la app para fines ilegales o no autorizados</Text>
          <Text style={styles.bulletPoint}>• Intentar acceder a sistemas no autorizados</Text>
          <Text style={styles.bulletPoint}>• Interferir con el funcionamiento de la aplicación</Text>
          <Text style={styles.bulletPoint}>• Compartir contenido inapropiado u ofensivo</Text>
          <Text style={styles.bulletPoint}>• Violar derechos de propiedad intelectual</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Contenido y Propiedad Intelectual</Text>
          <Text style={styles.text}>
            Todo el contenido de Nutrireto (recetas, textos, imágenes, diseños) está protegido por 
            derechos de autor y otras leyes de propiedad intelectual. No puedes:
          </Text>
          <Text style={styles.bulletPoint}>• Copiar, modificar o distribuir nuestro contenido</Text>
          <Text style={styles.bulletPoint}>• Usar nuestras marcas comerciales sin autorización</Text>
          <Text style={styles.bulletPoint}>• Realizar ingeniería inversa de la aplicación</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. Descargo de Responsabilidad Médica</Text>
          <Text style={styles.important}>
            IMPORTANTE: Nutrireto proporciona información nutricional general y no constituye 
            asesoramiento médico profesional. Siempre consulta con un profesional de la salud 
            antes de hacer cambios significativos en tu dieta, especialmente si tienes 
            condiciones médicas preexistentes.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>9. Limitación de Responsabilidad</Text>
          <Text style={styles.text}>
            Nutrireto se proporciona "tal como está". No garantizamos que:
          </Text>
          <Text style={styles.bulletPoint}>• El servicio esté libre de errores o interrupciones</Text>
          <Text style={styles.bulletPoint}>• La información sea completamente precisa</Text>
          <Text style={styles.bulletPoint}>• Se cumplan tus expectativas específicas</Text>
          <Text style={styles.text}>
            No seremos responsables por daños indirectos, incidentales o consecuentes.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>10. Terminación</Text>
          <Text style={styles.text}>
            Podemos suspender o terminar tu acceso a Nutrireto si:
          </Text>
          <Text style={styles.bulletPoint}>• Violas estos términos de uso</Text>
          <Text style={styles.bulletPoint}>• Usas la app de manera fraudulenta</Text>
          <Text style={styles.bulletPoint}>• No pagas las tarifas aplicables</Text>
          <Text style={styles.text}>
            Puedes cancelar tu cuenta en cualquier momento desde la configuración de la app.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>11. Modificaciones</Text>
          <Text style={styles.text}>
            Nos reservamos el derecho de modificar estos términos en cualquier momento. 
            Te notificaremos sobre cambios importantes a través de la aplicación o por email. 
            El uso continuado después de los cambios constituye tu aceptación.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>12. Ley Aplicable</Text>
          <Text style={styles.text}>
            Estos términos se rigen por las leyes españolas. Cualquier disputa se resolverá 
            en los tribunales competentes de España.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>13. Contacto</Text>
          <Text style={styles.text}>
            Para preguntas sobre estos términos de uso, contáctanos en:
          </Text>
          <Text style={styles.contact}>📧 contacto@vidasaludablehoy.com</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Al usar Nutrireto, confirmas que has leído, entendido y aceptado estos términos de uso 
            en su totalidad.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  lastUpdated: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    marginBottom: 4,
    marginLeft: 8,
  },
  important: {
    fontSize: 16,
    color: colors.warning,
    lineHeight: 24,
    fontWeight: '600',
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
  },
  contact: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
    marginVertical: 8,
  },
  footer: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  footerText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
