const Footer =()=>{
    return(
        <footer className="navbar opacity-50 small">
            <p className="mx-3 pt-3">© 2023 Festo Corporation. All Rights Reserved </p>
            <div className="">
                <a id='link-to-imprint' className="mx-2 p-1 text-decoration-none text-black"
                   href="https://www.festo.com/us/en/e/legal/-id_3741/">Imprint</a>
                <a id='link-to-data-privacy' className="mx-2 p-1 text-decoration-none text-black"
                   href="https://www.festo.com/us/en/e/privacy-statement-id_3749/">Data privacy</a>
                <a id='link-to-terms-&-conditions' className="mx-2 p-1 text-decoration-none text-black"
                   href="https://www.festo.com/us/en/e/legal/terms-and-conditions-of-sale-id_3747/">Terms and
                    Conditions of Sale</a>
                <a id='link-to-cloud-service' className="mx-2 p-1 text-decoration-none text-black"
                   href="https://www.festo.com/us/en/e/cloud-services-id_129924/">Cloud service</a>
            </div>
        </footer>
    )
}

export default Footer;