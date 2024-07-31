import PublicHeader from "@/components/public-header";
import React from "react";

export default function PublicPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PublicHeader />
      <main>{children}</main>
    </>
  );
}
