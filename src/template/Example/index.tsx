import { FC } from 'react';
import styled from 'styled-components';
import PDFLayout from '../../components/Layout';

const Title = styled.h1`
    font-size: 16pt;
    color: red;
`;

const SubTitle = styled.h2`
    font-size: 12pt;
    color: green;
    border: 2pt solid #000000;
    padding: 4pt 8pt;
`;

export type IExampleProps = {
    name: string;
};

// Create Document Component
const Example: FC<IExampleProps> = ({ name }) => {
    return (
        <PDFLayout>
            <Title>這是標題</Title>
            <SubTitle>我在測試中文可不可以 ???</SubTitle>
            <p>Your name is {name}</p>
        </PDFLayout>
    );
};

export default Example;
