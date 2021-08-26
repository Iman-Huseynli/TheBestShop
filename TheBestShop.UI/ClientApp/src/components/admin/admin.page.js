import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllData, setAdminSearchValue } from '../../redux/actions/admin/adminActions';
import { TablePage } from '../extra/table/table.page'
import { NavbarPage } from '../navbar/navbar.page'

export const AdminPage = () => {
    const dispatch = useDispatch();
    const mainAdminData = useSelector(state => state.adminReducer.mainAdminData);
    const mainAdminPaginationCount = useSelector(state => state.adminReducer.mainAdminPaginationCount);
    const refleshPage = useSelector(state => state.adminReducer.refleshPage);
    const adminSearchValue = useSelector(state => state.adminReducer.adminSearchValue);

    const [tableName, setTableName] = useState('product');
    const [pageSize, setPageSize] = useState(20);
    const [selectedPageination, setSelectedPageination] = useState(0);
    const [paginationStart, setPaginationStart] = useState(0);
    const [paginationEnd, setPaginationEnd] = useState(7);

    const setCurrentTable = (name) => {
        setTableName(name);
        dispatch(setAdminSearchValue(""));
        setSelectedPageination(0);
        setPaginationStart(0);
        setPaginationEnd(7);
        setPageSize(20);
    }
    
    const setPaginationComponent = () => {
        return(
            <div className="w-100 shop-pagination">
                <ul className="pagination px-3 justify-content-center">
                    <li key="a" className={`page-item ${selectedPageination === 0 ? 'disabled' : ''}`}>
                        <button id={selectedPageination - 1} onClick={setCurrentPagination} className="page-link" >Previous</button>
                    </li>
                    {
                        mainAdminPaginationCount && mainAdminPaginationCount.length > 0 && mainAdminPaginationCount.map((c, i) =>
                            paginationStart <= i && paginationEnd > i &&
                                <li key={i} className={`page-item ${selectedPageination === i ? 'active' : ''}`}>
                                    <button id={i} onClick={setCurrentPagination} className={`page-link`}>{i + 1}</button>
                                </li>
                    )}
                    {mainAdminPaginationCount && mainAdminPaginationCount.length > 0 &&
                        <li key="b" className={`page-item ${selectedPageination === (mainAdminPaginationCount.length - 1) ? 'disabled' : ''}`}>
                            <button id={selectedPageination + 1} onClick={setCurrentPagination} className="page-link">Next</button>
                        </li>
                    }
                </ul>
            </div>
        )
    }
    
    const setCurrentPagination = (e) => {
        const maxWidth = 7;
        const id = parseInt(e.target.id);
        let min, max = 0;
        switch (true) {
            case id > selectedPageination:
                min = id - 3;
                break;
            case id < selectedPageination:
                min = id - 3;
                break;
            case id === selectedPageination:
                min = paginationStart;
                break;
            default:
                min = 0;
                break;
        }
        if(min < 0) min = 0;
        else if(min > (mainAdminPaginationCount.length - maxWidth)) min = mainAdminPaginationCount.length - maxWidth;
        setPaginationStart(min);
        
        max = min + maxWidth;
        if(max >= mainAdminPaginationCount.length) max = mainAdminPaginationCount.length;
        else if(max < maxWidth) max = maxWidth;
        setPaginationEnd(max);
        
        if(id < 0) setSelectedPageination(0);
        else if(id >= mainAdminPaginationCount.length) setSelectedPageination(max - 1);
        else setSelectedPageination(id);
    }
  
    useEffect(() => {
        dispatch(getAllData(tableName, selectedPageination + 1, pageSize, adminSearchValue));
    },[tableName, selectedPageination, refleshPage])

    return (
        <div>
            <NavbarPage/>
            <h1 className='border-bottom text-center mt-5 mb-4'>Welcome back.</h1>
            <div className="d-flex justify-content-start ms-3 border-bottom mb-5 pb-2">
                <button onClick={() => setCurrentTable('product')} className={`btn ${tableName === 'product' ? 'btn-danger' : 'btn-outline-danger'} me-2`}>Product</button>
                <button onClick={() => setCurrentTable('category')} className={`btn ${tableName === 'category' ? 'btn-primary' : 'btn-outline-primary'} me-2`}>Category</button>
                <button onClick={() => setCurrentTable('user')} className={`btn ${tableName === 'user' ? 'btn-warning' : 'btn-outline-warning'} me-2`}>User</button>
                <button onClick={() => setCurrentTable('role')} className={`btn ${tableName === 'role' ? 'btn-success' : 'btn-outline-success'} me-2`}>Role</button>
            </div>
            {mainAdminData && mainAdminData.length > 0 && setPaginationComponent()}
            <TablePage tableName={tableName} pageSize={pageSize} data={mainAdminData}/>
            {mainAdminData && mainAdminData.length > 0 && setPaginationComponent()}
        </div>
    )
}
