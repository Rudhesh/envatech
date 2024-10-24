"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { addData } from "../../../../actions/actions";
import Image from "next/image";
import { useLocale } from "next-intl";

interface FormData {
  realname: string;
  email: string;
  role: string;
  password: string;
}
const inputStyles = `
  w-full 
  border 
  border-gray-300 
  dark:text-white 
  text-black 
  rounded 
  px-2 
  py-2 
  mb-4 
  focus:outline-none 
  focus:border-blue-400 
  focus:text-black
`;

const Signup = () => {
  const router = useRouter();
  const { toast } = useToast();
  const locale = useLocale();

  const [formData, setFormData] = useState<FormData>({
    realname: "",
    email: "",
    role: "", // Default role for signup
    password: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  async function clientAction(data: any) {
    const result = await addData(data);
    if (result) {
      if ("error" in result) {
        toast({
          title: "There was a problem with your request.",
          description: result.error,
        });
      } else {
        // Reset the form on successful save
        setFormData({
          realname: "",
          email: "",
          role: "",
          password: "",
        });

        toast({
          title: "Data saved successfully.",
          description: "Your user profile has been created.",
        });
        router.push("/login");
      }
    }
  }
  return (
    <div className="flex flex-col h-screen">
      <Image
        className="p-2 mx-5"
        src={"/logo-Envotech(1).png"}
        height={125}
        width={125}
        alt="Envotech Logo"
      />
      <div className="flex justify-center mt-20">
        <div className="w-[450px]">
          <div className=" border bg-slate-50 shadow-xl flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 rounded">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <div className="flex justify-center ">
                <h1 className="mt-2 text-center text-xl font-bold  mb-2  leading-9 tracking-tight  text-gray-900">
                  BMT DATA HUB
                </h1>
              </div>

              <h2 className="mt-2 text-center text-xl  mb-10  leading-9 tracking-tight text-gray-900">
                Sign Up
              </h2>
            </div>
            <form action={clientAction}>
              <input
                name="realname"
                type="text"
                className={inputStyles}
                placeholder="Name"
                value={formData.realname}
                onChange={handleInputChange}
                required
              />

              <input
                name="email"
                type="text"
                className={inputStyles}
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />

              <div>
                <select
                  name="role"
                  className={inputStyles}
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="user">Guest</option>
                </select>
              </div>
              <input
                name="password"
                type="password"
                className={inputStyles}
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-[#384D6C] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#303f57] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#303f57]"
                >
                  {" "}
                  Button
                </button>
              </div>
            </form>

            <button
              className="text-sm text-[#384D6C] hover:underline focus:outline-none focus:underline"
              onClick={() => router.push(`/${locale}/login`)}
            >
              Login
            </button>

            <p className="mt-10 text-center text-sm text-gray-500">
              <a
                href="#"
                className="font-semibold leading-6 text-red-600 hover:text-[#303f57]"
              >
                Ecotech
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
