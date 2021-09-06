import React, { useState } from 'react';

const Register = () => {
    return (
    <>
        <div className={"auth"}>
            <h2 className={"auth__title"}>Регистрация</h2>
            <form className={"auth__input"}>
                <input className={"user__input"} placeholder={"Име"}/>
                <input className={"user__input"} placeholder={"Е-мейл"}/>
                <input className={"user__input"} placeholder={"Парола"}/>
                <button className={"auth__btn"}>
                    <div className={"auth__btn--background"}>
                    </div>
                    <div className={"auth__btn--shadow"}>

                    </div>
                    <div className={"auth__btn--text"}>Регистрация</div>
                </button>
            </form>
        </div>
    </>
    )
}
export default Register;
