import "./card.css";
import img from "../../../source/account-book-logo.png";
import { useState, useEffect } from "react";
import { S3 } from "aws-sdk";

export const Card = ({ item }) => {
  // s3
  const accessKeyId = process.env.REACT_APP_ACCESS_KEY_ID;
  const secretAccessKey = process.env.REACT_APP_SECRET_ACCESS_KEY;
  const bucketName = process.env.REACT_APP_BUCKET_NAME;
  const region = process.env.REACT_APP_REGION;
  const s3 = new S3({
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
    region,
  });
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    try {
      const params = {
        Bucket: bucketName,
        Key: item.image_url,
      };
      const response = await s3.getObject(params).promise();
      const blob = new Blob([response.Body], { type: response.ContentType });
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="card">
      <div className="thumbnail">
        <img src={imageUrl} alt="카드 썸네일" />
      </div>
      <div className="card-content">
        <h3 className="card_title" onClick={() => window.open(item.news_url, "_blank")}>{item.title}</h3>
        <div className="card_content">{item.content}</div>
      </div>
    </div>
  );
}