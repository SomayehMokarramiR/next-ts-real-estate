"use client";

import AccountSidebar from "./AccountSidebar";
import AccountHeader from "./AccountHeader";

interface AccountShellProps {
  children: React.ReactNode;
}

export default function AccountShell({ children }: AccountShellProps) {
  return (
    <div
      className="h-screen overflow-hidden bg-[#F7F8FA] dark:bg-[#1F1F1F]"
      dir="rtl"
    >
      <div className="flex h-full">
        {/* Sidebar */}
        <AccountSidebar />

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Header - ثابت */}
          <AccountHeader />

          {/* فقط محتوای صفحه اسکرول می‌شود */}
          <main className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
