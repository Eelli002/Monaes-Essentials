import './style.css';

const Footer = () => {
    const date = new Date();
    const fullYear = date.getFullYear();
    return (
        <footer className="footer">
            <p>
                All &copy; Copyrights Are Reserved to Monae's Essentials {fullYear}
            </p>
        </footer>
    );
};

export default Footer;