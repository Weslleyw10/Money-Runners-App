import React, { useState } from "react"

import { Box, Title, Spacer, Cover, Text, Button } from '../../components'
import illustrationOne from '../../assets/images/illustration-1.png'
import illustrationTwo from '../../assets/images/illustration-2.png'
import illustrationThree from '../../assets/images/illustration-3.png'


const Tour = () => {
    const tourData = [
        {
          bg: 'dark',
          button: 'primary',
          title: 'Planejamento com motivação.',
          desc: 'Pensamos em um serviço perfeito pra você não perder mais aquele compromisso inadiável (denovo).',
          pic: illustrationOne,
        },
        {
          bg: 'primary',
          button: 'dark',
          title: 'Construa hábitos por bem (ou mal).',
          desc: 'Pensamos em um serviço perfeito pra você não perder mais aquele compromisso inadiável (denovo).',
          pic: illustrationTwo,
        },
        {
          bg: 'dark',
          button: 'primary',
          title: 'Ganhe dinheiro com os amigos.',
          desc: 'Pensamos em um serviço perfeito pra você não perder mais aquele compromisso inadiável (denovo).',
          pic: illustrationThree,
        },
      ];

      const [ currentTour, setCurrentTour ] = useState(0)


    return (
        <Box background={tourData[currentTour].bg}justify="center">
            <Spacer size="40px"/>
            <Title color="light" big>{tourData[currentTour].title}</Title>
            <Spacer size="40px"/>
            <Cover 
                source={tourData[currentTour].pic}
                width="100%"
                height="300px"
            />
            <Spacer size="40px"/>
            <Text align="center" small hasPadding>
                {tourData[currentTour].desc}
            </Text>

            <Spacer size="40px"/>
            <Button 
                background={tourData[currentTour].button} 
                block
                onPress={() => setCurrentTour(currentTour+1)}
            >
                { currentTour === '2' ? 'Explorar' : 'Próximo'}
            </Button>

        </Box>
    )
}

export default Tour