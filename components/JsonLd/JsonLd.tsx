import { Thing, WithContext } from 'schema-dts'

export interface JsonLdProps<T extends Thing> {
  data: WithContext<T>
}

export const JsonLd = <T extends Thing>({ data }: JsonLdProps<T>) => {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
