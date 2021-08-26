import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import './tablePage.css'
import { getAllData, removeData, setAdminSearchValue } from '../../../redux/actions/admin/adminActions';

export const TablePage = (props) => {
  const dispatch = useDispatch();
  const { tableName, pageSize } = props;

  const [header, setHeader] = useState([]);
  const [data, setData] = useState([]);
  const [removableData, setRemovableData] = useState();

  const mainAdminDataCount = useSelector(state => state.adminReducer.mainAdminDataCount);
  const adminSearchValue = useSelector(state => state.adminReducer.adminSearchValue);
  
  const setRemoveData = (value) => {
    setRemovableData(value);
  }

  const getData =() => {
    setHeader([]);
    setData([]);
    let mainData = props.data;
    let count = 0;
    for(const key in mainData) {
      if(mainData.hasOwnProperty(key)) {
        let value = mainData[key];
        if(count === 0){
          for(const item in value) {
            setHeader( data => { return [...data, item ]});
        }}
        count++; 
        setData(item => { return [...item, value ]});
      }
    }
  }

  useEffect(() => {
    getData();
  },[props.data])

  return (
    <div className='table-responsive mb-3'>

      <div className='d-flex flex-row justify-content-between mx-3'>
        <Link to={{pathname: `/create-${tableName}`, state: {tableName}}} className="btn btn-primary link mt-3 mb-2">Create</Link>
        <div className='d-flex flex-row table-input-container'>
          <input onChange={(e) => dispatch(setAdminSearchValue(e.target.value))} className="form-control me-2" placeholder="Search" aria-label="Search"></input>
          <button onClick={() => dispatch(getAllData(tableName, 1, pageSize, adminSearchValue))} className="btn btn-success" type="button">Search</button>
        </div>
        <div className='fs-5'>
          <span className='fw-bold mt-2'>{`${mainAdminDataCount ? mainAdminDataCount : 0} `}</span>
          <span>{`${tableName}${mainAdminDataCount > 1 ? 's' : ''} found.`}</span></div>
      </div>
      

      <div className="modal fade" id="adminDataRemoveModal" tabIndex="-1" aria-labelledby="adminDataRemoveModal" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content">
            <div className="modal-body text-bold">
                Are you sure you want to move to Trash?
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button onClick={() => dispatch(removeData(tableName, removableData))} type="button" data-bs-dismiss="modal" className="btn btn-danger">Remove</button>
            </div>
            </div>
        </div>
      </div>
      
      {data.length > 0 ?
        <table className="table table-dark border-danger table-bordered table-striped table-hover align-middle">
          <thead>
            <tr className='text-center'>
              {
                header && header.map((header, i) => (
                  <th key={i + 3}>{header}</th>
              ))}
              <th style={{width: '.1px'}} key={1}></th>
              <th style={{width: '.1px'}} key={2}></th>
            </tr>
          </thead>
          <tbody>
            {
              data && data.map((value, i) => (
                <tr key={i}>
                  {
                    header.map((header, b) => (
                      <td key={b + 3}>{typeof(value[header]) != "object" && typeof(value[header]) == "boolean" ? value[header] === true ? 'true' : 'false' : value[header] } </td>
                  ))}
                  <td key={1}> 
                    <Link to={{pathname: `/update-${tableName}/${value.id}`, state: {tableName}}} id={value.id} className="btn btn-sm btn-warning text-decoration-none">Edit</Link>
                  </td>

                  <td key={2}> <button id={value.id} onClick={c => setRemoveData(value.id)} data-bs-toggle="modal" data-bs-target="#adminDataRemoveModal" className="btn btn-sm btn-danger">Delete</button> </td>
                </tr>
            ))}
          </tbody>
        </table>
      :
        <div className="alert alert-danger mt-5" role="alert">
          There is no product!
        </div>
      }
    </div>
  );
};