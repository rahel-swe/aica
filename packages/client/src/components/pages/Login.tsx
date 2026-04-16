import GoogleLoginButton from '../auth/GoogleLoginButton';
import EmailLoginForm from '../auth/EmailLoginForm';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const { user, loading, logout } = useAuth;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return (
      <div>
        <h1>Welcome, {user.name || user.email}!</h1>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h1>Login to AICA</h1>
      <div style={{ marginBottom: '20px' }}>
        <GoogleLoginButton />
      </div>

      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <hr />
        <span style={{ background: 'white', padding: '0 10px' }}>or</span>
      </div>

      <EmailLoginForm />

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <p>
          Don't have an account? <a href="/register">Sign up</a>
        </p>
      </div>
    </div>
  );
}
