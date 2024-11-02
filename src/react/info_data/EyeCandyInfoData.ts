import { InfoContainerProps } from '../InfoContainer';


export class EyeCandyInfoData implements InfoContainerProps
{
    images: string[];
    heading: string;
    headingLink: string;
    subheading: string[];
    description: string[];

    constructor()
    {  
        this.heading = 'Eye Candy';
        this.headingLink = "https://www.eye-candy.au";
        this.images = [this.imageIntro]
        this.subheading = [this.subheadingIntro];
        this.description = [this.descriptionIntro];
    }

    // Intro
    private imageIntro: string = '../assets/EyeCandy.png';
    private subheadingIntro: string  = "Digital with Depth\n";
    private descriptionIntro: string = "\n\nBeginning my career beyond indie game development, I joined Eye Candy as a Junior Software Developer over the course of a short contract period.\n Eye Candy specialise in VFX, CGI, animation & motion design and interactive experiences for event spaces, musuems, films and much more\n\n This role was an incredible opportunity where I developed a variety of interactive experiences, including 'traditional 3D,' VR, and AR projects using Unity 3D, Google Glasses, and even a giant 60-inch touchscreen.\n These projects helped clients within event spaces present their products in innovative ways.\n\n Some projects also allowed me to create educational tools that made learning fun and engaging for kids which was a meaningful experience for me personally, especially as a soon-to-be father.\n\n My time at Eye Candy was a whirlwind of learning and growth, and I'm grateful for the experience.\n\n";
}