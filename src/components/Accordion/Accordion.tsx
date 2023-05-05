import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import style from "./Accordion.module.css";

type Props = {
    title: string,
    children: JSX.Element,
    open: string
  };

 const AccordionComponent: React.FC<Props> = ({title, children, open, }) => {
    return (
        <Accordion className={style.accordion} >
          <AccordionSummary
            expandIcon={open === "up" ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h3 style={{margin: "0"}}>{title}</h3>
          </AccordionSummary>
          <AccordionDetails>
             {children}
          </AccordionDetails>
        </Accordion>
    );
  }

export default AccordionComponent;