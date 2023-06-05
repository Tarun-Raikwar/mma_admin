import "./navbar.css"
import image from "./logo.JPG"

const Navbar = () => {
    return(
        <div className="navbar">
            <img src={image} alt="" />
            <p>Master Management Associates</p>
        </div>
    );
}

export default Navbar;