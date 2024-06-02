import "./Timeline.css";
import Logo from "../logo.svg";
import { useState, useEffect } from "react";
import api from "../services/api";

function Timeline() {
  const [newTiziweet, setNewTiziweet] = useState("");
  const [tiziweets, setTiziweets] = useState([]);

  useEffect(() => {
    const apiResp = async () => {
      await api.get("/tiziweets");
    };
    apiResp();
    setTiziweets(apiResp.data);
  }, []);

  async function handleNewTiziweet(e) {
    if (e.keyCode !== 13) return;
    const content = newTiziweet;
    const author = localStorage.getItem("@username");
    console.log(content, author);
    await api.post("/tiziweets", { content, author });
    setNewTiziweet("");
  }
  return (
    <div className="timeline-wrapper">
      <img height={32} src={Logo} alt="logo" />
      <form>
        <textarea
          value={newTiziweet}
          onChange={(e) => setNewTiziweet(e.target.value)}
          onKeyDown={handleNewTiziweet}
          placeholder="O que esta acontecendo?"
        ></textarea>
      </form>
      <ul>{tiziweets}</ul>
    </div>
  );
}

export default Timeline;
