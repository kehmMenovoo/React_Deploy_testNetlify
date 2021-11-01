const Footer = ({length}) => {
    const today = new Date();
    return (
        <footer>
            <p style={{borderRight: "1px solid white", width: "100%"}}>{length} {(length === 1) ? "item" : "items"}</p>
            <p style={{borderLeft: "1px solid white", width: "100%"}}>Copyright &copy; {today.getFullYear()}</p>
        </footer>
    )
}

export default Footer