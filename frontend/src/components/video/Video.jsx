import { usePage } from "../../context/PageProvider"
import { useState, useEffect, useCallback } from "react"
import { handleVotes } from "../../utils/api"
import VideoInstance from "./VideoInstance"

import { LiaArrowAltCircleRightSolid } from "react-icons/lia";
import './video.css'
import CONSTANTS from "../../constants"

const fillVotes = () => {
    return Array.from({ length: CONSTANTS.CLASS_LIST.length }, (_, index) =>
        Array(CONSTANTS.CLASS_LIST[index].length).fill(0)
    );
}

export default function Video() {
    const { currentUserPageName } = usePage();
    const [currClass, setCurrClass] = useState(0);
    const [screenSize, setScreenSize] = useState(window.innerWidth);
    const [totalVotes, setTotalVotes] = useState(fillVotes());

    const getTotalVotes = useCallback(async () => {
        try {
            const data = await handleVotes({ action: "get" });
            return data.response;
        } catch (err) {
            console.error('ERROR', err);
        }
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setScreenSize(window.innerWidth > 500 ? 500 : window.innerWidth);
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        getTotalVotes().then((res) => {
            const newVotes = fillVotes();
            if (!res) return;
            res.forEach(item => {
                // item.id might not work
                newVotes[item.class][item.id] = item.votes;
            })
            setTotalVotes(newVotes);
        });

        getTotalVotes()

        return () => window.removeEventListener('resize', handleResize);
    }, [getTotalVotes]);

    const deductVote = (id) => {
        setTotalVotes((prev) => {
            const newVotes = [...prev];
            newVotes[currClass][id] -= 1;
            return newVotes;
        });
    }

    const addVote = (id) => {
        setTotalVotes((prev) => {
            const newVotes = [...prev];
            newVotes[currClass][id] += 1;
            return newVotes;
        });
    }

    const changeClass = () => {
        setCurrClass(prev => {
            const newClass = prev + 1;
            if (newClass >= CONSTANTS.CLASS_LIST.length) return 0;
            return newClass;
        });
    }

    const voteManipulation = {
        deductVote,
        addVote
    }

    useEffect(() => {
        const v = document.querySelector('.video-page')
        v.scrollTop = 0;
    }, [currClass]);

    return (
        <div className={`user-page side-page video-page ${currentUserPageName === 'video' ? 'active' : ''}`}>
            {
                <div className="video__container">
                    {CONSTANTS.CLASS_LIST[currClass].map((video, i) => {
                        return <VideoInstance key={i} currClass={currClass} video={video} videoVotes={totalVotes[currClass][i]} voteManipulation={voteManipulation} position={i} screenSize={screenSize} />;
                    })}
                </div>
            }
            <button className={`video-btn ${currClass >= CONSTANTS.CLASS_LIST.length - 1 ? 'right' : 'left'}`} onClick={changeClass}>
                {
                    <LiaArrowAltCircleRightSolid />
                }
            </button>
        </div>
    )
}