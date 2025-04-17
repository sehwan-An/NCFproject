import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useParams, useNavigate } from 'react-router';
const UserCare = () => {
  const [posts, setPosts] = useState(null);
  let params = useParams();
  console.log(params);
  let navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('NCF');

    if (!token) {
      alert('환영합니다.');
    }
    axios
      .get('http://localhost:3000/users/contact/', {
        headers:{
Authorization:`Bearer ${token}`
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);
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
  function goAnswer(id) {
    navigate(`/AdminAnswer/${id}`);
  }

  return (
    <>
      <Container className="py-3">
        <Row>
          <h2 className="text-center mb-5">고객 문의사항</h2>
          <table className="table">
            <thead>
              <tr>
                <th>제목</th>
                <th>문의내역</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>처리상태</th>
              </tr>
            </thead>
            <tbody>
              {posts &&
                posts.map((post) => (
                  <tr key={post._id}>
                    <td>{post.contact_title}</td>
                    <td>{post.contact_type}</td>
                    <td>{post.author.username}</td>
                    <td>{convertDate(post.createdAt)}</td>
                    <td>
                      {post.contact_status}
                      <span onClick={() => goAnswer(post._id)}>
                        <i class="bi bi-pen"></i>
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Row>
      </Container>
    </>
  );
};

export default UserCare;
