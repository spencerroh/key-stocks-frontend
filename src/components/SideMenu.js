import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';

import LOGO_IMAGE from '../assets/logo256.png';

//#region Styled Components
const Logo = tw.img`
    my-16
    w-6/12
    self-center
    select-none
`;

const NavContainer = tw.nav`
    flex
    flex-col
`;

const NavItem = tw(Link)`
    mx-4
    px-4 py-3
    rounded-[3rem]
    flex
    items-center
    hover:bg-sky-100
    text-gray-600 hover:text-blue-800
`;

const NavHorizontalBar = tw.hr`
    mx-4
    my-8
`;

const NavItemIcon = tw.div`
    mr-4
    text-2xl
`;

const NavItemName = tw.span`
    text-md
`;
//#endregion

export default function SideMenu({menu}) {
    return (
        <NavContainer>
            <Logo src={LOGO_IMAGE} />
            <NavHorizontalBar />
            {menu.map((item, index) => (
                <NavItem key={index} to={item.link}>
                    <NavItemIcon className="nav-icon">{item.icon}</NavItemIcon>
                    <NavItemName>{item.title}</NavItemName>
                </NavItem>
            ))}        
        </NavContainer>
    );
}
