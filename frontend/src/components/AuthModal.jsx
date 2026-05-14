import { Link } from 'react-router-dom';

const AuthModal = ({ mode = 'login', children }) => {
  const isLogin = mode === 'login';

  return (
    <main className="auth-shell">
      <section className="auth-panel">
        <div>
          <p className="eyebrow">Thiranex Blog Platform</p>
          <h1>{isLogin ? 'Welcome back' : 'Create your writer account'}</h1>
          <p className="muted">
            {isLogin
              ? 'Login to publish stories, manage your dashboard, and comment on posts.'
              : 'Register to start publishing thoughtful posts and growing your archive.'}
          </p>
        </div>
        {children}
        <p className="auth-switch">
          {isLogin ? 'New here?' : 'Already registered?'}{' '}
          <Link to={isLogin ? '/register' : '/login'}>{isLogin ? 'Create an account' : 'Login'}</Link>
        </p>
      </section>
    </main>
  );
};

export default AuthModal;
