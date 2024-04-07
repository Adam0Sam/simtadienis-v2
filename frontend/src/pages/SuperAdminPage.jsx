import { sendUserData } from "../utils/api";

export default function SuperAdminPage() {

    const handleSubmit = (e) => {
        e.preventDefault();

        sendUserData({
            name: e.target[0].value,
            surname: e.target[1].value,
            password: e.target[2].value,
        }, 'register-admin')
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" placeholder='vardenis' />
            </label>
            <label>
                Surname
                <input type="text" placeholder="placeholder"></input>
            </label>
            <label>
                Password:
                <input type="text" placeholder={'password'} />
            </label>
            <button type="submit">Create Admin Account</button>
        </form>
    );
}

