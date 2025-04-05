import { useDispatch } from "react-redux";
import axios from "axios";
import {BASE_URL} from "../utils/constants";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, about, age, gender, skills } = user;
  const dispatch = useDispatch();

  const handleSentRequest = async (status, userId) => {
    try{
      await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, 
        {withCredentials: true}
      );
      dispatch(removeFeed(userId));
    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure className="px-6 pt-9">
        <img src={photoUrl} alt="photo" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {(age || gender) && (
          <span>{[age, gender].filter(Boolean).join(", ")}</span>
        )}
        {about !== "This is the default about of the user" && <p>{about}</p>}
        {skills.length > 0 && <p>{skills}</p>}
        <div className="card-actions">
          <button className="btn btn-primary" onClick={() => handleSentRequest("ignored", _id)}>
          Ignore
          </button>
          <button className="btn btn-secondary" onClick={() => handleSentRequest("interested", _id)}>
          Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
