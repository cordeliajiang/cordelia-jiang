import PropTypes from 'prop-types';
import './projectcards.css';

// Component to display individual project details
const ProjectCard = ({ title, description, coverImg, website, github, brochure }) => (
    <div className="projects-card-container">
        <img src={coverImg} alt="coverImg" />
        <div className="projects-info">
            <h4>{title}</h4>
            <span>{description}</span>
            <div className="projects-btn">
                {website && (
                    <button>
                        <a className="btn btn-primary" href={website} target="_blank" rel="noopener noreferrer">
                            Visit Website
                        </a>
                    </button>
                )}
                {brochure && (
                    <button>
                        <a className="btn btn-primary" href={brochure} target="_blank" rel="noopener noreferrer">
                            View Brochure
                        </a>
                    </button>
                )}
                {github && (
                    <button>
                        <a className="btn btn-primary" href={github} target="_blank" rel="noopener noreferrer">
                            View Github
                        </a>
                    </button>
                )}
            </div>
        </div>
    </div>
);

ProjectCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    coverImg: PropTypes.string.isRequired,
    website: PropTypes.string,
    github: PropTypes.string,
    brochure: PropTypes.string,
};

export default ProjectCard;