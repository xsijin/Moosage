import React, { useState } from "react";
import "./SignUpForm.css";
import { hashData } from "../../util/security";
import { signUp } from "../../service/users";

function SignUpForm() {
  const [signUpInput, setSignUpInput] = useState({
    nickName: "",
    preferredName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [signupSucc, setSignupSucc] = useState(false);

  const handleInputChange = (evt) => {
    setSignUpInput({
      ...signUpInput,
      [evt.target.name]: evt.target.value,
    });
  };

  function hashPassword() {
      var currForm = signUpInput;
      if (currForm.password) {
          console.log(currForm.password)
          var hash = hashData(currForm.password);
          currForm.password = hash.hash;
          currForm.salt = hash.salt;
          currForm.iterations = hash.iterations;
      }
  }

  const handleSubmit = async (evt) => {
    try {
      evt.preventDefault();

      hashPassword();
      const signUpData = { ...signUpInput };
      delete signUpData.confirmPassword;
      console.log("signUpData ", signUpData);
      const user = await signUp(signUpData);
      console.log("user: ", user);

      setSignUpInput({
        nickName: "",
        preferredName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setSignupSucc(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card card-side bg-base-100 shadow-xl p-3">
      <form onSubmit={handleSubmit} className="userForm">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text font-bold">Nick Name</span>
          </div>
          <input
            type="text"
            name="nickName"
            value={signUpInput.nickName}
            onChange={handleInputChange}
            placeholder="Your unique identifier"
            className="input input-bordered input-sm w-full max-w-xs"
            required
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <div
              className="tooltip"
              data-tip="Defaults to your nickname if blank"
            >
              <span className="label-text font-bold">Preferred Name</span>
            </div>
          </div>
          <input
            type="text"
            name="preferredName"
            value={signUpInput.preferredName}
            onChange={handleInputChange}
            placeholder="Your sign off name"
            className="input input-bordered input-sm w-full max-w-xs"
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text font-bold">Email</span>
          </div>
          <input
            type="text"
            name="email"
            value={signUpInput.email}
            onChange={handleInputChange}
            placeholder="Please register a valid email address"
            className="input input-bordered input-sm w-full max-w-xs"
            required
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text font-bold">Password</span>
          </div>
          <input
            type="password"
            name="password"
            value={signUpInput.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            className="input input-bordered input-sm w-full max-w-xs"
            required
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text font-bold">Confirm Password</span>
          </div>
          <input
            type="password"
            name="confirmPassword"
            value={signUpInput.confirmPassword}
            onChange={handleInputChange}
            placeholder="Enter your password again"
            className="input input-bordered input-sm w-full max-w-xs"
            required
          />
        </label>

        {signupSucc ? <p className="text-success">Sign Up Success!</p> : null}

        <button className="btn btn-submit btn-sm">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
