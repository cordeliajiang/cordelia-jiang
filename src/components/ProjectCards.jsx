import { Tab } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ProjectCard from './ProjectCard';
import './projectcards.css';

// Component to display a list of project cards
const ProjectCards = ({ title, projects }) => (
    <Tab.Pane eventKey={title.toLowerCase()}>
        <div className='projects-cards'>
            {projects.map((project, index) => (
                <div key={index}>
                    <ProjectCard {...project} />
                </div>
            ))}
        </div>
    </Tab.Pane>
);

ProjectCards.propTypes = {
    title: PropTypes.string.isRequired,
    projects: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            coverImg: PropTypes.string.isRequired,
            website: PropTypes.string,
            github: PropTypes.string,
            brochure: PropTypes.string,
        })
    ).isRequired,
};

export default ProjectCards;