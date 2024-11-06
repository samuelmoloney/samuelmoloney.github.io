import { InfoContainerProps } from '../InfoContainer';


export class PineFireStudiosInfoData implements InfoContainerProps
{
    images: string[];
    heading: string;
    headingLink: string;
    subheading: string[];
    description: string[];

    constructor()
    {  
        this.heading = 'PineFire Studios';
        this.headingLink = "https://www.indiedb.com/company/pine-fire-studios";
        this.images = [this.imageIntro]
        this.subheading = [this.subheadingIntro];
        this.description = [this.descriptionIntro];
    }

    // Intro
    private imageIntro: string = '../assets/KieruCover.png';
    private subheadingIntro: string  = "Indie Game Studio\n";
    private descriptionIntro: string = "At Pine Fire Studios, I help found a team of passionate AIE graduates in an incubator program to bring our innovative game concept, Kieru, to life.\n\n Kieru began as an end of year assignment through AIE, seeing how much support and excitement for the game there was we decided to try and pursue it futher.\nOur studio, based in Canberra, focused on creating an unforgettable multiplayer experience that fused stealth and combat with a stark, black-and-white visual style.\n\nKieru offered players the challenge of a high-contrast world, where black and white Ninjas used light and shadow to gain the ultimate edge, remaining invisible to each other until the critical moment of engagement.\nI took on the role of developing the game’s parkour player controller, ensuring fluid movement and dynamic combat interactions, which heightened the game's responsiveness and immersion.\nAlso one of the many thing's I implemented was custom GLSL shaders to refine Kieru’s distinct monochrome aesthetic.\n\nOur work earned Kieru awards, including Most Innovative Game of the Year at AIE at graduation, and being Greenlit on Steam proving the interest in players.";
}