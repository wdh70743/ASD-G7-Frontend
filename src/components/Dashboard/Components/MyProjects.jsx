import React from 'react';
import Project from '../../ProjectList/Project';
import '../Styles/MyProjects.css'; 

const MyProjects = ({ projects }) => {
  // Array of hex colors
  const colors = ['#e8544c', '#b787f1', '#e0ec5c', '#d8d4d4'];

  // Function to pick a random color
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return (
    <section className="ProjectListContainer">
      <h1 className="MyProjectTitle">My Projects</h1>
      <div className="DueTodayContainer"> 
        {projects.map((project) => (
          <Project 
            key={project.id} 
            id={project.id}
            color={getRandomColor()} 
            title={project.projectname}
            description={project.description} 
          />
        ))}
      </div>
    </section>
  );
}

export default MyProjects;

