# 🗓 __Account-Book__

## 🍎 __프로젝트 소개__
#### 가계부를 손쉽게 정리할 수 있는 서비스입니다.

<br />

## 🚗 __사용 기술__
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"> <img src="https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white">

<br />

## 📕 __주요 기능__
+ 로그인
  > JWT 인증방식을 사용했습니다.

+ 지출 및 수입 등록
  > react-calendar 라이브러리를 사용해서 캘린더를 구현했습니다.

  > 캘린더 날짜를 클릭해서 지출 및 수입을 등록할 수 있습니다.
  
  > 시간, 금액, 태그, 내용을 입력합니다.

+ 차트
  > 원하는 날짜 범위내로 수입 및 지출 금액을 차트로 나타낼 수 있습니다.
  
  > Nivo 차트 라이브러리를 사용해서 구현했습니다.
  
  > pie, line, bar 차트를 표현했습니다.

+ 뉴스게시판
  > 가계부와 관련된 뉴스를 보여주는 게시판입니다.
  
  > 서버에서 뉴스를 크롤링한 데이터를 받아서 보여줍니다.
  
  > 페이징 처리가 되어있고, 뉴스를 클릭하면 링크로 이동합니다.

+ 마이페이지
  > 원하는 프로필 사진을 선택하여 변경할 수 있습니다.

  > 프로필 사진 리스트는 s3 bucket에 저장되어있고, 마이페이지에 진입 할 때 불러와서 사용합니다.
