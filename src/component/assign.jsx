import { useEffect, useState } from "react";
import "./assign.css"

const Assign = ({ handleupdateAgentPendingWork, AgentDetail }) => {

    const [isAllFilled, setIsAllFilled] = useState(true);
    const [assigning, setAssigning] = useState(false);
    const [assigned, setAssigned] = useState(false);
    const [error, setError] = useState(false);

    const [fData, setFData] = useState({
        name: "",
        address: "",
        fi_type: "",
        case_no: "",
    });

    useEffect(() => {
        setFData({
            name: "",
            dob: "",
            address: "",
            age: "",
            fi_type: "",
            case_no: "",
        })
    }, [AgentDetail]);

    const submit = () => {
        if(fData.name === "" || fData.fi_type === "" || fData.case_no === "" || fData.address === "" || fData.dob === "" || fData.age === ""){
            setIsAllFilled(false);
        }
        else{
            setAssigning(true);
            console.log("submit");
            fetch("https://mma-server.onrender.com/submitForm", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(fData)
            })
            .then(res => res.json())
            .then(data_res => {
                console.log(data_res);
                if(data_res.status === true){
                    const PendingWork = [...AgentDetail.Pending, data_res.id];
    
                    fetch("https://mma-server.onrender.com/updateAgent", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({agentId: AgentDetail._id, update: {Pending: PendingWork}})
                    })
                    .then(res => res.json())
                    .then(res => {
                        console.log(res);
                        setAssigning(false);
                        setAssigned(true);
                        handleupdateAgentPendingWork(PendingWork);
                    })
                    .catch(err => {
                        console.log(err);
                        setAssigning(false);
                        setError(true);
                    })
                }
                else{
                    setAssigning(false);
                    setError(true);
                    console.log("not saved in data base");
                }
            })
            .catch(err => {
                console.log(err);
                setAssigning(false);
                setError(true);
            })
        }
    }

    return(
        <div className="Assigning">
            <p className="heading">Assign work</p>

            {assigning && <p className="message assigning">Assigning...</p>}
            {assigned && <p className="message assigned">Successfully assign</p>}
            {error && <p className="message error">Server error</p>}
            {!isAllFilled && <p className="message error">All fields are mandatory</p>}

            <div className="AssignForm">
                <input 
                    type="text" 
                    placeholder="Name"
                    value={fData.name}
                    onChange={(e) => {
                        setFData({...fData, name: e.target.value});
                        setIsAllFilled(true);
                    }}
                />
                <input 
                    type="text" 
                    placeholder="Address"
                    value={fData.address}
                    onChange={(e) => {
                        setFData({...fData, address: e.target.value});
                        setIsAllFilled(true);
                    }}    
                />
                <input 
                    type="text" 
                    placeholder="FI Type"
                    value={fData.fi_type}
                    onChange={(e) => {
                        setFData({...fData, fi_type: e.target.value});
                        setIsAllFilled(true);
                    }}    
                />
                <input 
                    type="text" 
                    placeholder="case no"
                    value={fData.case_no}
                    onChange={(e) => {
                        setFData({...fData, case_no: e.target.value});
                        setIsAllFilled(true);
                    }}    
                />
            </div>

            <button className="Assign_button" onClick={submit}>Assign</button>
        </div>
    );
}

export default Assign;