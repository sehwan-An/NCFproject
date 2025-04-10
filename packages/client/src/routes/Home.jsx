import React from 'react'
import { Outlet } from 'react-router'
import SiteHeader from '../layouts/SiteHeader'
import SiteFooter from '../layouts/SiteFooter'

const Home = () => {
  return (
    <div>
<SiteHeader/>
<Outlet></Outlet>
<SiteFooter/>
    </div>
  )
}

export default Home