import React from 'react'
import { Button } from 'react-bootstrap'
import { NavLink } from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Outlet } from 'react-router'
const Management = () => {
  return (
    <>  
        <nav className='d-flex gap-5 justify-content-center align-items-center my-3'>
            <NavLink to='#'>
                <button>주문관리</button>
            </NavLink>
            <NavLink to='#'>
                <button>고객관리</button>
            </NavLink>
            <NavLink to='products'>
                <button>상품관리</button>
            </NavLink>
        </nav>
        <Outlet></Outlet>
        
    </>
  )
}

export default Management