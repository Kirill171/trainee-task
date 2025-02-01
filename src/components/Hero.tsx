import styled from 'styled-components';

export default function Hero() {
  return (
    <HeroSection>
      <HeroContainer>
        <HeroTitle>
          Let&apos;s Find Some <HeroHighlight>Art</HeroHighlight>{' '}
          <HeroSubtitle>Here!</HeroSubtitle>
        </HeroTitle>
      </HeroContainer>
    </HeroSection>
  );
}

const HeroSection = styled.section`
  padding-top: 128px;
`;

const HeroContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-weight: ${(props) => props.theme.fontWeight.bold};
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontSizes.large};

  @media (min-width: 768px) {
    font-size: ${(props) => props.theme.fontSizes.twoXlarge};
  }
`;

const HeroHighlight = styled.span`
  color: ${(props) => props.theme.colors.primary};
`;

const HeroSubtitle = styled.p`
  margin: 0;
  display: block;
`;
