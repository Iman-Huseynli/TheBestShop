import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './shop.css'
import { setPriceFilter, setSelectedCategory, onHandleSelectedCompany, setSelectedCompany, setReviewFilter } from '../../redux/actions/shop/shopActions'
import { getCompanies } from '../../redux/actions/product/productActions'


export const ShopPageLeftComponent = ({abc}) => {
    const dispatch = useDispatch();
    const selectedCategory = useSelector(state => state.shopReducer.selectedCategory);
    const selectedCompanyName = useSelector(state => state.shopReducer.selectedCompanyName);
    const priceFilter = useSelector(state => state.shopReducer.priceFilter);
    const reviewFilter = useSelector(state => state.shopReducer.reviewFilter);
    const categories = useSelector(state => state.categoryReducer.categories);
    const company = useSelector(state => state.productReducer.company);
    
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [filterDisplayStatus, setFilterDisplayStatus] = useState(false);
    
    const onHandlePriceFilter = (v, min, max) => {
        if(v.target.checked === false){
            dispatch(setPriceFilter(null, 0, 0));
        }
        else{
            dispatch(setPriceFilter(v.target.id, min, max));
            setMinPrice("")
            setMaxPrice("")
        }
    }

    const chechInputType = (event) => {
        let temp = parseFloat(event.target.value + event.key);
        if (event.key !== "." || (event.target.value.length === 0 && event.key === ".") || (event.target.value.indexOf(".") > -1)) {
            if (isNaN(temp) || (temp + "").length < (event.target.value + event.key).length) {
                event.preventDefault();
            }
        }
    }

    const chechInputTypeOnPaste = (event) => {
        let value = event.clipboardData.getData('text');
        let temp = parseFloat(value);
        if (isNaN(temp) || (temp + "").length < (value).length) {
            event.preventDefault()
        }
    }

    const setFilterValueOnClick  = (e) => {
        e.preventDefault();
        minPrice && maxPrice && dispatch(setPriceFilter("", minPrice, maxPrice));
    }

    const clearPriceFilter = () => {
        dispatch(setPriceFilter(null, 0, 0));
        setMaxPrice("");
        setMinPrice("");
    }
    const clearCompanyNameFilter = () => {
        let temp = [];
        temp.push(...company);
        let arr = temp.map(c => { return { name: c.name, checked: false } });
        dispatch(onHandleSelectedCompany(arr));
        dispatch(setSelectedCompany([]));
    }

    const onHandleCompanyNameChange = (v) => {
        let temp = [];
        temp.push(...company);
        if (v.target.checked) {
            let index = temp.findIndex(c => c.name === v.target.name);
            temp[index].checked = true;
            dispatch(onHandleSelectedCompany(temp));
            let newArr = [...selectedCompanyName];
            newArr.push(temp[index].name)
            dispatch(setSelectedCompany(newArr));
        }
        else {
            let index = temp.findIndex(c => c.name === v.target.name);
            temp[index].checked = false;
            dispatch(onHandleSelectedCompany(temp));
            let newArr = [...selectedCompanyName];
            newArr.splice(newArr.indexOf(v.target.name), 1);
            dispatch(setSelectedCompany(newArr));
        }
    }

    const setClearAllFilterStatus = () => {
        if ((company && company.length > 0 && company.findIndex(c => c.checked === true) > 0) || (priceFilter !== null && priceFilter !== 0) || (reviewFilter !== null && reviewFilter !== 0) || selectedCategory > 0) {
            return true;
        }
        else{
            return false;
        }
    }

    const clearAllFilter = () => {
        dispatch(setSelectedCategory(0));
        clearCompanyNameFilter();
        clearPriceFilter();
        dispatch(setReviewFilter(0));
    }

    const clearAllFilterOnPageLoading = () => {
        clearCompanyNameFilter();
        clearPriceFilter();
        dispatch(setReviewFilter(0));
    }

    const setCategoryComponent = () => {
        return(
            <div style={{display: 'contents'}}>
                <button key={0} type="button" onClick={() => dispatch(setSelectedCategory(0))} className={`mt-2 list-group-item list-group-item-action shop-category-item-filter ${selectedCategory === null || selectedCategory === 0 ? 'active' : ''}`} aria-current="true">
                    All categories
                </button>
                {
                    categories && categories.length > 0 && categories.map((c, i) => 
                    <button key={c.id} type="button" onClick={() => dispatch(setSelectedCategory(c.id))} className={`list-group-item list-group-item-action shop-category-item-filter ${selectedCategory === c.id ? 'active' : ''}`}>{c.name}</button>
                )}
            </div>
        )
    }
    
    const setPriceComponent = () => {
        return(
            <div style={{display: 'contents'}}>
            <form onSubmit={setFilterValueOnClick}>
                <div className="input-group mb-3 mt-3">
                    <input type="text" className="form-control" value={ minPrice } onKeyPress={chechInputType} onPaste={chechInputTypeOnPaste} onChange={(v => setMinPrice(v.target.value))} placeholder="Min" aria-label="Min" required></input>
                    <span className="my-auto mx-3">-</span>
                    <input type="text" className="form-control" value={ maxPrice } onKeyPress={chechInputType} onPaste={chechInputTypeOnPaste} onChange={(v => setMaxPrice(v.target.value))} placeholder="Max" aria-label="Max" required></input>
                    <button type='submit' className="btn btn-outline-info btn-sm ms-3">
                        <i className="bi bi-arrow-right"></i>
                    </button>
                </div></form>

                <div className="form-check shop-price-filter">
                    <input className="form-check-input" type="checkbox" onChange={(v) => onHandlePriceFilter(v, 0, 100)} value="" id="price100" checked={priceFilter === 'price100' ? true : false}></input>
                    <label id='price100' className={`form-check-label cursor-pointer ${priceFilter === 'price100' ? 'text-primary' : '' }`} htmlFor="price100">
                        0 - 100 $
                    </label>
                </div>
                <div className="form-check shop-price-filter">
                    <input className="form-check-input" type="checkbox" onChange={(v) => onHandlePriceFilter(v, 100, 500)} value="" id="price500" checked={priceFilter === 'price500' ? true : false}></input>
                    <label id='price500' className={`form-check-label cursor-pointer ${priceFilter === 'price500' ? 'text-primary' : '' }`} htmlFor="price500">
                        100 - 500 $
                    </label>
                </div>
                <div className="form-check shop-price-filter">
                    <input className="form-check-input" type="checkbox" onChange={(v) => onHandlePriceFilter(v, 500, 1000)} value="" id="price1000" checked={priceFilter === 'price1000' ? true : false}></input>
                    <label id='price1000' className={`form-check-label cursor-pointer ${priceFilter === 'price1000' ? 'text-primary' : '' }`} htmlFor="price1000">
                        500 - 1000 $
                    </label>
                </div>
                <div className="form-check shop-price-filter">
                    <input className="form-check-input" type="checkbox" onChange={(v) => onHandlePriceFilter(v, 1000, 10000)} value="" id="price10000" checked={priceFilter === 'price10000' ? true : false}></input>
                    <label id='price10000' className={`form-check-label cursor-pointer ${priceFilter === 'price10000' ? 'text-primary' : '' }`} htmlFor="price10000">
                        1000 - 10000 $
                    </label>
                </div>

                
                {priceFilter !== null &&
                    <div className="d-flex w-100">
                        <button onClick={clearPriceFilter} className='btn btn-danger ms-auto btn-sm mt-2'>Clear filter</button>
                    </div>
                }
            </div>
        )
    }

    const setReviewComponent = () => {
        return (
            <div>
                {
                    [4, 3, 2, 1].map(index => {
                        return (
                            <div onClick={() => dispatch(setReviewFilter(index))} key={index} style={{ backgroundColor: reviewFilter === index ? "#e3e3e3" : "" }} className='shop-star-filter'>
                                {[1, 2, 3, 4, 5].map((c, i) => c <= index ?
                                    <i key={i} style={{ color: '#ffbc00', fontSize: '1.3rem' }} className="bi bi-star-fill"></i> :
                                    <i key={i} style={{ color: '#ffbc00', fontSize: '1.3rem' }} className="bi bi-star"></i>
                                )} <span style={{ color: reviewFilter === index ? "blue" : '' }}> & Up</span>
                            </div>
                        )
                    })}
                {reviewFilter !== null && reviewFilter !== 0 &&
                    <div className="d-flex w-100 mt-3">
                        <button onClick={() => dispatch(setReviewFilter(0))} className="btn btn-warning btn-sm ms-auto">Clear filter</button>
                    </div>
                }
            </div>
        )
    }

    const setCompanyNameComponent = () => {
        return (
            <div style={{ display: 'contents' }}>
                {
                    company && company.length > 0 && company.map((c, i) =>
                        <div key={i} className="form-check shop-company-item-filter">
                            <input className="form-check-input" type="checkbox" name={c.name} onChange={onHandleCompanyNameChange} checked={c.checked} id={`${c.name}${i}`}></input>
                            <label className="form-check-label cursor-pointer" htmlFor={`${c.name}${i}`}>{c.name}</label>
                        </div>
                    )}
                {
                    company && company.length > 0 && company.findIndex(c => c.checked === true) > 0 &&
                    <div className="d-flex w-100 mt-3">
                        <button onClick={clearCompanyNameFilter} className="btn btn-warning btn-sm ms-auto">Clear filter</button>
                    </div>
                }
            </div>
        )
    }


    useEffect(() => {
        clearAllFilterOnPageLoading();
        dispatch(getCompanies());
    },[])
    
    return (
        <div className='px-3 border-end border-info'>
            <div className='shop-filter-main'>
                <h4 className="border-bottom pb-2">Department</h4>
                <div className="list-group px-3">
                    {setCategoryComponent()}
                </div>


                <h4 className="mt-4 border-bottom pb-2">Featured Brands</h4>
                <div className="px-3 shop-company-filter">
                    {setCompanyNameComponent()}
                </div>

                <h4 className="mt-5 border-bottom pb-2">Price</h4>
                {setPriceComponent()}

                <h4 className="mt-5 border-bottom pb-2">Avg. Customer Review</h4>
                {
                    setReviewComponent()
                }

                {setClearAllFilterStatus() &&
                    <div className='w-100 d-flex'>
                        <button onClick={clearAllFilter} className="btn btn-danger w-100 mt-4">Clear all filter</button>
                    </div>
                }
            </div>


            <div className="w-100 shop-filter-dropdown">
                <button className="btn btn-secondary me-1 w-50" onClick={() => setFilterDisplayStatus(!filterDisplayStatus)}>Filter</button>
                {
                    <button onClick={clearAllFilter} className="btn btn-danger ms-1 w-50" disabled={setClearAllFilterStatus() === true ? false : true}>Clear filter</button>
                }
            </div>

            <div style={{ display: filterDisplayStatus === true ? 'block' : 'none' }}>
                <button className="btn btn-outline-dark mt-2 w-100" type="button" data-bs-toggle="collapse" data-bs-target="#categoryfilter" aria-expanded="false" aria-controls="categoryfilter">
                    Categories
                </button>
                <div className="collapse" id="categoryfilter">
                    <div className="list-group mt-1 shop-category-filter">
                        {setCategoryComponent()}
                    </div>
                </div>

                <button className="btn btn-outline-dark mt-2 w-100" type="button" data-bs-toggle="collapse" data-bs-target="#companyfilter" aria-expanded="false" aria-controls="companyfilter">
                    Company
                </button>
                <div className="collapse" id="companyfilter">
                    <div className="mt-1 shop-company-filter">
                        {setCompanyNameComponent()}
                    </div>
                </div>

                <button className="btn btn-outline-dark mt-2 w-100" type="button" data-bs-toggle="collapse" data-bs-target="#pricefilter" aria-expanded="false" aria-controls="pricefilter">
                    Price
                </button>
                <div className="collapse" id="pricefilter">
                    {setPriceComponent()}
                </div>

                <button className="btn btn-outline-dark mt-2 w-100" type="button" data-bs-toggle="collapse" data-bs-target="#reviewfilter" aria-expanded="false" aria-controls="reviewfilter">
                    Review
                </button>
                <div className="collapse" id="reviewfilter">
                    {
                        setReviewComponent()
                    }
                </div>
            </div>
        </div>
    )
}
