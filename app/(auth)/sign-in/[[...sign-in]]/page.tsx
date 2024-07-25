"use client";
import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";
import { Loader2, Wallet } from "lucide-react";
import Lottie from "react-lottie";
import programming1 from "@/public/animation-data/programming1.json";

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="flex flex-col items-center justify-center mt-10">
          <div className="mb-6">
            <h1 className="text-center text-2xl md:text-3xl font-bold mb-3">
              Welcome Back!
            </h1>
            <p className="max-w-[580px] text-base text-muted-foreground text-center">
              Login or create new account to create and explore code snippets
              with{" "}
              <span className="bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-transparent">
                CodeSnipShare
              </span>
            </p>
          </div>
          <ClerkLoading>
            <Loader2 className="animate-spin w-[40px] h-[40px]" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignIn />
          </ClerkLoaded>
        </div>
      </div>
      <div className="h-full hidden bg-gradient-to-b from-blue-500 to-violet-600 lg:flex flex-col items-center justify-center px-4">
        <div>
          <Lottie
            options={{
              loop: true,
              animationData: programming1,
              autoplay: true,
              rendererSettings: {
                preserveAspectRatio: "xMidYMid slice",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
