import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import supabase from "../client";

// ✅ Wrap it all in a function component
export default function ProtectedRoute({ children }) {
  const [session, setSession] = useState(null);
  const [isSessionChecked, setIsSessionChecked] = useState(false);

  useEffect(() => {
    // Check session on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(() => session ?? null);
      setIsSessionChecked(() => true);
    });

    // Listen for changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(() => session ?? null);
      }
    );

    // Clean up listener
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // Still checking session? Show loading
  if (!isSessionChecked) {
    return <div>Loading...</div>;
  } else {
    // ✅ If session exists, render children. If not, redirect to login
    return <>{session ? children : <Navigate to="/login" />}</>;
  }
}
