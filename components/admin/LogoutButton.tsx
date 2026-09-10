"use client";

export function LogoutButton() {
  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }
  return (
    <button type="button" onClick={logout} className="text-mist hover:text-ivory">
      Log out
    </button>
  );
}
