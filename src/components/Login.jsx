import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // 로그인 상태 관리
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  // 회원가입 상태 관리
  const [signupId, setSignupId] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupName, setSignupName] = useState('');

  // 회원가입 창 노출 여부 관리
  const [showSignup, setShowSignup] = useState(false);

  // 로그인 핸들러
  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const foundUser = users.find(
      (user) => user.id === userId && user.password === password
    );

    if (!foundUser) {
      const userExists = users.some((user) => user.id === userId);
      if (!userExists) {
        alert('회원가입이 필요합니다.');
        setShowSignup(true);
        setSignupId(userId);
      } else {
        alert('아이디 또는 비밀번호가 맞지 않습니다.');
      }
    } else {
      /**
       * persist: false -> sessionStorage 저장 (탭/브라우저 종료 시 자동 로그아웃)
       */
      login(userId, password, false);
      navigate('/');
    }
  };

  // 회원가입 핸들러
  const handleSignup = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.some((user) => user.id === signupId)) {
      alert('이미 존재하는 아이디입니다.');
      return;
    }

    const newUser = { id: signupId, password: signupPassword, name: signupName };
    users.push(newUser);

    localStorage.setItem('users', JSON.stringify(users));
    alert('회원가입이 완료되었습니다. 로그인해주세요.');

    setSignupId('');
    setSignupPassword('');
    setSignupName('');
    setShowSignup(false);
  };

  return (
    <section className="mx-auto max-w-md space-y-4">
      <h1 className="text-2xl font-bold">로그인</h1>
      
      {/* 로그인 폼 */}
      <form onSubmit={handleLogin} className="space-y-3">
        <div>
          <input
            type="text"
            placeholder="아이디"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          로그인 버튼
        </button>
      </form>

      {/* 회원가입 정보가 없을 경우 보여지는 회원가입 폼 */}
      {showSignup && (
        <div className="mt-6 border-t pt-4">
          <h2 className="text-xl font-bold mb-3">회원가입</h2>
          <form onSubmit={handleSignup} className="space-y-3">
            <div>
              <input
                type="text"
                placeholder="이름"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                required
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="아이디"
                value={signupId}
                onChange={(e) => setSignupId(e.target.value)}
                required
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="비밀번호"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
                className="w-full border p-2 rounded"
              />
            </div>
            <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
              회원가입 버튼
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default LoginPage;