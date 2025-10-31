import { useEffect } from "react";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
console.log(GOOGLE_CLIENT_ID);

function GoogleLogin() {
  useEffect(() => {
    const initializeGoogle = () => {
      if (window.google && window.google.accounts?.id) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: async (response: any) => {
            // ✅ response.credential is the ID token
            const res = await fetch("http://localhost:5000/api/auth/google", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id_token: response.credential }),
            });
            const data = await res.json();
            console.log("✅ Server response:", data);
          },
        });

        // Render Google Sign-In button
        window.google.accounts.id.renderButton(
          document.getElementById("googleSignInDiv"),
          { theme: "outline", size: "large" }
        );
      }
    };

    if (window.google) initializeGoogle();
    else {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogle;
      document.body.appendChild(script);
    }
  }, []);

  return <div id="googleSignInDiv"></div>;
}

export default GoogleLogin;
