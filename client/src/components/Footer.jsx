import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 border-t border-gray-700 py-12 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '32px 32px'
                }}></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-6">
                {/* Main Content */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <img src="/noteForgeAiIcon.svg" className="h-8 w-8" alt="" />
                        <span className="text-xl text-white">NoteForge AI</span>
                    </div>
                    <p className="text-gray-300 text-lg mb-1">© 2026 Jahleel Casintahan</p>
                    <p className="text-blue-400 text-sm tracking-wide">Web Developer</p>
                </div>

                {/* Divider */}
                <div className="w-24 h-px bg-linear-to-r from-transparent via-blue-500 to-transparent mx-auto mb-6"></div>

                {/* Social Links */}
                <div className="flex items-center flex-wrap justify-center gap-6">
                    <a
                        href="https://github.com/S3ptusix"
                        target="_blank"
                        className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700 border border-gray-700 hover:border-blue-500 transition-all duration-300"
                    >
                        <Github className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">GitHub</span>
                    </a>
                    <a
                        href="https://github.com/S3ptusix/note2card" // replace with your repo
                        target="_blank"
                        className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700 border border-gray-700 hover:border-blue-500 transition-all duration-300"
                    >
                        <Github className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Source</span>
                    </a>


                    <a
                        href="https://www.linkedin.com/in/jahleel-casintahan-1616023a4/"
                        target="_blank"
                        className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700 border border-gray-700 hover:border-blue-500 transition-all duration-300"
                    >
                        <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">LinkedIn</span>
                    </a>

                    <a
                        href="mailto:jahleelnemuel@gmail.com"
                        className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700 border border-gray-700 hover:border-blue-500 transition-all duration-300"
                    >
                        <Mail className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Email</span>
                    </a>
                </div>

                {/* Tagline */}
                <p className="text-center text-gray-500 text-xs mt-8">
                    Built with passion for better learning experiences
                </p>
            </div>
        </footer>
    );
}