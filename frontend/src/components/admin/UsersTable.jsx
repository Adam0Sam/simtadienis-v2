import { useEffect, useState } from 'react';
import { useAdmin } from '../../context/AdminProvider';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function UsersTable({ users }) {
    const { selectUser } = useAdmin();
    const [focus, setFocus] = useState(null);

    const iterationStep = 10;
    const [iteration, setIteration] = useState(1);
    const [upperBound, setUpperBound] = useState(iterationStep * iteration);
    const [lowerBound, setLowerBound] = useState(iterationStep * (iteration - 1));

    const handleHover = (index) => {
        setFocus(index);
    }

    const handleEdit = (e) => {
        const name = e.target.parentElement.children[0].innerText;
        const surname = e.target.parentElement.children[1].innerText;
        const money = e.target.parentElement.children[2].innerText;
        const user = { name, surname, money };
        selectUser(user);
    }

    const handleLeave = (e) => {
        setFocus(null);
    }

    useEffect(() => {
        setUpperBound(iterationStep * iteration);
        setLowerBound(iterationStep * (iteration - 1));
    }, [iteration])

    const iterateLeft = () => {
        if (lowerBound - iterationStep >= 0) {
            setIteration((iteration) => iteration - 1);
        }
    }

    const iterateRight = () => {
        if (upperBound + iterationStep <= users.length) {
            setIteration((iteration) => iteration + 1);
        }
        else if (upperBound < users.length) {
            setLowerBound(lowerBound + iterationStep);
            setUpperBound(users.length);
        }
    }

    return (
        <div className='user-table-wrapper'>
            <table className='user-table' onMouseLeave={handleLeave}>
                <thead className='table__head'>
                    <tr>
                        <th className='head-prop'>Name</th>
                        <th className='head-prop'>Surname</th>
                        <th className='head-prop'>Money</th>
                    </tr>
                </thead>
                <tbody className='table__body'
                >
                    {!users ? (
                        <tr>
                            <td>
                                fetching user list...
                            </td>
                        </tr>
                    ) : (
                        users.map((user, index) => {
                            if (index < upperBound && index >= lowerBound)
                                if (user)
                                    return (
                                        <tr
                                            // delete all duplicate users in db so that I can use this key
                                            key={index}
                                            className={`body-row ${index === focus ? 'active' : ''}`}
                                            onMouseOver={() => handleHover(index)}>
                                            <td className='body-prop'>{user.name}</td>
                                            <td className='body-prop'>{user.surname}</td>
                                            <td className='body-prop'>{user.money}</td>
                                            <button className={`edit-button ${index === focus ? 'active' : ''}`} onClick={handleEdit}>Edit</button>
                                        </tr>
                                    )
                        })
                    )
                    }
                </tbody>
            </table>
            <div className='table-controls'>
                <FontAwesomeIcon icon={faArrowLeft} className='table-arrow' onClick={iterateLeft} />
                <p>{`${lowerBound} - ${upperBound}`}</p>
                <FontAwesomeIcon icon={faArrowRight} className='table-arrow' onClick={iterateRight} />
            </div>
        </div>
    );
};