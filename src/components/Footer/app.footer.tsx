'use client'
import { AppBar, Container, Fab, IconButton, Toolbar, styled } from '@mui/material';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
// import 'react-h5-audio-player/lib/styles.less';
// import 'react-h5-audio-player/src/styles.scss';
import CloseIcon from '@mui/icons-material/Close';
import { useHasMounted } from '@/app/utils/customHook';

const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: "20px",
    margin: '0 auto',
});
const handleClickCloseFooter = () => {

}
const AppFooter = () => {
    const hasMounted = useHasMounted();

    if (!hasMounted) return (<></>)

    return (


        <AppBar position="fixed"
            sx={{
                background: '#f2f2f2',
                top: 'auto', bottom: 0,
            }}>
            <Container
                sx={{
                    display: "flex",
                    gap: 10,

                }}>
                <AudioPlayer

                    autoPlay
                    src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
                    onPlay={e => console.log("onPlay")}
                    style={{
                        boxShadow: "unset",
                        background: '#f2f2f2',

                        visibility: "visible",
                        transition: "transform .2s ease- out"
                    }}
                />
                <>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                        justifyContent: "center",
                        minWidth: 100

                    }}>
                        <div style={{
                            color: "black",

                        }}>Lee</div>
                        <div style={{
                            color: "black",
                        }}>Chưa đặt tên</div>
                    </div>
                    <IconButton
                        color="default"
                        aria-label="open drawer"
                        onClick={() => handleClickCloseFooter()}
                    >
                        <CloseIcon />
                    </IconButton>
                </>
            </Container>
        </AppBar>

    )
}
export default AppFooter;