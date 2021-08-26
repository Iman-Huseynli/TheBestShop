import React from 'react'
import { createPortal } from 'react-dom'
import './footer.css'


export const FooterPage = () => {
    const date = new Date();
    return createPortal(
        <div className="footer w-100">
            <div className="d-flex flex-row justify-content-around w-100">
                <div className="d-flex flex-column justify-content-center align-items-center footer-main-header">
                    <h1>The<span className='text-danger'>Best</span>Shop</h1>
                    <p className="footerEmail">iman012895@gmail.com</p>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <h5 className="mt-2 footerHeader">Contact us</h5>
                    <div className="d-flex justify-content-center contactSocial">
                        <a href='https://www.facebook.com/iman.huseynli' rel="noopener noreferrer" target="_blank">
                            <i style={{fontSize: '2rem'}} className="bi bi-facebook"></i>
                        </a>
                        <a href='https://linkedin.com/in/iman-hüseynli-2b8450148/' rel="noopener noreferrer" target="_blank"> 
                            <i style={{fontSize: '2rem'}} className="bi bi-linkedin"></i>
                        </a>
                        <a href='https://www.instagram.com/xh_iman/' rel="noopener noreferrer" target="_blank">
                            <i style={{fontSize: '2rem'}} className="bi bi-instagram"></i>
                        </a>
                        <a href='https://twitter.com/h_iman95' rel="noopener noreferrer" target="_blank">
                            <i style={{fontSize: '2rem'}} className="bi bi-twitter"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-between align-items-center p-2" style={{ backgroundColor: "black" }}>
                <p>This site was created by <span className='text-danger'>Iman Huseynli</span></p>
                <h3 className=''>Made by <a target="/" href="https://github.com/Ineffabl3Fray" style={{ textDecoration: "none", color: "#37e65a" }} > <i className="bi bi-github"></i> Iman H. </a> 2020.</h3>
                <p>Copyright © {date.getUTCFullYear()}. All right reserved</p>
            </div>
        </div>, document.getElementById('footer')
    )
}
