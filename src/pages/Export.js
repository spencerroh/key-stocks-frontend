import axios from 'axios';
import React from 'react';
import Excel from 'exceljs';
import tw from 'tailwind-styled-components';
import Card from '../components/Card';
import useLoading from '../hooks/useLoading.js';

//#region [Styled Components]
const Contents = tw.div`
    w-full
    flex
    justify-center
`;

const Button = tw.button`
    p-4
    bg-sky-300 hover:bg-sky-400 disabled:bg-orange-400
    text-white
    rounded
    shadow
    flex
    items-center
`;
//#endregion

const Export = props => {
    
    async function queryAllStocks() {
        let response = await axios.get('/api/key-stocks/v1/query/all');
        return response.data;
    }

    async function exportToExcel(stocks) {
        const workbook = new Excel.Workbook();

        workbook.creator = '모두의 특징주';
        workbook.lastModifiedBy = '모두의 특징주';
        workbook.created = new Date();
        workbook.modified = new Date();

        workbook.addWorksheet('모두의 특징주');

        const sheet = workbook.getWorksheet(1);
        sheet.columns = [
            { header:'Code', key:'code', width: 8 },
            { header:'종목명', key:'name', width: 20 },
            { header:'날짜', key:'date', width: 10 },
            { header:'이유', key:'reason', width: 100 },
        ];

        for(let item of stocks) {
            sheet.addRow(item);
        }

        let data = await workbook.xlsx.writeBuffer();

        return new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    }

    function downloadBlob(blob) {
        const anchor = document.createElement('a');
        anchor.href = window.URL.createObjectURL(blob);
        anchor.download = `모두의_특징주.xlsx`;
        anchor.click();
        window.URL.revokeObjectURL(anchor.href);
    }

    const [ exportStatus, exportAction ] = useLoading(async () => {
        let stocks = await queryAllStocks();
        let blob = await exportToExcel(stocks.stocks);
        return blob;
    });

    const onDownloadClicked = async () => {
        await exportAction();
        downloadBlob(exportStatus.data);
    }

    return (
        <Card title="데이터 추출하기">
            <Contents>
                <Button onClick={onDownloadClicked} disabled={exportStatus.loading}>
                    {exportStatus.loading ? "잠시만 기다려주세요..." : "다운로드"}
                </Button>
            </Contents>
        </Card>
    );
};

export default Export;