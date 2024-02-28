import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const LandingError = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <><br />
    <div className="bg-base-100 p-3 rounded-3xl">
      <p>
        <br />
        You've landed on the wrong side of the <b>moo</b>n.
        <br />
        🌚
      </p>
      <br />
      Go<span onClick={goBack} style={{ cursor: "pointer" }}>
        🔙
      </span> <Link to="/" className="hover:text-primary hover:font-bold">
        home
      </Link>
      ?
      <br />
      <br />
      Or you can stay here and admire the scenery.
      <br />
      <br />
      Up to you!
      <br />
      <br />
      <div className="carousel w-[612px] h-[408px]">
        <div id="item1" className="carousel-item w-full">
          <img
            src="https://media.istockphoto.com/id/477832804/photo/sleeping-cows-at-sunrise.jpg?s=612x612&w=0&k=20&c=mtPZXS5trDLST4E-IAwhwFqf-JPBodJVOQhEP72tD8s="
            className="w-full"
          />
        </div>
        <div id="item2" className="carousel-item w-full">
          <img
            src="https://www.shutterstock.com/image-photo/cows-herd-on-grass-field-600nw-2030724431.jpg"
            className="w-full"
          />
        </div>
        <div id="item3" className="carousel-item w-full">
          <img
            src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y293c3xlbnwwfHwwfHx8MA%3D%3D"
            className="w-full"
          />
        </div>
      </div>
      <div className="flex justify-center w-full py-2 gap-2">
        <a href="#item1" className="btn btn-xs">
          1
        </a>
        <a href="#item2" className="btn btn-xs">
          2
        </a>
        <a href="#item3" className="btn btn-xs">
          3
        </a>
      </div>
    </div>
    </>
  );
};

export default LandingError;
