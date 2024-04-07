import { useLanguage } from "../../context/LanguageProvider";
import coin from "../../assets/images/coin.webp";

export default function LanguageSelector() {
    const { locale, changeLocale } = useLanguage();
    const handleLanguageChange = (e) => {
        changeLocale(e.target.value);
    }
    return (
        <>
            <button className={`selector-btn ${locale==='lt'?'active':''}`} value="lt" onClick={handleLanguageChange}>LT</button>
            <img src={coin} alt="coin" id='selector-img'></img>
            <button className={`selector-btn ${locale==='en'?'active':''}`} value="en" onClick={handleLanguageChange}>EN</button>
        </>
        
    )
}