import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import defaultUsers from '../data/users.json';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // 로그인 상태 관리
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  // 컴포넌트가 처음 실행될 때 로컬스토리지에 기본 사용자 정보가 없으면 세팅
  useEffect(() => {
    const existingUsers = JSON.parse(localStorage.getItem('users'));
    if (!existingUsers || existingUsers.length === 0) {
      localStorage.setItem('users', JSON.stringify(defaultUsers));
    }
  }, []);

  // 로그인 핸들러
  const handleLogin = (e) => {
    e.preventDefault();

    // 로컬스토리지에 저장되어있는 users 꺼내옴
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // users를 find 사용해서 입력한 id,비번이 저장되어있는 id, password와 같은지 확인
    const foundUser = users.find(
      (user) => user.id === userId && user.password === password
    );

    // 같지 않으면 alert 출력
    if (!foundUser) {
      alert('아이디 또는 비밀번호가 올바르지 않습니다.');
    } else {
      // 같으면 홈 화면으로 이동
      login(userId, password, false);
      navigate('/');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl shadow-slate-100 border border-slate-100 transition-all">
        {/* 헤더 타이틀 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            로그인
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            서비스 이용을 위해 아이디와 비밀번호를 입력해주세요.
          </p>
        </div>

        {/* 로그인 폼 */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 ml-1">
              아이디
            </label>
            <input
              type="text"
              placeholder="아이디를 입력하세요"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all text-sm font-medium"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 ml-1">
              비밀번호
            </label>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all text-sm font-medium"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white font-semibold text-sm rounded-xl shadow-md transition-all duration-150 mt-2"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;