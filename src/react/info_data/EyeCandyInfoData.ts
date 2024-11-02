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
    private descriptionIntro: string = "Beginning my career beyond indie game development, I joined Eye Candy as a Junior Software Developer on a short-term contract.\n Eye Candy specializes in VFX, CGI, animation & motion design, and interactive experiences for event spaces, museums, films, and much more.\n\n This role provided an incredible opportunity to develop a variety of interactive experiences, including traditional 3D, VR, and AR projects, using Unity 3D, Google Glasses, and even a giant 60-inch touchscreen.\n These projects empowered clients in event spaces to present their products in innovative and engaging ways.\n\n I also had the chance to create educational tools that made learning fun and engaging for children—a meaningful experience, especially as a soon-to-be father.\n\n My time at Eye Candy was a whirlwind of growth and learning, and I’m grateful for the experience.\nIf you are looking for a devoted invovative team with massive experience within VFX, CGI, animation & motion design, and digital interactive experience I can't stress enough about first getting in touch with Eye Candy\n\n";
}