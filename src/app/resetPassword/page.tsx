"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from 'react-toastify';
import {  useState } from "react";
import { ScaleLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { resetPasswordFormType, resetPasswordSchema } from "@/schema/resetPassword.schema"
import { resetPasswordAction } from "@/apis/resetPassword"

export default function ResetPassword() {
    const route = useRouter()
    const [isloading, setIsLoading] = useState(false)
    // handle form ==================================================================
    const form = useForm<resetPasswordFormType>({
        defaultValues: {
            email: "",
            newPassword: "",
        }
        ,
        mode: "onTouched",
        resolver: zodResolver(resetPasswordSchema),
    })
    // reset password ========================================================================
    async function resetPassword(values: resetPasswordFormType) {
        setIsLoading(true)
        try {
            const data = await resetPasswordAction(values)
            if (data.token) {
                toast.success("password reseted successfully!", {
                    position: "top-right",
                    autoClose: 2000,
                    theme: "light",
                });
                route.push("/login")
            }else{
                   throw new Error(data.message );
            }   
        } catch (err) {
            toast.error(err.message || "Something went wrong"
                , {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
        } finally {
            setIsLoading(false)
        }

    }
    return (
        <main className="w-full  md:w-2/3 mx-auto pt-20 px-5 ">
            <h2 className="capitalize text-[1.7rem] text-main font-semibold text-center">reset password</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(resetPassword)} className="space-y-8 py-7">
                    {/* email */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="mb-2 gap-0">
                                <FormLabel className="mb-[.7rem]">E-mail</FormLabel>
                                <FormControl>
                                    <Input className=" mb-2 focus-visible:ring-0 focus-visible:outline-none focus-visible:border-main focus:border-main focus:outline-main focus:shadow-[0_0_0_3px_rgba(34,197,94,0.5)]" type="email" placeholder="Enter your email" {...field} />
                                </FormControl>
                                <FormDescription />
                                <FormMessage className="bg-[#F8D7DA] px-3 py-1 rounded-xl text-[#581528] text-[1rem] border border-[#f7bfc4]" />
                            </FormItem>
                        )}
                    />
                    {/* password */}
                    <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem className="mb-3 gap-0">
                                <FormLabel className="mb-[.7rem]">password</FormLabel>
                                <FormControl>
                                    <section className="relative">
                                        <Input className=" mb-3 focus-visible:ring-0 focus-visible:outline-none focus-visible:border-main focus:border-main focus:outline-main focus:shadow-[0_0_0_3px_rgba(34,197,94,0.5)]" type={"password"} placeholder="Enter your password" {...field} />
                                    </section>
                                </FormControl>
                                <FormDescription />
                                <FormMessage className="bg-[#F8D7DA] px-3 py-1 rounded-xl text-[#581528] text-[1rem] border border-[#f7bfc4]" />
                            </FormItem>
                        )}
                    />
                    <section className="flex items-center mb-2 gap-3">
                        <Button disabled={isloading} type="submit"  >{isloading ? <ScaleLoader height={20}
                            width={4} color="#fff" /> : "reset password"}</Button>
                    </section>

                </form>
            </Form>
            <title>reset password</title>
        </main>

    )
}