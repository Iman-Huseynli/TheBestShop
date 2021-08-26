import React from 'react';
import './main.css'
import { Redirect, Route, Switch } from 'react-router-dom';
import { HomePage } from './home/home.page';
import { ShopPage } from './shop/shop.page';
import { ProductDetailPage } from './product/product-detail.page';
import { LoginPage } from './account/login/login.page';
import { RegisterPage } from './account/register/register.page';
import { useSelector } from 'react-redux';
import { FavouritePage } from './favourite/favourite.page';
import { OrderPage } from './order/order.page';
import { AdminPage } from './admin/admin.page';
import { AdminProductPage } from './admin/product/admin.product.page';
import { AdminCategoryPage } from './admin/category/admin.category.page';
import { AdminUserPage } from './admin/user/admin.user.page';
import { AdminRolePage } from './admin/role/admin.role.page';
import { AccountPage } from './account/account.page';


export const Layout = () => {
    const isAuth = useSelector(state => state.accountReducer.isAuth);
    const isAdmin = useSelector(state => state.accountReducer.isAdmin);

    function PrivateRoute({component: Component, ...rest}){
        return(
            <Route {...rest} render={(props) =>
                isAuth === false ? 
                    <Component {...props} /> :
                    <Redirect to={{pathname: '/', state: {from: props.location}}}/> } />
        )
    }

    function PrivateAdminRoute({component: Component, ...rest}){
        return(
            <Route {...rest} render={(props) =>
                isAdmin === true ? 
                    <Component {...props} /> :
                    <Redirect to={{pathname: '/login', state: {from: props.location}}}/> } />
        )
    }

    return (
        <div>
            <Switch>
                <Route exact path='/' component={HomePage}/>
                <Route exact path='/home' component={HomePage}/>
                <Route exact path='/shop' component={ShopPage}/>
                <Route exact path='/product-detail/:id' component={ProductDetailPage}/>
                <Route exact path='/favourite' component={FavouritePage}/>
                <Route exact path='/order' component={OrderPage}/>
                <Route exact path='/account' component={AccountPage}/>
                
                <PrivateAdminRoute exact path='/admin' component={AdminPage}/>
                <PrivateAdminRoute exact path='/create-product' component={AdminProductPage}/>
                <PrivateAdminRoute exact path='/update-product/:id' component={AdminProductPage}/>
                <PrivateAdminRoute exact path='/create-category' component={AdminCategoryPage}/>
                <PrivateAdminRoute exact path='/update-category/:id' component={AdminCategoryPage}/>
                <PrivateAdminRoute exact path='/create-user' component={AdminUserPage}/>
                <PrivateAdminRoute exact path='/update-user/:id' component={AdminUserPage}/>
                <PrivateAdminRoute exact path='/create-role' component={AdminRolePage}/>
                <PrivateAdminRoute exact path='/update-role/:id' component={AdminRolePage}/>

                <PrivateRoute exact path='/login' component={LoginPage}/>
                <PrivateRoute exact path='/register' component={RegisterPage}/>
                <Route path='*' component={HomePage}/>
            </Switch>
      </div>
    );
}
