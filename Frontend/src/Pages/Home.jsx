import React from 'react'
import { About, Contact, Feedbacks, StarsCanvas } from '../components'
import Steps from '../components/Steps'
import Icon from '../components/Icon'
import Services from '../components/Services'


const Home = () => {
  return (
    <>
     <div className='relative z-0 bg-primary'>
        <About/>
        <Steps/>
        <Icon/>
        <Services/>
        <Feedbacks/>
        <div className='relative z-0'>
        <Contact/>
        <StarsCanvas/>
        </div>
      </div>
    
    </>
  )
}

export default Home