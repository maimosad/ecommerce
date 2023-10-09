import React from 'react'
import notFound from '../../img/error.svg'

export default function NotFound() {
  return (
    <>
      <div className='text-center'>
        <img className='img-fluid' src={notFound} alt="Not Found" />
      </div>
    </>
  )
}
