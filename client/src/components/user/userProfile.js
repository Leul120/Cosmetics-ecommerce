import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProfilePage = () => {
  // State management for user data
  const [userInfo, setUserInfo] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    password: '',
  });

  const [savedAddresses, setSavedAddresses] = useState([
    '123 Main Street, City, ZIP',
    '456 Another Rd, City, ZIP',
  ]);

  const [paymentMethods, setPaymentMethods] = useState([
    'Visa **** 1234',
    'MasterCard **** 5678',
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState({ type: '', index: null });

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  // Validation for email and phone
  const validateInputs = () => {
    const { fullName, email, phone } = userInfo;
    if (!fullName || !email || !phone) {
      toast.error('All fields must be filled!');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email!');
      return false;
    }
    if (!/^\d{10}$/.test(phone)) {
      toast.error('Phone number must be 10 digits!');
      return false;
    }
    return true;
  };

  // Save profile changes (Mock function for updating via API)
  const handleSaveProfile = () => {
    if (validateInputs()) {
      // API call would go here
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    }
  };

  // Open Delete Modal
  const openDeleteModal = (type, index) => {
    setDeleteTarget({ type, index });
    setIsDeleteModalOpen(true);
  };

  // Confirm deletion
  const confirmDelete = () => {
    const { type, index } = deleteTarget;
    if (type === 'addresses') {
      setSavedAddresses(savedAddresses.filter((_, i) => i !== index));
      toast.success('Address deleted!');
    } else if (type === 'paymentMethods') {
      setPaymentMethods(paymentMethods.filter((_, i) => i !== index));
      toast.success('Payment method deleted!');
    }
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md pt-10">
      <h1 className="text-3xl font-semibold mb-6">Your Profile</h1>

      {/* User Info Form */}
      <form className="grid grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 font-medium">Full Name</label>
          <input
            type="text"
            name="fullName"
            className={`w-full border p-2 rounded-md ${isEditing ? 'border-indigo-500' : 'border-gray-300'}`}
            placeholder="Full Name"
            value={userInfo.fullName}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Email</label>
          <input
            type="email"
            name="email"
            className={`w-full border p-2 rounded-md ${isEditing ? 'border-indigo-500' : 'border-gray-300'}`}
            placeholder="Email"
            value={userInfo.email}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Phone Number</label>
          <input
            type="text"
            name="phone"
            className={`w-full border p-2 rounded-md ${isEditing ? 'border-indigo-500' : 'border-gray-300'}`}
            placeholder="Phone Number"
            value={userInfo.phone}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Password</label>
          <input
            type="password"
            name="password"
            className={`w-full border p-2 rounded-md ${isEditing ? 'border-indigo-500' : 'border-gray-300'}`}
            placeholder="New Password"
            value={userInfo.password}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
      </form>

      {/* Edit and Save buttons */}
      <div className="mt-4">
        {isEditing ? (
          <button
            onClick={handleSaveProfile}
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
          >
            Save Changes
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
          >
            Edit Profile
          </button>
        )}
      </div>

      {/* Saved Addresses */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Saved Addresses</h2>
        <ul className="space-y-4">
          {savedAddresses.map((address, index) => (
            <li key={index} className="border p-4 rounded-md flex justify-between">
              <span>{address}</span>
              <button
                onClick={() => openDeleteModal('addresses', index)}
                className="text-red-500 underline hover:text-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Payment Methods */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Payment Methods</h2>
        <ul className="space-y-4">
          {paymentMethods.map((method, index) => (
            <li key={index} className="border p-4 rounded-md flex justify-between">
              <span>{method}</span>
              <button
                onClick={() => openDeleteModal('paymentMethods', index)}
                className="text-red-500 underline hover:text-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Delete Confirmation Modal */}
      <Transition appear show={isDeleteModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsDeleteModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4">
              <Dialog.Panel className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
                <Dialog.Title className="text-lg font-medium">Confirm Deletion</Dialog.Title>
                <Dialog.Description className="mt-2 text-sm">
                  Are you sure you want to delete this item? This action cannot be undone.
                </Dialog.Description>
                <div className="mt-4 flex justify-end">
                  <button
                    className="bg-gray-300 text-black py-2 px-4 rounded-md mr-2 hover:bg-gray-400 transition"
                    onClick={() => setIsDeleteModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition"
                    onClick={confirmDelete}
                  >
                    Confirm
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default UserProfilePage;
