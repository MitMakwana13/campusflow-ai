import { BrainCircuit } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080d1a] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="w-full max-w-md p-8 card card-glass relative z-10 animate-in fade-in zoom-in-95 duration-500">
        
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-12 h-12 bg-primary-900/50 border border-primary-500/30 rounded-xl flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
            <BrainCircuit className="w-6 h-6 text-primary-400" />
          </div>
          <h1 className="text-2xl font-display font-bold text-neutral-50">CampusFlow AI</h1>
          <p className="text-neutral-400 text-sm mt-1">Enterprise Campus Operating System</p>
        </div>

        <form className="space-y-4">
          <div className="input-wrapper">
            <label className="input-label">University Email</label>
            <input type="email" className="input" placeholder="dr.sharma@aurouniversity.edu.in" defaultValue="dr.sharma@aurouniversity.edu.in" />
          </div>
          
          <div className="input-wrapper">
            <div className="flex justify-between items-center">
              <label className="input-label">Password</label>
              <a href="#" className="text-xs text-primary-400 hover:text-primary-300">Forgot?</a>
            </div>
            <input type="password" className="input" placeholder="••••••••" defaultValue="password123" />
          </div>

          <div className="pt-2">
            <Link href="/" className="btn btn-primary w-full shadow-[0_0_20px_rgba(99,102,241,0.3)]">
              Sign In to Dashboard
            </Link>
          </div>
        </form>
        
        <div className="mt-6 text-center text-xs text-neutral-500">
          <p>By signing in, you agree to AURO University's IT policies.</p>
        </div>
      </div>
    </div>
  );
}
