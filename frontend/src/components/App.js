import React from "react";
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import MainPage from "./MainPage/Main";
import AuthPage from "./AuthPage/Auth";
import Header from "./Header/Header";


class App extends React.Component{
    // constructor(props) {
    //     super(props);
    //     let size = window.screen.availWidth;
    //     if (size>1279){
    //
    //     }
    // }
    render() {
        return (
            <BrowserRouter>
                <Header/>
                <div >
                    <Switch>
                        <Route path={'/'} exact component={MainPage}/>
                        <Route path={'/auth'} exact component={AuthPage}/>
                    </Switch>
                </div>
                {/*<Footer/>*/}
            </BrowserRouter>);
    }
}

export default App;
