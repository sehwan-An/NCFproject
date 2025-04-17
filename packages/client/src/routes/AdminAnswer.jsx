import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams } from 'react-router';
import { Container, Row, Table, Form } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AdminAnswer = () => {
  const { id } = useParams();
  const [post, setPosts] = useState(null);

  useEffect(() => {
    const token = Cookies.get('NCF');
    if (!token) {
      alert('환영합니다.');
    }
    axios
      .get(`http://localhost:3000/users/contact/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((err) => console.log(err.message));
  }, [id]);
  function convertDate(date) {
    if (!date) return '날짜 없음';
    const d = new Date(date);
    if (isNaN(d)) return '유효하지 않음';

    return d
      .toLocaleDateString('ko-KR', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
      })
      .replaceAll(',', '')
      .replaceAll(' ', '-');
  }

  return (
    <>
      <Container>
        <Row>
          <h2 className="text-center mb-5">고객문의 상세보기</h2>
            <Table>
              <tbody>
                <tr>
                  <th>제목</th>
                  <td></td>
                </tr>
                <tr>
                  <th>내용</th>
                  <td></td>
                </tr>
                <tr>
                  <th>작성자</th>
                  <td></td>
                </tr>
                <tr>
                  <th>작성일</th>
                  <td></td>
                </tr>
                <tr>
                  <th>첨부파일</th>
                  <td></td>
                </tr>
              </tbody>
            </Table>
        </Row>
        <hr />
        <Row>
          <h2 className="text-center mb-5">답변</h2>
          <Table>
          <Form.Control as="textarea" rows={5} name="contact_content" />
          <button className="my-4">등록하기</button>
          </Table>
        </Row>
      </Container>
    </>
  );
};

export default AdminAnswer;
