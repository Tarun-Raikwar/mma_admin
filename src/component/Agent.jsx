import { useEffect, useState } from "react";
import "./Agent.css"
import ClientCard from "./clientCard";
import Form from "./form";
import Assign from "./assign";
import Deleting from "./Deleting";

const Agent = ({ handleUpdateAgent, setAgent }) => {
    const [AgentData, setAgentData] = useState(null);
    const [done, setDone] = useState(null);
    const [doneLoading, setDoneLoading] = useState(true);
    const [pending, setPending] = useState(null);
    const [pendingLoading, setPendingLoading] = useState(true);
    const [form, setForm] = useState(null);
    const [assigning, setAssigning] = useState(false);
    const [showPending, setShowPending] = useState(true);
    const [showDone, setShowDone] = useState(false);

    const [isDeleting, setIsDeleting] = useState(false);



    //Intitial loading
    useEffect(() => {
        setAgentData(setAgent);
        setPendingLoading(true);
        setDoneLoading(true);
        setForm(null);
        setAssigning(false);


        //fetcing verified data
        fetch("https://mma-server.onrender.com/findForm", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({Credentials: {username: sessionStorage.getItem('username'), password: sessionStorage.getItem('password')}, data : setAgent.Done})
        })
            .then(res => res.json())
            .then(data => {
                setDoneLoading(false);
                setDone(data.fetchedData);
            })
            .catch(err => console.log(err))


        //fetching pending data
        fetch("https://mma-server.onrender.com/findForm", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({Credentials: {username: sessionStorage.getItem('username'), password: sessionStorage.getItem('password')}, data : setAgent.Pending})
        })
            .then(res => res.json())
            .then(data => {
                setPendingLoading(false);
                setPending(data.fetchedData);
            })
            .catch(err => console.log(err))

    }, [setAgent]);


    //shown client form
    const handleForm = (selectedFrom) => {
        setAssigning(false);
        setForm(selectedFrom);
    }

    //update work pending work
    const updateAgentPendingWork = (UpdatedPendingWork) => {
        const updatedAgent = { ...setAgent, Pending: UpdatedPendingWork };
        handleUpdateAgent(updatedAgent);
    }

    const updateAgentDoneWork = (UpdatedDoneWork) => {
        const updatedAgent = { ...setAgent, Done: UpdatedDoneWork };
        handleUpdateAgent(updatedAgent);
    }


    //delete pending form
    const delete_pending_form = (ind) => {
        setIsDeleting(true);
        console.log(ind);
        console.log("pending form");
        fetch("https://mma-server.onrender.com/delete_form", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({Credentials: {username: sessionStorage.getItem('username'), password: sessionStorage.getItem('password')}, data : {"id": setAgent.Pending[ind]}})
        })
            .then(res => res.json())
            .then(data => {


                if(data.status === "false"){
                    console.log("failed");
                    return;
                }
                else{
                    fetch("https://mma-server.onrender.com/updateAgent", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({Credentials: {username: sessionStorage.getItem('username'), password: sessionStorage.getItem('password')}, data : {agentId: {_id: AgentData._id}, update: {"Pending": [...setAgent.Pending.slice(0, ind), ...setAgent.Pending.slice(ind + 1, pending.length)]}}})
                    })
                        .then(res => res.json())
                        .then(data => {
                            let pendingWork = [...setAgent.Pending.slice(0, ind), ...setAgent.Pending.slice(ind + 1, pending.length)];
                            console.log(pendingWork);
                            updateAgentPendingWork(pendingWork);
                            console.log("delete");
                            setIsDeleting(false);
                        })
                        .catch(err => console.log(err));
                }
            })
            .catch(err => console.log("initial failed"))
    }




    //delete verified form
    const delete_verified_form = (ind) => {
        setIsDeleting(true);
        fetch("https://mma-server.onrender.com/delete_form", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({Credentials: {username: sessionStorage.getItem('username'), password: sessionStorage.getItem('password')}, data : {"id": setAgent.Done[ind]}})
        })
            .then(res => res.json())
            .then(data => {
                if(data.status === "false"){
                    console.log("failed");
                    return;
                }
                else{
                    fetch("https://mma-server.onrender.com/updateAgent", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({Credentials: {username: sessionStorage.getItem('username'), password: sessionStorage.getItem('password')}, data : {agentId: {_id: AgentData._id}, update: {"Done": [...setAgent.Done.slice(0, ind), ...setAgent.Done.slice(ind + 1, done.length)]}}})
                    })
                        .then(res => res.json())
                        .then(data => {
                            let doneWork = [...setAgent.Done.slice(0, ind), ...setAgent.Done.slice(ind + 1, pending.length)];
                            updateAgentDoneWork(doneWork);
                            console.log("delete");
                            setIsDeleting(false);
                        })
                        .catch(err => console.log(err));
                }

            })
            .catch(err => console.log("initial failed"))
    }


    //component
    return (
        <div className="AgentContainer">
            {AgentData && (<div className="Agent">
                <div className="intro">
                    <table>
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td className="value">{AgentData.Name}</td>
                            </tr>
                            <tr>
                                <td>DOB</td>
                                <td className="value">{AgentData.DOB}</td>
                            </tr>
                            <tr>
                                <td>Adharno</td>
                                <td className="value">{AgentData.Adharno}</td>
                            </tr>
                            <tr>
                                <td>Username</td>
                                <td className="value">{AgentData.Username}</td>
                            </tr>
                            <tr>
                                <td>password</td>
                                <td className="value">{AgentData.Pass}</td>
                            </tr>
                        </tbody>
                    </table>


                    <div className="buttons">
                        <div className="button">
                            <button className="assign" onClick={() => {
                                setAssigning(true);
                            }}>+ Assign</button>
                        </div>
                        <div className="button">
                            <button className="pending_button" onClick={() => {
                                setShowPending(true);
                                setShowDone(false);
                            }}>Show pending</button>
                        </div>
                        <div className="button">
                            <button className="done_button" onClick={() => {
                                setShowDone(true);
                                setShowPending(false);
                            }}>Show verified</button>
                        </div>
                    </div>
                </div>

                <div className="work">
                    {showDone && <div className="done">
                        <p className="heading">verified work</p>
                        <div className={"content" + ((doneLoading || (done && done.length === 0)) ? " center" : "")}>
                            {doneLoading && <p>Loading...</p>}
                            {(!doneLoading && done && done.length > 0) && (done.map((client, i) => {
                                return <ClientCard
                                    client={client}
                                    handleForm={handleForm}
                                    delete_form={delete_verified_form}
                                    index={i}
                                    key={client._id}
                                />
                            }))}
                            {(!doneLoading && done && done.length === 0) && <p>No data</p>}
                        </div>
                    </div>}
                    {showPending && <div className="pending">
                        <p className="heading">Pending work</p>
                        <div className={"content" + ((pendingLoading || (pending && pending.length === 0)) ? " center" : "")}>
                            {pendingLoading && <p>Loading...</p>}
                            {(!pendingLoading && pending && pending.length > 0) && (pending.map((client, i) => {
                                return <ClientCard
                                    client={client}
                                    handleForm={handleForm}
                                    delete_form={delete_pending_form}
                                    index={i}
                                    key={client._id}
                                />
                            }))}
                            {(!pendingLoading && pending && pending.length === 0) && <p>No data</p>}
                        </div>
                    </div>}
                </div>
            </div>)}

            {assigning && <Assign handleupdateAgentPendingWork={updateAgentPendingWork} AgentDetail={setAgent} />}
            {(!assigning && form) && <Form Selectedclient={form} />}

            {isDeleting && <Deleting />}

        </div>
    );
}

export default Agent;