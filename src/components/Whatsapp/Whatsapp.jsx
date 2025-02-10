import Link from 'next/link';
import React from 'react'
import { FaWhatsapp } from "react-icons/fa6";

export default function Whatsapp() {
  return (
    <Link target='_blank' href="https://wa.me/971529498105" className='fixed bottom-5 right-5 rounded-full bg-themeMustard p-4 z-[1000000] text-2xl'><FaWhatsapp />
</Link>
  )
}
