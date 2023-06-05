import "./clientCard.css";

const ClientCard = ({client, handleForm}) => {
    return(
        <div className="client" onClick={() => {
            handleForm(client);
        }}>
            <table>
                <tr>
                    <td>Name</td>
                    <td>{client.name}</td>
                </tr>
                <tr>
                    <td>Address</td>
                    <td>{client.address}</td>
                </tr>
                <tr>
                    <td>Age</td>
                    <td>{client.age}</td>
                </tr>
            </table>
        </div>
    );
}

export default ClientCard;