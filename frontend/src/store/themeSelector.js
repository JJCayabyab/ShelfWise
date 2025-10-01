import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: "winter", // default theme
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === "winter" ? "sunset" : "winter";
      console.log(`Theme: ${newTheme}`);
    
      document.documentElement.setAttribute("data-theme", newTheme);
      
      return { theme: newTheme };
    }),
}));
