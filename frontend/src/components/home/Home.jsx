import Header from "../header/Header"
import HeroTicket from "../ticket/HeroTicket"
import { usePage } from "../../context/PageProvider"
import './home.css'
/**
 * Renders the Home component.
 * @returns {JSX.Element} The rendered Home component.
 */
export default function Home() {
    const { currentUserPageName } = usePage();
    return (
        <div className={`user-page home-page ${currentUserPageName === 'home' ? 'active' : ''}`}>
            <Header />
            <HeroTicket />
        </div>
    )
}