/**
 * Inyecta un bloque de datos estructurados schema.org como JSON-LD.
 * Server component: el <script> se renderiza en el HTML inicial.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
