export interface ITopNavigationItem {
  title: string
  href: string
  target?: string
  children: { title: string; href: string; target?: string }[]
}
