import PropTypes from 'prop-types';
import tw from 'tailwind-styled-components'
import { HiBars3 } from "react-icons/hi2";

const Container = tw.div`
    flex
    flex-row
    h-full
    items-center
    select-none
`;

const Icon = tw(HiBars3)`
    w-6 h-6 m-2 
    text-blue-500
    ${({selected}) => selected ? 'rotate-90' : ''}
    cursor-pointer
`;

export default function AppBar({title, menuClicked, opened}) {
    return (
    <Container>
        <Icon onClick={menuClicked} selected={opened}/>
        <span>{title}</span>
    </Container>)
}

AppBar.propTypes = {
    title: PropTypes.string.isRequired
}