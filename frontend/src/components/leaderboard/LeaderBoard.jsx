import { useState, useEffect, useCallback, createRef } from 'react'
import { useInView } from 'react-intersection-observer';

import { getAllUsers } from "../../utils/api"

import LeaderBoardEntry from './LeaderBoardEntry'

import { usePage } from '../../context/PageProvider';

import './leaderboard.css'

import io from 'socket.io-client';

import CONSTANTS from '../../constants';
import LoadingWheel from '../LoadingWheel';

const socket = io.connect(CONSTANTS.SOCKET_URL);

const MIN_DISPLAY_LIMIT = 5;

/**
 * Renders the LeaderBoard component.
 * @param {boolean} desktopMode - Whether the component is being rendered in desktop mode.
 * @returns {JSX.Element} The rendered LeaderBoard component.
 */

export default function LeaderBoard({ desktopMode = false }) {
    const [leaderBoardPos, setLeaderBoardPos] = useState([]);
    const [entryRefs, setEntryRefs] = useState([]);
    const [error, setError] = useState(null);

    const [displayLimit, setDisplayLimit] = useState(MIN_DISPLAY_LIMIT);
    // to many states, fix l8r
    // const [maxDisplayLimit, setMaxDisplayLimit] = useState(0);
    const { ref, inView } = useInView({ threshold: 0, fallbackInView: true });
    // const [animate, setAnimate] = useState(false);
    const { currentUserPageName } = usePage();
    const [mostMoney, setMostMoney] = useState(0);
    const [loading, setLoading] = useState(true);

    /**
     * Fetches the leaderboard positions of all users.
     */
    const getLeaderBoardPositions = useCallback(async () => {
        try {
            const data = await getAllUsers();

            // setMaxDisplayLimit(data.result.length);
            // if (data.result.length <= MIN_DISPLAY_LIMIT || desktopMode) {
            //     setDisplayLimit(undefined);
            // }

            setEntryRefs((entryRef) => {
                const entryRefs = Array(data.result.length)
                    .fill()
                    .map((_, i) => entryRef[i] || createRef());
                return entryRefs;
            });

            let sortedPositions = data.result.sort((a, b) => b.money - a.money);
            sortedPositions = sortedPositions.map((user, index) => ({
                ...user,
                refId: index
            }));

            setLoading(false);

            return sortedPositions;
        } catch (err) {
            console.error('error retrieving all users')
            setError(err);
            return [];
        }
    }, [])

    /**
     * Toggles the display limit of the leaderboard.
     */
    // const toggleDisplayLimit = () => {
    //     if (displayLimit !== maxDisplayLimit) {
    //         setDisplayLimit(maxDisplayLimit);
    //     } else {
    //         setDisplayLimit(MIN_DISPLAY_LIMIT);
    //     }
    // }

    const changeUserPositions = (socketUser) => {
        const oldLeaderBoardPos = [...leaderBoardPos];

        const oldUserIndex = leaderBoardPos.findIndex(user => user.name === socketUser.name && user.surname === socketUser.surname);
        if (oldUserIndex !== -1) {
            leaderBoardPos[oldUserIndex].money += socketUser.money;
            leaderBoardPos.sort((a, b) => b.money - a.money);
        }
        const updatedUserIndex = leaderBoardPos.findIndex(user => user.name === socketUser.name && user.surname === socketUser.surname);
        const updatedUser = leaderBoardPos[updatedUserIndex];
        const updatedUserRef = entryRefs[updatedUser.refId].current;
        updatedUserRef.mutateMoneyCnt(leaderBoardPos[updatedUserIndex].money);

        if (updatedUserIndex === oldUserIndex) return;

        updatedUserRef.moveToPosition(updatedUserIndex + 1);
        const stepDirection = updatedUserIndex > oldUserIndex ? -1 : 1;

        let user = oldLeaderBoardPos[updatedUserIndex];
        for (let i = updatedUserIndex; i !== oldUserIndex; i += stepDirection) {
            const userRef = entryRefs[user.refId].current;
            userRef.moveToPosition(i + 1);
            user = leaderBoardPos[i + stepDirection];
        }
        const userRef = entryRefs[user.refId].current;
        userRef.moveToPosition(oldUserIndex + 1);

        if (updatedUserIndex === 0) {
            setMostMoney(updatedUser.money);
        }
    }

    useEffect(() => {
        const fetchLeaderBoard = async () => {
            const sortedPositions = await getLeaderBoardPositions();
            setLeaderBoardPos(sortedPositions);
            setMostMoney(sortedPositions[0].money);
        }
        fetchLeaderBoard();
        // not sure how to handle newUser?
        socket.on('newUser', () => {
            fetchLeaderBoard();
            if (displayLimit > MIN_DISPLAY_LIMIT) setDisplayLimit(prev => prev + 1);
        })

        socket.on('updateUser', (socketUser) => {
            if (entryRefs.length > 0) {
                changeUserPositions(socketUser);
            } else {
                const checkEntryRefs = setInterval(() => {
                    if (entryRefs.length > 0) {
                        changeUserPositions(socketUser);
                        clearInterval(checkEntryRefs);
                    }
                }, 100)
            }

        })

        return () => {
            socket.off('newUser');
            socket.off('updateUser');
        }
    }, [getLeaderBoardPositions, mostMoney, displayLimit])

    // useEffect(() => {
    //     if (currentUserPageName !== 'leaderboard') {
    //         setDisplayLimit(5);
    //     }
    // }, [currentUserPageName, inView])


    // useEffect(() => {
    //     if (!leaderBoardPos.length) return;


    // }, [leaderBoardPos.length])

    if (error) return <div>{error}</div>
    if (!leaderBoardPos.length) return <div></div>

    return (
        <>
            <div
                className={`user-page side-page leaderboard ${desktopMode ? 'active desktop' : currentUserPageName === 'leaderboard' ? 'active' : ''}`}
                ref={ref}>
                {
                    // slice(0, desktopMode ? maxDisplayLimit : displayLimit)
                    leaderBoardPos.map((user, index) =>
                        <LeaderBoardEntry
                            ref={entryRefs[index]}
                            key={user.name + user.surname}
                            position={index + 1}
                            user={user}
                            mostMoney={mostMoney}
                            inView={inView} />
                    )
                }
                <div className='leaderboard-padding' style={{ top: `${(leaderBoardPos.length - 1) * CONSTANTS.LEADERBOARD_ENTRY_HEIGHT}px` }}></div>
                {/* <div className="leaderboard__controls" style={{ top: `${(desktopMode ? leaderBoardPos.length : displayLimit) * CONSTANTS.LEADERBOARD_ENTRY_HEIGHT}px` }}>
                {displayLimit &&
                    <button onClick={toggleDisplayLimit}>
                        {displayLimit === maxDisplayLimit ?
                            <LiaMinusSquare /> :
                            <LiaPlusSquare />
                        }
                    </button>
                }
            </div> */}
            </div>
            {
                loading && <LoadingWheel />
            }
        </>
    )
}