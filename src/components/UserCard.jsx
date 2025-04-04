const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, about, age, gender, skills } = user;
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
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
