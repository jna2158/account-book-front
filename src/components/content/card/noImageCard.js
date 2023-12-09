import "./card.css";
import img from "../../../source/account-book-logo.png";

export const NoImageCard = ({item}) => {
  return (
    <div className="card">
      <div className="card-content">
        <h3 className="card_title">{item.title}</h3>
        <div className="card_content">{item.content}</div>
      </div>
    </div>
  );
}