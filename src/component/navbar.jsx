import "./navbar.css"
import image from "./logo.png"
import { useState } from "react";
import GroupAssign from "./Group_assign";

const Navbar = ({ Agentdata }) => {
    const [group_assign, setGroupAssign] = useState(false);

    const handleGroupAssign = () => {
        setGroupAssign(false);
    }

    return(
        <div className="navbar">
            <div className="left">
                <img src={image} alt="" />
                <p>Master Management Associates</p>
            </div>
            <div className="right">
                <p onClick={() => setGroupAssign(true)}>Multiple assign</p>
            </div>

            {group_assign && <GroupAssign AgentData={Agentdata} handleGroupAssign={handleGroupAssign}/>}
        </div>
    );
}

export default Navbar;