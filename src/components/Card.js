import React from 'react';
import PropTypes from 'prop-types';
import tw from 'tailwind-styled-components';

const Container = tw.section`
    m-2 p-2
    col-span-10 md:col-span-8
    col-start-1 md:col-start-2
    bg-white
    shadow-[0_1px_3px_0px_rgba(0,0,0,0.3)]
    rounded
`

const Title = tw.div`
    p-2
    pt-1
    text-gray-400
    text-left
`

const ContentsContainer = tw.div`
    m-2
`;

const Card = ({title, children}) => {
    return (
        <Container className="">
            <Title>{title}</Title>
            <ContentsContainer>
                {children}
            </ContentsContainer>
        </Container>
    );
};

Card.propTypes = {
    title: PropTypes.string.isRequired
}

export default Card;