import { useState } from "react";
import "./addAgent.css"

const Addagent = () => {

    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [isAllFilled, setIsAllFilled] = useState(false);
    const [data, setData] = useState({
        Name: "",
        DOB: "",
        AdharNo: "",
        UserName: "",
        Pass: ""
    })

    const submit = () => {
        if (data.Name === "" || data.DOB === "" || data.AdharNo === "" || data.Pass === "" || data.ConfirmPass === "") {
            setIsAllFilled(true);
        }
        else {
            setSubmitting(true);
            console.log(data.Name);
            fetch("https://mma-server.onrender.com/CreateFieldAgentAccount", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({Credentials: {username: sessionStorage.getItem('username'), password: sessionStorage.getItem('password')}, data : data})
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
        <div className="container">
            {/* <Navbar /> */}
            <div className="Addagent_container">
                {submitting && <p className="submitting message">Please wait...</p>}
                {submitted && <p className="submitted message">Successfully submitted</p>}
                {error && <p className="Add_error message">Error</p>}
                {isAllFilled && <p className="Add_error message">All fields are mandatory</p>}
                <div className="Addagent">
                    <p className="Heading">Add new agent</p>

                    <p className="input_type">Name</p>
                    <input
                        type="text"
                        value={data.Name}
                        onChange={(e) => {
                            setData({ ...data, Name: e.target.value });
                            setIsAllFilled(false);
                        }}
                    />

                    <p className="input_type">DOB</p>
                    <input
                        type="date"
                        value={data.DOB}
                        onChange={(e) => {
                            setData({ ...data, DOB: e.target.value });
                            setIsAllFilled(false);
                        }}
                    />

                    <p className="input_type">Adhar no</p>
                    <input
                        type="number"
                        value={data.AdharNo}
                        onChange={(e) => {
                            setData({ ...data, AdharNo: e.target.value });
                            setIsAllFilled(false);
                        }}
                    />

                    <p className="input_type">Username</p>
                    <input
                        type="text"
                        value={data.UserName}
                        onChange={(e) => {
                            setData({ ...data, UserName: e.target.value });
                            setIsAllFilled(false);
                        }}
                    />

                    <p className="input_type">Password</p>
                    <input
                        type="text"
                        value={data.Pass}
                        onChange={(e) => {
                            setData({ ...data, Pass: e.target.value });
                            setIsAllFilled(false);
                        }}
                    />


                    <div className="button_Addagent">
                        <button onClick={submit}>Add agent</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Addagent;