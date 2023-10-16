import { Col } from "react-bootstrap";
import { useState, useEffect } from "react";

export const ProgrammingProjectCard = ({ title, description, imgUrl, website }) => {
    const [websiteButtonStatus, setWebsiteButtonStatus] = useState(website);

    // need to wrap in arrow function, otherwise will show error: "too many re-renders. React limits the number of renders to prevent an infinite loop."
    useEffect(() => {
        // if (website !== "") {
        //     setWebsiteButtonStatus(websiteButtonStatus);
        // } else{
        //     setWebsiteButtonStatus(!websiteButtonStatus);
        // }
        setWebsiteButtonStatus(websiteButtonStatus)
    },[]);

    return(
        <Col sm={6} md={4}>
            <div className="proj-imgbx">
                <img src = {imgUrl} alt="imgUrl"/>
                <div className="proj-txtx">
                    <h4>{title}</h4>
                    <span>{description}</span>
                    {websiteButtonStatus && <button><a href={website} target="_blank">Website</a></button>}
                    {/* <button><a className="btn btn-primary" href={github} target="_blank">Github</a></button> */}
                    {/* <a className="btn btn-primary" href="https://github.com/cordeliajiang/react-portfolio" target="_blank">Github</a> */}
                </div>
            </div>
        </Col>
    )
}