import { useParams } from 'react-router-dom';

function Profile() {
  const { id } = useParams(); // Extract 'id' from the URL

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Viewing profile for user ID: {id}</p>
    </div>
  );
}

export default Profile;
