import AboutMeInfoData from "./info_data/AboutMeInfoData";
import { AuraInfoData } from "./info_data/AuraInfoData";
import { EyeCandyInfoData } from "./info_data/EyeCandyInfoData";
import { PineFireStudiosInfoData } from "./info_data/PineFireStudiosInfoData";
import { InfoContainerProps } from "./InfoContainer";

// const underConstructionDescription = [LoremIpsumGenerator(3)];
// const underConstructionSubheading = ['Under Construction'];

// function createImageArray(count:number, imageOffset: number) 
// {
//     let imageArray = [];
    
//     for (let i = 0; i < count; i++) {
//         let imageSize = randomScreenSize();
//         imageArray.push(`https://picsum.photos/id/${(i + 1)+imageOffset}/${imageSize.height}/${imageSize.width}`);
//     }
//     return imageArray;
// }
// function randomScreenSize(
//     maxWidth : number = 1920, 
//     maxHeight : number = 1080,
//     minHeight : number = 400,
//     minWidth : number = 400): 
//     { width: number; height: number }
//     {
//     return {
//         width: randPow2(minWidth, maxWidth),
//         height: randPow2(minHeight, maxHeight)
//     };
// }
// function randPow2( min : number, max : number) {
//     // floor to nearest power of 2
//     return Math.pow(2, Math.floor(Math.log2( Math.floor(Math.random() * max) + min)));
// }

// function LoremIpsumGenerator( paragraghs : number = 1) : string
// {
//     let loremIpsumSentance = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec nunc nec enim lacinia fermentum. Nulla facilisi.';
//     // repeat the sentance to create a paragraph in a random range
//     let loremIpsumParagraph = loremIpsumSentance.repeat(Math.floor(Math.random() * 4) + 1);
//     // add random insert line breaks at periods
//     loremIpsumParagraph = loremIpsumParagraph.replace(/\./g, '.\n');
//     // add breaks between paragraphs
//     loremIpsumParagraph+= '\n\n';
//     // repeat the paragraph to create the full text
    
//     return loremIpsumParagraph.repeat(paragraghs);
// }

export const InfoContainerData : InfoContainerProps[] = [

    new AboutMeInfoData,
    // Aura InfoContainer
    new AuraInfoData,
    // // Eye Candy InfoContainer
    new EyeCandyInfoData,
    // // Pine Fire Studios InfoContainer
    new PineFireStudiosInfoData,
    // // Personal Projects InfoContainer
    // new PersonalProjectsInfoData,
   
];