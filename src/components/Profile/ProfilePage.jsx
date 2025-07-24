import React from 'react';
import ProfileForm from './ProfileForm';
import './ProfilePage.css';

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <h1>My Profile</h1>
      <ProfileForm />
    </div>
  );
};

export default ProfilePage;
