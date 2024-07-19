import PropTypes from 'prop-types';
import './projectcard.css';

// Component to display individual project details
const ProjectCard = ({ title, description, coverImg, website, github, brochure, plan, execution, practice }) => {
    const links = [
        { href: website, text: 'Visit Website' },
        { href: brochure, text: 'View Brochure' },
        { href: github, text: 'View Github' },
        { href: plan, text: 'View Plan' },
        { href: execution, text: 'View Execution' },
        { href: practice, text: 'View Practice' },
    ];

    return (
        <div className="projects-card-container">
            <img src={coverImg} alt="coverImg" />
            <div className="projects-info">
                <h4 className="old-standard-tt-bold">{title}</h4>
                <h6 className="open-sans-regular">{description}</h6>
                <div className="projects-btn">
                    {links.map(
                        link =>
                            link.href && (
                                <button key={link.text}>
                                    <a className="open-sans-bold" href={link.href} target="_blank" rel="noopener noreferrer">
                                        {link.text}
                                    </a>
                                </button>
                            )
                    )}
                </div>
            </div>
        </div>
    );
};

ProjectCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    coverImg: PropTypes.string.isRequired,
    website: PropTypes.string,
    github: PropTypes.string,
    brochure: PropTypes.string,
    plan: PropTypes.string,
    execution: PropTypes.string,
    practice: PropTypes.string,
};

export default ProjectCard;