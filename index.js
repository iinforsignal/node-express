const express = require('express');
const axios = require('axios'); // Axios를 사용하여 API 요청
const app = express();

const PORT = process.env.PORT || 3000;

// 공공데이터 API 요청에 필요한 키 및 URL
const API_KEY = 'g9sZFsfNIi++nvwuLDqQuik41v5SwZvtB7ZZaipaVP85HQbBT7xQmE+5bByNUTy7zjVh7W6U++Oiy2kd8i/2ng=='; // 공공데이터 포털에서 발급받은 API 키를 입력하세요.
const API_URL = 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMinuDustFrcstDspth';

// API 요청 핸들러
app.get('/api/dust-forecast', async (req, res) => {
    try {
        // 요청에 필요한 파라미터 설정
        const params = {
            serviceKey: API_KEY,
            returnType: 'json', // JSON 형식으로 결과 반환
            numOfRows: 10, // 가져올 데이터의 개수
            pageNo: 1, // 페이지 번호
            searchDate: '2024-12-14', // 검색 날짜 (필요에 따라 변경 가능)
            informCode: 'PM10' // 정보 코드 (예: PM10, PM2.5)
        };

        // Axios를 사용하여 API 요청
        const response = await axios.get(API_URL, { params });
        
        // API에서 반환된 데이터를 클라이언트로 응답
        res.json(response.data);
    } catch (error) {
        console.error('API 요청 실패:', error);
        res.status(500).send('API 요청 중 오류가 발생했습니다.');
    }
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
