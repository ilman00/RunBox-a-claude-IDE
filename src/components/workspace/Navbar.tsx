import { useState } from 'react';
import { 
  Plus, 
  Search, 
  SlidersHorizontal,
  X,
  Code,
  FileCode,
  Globe,
  Server,
  Smartphone,
  Database,
  Cpu,
  Palette
} from 'lucide-react';

// Interfaces
interface ProjectTemplate {
  id: string;
  name: string;
  icon: typeof Code;
  description: string;
  color: string;
}

interface NewProjectData {
  name: string;
  description: string;
  template: string;
  image: string;
}

interface WorkspaceNavbarProps {
  onCreateProject?: (project: NewProjectData) => void;
}

export default function WorkspaceNavbar({ onCreateProject }: WorkspaceNavbarProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newProject, setNewProject] = useState<NewProjectData>({
    name: '',
    description: '',
    template: '',
    image: ''
  });
  const [errors, setErrors] = useState<{ name?: string; template?: string }>({});
  const [isCreating, setIsCreating] = useState(false);

  // Available templates
  const templates: ProjectTemplate[] = [
    {
      id: 'react',
      name: 'React',
      icon: Code,
      description: 'Modern React app with hooks',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      id: 'vue',
      name: 'Vue.js',
      icon: FileCode,
      description: 'Progressive Vue.js framework',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'nextjs',
      name: 'Next.js',
      icon: Globe,
      description: 'Full-stack React framework',
      color: 'from-gray-600 to-gray-800'
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      icon: Server,
      description: 'Backend API with Express',
      color: 'from-green-600 to-lime-600'
    },
    {
      id: 'python',
      name: 'Python',
      icon: Cpu,
      description: 'Python Flask/Django app',
      color: 'from-blue-600 to-yellow-500'
    },
    {
      id: 'react-native',
      name: 'React Native',
      icon: Smartphone,
      description: 'Cross-platform mobile app',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'express',
      name: 'Express.js',
      icon: Database,
      description: 'RESTful API server',
      color: 'from-gray-700 to-slate-600'
    },
    {
      id: 'html',
      name: 'HTML/CSS/JS',
      icon: Palette,
      description: 'Static website template',
      color: 'from-orange-500 to-red-500'
    }
  ];

  // Preset images based on template
  const getTemplateImage = (templateId: string): string => {
    const imageMap: { [key: string]: string } = {
      react: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
      vue: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=300&fit=crop',
      nextjs: 'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?w=400&h=300&fit=crop',
      nodejs: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop',
      python: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop',
      'react-native': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
      express: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
      html: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=300&fit=crop'
    };
    return imageMap[templateId] || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop';
  };

  const validateForm = (): boolean => {
    const newErrors: { name?: string; template?: string } = {};
    
    if (!newProject.name.trim()) {
      newErrors.name = 'Project name is required';
    } else if (newProject.name.length < 3) {
      newErrors.name = 'Project name must be at least 3 characters';
    }
    
    if (!newProject.template) {
      newErrors.template = 'Please select a template';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateProject = async () => {
    if (!validateForm()) return;

    setIsCreating(true);
    
    // Set image based on template
    const projectData = {
      ...newProject,
      image: getTemplateImage(newProject.template)
    };

    // API Integration Ready
    // try {
    //   const response = await fetch('/api/projects', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(projectData)
    //   });
    //   const data = await response.json();
    //   onCreateProject?.(data);
    // } catch (error) {
    //   console.error('Failed to create project:', error);
    // }

    // Simulate API call
    setTimeout(() => {
      onCreateProject?.(projectData);
      setIsCreating(false);
      handleCloseModal();
    }, 1000);
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
    setNewProject({ name: '', description: '', template: '', image: '' });
    setErrors({});
  };

  const selectTemplate = (templateId: string) => {
    setNewProject({ ...newProject, template: templateId });
    if (errors.template) {
      setErrors({ ...errors, template: undefined });
    }
  };

  return (
    <>
      {/* Navbar */}
      <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-sm border-b border-gray-900">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Title */}
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                My Projects
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Manage and organize your development projects
              </p>
            </div>

            {/* Right: Search & Actions */}
            <div className="flex items-center gap-3">
              {/* Search Bar */}
              <div className="hidden md:flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 focus-within:border-purple-500 transition-all">
                <Search className="w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent outline-none text-sm text-white placeholder-gray-500 w-64"
                />
              </div>

              {/* Filter Button */}
              <button className="p-2.5 bg-gray-900 border border-gray-800 rounded-lg hover:border-purple-500 transition-all">
                <SlidersHorizontal className="w-5 h-5 text-gray-400" />
              </button>

              {/* Create Project Button */}
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">New Project</span>
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-3 flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 focus-within:border-purple-500 transition-all">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none text-sm text-white placeholder-gray-500 w-full"
            />
          </div>
        </div>
      </div>

      {/* Create Project Modal */}
      {isCreateModalOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={handleCloseModal}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 border border-gray-800 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Create New Project</h2>
                  <p className="text-sm text-gray-400 mt-1">
                    Choose a template and get started in seconds
                  </p>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Project Name */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Project Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="my-awesome-project"
                    value={newProject.name}
                    onChange={(e) => {
                      setNewProject({ ...newProject, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                    className={`w-full bg-gray-800 border ${
                      errors.name ? 'border-red-500' : 'border-gray-700'
                    } rounded-lg px-4 py-3 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all text-white`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Description <span className="text-gray-500">(Optional)</span>
                  </label>
                  <textarea
                    placeholder="What's this project about?"
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    rows={3}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all text-white resize-none"
                  />
                </div>

                {/* Template Selection */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-3">
                    Choose Template <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {templates.map((template) => {
                      const Icon = template.icon;
                      const isSelected = newProject.template === template.id;
                      
                      return (
                        <button
                          key={template.id}
                          onClick={() => selectTemplate(template.id)}
                          className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                            isSelected
                              ? 'bg-purple-600/20 border-purple-500 shadow-lg shadow-purple-500/30'
                              : 'bg-gray-800 border-gray-700 hover:border-purple-500/50'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${template.color} flex items-center justify-center mb-3`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <h3 className="font-semibold text-white text-sm mb-1">
                            {template.name}
                          </h3>
                          <p className="text-xs text-gray-400 line-clamp-2">
                            {template.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                  {errors.template && (
                    <p className="text-red-500 text-sm mt-2">{errors.template}</p>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-gray-900 border-t border-gray-800 p-6 flex items-center justify-end gap-3">
                <button
                  onClick={handleCloseModal}
                  className="px-6 py-2.5 bg-gray-800 rounded-lg font-semibold text-white hover:bg-gray-700 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateProject}
                  disabled={isCreating}
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isCreating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Create Project
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}