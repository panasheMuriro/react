import PortfolioCard from "./PortfolioCard";

const projects = [
  { id: 1, title: "Project One", description: "A cool project about X." },
  { id: 2, title: "Project Two", description: "Another project about Y." },
  { id: 3, title: "Project Three", description: "Interesting project on Z." },
  { id: 4, title: "Project Four", description: "Creative work on A." },
];

function PortfolioGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <PortfolioCard
          key={project.id}
          title={project.title}
          description={project.description}
        />
      ))}
    </div>
  );
}

export default PortfolioGrid;
