import React from 'react'
import tw from 'twin.macro'
import { Button } from '@chakra-ui/react'

type CallToActionProps = {
  homeDividerRef: React.RefObject<HTMLHRElement>
}

const CallToAction = ({ homeDividerRef }: CallToActionProps) => {
  return (
    <Container>
      <Content>
        <Title>
          Anime for the <Highlighted>modern viewer</Highlighted>
        </Title>
        <Description>
          Anify is a cutting edge anime platform designed for the average
          viewer. Oh and it&apos;s also 100% open-source.
        </Description>
        <Buttons>
          <Button
            size="lg"
            colorScheme="green"
            isFullWidth
            onClick={() => {
              if (homeDividerRef.current)
                homeDividerRef.current.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Explore
          </Button>
        </Buttons>
      </Content>
    </Container>
  )
}

export default CallToAction

const Container = tw.div`flex flex-col items-center justify-center text-center h-full`

const Content = tw.div`flex flex-col items-center max-w-xl`

const Title = tw.h1`text-7xl font-black`

const Description = tw.h2`mt-4 mb-6 text-xl opacity-90`

const Highlighted = tw.span`color[var(--primary-color)] dark:color[var(--primary-color-dark)]`

const Buttons = tw.div`flex justify-center items-center gap-2 w-full md:w-28`
