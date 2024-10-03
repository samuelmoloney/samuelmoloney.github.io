import { InfoContainerProps } from '../InfoContainer';


export class AboutMeInfoData implements InfoContainerProps
{
    images: string[];
    heading: string;
    subheading: string[];
    description: string[];

    constructor()
    {
        this.images = ['../assets/SamIntro.jpg'];
        this.heading = 'A Bit About Me';
        this.subheading = [this.subHeadingIntro];
        this.description = [this.descriptionIntro];
    }

    private subHeadingIntro: string  = "Hey There! I'm Sam a Software Engineer.";
    private descriptionIntro: string = "Over the years, I’ve had the pleasure of diving deep into both frontend and backend development, exploring everything from graphics programming to creating multi-platform solutions. My journey has also taken me through the world of 3D animation and art, where I developed a keen eye for detail and a passion for bringing ideas to life technically and visually.\n\nI’m a strong believer in collaboration, and I’ve always focused on delivering high-impact results efficiently—whether it’s through creating seamless user interfaces or crafting dynamic backend systems. I thrive in creative environments where I can flex my frontend and artistic muscles, but I’m also constantly eager to expand my expertise, especially in areas of backend development, cloud infrastructure, and now AI.\n\nAt my core I’m driven by a love for problem-solving and creation. Every new challenge is an opportunity to learn, grow, and create something truly meaningful. If you’re looking for someone who brings both creativity and technical skill to the table, and who’s excited about pushing the boundaries of what’s possible, I’d love to connect!\n\n If you want to know more about me or my work click on the images in the spindel.";

}

export default AboutMeInfoData;