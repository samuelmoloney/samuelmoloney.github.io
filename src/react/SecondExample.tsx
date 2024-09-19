import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import {
    Paper,
    Card,
    Button,
    Typography,
} from '@mui/material'


const SecondExample = () => {


    return (

            <Carousel
                animation="slide"
                className="SecondExample"
            >
                {
                    items.map((item, index) => {
                        return <Project item={item} key={index} />
                    })
                }
            </Carousel>
 
  
    )
}


type Item = {
    name: string,
    description: string,
    image_src: string,
    color: string,
    href: string
}

interface ProjectProps
{
    item: Item
}

function Project({ item }: ProjectProps) {
    return (
        <Card
            className="Project"
            sx={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '10px',
                minWidth: '300px', // Minimum width for responsive layout
                maxWidth: '100%',  // Ensures it fits within the container
                height: '100%',    // Ensures the card stretches to fit the container
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
                backgroundColor: item.color,
                color: 'white',
                textAlign: 'center',
            }}
            elevation={10}
        >
            {/* Background Image */}
            <div
                style={{
                    backgroundImage: `url(${item.image_src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0,
                    filter: 'brightness(0.7)', // Optional: Darken the image for better contrast
                    backgroundRepeat: 'no-repeat', // Ensure no repeat
                }}
            />
            {/* Content */}
            <div
                style={{
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                }}
            >
                <Typography variant='h5'>{item.name}</Typography>
                <br />
                <Typography>{item.description}</Typography>
                <br />
                <Button
                    variant="contained"
                    color="primary"
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn More
                </Button>
            </div>
        </Card>
    );
}

const items: Item[] = [
    {
        name: "Lear Music Reader",
        description: "A PDF Reader specially designed for musicians.",
        image_src: "https://picsum.photos/id/1/200/300",
        color: "#64ACC8",
        href: 'https://github.com/Learus/Lear-Music-Reader'
    },
    {
        name: "Hash Code 2019",
        description: "My Solution on the 2019 Hash Code by Google Slideshow problem.",
        image_src: "https://picsum.photos/id/2/200/300",
        color: "#7D85B1",
        href: 'https://github.com/Learus/HashCode2019'
    },
    {
        name: "Terrio",
        description: "A exciting mobile game game made in the Unity Engine.",
        image_src: "https://picsum.photos/id/3/200/300",
        color: "#CE7E78",
        href: 'https://play.google.com/store/apps/details?id=com.Brewery.Terrio'
    },
    {
        name: "React Carousel",
        description: "A Generic carousel UI component for React using material ui.",
        image_src: "https://picsum.photos/id/4/200/300",
        color: "#C9A27E",
        href: 'https://github.com/Learus/react-material-ui-carousel'
    }
]

export default SecondExample;