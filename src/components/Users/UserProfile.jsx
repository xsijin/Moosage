import "./ProfileForm";
import ProfileForm from "./ProfileForm";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function UserProfile({ user, fetchUsers, fetchUser, loggedUser, setNewPname }) {
  const [updateMsg, setUpdateMsg] = useState({
    res: false,
    success: false,
    msg: "",
  });
  console.log("check logged user ", loggedUser);

  return (
    <>
      <li key={user._id} className="centered-content py-2">
        <div className="card card-side bg-base-100 shadow-xl w-[500px] m-3">
          <figure>
            <img
              src={
                user.profilePicUrl && user.profilePicUrl.trim() !== ""
                  ? user.profilePicUrl
                  : "https://em-content.zobj.net/source/samsung/380/cow-face_1f42e.png"
              }
              alt="Profile Pic"
              style={{ minWidth: "90px", maxWidth: "90px" }}
              className="p-2"
            />
          </figure>
          <div className="card-body mali-regular">
            <Link to={`/user/${user._id}`} className="hover:text-primary">
              <h2 className="card-title">
                {user.preferredName}{" "}
                {user.is_admin ? (
                  <div className="badge badge-primary">Admin</div>
                ) : null}
              </h2>
            </Link>
            <div className="text-left">
              <p>
                @{user.nickName}{" "}
                {user.is_banned ? (
                  <span className="badge badge-warning">Banned User</span>
                ) : null}{" "}
                {user.status === "deleted" ? (
                  <span className="badge badge-error">Deleted</span>
                ) : null}
              </p>
              📧 {user.email}
              <br />
              {user.boards ? user.boards.length : user.publicBoards.length}{" "}
              Board(s)
              <br />
              {user.moosages
                ? user.moosages.length
                : user.publicMoosages.length}{" "}
              Moosages(s)
            </div>
          </div>

          {loggedUser.userId === user._id ||
          (loggedUser && loggedUser.is_admin) ? (
            <>
              <div className="card-actions justify-end">
                <div className="dropdown dropdown-bottom dropdown-end">
                  <div tabIndex={0} role="button" className="btn m-2 btn-xs">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block w-5 h-5 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                      ></path>
                    </svg>
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li
                      onClick={() => {
                        document
                          .getElementById(`profileForm-${user._id}`)
                          .showModal();
                        setUpdateMsg({ res: false, success: false, msg: "" });
                      }}
                    >
                      <a>Update Profile</a>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          ) : null}

          <dialog id={`profileForm-${user._id}`} className="modal">
            {user && (
              <ProfileForm
                user={user}
                fetchUsers={fetchUsers}
                fetchUser={fetchUser}
                setUpdateMsg={setUpdateMsg}
                updateMsg={updateMsg}
                loggedUser={loggedUser}
                setNewPname={setNewPname}
                closeModal={() =>
                  document.getElementById(`profileForm-${user._id}`).close()
                }
              />
            )}
          </dialog>
        </div>
      </li>
    </>
  );
}

export default UserProfile;
