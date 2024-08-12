import React, { useEffect, useState } from 'react';
import { CiUser } from 'react-icons/ci';
import { IoIosPhonePortrait } from 'react-icons/io';
import { FaRegCalendarAlt, FaTransgender } from 'react-icons/fa';

// Fetch user profile data from the API
const fetchUserProfile = async () => {
    try {
        const response = await fetch('http://localhost:4000/users/user/66b924b604294dd1a847818f', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const dataJson = await response.json();
        return dataJson;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return null;
    }
};

// Update user profile data
const updateUserProfile = async (userData) => {
    try {
        const response = await fetch('http://localhost:4000/users/updateusers/66b924b604294dd1a847818f', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const dataJson = await response.json();
        return dataJson;
    } catch (error) {
        console.error('Error updating user profile:', error);
        return null;
    }
};

// Delete user profile
const deleteUserProfile = async () => {
    try {
        const response = await fetch('http://localhost:4000/users/deletedusers/66b924b604294dd1a847818f', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return true;
    } catch (error) {
        console.error('Error deleting user profile:', error);
        return false;
    }
};

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [alert, setAlert] = useState(null);
    const [roles] = useState(['Vendedor', 'Cliente']); // Roles available

    useEffect(() => {
        const getUserProfile = async () => {
            setLoading(true);
            const profileData = await fetchUserProfile();
            if (profileData) {
                setUser(profileData);
                setFormData({
                    username: profileData.username,
                    phoneNumber: profileData.phoneNumber,
                    fullName: profileData.fullName,
                    birthDate: profileData.birthDate,
                    gender: profileData.gender,
                    email: profileData.email,
                    password: '', // Empty initially for security
                    role: profileData.role
                });
            } else {
                setError('Error al obtener el perfil de usuario');
            }
            setLoading(false);
        };

        getUserProfile();
    }, []);

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleCancelClick = () => {
        setEditing(false);
        setFormData({
            username: user.username,
            phoneNumber: user.phoneNumber,
            fullName: user.fullName,
            birthDate: user.birthDate,
            gender: user.gender,
            email: user.email,
            password: '', // Empty initially for security
            role: user.role
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedUser = await updateUserProfile(formData);
        if (updatedUser) {
            setUser(updatedUser);
            setEditing(false);
            setAlert({ type: 'success', message: 'Perfil actualizado exitosamente' });
        } else {
            setError('Error al actualizar el perfil de usuario');
        }
    };

    const handleDelete = async () => {
        const isDeleted = await deleteUserProfile();
        if (isDeleted) {
            setAlert({ type: 'success', message: 'Perfil eliminado exitosamente' });
            setUser(null); // Clear the user data after deletion
        } else {
            setError('Error al eliminar el perfil de usuario');
        }
    };

    if (loading) {
        return <div className="text-center py-4 text-gray-500">Cargando...</div>;
    }

    if (error) {
        return <div className="text-center py-4 text-red-600">Error: {error}</div>;
    }

    if (!user) {
        return <div className="text-center py-4 text-gray-500">No hay datos de usuario disponibles</div>;
    }

    return (
        <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-800">
            <img
                className="object-cover object-center w-full h-56"
                src={user.profilePicture || ''}
                alt={`${user.fullName}'s profile`}
            />
            <div className="px-6 py-4">
                {alert && (
                    <div className={`p-4 mb-4 text-white rounded-md ${alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                        {alert.message}
                    </div>
                )}
                {editing ? (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-700 dark:text-gray-300">Nombre de Usuario</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username || ''}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="fullName" className="block text-gray-700 dark:text-gray-300">Nombre Completo</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName || ''}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phoneNumber" className="block text-gray-700 dark:text-gray-300">Número de Teléfono</label>
                            <input
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber || ''}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="birthDate" className="block text-gray-700 dark:text-gray-300">Fecha de Nacimiento</label>
                            <input
                                type="date"
                                id="birthDate"
                                name="birthDate"
                                value={formData.birthDate ? new Date(formData.birthDate).toISOString().split('T')[0] : ''}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="gender" className="block text-gray-700 dark:text-gray-300">Género</label>
                            <input
                                type="text"
                                id="gender"
                                name="gender"
                                value={formData.gender || ''}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300">Correo Electrónico</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email || ''}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 dark:text-gray-300">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password || ''}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="role" className="block text-gray-700 dark:text-gray-300">Rol</label>
                            <select
                                id="role"
                                name="role"
                                value={formData.role || ''}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                                <option value="" disabled>Select Role</option>
                                <option value="Vendedor">Vendedor</option>
                                <option value="Cliente">Cliente</option>
                            </select>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={handleCancelClick}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-2"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                                Guardar
                            </button>
                        </div>
                    </form>
                ) : (
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{user.username}</h1>
                        <p className="text-gray-600 dark:text-gray-300">{user.bio}</p>
                        <div className="flex items-center my-2">
                            <CiUser className="text-xl text-gray-500 dark:text-gray-300" />
                            <span className="ml-2 text-gray-900 dark:text-gray-100">{user.username}</span>
                        </div>
                        <div className="flex items-center my-2">
                            <IoIosPhonePortrait className="text-xl text-gray-500 dark:text-gray-300" />
                            <span className="ml-2 text-gray-900 dark:text-gray-100">{user.phoneNumber}</span>
                        </div>
                        <div className="flex items-center my-2">
                            <FaRegCalendarAlt className="text-xl text-gray-500 dark:text-gray-300" />
                            <span className="ml-2 text-gray-900 dark:text-gray-100">{new Date(user.birthDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center my-2">
                            <FaTransgender className="text-xl text-gray-500 dark:text-gray-300" />
                            <span className="ml-2 text-gray-900 dark:text-gray-100">{user.gender}</span>
                        </div>
                        <div className="flex items-center my-2">
                            <span className="ml-2 text-gray-900 dark:text-gray-100">Correo: {user.email}</span>
                        </div>
                        <div className="flex items-center my-2">
                            <span className="ml-2 text-gray-900 dark:text-gray-100">Rol: {user.role}</span>
                        </div>
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={handleEditClick}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                                Editar
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 text-white px-4 py-2 rounded-md"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
