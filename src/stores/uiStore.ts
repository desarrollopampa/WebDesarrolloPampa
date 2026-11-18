import { defineStore } from 'pinia'
import type { Project } from '@/types/project'

export interface UiState {
  isDark: boolean
  selectedProject: Project | null
  isDrawerOpen: boolean
}

export const useUiStore = defineStore('ui', {
  state: (): UiState => ({
    isDark: false,
    selectedProject: null,
    isDrawerOpen: false,
  }),
  actions: {
    initTheme() {
      if (typeof window === 'undefined') return
      const storedTheme = localStorage.getItem('pampa-theme')
      if (storedTheme !== null) {
        this.isDark = storedTheme === 'dark'
      } else {
        this.isDark = false
      }
      this.applyTheme()
    },
    applyTheme() {
      if (typeof document === 'undefined') return
      if (this.isDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },
    toggleTheme() {
      this.isDark = !this.isDark
      this.applyTheme()
      if (typeof window !== 'undefined') {
        localStorage.setItem('pampa-theme', this.isDark ? 'dark' : 'light')
      }
    },
    openProjectDrawer(project: Project) {
      this.selectedProject = project
      this.isDrawerOpen = true
    },
    closeProjectDrawer() {
      this.isDrawerOpen = false
    },
  },
})
