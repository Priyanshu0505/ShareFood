import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom"; // useNavigate import kiya redirection ke liye
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, Mail, Lock, User, Phone, Building2, Utensils, Users, Car, HandHeart, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import API from "@/lib/api"; // Humara custom Axios configuration
import { useAuth } from "@/components/providers/auth-provider"; // Custom Auth Context

const userRoles = [
  { value: "donor", label: "Food Donor", icon: HandHeart, description: "Donate surplus food from home, hotels or events" },
  { value: "ngo", label: "Food Receiver (NGO)", icon: Building2, description: "Register organization to receive food donations" }
];

export default function Login() {
  const { toast } = useToast();
  const navigate = useNavigate(); // Redirection helper initialize kiya
  const { login } = useAuth(); // AuthContext ka login function nikala
  
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
    organization: "",
    address: "",
    agreeToTerms: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. ACTUAL LOGIN BACKEND CALL
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await API.post("/auth/login", {
        email: loginData.email,
        password: loginData.password
      });

      // Global context aur localstorage me user + token data store karega
      login(response.data.token, response.data.user);

      toast({
        title: "Login Successful! 🎉",
        description: `Welcome back, ${response.data.user.name}!`,
      });

      // Form reset aur home/dashboard page par transfer
      setLoginData({ email: "", password: "", rememberMe: false });
      navigate("/"); 
      
    } catch (error: any) {
      toast({
        title: "Login Failed ❌",
        description: error.response?.data?.msg || "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 2. ACTUAL SIGNUP BACKEND CALL
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Please make sure your passwords match.",
        variant: "destructive"
      });
      return;
    }

    if (!signupData.agreeToTerms) {
      toast({
        title: "Terms & Conditions",
        description: "Please agree to our terms and conditions to continue.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Backend User model me 'name' field hai, isliye fullName ko name ki tarah bhej rahe hain
      const response = await API.post("/auth/signup", {
        name: signupData.fullName,
        email: signupData.email,
        password: signupData.password,
        role: signupData.role // donor / ngo / volunteer etc.
      });

      const selectedRole = userRoles.find(role => role.value === signupData.role);
      
      toast({
        title: "Account Created Successfully! 🎉",
        description: `Welcome to ShareFood! Your ${selectedRole?.label} account is now active. Please Login.`,
      });

      // Sign up ke baad input clear karo aur direct Login view tab par switch kar do
      setSignupData({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: "",
        organization: "",
        address: "",
        agreeToTerms: false
      });
      setActiveTab("login");

    } catch (error: any) {
      toast({
        title: "Registration Failed ❌",
        description: error.response?.data?.msg || "Account creation failed.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (form: string, field: string, value: string | boolean) => {
    if (form === "login") {
      setLoginData(prev => ({ ...prev, [field]: value }));
    } else {
      setSignupData(prev => ({ ...prev, [field]: value }));
    }
  };

  const isLoginValid = loginData.email && loginData.password;
  const isSignupValid = signupData.fullName && signupData.email && signupData.phone && 
                       signupData.password && signupData.confirmPassword && signupData.role && 
                       signupData.agreeToTerms;

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-md mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <Link to="/" className="flex items-center justify-center space-x-2 mb-6">
                <div className="rounded-lg bg-gradient-primary p-3">
                  <Heart className="h-8 w-8 text-primary-foreground" />
                </div>
                <span className="text-2xl font-display font-bold text-foreground">
                  ShareFood
                </span>
              </Link>
              <h1 className="text-3xl font-bold mb-2">Join Our Mission</h1>
              <p className="text-muted-foreground">
                Save food, share hope, and fight hunger together
              </p>
            </div>

            <Card className="card-gradient">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <CardHeader>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Login Form */}
                  <TabsContent value="login" className="space-y-4">
                    <CardDescription className="text-center">
                      Welcome back! Sign in to continue your impact.
                    </CardDescription>
                    
                    <form onSubmit={handleLoginSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="loginEmail">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="loginEmail"
                            type="email"
                            placeholder="your@email.com"
                            value={loginData.email}
                            onChange={(e) => handleInputChange("login", "email", e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="loginPassword">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="loginPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={loginData.password}
                            onChange={(e) => handleInputChange("login", "password", e.target.value)}
                            className="pl-10 pr-10"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground"
                          >
                            {showPassword ? <EyeOff /> : <Eye />}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="rememberMe"
                            checked={loginData.rememberMe}
                            onCheckedChange={(checked) => handleInputChange("login", "rememberMe", !!checked)}
                          />
                          <Label htmlFor="rememberMe" className="text-sm">Remember me</Label>
                        </div>
                        <Button variant="link" className="text-sm p-0 h-auto">
                          Forgot password?
                        </Button>
                      </div>

                      <Button
                        type="submit"
                        disabled={!isLoginValid || isSubmitting}
                        className="w-full btn-hero"
                      >
                        {isSubmitting ? "Signing in..." : "Sign In"}
                      </Button>
                    </form>
                  </TabsContent>

                  {/* Signup Form */}
                  <TabsContent value="signup" className="space-y-4">
                    <CardDescription className="text-center">
                      Create your account and start making a difference today!
                    </CardDescription>
                    
                    <form onSubmit={handleSignupSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signupRole">I want to join as *</Label>
                        <Select value={signupData.role} onValueChange={(value) => handleInputChange("signup", "role", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                          <SelectContent>
                            {userRoles.map((role) => (
                              <SelectItem key={role.value} value={role.value}>
                                <div className="flex items-center gap-2">
                                  <role.icon className="h-4 w-4" />
                                  <div>
                                    <div className="font-medium">{role.label}</div>
                                    <div className="text-xs text-muted-foreground">{role.description}</div>
                                  </div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="signupName">Full Name *</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="signupName"
                              placeholder="Your full name"
                              value={signupData.fullName}
                              onChange={(e) => handleInputChange("signup", "fullName", e.target.value)}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="signupPhone">Phone Number *</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="signupPhone"
                              placeholder="+91 9876543210"
                              value={signupData.phone}
                              onChange={(e) => handleInputChange("signup", "phone", e.target.value)}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signupEmail">Email Address *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signupEmail"
                            type="email"
                            placeholder="your@email.com"
                            value={signupData.email}
                            onChange={(e) => handleInputChange("signup", "email", e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      {(signupData.role === "ngo" || signupData.role === "restaurant") && (
                        <div className="space-y-2">
                          <Label htmlFor="organization">Organization Name</Label>
                          <div className="relative">
                            <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="organization"
                              placeholder="Your organization name"
                              value={signupData.organization}
                              onChange={(e) => handleInputChange("signup", "organization", e.target.value)}
                              className="pl-10"
                            />
                          </div>
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          placeholder="City, State, Pincode"
                          value={signupData.address}
                          onChange={(e) => handleInputChange("signup", "address", e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="signupPassword">Password *</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="signupPassword"
                              type={showPassword ? "text" : "password"}
                              placeholder="Create password"
                              value={signupData.password}
                              onChange={(e) => handleInputChange("signup", "password", e.target.value)}
                              className="pl-10 pr-10"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground"
                            >
                              {showPassword ? <EyeOff /> : <Eye />}
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm Password *</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="confirmPassword"
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirm password"
                              value={signupData.confirmPassword}
                              onChange={(e) => handleInputChange("signup", "confirmPassword", e.target.value)}
                              className="pl-10 pr-10"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground"
                            >
                              {showConfirmPassword ? <EyeOff /> : <Eye />}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="agreeToTerms"
                          checked={signupData.agreeToTerms}
                          onCheckedChange={(checked) => handleInputChange("signup", "agreeToTerms", !!checked)}
                          className="mt-1"
                        />
                        <Label htmlFor="agreeToTerms" className="text-sm leading-relaxed">
                          I agree to ShareFood's{" "}
                          <Button variant="link" className="text-sm p-0 h-auto">
                            Terms & Conditions
                          </Button>
                          {" "}and{" "}
                          <Button variant="link" className="text-sm p-0 h-auto">
                            Privacy Policy
                          </Button>
                        </Label>
                      </div>

                      <Button
                        type="submit"
                        disabled={!isSignupValid || isSubmitting}
                        className="w-full btn-hero"
                      >
                        {isSubmitting ? "Creating Account..." : "Create Account"}
                      </Button>
                    </form>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>

            {/* Social Login */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground mb-4">Or continue with</p>
              <div className="flex gap-4 justify-center">
                <Button variant="outline" className="flex-1">
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="flex-1">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}