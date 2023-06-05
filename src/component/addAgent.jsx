import { useState } from "react";
import "./addAgent.css"

const Addagent = () => {

    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [isAllFilled, setIsAllFilled] = useState(false);
    const [isPassSame, setIsPassSame] = useState(false);
    const [data, setData] = useState({
        Name: "",
        DOB: "",
        AdharNo: "",
        UserName: "",
        Pass: "",
        ConfirmPass: ""
    })

    const submit = () => {
        if (data.Name === "" || data.DOB === "" || data.AdharNo === "" || data.Pass === "" || data.ConfirmPass === "") {
            setIsAllFilled(true);
        }
        else if (data.Pass !== data.ConfirmPass) {
            setIsPassSame(true);
        }
        else {
            setSubmitting(true);
            console.log(data.Name);
            fetch("https://mma-server.onrender.com/CreateFieldAgentAccount", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setSubmitting(false);
                    setSubmitted(true);
                    setData({
                        Name: "",
                        DOB: "",
                        AdharNo: "",
                        UserName: "",
                        Pass: "",
                        ConfirmPass: ""
                    });
                })
                .catch(err => {
                    console.log(err);
                    setSubmitting(false);
                    setError(true);
                })
        }
    }


    return (
        <div className="Addagent_container">
            {submitting && <p className="submitting">Please wait...</p>}
            {submitted && <p className="submitted">Successfully submitted</p>}
            {error && <p className="Add_error">Error</p>}
            {isAllFilled && <p className="Add_error">All fields are mandatory</p>}
            {isPassSame && <p className="Add_error">Password doesn't match</p>}
            <p>Add new agent</p>
            <div className="Addagent">
                <fieldset>
                    <legend>Name</legend>
                    <input
                        type="text"
                        value={data.Name}
                        onChange={(e) => {
                            setData({ ...data, Name: e.target.value });
                            setIsAllFilled(false);
                        }}
                    />
                </fieldset>
                <fieldset>
                    <legend>DOB</legend>
                    <input
                        type="date"
                        value={data.DOB}
                        onChange={(e) => {
                            setData({ ...data, DOB: e.target.value });
                            setIsAllFilled(false);
                        }}
                    />
                </fieldset>
                <fieldset>
                    <legend>Adhar no</legend>
                    <input
                        type="number"
                        value={data.AdharNo}
                        onChange={(e) => {
                            setData({ ...data, AdharNo: e.target.value });
                            setIsAllFilled(false);
                        }}
                    />
                </fieldset>
                <fieldset>
                    <legend>Username</legend>
                    <input
                        type="text"
                        value={data.UserName}
                        onChange={(e) => {
                            setData({ ...data, UserName: e.target.value });
                            setIsAllFilled(false);
                        }}
                    />
                </fieldset>
                <fieldset>
                    <legend>Password</legend>
                    <input
                        type="text"
                        value={data.Pass}
                        onChange={(e) => {
                            setData({ ...data, Pass: e.target.value });
                            setIsAllFilled(false);
                            setIsPassSame(false);
                        }}
                    />
                </fieldset>
                <fieldset>
                    <legend>Confirm Password</legend>
                    <input
                        type="text"
                        value={data.ConfirmPass}
                        onChange={(e) => {
                            setData({ ...data, ConfirmPass: e.target.value });
                            setIsAllFilled(false);
                            setIsPassSame(false);
                        }}
                    />
                </fieldset>

                <div className="button_Addagent">
                    <button onClick={submit}>Add agent</button>
                </div>
            </div>
        </div>
    );
}

export default Addagent;