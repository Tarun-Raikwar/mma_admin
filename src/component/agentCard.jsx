import "./agentCard.css"

const AgentCard = (props) => {
    const data = props.agentData;
    console.log(data);
    const setCurrentAgentData = () => {
        props.handleCurrentAgent(data);
    }
    return(
        <div className="AgentCard" onClick={setCurrentAgentData}>  
            <p>UserName: {data.Username}</p>
            <p>Name: {data.Name}</p>
            <p>DOB: {data.DOB}</p>
        </div>
    );
}

export default AgentCard;