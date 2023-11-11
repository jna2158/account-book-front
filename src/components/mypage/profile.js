import profile1 from "../../source/account_baby.png";
import profile2 from "../../source/account_basic.png";
import profile3 from "../../source/account_dog.png";
import profile4 from "../../source/account_man.png";
import profile5 from "../../source/account_seal.png";
import profile6 from "../../source/account_girl.png";
import profile7 from "../../source/account_soon.png";
import "./profile.css";

export default function Profile() {
  return(
    <section className="profile_section">
      <img src={profile1}></img>
      <img src={profile2}></img>
      <img src={profile3}></img>
      <img src={profile4}></img>
      <img src={profile5}></img>
      <img src={profile6}></img>
      <img src={profile7}></img>
    </section>
  )
}