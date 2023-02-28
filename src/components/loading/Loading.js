import { Backdrop, CircularProgress } from "@mui/material";
import { useIsFetching } from "react-query";


const Loading = () => {
    const isFetching = useIsFetching();

    return( 
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isFetching}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default Loading;