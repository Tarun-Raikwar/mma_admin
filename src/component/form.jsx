import "./form.css"
import React from "react";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import image from "./logo.png";


const Form = ({ Selectedclient }) => {

    const [client, setClient] = useState(null);
    const [update, setUpdate] = useState({});
    const [editting, setEditting] = useState(false);
    const [editted, setEditted] = useState(false);
    const [error, setError] = useState(false);
    console.log(Selectedclient);

    useEffect(() => {
        setClient(Selectedclient);
        setUpdate({});
        setEditted(false);
        setEditting(false);
        setError(false)
    }, [Selectedclient]);


    const edit = () => {
        setEditting(true);
        setEditted(false);
        setError(false);
        fetch("https://mma-server.onrender.com/updateData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {Credentials: {username: sessionStorage.getItem('username'), password: sessionStorage.getItem('password')}, data : { id: client._id, update }})
        })
            .then(res => res.json())
            .then(data => {
                setEditted(true);
                setEditting(false);
            })
            .catch(err => {
                setError(true);
                setEditting(false);
            })
    }

    const item = Selectedclient;

    class ComponentToPrint extends React.Component {
        render() {
            return (
                <div className="pdf">
                    <div className="pdf_heading">
                        <img src={image} alt="" />
                        <p>Master Management Associate</p>
                    </div>

                    <p className="section_heading">Basic details</p>
                    <table>
                        <tr>
                            <td>Name</td>
                            <td>{item.name}</td>
                        </tr>
                        {/* <tr>
                            <td>DOB</td>
                            <td>{item.dob}</td>
                        </tr> */}
                        <tr>
                            <td>Address</td>
                            <td>{item.address}</td>
                        </tr>
                        {/* <tr>
                            <td>Age</td>
                            <td>{item.age}</td>
                        </tr> */}
                        <tr>
                            <td>FI Type</td>
                            <td>{item.fi_type}</td>
                        </tr>
                        <tr>
                            <td>Case number</td>
                            <td>{item.case_no}</td>
                        </tr>
                    </table>

                    <p className="section_heading">Applicants's information obtained by person met</p>
                    <table>
                        <tr>
                            <td>Addres Found same as given detail</td>
                            <td>{item.IsAddressSame}</td>
                        </tr>
                        <tr>
                            <td>Name of person met</td>
                            <td>{item.PersonMetName}</td>
                        </tr>
                        <tr>
                            <td>Relation with applicant</td>
                            <td>{item.RelationWithApplicant}</td>
                        </tr>
                        {item.IsAddressSame === "No" && <tr>
                            <td>Provide adrres if changed</td>
                            <td>{item.ProvideAddressIfChanged}</td>
                        </tr>}
                    </table>


                    <p className="section_heading">Customer additional detail</p>
                    <table>
                        <tr>
                            <td>Self or family imcome monthly</td>
                            <td>{item.Family_income}</td>
                        </tr>
                        <tr>
                            <td>Privious Occupation</td>
                            <td>{item.Previous_occupation}</td>
                        </tr>
                        <tr>
                            <td>Occupation</td>
                            <td>{item.Occupation}</td>
                        </tr>
                        <tr>
                            <td>Residence</td>
                            <td>{item.residence}</td>
                        </tr>
                        {item.residence === "relative" && <tr>
                            <td>Residence owned by</td>
                            <td>{item.Residence_owned_by}</td>
                        </tr>}
                        {item.residence === "rented" && <tr>
                            <td>Rent amount if rented</td>
                            <td>{item.Rent_amount_if_rented}</td>
                        </tr>}
                        {item.residence === "rented" && <tr>
                            <td>Name of landloard if rented</td>
                            <td>{item.Residence_owned_by}</td>
                        </tr>}
                        <tr>
                            <td>Tenure of stay</td>
                            <td>{item.Tenure_of_stay}</td>
                        </tr>
                    </table>

                    <p className="section_heading">Applicant family detail</p>
                    <table>
                        <tr>
                            <td>Number of family members</td>
                            <td>{item.FamilyCount}</td>
                        </tr>
                        <tr>
                            <td>Maritial status</td>
                            <td>{item.MartialStatus}</td>
                        </tr>
                        <tr>
                            <td>Type of family</td>
                            <td>{item.TypeOfFamily}</td>
                        </tr>
                        <tr>
                            <td>Number of dependent</td>
                            <td>{item.dependentCount}</td>
                        </tr>
                    </table>

                    <p className="section_heading">Verifier observation</p>
                    <table>
                        <tr>
                            <td>Name plate seen</td>
                            <td>{item.Name_plate_seen}</td>
                        </tr>
                        {item.Name_plate_seen === "Yes" &&
                        <tr>
                            <td>Name mentioned on plate</td>
                            <td>{item.Name_mentioned_on_plate}</td>
                        </tr>
                        }
                        <tr>
                            <td>Floor number</td>
                            <td>{item.Floor_number}</td>
                        </tr>
                        <tr>
                            <td>Color of building</td>
                            <td>{item.Color_of_building}</td>
                        </tr>
                    </table>

                    <p className="section_heading">Details of address and id proof</p>
                    <table>
                        <tr>
                            <td>ID proof</td>
                            <td>{item.Id_proof}</td>
                        </tr>
                        <tr>
                            <td>Type of house</td>
                            <td>{item.Type_of_house}</td>
                        </tr>
                        <tr>
                            <td>Lacality type</td>
                            <td>{item.Locality_type}</td>
                        </tr>
                        <tr>
                            <td>Furnishing of house</td>
                            <td>{item.Furnishing_of_house}</td>
                        </tr>
                        <tr>
                            <td>Area approx</td>
                            <td>{item.Area_approx}</td>
                        </tr>
                    </table>

                    <p className="section_heading">Asset seen</p>
                    <table>
                        <tr>
                            <td>Asset seen</td>
                            <td>{item.Asset_seen}</td>
                        </tr>
                    </table>

                    <p className="section_heading">Neighbour Verification</p>
                    <table>
                        <tr>
                            <td>TPC 1</td>
                            <td>{item.tpcOne}</td>
                        </tr>
                        <tr>
                            <td>TPC 2</td>
                            <td>{item.tpcTwo}</td>
                        </tr>
                    </table>

                    <p className="section_heading">Veichel details</p>
                    <table>
                        <tr>
                            <td>Type of veichel</td>
                            <td>{item.Type_of_veichel}</td>
                        </tr>
                        <tr>
                            <td>vaue of viechel</td>
                            <td>{item.Value_of_veichel}</td>
                        </tr>
                        <tr>
                            <td>Manufacturer</td>
                            <td>{item.Manufacturer_name}</td>
                        </tr>
                        <tr>
                            <td>Model</td>
                            <td>{item.Model}</td>
                        </tr>
                    </table>

                    <p className="section_heading">Previous visit remarks</p>
                    <table>
                        <tr>
                            <td>Previous visit done on this address</td>
                            <td>{item.Previous_visit}</td>
                        </tr>
                    </table>

                    <p className="section_heading">Additional information</p>
                    <table>
                        <tr>
                            <td>Status of verifier</td>
                            <td>{item.Status_of_verifier}</td>
                        </tr>
                        <tr>
                            <td>Verifier notes</td>
                            <td>{item.Verifier_notes}</td>
                        </tr>
                    </table>

                    <p className="section_heading">Final status</p>
                    <table>
                        <tr>
                            <td>Status</td>
                            <td>{item.Status}</td>
                        </tr>
                    </table>

                    <p className="section_heading">Images</p>

                    <div className="pdf_images">
                        {item.image && item.image.map((image) => {
                            return <img src={"data:image/png;base64," + image} alt="" />
                        })}
                    </div>
                    
                    <div className="fill_details">
                        <p>Location coordinats : {item.location}</p>
                        <p>verification time : {item.date}</p>
                    </div>
                </div>
            )
        }
    }

    const componentRef = useRef();

    const download = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div className="form_container">

            <div className="pdf_container">
                <ComponentToPrint ref={componentRef} />
            </div>

            <div className="notification">
                {editting && <p className="editting">Please wait...</p>}
                {editted && <p className="editted">Successfully updated</p>}
                {error && <p className="error">Error</p>}
            </div>

            {/* **************** Basic details ******************** */}
            {client && (<div className="form">
                <p>Basic details</p>
                <fieldset>
                    <legend>Name</legend>
                    <input
                        type="text"
                        value={client.name}
                        onChange={(e) => {
                            setClient({ ...client, name: e.target.value });
                            setUpdate({ ...update, name: e.target.value })
                        }}
                    />
                </fieldset>
                <fieldset>
                    <legend>DOB</legend>
                    <input
                        type="text"
                        value={client.dob}
                        onChange={(e) => {
                            setClient({ ...client, dob: e.target.value });
                            setUpdate({ ...update, dob: e.target.value })
                        }}
                    />
                </fieldset>
                <fieldset>
                    <legend>Address</legend>
                    <input
                        type="text"
                        value={client.address}
                        onChange={(e) => {
                            setClient({ ...client, address: e.target.value });
                            setUpdate({ ...update, address: e.target.value })
                        }}
                    />
                </fieldset>
                <fieldset>
                    <legend>Age</legend>
                    <input
                        type="text"
                        value={client.age}
                        onChange={(e) => {
                            setClient({ ...client, age: e.target.value });
                            setUpdate({ ...update, age: e.target.value })
                        }}
                    />
                </fieldset>
                <fieldset>
                    <legend>FI Type</legend>
                    <input
                        type="text"
                        value={client.fi_type}
                        onChange={(e) => {
                            setClient({ ...client, fi_type: e.target.value });
                            setUpdate({ ...update, fi_type: e.target.value })
                        }}
                    />
                </fieldset>
                <fieldset>
                    <legend>Case no</legend>
                    <input
                        type="text"
                        value={client.case_no}
                        onChange={(e) => {
                            setClient({ ...client, case_no: e.target.value });
                            setUpdate({ ...update, case_no: e.target.value })
                        }}
                    />
                </fieldset>

                {/* **************** Applican't information obtained by person met ******************** */}
                <p>Applican't information obtained by person met</p>
                <fieldset>
                    <legend>Address found same as Given detail</legend>
                    <input
                        type="text"
                        value={client.IsAddressSame}
                        onChange={(e) => {
                            setClient({ ...client, IsAddressSame: e.target.value });
                            setUpdate({ ...update, IsAddressSame: e.target.value })
                        }}
                    />
                </fieldset>
                <fieldset>
                    <legend>Name of person met</legend>
                    <input
                        type="text"
                        value={client.PersonMetName}
                        onChange={(e) => {
                            setClient({ ...client, PersonMetName: e.target.value });
                            setUpdate({ ...update, PersonMetName: e.target.value })
                        }}
                    />
                </fieldset>
                <fieldset>
                    <legend>Relation with applicant</legend>
                    <input
                        type="text"
                        value={client.RelationWithApplicant}
                        onChange={(e) => {
                            setClient({ ...client, RelationWithApplicant: e.target.value });
                            setUpdate({ ...update, RelationWithApplicant: e.target.value })
                        }}
                    />
                </fieldset>
                {!client.IsAddressSame && <fieldset>
                    <legend>Provide address if Changed</legend>
                    <input
                        type="text"
                        value={client.ProvideAddressIfChanged}
                        onChange={(e) => {
                            setClient({ ...client, ProvideAddressIfChanged: e.target.value });
                            setUpdate({ ...update, ProvideAddressIfChanged: e.target.value })
                        }}
                    />
                </fieldset>}




                {/* **************** Customer addtional detail ******************** */}
                <p>Customer addtional detail</p>
                
                <fieldset>
                    <legend>Self or family income monthly</legend>
                    <input
                        type="text"
                        value={client.Family_income}
                        onChange={(e) => {
                            setClient({ ...client, Family_income: e.target.value });
                            setUpdate({ ...update, Family_income: e.target.value })
                        }}
                    />
                </fieldset>
                <fieldset>
                    <legend>Previous occupation</legend>
                    <input
                        type="text"
                        value={client.Previous_occupation}
                        onChange={(e) => {
                            setClient({ ...client, Previous_occupation: e.target.value });
                            setUpdate({ ...update, name: e.target.value })
                        }}
                    />
                </fieldset>

                <fieldset>
                    <legend>Occupation</legend>
                    <input
                        type="text"
                        value={client.Occupation}
                        onChange={(e) => {
                            setClient({ ...client, Occupation: e.target.value });
                            setUpdate({ ...update, Occupation: e.target.value });
                        }}
                    />
                </fieldset>

                <fieldset>
                    <legend>Residence</legend>
                    <input
                        type="text"
                        value={client.residence}
                        onChange={(e) => {
                            setClient({ ...client, residence: e.target.value });
                            setUpdate({ ...update, residence: e.target.value });
                        }}
                    />
                </fieldset>

                {client.residence !== "owened" && <fieldset>
                    <legend>Residence owned by</legend>
                    <input
                        type="text"
                        value={client.Residence_owned_by}
                        onChange={(e) => {
                            setClient({ ...client, Residence_owned_by: e.target.value });
                            setUpdate({ ...update, Residence_owned_by: e.target.value });
                        }}
                    />
                </fieldset>}
                {client.residence === "rented" && <fieldset>
                    <legend>Rent amount if rented</legend>
                    <input
                        type="text"
                        value={client.Rent_amount_if_rented}
                        onChange={(e) => {
                            setClient({ ...client, Rent_amount_if_rented: e.target.value });
                            setUpdate({ ...update, Rent_amount_if_rented: e.target.value });
                        }}
                    />
                </fieldset>}
                {client.residence === "rented" && <fieldset>
                    <legend>Name of landlord if rented</legend>
                    <input
                        type="text"
                        value={client.Name_of_landlord_if_rented}
                        onChange={(e) => {
                            setClient({ ...client, Name_of_landlord_if_rented: e.target.value });
                            setUpdate({ ...update, Name_of_landlord_if_rented: e.target.value });
                        }}
                    />
                </fieldset>}
                <fieldset>
                    <legend>Tenure of stay</legend>
                    <input
                        type="text"
                        value={client.Tenure_of_stay}
                        onChange={(e) => {
                            setClient({ ...client, Tenure_of_stay: e.target.value });
                            setUpdate({ ...update, Tenure_of_stay: e.target.value });
                        }}
                    />
                </fieldset>



                {/* **************** Applicant Family Detail ******************** */}
                <p>Applicant Family Detail</p>
                <fieldset>
                    <legend>Number of family members</legend>
                    <input
                        type="text"
                        value={client.FamilyCount}
                        onChange={(e) => {
                            setClient({ ...client, FamilyCount: e.target.value });
                            setUpdate({ ...update, FamilyCount: e.target.value });
                        }}
                    />
                </fieldset>
                <fieldset>
                    <legend>Maritial status</legend>
                    <input
                        type="text"
                        value={client.MartialStatus}
                        onChange={(e) => {
                            setClient({ ...client, MartialStatus: e.target.value });
                            setUpdate({ ...update, MartialStatus: e.target.value });
                        }}
                    />
                </fieldset>
                <fieldset>
                    <legend>Type of family</legend>
                    <input
                        type="text"
                        value={client.TypeOfFamily}
                        onChange={(e) => {
                            setClient({ ...client, TypeOfFamily: e.target.value });
                            setUpdate({ ...update, TypeOfFamily: e.target.value });
                        }}
                    />
                </fieldset>
                <fieldset>
                    <legend>Number of dependent</legend>
                    <input
                        type="text"
                        value={client.dependentCount}
                        onChange={(e) => {
                            setClient({ ...client, dependentCount: e.target.value });
                            setUpdate({ ...update, dependentCount: e.target.value });
                        }}
                    />
                </fieldset>



                {/* **************** verifier observation ******************** */}
                <p>verifier observation</p>
                <fieldset>
                    <legend>Name-plate seen</legend>
                    <input
                        type="text"
                        value={client.Name_plate_seen}
                        onChange={(e) => {
                            setClient({ ...client, Name_plate_seen: e.target.value });
                            setUpdate({ ...update, Name_plate_seen: e.target.value });
                        }}
                    />
                </fieldset>
                {client.Name_plate_seen === "Yes" && <fieldset>
                    <legend>Name mentioned on plate</legend>
                    <input
                        type="text"
                        value={client.Name_mentioned_on_plate}
                        onChange={(e) => {
                            setClient({ ...client, Name_mentioned_on_plate: e.target.value });
                            setUpdate({ ...update, Name_mentioned_on_plate: e.target.value });
                        }}
                    />
                </fieldset>}
                <fieldset>
                    <legend>Floor number</legend>
                    <input
                        type="text"
                        value={client.Floor_number}
                        onChange={(e) => {
                            setClient({ ...client, Floor_number: e.target.value });
                            setUpdate({ ...update, Floor_number: e.target.value });
                        }}
                    />
                </fieldset>
                <fieldset>
                    <legend>Color of building</legend>
                    <input
                        type="text"
                        value={client.Color_of_building}
                        onChange={(e) => {
                            setClient({ ...client, Color_of_building: e.target.value });
                            setUpdate({ ...update, Color_of_building: e.target.value });
                        }}
                    />
                </fieldset>




                {/* **************** Detail of ID and address proof ******************** */}
                <p>Detail of ID and address proof</p>
            
                <fieldset>
                    <legend>Id proof</legend>
                    <input
                        type="text"
                        value={client.Id_proof}
                        onChange={(e) => {
                            setClient({ ...client, Id_proof: e.target.value });
                            setUpdate({ ...update, Id_proof: e.target.value });
                        }}
                    />
                </fieldset>
                
                <fieldset>
                    <legend>Type of house</legend>
                    <input
                        type="text"
                        value={client.Type_of_house}
                        onChange={(e) => {
                            setClient({ ...client, Type_of_house: e.target.value });
                            setUpdate({ ...update, Type_of_house: e.target.value });
                        }}
                    />
                </fieldset>
        
                <fieldset>
                    <legend>Locality type</legend>
                    <input
                        type="text"
                        value={client.Locality_type}
                        onChange={(e) => {
                            setClient({ ...client, Locality_type: e.target.value });
                            setUpdate({ ...update, Locality_type: e.target.value });
                        }}
                    />
                </fieldset>
                <fieldset>
                    <legend>Furnishing of house</legend>
                    <input
                        type="text"
                        value={client.Furnishing_of_house}
                        onChange={(e) => {
                            setClient({ ...client, Furnishing_of_house: e.target.value });
                            setUpdate({ ...update, Furnishing_of_house: e.target.value });
                        }}
                    />
                </fieldset>
                <fieldset>
                    <legend>Area approx</legend>
                    <input
                        type="text"
                        value={client.Area_approx}
                        onChange={(e) => {
                            setClient({ ...client, Area_approx: e.target.value });
                            setUpdate({ ...update, Area_approx: e.target.value });
                        }}
                    />
                </fieldset>


                {/* **************** Asset seen ******************** */}
                <p>Asset seen</p>
                <fieldset>
                    <legend>Asset seen</legend>
                    <input
                        type="text"
                        value={client.Asset_seen}
                        onChange={(e) => {
                            setClient({ ...client, Asset_seen: e.target.value });
                            setUpdate({ ...update, Asset_seen: e.target.value });
                        }}
                    />
                </fieldset>



                {/* **************** Neighbour verification ******************** */}
                <p>Neighbour verification</p>
                <fieldset>
                    <legend>TPC 1</legend>
                    <input
                        type="text"
                        value={client.tpcOne}
                        onChange={(e) => {
                            setClient({ ...client, tpcOne: e.target.value });
                            setUpdate({ ...update, tpcOne: e.target.value });
                        }}
                    />
                </fieldset>
                
                <fieldset>
                <legend>TPC 2</legend>
                    <input
                        type="text"
                        value={client.tpcTwo}
                        onChange={(e) => {
                            setClient({ ...client, tpcTwo: e.target.value });
                            setUpdate({ ...update, tpcTwo: e.target.value });
                        }}
                    />
                </fieldset>




                {/* **************** veichel detail ******************** */}
                <p>veichel detail</p>
                <fieldset>
                    <legend>Type of veichel</legend>
                    <input
                        type="text"
                        value={client.Type_of_veichel}
                        onChange={(e) => {
                            setClient({ ...client, Type_of_veichel: e.target.value });
                            setUpdate({ ...update, Type_of_veichel: e.target.value });
                        }}
                    />
                </fieldset>
                <fieldset>
                    <legend>Value of veichel</legend>
                    <input
                        type="text"
                        value={client.Value_of_veichel}
                        onChange={(e) => {
                            setClient({ ...client, Value_of_veichel: e.target.value });
                            setUpdate({ ...update, Value_of_veichel: e.target.value });
                        }}
                    />
                </fieldset>
                <fieldset>
                    <legend>Manufacturer name</legend>
                    <input
                        type="text"
                        value={client.Manufacturer_name}
                        onChange={(e) => {
                            setClient({ ...client, Manufacturer_name: e.target.value });
                            setUpdate({ ...update, Manufacturer_name: e.target.value });
                        }}
                    />
                </fieldset>
                <fieldset>
                    <legend>Model</legend>
                    <input
                        type="text"
                        value={client.Model}
                        onChange={(e) => {
                            setClient({ ...client, Model: e.target.value });
                            setUpdate({ ...update, Model: e.target.value });
                        }}
                    />
                </fieldset>



                {/* **************** Previous visit remarks ******************** */}
                <p>Previous visit </p>
                
                <fieldset>
                    <legend>Previous visit</legend>
                    <input
                        type="text"
                        value={client.Previous_visit}
                        onChange={(e) => {
                            setClient({ ...client, Previous_visit: e.target.value });
                            setUpdate({ ...update, Previous_visit: e.target.value });
                        }}
                    />
                </fieldset>




                {/* **************** Additional information ******************** */}
                <p>Additional information</p>
                <fieldset>
                    <legend>Status of verifier</legend>
                    <input
                        type="text"
                        value={client.Status_of_verifier}
                        onChange={(e) => {
                            setClient({ ...client, Status_of_verifier: e.target.value });
                            setUpdate({ ...update, Status_of_verifier: e.target.value });
                        }}
                    />
                </fieldset>
                <fieldset>
                    <legend>Verifier notes</legend>
                    <input
                        type="text"
                        value={client.Verifier_notes}
                        onChange={(e) => {
                            setClient({ ...client, Verifier_notes: e.target.value });
                            setUpdate({ ...update, Verifier_notes: e.target.value });
                        }}
                    />
                </fieldset>



                {/* **************** Final status ******************** */}
                <p>Final status</p>
                <fieldset>
                    <legend>Status</legend>
                    <input
                        type="text"
                        value={client.Status}
                        onChange={(e) => {
                            setClient({ ...client, Status: e.target.value });
                            setUpdate({ ...update, Status: e.target.value });
                        }}
                    />
                </fieldset>
                <fieldset>
                    <legend>Remarks</legend>
                    <textarea
                        type="text"
                        value={client.remarks || ""}
                        onChange={(e) => {
                            setClient({ ...client, remarks: e.target.value });
                            setUpdate({ ...update, remarks: e.target.value });
                        }}
                    />
                </fieldset>

                <div className="images">
                    {client.image && client.image.map((image) => {
                        return <img className="image" src={"data:image/png;base64," + image} alt="" />
                    })}
                </div>

                <div className="button_form">
                    <button className="edit" onClick={edit}>Edit</button>
                    <button className="download" onClick={download}>Downlod</button>
                </div>
            </div>
            )}
        </div>
    );
}

export default Form;