export type Project = {
    id: string;
    name: string;
    url: string;
};

const projects: Project[] = [
    {
        id: '0',
        name: "PR Yazılım",
        url: 'https://www.pryazilim.com',
    },
];

export async function getProjects(): Promise<Project[]> {
    return new Promise((resolve) => {
        resolve(projects);
    });
}

export async function getProjectById(id: string): Promise<Project | null> {
    return new Promise((resolve) => {
        const project = projects.find((p) => p.id === id) || null;
        resolve(project);
    });
}