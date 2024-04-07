import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAdmin } from "../../context/AdminProvider";
import { useEffect, useState } from "react";
import { sendUserData } from "../../utils/api";

export default function EditTable() {
    const { selectedUser, refreshUsers } = useAdmin();
    const [selected, setSelected] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    // kind of hacky, but I dont want to figure out how to update the UserProvider toolbar
    // so Ill just stick with this for now
    const [userMoney, setUserMoney] = useState(null)

    useEffect(() => {
        setSelected(Object.keys(selectedUser).length !== 0);
        setUserMoney(Number(selectedUser.money))
    }, [selectedUser])

    function handleMoneySubmit(e) {
        e.preventDefault();
        const amount = Number(e.target.amount.value);
        const userData = {
            name: selectedUser.name,
            surname: selectedUser.surname,
            money: amount,
        }
        sendUserData(userData, "addmoney").then((res) => {
            setUserMoney(current => current + amount);
            setSubmitStatus('success');
            setErrorMsg('');
            refreshUsers();
            setTimeout(() => {
                setSubmitStatus('');
            }, 300)
        }).catch(err => {
            console.log(err);
            setSubmitStatus('error');
            setErrorMsg(err.message);
            setTimeout(() => {
                setSubmitStatus('');
                setErrorMsg('');
            }, 3000)
        })
    }

    return (
        <div className="edit">
            <div className="edit__header">
                <FontAwesomeIcon className='edit-icon' icon={faUser} />
                <p className="edit__name">
                    {selected ? `${selectedUser.name} ${selectedUser.surname}` : 'No user selected'}
                </p>
            </div>
            {selected ? (
                <div className="edit__info">
                    <form className="edit-money edit-form" onSubmit={handleMoneySubmit}>
                        <div className="edit-info">
                            <label className='money-amount' htmlFor="amount">Amount</label>
                            <p className="money-current">{userMoney}</p>
                            <p className="submit-status">
                                <div className={`edit-success edit-status ${submitStatus === 'success' ? 'active' : ''}`}>
                                    <FontAwesomeIcon
                                        className={`submit-sucess`}
                                        icon={faCheck} />
                                    <p className={`sucess-msg`}>Success!</p>
                                </div>
                                <div className={`edit-error edit-status  ${submitStatus === 'error' ? 'active' : ''}`}>
                                    <FontAwesomeIcon
                                        className={`submit-error`}
                                        icon={faXmark} />
                                    <p className={`error-msg`}>{errorMsg}</p>
                                </div>
                            </p>
                        </div>

                        <div className="edit-controls">
                            <input className="money-input" type="number" id="amount" name="amount" />
                            <button className="money-submit" type="submit">Submit Change</button>
                        </div>
                    </form>
                </div>
            ) : (<p className="edit-placeholder">Select a user to edit</p>)}
        </div>
    )
}