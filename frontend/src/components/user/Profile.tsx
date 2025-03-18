const Profile = () => {
  const profilePictureURL = "https://randomuser.me/api/portraits/women/11.jpg";
  const username = "Admin";
  const position = "Developer";
  const joinDate = "Jan, 2025";

  return (
    <div className="flex justify-center">
      <div className="flex flex-col sm:flex-row border border-gray-300 shadow rounded-lg">
        <div className="bg-orange-300 p-5 flex flex-col items-center gap-5 rounded-s-lg border-r border-gray-300">
          <div className="text-xs font-medium px-3 py-1 rounded-full bg-orange-800 text-white">role</div>
          <img
            className="rounded-full border-4 border-orange-800 bg-orange-500 h-24 w-25 max-h-24 text-center"
            src={profilePictureURL}
            alt="NA"
          />
          <div className="text-xs font-medium px-3 py-1 rounded-full bg-orange-800 text-white">active</div>
        </div>
        <div className="grow p-4 flex flex-col justify-between min-w-60 max-w-80">
          <div className="flex flex-col gap-y-3">
            <div className="text-center text-4xl font-semibold text-gray-800">{username}</div>
            <div className="text-sm text-gray-700">
              <div className="flex justify-between">
                <div>Group Name</div>
                <div>Joined {joinDate}</div>
              </div>
              <div className="flex justify-between">
                <div>{position}</div>
                <div>Kerala, Ind</div>
              </div>
            </div>
          </div>
          <div className="text-sm font-medium text-gray-800">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </div>
          <div className="text-xs text-gray-500 italic text-right">Lorem ipsum dolor sit amet consectetur elit.</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
