import { CardHeader } from "@mui/material";

interface BasicCardHeaderProps{
    title:string;
    width: string
}
function BasicCardHeader(props: BasicCardHeaderProps) {
    return (
        <CardHeader
            sx={{
                bgcolor: '#F3F6F9',
                color: '#1976d2',
                boxShadow: 1,
                p: 2,
                minWidth: 300,
                width: props.width,
                height: '75%',
                border: '1px solid #E5EAF2',
                textAlign: 'left'
            }}
            title={props.title} />
    );
};

export default BasicCardHeader;
