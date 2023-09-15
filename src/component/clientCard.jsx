import "./clientCard.css";

const ClientCard = ({ client, handleForm, delete_form, index, isPending }) => {

    const delete_client = () => {
        delete_form(index);
    }

    return (
        <div className="client" >
            <div 
                className="table"
                onClick={() => {
                    handleForm(client);
                }}
            >
                <table>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>{client.name}</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>{client.address}</td>
                        </tr>
                        <tr>
                            <td>Case no</td>
                            <td>{client.case_no}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div className="delete_image">
                <img onClick={delete_client} src="https://www.svgrepo.com/show/21045/delete-button.svg" alt="error" />
            </div>
        </div>
    );
}

export default ClientCard;