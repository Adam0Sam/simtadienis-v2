import { getUserData, sendUserData } from "../../utils/api";
import { useState, useEffect, useCallback } from "react";

import { useUser } from "../../context/UserProvider";
import { usePage } from "../../context/PageProvider";

import WebcamModal from "../webcam/WebcamModal";
import EditProfile from "./EditProfile";
import PageNav from "../page-control/PageNav";

import { LiaEdit, LiaMoneyBillSolid } from "react-icons/lia";
import { IoIosLogOut } from "react-icons/io";

import './user.css';
import unkownUserImg from "../../assets/images/unkown-user-new.png";
import CONSTANTS from "../../constants";
import LoadingWheel from "../LoadingWheel";

/**
 * @component
 * @returns {JSX.Element} The rendered user profile component.
 */
export default function UserProfile() {
    const [webcamOpen, setWebcamOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [userData, setUserData] = useState({});
    const [moneyEffectActive, setMoneyEffectActive] = useState(false);

    const { userId, clearUserId, changeVoteId } = useUser();
    const [loading, setLoading] = useState(true);
    const { resetPage } = usePage();

    /**
     * Logs out the user by removing the user data from local storage and clearing the user ID.
     */
    const logout = () => {
        localStorage.removeItem("user");
        clearUserId();
        resetPage();
    }

    /**
     * Fetches the user data from the server.
     * @returns {Promise<Object>} A promise that resolves to the user data.
     */
    const fetchData = useCallback(async () => {
        try {
            const data = await getUserData({ name: userId.name, surname: userId.surname });
            setLoading(false);
            return data.response[0];
        }
        catch (err) {
            console.error("Error while fetching money: ", err);
        }
    }, [userId.name, userId.surname]);

    useEffect(() => {
        fetchData().then(data => {
            setUserData(data);
            CONSTANTS.CLASS_LIST.forEach((_, index) => {
                changeVoteId(index, data.votes[index]);
            });
        });
    }, [fetchData, changeVoteId, userId.name, userId.surname])

    /**
     * Opens the edit profile modal.
     */
    const openEdit = () => setEditOpen(true);

    /**
     * Closes the edit profile modal.
     */
    const closeEdit = () => setEditOpen(false);

    /**
     * Opens the webcam modal.
     */
    const openWebcam = () => setWebcamOpen(true);

    /**
     * Closes the webcam modal and stops the video stream.
     */
    const closeWebcam = () => {
        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
            stream.getVideoTracks().forEach(track => track.stop())
        });
        setWebcamOpen(false);
    };

    /**
     * Changes the user's profile image.
     * @param {string} imgSrc - The new image source.
     */
    const changeImg = (imgSrc) => {
        sendUserData({ image: imgSrc, name: userData.name, surname: userData.surname }, 'update-picture')
            .then(res => {
                setUserData(prev => ({ ...prev, image: imgSrc }));
            })
            .catch(err => console.error(err));
    }

    /**
     * Deletes the user's profile image.
     */
    const deleteImg = () => {
        sendUserData({ image: '', name: userData.name, surname: userData.surname }, 'update-picture')
            .then(res => {
                fetchData().then(data => setUserData(data));
            })
            .catch(err => console.error(err));
    }


    return (
        <>
            <div className="user__profile">
                <div className="profile__img">
                    <div className="profile-img-container" onClick={openEdit}>
                        <img className="profile-img" src={userData?.image || unkownUserImg} alt="user">
                        </img>
                    </div>
                    <div className="profile-img__controls">
                        <button className="profile-control edit-profile-btn">
                            <LiaEdit onClick={openEdit} />
                        </button>

                    </div>
                </div>
                <p className="user-name">{userData?.name} {userData?.surname}</p>
                <div className="user__money">
                    <LiaMoneyBillSolid className={`user-money-icon ${moneyEffectActive ? 'active' : ''}`} onClick={() => setMoneyEffectActive(prev => !prev)} />
                    <p className="digit">{userData?.money}</p>
                </div>
                {editOpen && <EditProfile closeEdit={closeEdit} deleteImg={deleteImg} openWebcam={openWebcam} imgSrc={userData.image || unkownUserImg} />}
                {webcamOpen && <WebcamModal changeImg={changeImg} closeWebcam={closeWebcam} />}
                {/* <p>Discount code for <a href="https://weborado.lt" target="_blank">weborado.lt</a></p> */}
            </div>
            <div className="user__extra-btns">
                <PageNav userExists={true} />
                <button className="profile-control user-logout-btn" onClick={logout}>
                    <IoIosLogOut />
                </button>
            </div>
            {
                loading && <LoadingWheel />
            }
        </>
    )
}