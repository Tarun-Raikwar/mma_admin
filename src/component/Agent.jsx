import { useEffect, useState } from "react";
import "./Agent.css"
import ClientCard from "./clientCard";
import Form from "./form";
import Assign from "./assign";

const Agent = ({ handleUpdateAgent, setAgent }) => {
    const [AgentData, setAgentData] = useState(null);
    const [done, setDone] = useState(null);
    const [doneLoading, setDoneLoading] = useState(true);
    const [pending, setPending] = useState(null);
    const [pendingLoading, setPendingLoading] = useState(true);
    const [form, setForm] = useState(null);
    const [assigning, setAssigning] = useState(false);

    useEffect(() => {
        setAgentData(setAgent);
        setPendingLoading(true);
        setDoneLoading(true);
        setForm(null);
        setAssigning(false);

        fetch("https://mma-server.onrender.com/findForm", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(setAgent.Done)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setDoneLoading(false);
                setDone(data.fetchedData);
            })
            .catch(err => console.log(err))

        fetch("https://mma-server.onrender.com/findForm", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(setAgent.Pending)
        })
            .then(res => res.json())
            .then(data => {
                setPendingLoading(false);
                setPending(data.fetchedData);
            })
            .catch(err => console.log(err))

    }, [setAgent]);

    const handleForm = (selectedFrom) => {
        setAssigning(false);
        setForm(selectedFrom);
    }

    const updateAgentPendingWork = (UpdatedPendingWork) => {
        const updatedAgent = {...setAgent, Pending: UpdatedPendingWork};
        handleUpdateAgent(updatedAgent);
    }

    return (
        <div className="AgentContainer">
            {AgentData && (<div className="Agent">
                <div className="intro">
                    <table>
                        <tr>
                            <td>Name</td>
                            <td className="value">{AgentData.Name}</td>
                        </tr>
                        <tr>
                            <td>Username</td>
                            <td className="value">{AgentData.Username}</td>
                        </tr>
                        <tr>
                            <td>Adhar no</td>
                            <td className="value">{AgentData.Adharno}</td>
                        </tr>
                        <tr>
                            <td>DOB</td>
                            <td className="value">{AgentData.DOB}</td>
                        </tr>
                    </table>

                    <div className="button">
                        <button onClick={() => {
                            setAssigning(true);
                        }}>+ assign</button>
                    </div>
                </div>

                <div className="work">
                    <div className="done">
                        <p className="heading">verified work</p>
                        <div className={"content" + ((doneLoading || (done && done.length === 0)) ? " center": "")}>
                            {doneLoading && <p>Loading...</p>}
                            {(!doneLoading && done && done.length > 0) && (done.map((client) => {
                                return <ClientCard client={client} handleForm={handleForm}/>
                            }))}
                            {(!doneLoading && done && done.length === 0) && <p>No data</p>}
                        </div>
                    </div>
                    <div className="pending">
                        <p className="heading">pending work</p>
                        <div className={"content" + ((pendingLoading || (pending && pending.length === 0)) ? " center": "")}>
                            {pendingLoading && <p>Loading...</p>}
                            {(!pendingLoading && pending && pending.length > 0) && (pending.map((client) => {
                                return <ClientCard client={client} handleForm={handleForm}/>
                            }))}
                            {(!pendingLoading && pending && pending.length === 0) && <p>No data</p>}
                        </div>
                    </div>
                </div>
            </div>)}
            
            {assigning && <Assign handleupdateAgentPendingWork={updateAgentPendingWork} AgentDetail={setAgent}/>}
            {(!assigning && form) && <Form Selectedclient={form}/>}

        </div>
    );
}

export default Agent;