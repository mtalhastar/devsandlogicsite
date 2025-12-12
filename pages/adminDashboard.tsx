import { useState } from 'react';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { 
  Plus, 
  Mail, 
  FileText, 
  Trash2, 
  Eye, 
  EyeOff,
  Check,
  X,
  ArrowLeft,
  Save,
  Clock,
  User,
  MessageSquare,
  LayoutDashboard,
  TrendingUp,
  Inbox,
  Sparkles,
  Menu,
  X as XIcon,
  Database,
  Upload,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { format } from 'date-fns';

const iconOptions = ["Cloud", "Shield", "ShoppingCart", "Code", "Truck", "Database", "Server", "Globe", "Zap", "Lock"];
const gradientOptions = [
  { value: "from-blue-500 to-cyan-500", label: "Blue/Cyan" },
  { value: "from-purple-500 to-pink-500", label: "Purple/Pink" },
  { value: "from-emerald-500 to-teal-500", label: "Emerald/Teal" },
  { value: "from-orange-500 to-amber-500", label: "Orange/Amber" },
  { value: "from-violet-500 to-purple-500", label: "Violet/Purple" }
];

// Platform options
const platformOptions = [
  "AWS", "Azure", "GCP", "Cloud", "Full Stack", "Frontend", "Backend", 
  "Mobile", "AI", "FinTech", "Healthcare", "E-Commerce", "SaaS", 
  "Platform", "Logistics", "DevOps", "Web", "Other"
];

// Role options
const roleOptions = [
  "Lead Cloud Architect & DevOps Engineer",
  "Cloud Security Architect",
  "Senior DevOps Engineer",
  "Platform Engineer",
  "Big Data Cloud Architect",
  "Senior Cloud Architect",
  "Cloud Data Architect",
  "Cloud Migration Architect",
  "DevOps Architect",
  "FinOps Engineer",
  "Full Stack Developer",
  "AI Engineer",
  "Backend Developer",
  "Frontend Developer",
  "Mobile Developer",
  "Software Engineer",
  "Solutions Architect",
  "Other"
];

// Technology category options
const technologyCategoryOptions = [
  "Cloud Platform",
  "Frontend",
  "Backend",
  "Database",
  "DevOps",
  "Container",
  "Monitoring",
  "Security",
  "CI/CD",
  "Infrastructure",
  "AI/ML",
  "Mobile",
  "Other"
];

// Technology value options by category
const technologyValueOptions: Record<string, string[]> = {
  "Cloud Platform": [
    "AWS", "Azure", "GCP", "DigitalOcean", "Vercel", "Netlify", "Heroku"
  ],
  "Frontend": [
    "React", "Next.js", "Vue.js", "Angular", "TypeScript", "JavaScript",
    "Tailwind CSS", "shadcn/ui", "Framer Motion", "HTML5", "CSS3"
  ],
  "Backend": [
    "Node.js", "Express", "Python", "Django", "Flask", "FastAPI",
    "Java", "Spring Boot", "Go", "Rust", "PHP", "Ruby on Rails"
  ],
  "Database": [
    "MongoDB", "PostgreSQL", "MySQL", "Redis", "DynamoDB", "Firebase",
    "Supabase", "Elasticsearch", "OpenSearch", "InfluxDB"
  ],
  "DevOps": [
    "Docker", "Kubernetes", "Terraform", "Ansible", "Jenkins", "GitHub Actions",
    "GitLab CI", "CircleCI", "ArgoCD", "Helm", "Istio"
  ],
  "Container": [
    "Docker", "Kubernetes", "EKS", "AKS", "GKE", "ECS", "Fargate",
    "Podman", "Containerd"
  ],
  "Monitoring": [
    "Prometheus", "Grafana", "Datadog", "New Relic", "Sentry", "CloudWatch",
    "Azure Monitor", "Stackdriver", "ELK Stack"
  ],
  "Security": [
    "AWS IAM", "Azure AD", "OAuth", "JWT", "mTLS", "WAF", "Cloudflare",
    "Vault", "Key Vault", "OPA"
  ],
  "CI/CD": [
    "GitHub Actions", "GitLab CI", "Jenkins", "CircleCI", "Travis CI",
    "Azure DevOps", "Bamboo", "TeamCity"
  ],
  "Infrastructure": [
    "Terraform", "CloudFormation", "Pulumi", "Ansible", "Chef", "Puppet",
    "Vagrant", "Packer"
  ],
  "AI/ML": [
    "OpenAI", "GPT-4", "LangChain", "TensorFlow", "PyTorch", "Scikit-learn",
    "Pinecone", "Hugging Face", "Claude"
  ],
  "Mobile": [
    "React Native", "Flutter", "Swift", "Kotlin", "Ionic", "Xamarin"
  ],
  "Other": []
};

type CaseStudy = {
  id: string;
  title: string;
  short_description: string;
  platform: string;
  role?: string;
  icon: string;
  gradient: string;
  challenge: string;
  solutions: Array<{ title: string; description: string }>;
  technologies: Array<{ category: string; value: string }>;
  outcomes: string[];
  imageUrl?: string;
  is_published: boolean;
  created_date?: string;
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('messages');
  const [showForm, setShowForm] = useState(false);
  const [editingStudy, setEditingStudy] = useState<CaseStudy | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMessageId, setExpandedMessageId] = useState<string | null>(null);
  const [messagesPage, setMessagesPage] = useState(1);
  const [caseStudiesPage, setCaseStudiesPage] = useState(1);
  const itemsPerPage = 5;
  const [formData, setFormData] = useState({
    title: '',
    short_description: '',
    platform: '',
    role: '',
    icon: 'Cloud',
    gradient: 'from-blue-500 to-cyan-500',
    challenge: '',
    solutions: [{ title: '', description: '' }],
    technologies: [{ category: '', value: '' }],
    outcomes: [''],
    imageUrl: '',
    is_published: true
  });
  const [uploadingImage, setUploadingImage] = useState(false);

  const queryClient = useQueryClient();

  // Fetch data with pagination
  const { data: messagesData, isLoading: loadingMessages } = useQuery({
    queryKey: ['contactMessages', messagesPage],
    queryFn: async () => {
      const res = await fetch(`/api/contacts/get?page=${messagesPage}&limit=${itemsPerPage}`);
      const json = await res.json();
      return { data: json.data || [], count: json.count || 0 };
    }
  });

  const messages = messagesData?.data || [];
  const messagesTotal = messagesData?.count || 0;
  const messagesTotalPages = Math.ceil(messagesTotal / itemsPerPage);

  const { data: caseStudiesData, isLoading: loadingStudies } = useQuery({
    queryKey: ['caseStudies', caseStudiesPage],
    queryFn: async () => {
      const res = await fetch(`/api/case-studies/get?page=${caseStudiesPage}&limit=${itemsPerPage}`);
      const json = await res.json();
      return { data: json.data || [], count: json.count || 0 };
    }
  });

  const caseStudies = caseStudiesData?.data || [];
  const caseStudiesTotal = caseStudiesData?.count || 0;
  const caseStudiesTotalPages = Math.ceil(caseStudiesTotal / itemsPerPage);

  // Mutations
  const createStudyMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch('/api/case-studies/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create case study');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['caseStudies'] });
      resetForm();
    }
  });

  const updateStudyMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const res = await fetch(`/api/case-studies/update?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to update case study');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['caseStudies'] });
      resetForm();
    }
  });

  const deleteStudyMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/case-studies/delete?id=${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete case study');
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['caseStudies'] })
  });

  const markReadMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/contacts/mark-read?id=${id}`, {
        method: 'PUT',
      });
      if (!res.ok) throw new Error('Failed to mark message as read');
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['contactMessages'] })
  });

  const deleteMessageMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/contacts/delete?id=${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete message');
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['contactMessages'] })
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await fetch(`/api/contacts/update-status?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Failed to update message status');
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['contactMessages'] })
  });

  const resetForm = () => {
    setShowForm(false);
    setEditingStudy(null);
    setFormData({
      title: '',
      short_description: '',
      platform: '',
      role: '',
      icon: 'Cloud',
      gradient: 'from-blue-500 to-cyan-500',
      challenge: '',
      solutions: [{ title: '', description: '' }],
      technologies: [{ category: '', value: '' }],
      outcomes: [''],
      imageUrl: '',
      is_published: true
    });
    setUploadingImage(false);
  };

  const handleEditStudy = (study: CaseStudy) => {
    setEditingStudy(study);
    setFormData({
      title: study.title || '',
      short_description: study.short_description || '',
      platform: study.platform || '',
      role: study.role || '',
      icon: study.icon || 'Cloud',
      gradient: study.gradient || 'from-blue-500 to-cyan-500',
      challenge: study.challenge || '',
      solutions: study.solutions?.length > 0 ? study.solutions : [{ title: '', description: '' }],
      technologies: study.technologies?.length > 0 ? study.technologies : [{ category: '', value: '' }],
      outcomes: study.outcomes?.length > 0 ? study.outcomes : [''],
      imageUrl: study.imageUrl || '',
      is_published: study.is_published !== false
    });
    setShowForm(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      alert('Image size must be less than 10MB');
      return;
    }

    setUploadingImage(true);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('image', file);

      const response = await fetch('/api/upload/image', {
        method: 'POST',
        body: uploadFormData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to upload image');
      }

      setFormData({ ...formData, imageUrl: result.url });
    } catch (error: any) {
      console.error('Error uploading image:', error);
      alert(`Error uploading image: ${error.message}`);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanedData = {
      ...formData,
      solutions: formData.solutions.filter(s => s.title && s.description),
      technologies: formData.technologies.filter(t => t.category && t.value),
      outcomes: formData.outcomes.filter(o => o.trim())
    };

    if (editingStudy) {
      updateStudyMutation.mutate({ id: editingStudy.id, data: cleanedData });
    } else {
      createStudyMutation.mutate(cleanedData);
    }
  };

  const addSolution = () => setFormData({ ...formData, solutions: [...formData.solutions, { title: '', description: '' }] });
  const removeSolution = (idx) => setFormData({ ...formData, solutions: formData.solutions.filter((_, i) => i !== idx) });
  
  const addTechnology = () => setFormData({ ...formData, technologies: [...formData.technologies, { category: '', value: '' }] });
  const removeTechnology = (idx) => setFormData({ ...formData, technologies: formData.technologies.filter((_, i) => i !== idx) });
  
  const addOutcome = () => setFormData({ ...formData, outcomes: [...formData.outcomes, ''] });
  const removeOutcome = (idx) => setFormData({ ...formData, outcomes: formData.outcomes.filter((_, i) => i !== idx) });

  const unreadCount = messages.filter(m => !m.is_read).length;

  return (
    <div className="min-h-screen bg-[#0a0a0f] w-full overflow-hidden">
      {/* Ambient background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[100px]" />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 bottom-0 w-64 bg-[#12121a] border-r border-white/5 z-40 transition-transform duration-300 flex flex-col ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:z-20`}>
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-violet-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold">Devs & Logics</h1>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-lg hover:bg-white/5 text-gray-400"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => {
                setActiveTab('messages');
                setSidebarOpen(false);
                setMessagesPage(1);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'messages' 
                  ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Inbox className="w-5 h-5" />
              <span>Messages</span>
              {unreadCount > 0 && (
                <span className="ml-auto px-2 py-0.5 text-xs font-medium bg-red-500 text-white rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              onClick={() => {
                setActiveTab('casestudies');
                setSidebarOpen(false);
                setCaseStudiesPage(1);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'casestudies' 
                  ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <FileText className="w-5 h-5" />
              <span>Case Studies</span>
              <span className="ml-auto text-xs text-gray-500">{caseStudies.length}</span>
            </button>
          </nav>
        </div>

        <div className="p-6 border-t border-white/5 bg-[#12121a] flex-shrink-0">
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white hover:bg-white/5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Website
            </Button>
          </Link>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-[#12121a] border border-white/5 text-white hover:bg-white/5 transition-colors shadow-lg"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen w-full lg:w-[80%] relative z-10">
        {/* Top Header */}
        <header className="sticky top-0 z-10 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5 lg:top-0">
          <div className="px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="lg:hidden">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-violet-600 flex items-center justify-center">
                    <LayoutDashboard className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">
                    {activeTab === 'messages' ? 'Messages' : 'Case Studies'}
                  </h1>
                  <p className="text-sm text-gray-500">
                    {activeTab === 'messages' 
                      ? `${messagesTotal} total, ${unreadCount} unread` 
                      : `${caseStudiesTotal} case studies`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link href="/" className="lg:hidden">
                  <Button variant="ghost" size="sm" className="text-gray-400">
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                </Link>
                {activeTab === 'casestudies' && !showForm && (
                  <Button 
                    onClick={() => setShowForm(true)}
                    className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 shadow-lg shadow-purple-500/25"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New Case Study
                  </Button>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 lg:p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20 backdrop-blur-sm overflow-hidden relative">
                <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full blur-2xl" />
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm font-medium">Total Messages</p>
                      <p className="text-3xl font-bold text-[#8C35EB] mt-1">{messages.length}</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-purple-500/20 ring-1 ring-purple-500/30">
                      <MessageSquare className="w-6 h-6 text-purple-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-600/5 border-blue-500/20 backdrop-blur-sm overflow-hidden relative">
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl" />
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm font-medium">Unread</p>
                      <p className="text-3xl font-bold text-[#8C35EB] mt-1">{unreadCount}</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-blue-500/20 ring-1 ring-blue-500/30">
                      <Mail className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-gradient-to-br from-emerald-500/10 to-teal-600/5 border-emerald-500/20 backdrop-blur-sm overflow-hidden relative">
                <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full blur-2xl" />
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm font-medium">Case Studies</p>
                      <p className="text-3xl font-bold text-[#8C35EB] mt-1">{caseStudies.length}</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-emerald-500/20 ring-1 ring-emerald-500/30">
                      <TrendingUp className="w-6 h-6 text-emerald-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Messages Content */}
          {activeTab === 'messages' && (
            <div className="space-y-4">
              {loadingMessages ? (
                <div className="flex items-center justify-center py-20">
                  <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                    <Inbox className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">No messages yet</h3>
                  <p className="text-gray-500">Messages from your contact form will appear here</p>
                </div>
              ) : (
                messages.map((msg, idx) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`group p-5 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:shadow-lg overflow-hidden ${
                      msg.is_read 
                        ? 'bg-white/[0.02] border-white/5 hover:border-white/10' 
                        : 'bg-purple-500/5 border-purple-500/20 hover:border-purple-500/40 shadow-lg shadow-purple-500/5'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${
                        msg.is_read ? 'bg-gray-800 text-gray-400' : 'bg-gradient-to-br from-purple-600 to-violet-600 text-white'
                      }`}>
                        {msg.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0 overflow-hidden">
                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                          <span className="font-semibold text-white">{msg.name}</span>
                          {!msg.is_read && (
                            <span className="px-2 py-0.5 text-xs font-medium bg-purple-500 text-white rounded-full">
                              New
                            </span>
                          )}
                          {msg.status && (
                            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                              msg.status === 'Done' 
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : msg.status === 'Progress'
                                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                : 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                            }`}>
                              {msg.status}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-500 mb-3 flex-wrap">
                          <a href={`mailto:${msg.email}`} className="hover:text-purple-400 transition-colors truncate">
                            {msg.email}
                          </a>
                          <span>•</span>
                          <span className="flex-shrink-0">{format(new Date(msg.created_date), 'MMM d, h:mm a')}</span>
                        </div>
                        <div className="mb-3 break-words">
                          {(() => {
                            const words = msg.message.split(' ');
                            const wordLimit = 20;
                            const isLong = words.length > wordLimit;
                            const truncatedText = isLong ? words.slice(0, wordLimit).join(' ') + '...' : msg.message;
                            const isExpanded = expandedMessageId === msg.id;
                            
                            return (
                              <>
                                <p 
                                  className="text-gray-300 leading-relaxed break-words overflow-wrap-anywhere"
                                  style={{
                                    wordBreak: 'break-word',
                                    overflowWrap: 'break-word',
                                    maxWidth: '100%'
                                  }}
                                >
                                  {isExpanded ? msg.message : truncatedText}
                                </p>
                                {isLong && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setExpandedMessageId(isExpanded ? null : msg.id);
                                    }}
                                    className="text-xs text-purple-400 hover:text-purple-300 mt-1 transition-colors font-medium"
                                  >
                                    {isExpanded ? 'Show less' : 'Show more'}
                                  </button>
                                )}
                              </>
                            );
                          })()}
                        </div>
                        <div className="flex items-center gap-2">
                          <Select
                            value={msg.status || 'Received'}
                            onValueChange={(value) => updateStatusMutation.mutate({ id: msg.id, status: value })}
                          >
                            <SelectTrigger className="h-8 w-[140px] bg-white/5 border-white/10 text-white text-xs hover:bg-white/10">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-[#12121a] border-white/10">
                              <SelectItem value="Received" className="text-white focus:bg-white/10">Received</SelectItem>
                              <SelectItem value="Progress" className="text-white focus:bg-white/10">Progress</SelectItem>
                              <SelectItem value="Done" className="text-white focus:bg-white/10">Done</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {!msg.is_read && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-9 w-9 p-0 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10"
                            onClick={() => markReadMutation.mutate(msg.id)}
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-9 w-9 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          onClick={() => deleteMessageMutation.mutate(msg.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
              {/* Messages Pagination */}
              {messagesTotal > 0 && messagesTotalPages > 0 && (
                <Pagination
                  currentPage={messagesPage}
                  totalPages={messagesTotalPages}
                  onPageChange={setMessagesPage}
                />
              )}
            </div>
          )}

          {/* Case Studies Content */}
          {activeTab === 'casestudies' && (
            <>
              {!showForm ? (
                <div className="space-y-4">
                  {loadingStudies ? (
                    <div className="flex items-center justify-center py-20">
                      <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : caseStudies.length === 0 ? (
                    <div className="text-center py-20">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                        <FileText className="w-8 h-8 text-purple-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">No case studies yet</h3>
                      <p className="text-gray-500 mb-6">Create your first case study to showcase your work</p>
                      <div className="flex gap-4 justify-center">
                        <Button 
                          onClick={() => setShowForm(true)}
                          className="bg-gradient-to-r from-purple-600 to-violet-600"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Create Case Study
                        </Button>
                        <Button
                          onClick={async () => {
                            if (confirm('This will add all case studies from the static data file to the database. Continue?')) {
                              try {
                                const res = await fetch('/api/case-studies/seed', { method: 'POST' });
                                const result = await res.json();
                                if (res.ok) {
                                  alert(`Success! ${result.added} case studies added, ${result.skipped} skipped.`);
                                  queryClient.invalidateQueries({ queryKey: ['caseStudies'] });
                                } else {
                                  alert(`Error: ${result.message}`);
                                }
                              } catch (error: any) {
                                alert(`Error: ${error.message}`);
                              }
                            }
                          }}
                          variant="outline"
                          className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                        >
                          <Database className="w-4 h-4 mr-2" />
                          Seed from Static Data
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Seed Database Button */}
                      <div className="mb-4 flex justify-end">
                        <Button
                          onClick={async () => {
                            if (confirm('This will add all case studies from the static data file to the database. Continue?')) {
                              try {
                                const res = await fetch('/api/case-studies/seed', { method: 'POST' });
                                const result = await res.json();
                                if (res.ok) {
                                  alert(`Success! ${result.added} case studies added, ${result.skipped} skipped.`);
                                  queryClient.invalidateQueries({ queryKey: ['caseStudies'] });
                                } else {
                                  alert(`Error: ${result.message}`);
                                }
                              } catch (error: any) {
                                alert(`Error: ${error.message}`);
                              }
                            }
                          }}
                          variant="outline"
                          className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                        >
                          <Database className="w-4 h-4 mr-2" />
                          Seed Database from Static Data
                        </Button>
                      </div>
                      <div className="grid gap-4">
                        {caseStudies.map((study, idx) => (
                        <motion.div
                          key={study.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="group p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-4 flex-1">
                              <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${study.gradient || 'from-purple-500 to-violet-500'} flex items-center justify-center`}>
                                <FileText className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="px-2.5 py-1 text-xs font-medium bg-purple-500/20 text-purple-300 rounded-lg border border-purple-500/30">
                                    {study.platform}
                                  </span>
                                  {study.is_published ? (
                                    <span className="px-2.5 py-1 text-xs font-medium bg-emerald-500/20 text-emerald-300 rounded-lg border border-emerald-500/30 flex items-center gap-1">
                                      <Eye className="w-3 h-3" /> Live
                                    </span>
                                  ) : (
                                    <span className="px-2.5 py-1 text-xs font-medium bg-gray-500/20 text-gray-400 rounded-lg border border-gray-500/30 flex items-center gap-1">
                                      <EyeOff className="w-3 h-3" /> Draft
                                    </span>
                                  )}
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-purple-400 transition-colors">
                                  {study.title}
                                </h3>
                                <p className="text-gray-500 text-sm line-clamp-2">{study.short_description}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
                                onClick={() => handleEditStudy(study)}
                              >
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-9 w-9 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                onClick={() => deleteStudyMutation.mutate(study.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                      </div>
                      {/* Case Studies Pagination */}
                      {caseStudiesTotal > 0 && caseStudiesTotalPages > 0 && (
                        <Pagination
                          currentPage={caseStudiesPage}
                          totalPages={caseStudiesTotalPages}
                          onPageChange={setCaseStudiesPage}
                        />
                      )}
                    </>
                  )}
                </div>
              ) : (
                <CaseStudyForm
                  formData={formData}
                  setFormData={setFormData}
                  onSubmit={handleSubmit}
                  onCancel={resetForm}
                  isEditing={!!editingStudy}
                  isLoading={createStudyMutation.isPending || updateStudyMutation.isPending}
                  addSolution={addSolution}
                  removeSolution={removeSolution}
                  addTechnology={addTechnology}
                  removeTechnology={removeTechnology}
                  addOutcome={addOutcome}
                  removeOutcome={removeOutcome}
                  onImageUpload={handleImageUpload}
                  uploadingImage={uploadingImage}
                />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

function Pagination({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (page: number) => void }) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-white/5 border-white/10 text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </Button>
      
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, idx) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${idx}`} className="px-2 text-gray-500">
                ...
              </span>
            );
          }
          
          const pageNum = page as number;
          return (
            <Button
              key={pageNum}
              variant={currentPage === pageNum ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(pageNum)}
              className={
                currentPage === pageNum
                  ? "bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white border-0"
                  : "bg-white/5 border-white/10 text-white hover:bg-white/10"
              }
            >
              {pageNum}
            </Button>
          );
        })}
      </div>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-white/5 border-white/10 text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </Button>
      
      <span className="ml-4 text-sm text-gray-500">
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
}

function CaseStudyForm({ 
  formData, 
  setFormData, 
  onSubmit, 
  onCancel, 
  isEditing, 
  isLoading,
  addSolution,
  removeSolution,
  addTechnology,
  removeTechnology,
  addOutcome,
  removeOutcome,
  onImageUpload,
  uploadingImage
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Card className="bg-white/[0.02] border-white/5 backdrop-blur-sm">
        <CardHeader className="border-b border-white/5">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-violet-600 flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            {isEditing ? 'Edit Case Study' : 'New Case Study'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Title *</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-white/5 border-white/10 text-white focus:border-purple-500/50 focus:ring-purple-500/20"
                required
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Platform *</label>
              <Select 
                value={formData.platform} 
                onValueChange={(v) => setFormData({ ...formData, platform: v })}
              >
                <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-purple-500/50 hover:bg-white/10">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent className="bg-[#12121a] border-white/10">
                  {platformOptions.map((platform) => (
                    <SelectItem key={platform} value={platform} className="text-white focus:bg-white/10 focus:text-white">
                      {platform}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">Short Description *</label>
            <Textarea
              value={formData.short_description}
              onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
              className="bg-white/5 border-white/10 text-white focus:border-purple-500/50 focus:ring-purple-500/20"
              rows={2}
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Case Study Image</label>
            <div className="space-y-3">
              {formData.imageUrl && (
                <div className="relative group">
                  <img 
                    src={formData.imageUrl} 
                    alt="Case study preview" 
                    className="w-full h-48 object-cover rounded-lg border border-white/10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setFormData({ ...formData, imageUrl: '' })}
                    className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
              <div className="flex items-center gap-3">
                <label className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onImageUpload}
                    className="hidden"
                    disabled={uploadingImage}
                  />
                  <div className="flex items-center justify-center gap-2 px-4 py-3 border border-dashed border-white/20 rounded-lg cursor-pointer hover:border-purple-500/50 transition-colors bg-white/5">
                    {uploadingImage ? (
                      <>
                        <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm text-gray-400">Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-gray-400">
                          {formData.imageUrl ? 'Change Image' : 'Upload Image'}
                        </span>
                      </>
                    )}
                  </div>
                </label>
                {formData.imageUrl && (
                  <Input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="Or paste image URL"
                    className="flex-1 bg-white/5 border-white/10 text-white focus:border-purple-500/50 focus:ring-purple-500/20"
                  />
                )}
              </div>
              <p className="text-xs text-gray-500">Upload an image or paste a URL. Max size: 10MB</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Role</label>
              <Select 
                value={formData.role} 
                onValueChange={(v) => setFormData({ ...formData, role: v })}
              >
                <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-purple-500/50 hover:bg-white/10">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="bg-[#12121a] border-white/10">
                  {roleOptions.map((role) => (
                    <SelectItem key={role} value={role} className="text-white focus:bg-white/10 focus:text-white">
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Icon</label>
              <Select value={formData.icon} onValueChange={(v) => setFormData({ ...formData, icon: v })}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-purple-500/50 hover:bg-white/10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#12121a] border-white/10">
                  {iconOptions.map(icon => (
                    <SelectItem key={icon} value={icon} className="text-white focus:bg-white/10 focus:text-white">{icon}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Color Theme</label>
              <Select value={formData.gradient} onValueChange={(v) => setFormData({ ...formData, gradient: v })}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-purple-500/50 hover:bg-white/10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#12121a] border-white/10">
                  {gradientOptions.map(opt => (
                    <SelectItem key={opt.value} value={opt.value} className="text-white focus:bg-white/10 focus:text-white">{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">Challenge *</label>
            <Textarea
              value={formData.challenge}
              onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
              className="bg-white/5 border-white/10 text-white focus:border-purple-500/50 focus:ring-purple-500/20"
              rows={4}
              required
            />
          </div>

          {/* Solutions */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-gray-400">Solutions</label>
              <Button type="button" size="sm" variant="ghost" className="text-purple-400" onClick={addSolution}>
                <Plus className="w-4 h-4 mr-1" /> Add
              </Button>
            </div>
            <div className="space-y-3">
              {formData.solutions.map((sol, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    placeholder="Title"
                    value={sol.title}
                    onChange={(e) => {
                      const newSols = [...formData.solutions];
                      newSols[idx].title = e.target.value;
                      setFormData({ ...formData, solutions: newSols });
                    }}
                    className="bg-white/5 border-white/10 text-white focus:border-purple-500/50 w-1/3"
                  />
                  <Input
                    placeholder="Description"
                    value={sol.description}
                    onChange={(e) => {
                      const newSols = [...formData.solutions];
                      newSols[idx].description = e.target.value;
                      setFormData({ ...formData, solutions: newSols });
                    }}
                    className="bg-white/5 border-white/10 text-white focus:border-purple-500/50 flex-1"
                  />
                  <Button type="button" size="icon" variant="ghost" className="text-red-400" onClick={() => removeSolution(idx)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-gray-400">Technologies</label>
              <Button type="button" size="sm" variant="ghost" className="text-purple-400" onClick={addTechnology}>
                <Plus className="w-4 h-4 mr-1" /> Add
              </Button>
            </div>
            <div className="space-y-3">
              {formData.technologies.map((tech, idx) => {
                const categoryOptions = tech.category ? technologyValueOptions[tech.category] || [] : [];
                const isUsingCustomInput = tech.value === "__custom__" || tech.category === "Other";
                const showCustomInput = isUsingCustomInput || (tech.value && !categoryOptions.includes(tech.value) && tech.value !== "");
                
                return (
                  <div key={idx} className="flex gap-2">
                    <Select
                      value={tech.category}
                      onValueChange={(v) => {
                        const newTechs = [...formData.technologies];
                        newTechs[idx].category = v;
                        // Reset value when category changes
                        newTechs[idx].value = '';
                        setFormData({ ...formData, technologies: newTechs });
                      }}
                    >
                      <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-purple-500/50 hover:bg-white/10 w-1/3">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#12121a] border-white/10">
                        {technologyCategoryOptions.map((category) => (
                          <SelectItem key={category} value={category} className="text-white focus:bg-white/10 focus:text-white">
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {showCustomInput ? (
                      <Input
                        placeholder="Enter technology name"
                        value={tech.value === "__custom__" ? "" : tech.value}
                        onChange={(e) => {
                          const newTechs = [...formData.technologies];
                          newTechs[idx].value = e.target.value;
                          setFormData({ ...formData, technologies: newTechs });
                        }}
                        className="bg-white/5 border-white/10 text-white focus:border-purple-500/50 flex-1"
                      />
                    ) : (
                      <Select
                        value={tech.value}
                        onValueChange={(v) => {
                          const newTechs = [...formData.technologies];
                          if (v === "__custom__") {
                            newTechs[idx].value = "__custom__";
                          } else {
                            newTechs[idx].value = v;
                          }
                          setFormData({ ...formData, technologies: newTechs });
                        }}
                        disabled={!tech.category}
                      >
                        <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-purple-500/50 hover:bg-white/10 flex-1">
                          <SelectValue placeholder={tech.category ? "Select technology" : "Select category first"} />
                        </SelectTrigger>
                        <SelectContent className="bg-[#12121a] border-white/10">
                          {tech.category && categoryOptions.length > 0 && (
                            <>
                              {categoryOptions.map((value) => (
                                <SelectItem key={value} value={value} className="text-white focus:bg-white/10 focus:text-white">
                                  {value}
                                </SelectItem>
                              ))}
                              <SelectItem value="__custom__" className="text-purple-400 focus:bg-purple-500/20 focus:text-purple-300">+ Custom value</SelectItem>
                            </>
                          )}
                        </SelectContent>
                      </Select>
                    )}
                    {showCustomInput && tech.category !== "Other" && (
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className="text-purple-400"
                        onClick={() => {
                          const newTechs = [...formData.technologies];
                          newTechs[idx].value = '';
                          setFormData({ ...formData, technologies: newTechs });
                        }}
                      >
                        Use dropdown
                      </Button>
                    )}
                    <Button type="button" size="icon" variant="ghost" className="text-red-400" onClick={() => removeTechnology(idx)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Outcomes */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-gray-400">Business Outcomes</label>
              <Button type="button" size="sm" variant="ghost" className="text-purple-400" onClick={addOutcome}>
                <Plus className="w-4 h-4 mr-1" /> Add
              </Button>
            </div>
            <div className="space-y-3">
              {formData.outcomes.map((outcome, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    placeholder="Outcome"
                    value={outcome}
                    onChange={(e) => {
                      const newOutcomes = [...formData.outcomes];
                      newOutcomes[idx] = e.target.value;
                      setFormData({ ...formData, outcomes: newOutcomes });
                    }}
                    className="bg-white/5 border-white/10 text-white focus:border-purple-500/50 flex-1"
                  />
                  <Button type="button" size="icon" variant="ghost" className="text-red-400" onClick={() => removeOutcome(idx)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Published Toggle */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.is_published}
              onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
              className="w-4 h-4"
            />
            <label className="text-gray-300">Publish on website</label>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel} className="border-white/10 text-gray-300 hover:bg-white/5">
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading} className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 shadow-lg shadow-purple-500/25">
          <Save className="w-4 h-4 mr-2" />
          {isEditing ? 'Update' : 'Create'} Case Study
        </Button>
      </div>
    </form>
  );
}