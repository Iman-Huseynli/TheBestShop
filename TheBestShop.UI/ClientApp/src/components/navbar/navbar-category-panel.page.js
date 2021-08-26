import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { getCategory } from '../../redux/actions/category/categoryActions'
import { setSelectedCategory } from '../../redux/actions/shop/shopActions'


export const NavbarCategoryPanelPage = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categoryReducer.categories);
    
    useEffect(() => {
        dispatch(getCategory());
    },[dispatch])
    
    return (
        <div className=''>
              <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <button className="navbar-toggler mx-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarcategory" aria-controls="navbarcategory" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="">Categories</span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarcategory">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0 navbar-category-menu">
                        {
                            categories && categories.length > 0 && categories.map((c, i) => 
                                <li key={c.id} className="nav-item badge rounded-pill bg-light me-2 my-1">
                                    <Link className="nav-link btn-lg text-dark" to='/shop' onClick={() => dispatch(setSelectedCategory(c.id))}>{c.name}</Link>
                                </li>
                        )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
