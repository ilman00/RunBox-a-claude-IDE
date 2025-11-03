import { useState } from 'react';
import { 
  Code, 
  MoreVertical, 
  Star, 
  Trash2, 
  Edit3,
  ExternalLink,
  Copy
} from 'lucide-react';

// Interface for type safety
interface Project {
  id: string;
  name: string;
  image: string;
  description?: string;
  language?: string;
  lastModified?: string;
  starred?: boolean;
}

interface ProjectsGridProps {
  onOpenProject?: (projectId: string) => void;
}

export default function ProjectsGrid({ onOpenProject }: ProjectsGridProps) {
  // State management - Replace with API data
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 'proj_1a2b3c',
      name: 'E-Commerce Platform',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=400&h=300&fit=crop',
      description: 'Full-stack shopping application',
      language: 'React',
      lastModified: '2 hours ago',
      starred: true
    },
    {
      id: 'proj_4d5e6f',
      name: 'AI Chat Bot',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
      description: 'Machine learning chatbot interface',
      language: 'Python',
      lastModified: '1 day ago',
      starred: false
    },
    {
      id: 'proj_7g8h9i',
      name: 'Portfolio Website',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      description: 'Personal portfolio with animations',
      language: 'Next.js',
      lastModified: '3 days ago',
      starred: false
    },
    {
      id: 'proj_10j11k',
      name: 'Mobile App Dashboard',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      description: 'Analytics dashboard for mobile apps',
      language: 'Vue.js',
      lastModified: '5 days ago',
      starred: true
    },
    {
      id: 'proj_12l13m',
      name: 'Blockchain Explorer',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop',
      description: 'Cryptocurrency transaction explorer',
      language: 'TypeScript',
      lastModified: '1 week ago',
      starred: false
    },
    {
      id: 'proj_14n15o',
      name: 'Task Management System',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
      description: 'Team collaboration and task tracking',
      language: 'Angular',
      lastModified: '2 weeks ago',
      starred: false
    }
  ]);

  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  // API Integration Ready
  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     const response = await fetch('/api/projects');
  //     const data = await response.json();
  //     setProjects(data);
  //   };
  //   fetchProjects();
  // }, []);

  const toggleStar = (projectId: string) => {
    setProjects(projects.map(p => 
      p.id === projectId ? { ...p, starred: !p.starred } : p
    ));
    // TODO: API call to update starred status
    // await fetch(`/api/projects/${projectId}/star`, { method: 'POST' });
  };

  const copyProjectId = (id: string) => {
    navigator.clipboard.writeText(id);
    // Show toast notification (implement toast system)
    console.log('Project ID copied:', id);
  };

  const handleDelete = (projectId: string) => {
    // TODO: API call to delete project
    // await fetch(`/api/projects/${projectId}`, { method: 'DELETE' });
    setProjects(projects.filter(p => p.id !== projectId));
    setActiveMenu(null);
  };

  const handleEdit = (projectId: string) => {
    // TODO: Navigate to edit page or open modal
    console.log('Edit project:', projectId);
    setActiveMenu(null);
  };

  const handleOpen = (projectId: string) => {
    // Call the parent's navigation handler
    onOpenProject?.(projectId);
  };

  return (
    <div className="w-full">
      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-purple-500 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20"
          >
            {/* Project Image */}
            <div className="relative h-48 overflow-hidden bg-gray-800">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
              
              {/* Star Button */}
              <button
                onClick={() => toggleStar(project.id)}
                className="absolute top-3 right-3 p-2 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/70 transition-all duration-300"
              >
                <Star
                  className={`w-5 h-5 transition-all duration-300 ${
                    project.starred
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-400 hover:text-yellow-400'
                  }`}
                />
              </button>

              {/* Language Badge */}
              {project.language && (
                <div className="absolute top-3 left-3 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-lg text-sm text-purple-400 font-semibold">
                  {project.language}
                </div>
              )}
            </div>

            {/* Project Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">
                    {project.name}
                  </h3>
                  {project.description && (
                    <p className="text-sm text-gray-400 mb-2">
                      {project.description}
                    </p>
                  )}
                </div>

                {/* More Options Menu */}
                <div className="relative">
                  <button
                    onClick={() => setActiveMenu(activeMenu === project.id ? null : project.id)}
                    className="p-1 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>

                  {activeMenu === project.id && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setActiveMenu(null)}
                      />
                      <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-20 overflow-hidden">
                        <button
                          onClick={() => handleEdit(project.id)}
                          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 transition-colors flex items-center gap-2"
                        >
                          <Edit3 className="w-4 h-4" />
                          Edit Project
                        </button>
                        <button
                          onClick={() => copyProjectId(project.id)}
                          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 transition-colors flex items-center gap-2"
                        >
                          <Copy className="w-4 h-4" />
                          Copy ID
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Project ID */}
              <div className="flex items-center gap-2 mb-3">
                <Code className="w-4 h-4 text-gray-500" />
                <span className="text-xs font-mono text-gray-500">
                  {project.id}
                </span>
              </div>

              {/* Last Modified */}
              {project.lastModified && (
                <p className="text-xs text-gray-500 mb-4">
                  Modified {project.lastModified}
                </p>
              )}

              {/* Open Project Button */}
              <button
                onClick={() => handleOpen(project.id)}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 py-2.5 flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Open Project
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {projects.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mb-4">
            <Code className="w-10 h-10 text-gray-700" />
          </div>
          <h3 className="text-xl font-bold text-gray-600 mb-2">
            No Projects Yet
          </h3>
          <p className="text-gray-500 text-center max-w-md">
            Create your first project to get started with Cloud IDE
          </p>
        </div>
      )}
    </div>
  );
}