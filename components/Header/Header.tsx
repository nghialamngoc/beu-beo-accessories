import Image from 'next/image'
import { FC } from 'react'

export const Header: FC = async () => {
  return (
    <div className="mx-auto max-w-screen-xl">
      <Image className="mt-[-20px] mb-[-20px]" src="/logo-2.png" width={180} height={180} alt="logo" />
    </div>
  )
}
