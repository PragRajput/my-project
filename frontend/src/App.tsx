import { useState, useEffect } from 'react'
import { Users, UserPlus, Loader2, AlertCircle, Sparkles, CheckCircle2, Mail, User as UserIcon, Trash2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface User {
  id: number;
  name: string;
  email: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState({ name: false, email: false });

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchUsers();
  }, []);

  // Validate name field
  const validateName = (name: string): string | undefined => {
    if (!name.trim()) {
      return 'Name is required';
    }
    if (name.trim().length < 2) {
      return 'Name must be at least 2 characters';
    }
    if (name.trim().length > 50) {
      return 'Name must be less than 50 characters';
    }
    if (!/^[a-zA-Z\s'-]+$/.test(name)) {
      return 'Name can only contain letters, spaces, hyphens, and apostrophes';
    }
    return undefined;
  };

  // Validate email field
  const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) {
      return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    if (users.some(user => user.email.toLowerCase() === email.toLowerCase())) {
      return 'This email is already registered';
    }
    return undefined;
  };

  // Handle name change with validation
  const handleNameChange = (value: string) => {
    setNewUserName(value);
    if (touched.name) {
      const error = validateName(value);
      setValidationErrors(prev => ({ ...prev, name: error }));
    }
  };

  // Handle email change with validation
  const handleEmailChange = (value: string) => {
    setNewUserEmail(value);
    if (touched.email) {
      const error = validateEmail(value);
      setValidationErrors(prev => ({ ...prev, email: error }));
    }
  };

  // Handle field blur
  const handleBlur = (field: 'name' | 'email') => {
    setTouched(prev => ({ ...prev, [field]: true }));
    if (field === 'name') {
      const error = validateName(newUserName);
      setValidationErrors(prev => ({ ...prev, name: error }));
    } else {
      const error = validateEmail(newUserEmail);
      setValidationErrors(prev => ({ ...prev, email: error }));
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/users`);
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const nameError = validateName(newUserName);
    const emailError = validateEmail(newUserEmail);

    if (nameError || emailError) {
      setValidationErrors({ name: nameError, email: emailError });
      setTouched({ name: true, email: true });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newUserName.trim(),
          email: newUserEmail.trim(),
        }),
      });
      if (!response.ok) throw new Error('Failed to add user');
      const newUser = await response.json();
      setUsers([...users, newUser]);
      setNewUserName('');
      setNewUserEmail('');
      setValidationErrors({});
      setTouched({ name: false, email: false });
      setError(null);

      // Show success animation
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = (userId: number) => {
    setDeletingId(userId);
    setTimeout(() => {
      setUsers(users.filter(u => u.id !== userId));
      setDeletingId(null);
    }, 300);
  };

  const getGradientColor = (index: number) => {
    const gradients = [
      'from-blue-500 to-cyan-500',
      'from-purple-500 to-pink-500',
      'from-orange-500 to-red-500',
      'from-green-500 to-emerald-500',
      'from-indigo-500 to-purple-500',
      'from-yellow-500 to-orange-500',
    ];
    return gradients[index % gradients.length];
  };

  const isFormValid = !validationErrors.name && !validationErrors.email && newUserName && newUserEmail;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-float-delay"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300/10 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        {/* Header with animation */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="h-8 w-8 text-yellow-500 animate-pulse" />
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient leading-tight py-2">
              Full Stack Application with CI/CD
            </h1>
            <Sparkles className="h-8 w-8 text-pink-500 animate-pulse" />
          </div>
          <p className="text-xl text-slate-700 dark:text-slate-200 font-medium animate-slide-up mb-6">
            React TypeScript + Node.js Express TypeScript with CI/CD
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full absolute"></div>
              <span className="ml-2 font-medium">Live</span>
            </div>
            <span className="mx-2">•</span>
            <span className="font-medium">{users.length} Users Online</span>
          </div>
        </div>

        {/* Success notification */}
        {showSuccess && (
          <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
            <Card className="border-green-500 bg-green-50 dark:bg-green-950 shadow-2xl">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                  <CheckCircle2 className="h-5 w-5 animate-bounce" />
                  <p className="font-semibold">User added successfully!</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Error Alert with animation */}
        {error && (
          <Card className="mb-6 border-red-500 bg-red-50 dark:bg-red-950 animate-shake shadow-xl">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
                <AlertCircle className="h-5 w-5 animate-pulse" />
                <p className="font-semibold">{error}</p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Add User Form with enhanced animations */}
          <Card className="shadow-2xl hover:shadow-3xl transition-all duration-500 border-2 hover:border-blue-400 dark:hover:border-blue-600 animate-slide-in-left backdrop-blur-sm bg-white/95 dark:bg-gray-900/95 hover:scale-[1.02] transform">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg shadow-lg animate-pulse-glow">
                  <UserPlus className="h-6 w-6 text-white" />
                </div>
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Add New User
                </span>
              </CardTitle>
              <CardDescription className="text-base text-slate-600 dark:text-slate-400">
                Create a new user by filling in their information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddUser} className="space-y-6">
                <div className="space-y-2 group">
                  <label htmlFor="name" className="text-sm font-semibold flex items-center gap-2 text-slate-700 dark:text-slate-200">
                    <UserIcon className="h-4 w-4" />
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={newUserName}
                    onChange={(e) => handleNameChange(e.target.value)}
                    onBlur={() => handleBlur('name')}
                    disabled={isSubmitting}
                    className={`transition-all duration-300 focus:ring-4 focus:scale-[1.02] border-2 ${
                      validationErrors.name && touched.name
                        ? 'border-red-500 focus:ring-red-300 dark:focus:ring-red-700'
                        : 'focus:ring-blue-300 dark:focus:ring-blue-700'
                    }`}
                  />
                  {validationErrors.name && touched.name && (
                    <p className="text-sm text-red-600 dark:text-red-400 font-medium animate-shake flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {validationErrors.name}
                    </p>
                  )}
                </div>
                <div className="space-y-2 group">
                  <label htmlFor="email" className="text-sm font-semibold flex items-center gap-2 text-slate-700 dark:text-slate-200">
                    <Mail className="h-4 w-4" />
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={newUserEmail}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    onBlur={() => handleBlur('email')}
                    disabled={isSubmitting}
                    className={`transition-all duration-300 focus:ring-4 focus:scale-[1.02] border-2 ${
                      validationErrors.email && touched.email
                        ? 'border-red-500 focus:ring-red-300 dark:focus:ring-red-700'
                        : 'focus:ring-blue-300 dark:focus:ring-blue-700'
                    }`}
                  />
                  {validationErrors.email && touched.email && (
                    <p className="text-sm text-red-600 dark:text-red-400 font-medium animate-shake flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {validationErrors.email}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={isSubmitting || !isFormValid}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Adding User...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-5 w-5" />
                      Add User
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Users List with enhanced animations */}
          <Card className="shadow-2xl hover:shadow-3xl transition-all duration-500 border-2 hover:border-purple-400 dark:hover:border-purple-600 animate-slide-in-right backdrop-blur-sm bg-white/95 dark:bg-gray-900/95 hover:scale-[1.02] transform">
            <CardHeader className="space-y-3 pb-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-lg animate-pulse-glow">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Users List
                  </span>
                </CardTitle>
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950 px-4 py-2 rounded-full border border-purple-200 dark:border-purple-800 shadow-sm">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold text-sm shadow-md">
                    {users.length}
                  </span>
                  <span className="text-purple-700 dark:text-purple-300 font-semibold text-sm">
                    {users.length === 1 ? 'User' : 'Users'} Registered
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex flex-col items-center justify-center py-16 space-y-4">
                  <Loader2 className="h-12 w-12 animate-spin text-purple-600" />
                  <p className="text-slate-600 dark:text-slate-400 animate-pulse font-medium">Loading users...</p>
                </div>
              ) : users.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="text-6xl animate-bounce">👥</div>
                  <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">No users found. Add your first user!</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  {users.map((user, index) => (
                    <div
                      key={user.id}
                      className={`group p-5 rounded-xl border-2 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-950 dark:hover:to-pink-950 transition-all duration-500 hover:shadow-xl hover:scale-[1.02] hover:border-purple-400 dark:hover:border-purple-600 cursor-pointer animate-slide-in-up ${
                        deletingId === user.id ? 'animate-slide-out-right opacity-0' : ''
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className={`h-14 w-14 rounded-full bg-gradient-to-br ${getGradientColor(index)} flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                              {user.name}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteUser(user.id)}
                          className="opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-100 dark:hover:bg-red-950 hover:text-red-600 hover:scale-110"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Footer */}
        <div className="mt-16 text-center space-y-6 animate-fade-in">
          <div className="flex items-center justify-center gap-3 text-sm text-slate-600 dark:text-slate-400">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-600"></div>
            <Sparkles className="h-4 w-4 text-yellow-500" />
            <p className="font-semibold text-slate-700 dark:text-slate-300">Tech Stack</p>
            <Sparkles className="h-4 w-4 text-pink-500" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent via-slate-300 to-transparent dark:via-slate-600"></div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-950 dark:to-cyan-950 text-blue-700 dark:text-blue-300 rounded-full font-bold border border-blue-200 dark:border-blue-800 shadow-sm hover:shadow-md transition-shadow">
              ⚛️ React 18
            </span>
            <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-950 dark:to-indigo-950 text-blue-700 dark:text-blue-300 rounded-full font-bold border border-blue-200 dark:border-blue-800 shadow-sm hover:shadow-md transition-shadow">
              📘 TypeScript
            </span>
            <span className="px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-950 dark:to-emerald-950 text-green-700 dark:text-green-300 rounded-full font-bold border border-green-200 dark:border-green-800 shadow-sm hover:shadow-md transition-shadow">
              🚀 Express
            </span>
            <span className="px-4 py-2 bg-gradient-to-r from-cyan-100 to-sky-100 dark:from-cyan-950 dark:to-sky-950 text-cyan-700 dark:text-cyan-300 rounded-full font-bold border border-cyan-200 dark:border-cyan-800 shadow-sm hover:shadow-md transition-shadow">
              🎨 Tailwind CSS
            </span>
            <span className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950 text-purple-700 dark:text-purple-300 rounded-full font-bold border border-purple-200 dark:border-purple-800 shadow-sm hover:shadow-md transition-shadow">
              ✨ shadcn/ui
            </span>
            <span className="px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-950 dark:to-red-950 text-orange-700 dark:text-orange-300 rounded-full font-bold border border-orange-200 dark:border-orange-800 shadow-sm hover:shadow-md transition-shadow">
              🔄 CI/CD
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            Built with modern technologies and deployed with GitHub Actions
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
