import React, { useState } from 'react';


const Login = () => {
    return (
       <>
        <div className={"auth"}>
            <h2 className={"auth__title"}>Вход</h2>
            <form className={"auth__input"}>
                <input className={"user__input"} placeholder={"Е-мейл"}/>
                <input className={"user__input"} placeholder={"Парола"}/>
                <button className={"auth__btn"}>
                        <div className={"auth__btn--background"}>
                        </div>
                        <div className={"auth__btn--shadow"}>

                        </div>
                        <div className={"auth__btn--text"}>Влез</div>
                </button>
                <div className={"auth__links"}>
                <span className={"auth__link"}>Нямаш профил?</span>
                <span className={"auth__link"}>Забравена парола?</span>
                </div>
            </form>
        </div>
       </>
    );
};

export default Login;
