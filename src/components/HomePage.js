import { useState, useEffect } from "react";
import {Link, useParams} from "react-router-dom" ;
import api from "../api/emsapi";

function HomePage() {
    const [employees, setEmployeeData] = useState([]) ;

    const REFRESH_INTERVAL = 1000;

    let {searchType,searchTerm} = useParams() ;

    useEffect(() => {
        // const interval = setInterval(() => {
        //     loadEmployees() ;
        // }, REFRESH_INTERVAL);
        // return () => clearInterval(interval);
        loadEmployees() ;
    }, [])

    const loadEmployees = async() => {
        const response = await api.get("/employee/list") ;
        setEmployeeData(response.data.data) ;
    };

    const loadEmployeesBySearch = async() => {
        const response = await api.get(`/employee/search/${searchType}/${searchTerm}`) ;
        setEmployeeData(Array(response.data.data)) ;
    };

    const onSubmit = async (e,data) => {
        e.preventDefault() ;
        searchType = e.target.searchType.value ;
        searchTerm = e.target.searchTerm.value ;
        loadEmployeesBySearch() ;
    }

    return (
        <div id="homepage" className="container-fluid">
            <br/>
            <h2 className="text-center">Employee List</h2>
            <form onSubmit={e => onSubmit(e)}>
                <div className="row">
                    <div className="col-sm-2 text-left">
                        <select id="searchType" name="searchType" className="form-control">
                            <option value="empNo">By EmployeeNo</option>
                            <option value="empName">By EmployeeName</option>
                        </select>
                    </div>
                    <div className="col-sm-4 text-left">
                        <input type="text" id="searchTerm" name="searchTerm" className="form-control"/>
                    </div>
                    <div className="col-sm-3 text-left">
                        <button type="submit" id="searchBtn" name="searchBtn" className="btn btn-success">Search</button>
                    </div>
                    <div className="col-sm-3 text-right">
                        <Link to="/add" className="btn btn-success">Add Employee</Link>
                    </div>
                </div>
            </form>
            <br/>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Employee No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">DOJ</th>
                    <th scope="col">Department</th>
                    <th scope="col">Salary</th>
                    <th scope="col">Status</th>
                    <th scope="col">Options</th>
                    </tr>
                </thead>
                <tbody>
                    { employees.map((emp,index)=>(
                        <tr>
                            <th scope="row">{emp.uuId}</th>
                            <td>{emp.employeeNo}</td>
                            <td>{emp.employeeName}</td>
                            <td>{emp.dateOfJoining}</td>
                            <td>{emp.departmentCode}</td>
                            <td>{emp.salary}</td>
                            <td>{emp.isActive}</td>
                            <td>
                                <Link to={`/update/${emp.uuId}`} className="btn btn-success btn-sm" style={{marginRight:"5px"}}>Update</Link>
                                <Link to={`/delete/${emp.uuId}`} className="btn btn-danger btn-sm" style={{marginRight:"5px"}}>Delete</Link>
                            </td>
                        </tr>
                    ))} 
                </tbody>
            </table>
        </div>
    );
}

export default HomePage;