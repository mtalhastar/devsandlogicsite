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
  X as XIcon
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
  is_published: boolean;
  created_date?: string;
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('messages');
  const [showForm, setShowForm] = useState(false);
  const [editingStudy, setEditingStudy] = useState<CaseStudy | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
    is_published: true
  });

  const queryClient = useQueryClient();

  // Fetch data
  const { data: messages = [], isLoading: loadingMessages } = useQuery({
    queryKey: ['contactMessages'],
    queryFn: async () => {
      const res = await fetch('/api/contacts/get');
      const json = await res.json();
      return json.data || [];
    }
  });

  const { data: caseStudies = [], isLoading: loadingStudies } = useQuery({
    queryKey: ['caseStudies'],
    queryFn: async () => {
      const res = await fetch('/api/case-studies/get');
      const json = await res.json();
      return json.data || [];
    }
  });

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
      is_published: true
    });
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
      is_published: study.is_published !== false
    });
    setShowForm(true);
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
                      ? `${messages.length} total, ${unreadCount} unread` 
                      : `${caseStudies.length} case studies`}
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
                    className={`group p-5 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:shadow-lg ${
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
                      <div className="flex-1 min-w-0">
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
                        <p className="text-gray-300 leading-relaxed mb-3">{msg.message}</p>
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
                      <Button 
                        onClick={() => setShowForm(true)}
                        className="bg-gradient-to-r from-purple-600 to-violet-600"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Case Study
                      </Button>
                    </div>
                  ) : (
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
                />
              )}
            </>
          )}
        </div>
      </main>
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
  removeOutcome
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
              <Input
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                className="bg-white/5 border-white/10 text-white focus:border-purple-500/50 focus:ring-purple-500/20"
                placeholder="AWS, Azure, GCP..."
                required
              />
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Role</label>
              <Input
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="bg-white/5 border-white/10 text-white focus:border-purple-500/50 focus:ring-purple-500/20"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Icon</label>
              <Select value={formData.icon} onValueChange={(v) => setFormData({ ...formData, icon: v })}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-purple-500/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map(icon => (
                    <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Color Theme</label>
              <Select value={formData.gradient} onValueChange={(v) => setFormData({ ...formData, gradient: v })}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-purple-500/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {gradientOptions.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
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
              {formData.technologies.map((tech, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    placeholder="Category (e.g., Cloud)"
                    value={tech.category}
                    onChange={(e) => {
                      const newTechs = [...formData.technologies];
                      newTechs[idx].category = e.target.value;
                      setFormData({ ...formData, technologies: newTechs });
                    }}
                    className="bg-white/5 border-white/10 text-white focus:border-purple-500/50 w-1/3"
                  />
                  <Input
                    placeholder="Value (e.g., AWS, EKS, Lambda)"
                    value={tech.value}
                    onChange={(e) => {
                      const newTechs = [...formData.technologies];
                      newTechs[idx].value = e.target.value;
                      setFormData({ ...formData, technologies: newTechs });
                    }}
                    className="bg-white/5 border-white/10 text-white focus:border-purple-500/50 flex-1"
                  />
                  <Button type="button" size="icon" variant="ghost" className="text-red-400" onClick={() => removeTechnology(idx)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
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