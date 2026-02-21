export const protectedRoutes = [
  { path: "/app/dashboard", permissions: [], layout: "Layout" },
  { path: "/app/module", permissions: ["VIEW_MODULE_DETAIL"], layout: "Layout" },
  { path: "/app/upload", permissions: ["UPLOAD_MODULES"], layout: "Layout" },
  { path: "/app/settings", permissions: [], layout: "Layout" }
];

export const publicRoutes = [
  { path: "/app/", permissions: [], layout: null },
  { path: "/app/login", permissions: [], layout: null },
  { path: "/app/signup", permissions: [], layout: null },
  { path: "/app/forgot-password", permissions: [], layout: null }
];