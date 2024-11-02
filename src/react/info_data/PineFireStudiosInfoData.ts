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
    private descriptionIntro: string = "More information coming soon!";
}