import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from './navbar';
import FieldAgent from './fieldAgent';
import Agent from './Agent';
import "./Home.css"

function Home() {

  const [currentAgent, setCurrentAgent] = useState(null);
  const [currupadateAgent, setCurrUpdateAgent] = useState(null);

  const CurrentAgentShownApp = (currentAgentData) => {
    setCurrentAgent(currentAgentData);
  }

  const UpdateAgent = (updatedAgent) => {
    setCurrentAgent(updatedAgent);
    setCurrUpdateAgent(updatedAgent);
  }

  const[AgentData, setAgentdata] = useState({});
  const handleSetagentdata = (data) => {
      let newData = {};
      data.map((client) => {
        newData[client.Username] = client.Pending;
        return 0;
      });
      setAgentdata(newData);
  }

  if(!sessionStorage.getItem('username') || !sessionStorage.getItem('password')){
    return <Navigate replace to="/login"/>
  }

  return (
    <div className='Body'>
      <Navbar 
        Agentdata={AgentData}
      />
      <div className='mainBody'>
        <FieldAgent 
          setCurrupdatedAgent={currupadateAgent} 
          handleCurrentAgentShownApp={CurrentAgentShownApp}
          handleSetagentdata={handleSetagentdata}
        />
        {currentAgent ? <Agent handleUpdateAgent={UpdateAgent} setAgent={currentAgent}/>: (
          <div className="selectAgent">
            <p>Select agent</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;