import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import Body from '../../components/Body/Body'
import Testimonials from '../../components/Testimonals/Testimonals'
import Footer from '../../components/Footer/Footer'

const Home = () => {
  return (
    <div>
      <Navbar/>

      <Body/>
      <br/><br/>
      <Testimonials/>
      <br/><br/>
      <Footer/>
    </div>
  )
}

export default Home
