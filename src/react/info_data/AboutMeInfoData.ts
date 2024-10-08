import { InfoContainerProps } from '../InfoContainer';


export class AboutMeInfoData implements InfoContainerProps
{
    images: string[];
    heading: string;
    subheading: string[];
    description: string[];

    data: InfoContainerProps[] = [];

    constructor()
    {  
        this.heading = 'A Bit About Me';
        this.images = [this.imageIntro, this.imageHowIGotHere];
        this.subheading = [this.subHeadingIntro, this.subHeadingHowIGotHere];
        this.description = [this.descriptionIntro, this.descriptionHowIGotHere];
    }
    //  Intro
    private imageIntro: string = '../assets/SamIntro.jpg';
    private subHeadingIntro: string  = "Hey There! I'm Sam a Software Engineer.\n\n";
    private descriptionIntro: string = "Over the years, I’ve had the pleasure of diving deep into both frontend and backend development, exploring everything from graphics programming to creating multi-platform solutions. My journey has also taken me through the world of 3D animation and art, where I developed a keen eye for detail and a passion for bringing ideas to life technically and visually.\n\nI’m a strong believer in collaboration, and I’ve always focused on delivering high-impact results efficiently—whether it’s through creating seamless user interfaces or crafting dynamic backend systems. I thrive in creative environments where I can flex my frontend and artistic muscles, but I’m also constantly eager to expand my expertise, especially in areas of backend development, cloud infrastructure, and now AI.\n\nAt my core I’m driven by a love for problem-solving and creation. Every new challenge is an opportunity to learn, grow, and create something truly meaningful. If you’re looking for someone who brings both creativity and technical skill to the table, and who’s excited about pushing the boundaries of what’s possible, I’d love to connect!\n\n If you want to know more about me or my work click on the images in the spindel.";
    // How I got here

    private imageHowIGotHere: string = '../assets/SamHowIGotHere.jpg';
    private subHeadingHowIGotHere: string  = "How I Got Here\n\n";
    private descriptionHowIGotHere: string = "My journey into software development started with a passion for art, design, and video games. Initially, I pursued 3D animation and visual effects, aiming to bring game worlds to life. But after graduating with an Advanced Diploma in Professional Game Development, my curiosity for the technical side took over—I wanted to know how everything worked behind the scenes.\n\nThat drove me to further my studies, Advanced Diploma in Professional Game Development specializing in real-time applications and game programming. Our final project 'Kieru', a ninja game built from scratch, earned 'Most Innovative Game of the Year', and that success led us to co-found Pine Fire Studio, a small indie dev studio.\n\nI Developed on Kieru after graduation for several months following an incubation program, but unforunatly for Pine Fire I needed to refocus on things that literally meant the world to me,\n\nBecoming a father.";
}

export default AboutMeInfoData;