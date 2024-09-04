import React from 'react';
import NavBar from '../components/NavBar';
import ShareToggleSection from '../components/ShareToggle';
import ProjectList from '../components/ProjectList/ProjectList.jsx';

const ProjectsPage = () => {
  return (
    <>
        <NavBar />
        <ShareToggleSection />
        <ProjectList />

    </>

    

  );
};

export default ProjectsPage;