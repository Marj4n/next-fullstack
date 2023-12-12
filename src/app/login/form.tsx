"use client";

import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export const LoginForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    username: "",
    password: "",
    confirmPass: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await axios.post("/api/register", formValues);

      setLoading(false);

      if (res.data.success) {
        setFormValues({
          name: "",
          username: "",
          password: "",
          confirmPass: "",
        });

        toast({
          title: "Success",
          description: "Account created successfully.",
          variant: "success",
        });

        setTimeout(() => {
          router.push("/login");
          router.refresh();
        }, 500);
      } else {
        toast({
          title: "Error",
          description: res.data.message || "An error occurred.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      setLoading(false);
      console.error("Error registering user:", error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Your username
        </label>
        <input
          type="text"
          name="username"
          value={formValues.username}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Username"
          required
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formValues.password}
            onChange={handleChange}
            placeholder="Password"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>
      <button
        style={loading ? { cursor: "not-allowed" } : { cursor: "pointer" }}
        type="submit"
        disabled={loading}
        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        {loading ? "loading..." : "Sign In"}
      </button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Dont have an account?{" "}
        <Link
          href="/register"
          className="text-primary-600 hover:text-primary-700 dark:hover:text-primary-500 hover:underline"
        >
          Register
        </Link>
      </p>
    </form>
  );
};
