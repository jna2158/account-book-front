import "./profile.css";

export default function Profile({profileList, setProfile, setIsClickProfieBtn}) {
  const handleClickProfile = (profile) => {
    setProfile(profile)
    setIsClickProfieBtn(false);
  }

  return(
    <section className="profile_section">
      <img src={profileList[0]} onClick={() =>handleClickProfile(profileList[0])}></img>
      <img src={profileList[1]} onClick={() =>handleClickProfile(profileList[1])}></img>
      <img src={profileList[2]} onClick={() =>handleClickProfile(profileList[2])}></img>
      <img src={profileList[3]} onClick={() =>handleClickProfile(profileList[3])}></img>
      <img src={profileList[4]} onClick={() =>handleClickProfile(profileList[4])}></img>
      <img src={profileList[5]} onClick={() =>handleClickProfile(profileList[5])}></img>
      <img src={profileList[6]} onClick={() =>handleClickProfile(profileList[6])}></img>
    </section>
  )
}