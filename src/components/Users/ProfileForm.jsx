import { useEffect, useState } from "react";
import DeleteConfirmation from "./DeleteConfirmation";

function ProfileForm({
  user,
  fetchUsers,
  fetchUser,
  closeModal,
  updateMsg,
  setUpdateMsg,
  loggedUser,
  setNewPname,
}) {
  const [updateInput, setUpdateInput] = useState({
    nickName: user.nickName,
    preferredName: user.preferredName,
    email: user.email,
    profilePicUrl: user.profilePicUrl || "",
    is_banned: user.is_banned,
    is_admin: user.is_admin,
  });

  useEffect(() => {
    setUpdateInput({
      nickName: user.nickName,
      preferredName: user.preferredName,
      email: user.email,
      profilePicUrl: user.profilePicUrl || "",
      is_banned: user.is_banned,
      is_admin: user.is_admin,
    });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const isCheckbox = e.target.type === "checkbox";

    setUpdateInput({
      ...updateInput,
      [name]: isCheckbox ? e.target.checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `https://moosage-backend.onrender.com/users/update/${user._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateInput),
      }
    );

    if (response.ok) {
      const updatedUser = await response.json();
      // console.log(updatedUser);
      setUpdateMsg({
        res: true,
        success: true,
        msg: "Makeover Completed!",
      });
      fetchUsers ? fetchUsers() : fetchUser(); // re-fetch user(s) after updating
      setNewPname(updatedUser.preferredName);
      closeModal();
    } else {
      console.error("Failed to update user.");
      setUpdateMsg({
        res: true,
        success: false,
        msg: "Failed to update profile, please check your entries.",
      });
    }
  };

  return (
    <>
      <div className="modal-box">
        <form method="dialog">
          <button
            onClick={() => {
              setUpdateInput({
                nickName: user.nickName,
                preferredName: user.preferredName,
                email: user.email,
                profilePicUrl: user.profilePicUrl || "",
                is_banned: user.is_banned,
                is_admin: user.is_admin,
              });
              setUpdateMsg({ res: false, success: false, msg: "" });
            }}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Update Profile</h3>

        <form onSubmit={handleSubmit} className="userForm">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <div className="tooltip" data-tip="Unique identifier on Moosages">
                <span className="label-text font-bold">Nick Name</span>
              </div>
            </div>
            <input
              type="text"
              name="nickName"
              value={updateInput.nickName}
              onChange={handleInputChange}
              placeholder="Enter a name that's uniquely you"
              className="input input-bordered input-sm w-full max-w-xs"
              required
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <div
                className="tooltip"
                data-tip="Your sign off name on Moosages"
              >
                <span className="label-text font-bold">Preferred Name</span>
              </div>
            </div>
            <input
              type="text"
              name="preferredName"
              value={updateInput.preferredName}
              onChange={handleInputChange}
              placeholder="Enter a name you want to be known by"
              className="input input-bordered input-sm w-full max-w-xs"
              required
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <div className="tooltip" data-tip="Valid email address please!">
                <span className="label-text font-bold">Email</span>
              </div>
            </div>
            <input
              type="text"
              name="email"
              value={updateInput.email}
              onChange={handleInputChange}
              placeholder="Who changes email addresses so often?"
              className="input input-bordered input-sm w-full max-w-xs"
              required
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <div
                className="tooltip"
                data-tip="URL please, leaving it empty will set a default URL 🐮"
              >
                <span className="label-text font-bold">Display Picture</span>
              </div>
            </div>
            <input
              type="text"
              name="profilePicUrl"
              value={updateInput.profilePicUrl}
              onChange={handleInputChange}
              placeholder="Default: 🐮"
              className="input input-bordered input-sm w-full max-w-xs"
            />
          </label>

          {loggedUser && loggedUser.is_admin && (
            <div className="form-control items-end">
              <div>
                <label className="cursor-pointer label">
                  <div
                    className="tooltip"
                    data-tip="Check to ban, uncheck to unban"
                  >
                    <span className="label-text font-bold ">
                      Ban {user.nickName}?
                    </span>
                  </div>
                  &nbsp;
                  <input
                    type="checkbox"
                    name="is_banned"
                    checked={updateInput.is_banned}
                    onChange={handleInputChange}
                    className="checkbox checkbox-warning"
                  />
                </label>
              </div>

              <div>
                <label className="cursor-pointer label">
                  <div
                    className="tooltip"
                    data-tip="Check to give admin powers, uncheck to revoke"
                  >
                    <span className="label-text font-bold ">
                      Promote {user.nickName} to an admin?
                    </span>
                  </div>
                  &nbsp;
                  <input
                    type="checkbox"
                    name="is_admin"
                    checked={updateInput.is_admin}
                    onChange={handleInputChange}
                    className="checkbox checkbox-warning"
                  />
                </label>
              </div>
            </div>
          )}

          <span className={updateMsg.success ? "text-success" : "text-error"}>
            {updateMsg.res ? <p>{updateMsg.msg}</p> : null}
          </span>

          <button className="btn btn-submit btn-sm">Update</button>
        </form>

        <button
          className="btn btn-ghost btn-sm"
          onClick={() =>
            document
              .getElementById(`delete-confirmation-${user._id}`)
              .showModal()
          }
        >
          Deactivate Account
        </button>

        <dialog id={`delete-confirmation-${user._id}`} className="modal">
          <DeleteConfirmation
            user={user}
            fetchUsers={fetchUsers}
            closeModal={closeModal}
            closeDelModal={() =>
              document.getElementById(`delete-confirmation-${user._id}`).close()
            }
          />
        </dialog>
      </div>
    </>
  );
}

export default ProfileForm;
