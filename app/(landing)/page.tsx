import { ContainerScroll } from "@/components/container-scroll-animation";
import { HoverBorderGradient } from "@/components/hover-border-gradient";
import { CodeSquareIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function LandingPage() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-transparent">
                CodeSnipShare!
              </span>
              <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Unlock the Power of Code Sharing
              </span>
            </h1>
          </>
        }
      >
        <Image
          src={`/hero_img.png`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
      <div className="px-6 flex flex-col items-center justify-center">
        <p className="md:max-w-[900px] lg:max-w-[1200px] text-3xl">
          Welcome to{" "}
          <span className="font-bold bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-transparent">
            CodeSnipShare
          </span>
          , your go-to platform for discovering, sharing, and collaborating on
          code snippets. Whether you&apos;re a seasoned developer, a coding
          enthusiast, or just starting your programming journey, CodeSnipShare
          offers a rich repository of code snippets across various languages and
          frameworks.
        </p>
        <div className="mt-7 flex justify-center text-center">
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
          >
            <CodeSquareIcon className="size-6" />
            <span>Aceternity UI</span>
          </HoverBorderGradient>
        </div>
      </div>
    </div>
  );
}
