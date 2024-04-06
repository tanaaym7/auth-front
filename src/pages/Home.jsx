import { useEffect, useState } from "react";
import API from "../api";
import VideoCapture from "../components/VideoCapture ";

let firstRender = true;
const Home = () => {
  const [user, setUser] = useState({});

  const sendRequest = async () => {
    const res = await API.get("/user").catch((err) => console.log(err));
    const data = await res.data;
    console.log(data);
    setUser(data)
  };

  const refreshToken = async () => {
    const res = await API.get("/refresh").catch((err) => console.log(err));
    const data = await res.data;
    console.log(data);
    return data;
  };

  useEffect(() => {
    if (firstRender) {
      firstRender = false;
      sendRequest();
    }

    let interval = setInterval(() => {
      refreshToken().then((data) => setUser(data));
    },(15 * 60 * 1000) - (5 * 60 * 1000));

    return () => clearInterval(interval);
  }, [user]);

  return (
    <>
      <div className="home_page">
        {user && <h1>hello {user.name}</h1>}
       <VideoCapture/>
      </div>
    </>
  );
};

export default Home;
