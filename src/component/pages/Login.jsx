import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginUser from '../Method/loginUser.js';
import Form from '../element/form';
import Alert from '../element/Alert.jsx';
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await loginUser(formData);

    if (data.status === 200) {
      const accessToken = data.data.access_token;
      localStorage.setItem('token', accessToken);
      navigate('/');
    } else {
      setError(data);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-40 w-auto"
            src="logo.gif"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
          {error && <Alert msg={error} />}
          <form className="space-y-6 mt-2" onSubmit={handleSubmit}>
            <Form
              teks="Email address"
              name="username"
              type="email"
              value={formData.username}
              onchange={handleChange}
            />
            <Form
              teks="Password"
              name="password"
              type="password"
              value={formData.password}
              onchange={handleChange}
            />
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-2 text-center text-sm text-gray-500">
            Do you not account?{' '}
            <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
