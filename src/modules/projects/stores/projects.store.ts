import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { Project } from "../interfaces/project.interface";
import { v4 as uuidv4, v4 } from 'uuid';
import { useLocalStorage } from "@vueuse/core";


export const useProjectsStore = defineStore('projects', () => {

    const projects = ref(useLocalStorage<Project[]>('projects', []));
    const addTask = (projectId: string, taskName: string) => {
        const project = projects.value.find(project => project.id === projectId);
        if (!project) {
            return;
        }
        project.tasks.push({
            id: v4(),
            name: taskName,
        });
    }
    const addProject = (projectName: string) => {
        if (projectName.length === 0) {
            return;
        }
        projects.value.push({
            id: uuidv4(),
            name: projectName,
            tasks: []
        });
    }
    return {
        projects,
        emptyProjects: computed(() => projects.value.length === 0),
        addProject,
        addTask,
        projectList: computed(() => [...projects.value])
    };

});
