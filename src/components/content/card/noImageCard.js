import { useEffect, useState } from "react";
import "./card.css";

export const NoImageCard = ({ item }) => {
  const [subContent, setSubContent] = useState('');
  
  useEffect(() => {
    item.content = item.content.split('...');
    setSubContent(item.content[item.content.length - 1]);
    item.content.pop();
    item.content.join('');
  }, [item]);

  return (
    <div className="card">
      <div className="card-content">
        <h3 className="card_title">{item.title}</h3>
        <div className="card_content">{item.content + "..."}</div>
        <div className="card_sub_content">{subContent}</div>
      </div>
    </div>
  );
}