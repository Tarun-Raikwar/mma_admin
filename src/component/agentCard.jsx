import "./agentCard.css"

const AgentCard = (props) => {
    const data = props.agentData;
    const setCurrentAgentData = () => {
        props.handleCurrentAgent(data);
    }
    return(
        <div className="AgentCard" onClick={setCurrentAgentData}>  
            <table>
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td className="value">  {data.Name}</td>
                    </tr>
                    <tr>
                        <td>DOB</td>
                        <td className="value">  {data.DOB}</td>
                    </tr>
                    <tr>
                        <td>Username</td>
                        <td className="value">  {data.Username}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default AgentCard;