import React, { useState } from "react";
import './Login.css';
import { FaPhone, FaUser, FaLock, FaEnvelope, FaBirthdayCake, FaTransgender } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const [action, setAction] = useState(''); // Controla la vista actual (login o registro)

  const registerLink = () => setAction('active');
  const loginLink = () => setAction('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const response = await fetch('http://localhost:4000/apiauthentication/authentications/all', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Login successful!');
        console.log(data);
        // Manejar el token de autenticación si es necesario (almacenar en localStorage o contexto)
        // Ejemplo:
        // localStorage.setItem('authToken', data.token);
      } else {
        const errorData = await response.json();
        alert(`Login failed: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred!');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    const userFormData = {
      username: e.target.username.value,
      email: e.target.email.value,
      phoneNumber: e.target.phoneNumber.value,
      fullName: e.target.fullName.value,
      birthDate: e.target.birthDate.value,
      gender: e.target.gender.value,
      password: e.target.password.value,
      role: e.target.role.value,
    };

    try {
      // Registrar el usuario
      const response = await fetch('http://localhost:4000/users/userscreate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userFormData),
      });

      if (response.ok) {
        alert('Registration successful!');
        setAction(''); // Regresar a la vista de login después del registro exitoso
      } else {
        const errorData = await response.json();
        alert(`Registration failed: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert('An error occurred!');
    }
  };

  return (
    <div className={`wrapper ${action}`}>
      <div className={`form-box login ${action === 'active' ? 'inactive' : ''}`}>
        <form onSubmit={handleLoginSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <input type="email" name="email" placeholder="Email" required />
            <FaEnvelope className="icon" />
          </div>
          <div className="input-box">
            <input type="password" name="password" placeholder="Password" required />
            <FaLock className="icon" />
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>
          <Link to="/" type="submit" className="button">Login</Link>
          <div className="register-link">
            <p>Don't have an account? <a href="#" onClick={registerLink}>Register</a></p>
          </div>
        </form>
      </div>

      <div className={`form-box register ${action === '' ? 'inactive' : ''}`}>
        <form onSubmit={handleRegisterSubmit}>
          <h1>Registration</h1>
          <div className="input-box">
            <input type="text" name="username" placeholder="Username" required />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input type="email" name="email" placeholder="Email" required />
            <FaEnvelope className="icon" />
          </div>
          <div className="input-box">
            <input type="password" name="password" placeholder="Password" required />
            <FaLock className="icon" />
          </div>
          <div className="input-box">
            <input type="text" name="phoneNumber" placeholder="Phone Number" required />
            <FaPhone className="icon" />
          </div>
          <div className="input-box">
            <input type="text" name="fullName" placeholder="Full Name" required />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input type="date" name="birthDate" />
            <FaBirthdayCake className="icon" />
          </div>
          <div className="input-box">
            <input type="text" name="gender" placeholder="Gender" />
            <FaTransgender className="icon" />
          </div>
          <div className="input-box">
          <select name="role" required>
            <option value="" disabled>Select Role</option>
            <option value="Vendedor">Vendedor</option>
            <option value="Cliente">Cliente</option>
          </select>
        </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              I agree to the terms & conditions
            </label>
          </div>
          <button className="button"type="submit">Register</button>
          <div className="register-link">
            <p>Already have an account? <a href="#" onClick={loginLink}>Login</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
