import Image from 'next/image'
import { FC } from 'react'

export const Header: FC = async () => {
  return (
    <div className="mx-auto max-w-screen-xl">
      <div className="relative w-[240px] h-[72px] ml-4 md:ml-0">
        <Image src="/logo.png" fill alt="logo" />
      </div>
    </div>
  )
}
