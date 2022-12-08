import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import tw from 'tailwind-styled-components'
import { HiOutlineKey, HiOutlineLightBulb } from "react-icons/hi2";

import Home from '../pages/Home'
import AppBar from './AppBar';
import SideMenu from './SideMenu';
import About from '../pages/About';

const Main = tw.main`
    grid
    grid-cols-10
    mt-12
    md:mt-16
`;

const Header = tw.header`
    fixed left-0 top-0
    w-full
    h-12 md:h-16
    border-b border-slate-200
    bg-white
    shadow
`;

const Aside = tw.aside`
    fixed left-0 top-0
    pt-12 md:pt-16
    w-full
    h-full
    flex
    ${(props) => (props.opened) ? "flex" : "hidden" }
`;

const Menu = tw.div`
    w-72
    bg-white
    shadow-lg
`;

const Backdrop = tw.div`
    grow
    bg-black/20
    backdrop-blur-sm
`;

export default function Layout() {
    const [menuOpened, setMenuOpened] = useState(true);
    const onMenuClicked = () => {
        setMenuOpened(!menuOpened);
    }

    const menu = [
        {
            icon: <HiOutlineKey />, 
            title: "오늘의 특징주",
            link: "/home",
        }, 
        {
            icon: <HiOutlineLightBulb />, 
            title: "about",
            link: "/about",
        }
    ];
        
    return (
        <div id="app-layout">
            <Aside opened={menuOpened}>
                <Menu>
                    <SideMenu menu={menu} />
                </Menu>
                <Backdrop onClick={onMenuClicked}/>
            </Aside>            
            <Header>
                <AppBar title="모두의 특징주" menuClicked={onMenuClicked} opened={menuOpened}/>
            </Header>
            <Main>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="*" element={<Home />} />
                </Routes>
            </Main>         
        </div>
    );
}