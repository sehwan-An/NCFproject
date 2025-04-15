import { usetState } from 'react'
import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import {Container, Row, Col} from 'react-bootstrap'


const UserCare = () =>  {




  return (
    <>
    <Container>
        <Row>
            <Col>
            <h2>고객 문의사항</h2>
            <table>
                <thead>
                    <tr>
                        <th>제목</th>
                        <th>문의내역</th>
                        <th>작성자</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            </Col>
        </Row>
    </Container>
    </>
  )
}

export default UserCare