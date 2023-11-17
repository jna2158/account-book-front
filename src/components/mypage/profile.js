import profile1 from "../../source/account_baby.png";
import profile2 from "../../source/account_basic.png";
import profile3 from "../../source/account_dog.png";
import profile4 from "../../source/account_man.png";
import profile5 from "../../source/account_seal.png";
import profile6 from "../../source/account_girl.png";
import profile7 from "../../source/account_soon.png";
import "./profile.css";
import { S3 } from "aws-sdk";
import { useEffect, useState } from "react";

export default function Profile({setProfile, setIsClickProfieBtn}) {
  const handleClickProfile = (profile) => {
    setProfile(profile)
    setIsClickProfieBtn(false);
  }
  const [isLoading, setIsLoading] = useState(false);

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
  const [imageUrl, setImageUrl] = useState([]);

  useEffect(() => {
    // S3에서 이미지 가져오기
    const getImageFromS3 = async () => {
      setIsLoading(false);
      let idx = 0;
      while(1) {
        try {
          const params = {
            Bucket: bucketName,
            Key: `images/basic_profile/account_profile_${idx}.png`, // 이미지 파일의 키
          };
  
          const response = await s3.getObject(params).promise();
  
          // 이미지 데이터를 Blob으로 변환
          const blob = new Blob([response.Body], { type: response.ContentType });
  
          // Blob을 이용하여 이미지 URL 생성
          const url = URL.createObjectURL(blob);
  
          const newUrlArr = imageUrl;
          newUrlArr.push(url);
          setImageUrl(newUrlArr);
          idx++;
        } catch (error) {
          setIsLoading(true);
          break;
        }
      }
    };

    getImageFromS3();
  }, []);

  return(
    isLoading && (
      <section className="profile_section">
        <img src={imageUrl[0]} onClick={() =>handleClickProfile(profile1)}></img>
        <img src={imageUrl[1]} onClick={() =>handleClickProfile(profile2)}></img>
        <img src={imageUrl[2]} onClick={() =>handleClickProfile(profile3)}></img>
        <img src={imageUrl[3]} onClick={() =>handleClickProfile(profile4)}></img>
        <img src={imageUrl[4]} onClick={() =>handleClickProfile(profile5)}></img>
        <img src={imageUrl[5]} onClick={() =>handleClickProfile(profile6)}></img>
        <img src={imageUrl[6]} onClick={() =>handleClickProfile(profile7)}></img>
      </section>
    )
  )
}