import { InfoContainerProps } from "./InfoContainer";

const underConstructionDescription = 'Currently this site is under construction. Please check back later for more information.';
const underConstructionSubheading = 'Under Construction';

function createImageArray(count:number, imageOffset: number) 
{
    let imageArray = [];
    
    for (let i = 0; i < count; i++) {
        let imageSize = randomScreenSize();
        imageArray.push(`https://picsum.photos/id/${(i + 1)+imageOffset}/${imageSize.height}/${imageSize.width}`);
    }
    return imageArray;
}
function randomScreenSize(
    maxWidth : number = 1920, 
    maxHeight : number = 1080,
    minHeight : number = 400,
    minWidth : number = 400): 
    { width: number; height: number }
    {
    return {
        width: randPow2(minWidth, maxWidth),
        height: randPow2(minHeight, maxHeight)
    };
}
function randPow2( min : number, max : number) {
    // floor to nearest power of 2
    return Math.pow(2, Math.floor(Math.log2( Math.floor(Math.random() * max) + min)));
}

export const InfoContainerData : InfoContainerProps[] = [

    // About me InfoContainer
    {
        images: createImageArray(7,0),
        heading: 'About Me',
        subheading: 'underConstructionSubheading',
        description: underConstructionDescription, 
    },
    // Aura InfoContainer
    {
        images: createImageArray(5,2),
        heading: 'Aura',
        subheading: underConstructionSubheading,
        description: underConstructionDescription,
    },

    // Eye Candy InfoContainer
    {
        images: createImageArray(4,10),
        heading: 'Eye Candy',
        subheading: underConstructionSubheading,
        description: underConstructionDescription,
    },
    // Pine Fire Studios InfoContainer
    {
        images: createImageArray(3,18),
        heading: 'Pine Fire Studios',
        subheading: underConstructionSubheading,
        description: underConstructionDescription,
    },
    // Personal Projects InfoContainer
    {
        images: createImageArray(2,22),
        heading: 'Personal Projects',
        subheading: underConstructionSubheading,
        description: underConstructionDescription,
    },

];