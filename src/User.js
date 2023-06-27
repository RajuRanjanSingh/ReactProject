import React, { useState,useEffect} from 'react';
import axios from 'axios';
import './User.css';
function LeaveForm() {
    const [name, setName] = useState('');
    const [leaveType, setLeaveType] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [team, setTeam] = useState('');
    const [file, setFile] = useState(null);
    const [reporter, setReporter] = useState('');
    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        fetchEmployees();
      }, []);
    
      const fetchEmployees = async () => {
        try {
          const response = await axios.get('http://localhost:4747/get');
          setEmployees(response.data.data);
        } catch (error) {
          console.error('Error fetching employees:', error);
        }
      };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleLeaveTypeChange = (e) => {
        setLeaveType(e.target.value);
    };

    const handleFromDateChange = (e) => {
        setFromDate(e.target.value);
    };

    const handleToDateChange = (e) => {
        setToDate(e.target.value);
    };

    const handleTeamChange = (e) => {
        setTeam(e.target.value);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleReporterChange = (e) => {
        setReporter(e.target.value);
    };

    const handleSubmit =async(e) => {
        e.preventDefault();
    
       

        // Additional validation for file upload
        if (leaveType === 'Sick Leave' && (!file || file.size > 15 * 1024 * 1024 || !file.type.includes('pdf') )) {
            console.log('Please upload a valid PDF file (max size: 15MB)');
            return;
        }

        // Perform form submission logic
        console.log('Name:', name);
        console.log('Leave Type:', leaveType);
        console.log('From Date:', fromDate);
        console.log('To Date:', toDate);
        console.log('Team:', team);
        console.log('File:', file);
        console.log('Reporter:', reporter);
       
        const formData = new FormData();
        formData.append('name', name);
        formData.append('leave_type', leaveType);
        formData.append('fromdate', fromDate);
        formData.append('todate', toDate);
        formData.append('team_name', team);
        formData.append('file_upload', file);
        formData.append('reporter', reporter);
        

       
        let fileData = null;
        if (file) {
          // Read the file content
          const reader = new FileReader();
          fileData = await new Promise((resolve) => {
            reader.onloadend = () => resolve(reader.result);
            reader.readAsArrayBuffer(file);
          });
        }
      
        const byteCharacters = new Uint8Array(fileData);
        const byteNumbers = Array.from(byteCharacters);
        const byteString = byteNumbers.join(',');
        const requestData = {
            name,
            leave_type: leaveType,
            fromdate: fromDate,
            todate: toDate,
            team_name: team,
            file_upload: byteString,
            reporter,
          };
    
        

        try {
          // Make a POST api 
         const response = await axios.post('http://localhost:4747/post', requestData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Form submitted successfully:', response.data.message);
          // Reset the fill value
          setName('');
          setLeaveType('');
          setFromDate('');
          setToDate('');
          setTeam('');
          setFile(null);
          setReporter('');
    
      
        } catch (error) {
          console.error('Error submitting form:', error);
        }
      };
    

    return (
        <form onSubmit={handleSubmit} className="leave-form"> 

           <h2 id="header">Leave Form</h2>
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" value={name} onChange={handleNameChange} required />
            </div>
            <div>
                <label>Leave_Type:</label>
                <div>
                    <label htmlFor="casualLeave">
                    <input type="radio" id="casualLeave" value="casualleave" checked={leaveType === 'casualleave'} onChange={handleLeaveTypeChange} /> casualleave </label>
                </div>
                <div>
                    <label htmlFor="earnedLeave">
                    <input type="radio" id="earnedLeave" value="earnedleave" checked={leaveType === 'earnedleave'} onChange={handleLeaveTypeChange} />earnedleave</label>
                </div>
                <div>
                    <label htmlFor="sickLeave">
                    <input type="radio" id="sickLeave" value="sickleave" checked={leaveType === 'sickleave'} onChange={handleLeaveTypeChange} />sickleave</label>
                </div>
            </div>
                <div>
                    <label htmlFor="fromDate">From:</label>
                    <input type="date" id="fromDate" value={fromDate} onChange={handleFromDateChange} required />
                </div>
            <div>
                    <label htmlFor="toDate">To:</label>
                    <input type="date" id="toDate" value={toDate} onChange={handleToDateChange} required />
            </div>
            <div>
                    <label>Team_Name:</label>
                <div>
                    <label htmlFor="team_name1">
                    <input type="radio" id="team_name1" value="Designops" checked={team === 'Designops'} onChange={handleTeamChange} />Designops
                    </label>
                </div>
                <div>
                    <label htmlFor="team_name2">
                        <input type="radio" id="team_name2" value="Secops" checked={team === 'Secops'} onChange={handleTeamChange} />Secops
                    </label>
                </div>
                <div>
                    <label htmlFor="team_name3">
                    <input type="radio" id="team_name3" value="cloudops" checked={team === 'cloudops'}onChange={handleTeamChange} /> cloudops
                    </label>
                </div>
            </div>
            {leaveType === 'sickleave' && (
                <div>
                    <label htmlFor="file">File (PDF, max size: 15MB):</label>
                    <input type="file" id="file" accept=".pdf" onChange={handleFileChange} required />
                </div>
            )}
            <div>
                <label htmlFor="reporter">Reporter:</label>
                <select id="reporter" value={reporter} onChange={handleReporterChange} required>
                    <option value="">Select Manager</option>
                    <option value="Sandeep sir">Sandeep sir</option>
                    <option value="Suraj sir">Suraj sir</option>
                    <option value="Sahil sir">Sahil sir</option>
                </select>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}

export default LeaveForm;
