import PropTypes from 'prop-types';
import './projectcard.css';

// Component to display individual project details
const ProjectCard = ({ title, description, coverImg, website, github, brochure }) => {
    const links = [
        { href: website, text: 'Visit Website' },
        { href: brochure, text: 'View Brochure' },
        { href: github, text: 'View Github' },
    ];

    return (
        <div className="projects-card-container">
            <img src={coverImg} alt="coverImg" />
            <div className="projects-info">
                <h4>{title}</h4>
                <span>{description}</span>
                <div className="projects-btn">
                    {links.map(
                        link =>
                            link.href && (
                                <button key={link.text}>
                                    <a href={link.href} target="_blank" rel="noopener noreferrer">
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
};

export default ProjectCard;