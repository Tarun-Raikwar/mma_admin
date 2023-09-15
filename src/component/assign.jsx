import { useEffect, useState } from "react";
import "./assign.css"

const Assign = ({ handleupdateAgentPendingWork, AgentDetail }) => {

    const [isAllFilled, setIsAllFilled] = useState(true);
    const [assigning, setAssigning] = useState(false);
    const [assigned, setAssigned] = useState(false);
    const [error, setError] = useState(false);

    const [fData, setFData] = useState({
        name: "",
        dob: "",
        address: "",
        age: "",
        fi_type: "",
        case_no: "",

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
        image: null
    });

    useEffect(() => {
        setFData({
            name: "",
            dob: "",
            address: "",
            age: "",
            fi_type: "",
            case_no: "",
    
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
    
            tpcOne: "",
            tpcTwo: "",
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
        })
    }, [AgentDetail]);

    const submit = () => {
        if (fData.name === "" || fData.fi_type === "" || fData.case_no === "" || fData.address === "") {
            setIsAllFilled(false);

        }
        else {
            setAssigning(true);
            console.log("submit");
            fetch("https://mma-server.onrender.com/submitForm", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({Credentials: {username: sessionStorage.getItem('username'), password: sessionStorage.getItem('password')}, data : [fData]})
            })
                .then(res => res.json())
                .then(data_res => {
                    // console.log(data_res[0]);
                    // console.log(data_res);
                    if (data_res.status === "true") {
                        const PendingWork = [...AgentDetail.Pending, data_res.data[0]._id];

                        fetch("https://mma-server.onrender.com/updateAgent", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(
                                {Credentials: {username: sessionStorage.getItem('username'), password: sessionStorage.getItem('password')}, data : { agentId: { _id: AgentDetail._id }, update: { Pending: PendingWork } }})
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
                    else {
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

    return (
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
                        setFData({ ...fData, name: e.target.value });
                        setIsAllFilled(true);
                    }}
                />
                <input
                    type="text"
                    placeholder="Address"
                    value={fData.address}
                    onChange={(e) => {
                        setFData({ ...fData, address: e.target.value });
                        setIsAllFilled(true);
                    }}
                />
                <input
                    type="text"
                    placeholder="FI Type"
                    value={fData.fi_type}
                    onChange={(e) => {
                        setFData({ ...fData, fi_type: e.target.value });
                        setIsAllFilled(true);
                    }}
                />
                <input
                    type="text"
                    placeholder="case no"
                    value={fData.case_no}
                    onChange={(e) => {
                        setFData({ ...fData, case_no: e.target.value });
                        setIsAllFilled(true);
                    }}
                />
            </div>

            <button className="Assign_button" onClick={submit}>Assign</button>
        </div>
    );
}

export default Assign;