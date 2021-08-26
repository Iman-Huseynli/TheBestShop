import React, { useEffect } from 'react';
import { Layout } from './components/Layout';
import { checkIsAdmin, checkIsAuth } from './redux/actions/account/accountActions';
import { useDispatch } from 'react-redux';
import { getCarts } from './redux/actions/cart/cartActions';
import { getOrders } from './redux/actions/order/orderActions';
import { ToastPage } from './components/extra/toast/toast.page';
import { FooterPage } from './components/extra/footer/footer.page';


export const App = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(checkIsAuth());
        dispatch(checkIsAdmin());
        dispatch(getCarts());
        dispatch(getOrders());
    },[])

    return (
        <div>
            <Layout/>
            <ToastPage/>
            <FooterPage/>
        </div>
    );
}
