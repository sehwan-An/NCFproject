import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams, useNavigate } from 'react-router';
import { Container, Row, Table, Form } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AdminAnswer = () => {
  const { id } = useParams();
  const [token, setToken] = useState(null);
  const [post, setPost] = useState(null);
  
  let navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get('NCF');
    if (!token) {
      alert('환영합니다.');
    }
    setToken(token)

    axios
      .get(`http://localhost:3000/users/contact/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setPost(Array.isArray(res.data) ? res.data[0] : res.data); // 수정
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

  const updateAnswer = async () => {
    try {
      await axios.patch(`http://localhost:3000/users/contact/${id}/status`, null, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        console.log(res)
        alert('처리완료로 변경되었습니다.');
        navigate(-1); // 이전 페이지로 이동
      }).catch ((err) => {
        console.error(err);
        alert('업데이트 실패'); 
      })
    } catch(e) {
      console.log(e)
    }
  };

  return (
    <Container>
      <Row>
        <h2 className="text-center mb-5">고객문의 상세보기</h2>
        <hr />
        <Table>
          <tbody>
            <tr className="d-flex gap-3">
              <th>제목</th>
              <td>{post?.contact_title}</td>
            </tr>
            <tr className="d-flex gap-3">
              <th>내용</th>
              <td>{post?.contact_content}</td>
            </tr>
            <tr className="d-flex gap-3">
              <th>작성자</th>
              <td>{post?.author?.username}</td>
            </tr>
            <tr className="d-flex gap-3">
              <th>작성일</th>
              <td>{convertDate(post?.createdAt)}</td>
            </tr>
            <tr className="d-flex gap-3">
              <th>첨부파일</th>
              <td></td>
            </tr>
          </tbody>
        </Table>
      </Row>
      <Row>
        <h2 className="text-center mb-5">답변</h2>
        <Form>
          <Form.Control as="textarea" rows={5} name="contact_content" />
          <button className="my-4" type="button" onClick={updateAnswer}>
            등록하기
          </button>
        </Form>
      </Row>
    </Container>
  );
};

export default AdminAnswer;
