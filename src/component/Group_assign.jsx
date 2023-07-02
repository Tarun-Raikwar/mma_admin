import { useState } from "react";
import "./Group_assign.css"
import * as XLSX from "xlsx";

const GroupAssign = ({ handleGroupAssign, AgentData }) => {

    console.log(AgentData);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    let groupAssigncount = 0;

    const handleFileUpload = (e) => {
        const reader = new FileReader();
        reader.readAsBinaryString(e.target.files[0]);

        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(sheet);
            setData(parsedData);
        };
    }


    const submit = () => {

        setLoading(true);

        const newData = data.map((client) => {
            return {
                name: client["Customer Name"],
                dob: "",
                address: client["Customer Address"],
                age: "",
                fi_type: client["FE Name"],
                case_no: client["Loan Number"],

                IsAddressSame: "",
                PersonMetName: "",
                RelationWithApplicant: "",
                ProvideAddressIfChanged: "",

                Family_income: "",
                Previous_occupation: "",
                Occupation: "",
                residence: "",
                Residence_owned_by: "",
                Rent_amount_if_rented: "",
                Name_of_landlord_if_rented: "",
                Tenure_of_stay: "",

                Name_plate_seen: "",
                Name_mentioned_on_plate: "",
                Floor_number: "",
                Color_of_building: "",

                FamilyCount: "",
                MartialStatus: "",
                TypeOfFamily: "",
                dependentCount: "",

                Id_proof: "",
                Type_of_house: "",
                Locality_type: "",
                Furnishing_of_house: "",
                Area_approx: "",

                Asset_seen: "",

                tpc: "",
                nieghbour_additional_detail: "",

                Type_of_veichel: "",
                Value_of_veichel: "",
                Manufacturer_name: "",
                Model: "",

                Previous_visit: "",

                Status_of_verifier: "",
                Verifier_notes: "",

                Status: "",
                date: "",
                remarks: "",
                image: null
            }
        })

        console.log(newData);

        fetch("https://mma-server.onrender.com/submitForm", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({Credentials: {username: sessionStorage.getItem('username'), password: sessionStorage.getItem('password')}, data : newData})
        })
        .then(res => res.json())
        .then(res => {
            let updatedPendingWork = {};
            res.data.map((client, i) => {
                updatedPendingWork[data[i]["Agent"]] = AgentData[data[i]["Agent"]];
                return 0;
            })
            res.data.map((client, i) => {
                updatedPendingWork[data[i]["Agent"]] = [...updatedPendingWork[data[i]["Agent"]], client._id]
                return 0;
            })

            if(res.status === "true"){
                Object.keys(updatedPendingWork).map((key) => {
                    fetch("https://mma-server.onrender.com/updateAgent", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(
                            {Credentials: {username: sessionStorage.getItem('username'), password: sessionStorage.getItem('password')}, data : {agentId: {Username: key}, update: { Pending: updatedPendingWork[key] }}})
                    })
                    .then(res1 => res1.json())
                    .then(res1 => {
                        groupAssigncount = groupAssigncount + 1;
                        if(groupAssigncount === Object.keys(updatedPendingWork).length){
                            groupAssigncount = 0;
                            setLoading(false);
                            setSubmitted(true);
                            window.location.reload();
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        setLoading(false);
                        setError(true);
                    });

                    return 0;
                })
            }
            else{
                console.log("server error");
                setLoading(false);
                setError(true);
            }
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
            setError(true);
        })
    }

    return (
        <div className="group_assign_continer">
            <div className="group_assign">
                <div className="close_icon">
                    <img
                        src="https://img.uxwing.com/wp-content/themes/uxwing/download/checkmark-cross/close-line-icon.svg"
                        alt="Error"
                        onClick={() => handleGroupAssign()}
                    />
                </div>

                <div className="group_assign_body">
                    <input
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={handleFileUpload}
                    />

                    {data && (
                        <table>
                            <thead>
                                <tr>
                                    {Object.keys(data[0]).map((key) => (
                                        <th key={key} className="cell">{key}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, index1) => (
                                    <tr key={index1}>
                                        {Object.values(row).map((value, index2) => (
                                            <td key={index2} className="cell">{value}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {(loading || error || submitted) && <div className="multiple_assign_message">
                        {loading && <p  className="loading">Loading</p>}
                        {error && <p className="error">Error</p>}
                        {submitted && <p className="success">Successfully assigned</p>}
                    </div>}

                    {data && (
                        <button 
                            className="Assign_to_all"
                            onClick={submit}
                        >
                            Assign
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default GroupAssign;