import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../../redux/actions/cart/cartActions';
import { addOrderItem } from '../../redux/actions/order/orderActions';
import { setSelectedPagination, setPaginationStart, setPaginationEnd } from '../../redux/actions/shop/shopActions';
import { getProductsWithPagination } from '../../redux/actions/product/productActions';

export const ShopPageRightComponent = (props) => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.productReducer.products);
    const productsCount = useSelector(state => state.shopReducer.productsCount);
    const paginationCount = useSelector(state => state.shopReducer.paginationCount);
    
    const selectedCategory = useSelector(state => state.shopReducer.selectedCategory);
    const selectedCompanyName = useSelector(state => state.shopReducer.selectedCompanyName);
    const selectedPagination = useSelector(state => state.shopReducer.selectedPagination);
    const paginationStart = useSelector(state => state.shopReducer.paginationStart);
    const paginationEnd = useSelector(state => state.shopReducer.paginationEnd);
    const minPriceFilter = useSelector(state => state.shopReducer.minPriceFilter);
    const maxPriceFilter = useSelector(state => state.shopReducer.maxPriceFilter);
    const reviewFilter = useSelector(state => state.shopReducer.reviewFilter);
    const searchValueFilter = useSelector(state => state.shopReducer.searchValueFilter);

    const [pageSize, setPageSize] = useState(51);
    //const [paginationEnd, setPaginationEnd] = useState(7);
    const [sortData, setSortData] = useState({name: 'Featured', id: 0});

    const setCurrentPagination = (e) => {
        const maxWidth = 7;
        const id = parseInt(e.target.id);
        let min, max = 0;
        switch (true) {
            case id > selectedPagination:
                min = id - 3;
                break;
            case id < selectedPagination:
                min = id - 3;
                break;
            case id === selectedPagination:
                min = paginationStart;
                break;
            default:
                min = 0;
                break;
        }
        if(min < 0) min = 0;
        else if(min > (paginationCount.length - maxWidth)) min = paginationCount.length - maxWidth;
        dispatch(setPaginationStart(min));
        
        max = min + maxWidth;
        if(max >= paginationCount.length) max = paginationCount.length;
        else if(max < maxWidth) max = maxWidth;
        dispatch(setPaginationEnd(max));
        
        if(id < 0) dispatch(setSelectedPagination(0));
        else if(id >= paginationCount.length) dispatch(setSelectedPagination(max - 1));
        else dispatch(setSelectedPagination(id));
    }

    const setPaginationComponent = () => {
        return(
            <div className="w-100 shop-pagination">
                <ul className="pagination px-3 justify-content-center">
                    <li key="a" className={`page-item ${selectedPagination === 0 ? 'disabled' : ''}`}>
                        <button id={selectedPagination - 1} onClick={setCurrentPagination} className="page-link" >Previous</button>
                    </li>
                    {
                        paginationCount && paginationCount.length > 0 && paginationCount.map((c, i) =>
                            paginationStart <= i && paginationEnd > i &&
                                <li key={i} className={`page-item ${selectedPagination === i ? 'active' : ''}`}>
                                    <button id={i} onClick={setCurrentPagination} className={`page-link`}>{i + 1}</button>
                                </li>
                    )}
                    {paginationCount && paginationCount.length > 0 &&
                        <li key="b" className={`page-item ${selectedPagination === (paginationCount.length - 1) ? 'disabled' : ''}`}>
                            <button id={selectedPagination + 1} onClick={setCurrentPagination} className="page-link">Next</button>
                        </li>
                    }
                </ul>
            </div>
        )
    }

    useEffect(() => {
        setPaginationComponent();
        dispatch(getProductsWithPagination(selectedPagination + 1, pageSize, minPriceFilter, maxPriceFilter, selectedCategory, selectedCompanyName, reviewFilter, searchValueFilter, sortData.id));
    }, [productsCount, minPriceFilter, searchValueFilter, maxPriceFilter, reviewFilter, selectedCompanyName, selectedCategory, sortData, selectedPagination])
    console.log(paginationEnd)
    return (
        <div>
             <div className='product-main'>
                {setPaginationComponent()}

                <div className="d-flex flex-row justify-content-evenly align-items-center mt-4">
                    <div>
                        <span className="me-2"> Sort by -</span>
                        <div className="btn-group">
                            <button type="button" className="btn btn-info dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                {sortData.name}
                            </button>
                            <ul className="dropdown-menu">
                                <li ><button id={0} style={{ cursor: "pointer" }} onClick={(e) => setSortData({name: e.target.name, id: e.target.id})} name='Featured' className="dropdown-item" >Featured</button></li>
                                <li ><button id={1} style={{ cursor: "pointer" }} onClick={(e) => setSortData({name: e.target.name, id: e.target.id})} name='Name - A - Z' className="dropdown-item" >Name - A - Z </button></li>
                                <li ><button id={2} style={{ cursor: "pointer" }} onClick={(e) => setSortData({name: e.target.name, id: e.target.id})} name='Name - Z - A' className="dropdown-item" >Name - Z - A </button></li>
                                <li><button id={3} style={{ cursor: "pointer" }} onClick={(e) => setSortData({name: e.target.name, id: e.target.id})} name='Price: Low to high' className="dropdown-item" >Price: Low to high </button></li>
                                <li><button id={4} style={{ cursor: "pointer" }} onClick={(e) => setSortData({name: e.target.name, id: e.target.id})} name='Price: High to low' className="dropdown-item" >Price: High to low </button></li>
                            </ul>
                        </div>
                    </div>

                    <div style={{ borderLeft: "3px solid #17a2b8" }} className="d-flex align-items-center ps-1 ms-5">
                        <strong>{productsCount && productsCount > 0 ? `${productsCount} Products found` : '0 Products found.'}</strong>
                    </div>
                </div>

                <div className="row row-cols-1 row-cols-md-3 mt-5 mb-2">
                    {products && products.length> 0 && products.map((c, i) =>
                            <div key={i} className="col mb-3">
                                <div className="card h-100">
                                    <Link className="d-content" to={`/product-detail/${c.id}`}>
                                        <img src={`${c.image}${c.id}`} className="card-img-top product-card-image" alt="..."></img>
                                        <div className="card-body">
                                            <div>
                                                {[1,2,3,4,5].map((x, v) => x <= c.quality ?
                                                    <i key={v} style={{color: '#ffbc00', fontSize: '1.1rem'}} className="bi bi-star-fill"></i> :
                                                    <i key={v} style={{color: '#ffbc00', fontSize: '1.1rem'}} className="bi bi-star"></i>
                                                )}
                                            </div>
                                            <h5 className="card-title mt-2 shop-card-name text-dark">{c.name}</h5>
                                            <p className="card-title mt-2 shop-card-name">{c.companyName}</p>
                                            <p className="card-text shop-card-description text-dark">{c.description}</p>
                                        </div>
                                        <p className="card-text text-center fs-3 text-danger">{c.price} $</p>
                                    </Link>
                                    <div className="card-footer flex-row">
                                        <button onClick={() => dispatch(addToCart(c.id))} className="btn btn-primary me-2">Add to favourite</button>
                                        <button onClick={() => dispatch(addOrderItem(c.id, 1))} className="btn btn-success">Add to cart</button>
                                    </div>
                                </div>
                            </div>
                    )}
                </div>
                    
                {setPaginationComponent()}
            </div>
        </div>
    )
}
