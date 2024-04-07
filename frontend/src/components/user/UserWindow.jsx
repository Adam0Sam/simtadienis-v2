// import { getUserData } from "../../utils/api";
import { useState } from "react";

import unkownUserImg from "../../assets/images/unkown-user-new.png";
import { LiaMoneyBillSolid } from "react-icons/lia";


export default function UserWindow({ userData, closeModal }) {
    const [moneyEffectActive, setMoneyEffectActive] = useState(false);

    const stopPropogation = (e) => {
        e.stopPropagation();
    }

    return (
        <div className="user__window" onClick={closeModal}>
            <div className="window__profile" onClick={(e) => stopPropogation(e)}>
                <div className="profile-img-container">
                    <img className="profile-img" src={userData?.image || unkownUserImg} alt="user">
                    </img>
                </div>
                <p className="user-name">{userData?.name} {userData?.surname}</p>
                <div className="user__money">
                    <LiaMoneyBillSolid className={`user-money-icon ${moneyEffectActive ? 'active' : ''}`} onClick={() => setMoneyEffectActive(prev => !prev)} />
                    <p className="digit">{userData?.money || 0}</p>
                </div>
            </div>
        </div>
    )
}