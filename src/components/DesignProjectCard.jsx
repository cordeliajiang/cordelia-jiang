import { Col } from "react-bootstrap";
import { useState, useEffect } from "react";

export const DesignProjectCard = ({ title, description, imgUrl, website, brochure }) => {
    const [websiteButtonStatus, setWebsiteButtonStatus] = useState(website);
    const [brochureButtonStatus, setBrochureButtonStatus] = useState(brochure);

    // need to wrap in arrow function, otherwise will show error: "too many re-renders. React limits the number of renders to prevent an infinite loop."
    useEffect(() => {
        // if (website !== "") {
        //     setWebsiteButtonStatus(websiteButtonStatus);
        // } else{
        //     setWebsiteButtonStatus(!websiteButtonStatus);
        // }
        setWebsiteButtonStatus(websiteButtonStatus)
    },[]);

    useEffect(() => {
        // if (website !== "") {
        //     setWebsiteButtonStatus(websiteButtonStatus);
        // } else{
        //     setWebsiteButtonStatus(!websiteButtonStatus);
        // }
        setBrochureButtonStatus(brochureButtonStatus)
    },[]);

    return(
        <Col sm={6} md={4}>
            <div className="proj-imgbx">
                <img src = {imgUrl} alt="imgUrl"/>
                <div className="proj-txtx">
                    <h4>{title}</h4>
                    <span>{description}</span>
                    <div className="proj-btn">
                        {websiteButtonStatus && <button><a className="btn btn-primary" href={website} target="_blank">Visit Website</a></button>}
                        {brochureButtonStatus && <button><a className="btn btn-primary" href={brochure} target="_blank">View Brochure</a></button>}
                    </div>
                </div>
            </div>
        </Col>
    )
}