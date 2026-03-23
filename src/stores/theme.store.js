import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  const isDarkMode = ref(false)
  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value;
    // Cambia el atributo global en tu página (funciona para Bootstrap native y global CSS)
    document.documentElement.setAttribute('data-bs-theme', isDarkMode.value ? 'dark' : 'light');
  }
  return { isDarkMode, toggleTheme }
})