import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    const res = await axios.get(BASE_URL + "/user/requests/received", {
      withCredentials: true,
    });

    dispatch(addRequest(res.data.data));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0) {
    return (
      <h1 className="text-2xl text-center my-10">No new Requests.</h1>
    );
  }

  return (
    <div className="mt-10 mb-20">
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
            <button className="btn btn-secondary">Accept</button>
              <button className="btn btn-primary">Reject </button>
              
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
