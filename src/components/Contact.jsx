import React from 'react'
import { CONTACT } from '../constants'
const Contact = () => {
  return (
    <div className='border-b border-neutral-900 pb-4 lg:mb-35'>
      <h1 className='my-10 text-center text-4xl'>Get in Touch</h1>
      <div className='text-center tracking-tighter'>
      <p className='my-4 text-neutral-600'>{CONTACT.address}</p>
      <p className='my-4 text-neutral-400'>{CONTACT.phoneNo}</p>
      <a className='border-b neutral-400' href="sameerkhanyt09@gmail.com">{CONTACT.email}</a>
      </div>
    </div>
  )
}

export default Contact
