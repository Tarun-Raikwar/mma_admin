import { useEffect, useState } from "react";
import "./fieldAgent.css"
import AgentCard from "./agentCard";
import { Link } from "react-router-dom";

const FieldAgent = (props) => {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);

    useEffect(()=>{
        fetch("https://mma-server.onrender.com/FieldAgentData")
        .then(res => res.json())
        .then(Agentdata => {
            setLoading(false);
            setData(Agentdata);
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
            setError(true);
        })
    }, [props.setCurrupdatedAgent]);

    const handleCurrentAgentShown = (currentAgentData) => {
        props.handleCurrentAgentShownApp(currentAgentData);
    }

    return(
        <div className={"fieldAgent" + ((loading || error || (data && data.length === 0))? " center":"")}>
            {loading && (<p>Loading...</p>)}
            {error && (<p className="error">Server error</p>)}
            {data && (
                <div className="button">
                    <Link to="/Addagent">
                        <button>+ Add agent</button>
                    </Link>
                </div>
            )}
            {data && data.map((agent, i) => {
                return <AgentCard agentData={agent} handleCurrentAgent={handleCurrentAgentShown} key={agent._id}/>
            })}
        </div>
    );
}

export default FieldAgent;