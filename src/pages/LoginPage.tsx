import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

const registerSchema = loginSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const {
    login,
    register,
    isLoading
  } = useAuth();
  const navigate = useNavigate();

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: ""
    }
  });

  const onLoginSubmit = async (data: LoginFormValues) => {
    try {
      await login(data.email, data.password);
      navigate("/");
    } catch (error) {
      // Error is handled by the AuthContext
    }
  };

  const onRegisterSubmit = async (data: RegisterFormValues) => {
    try {
      await register(data.email, data.password, data.name);
      navigate("/");
    } catch (error) {
      // Error is handled by the AuthContext
    }
  };

  return <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">
              {isLogin ? "Welcome back" : "Create account"}
            </h1>
            <p className="text-muted-foreground">
              {isLogin ? "Enter your credentials to access your account" : "Enter your information to create an account"}
            </p>
          </div>

          {isLogin ? <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                <FormField control={loginForm.control} name="email" render={({
              field
            }) => <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="name@example.com" {...field} className="h-12 text-base" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />
                <FormField control={loginForm.control} name="password" render={({
              field
            }) => <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter your password" {...field} className="h-12 text-base" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />
                <Button type="submit" className="w-full h-12 text-base bg-primary hover:bg-primary/90" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            </Form> : <Form {...registerForm}>
              <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-6">
                <FormField control={registerForm.control} name="name" render={({
              field
            }) => <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} className="h-12 text-base" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />
                <FormField control={registerForm.control} name="email" render={({
              field
            }) => <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="name@example.com" {...field} className="h-12 text-base" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />
                <FormField control={registerForm.control} name="password" render={({
              field
            }) => <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Create a password" {...field} className="h-12 text-base" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />
                <FormField control={registerForm.control} name="confirmPassword" render={({
              field
            }) => <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Confirm your password" {...field} className="h-12 text-base" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />
                <Button type="submit" className="w-full h-12 text-base bg-primary hover:bg-primary/90" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>
              </form>
            </Form>}

          <div className="text-center">
            <Button variant="link" className="text-base" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </Button>
          </div>
        </div>
      </div>

      <div className="hidden md:block w-1/2 bg-primary relative">
        <img 
          alt="Login illustration" 
          src="https://res.cloudinary.com/dz0b5eqof/image/upload/v1739981795/pexels-amar-30792659_w4yn8i.jpg" 
          className="w-full h-full object-cover absolute inset-0"
        />
      </div>
    </div>;
};

export default LoginPage;
