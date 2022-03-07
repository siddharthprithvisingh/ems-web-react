import {useState, useEffect} from "react" ;
import {useNavigate, useParams, Link} from "react-router-dom" ;
import api from "../api/emsapi";

function DeleteEmployee() {
    const [employee,setEmployee] = useState({
        uuId: String,
        employeeNo: Number,
        employeeName: String,
        dateOfJoining: Date,
        departmentCode: String,
        salary:Number
    });

    const {uuId,employeeNo,employeeName,dateOfJoining,departmentCode,salary} = employee ;

    let navigate = useNavigate() ; 

    const {id} = useParams() ;

    const onInputChange = (e) => {
        setEmployee({...employee,[e.target.name]:e.target.value}) ;
    };

    useEffect(()=>{
        loadEmployee() ;
    },[]);

    const onSubmit = async e => {
        e.preventDefault() ;
        await api.delete(`/employee/${id}`,employee) ;
        navigate("/") ;
    }

    const loadEmployee = async() => {
        const response = await api.get(`/employee/${id}`) ;
        setEmployee(response.data.data) ;
    };

    return (
        <form onSubmit={e => onSubmit(e)} className="container">
            <br/>
            <h2 className="text-center">Delete New Employee (ID: {uuId})</h2>
            <div className="form-group">
                <label htmlFor="employeeNo">Employee No.<span style={{color:"red"}}>*</span></label>
                <input type="number" minLength="1" maxLength="10" className="form-control" id="employeeNo" name="employeeNo" disabled="disabled" value={employeeNo} onChange={e => onInputChange(e)}/>
                <small id="employeeNoHelp" className="form-text text-muted">Employee Number Required</small>
            </div>
            <div className="form-group">
                <label htmlFor="employeeName">Employee Name<span style={{color:"red"}}>*</span></label>
                <input type="text" minLength="1" maxLength="100" className="form-control" id="employeeName" name="employeeName" disabled="disabled" value={employeeName} onChange={e => onInputChange(e)}/>
                <small id="employeeNameHelp" className="form-text text-muted">Employee Name Required</small>
            </div>
            <div className="form-group">
                <label htmlFor="dateOfJoining">Date Of Joining<span style={{color:"red"}}>*</span></label>
                <input type="date" minLength="10" maxLength="10" className="form-control" id="dateOfJoining" name="dateOfJoining" disabled="disabled" value={dateOfJoining} onChange={e => onInputChange(e)}/>
                <small id="dateOfJoiningHelp" className="form-text text-muted">Joining Date Required</small>
            </div>
            <div className="form-group">
                <label htmlFor="departmentCode">Department<span style={{color:"red"}}>*</span></label>
                <select id="departmentCode" name="departmentCode" className="form-control" value={departmentCode} onChange={e => onInputChange(e)} disabled="disabled">
                    <option value="AD">Administration</option>
                    <option value="IT">Information Technology</option>
                    <option value="HD">Help Desk</option>
                    <option value="HR">Human Resource</option>
                    <option value="OP">Operation</option>
                </select>
                <small id="departmentCodeHelp" className="form-text text-muted">Department Required</small>
            </div>
            <div className="form-group">
                <label htmlFor="salary">Salary<span style={{color:"red"}}>*</span></label>
                <input type="number" minLength="1" maxLength="10" className="form-control" id="salary" name="salary" disabled="disabled" value={salary} onChange={e => onInputChange(e)}/>
                <small id="salaryHelp" className="form-text text-muted">Salary Required</small>
            </div>
            <button type="submit" className="btn btn-danger" style={{marginRight:"5px"}}>Delete Now</button>
            <Link to="/" className="btn btn-warning btn-sm">Back</Link>
        </form>
    );
}

export default DeleteEmployee;