import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getCategory } from '../../redux/actions/category/categoryActions';
import { NavbarPage } from '../navbar/navbar.page'
import { ShopPageLeftComponent } from './shop-page-left-component';
import { ShopPageRightComponent } from './shop-page-right-component';


export const ShopPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategory());
    },[])


    return (
        <div>
            <NavbarPage/>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-4 mt-4">
                        <ShopPageLeftComponent/>
                    </div>
                    <div className="col-md-8 mt-4">
                        <ShopPageRightComponent/>
                    </div>
                </div>
            </div>
        </div>
    )
}
