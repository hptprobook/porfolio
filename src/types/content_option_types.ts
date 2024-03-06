export interface Meta {
    title: string;
    description: string;
}

export interface IntroData {
    title: string;
    animated: {
        first: string;
        second: string;
        third: string;
    };
    description: string;
    imgUrl: string;
}

export interface DataAbout {
    title: string;
    aboutMe: string;
}

export interface WorkTimelineItem {
    jobTitle: string;
    where: string;
    date: string;
}

export interface Skill {
    name: string;
    value: number;
}

export interface Service {
    title: string;
    description: string;
}

export interface DataPortfolioItem {
    img: string;
    description: string;
    link: string;
}

export interface ContactConfig {
    email: string;
    phone: string;
    description: string;
    serviceId: string;
    templateId: string;
    userId: string;
}

export interface SocialProfiles {
    github: string;
    facebook: string;
    linkedin: string;
    twitter: string;
    youtube?: string;
    twitch?: string;
}
