"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/_components/ui/form";
import { Input } from "@/_components/ui/input";
import { Button } from "@/_components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { CheckCircle, Link, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { LoginSchemaType } from "@/schema/login.schema";
import { loginSchema } from "@/schema/login.schema";
import { signIn } from "next-auth/react";

const Login = () => {
  const router = useRouter();
    const [isLoading, setIsLoading] = useState(false); 


  const form = useForm<LoginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },

    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  async function handleLogin(values: LoginSchemaType) {
    try {
		 setIsLoading(true);
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
	      console.log("Token:", data.token);
    console.log("User ID:", data.user._id);

      console.log(data);
      toast.success("Event has been created.", {
        position: "top-center",
        icon: <CheckCircle className="text-green-500" />,
        duration: 4000,
      });

      router.push("/");
    } catch (error) {
      toast.error(error.response?.data?.message, {
        position: "top-center",
        icon: <XCircle className="text-red-500" />,
        duration: 4000,
      });
      console.log(error);
	   setIsLoading(false);
    }
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/",
    });
    console.log(res);

    if (res?.ok) {
      toast.success("login success", {
        position: "top-center",
        icon: <CheckCircle className="text-green-500" />,
        duration: 2000,
		
      });

 setTimeout(() => {
    window.location.href = res.url || "/";
  }, 2000);

} else {
      toast.error(res?.error, {
        position: "top-center",
        icon: <XCircle className="text-red-500" />,
        duration: 4000,
      });
    }
  }

  return (
    <div className="mx-auto px-5 w-full md:w-1/2 ">
      <h1 className="text-3xl text-center font-bold my-10">Login</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleLogin)}
          className="space-y-3 text-5xl"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="  text-black">Email:</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" text-black">Password:</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full" type="submit" disabled={isLoading}>
				{isLoading  ? <i className='fa-solid fa-spinner fa-spin'></i> : " "}

            Login
          </Button>
<a
  href="/forgetPassword"
  className="text-xl font-semibold text-black hover:text-green-600 transition-colors duration-300"
>
  forget your password?
</a>
        </form>
      </Form>
    </div>
  );
};

export default Login;
