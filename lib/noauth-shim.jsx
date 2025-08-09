"use client";
import React from "react";

// Components (render as public)
export const SignedIn = ({ children }) => <>{children}</>;
export const SignedOut = ({ children }) => null;
export const ClerkProvider = ({ children }) => <>{children}</>;
export const UserButton = () => null;
export const SignInButton = () => null;
export const SignUpButton = () => null;

// Client hooks
export const useAuth = () => ({ isSignedIn: true, userId: "public", getToken: async () => null });
export const useUser = () => ({ isSignedIn: true, user: null });

// Server helpers
export const auth = () => ({ userId: "public", sessionId: null });
export const currentUser = async () => null;
