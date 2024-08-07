import { useState } from "react";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import useCrud from "../hooks/useCrud";
import { ServerType } from "../@types/server";

interface Message {
  sender: string;
  content: string;
  timestamp: string;
}

const MessageInterface = () => {
  const [newMessage, setNewMessage] = useState<Message[]>([]);
  const { serverId, channelId } = useParams();

  const { fetchData } = useCrud<ServerType>(
    [],
    `/messages/?channel_id=${channelId}`
  );

  const socketUrl = channelId
    ? `ws://127.0.0.1:8000/ws/${serverId}/${channelId}`
    : null;
  const [message, setMessage] = useState("");
  const { sendJsonMessage } = useWebSocket(socketUrl, {
    onOpen: async () => {
      try {
        const data = await fetchData();
        setNewMessage([]);
        setNewMessage(Array.isArray(data) ? data : []);
      } catch (e) {
        console.log(e);
      }
      console.log("Connected!");
    },
    onClose: () => {
      console.log("Closed!");
    },
    onError: () => {
      console.log("Error!");
    },
    // message received from the consumer
    onMessage: (msg) => {
      const data = JSON.parse(msg.data);
      setNewMessage((prev_msg) => [...prev_msg, data.new_message]);
    },
  });

  return (
    <div>
      {newMessage.map((msg: Message, index: number) => {
        return (
          <div key={index}>
            <p>{msg.sender}</p>
            <p>{msg.content}</p>
          </div>
        );
      })}
      <form>
        <label>
          Enter Message:
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
      </form>
      <button
        onClick={() => {
          sendJsonMessage({ type: "message", message });
        }}
      >
        Send Message
      </button>
    </div>
  );
};

export default MessageInterface;
