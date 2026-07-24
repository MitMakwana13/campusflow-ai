export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#080d1a] text-neutral-50 selection:bg-primary-500/30 selection:text-primary-100 font-sans">
      {children}
    </div>
  );
}
