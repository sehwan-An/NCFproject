import { useEffect, useState } from 'react'
import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import {Container, Row, Col} from 'react-bootstrap'


const UserCare = () =>  {
const [posts, setPosts] = useState(null)


useEffect(() => {
const  token = Cookies.get('NCF')
if(!token) {
    alert("환영합니다.")
}
axios.get('http://localhost:3000/users/contact/',{
    withCredentials:true,
})
.then((res) => {
    console.log(res)
    setPosts(res.data)
})
.catch((err) => console.log(err.message))
}, [])
function convertDate(date){ 
    return new Date(date).toLocaleDateString('ko-KR', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
  }).replaceAll(',','').replaceAll(' ','-')
  }



  return (
    <>
    <Container className='py-3'>
        <Row>
            <h2 className='text-center mb-5'>고객 문의사항</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>제목</th>
                        <th>문의내역</th>
                        <th>작성자</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                   {posts && 
                   posts.map((post)=>(
                    <tr>
                        <td>{post.contact_title}</td>
                        <td>{post.contact_type}</td>
                        <td>{post.guest.}</td>
                        <td>{convertDate(post.createdAt)}</td>
                    </tr>
                   ))}
                </tbody>
            </table>
        </Row>
    </Container>
    </>
  )
}

export default UserCare