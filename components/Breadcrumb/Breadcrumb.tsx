import { FC, Fragment } from 'react'
import clsx from 'clsx'
import { WithContext, BreadcrumbList } from 'schema-dts'
import { JsonLd } from '@/components/JsonLd'
import { IconChevronRight } from '@/icons/IconChevronRight'
import Link from '@/components/Link'

export interface BreadcrumbProps {
  links: { title: string; href: string }[]
  className?: string
}

export const Breadcrumb: FC<BreadcrumbProps> = ({ links, className }) => {
  const jsonLd: WithContext<BreadcrumbList> = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: links.map((link, index) => {
      return {
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@id': link.href,
          name: link.title,
        },
      }
    }),
  }

  return (
    <Fragment>
      <JsonLd data={jsonLd} />
      <ol className={clsx('relative flex flex-wrap items-center gap-4', className)} aria-label="Breadcrumb">
        {links.map(({ title, href }, index) => (
          <Fragment key={index}>
            <li className="text-sm">
              <Link
                className={clsx('flex items-center gap-4 text-14', {
                  'bg-slate-100 px-8 py-2 rounded-16 hover:text-primary active:text-primary md:px-12 md:py-4':
                    index + 1 < links.length,
                  'pointer-events-none': index + 1 === links.length,
                })}
                title={title}
                href={href}
              >
                {title}
              </Link>
            </li>
            {index + 1 < links.length && (
              <li>
                <IconChevronRight className="w-16 h-16" />
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </Fragment>
  )
}
