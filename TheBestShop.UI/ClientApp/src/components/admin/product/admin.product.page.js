import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { addOrUpdateData } from '../../../redux/actions/admin/adminActions';
import { getCategory } from '../../../redux/actions/category/categoryActions';
import { getProductByIdWithCategories } from '../../../redux/actions/product/productActions';
import { NavbarPage } from '../../navbar/navbar.page'

export const AdminProductPage = (props) => {
    const { id } = useParams('id');
    let formRef = useRef();
    const history = useHistory();
    const { state } = useLocation('state');

    const dispatch = useDispatch();
    const categories = useSelector(state => state.categoryReducer.categories);
    const product = useSelector(state => state.productReducer.product);
    const redirect = useSelector(state => state.generalReducer.redirect);

    const [addCategoryToSelectedCategory, setAddCategoryToSelectedCategory] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [imageUrl, setImageUrl] = useState("");
    const [productImage, setProductImage] = useState("");
    
    const checkQuantityType = (event) => {
        let temp = parseInt(event.target.value + event.key);
        if (isNaN(temp) || (temp + "").length < (event.target.value + event.key).length) {
            event.preventDefault();
        }
    }

    const checkQuantityTypeOnPaste = (event) => {
        let value = event.clipboardData.getData('text');
        let temp = parseInt(value);
        if (isNaN(temp) || (temp + "").length < (value).length) {
            event.preventDefault()
        }
    }

    const checkInputType = (event) => {
        let temp = parseFloat(event.target.value + event.key);
        if (event.key != "." || (event.target.value.length == 0 && event.key == ".") || (event.target.value.indexOf(".") > -1)) {
            if (isNaN(temp) || (temp + "").length < (event.target.value + event.key).length) {
                event.preventDefault();
            }
        }
    }

    const checkInputTypeOnPaste = (event) => {
        let value = event.clipboardData.getData('text');
        let temp = parseFloat(value);
        if (isNaN(temp) || (temp + "").length < (value).length) {
            event.preventDefault()
        }
    }

    const changeCategoryHandler = (e) => {
        let allCategories = [];
        id && addCategoryToSelectedCategory === 0 ? product && product.productsCategories && product.productsCategories.length > 0 &&
        product.productsCategories.map(c => allCategories.push(c.categoryId)) : allCategories = selectedCategory;
        addCategoryToSelectedCategory === 0 && setAddCategoryToSelectedCategory(1);
        let index = allCategories.findIndex(c => c == e.target.id);
        index < 0 ? allCategories.push(e.target.id) : allCategories.splice(index, 1);
        setSelectedCategory(allCategories);
    }

    const uploadImage = (event) => {
        const fileTypes = ['image/png', 'image/jpeg'];
        if (event.target.files[0]) {
            if (fileTypes.indexOf(event.target.files[0].type) !== -1) {
                let reader = new FileReader();
                reader.onloadend = () => {
                    setImageUrl(<div className="w-50">
                        <img style={{ width: "60%" }} className='h-100' src={reader.result} alt="" />
                    </div>);
                    setProductImage(reader.result);  
                };
                return reader.readAsDataURL(event.target.files[0]);
            }
            else{
                setImageUrl("");
                setProductImage("");
            }
        }
    }
    
    const formSubmit = (event) => {
        event.preventDefault();
        let allCategories = [];
        const formData = new FormData(formRef.current);
        id ? productImage === "" ? formData.append("image", product.image) : formData.append("image", productImage) : formData.append("image", productImage);
        id && selectedCategory.length === 0 && product.productsCategories.map(c => allCategories.push(c.categoryId));
        id ? selectedCategory.length === 0 ? formData.append("categoryIds", allCategories) : formData.append("categoryIds", selectedCategory) : formData.append("categoryIds", selectedCategory);
        dispatch(addOrUpdateData(state.tableName, formData, id));
    }

    useEffect(() => {
        redirect !== null && history.push(redirect);
        dispatch(getCategory());
        id && dispatch(getProductByIdWithCategories(id));
    },[redirect])
    
    return (
        <div>
            <NavbarPage/>

            <form className="container" ref={formRef} onSubmit={formSubmit}>
                <div className="row">
                    <div className="col-md-8 p-4">

                        <div className="d-flex flex-row align-items-cener mt-4">
                            { id ? product && product.image && productImage === "" ?
                                <div className="w-50">
                                    <img style={{ width: "60%" }} className='h-100' src={product.image} alt="" />
                                </div> :
                                imageUrl : imageUrl
                            }
                            <div className="input-group mb-3">
                                <input type="file" multiple={false} onChange={(v) => uploadImage(v)} accept='image/*' className="form-control" id="inputGroupFile02"></input>
                                <label className="input-group-text" htmlFor="inputGroupFile02">Upload</label>
                            </div>
                        </div>


                        <div className="d-flex flex-column align-items-start mt-4">
                            <label>Name</label>
                            <input type="text" defaultValue={product && product.name} className="form-control" name='name' id="name" ></input>
                        </div>
                        <div className="d-flex flex-column align-items-start mt-4">
                            <label>Company name</label>
                            <input type="text" defaultValue={product && product.companyName} className="form-control " name='companyName' id="companyName" ></input>
                        </div>
                        <div className="d-flex flex-column align-items-start mt-4">
                            <label>Description</label>
                            <textarea type="text" defaultValue={product && product.description} className="form-control" name='description' id="description" ></textarea>
                        </div>
                        <div className="d-flex flex-column align-items-start mt-4">
                            <label>Price</label>
                            <input type="text" onKeyPress={checkInputType} onPaste={checkInputTypeOnPaste} defaultValue={product && product.price} className="form-control " name='price' id="price" ></input>
                        </div>
                        <div className="d-flex flex-column align-items-start mt-4">
                            <label>Quantity</label>
                            <input type="text" onKeyPress={checkQuantityType} onPaste={checkQuantityTypeOnPaste} defaultValue={product && product.quantity} className="form-control " name='quantity' id="quantity" ></input>
                        </div>
                        <div className="d-flex flex-column align-items-start mt-4">
                            <label>Weight</label>
                            <input type="text" onKeyPress={checkInputType} onPaste={checkInputTypeOnPaste} defaultValue={product && product.weight} className="form-control " name='weight' id="weight" ></input>
                        </div>
                    </div>

                    <div className="col-md-4 mt-4 p-4">
                        <div className='pb-3' style={{ backgroundColor: "rgb(245,245,245)" }}>
                            <h4 className="ps-3 pt-4"><strong>Categories</strong></h4>
                            <div className='w-100 d-flex justify-content-center mt-3 pb-4'>
                                <div className='mx-3 w-100' style={{ borderBottom: "1px solid rgb(133,133,133)" }}></div>
                            </div>
                            <div style={{maxHeight: '30rem', overflowY: 'auto'}}>
                            {
                                categories && categories.length > 0 && categories.map((v, i) => (
                                    <div key={i} className="d-flex flex-column align-items-start px-4">
                                    { id && product && product.productsCategories && product.productsCategories.length > 0 &&
                                        product.productsCategories.findIndex(c => c.categoryId === v.id) >= 0 ?
                                        <div className="form-check">
                                            <input onClick={changeCategoryHandler} defaultChecked={true} name='category' className="form-check-input" type="checkbox" id={v.id}></input>
                                            <label className="form-check-label" htmlFor={v.id}>
                                                {v.name}
                                            </label>
                                        </div> :
                                        <div className="form-check">
                                            <input onClick={changeCategoryHandler} name='category' className="form-check-input" type="checkbox" id={v.id}></input>
                                            <label className="form-check-label" htmlFor={v.id}>
                                                {v.name}
                                            </label>
                                        </div>
                                    }
                                    </div>))
                            }</div>
                            <div className='w-100 d-flex justify-content-center my-4'>
                                <div className='mx-4 w-100' style={{ borderBottom: "1px solid rgb(133,133,133)" }}></div>
                            </div>

                            <div className="d-flex justify-content-center mb-2">
                                <button type='submit' className="btn btn-success">{id ? 'Update product' : 'Create product'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
