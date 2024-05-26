import { useEffect, useRef, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";
import "./chat.css";
import { firestore } from "../../firebase";

export function Chat(/*should take in docRef/chatroomRef from contacts collection*/) {
  const [chat, setChat] = useState({});
  const [text, setText] = useState("");
  const { currentUser } = useAuth();
  const currentUserID = currentUser.uid;

  const endRef = useRef(null);

  useEffect(()=>{
    endRef.current?.scrollIntoView({behavior:"smooth"})
  }, [chat?.messages]);

  //Fetches chatroom information when component mounts
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(firestore, "chats", "testChatRoom"), (res) => {
      setChat(res.data());
    });

    return () => {
      unsubscribe();
    };
  }, []);

  console.log(text);

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YOtOwhKH61_mrmCEIKBViQ3JEfwPlz2SEZClZqKDp4XkjdjV" alt=""/>
          <div className="texts">
            <span>Jane Doe</span>
            <p>Lorem ipsum dolor, sit amet.</p>
          </div>
        </div>
      </div>
      <div className="center">
        {chat?.messages?.map((message, index) => (
          <div 
            key={index}
            className={message.senderID === currentUserID ? "message own" : "message"}
          >
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YOtOwhKH61_mrmCEIKBViQ3JEfwPlz2SEZClZqKDp4XkjdjV" alt=""/>
            <div className="texts">
              <p>
                {message.messageContent}
              </p>
              <span>
                {new Date(message.timeSent?.seconds * 1000).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        <div ref={endRef}></div>
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
