import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0) {
    return (
      <h1 className="text-2xl text-center mt-26 mb-86">No new Requests.</h1>
    );
  }

  return (
    <div className="mt-260 mb-8">
      <h1 className="text-2xl text-center my-3">Requests</h1>

      {requests.map((req) => {
        const { _id, firstName, lastName, photoUrl, age, gender, skills } =
          req.fromUserId;
        return (
          <div key={_id} className="card card-side bg-base-300 shadow-sm w-1/2 p-5 mx-auto my-3 flex">
            <div>
              <figure>
                <img
                  className="rounded-full w-30 h-30"
                  src={photoUrl}
                  alt="user"
                />
              </figure>
            </div>
            <div className="card-body">
              <h2 className="card-title">{firstName + " " + lastName}</h2>
              {(age || gender) && (
                <span>{[age, gender].filter(Boolean).join(", ")}</span>
              )}
              {skills.length > 0 && <p>{skills}</p>}
            </div>
            <div className="flex flex-col card-actions justify-evenly">
            <button className="btn btn-secondary" onClick={() => reviewRequest("accepted", req._id)}>
              Accept
            </button>
            <button className="btn btn-primary" onClick={() => reviewRequest("rejected", req._id)}>
              Reject 
            </button>
              
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
