import style from "../../styles/style.module.css"

function Container({children}: { children: React.ReactNode}) {
    return (
        <div className={style.container}>
            {children}
        </div>
    );
}

export default Container;