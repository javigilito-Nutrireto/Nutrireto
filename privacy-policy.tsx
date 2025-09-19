import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSettings } from '@/hooks/settings-store';

export default function PrivacyPolicyScreen() {
  const { colors } = useSettings();

  const styles = createStyles(colors);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.title}>Política de Privacidad</Text>
        <Text style={styles.lastUpdated}>Última actualización: {new Date().toLocaleDateString('es-ES')}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Información que Recopilamos</Text>
          <Text style={styles.text}>
            En Nutrireto recopilamos la siguiente información para brindarte un servicio personalizado:
          </Text>
          <Text style={styles.bulletPoint}>• Datos personales: nombre, email, edad, peso, altura</Text>
          <Text style={styles.bulletPoint}>• Preferencias alimentarias y objetivos nutricionales</Text>
          <Text style={styles.bulletPoint}>• Alergias e intolerancias alimentarias</Text>
          <Text style={styles.bulletPoint}>• Historial de comidas y favoritos</Text>
          <Text style={styles.bulletPoint}>• Datos de uso de la aplicación</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Cómo Utilizamos tu Información</Text>
          <Text style={styles.text}>Utilizamos tu información para:</Text>
          <Text style={styles.bulletPoint}>• Generar menús personalizados según tus necesidades</Text>
          <Text style={styles.bulletPoint}>• Mejorar nuestros algoritmos de recomendación</Text>
          <Text style={styles.bulletPoint}>• Enviarte notificaciones relevantes (si las has activado)</Text>
          <Text style={styles.bulletPoint}>• Proporcionar soporte técnico</Text>
          <Text style={styles.bulletPoint}>• Cumplir con obligaciones legales</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Compartir Información</Text>
          <Text style={styles.text}>
            No vendemos, alquilamos ni compartimos tu información personal con terceros, excepto:
          </Text>
          <Text style={styles.bulletPoint}>• Con tu consentimiento explícito</Text>
          <Text style={styles.bulletPoint}>• Para cumplir con la ley o procesos legales</Text>
          <Text style={styles.bulletPoint}>• Con proveedores de servicios que nos ayudan a operar la app</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Seguridad de los Datos</Text>
          <Text style={styles.text}>
            Implementamos medidas de seguridad técnicas y organizativas para proteger tu información:
          </Text>
          <Text style={styles.bulletPoint}>• Cifrado de datos en tránsito y en reposo</Text>
          <Text style={styles.bulletPoint}>• Acceso restringido a información personal</Text>
          <Text style={styles.bulletPoint}>• Auditorías regulares de seguridad</Text>
          <Text style={styles.bulletPoint}>• Almacenamiento local seguro en tu dispositivo</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Tus Derechos (GDPR/LOPD)</Text>
          <Text style={styles.text}>Tienes derecho a:</Text>
          <Text style={styles.bulletPoint}>• Acceder a tu información personal</Text>
          <Text style={styles.bulletPoint}>• Rectificar datos incorrectos</Text>
          <Text style={styles.bulletPoint}>• Solicitar la eliminación de tus datos</Text>
          <Text style={styles.bulletPoint}>• Portabilidad de datos</Text>
          <Text style={styles.bulletPoint}>• Oponerte al procesamiento</Text>
          <Text style={styles.bulletPoint}>• Retirar el consentimiento en cualquier momento</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Retención de Datos</Text>
          <Text style={styles.text}>
            Conservamos tu información personal solo durante el tiempo necesario para los fines descritos 
            en esta política, o según lo requiera la ley. Puedes solicitar la eliminación de tu cuenta 
            y datos en cualquier momento.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Cookies y Tecnologías Similares</Text>
          <Text style={styles.text}>
            Utilizamos tecnologías de almacenamiento local para mejorar tu experiencia:
          </Text>
          <Text style={styles.bulletPoint}>• Preferencias de la aplicación</Text>
          <Text style={styles.bulletPoint}>• Datos de sesión</Text>
          <Text style={styles.bulletPoint}>• Cache de contenido para mejor rendimiento</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. Menores de Edad</Text>
          <Text style={styles.text}>
            Nutrireto no está dirigida a menores de 16 años. No recopilamos conscientemente 
            información personal de menores de 16 años sin el consentimiento parental.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>9. Cambios en la Política</Text>
          <Text style={styles.text}>
            Podemos actualizar esta política ocasionalmente. Te notificaremos sobre cambios 
            significativos a través de la aplicación o por email.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>10. Contacto</Text>
          <Text style={styles.text}>
            Para cualquier consulta sobre esta política de privacidad o para ejercer tus derechos, 
            puedes contactarnos en:
          </Text>
          <Text style={styles.contact}>📧 contacto@vidasaludablehoy.com</Text>
          <Text style={styles.text}>
            Responderemos a tu solicitud en un plazo máximo de 30 días.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Esta política de privacidad cumple con el Reglamento General de Protección de Datos (GDPR) 
            y la Ley Orgánica de Protección de Datos Personales y garantía de los derechos digitales (LOPD-GDD).
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
