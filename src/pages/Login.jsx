import React from 'react';
import LoginPageComponent from '../components/LoginPage';

const Login = () => {
  /**
   * login(email, password, persist)
   * persist: true → localStorage(영구), false → sessionStorage(탭 종료 시 만료)
   * */

  return (
    <LoginPageComponent>
      <section className="mx-auto max-w-md space-y-4">
        <h1 className="text-2xl font-bold">로그인</h1>
      </section>
    </LoginPageComponent>
  );
};

export default Login;
