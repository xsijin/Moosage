import { useState } from "react";
import { useNavigate } from "react-router";
import { logoutUser } from "../../service/users";

function DeleteConfirmation({
  user,
  fetchUsers,
  closeDelModal,
  closeModal,
  fetchUser,
}) {
  const navigate = useNavigate();

  const handleDeleteUser = async (e) => {
    e.preventDefault();
    // console.log("user: ", user);
    try {
      const response = await fetch(
        `https://moosage-backend.onrender.com/users/remove/${user._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        if (fetchUsers) {
          fetchUsers(); // re-fetch users after updating
          closeDelModal();
          closeModal();
          navigate("/admin/users");
        } else {
          await logoutUser();
          window.location.href = "/";
        }
        // console.log("User deleted");
      } else {
        throw new Error("Failed to delete user.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">
          Your account is on the verge of no return.
        </h3>
        <p className="py-4">
          Sorry you'd wish to leave us.
          <br />
          Your boards and moosages will be gone after your departure.
          <br />
          Please let us know how we could've made your experience better.
          <br />
          <br />
          Thank you for your time!
          <br />
          <br />
          Confirm to deactivate{" "}
          <span className="text-error underline">{user.nickName}</span>
          's account?
        </p>
        <div className="modal-action">
          <button
            className="btn btn-sm btn-outline btn-error"
            onClick={(e) => handleDeleteUser(e)}
          >
            Yes, bye.
          </button>
          <form method="dialog">
            <button className="btn btn-sm">
              No, this was an accidental click.
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default DeleteConfirmation;
