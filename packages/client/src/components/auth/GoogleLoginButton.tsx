import { useState } from "react";
import { createAuthClient } from "better-auth/client";

const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
});

export default function GoogleLoginButton() {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch (error) {
      console.error("Google login failed:", error);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      disabled={loading}
      style={{
        padding: "12px 24px",
        backgroundColor: "#4285f4",
        color: "white",
        borderRadius: "4px",
        cursor: "pointer",
        alignItems: "center",
        gap: "10px",
      }}
    >
      {loading ? "Signing in ..." : "Continue with Google"}
    </button>
  );
}
