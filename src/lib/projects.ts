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