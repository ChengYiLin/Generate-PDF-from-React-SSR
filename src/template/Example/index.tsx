import { FC } from 'react';
import styled from 'styled-components';
import PDFLayout from '../../components/Layout';

const Title = styled.h1`
    font-size: 16pt;
    color: red;
`;

const SubTitle = styled.h2`
    font-size: 12pt;ㄈ
    color: green;
    padding: 8pt 2pt;
`;

const PageLayout = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 10pt 0;
`;

const Order = styled.div`
    height: 30vh;
    flex: 0 0 50%;
    border: 2pt solid #000000;
`;

export type IExampleProps = {
    name: string;
    email: string;
};

// Create Document Component
const Example: FC<IExampleProps> = ({ name, email }) => {
    const fakeData = [1];

    return (
        <PDFLayout>
            <PageLayout>
                {fakeData.map((index) => (
                    <Order key={index}>
                        <Title>這是標題 {index}</Title>
                        <SubTitle>我在測試中文可不可以</SubTitle>
                        <p>Name : {name}</p>
                        <p>Email : {email}</p>
                    </Order>
                ))}
            </PageLayout>
        </PDFLayout>
    );
};

export default Example;
