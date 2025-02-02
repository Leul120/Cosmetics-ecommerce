import React, { useEffect, useState,Fragment, useContext } from 'react';
import { FiSearch, FiEdit2, FiTrash2, FiMail, FiPhone, FiCalendar, FiDollarSign, FiMapPin, FiStar, FiImage, FiUser, FiCheck, FiX } from 'react-icons/fi';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import { AppContext } from '../../App';

const UserManagement = () => {
  const {token}=useContext(AppContext)
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Sample user data - replace with real data in a production environment
  const [users, setUsers] = useState([]);

  const getAllUsers=async ()=>{
    try{
      const response=await axios.get(`${process.env.REACT_APP_URL}/user/get-all-users`,{headers:{
        Authorization:`Bearer ${token}`
      }})
      setUsers(response.data)
    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    getAllUsers()
  },[])

  const filteredUsers = users?.filter(user =>
    user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsEditModalOpen(true);
  };

  const handleUpdate = (updatedUser) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    setIsEditModalOpen(false);
  };

  const EditModal = ({ isOpen, onClose, user, onUpdate }) => {
    const [editedUser, setEditedUser] = useState(user);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setEditedUser(prev => ({ ...prev, [name]: value }));
    };

    const handleAddressChange = (e) => {
      const { name, value } = e.target;
      setEditedUser(prev => ({ ...prev, address: { ...prev.address, [name]: value } }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onUpdate(editedUser);
    };

    return (
      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
            </Transition.Child>

            <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                {/* <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Edit User
                </Dialog.Title> */}
                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                      Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      type="text"
                      name="name"
                      value={editedUser?.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      name="email"
                      value={editedUser?.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
                      Phone Number
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="phoneNumber"
                      type="text"
                      name="phoneNumber"
                      value={editedUser?.phoneNumber}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="street">
                      Street
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="street"
                      type="text"
                      name="street"
                      value={editedUser?.address?.street}
                      onChange={handleAddressChange}
                    />
                  </div>
                  {/* Add more fields for city, state, zipCode, country */}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="preferredSkinType">
                      Preferred Skin Type
                    </label>
                    <select
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="preferredSkinType"
                      name="preferredSkinType"
                      value={editedUser?.preferredSkinType}
                      onChange={handleChange}
                    >
                      <option value="Oily">Oily</option>
                      <option value="Dry">Dry</option>
                      <option value="Combination">Combination</option>
                      <option value="Normal">Normal</option>
                    </select>
                  </div>
                  {/* Add more fields as needed */}
                  <div className="flex items-center justify-between">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Update
                    </button>
                    <button
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={onClose}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">User Management</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center mb-4">
          <FiSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Phone</th>
                <th className="py-3 px-6 text-left">Join Date</th>
                <th className="py-3 px-6 text-left">Total Spent</th>
               
                <th className="py-3 px-6 text-left">Verified</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="mr-2">
                        <img className="w-6 h-6 rounded-full" src={user.profileImage || `https://ui-avatars.com/api/?name=${user.name}&background=random`} alt={user.name} />
                      </div>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <div className="flex items-center">
                      <FiMail className="mr-2" />
                      <span>{user.email}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <div className="flex items-center">
                      <FiPhone className="mr-2" />
                      <span>{user.phoneNumber}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <div className="flex items-center">
                      <FiCalendar className="mr-2" />
                      <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <div className="flex items-center">
                      <FiDollarSign className="mr-2" />
                      <span>{user.spent?.toFixed(2)}</span>
                    </div>
                  </td>
                  
                  
                  <td className="py-3 px-6 text-left">
                    <div className="flex items-center">
                      {user.isVerified ? <FiCheck className="text-green-500 mr-2" /> : <FiX className="text-red-500 mr-2" />}
                      <span>{user.isVerified ? 'Yes' : 'No'}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex item-center justify-center">
                      <button onClick={() => handleEdit(user)} className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                        <FiEdit2 />
                      </button>
                      <button onClick={() => handleDelete(user.id)} className="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={currentUser}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default UserManagement;