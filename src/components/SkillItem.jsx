import React from 'react';
import PropTypes from 'prop-types';

const SkillItem = ({ icon, title }) => (
    <article className='skills-details'>
        <div className="skills-details-icon">{icon}</div>
        <h5>{title}</h5>
    </article>
);

SkillItem.propTypes = {
    icon: PropTypes.element.isRequired, // Ensure icon is a React element & is required
    title: PropTypes.string.isRequired, // Ensure title is a string & is required
};

export default SkillItem;