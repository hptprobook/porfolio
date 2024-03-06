import {
    ContactConfig,
    DataAbout,
    DataPortfolioItem,
    IntroData,
    Meta,
    Service,
    Skill,
    SocialProfiles,
    WorkTimelineItem,
} from "./types/content_option_types";

const logotext: string = "HPT";
const meta: Meta = {
    title: "Phan Thanh Hoa",
    description:
        "I’m Phan Thanh Hoa Back-end web developer,currently working in Buon Me Thuot City",
};

const introData: IntroData = {
    title: "I’m Phan Hoa",
    animated: {
        first: "I love coding",
        second: "I code cool websites",
        third: "I developer server for app",
    },
    description:
        "As a dedicated back-end developer, I specialize in PHP, JavaScript, and Node.js, with deep knowledge in MySQL and MongoDB. Experienced in RESTful APIs, microservices, and cloud platforms like AWS and Firebase, I focus on crafting secure, scalable back-end solutions. Committed to continuous improvement and keen on the latest trends, I excel in problem-solving to enhance server-side user experiences.",
    imgUrl: "https://images.pexels.com/photos/1852389/pexels-photo-1852389.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
};

const dataAbout: DataAbout = {
    title: "About Myself",
    aboutMe:
        "I am a passionate software engineer with a strong focus on back-end development. I thrive in fast-paced environments and am committed to delivering high-quality, scalable solutions that meet and exceed project requirements. With expertise in languages such as PHP, JavaScript, and Node.js, and a solid background in databases like MySQL and MongoDB, I am well-versed in creating efficient and secure back-end functionalities. My experience extends to RESTful API integration, microservices architecture, and leveraging cloud services (AWS, Firebase) to enhance application performance. I am constantly seeking new challenges and opportunities to grow professionally, aiming to contribute significantly to the tech industry with innovative solutions.",
};

const workTimeline: WorkTimelineItem[] = [
    {
        jobTitle: "Fullstack developer",
        where: "NASA",
        date: "2018",
    },
    {
        jobTitle: "Hacker",
        where: "Google",
        date: "2019",
    },
    {
        jobTitle: "Tester",
        where: "Facebook",
        date: "2020",
    },
];

const skills: Skill[] = [
    {
        name: "HTML5 & CSS3",
        value: 80,
    },
    {
        name: "Javascript",
        value: 60,
    },
    {
        name: "PHP",
        value: 60,
    },
    {
        name: "React",
        value: 60,
    },
    {
        name: "Redux",
        value: 60,
    },
    {
        name: "NextJs",
        value: 50,
    },
    {
        name: "NodeJS",
        value: 50,
    },
    {
        name: "Laravel",
        value: 60,
    },
    {
        name: "MySQL",
        value: 70,
    },
    {
        name: "MongoDB",
        value: 50,
    },
];

const services: Service[] = [
    {
        title: "UI & UX Design",
        description:
            "Crafting visually appealing and user-friendly interfaces, focusing on creating intuitive user experiences. Utilizes the latest design principles and tools to ensure that every aspect of the product is accessible and enjoyable for the user.",
    },
    {
        title: "Front-end Development",
        description:
            "Specializing in building responsive, high-performance web applications using modern front-end technologies like HTML5, CSS3, JavaScript, and frameworks such as React or NextJs. Ensures a seamless user experience across all devices.",
    },
    {
        title: "Back-end Development",
        description:
            "Developing robust, scalable back-end systems that support web applications. Proficient in server-side languages such as Node.js, Laravel, and in working with databases like MySQL and MongoDB. Focuses on creating secure, efficient APIs and handling server-side logic.",
    },
];

const dataPortfolio: DataPortfolioItem[] = [
    {
        img: "https://picsum.photos/400/?grayscale",
        description:
            "The wisdom of life consists in the elimination of non-essentials.",
        link: "#",
    },
    {
        img: "https://picsum.photos/400/800/?grayscale",
        description:
            "The wisdom of life consists in the elimination of non-essentials.",
        link: "#",
    },
    {
        img: "https://picsum.photos/400/?grayscale",
        description:
            "The wisdom of life consists in the elimination of non-essentials.",
        link: "#",
    },
    {
        img: "https://picsum.photos/400/600/?grayscale",
        description:
            "The wisdom of life consists in the elimination of non-essentials.",
        link: "#",
    },
    {
        img: "https://picsum.photos/400/300/?grayscale",
        description:
            "The wisdom of life consists in the elimination of non-essentials.",
        link: "#",
    },
    {
        img: "https://picsum.photos/400/700/?grayscale",
        description:
            "The wisdom of life consists in the elimination of non-essentials.",
        link: "#",
    },

    {
        img: "https://picsum.photos/400/600/?grayscale",
        description:
            "The wisdom of life consists in the elimination of non-essentials.",
        link: "#",
    },
    {
        img: "https://picsum.photos/400/300/?grayscale",
        description:
            "The wisdom of life consists in the elimination of non-essentials.",
        link: "#",
    },
    {
        img: "https://picsum.photos/400/?grayscale",
        description:
            "The wisdom of life consists in the elimination of non-essentials.",
        link: "#",
    },
    {
        img: "https://picsum.photos/400/550/?grayscale",
        description:
            "The wisdom of life consists in the elimination of non-essentials.",
        link: "#",
    },
    {
        img: "https://picsum.photos/400/?grayscale",
        description:
            "The wisdom of life consists in the elimination of non-essentials.",
        link: "#",
    },
    {
        img: "https://picsum.photos/400/700/?grayscale",
        description:
            "The wisdom of life consists in the elimination of non-essentials.",
        link: "#",
    },
];

const contactConfig: ContactConfig = {
    email: "hptprobook@gmail.com",
    phone: "0332 - 741 - 249",
    description:
        "Feel free to reach out to me for project inquiries, collaboration opportunities, or if you have any questions. I am always open to discussing new projects and innovative ideas. Whether it’s a question about my work, potential collaboration, or just a chat, don’t hesitate to get in touch!",
    // Create an emailjs.com account to integrate email services directly into your projects.
    // For a step-by-step guide on how to set this up with ReactJS, check out this tutorial: https://www.emailjs.com/docs/examples/reactjs/
    serviceId: "hptprobook_profile",
    templateId: "template_ygkykmc",
    userId: "6ZlRkS17mm5mgdUQB",
};

const socialProfiles: SocialProfiles = {
    github: "https://github.com/hptprobook",
    facebook: "https://www.facebook.com/profile.php?id=100040867566504",
    linkedin:
        "https://www.linkedin.com/feed/?trk=guest_homepage-basic_google-one-tap-submit",
    twitter: "https://twitter.com/HoPhanThan28870",
};
export {
    meta,
    dataAbout,
    dataPortfolio,
    workTimeline,
    skills,
    services,
    introData,
    contactConfig,
    socialProfiles,
    logotext,
};
