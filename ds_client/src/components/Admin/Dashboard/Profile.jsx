import React from 'react'
import ProfileHeader from './ProfileHeader'
import './profile.css';
import userImage from './teacher.png';
import { BiBook } from 'react-icons/bi';

const classes = [

  {
    title:'Grade 3',
    duration: '6 Hours',
    icon: <BiBook />,

  },
  {
    title:'Grade 4',
    duration: '6 Hours',
    icon: <BiBook />,

  },
  {
    title:'Grade 5',
    duration: '6 Hours',
    icon: <BiBook />,

  },

];


const Profile = ({user}) => {
  if(user){
  return (
    <div className='profile'>

      <ProfileHeader/>
      
        <div className='user--profile'>
        <div className='user--detail'>
          <img src={userImage} alt="" />
          <h3 className='username'> <strong>Username</strong> : {user.fullname}</h3>
          <span className='profession'><strong>Role</strong> : {user.role}</span>
        </div>
      
        <div className='user-classes'>
          { classes.map((classe) => (
            <div className='classes'>
              <div className='class-detail'>
                <div className='class-cover'>{classe.icon}</div>
                <div className='class-name'>
                  <h5 className='classic'>{classe.title}</h5>
                  <span className='duration'>{classe.duration}</span>
                </div>
              </div>
              <div className='action'>:</div>
            </div>
          ))}
        
        </div>

      </div>

    </div>
  );
}else{
  return (<h1>User not logged in. Please log in...</h1>);
}
};

export default Profile
