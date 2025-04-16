import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams } from 'react-router';
import { Container, Row, Table } from 'react-bootstrap';
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
          {post ? (
            <Table>
              <tbody>
                <tr>
                  <th>제목</th>
                  <td>{post.contact_title}</td>
                </tr>
                <tr>
                  <th>내용</th>
                  <td>{post.contact_content}</td>
                </tr>
                <tr>
                  <th>작성자</th>
                  <td>{post.author?.username}</td>
                </tr>
                <tr>
                  <th>작성일</th>
                  <td>{convertDate(post.createdAt)}</td>
                </tr>
                <tr>
                  <th>처리상태</th>
                  <td>{post.contact_status}</td>
                </tr>
              </tbody>
            </Table>
          ) : (
            <p>문의 정보를 불러오는 중입니다...</p>
          )}
        </Row>
      </Container>
    </>
  );
};

export default AdminAnswer;
