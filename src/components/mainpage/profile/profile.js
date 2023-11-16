import AWS from 'aws-sdk';
import { IdentityPoolId } from '../../../constant';

export const Profile = () => {

  /**
   * AWS 정보를 담아주는 함수
   */
  const awsUser = () => {
    AWS.config.update({
      region: "ap-northeast-2",
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId
      })
    })
  }

  /**
   * AWS에서 프로필 이미지 목록을 가져오는 함수
   */
  const getProfileImage = () => {

  }
}