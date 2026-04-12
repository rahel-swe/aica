import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <header className="border-b bg-white">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold">AICA</h1>
          <div className="flex gap-3">
            <Link to="/sign-in">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link to="/sign-up">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <h2 className="text-4xl font-bold p-5">Welcome to AICA</h2>
        <h2 className="text-2xl font-bold">
          Choose Your Future with Confidence
        </h2>
        <p className="mt-4 max-w-xl text-gray-600">
          Our system helps students find the best university faculty based on
          their exam results, interests, and abilities.
        </p>

        <div className="mt-6 flex gap-4">
          <Link to="/sign-up">
            <Button size="lg">Create Account</Button>
          </Link>
          <Link to="/sign-in">
            <Button size="lg" variant="outline">
              Sign In
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} AICA
      </footer>
    </div>
  );
}
