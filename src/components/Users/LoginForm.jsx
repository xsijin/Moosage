import { useState } from "react";
import { getLoginDetails, loginUser } from "../../service/users";
import { hashDataWithSaltRounds, storeToken } from "../../util/security";
import { useNavigate } from "react-router";

function LoginForm({ setLogin }) {
  const navigate = useNavigate();
  const [loginSucc, setLoginSucc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (evt) => {
    setLoginInput({
      ...loginInput,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = async (evt) => {
    setLoginSucc(null);
    setIsLoading(true);
    try {
      evt.preventDefault();

      const loginData = { ...loginInput };
      // console.log("loginForm data: ", loginData);

      // get user salt and iterations from DB
      const loginDetails = await getLoginDetails(loginData.email);
      // console.log("loginDetails: ", loginDetails);

      // hash password
      const hashedPassword = hashDataWithSaltRounds(
        loginData.password,
        loginDetails.salt,
        loginDetails.iterations
      );
      loginData.password = hashedPassword;

      // get token
      const token = await loginUser(loginData);
      // store token in localStorage
      storeToken(token);
      setLogin(true);
      setIsLoading(false);
      setLoginSucc("Login successful!");

      navigate("/");
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      setLoginSucc("Incorrect user/password, please try again.");
    }
  };

  return (
    <div className="card card-side bg-base-100 shadow-xl p-3">
      <form onSubmit={handleSubmit} className="userForm">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text font-bold">Email</span>
          </div>
          <input
            type="text"
            name="email"
            value={loginInput.email}
            onChange={handleInputChange}
            placeholder="Enter your email here"
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
            value={loginInput.password}
            onChange={handleInputChange}
            placeholder="Enter your password here"
            className="input input-bordered input-sm w-full max-w-xs"
            required
          />
        </label>

        {isLoading ? (
          <p className="text-center px-10">
            <span className="loading loading-ring loading-lg"></span>
            <br />
            Please wait...
          </p>
        ) : null}

        {loginSucc && (
          <p
            className={
              loginSucc === "Login successful!" ? "text-success" : "text-error"
            }
          >
            {loginSucc}
          </p>
        )}

        <button className="btn btn-submit btn-sm">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
