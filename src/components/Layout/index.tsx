import { FC, ReactNode } from 'react';
import styled from 'styled-components';
import ResetCSS from './ResetCSS';
import { GlobalStyles } from './GlobalStyles';

const PaperLayout = styled.div`
    @page {
        size: A4 portrait;
        margin: 0;
        break-inside: avoid;
        break-after: always;
    }
`;

interface Props {
    children: ReactNode | ReactNode[];
}

const PDFLayout: FC<Props> = ({ children }) => {
    return (
        <PaperLayout>
            <ResetCSS />
            <GlobalStyles />
            {children}
        </PaperLayout>
    );
};

export default PDFLayout;
