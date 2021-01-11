import React from "react";
import Table from "./components/table";
import Graphic from "./components/graph"
import {main_container} from './main.module.scss';
import Coordinates from "./components/coordinates";

const MainPage = () => {
    return (
        <main className={main_container}>
            <Graphic/>
            <Coordinates/>
            <Table/>
        </main>
    );
}
export default MainPage;
