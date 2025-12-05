import React, { use } from 'react';
import { AuthContext } from '../../Authentication/AuthContext';

const Profile = () => {
    const { user } = use(AuthContext)
    return (
        <div>
            
        </div>
    );
};

export default Profile;