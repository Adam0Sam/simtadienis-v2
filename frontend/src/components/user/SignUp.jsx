import { sendUserData, userExists } from "../../utils/api";

import { FormattedMessage } from "react-intl";
import { useRef, useState, useEffect } from "react";

import { useUser } from "../../context/UserProvider";

import FormInput from "../Input";
import LoadingWheel from "../LoadingWheel";

const USER_REGEX = /^[a-zA-Z0-9]{3,30}$/;
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d).{5,}$/;
const TIMEOUT_DURATION = 5000; // in ms

export default function Signup() {
    const { closeSignup } = useUser();

    const nameRef = useRef();
    const errRef = useRef();

    const [name, setName] = useState("");
    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);

    const [surname, setSurname] = useState("");
    const [validSurname, setValidSurname] = useState(false);
    const [surnameFocus, setSurnameFocus] = useState(false);

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    const [signupTimeout, setSignupTimeout] = useState(false);
    const [submitSent, setSubmitSent] = useState(false);

    useEffect(() => {
        nameRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(name));
    }, [name])

    useEffect(() => {
        setValidSurname(USER_REGEX.test(surname));
    }, [surname])

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password));
        setValidMatch(password === matchPassword);
    }, [password, matchPassword])

    useEffect(() => {
        setErrMsg("");
    }, [name, surname, password, matchPassword])

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSignupTimeout(true);
        setTimeout(() => {
            setSignupTimeout(false);
        }, TIMEOUT_DURATION);

        const userName = name;
        const userSurname = surname;

        const userData = {
            name: userName,
            surname: userSurname,
            password: password,
            money: 0,
            image: null,
            galleryCnt: 0
        };
        
        // #TODO, check additionally if submit button was enabled via console
        if (await userExists(userName, userSurname)) {
            setErrMsg("User already exists.");
            return;
        }
        
        setSubmitSent(true);
        await sendUserData(userData, "register")
        closeSignup();
    }

    return (
        <>
            <section className="form-wrapper">
                <h3 className="form-title signup-title">
                    <FormattedMessage id="signup" />
                </h3>
                <form className="form signup" method="post" onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <FormInput
                            ref={nameRef}
                            id="name"
                            customClassNames={`form-input ${validName || !name ? "" : "invalid"}`}
                            onValueChange={(e) => setName(e.target.value)}
                            inputValue={name} onFocus={() => setNameFocus(true)}
                            onBlur={() => setNameFocus(false)}
                        />
                        <p className={`instructions ${nameFocus && name && !validName ? "show" : ""}`}>
                            <FormattedMessage id="signup.error.text" />
                        </p>
                    </div>
                    <div className="input-wrapper">
                        <FormInput
                            id="surname"
                            customClassNames={`form-input ${validSurname || !surname ? "" : "invalid"}`}
                            onValueChange={(e) => setSurname(e.target.value)}
                            inputValue={surname}
                            onFocus={() => setSurnameFocus(true)}
                            onBlur={() => setSurnameFocus(false)}
                        />
                        <p className={`instructions ${surnameFocus && surname && !validSurname ? "show" : ""}`}>
                            <FormattedMessage id="signup.error.text" />
                        </p>
                    </div>
                    <div className="input-wrapper">
                        <FormInput
                            id="password"
                            customClassNames={`form-input ${validPassword || !password ? "" : "invalid"}`}
                            onValueChange={(e) => setPassword(e.target.value)}
                            inputValue={password}
                            type="password"
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                        />
                        <p className={`instructions ${passwordFocus && password && !validPassword ? "show" : ""}`}>
                            <FormattedMessage id="signup.error.password" />
                        </p>
                    </div>
                    <div className="input-wrapper">
                        <FormInput
                            id="rpassword"
                            customClassNames={`form-input ${validMatch || !matchPassword ? "" : "invalid"}`}
                            onValueChange={(e) => setMatchPassword(e.target.value)}
                            inputValue={matchPassword}
                            type="password"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p className={`instructions ${matchFocus && matchPassword && !validMatch ? "show" : ""}`}>
                            <FormattedMessage id="signup.error.rpassword" />
                        </p>
                    </div>
                    <p className="password-forget">
                        <FormattedMessage id="forget.password" />
                    </p>

                    <p ref={errRef} className={`errmsg ${errMsg ? "active" : ""}`}>{errMsg}</p>
                    <div className="form__buttons">
                        <button
                            className={`form-submit ${!validName || !validPassword || !validMatch ? '' : 'enabled'}`}
                            type="submit"
                            id="register-submit"
                            disabled={(!validName || !validPassword || !validMatch) || signupTimeout}>
                            <FormattedMessage id="submit" />
                        </button>
                    </div>
                </form>
            </section>
            {
                submitSent && <LoadingWheel />
            }
        </>
    )
}