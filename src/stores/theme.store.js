import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  const isDarkMode = ref(false)
  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value;
    
    document.documentElement.setAttribute('data-bs-theme', isDarkMode.value ? 'dark' : 'light');
  }
  return { isDarkMode, toggleTheme }
})