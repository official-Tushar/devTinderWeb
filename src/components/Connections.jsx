import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { addConnection } from "../utils/connectionSlice";
import { useDispatch, useSelector } from "react-redux";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      console.log(res.data.data);
      dispatch(addConnection(res.data.data));
    } catch (error) {
      // handle error
      console.error(error);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) {
    return (
      <h1 className="text-2xl text-center my-10">No Connections found.</h1>
    );
  }

  return (
    <div className="mt-10 mb-20">
      <h1 className="text-2xl text-center my-3">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, skills } =
          connection;
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
            <div className="card-actions justify-end items-center">
              <button className="btn btn-primary">Message</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
