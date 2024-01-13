import {React, useState} from 'react'
import Form from '../element/form'
import { registerUser } from '../Method/registerUser';
import Alert from '../element/Alert';
import {Link,useNavigate} from 'react-router-dom'
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    password: '',
    age: '',
    photo: null,
  });
  const [error, setError] = useState(null);
  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handlePhotoChange = (e) => {
    setFormData({
      ...formData,
      photo: e.target.files[0],
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await registerUser(formData);
    if (data && data.status === 200) {
      setError("Registrasi berhasil");
      navigate('/');
    } else if (data && Array.isArray(data)) {
      setError(data.map((errorDetail) => errorDetail.msg).join("\n"));
    } else {
      setError(data.code);
    }
  };

  return (
    <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
            className="mx-auto h-40 w-auto"
            src="logo.gif"
            alt="Logo"
          />
        <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register Account
        </h2>
      </div>
       {error && <Alert msg={error} />}
      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-1" onSubmit={handleSubmit}>
          <Form 
          teks="Email address" 
          name="email" 
          type="email"
          value ={formData.email}
          onchange={handleChange}/>
          <Form 
          teks="name" 
          name="name" 
          type="text"
          value ={formData.name}
          onchange={handleChange}/>
          <Form 
          teks="phone" 
          name="phone" 
          type="text"
          value ={formData.phone}
          onchange={handleChange}/>
          <Form 
          teks="age" 
          name="age" 
          type="number"
          value ={formData.age}
          onchange={handleChange}/>
          <Form 
          teks="image" 
          name="photo" 
          type="file"
          onchange={handlePhotoChange}/>
          <Form 
          teks="Password" 
          name="password" 
          type="password"
          value ={formData.password}
          onchange={handleChange}/>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Register
            </button>
          </div>
        </form>

        <p className="mt-2 text-center text-sm text-gray-500">
          You Have an Account ?{' '}
          <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
           Login
          </Link>
        </p>
      </div>
    </div>
  </>
  )
}

export default Register