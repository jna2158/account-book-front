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
  const accessKeyId = process.env.accessKeyId;
  const secretAccessKey = process.env.secretAccessKey;
  const bucketName = process.env.bucketName;
  const region = process.env.region;

  const s3 = new S3({
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
    region,
  });
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    // S3에서 이미지 가져오기
    const getImageFromS3 = async () => {
      try {
        const params = {
          Bucket: bucketName,
          Key: "account_baby.png", // 이미지 파일의 키
        };

        const response = await s3.getObject(params).promise();

        // 이미지 데이터를 Blob으로 변환
        const blob = new Blob([response.Body], { type: response.ContentType });

        // Blob을 이용하여 이미지 URL 생성
        const url = URL.createObjectURL(blob);

        // 이미지 URL 상태 업데이트
        setImageUrl(url);
      } catch (error) {
        console.error('Error fetching image from S3:', error);
      }
    };

    getImageFromS3();
  }, []);

  return(
    <section className="profile_section">
      <img src={imageUrl} onClick={() =>handleClickProfile(profile1)}></img>
      {/* <img src={profile2} onClick={() =>handleClickProfile(profile2)}></img>
      <img src={profile3} onClick={() =>handleClickProfile(profile3)}></img>
      <img src={profile4} onClick={() =>handleClickProfile(profile4)}></img>
      <img src={profile5} onClick={() =>handleClickProfile(profile5)}></img>
      <img src={profile6} onClick={() =>handleClickProfile(profile6)}></img>
      <img src={profile7} onClick={() =>handleClickProfile(profile7)}></img> */}
    </section>
  )
}