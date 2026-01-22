import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

const ProfilePage = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  async function handleUpdateProfilePicture(event) {
    //stop page from reloading
    event.preventDefault();
    // create variable for the image that was selected in the input of type file
    const image = event.target.image.files[0];
    //create a form data to hold  the image for the post route
    const formData = new FormData();
    //the append method addes the image to the new form data to send to the server
    formData.append("imageUrl", image);

    //after adding the image to the form data... just make a post req to your route on your server
    try {
      const { data } = await axios.post(
        `http://localhost:5005/auth/update-profile-picture/${currentUser._id}`,
        formData,
      );
      console.log("profile picture updated", data);
      setCurrentUser(data.updatedUser);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <h1>Welcome {currentUser.username}</h1>
      <img
        src={currentUser.profilePicture}
        alt="profile image"
        className="profile-picture"
      />
      <form onSubmit={handleUpdateProfilePicture}>
        <input type="file" name="image" />
        <button>Update</button>
      </form>
    </div>
  );
};
export default ProfilePage;
