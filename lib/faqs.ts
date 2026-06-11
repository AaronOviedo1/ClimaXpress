export type Faq = {
  question: string;
  answer: string;
};

/**
 * Preguntas frecuentes — único origen de datos para la sección visible y para
 * el FAQPage JSON-LD. El texto del schema DEBE coincidir con lo que se muestra
 * en pantalla (requisito de Google para resultados enriquecidos de FAQ).
 */
export const faqs: Faq[] = [
  {
    question: '¿Cuánto cuesta rentar un aerocooler en Hermosillo?',
    answer:
      'La renta de aerocoolers en Hermosillo va desde $450 MXN por día el modelo Eco-Fresco y $650 MXN por día el Turbo-Frío, con entrega e instalación profesional incluida. El costo de envío depende de la distancia y lo calculas al instante en nuestro cotizador.',
  },
  {
    question: '¿Cuánto cuesta rentar un calentón?',
    answer:
      'La renta de calentones (calentadores de paso a gas) es de $550 MXN por día, con instalación incluida. Solo se suma el costo de envío según tu distancia dentro de Hermosillo y alrededores.',
  },
  {
    question: '¿Hacen entrega e instalación a domicilio?',
    answer:
      'Sí. Entregamos e instalamos a domicilio en Hermosillo, San Carlos y San Pedro el Saucito, dentro de un radio de hasta 35 km. El costo de envío arranca desde $89 MXN y depende de la distancia; lo ves al momento en el cotizador.',
  },
  {
    question: '¿Por cuántos días puedo rentar un equipo?',
    answer:
      'Puedes rentar desde 1 día. En el cotizador eliges la cantidad de días y de equipos (puedes combinar aerocoolers y calentones) y te damos el total con el envío incluido al instante.',
  },
  {
    question: '¿Qué necesito para rentar y cómo reservo?',
    answer:
      'Solo escríbenos por WhatsApp. No pedimos anticipo: confirmamos disponibilidad, coordinamos la entrega y nuestro equipo se encarga de la instalación.',
  },
  {
    question: '¿Qué es un aerocooler y para qué sirve?',
    answer:
      'Un aerocooler es un enfriador evaporativo que refresca el aire con un consumo eléctrico mínimo. Es ideal para el clima cálido y seco de Hermosillo y mantiene el aire limpio y renovado, a diferencia del aire acondicionado tradicional.',
  },
];
