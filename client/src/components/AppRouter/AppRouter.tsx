import "./appRouter.scss"
import logo from "../../assets/heart.svg";
import profile from "../../assets/user-svgrepo-com.svg";
import { Link } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { SiAzuredataexplorer } from "react-icons/si";
import { CiLogout } from "react-icons/ci";


const AppRouter = () => {
  return (
    <div className="appRouter">
        
        <section className="app_logo">
                <img src={logo} alt="logo" />
            <h1 className="logo_text">Blug</h1>
        </section> 

        <section className="app_sidebar">

            <div className="profile">
                <div className="profile_picture">
                    <img src={profile} alt="profile" />
                </div>
                <div className="profile_text">
                    <p className="pf">First Name</p>
                    <p className="pu">@Username</p>
                </div>
            </div>

            <div className="sidebar_links_container">

                <Link className="sidebar_link" to="/">
                    <span className="sl_icon"><GoHomeFill /></span>
                    <span className="sl_text">Home</span>
                </Link>
                <Link to="/" className="sidebar_link">
                    <span className="sl_icon"><SiAzuredataexplorer /></span>
                    <span className="sl_text">Explore</span>
                </Link>
                <Link to="/" className="sidebar_link">
                    <span className="sl_icon"><CiLogout /></span>
                    <span className="sl_text">Logout</span>
                </Link>

            </div>

        </section>

    </div>
  )
}

export default AppRouter