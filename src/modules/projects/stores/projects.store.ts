import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { Project } from "../interfaces/project.interface";
import { v4 as uuidv4, v4 } from 'uuid';
import { useLocalStorage } from "@vueuse/core";


export const useProjectsStore = defineStore('projects', () => {

    const projects = ref(useLocalStorage<Project[]>('projects', []));

    const addTask = (projectId: string, taskName: string) => {
        if (taskName.trim().length === 0) return;

        const project = projects.value.find(project => project.id === projectId);
        if (!project) return;

        project.tasks.push({
            id: uuidv4(),
            name: taskName,
        });
    }

    const toogleTask = (projectId: string, taskId: string) => {
        const project = projects.value.find(project => project.id === projectId);
        if (!project) return;

        const task = project.tasks.find(task => task.id === taskId);
        if (!task) return;
        task.completeAt = task.completeAt ? undefined : new Date();

    }

    const removeTask = (projectId: string, taskId: string) => {
        console.log(projectId, taskId);
        const project = projects.value.find(project => project.id === projectId);
        if (!project) return;

        const taskIndex = project.tasks.findIndex(task => task.id === taskId);
        if (taskIndex === -1) return;

        project.tasks.splice(taskIndex, 1);
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

    const projectsWithCompletion = computed(() => {
        return projects.value.map(project => {
            const totalTasks = project.tasks.length;
            const completedTasks = project.tasks.filter(task => task.completeAt).length;
            return {
                ...project,
                taskCount: totalTasks,
                completion: totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100
            }
        }
        )
    });

    const removeProject = (projectId: string) => {
        const projectIndex = projects.value.findIndex(project => project.id === projectId);
        if (projectIndex === -1) {
            return;
        }
        projects.value.splice(projectIndex, 1);
    }

    const editNameProject = (projectId: string, newName: string) => {
        const project = projects.value.find(project => project.id === projectId);
        if (!project) {

            return
        };
        project.name = newName;

    }


    return {
        projectsWithCompletion,
        projects,
        emptyProjects: computed(() => projects.value.length === 0),
        projectList: computed(() => [...projects.value]),
        addProject,
        removeProject,
        addTask,
        editNameProject,
        toogleTask,
        removeTask
    };

});
