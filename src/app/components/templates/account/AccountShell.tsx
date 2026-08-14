"use client";

import AccountSidebar from "./AccountSidebar";
import AccountHeader from "./AccountHeader";

interface AccountShellProps {
  children: React.ReactNode;
}

export default function AccountShell({ children }: AccountShellProps) {
  return (
    <div
      className="
        h-screen
        overflow-hidden
        bg-background
        text-foreground
      "
      dir="rtl"
    >
      <div className="flex h-full">
        {/* Sidebar */}
        <AccountSidebar />

        {/* Main */}
        <div
          className="
            flex
            min-w-0
            flex-1
            flex-col
          "
        >
          {/* Header */}
          <AccountHeader />

          {/* Content */}
          <main
            className="
              min-h-0
              flex-1
              overflow-y-auto
              px-4
              py-6
              sm:px-6
              lg:px-8
            "
          >
            <div className="mx-auto w-full max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
