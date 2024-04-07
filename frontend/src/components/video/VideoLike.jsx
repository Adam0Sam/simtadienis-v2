import React, { useState } from 'react';
import { useUser } from '../../context/UserProvider';
import { handleVotes } from '../../utils/api';
import { LiaHeart, LiaHeartSolid } from "react-icons/lia";

export default function VideoLike({ id, videoVotes, voteManipulation, currClass }) {
    const { userId, changeVoteId, voteId } = useUser();
    const currVote = voteId[currClass];
    const [voted, setVoted] = useState(false);

    const handleVoteSubmit = async () => {
        try {
            if(currVote===id) return;
            if (currVote!==null && currVote !== undefined && currVote !== id) {
                voteManipulation.deductVote(currVote);
            }
            setVoted(true);
            setTimeout(() => setVoted(false), 300);
            voteManipulation.addVote(id);
            const newVoteId = await changeVoteId(currClass, id)
            const response = await handleVotes({ name: userId.name, surname: userId.surname, votes: newVoteId, action: "set" });

        } catch (err) {
        }
    };

    return (
        <div className='video__likes'>
            <button onClick={handleVoteSubmit} className={`like-btn ${voted ? 'voted' : ''}`}>
                {currVote === id ? <LiaHeartSolid /> : <LiaHeart />}
            </button>
            <div className='like-cnt digit'>
                {videoVotes}
            </div>
        </div>
    )
}