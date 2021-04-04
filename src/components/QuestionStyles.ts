import styled from 'styled-components';

export const Wrapper = styled.div`
max-width: 1100px;
border-radius: 10px;
border:2px solid: #0085a3;
padding: 20px;
background-color: #fff
box-shadow: 0, 5, 10 rgba(0 0 0 0.25);
text-align:center;

p{
    font-size: 1rem;
}`

type ButtonWrapperProps = {
    correct:boolean;
    userClicked:boolean;
}
export const ButtonWrapper = styled.div<ButtonWrapperProps>`
transition: all 0.3s ease;

:hover{
    opacity: 0.8;
}

button {
    cursor: pointer;
    user-select:none;
    font-size: 0.8rem;
    width:100%;
    height: 40px;
    margin 5, 0;
    background: ${({ correct, userClicked }) =>
    correct
    ? 'linear-gradient(90deg, #56ffa4, #59bc86)'
    : !correct && userClicked
    ? 'linear-gradient(90deg, #ff5656, #c16868)'
            : 'linear-gradient(90deg, #666666, #666666)'};
    border: 3 solid #fff;
    box-shadow: 1 2 0 rgba( 0 0 0 0.1)
    border-radius: 10;
    color: #fff;
    text-shadow: 0 1 0 rgba(0 0 0 0.25); 
}
`