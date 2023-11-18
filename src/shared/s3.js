import { S3 } from "aws-sdk";

export const getImageFromS3 = async (imageKey) => {
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
  
  try {
    const params = {
      Bucket: bucketName,
      Key: imageKey,
    };

    // 이미지를 요청해서 가져오기
    // await: 비동기 함수에서 결과를 기다림
    // promise(): 비동기 작업이 완료될 때까지 기다림
    const response = await s3.getObject(params).promise();

    // 이미지 데이터를 Blob으로 변환
    // s3에서 가져온 이미지 데이터를 브라우저에서 표시할 수 있는 형식으로 변환함
    const blob = new Blob([response.Body], { type: response.ContentType });

    // Blob을 이용하여 이미지 URL 생성
    const url = URL.createObjectURL(blob);

    // 생성된 이미지 URL return
    return url;

  } catch (error) {
    console.log(error);
  }
};