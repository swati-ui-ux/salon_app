import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-700 shadow-lg  static bottom-0 w-full">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Logo & Description */}
          <div>
            <h2 className="text-2xl font-bold text-white">
              JobTracker
            </h2>
            <p className="mt-3 text-sm text-gray-400">
              Track your job applications, interviews, and career
              progress all in one place.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Quick Links
            </h3>

            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="hover:text-white transition"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="/jobs"
                  className="hover:text-white transition"
                >
                  Jobs
                </a>
              </li>

              <li>
                <a
                  href="/dashboard"
                  className="hover:text-white transition"
                >
                  Dashboard
                </a>
              </li>

              <li>
                <a
                  href="/profile"
                  className="hover:text-white transition"
                >
                  Profile
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Connect
            </h3>

            <div className="flex gap-4 text-2xl">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition"
              >
                <FaGithub />
              </a>

              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition"
              >
                <FaLinkedin />
              </a>

              <a
                href="mailto:example@gmail.com"
                className="hover:text-white transition"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-gray-700 mt-8 pt-5 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} JobTracker. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;