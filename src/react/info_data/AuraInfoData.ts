import { InfoContainerProps } from '../InfoContainer';

export class AuraInfoData implements InfoContainerProps
{
    images: string[];
    heading: string;
    subheading: string[];
    description: string[];

    data: InfoContainerProps[] = [];

    constructor()
    {  
        this.heading = 'Aura';
        this.images = [this.imageAuraIntro]
        this.subheading = [this.subheadingAuraIntro];
        this.description = [this.descriptionAuraIntro];
    }

    // Intro
    private imageAuraIntro: string = '../assets/AuraOSFrontPage.png';
    private subheadingAuraIntro: string  = "Next-generation streaming and interactivity solutions for customize digital experiences for users.\n\n";
    private descriptionAuraIntro: string = "During my time at Aura as a Software Engineer from April 2021 to August 2024,\n I had the incredible opportunity to work on cutting-edge streaming and interactivity solutions.\n\nUtilizing languages and technologies like C#, GoLang, TypeScript, Unity, AWS, GraphQL, and PostgreSQL,\nI developed and optimized immersive streaming experiences and real-time data visualizations for both mobile and desktop platforms.\n\nI led cross-platform integration efforts, ensuring seamless connectivity across devices, including Chromecast and mobile-to-TV functionalities.\nMy role also involved enhancing backend services by integrating OpenSearch and AWS API Gateway, significantly improving performance and user engagement.\nCollaborating on diverse projects, from creating 3D heatmaps to developing interactive gaming services, I honed my skills in crafting scalable, reusable tools and fostering a user-centric approach to software development.";
}