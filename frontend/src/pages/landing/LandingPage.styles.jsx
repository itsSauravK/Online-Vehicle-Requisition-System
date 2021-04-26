import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme)=>({

    link: {
        color: "blue"
    } ,
    hero: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=889&q=80')`,
        height: "500px",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "relative", 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        fontSize: "4rem",
        fontWeight: 200
    },
    carModelContainer: {
        paddingTop: theme.spacing(3),

    },
    carModelTitle: {
        fontWeight: 800,
        paddingBottom: theme.spacing(3)
    }
}));

export default useStyles;
