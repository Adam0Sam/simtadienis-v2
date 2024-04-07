import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown, faMoneyBill1Wave } from "@fortawesome/free-solid-svg-icons";

import Modal from "../modal/Modal";
import UserWindow from "../user/UserWindow";

import CONSTANTS from "../../constants";
import unkownUserImg from "../../assets/images/unkown-user-new.png";
import { useState, forwardRef, useImperativeHandle } from "react";

/**
 * Renders a leaderboard entry component.
 * @param {Object} props.user - The user object containing name, surname, and money.
 * @param {number} props.position - The position of the user in the leaderboard.
 * @param {number} props.mostMoney - The highest amount of money among all users.
 * @returns {JSX.Element} The rendered leaderboard entry component.
 */
const LeaderBoardEntry = forwardRef(function ({ user, position, mostMoney, inView }, ref) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currPosition, setCurrPosition] = useState(position);
    const [delayMultiplier, setDelayMultiplier] = useState(position - 1);
    const [moneyCnt, setMoneyCnt] = useState(user.money);
    const yOffset = `${(currPosition - 1) * CONSTANTS.LEADERBOARD_ENTRY_HEIGHT}px`

    let barWidth = (Number(moneyCnt) / mostMoney) * 100;

    useImperativeHandle(ref, () => ({
        moveToPosition: newPosition => {
            setCurrPosition(newPosition);
        },
        mutateMoneyCnt: newMoneyCnt => setMoneyCnt(newMoneyCnt)
    }));

    return (
        <>
            <div className={`entry pos-${currPosition} ${inView ? 'in-view' : ''} ${delayMultiplier === null ? 'arrived' : ''}`}
                onClick={() => setModalIsOpen(true)}
                style={{
                    '--transition-delay-multiplier': `${delayMultiplier}`,
                    transform: `${delayMultiplier !== null ? (inView ? `translate(0, ${yOffset})` : 'translateX(-100dvw)') : `translateY(${yOffset})`}`
                }}
                onTransitionEnd={() => { setDelayMultiplier(null); }}
            >
                <div className="entry-wrap">
                    {currPosition <= 3 && (
                        <div className={`entry-ava`}>
                            <FontAwesomeIcon icon={faCrown} />
                        </div>)
                    }
                    <div className="entry__info">
                        <div className="entry-info__upper">
                            {
                                user?.image &&
                                <div className="mini-profile-container">
                                    <img className="mini-profile" src={user?.image} alt="user">
                                    </img>
                                </div>
                            }
                            <p className="entry-name"><span className="entry-pos">{currPosition}</span>{user.name + ' ' + user.surname}</p>
                        </div>
                        <div className="entry-money">
                            <FontAwesomeIcon icon={faMoneyBill1Wave} className="money-icon" />
                            <span className="digit">{moneyCnt}</span>
                        </div>
                    </div>
                </div>
                <div className="entry-bar">
                    <div className="bar" style={{ '--bar-width': `${delayMultiplier !== null ? 0 : barWidth}%` }}></div>
                </div>
            </div>
            {
                modalIsOpen &&
                <Modal openOnMount>
                    <UserWindow userData={user} closeModal={() => setModalIsOpen(false)} />
                </Modal>
            }
        </>
    )
});

export default LeaderBoardEntry;