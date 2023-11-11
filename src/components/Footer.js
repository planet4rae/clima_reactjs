import styled from "styled-components";
import facebook from "../assets/facebook.png"
import twitter from "../assets/twitter.png"

const FooterContent = styled.footer`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;
    background-color: #316496;   
`;

const Iconos= styled.div`
    display: flex;
    gap: 20px;
    padding: 0 20px;
`;

const Redes = styled.img`
    width: 30px;
    height: 30px;
    cursor: pointer;
`;

const Derechos = styled.div`
    padding: 0 20px;    
    color: #EDEFF3
`;


function Footer(){
    return(
        <FooterContent>
        <Derechos p>© Nuestro Clima 2023</Derechos>
        <Iconos>
        <Redes src={facebook}/>
        <Redes src={twitter}/>
        </Iconos>
       
    </FooterContent>
    );

}
export default Footer;

