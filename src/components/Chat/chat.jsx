import { useEffect, useRef, useState } from "react";
import "./chat.css";

const Chat = () => {
  const [text, setText] = useState("");

  console.log(text);

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <div className="texts">
            <span>Jane Doe</span>
            <p>Lorem ipsum dolor, sit amet.</p>
          </div>
        </div>
      </div>
      <div className="center">
        <div className="message">
          <img src="...\images\global-background.png" alt=""/>
          <div className="texts">
            <p>
              Lorem impsum
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>
              Lorem impsum
            </p>
            <span>1 min ago</span>
          </div>
        </div>
      </div>
      <div className="bottom">
        <input  
        type="text" 
        placeholder="Type a message..." 
        onChange={e => setText(e.target.value)} 
        />
        <button className="sendButton">Send</button>
      </div>
    </div>
  );
};

export default Chat;
