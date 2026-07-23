import { Education, Experience } from "./types";

export interface GovProject {
  period: string;
  year: string;
  title: string;
  role: string;
  highlightWords?: string;
  isStarred?: boolean;
}

export interface CoopProject {
  year: string;
  title: string;
  role?: string;
  funding: string;
  isStarred?: boolean;
}

export interface ProjectExp {
  period: string;
  funding?: string;
  title: string;
  detail?: string;
  isStarred?: boolean;
}

export interface AcademicPaper {
  title: string;
  authors: string;
  source: string;
  year: string;
  publishDate?: string;
  altTitle?: string;
  doi?: string;
  url?: string;
  tags?: string[];
  fullText?: string;
}

export const professorProfile = {
  name: "郭盈芝",
  englishName: "YING CHIH KUO",
  title: "助理教授",
  englishTitle: "Assistant Professor",
  department: "教育科技學系",
  institution: "淡江大學",
  motto: "科技賦能教育，創意重塑學習。深耕沉浸式教材設計，引領數位時代的卓越教學。",
  
  about: "我是郭盈芝，現任淡江大學教育科技學系助理教授。長期深耕於教學設計、數位學習及教育科技整合應用，特別關注虛擬實境（VR）與擴增實境（AR）在高等教育與企業培訓中的創新整合。結合了多年大專院校行政管考與產學合作的實戰經驗，致力於將先進科技融入課程教材開發，引導學生透過動手操作與專案管理，在數位內容設計領域取得卓越成就。",
  
  contact: {
    email: "yingchih0704@gmail.com",
    phone: "02-26215656 #2926",
    office: "淡江大學教育館 B611室",
    website: "https://www.educational-technology.edu/"
  },
  
  education: [
    { 
      time: "2017 年 8 月", 
      degree: "教育領導與科技管理 博士",
      desc: "聚焦於教育科技整合、組織變革與高階數位教材研發管理之跨領域研究。"
    },
    { 
      time: "2005 年 8 月", 
      degree: "教育科技學系 碩士",
      desc: "奠定教學設計理論基礎、數位學習平台開發及多媒體教學資源管理之學術根基。"
    }
  ] as Education[],
  
  experience: [
    {
      time: "2025年8月 – 現任",
      role: "淡江大學教育科技學系 助理教授",
      desc: "教授「數位內容設計」、「教學設計原理」、「多媒體教材研發」等專業課程，開展融合 AR/VR 之創新教材教學實踐研究。"
    },
    {
      time: "2022年8月 – 2025年7月",
      role: "醒吾科技大學 研發處 副研發長",
      desc: "統籌校級產學合作案、推動研發專案與外部學術資源整合，對接企業人才數位轉型與實踐社會責任計畫。"
    },
    {
      time: "2016年8月 – 2025年7月",
      role: "醒吾科技大學 資訊科技應用系 助理教授",
      desc: "開授資訊科技、商務數據分析與專案管理實務，指導學生將科技工具應用於實際企業場域。"
    },
    {
      time: "2016年8月 – 2025年7月",
      role: "醒吾科技大學 研發處 計畫管考中心主任",
      desc: "管理教育部、國家科學及技術委員會等大型研究及校務發展計畫，建立嚴謹的高效管考標準化機制與成果展現平台。"
    },
    {
      time: "2007年7月 – 2016年7月",
      role: "醒吾科技大學 資訊管理系 助理",
      desc: "協助系務推動、資訊系統維護、教學行政管考與產學合作業務支援。"
    }
  ] as Experience[],

  expertise: [
    "教學設計",
    "數位學習",
    "教育科技應用",
    "VR/AR教材開發",
    "數位內容設計",
    "專案管理",
    "資訊科技整合應用"
  ],

  certifications: [
    { name: "MOS Excel 2010 專業大師級認證", authority: "Microsoft" },
    { name: "MOS Word 2010 專業大師級認證", authority: "Microsoft" },
    { name: "MOS Excel 2003 專業大師級認證", authority: "Microsoft" },
    { name: "EC-Council Security5 資訊安全國際證照", authority: "EC-Council" },
    { name: "CRM 商品分析師證照", authority: "中華民國應用商業管理協會" }
  ],

  govProjects: [
    {
      period: "2026 年/1 月~2026 年/12 月",
      year: "115",
      title: "教育部 115 年沉浸科技導入素養導向教學領航推動計畫(總計畫)",
      role: "協同主持人",
      highlightWords: "沉浸科技導入素養導向教學領航推動計畫",
      isStarred: true
    },
    {
      period: "2025 年/1 月~2025 年 11 月",
      year: "114",
      title: "教育部沉浸科技導入素養導向教學領航計畫先導規劃計畫",
      role: "協同主持人",
      highlightWords: "沉浸科技導入素養導向教學領航計畫先導規劃計畫",
      isStarred: true
    },
    {
      period: "2023 年 3 月 1 日~2025 年 11 月 30 日",
      year: "112-114",
      title: "112-114 年教育部 VR/AR 教材開發推動及示範計畫",
      role: "協同主持人",
      highlightWords: "VR/AR 教材開發推動及示範計畫",
      isStarred: true
    },
    {
      period: "2023年8月1日~2024年7月31日",
      year: "112",
      title: "教育部 補助技專校院辦理產業學院計畫 「生成式AI工具應用於電商行銷精進師生實務職能方案」",
      role: "計畫主持人",
      highlightWords: "補助技專校院辦理產業學院計畫 「生成式AI工具應用於電商行銷精進師生實務職能方案」",
      isStarred: true
    },
    {
      period: "2022年8月1日~2023年7月31日",
      year: "111",
      title: "教育部 發展與改進原住民技職教育計畫",
      role: "計畫主持人",
      highlightWords: "發展與改進原住民技職教育計畫",
      isStarred: true
    }
  ] as GovProject[],

  coopProjects: [
    {
      year: "115",
      title: "工業技術研究院委託｜115 年職業訓練導入智慧教學訓練場域規劃級成效評估機制建議委案（勞動部勞動力發展署）",
      funding: "42 萬",
      isStarred: true
    },
    {
      year: "114-118",
      title: "114-118 年 中小企業 ESG 導入與創新轉型輔導教育訓練推廣計畫",
      funding: "560 萬",
      isStarred: true
    },
    {
      year: "114-115",
      title: "工業技術研究院委託｜114–115 年職業訓練導入智慧教學訓練場域規劃及成效評估機制建議委案（勞動部勞動力發展署）",
      funding: "84 萬",
      isStarred: true
    },
    {
      year: "114",
      title: "工業技術研究院委託｜114 年職業訓練智慧訓練場推廣活動暨應用規劃案（勞動部勞動力發展署）",
      funding: "42 萬",
      isStarred: true
    },
    {
      year: "2023",
      title: "電商營銷人才培訓案",
      role: "計畫主持人",
      funding: "45萬",
      isStarred: true
    },
    {
      year: "2023",
      title: "電商直播代訓案",
      role: "計畫主持人",
      funding: "30萬",
      isStarred: true
    },
    {
      year: "2022",
      title: "電商通路營銷人才培訓案",
      role: "計畫主持人",
      funding: "150萬",
      isStarred: true
    },
    {
      year: "2022",
      title: "瀚荃集團30年紀念影片製作案",
      role: "計畫主持人",
      funding: "12萬",
      isStarred: true
    },
    {
      year: "2022",
      title: "電商人才培訓案",
      role: "計畫主持人",
      funding: "51萬",
      isStarred: true
    },
    {
      year: "2021",
      title: "暑期才藝營隊培訓計畫",
      role: "計畫主持人",
      funding: "14萬",
      isStarred: true
    }
  ] as CoopProject[],

  projectExps: [
    {
      period: "2018年～2024年",
      funding: "4億5千5百萬",
      title: "高教深耕計畫",
      isStarred: false
    },
    {
      period: "2018年～2024年",
      funding: "4千5百萬",
      title: "安心助學附冊",
      detail: "所設計之助學方案於2018年獲教育部青睞，並獲指派至北部與南部大專校院進行經驗分享",
      isStarred: true
    },
    {
      period: "2019年～2021年7月",
      funding: "1千7百萬",
      title: "優化實作計畫",
      isStarred: false
    },
    {
      period: "2016年～2017年",
      funding: "6千1百萬",
      title: "教學卓越計畫",
      isStarred: false
    },
    {
      period: "2015年1月～12月",
      title: "教學卓越計畫 - 資訊大會考規劃與執行",
      isStarred: true
    },
    {
      period: "2013年～2014年",
      title: "北區技專校院教學資源中心",
      isStarred: false
    },
    {
      period: "2011年～2013年",
      title: "打造優質綠色生活數位園區特色典範計畫",
      isStarred: false
    },
    {
      period: "2009年～2011年",
      title: "RFID 資訊應用與安全學程計畫",
      isStarred: false
    },
    {
      period: "2006年～2007月",
      title: "淡江大學教學卓越計畫分項計畫- 數位教材設計",
      isStarred: false
    },
    {
      period: "2006年～2007月",
      title: "數位典藏國家型計畫",
      detail: "數位典藏融入教學課程助教",
      isStarred: true
    },
    {
      period: "2005年～2006年",
      title: "離島及偏遠地區遠距教學計畫",
      isStarred: false
    }
  ] as ProjectExp[],

  academicResearch: {
    journals: [
      {
        authors: "郭盈芝；徐新逸",
        year: "2023",
        publishDate: "2023-04-01",
        title: "數位教材品質檢核指標之建立-以沉浸式虛擬實境教材為例",
        altTitle: "Digital Learning Materials in Technical and Vocational Education and Training: A Systematic Review of Research and Applications",
        source: "教科書研究．16(1),1-43",
        url: "http://tkuir.lib.tku.edu.tw:8080/dspace/handle/987654321/127809",
        tags: ["TSSCI"]
      },
      {
        authors: "徐新逸；郭盈芝",
        year: "2021",
        publishDate: "2021-12-01",
        title: "數位學習在技職教育的發展現況及趨勢分析",
        altTitle: "Use of Digital Learning in Technical and Vocational Education and Training: A Systematic Review of Research and Applications",
        source: "教科書研究．14(3), 79-124",
        url: "http://tkuir.lib.tku.edu.tw:8080/dspace/handle/987654321/127810",
        tags: ["TSSCI"]
      },
      {
        authors: "Chun Chao Shih；Ying Chih Kuo",
        year: "2021",
        publishDate: "2021-07-01",
        title: "Development Trends and Analysis of Collaborative Learning in e-Learning Environments 1988-2019",
        source: "International Journal of Mobile and Blended Learning (IJMBL), 13(3), 1-18",
        url: "http://tkuir.lib.tku.edu.tw:8080/dspace/handle/987654321/127811",
        tags: ["ESCI"]
      },
      {
        authors: "徐新逸；郭盈芝",
        year: "2020",
        publishDate: "2020-08-01",
        title: "建構虛擬實境教材品質確保之評估指標",
        altTitle: "Development of Quality Assurance Criteria for Evaluating VR Digital Materials",
        source: "教育傳播與科技研究．(123)．1-19",
        url: "http://tkuir.lib.tku.edu.tw:8080/dspace/handle/987654321/127812"
      },
      {
        authors: "徐新逸；郭盈芝",
        year: "2006",
        publishDate: "2006-01-01",
        title: "中小學教室遠距進修之學習參與度及學習成效之相關研究",
        altTitle: "Examining the learning engagement and effects on web-based in-service distance training for elementary and high-school teachers",
        source: "空中教育論叢．第 20 集",
        url: "http://tkuir.lib.tku.edu.tw:8080/dspace/handle/987654321/127813"
      }
    ] as AcademicPaper[],
    conferences: [
      {
        authors: "Kuo Y. C.；Sun C.H.",
        year: "2024",
        publishDate: "2024-07-23",
        title: "Research on consumer viewing intention by using generative AI tools to produce short videos",
        source: "The 20th International Conference on Multimedia Information Technology and Applications",
        url: "http://tkuir.lib.tku.edu.tw:8080/dspace/handle/987654321/127967"
      },
      {
        authors: "郭盈芝；邱雅婷；徐新逸",
        year: "2023",
        publishDate: "2023-12-01",
        title: "虛擬實境學習滿意度量表類型之初探",
        source: "TAECT2023 台灣教育傳播暨科技學會@TKU 國際研討會",
        url: "http://tkuir.lib.tku.edu.tw:8080/dspace/handle/987654321/127968"
      },
      {
        authors: "郭盈芝",
        year: "2020",
        publishDate: "2020-10-28",
        title: "數位學習環境中使用協同學習的發展趨勢分析",
        source: "TANET2020 臺灣網際網路研討會",
        url: "http://tkuir.lib.tku.edu.tw:8080/dspace/handle/987654321/127969"
      },
      {
        authors: "郭盈芝；鍾志明",
        year: "2020",
        publishDate: "2020-05-13",
        title: "教師推動教學創新之教師學習領導認知與作為-以某私立科大為例",
        source: "ICEET2020 數位學習與教育科技國際研討會",
        url: "http://tkuir.lib.tku.edu.tw:8080/dspace/handle/987654321/127970"
      },
      {
        authors: "徐新逸；郭盈芝",
        year: "2019",
        publishDate: "2019-11-15",
        title: "Preliminary Study on the Quality Assurance Criteria of VR Instructional Materials",
        source: "2019 年臺灣教育傳播暨科技學會年會@NCTU 國際學術研討會",
        url: "http://tkuir.lib.tku.edu.tw:8080/dspace/handle/987654321/127971"
      },
      {
        authors: "施竣詔；郭盈芝",
        year: "2019",
        publishDate: "2019-05-23",
        title: "中學校長分散式領導、教師專業學習社群、教師組織公民行為關聯之研究：多層次中介效果模式",
        source: "第 23 屆全球華人計算機教育應用大會 GCCCE2019",
        url: "http://tkuir.lib.tku.edu.tw:8080/dspace/handle/987654321/127972"
      },
      {
        authors: "施竣詔；郭盈芝",
        year: "2019",
        publishDate: "2019-05-03",
        title: "問題導向學習對地方創生團體永續經營影響之研究",
        source: "第 25 屆臺灣教育社會學論壇",
        url: "http://tkuir.lib.tku.edu.tw:8080/dspace/handle/987654321/127973"
      },
      {
        authors: "鍾志明；郭盈芝",
        year: "2019",
        publishDate: "2019-04-27",
        title: "技術型科技大學非資訊背景學生程式設計教學方法之研究",
        source: "素養導向課程深耕與創新教學跨域共好研討會",
        url: "http://tkuir.lib.tku.edu.tw:8080/dspace/handle/987654321/127974"
      },
      {
        authors: "施竣詔；謝佩妏；郭盈芝",
        year: "2013",
        publishDate: "2013-11-01",
        title: "我國軍公教人員性別工作不平等之救濟探討以社會助長增進學生提問自我效能之引導策略",
        source: "性別暴力預防與治療國際學術研討會",
        url: "http://tkuir.lib.tku.edu.tw:8080/dspace/handle/987654321/127962"
      },
      {
        authors: "郭盈芝；施竣詔",
        year: "2012",
        publishDate: "2012-05-28",
        title: "以社會助長增進學生提問自我效能之引導策略",
        source: "GCCCE 2012 第十六屆全球華人計算機教育應用大會",
        url: "http://tkuir.lib.tku.edu.tw:8080/dspace/handle/987654321/127963"
      }
    ] as AcademicPaper[],
    dissertations: [
      {
        authors: "郭盈芝",
        year: "2021",
        title: "沉浸式虛擬實境教材品質檢核指標與評量工具發展之研究",
        source: "淡江大學教育科技學系 博士論文 (指導教授：徐新逸)",
        fullText: "郭盈芝 ( 2021 )．沉浸式虛擬實境教材品質檢核指標與評量工具發展之研究．淡江大學教育科技學系博士論文 (指導教授：徐新逸)。"
      },
      {
        authors: "郭盈芝",
        year: "2007",
        title: "數位學習混成方式對學習成效影響之探討：以「教育部離島及偏遠地區遠距教學培訓計畫」為例",
        source: "淡江大學教育科技學系 碩士論文 (指導教授：徐新逸)",
        fullText: "郭盈芝 ( 2007 )．數位學習混成方式對學習成效影響之探討：以「教育部離島及偏遠地區遠距教學培訓計畫」為例．淡江大學教育科技學系碩士論文 (指導教授：徐新逸)。"
      }
    ] as AcademicPaper[],
    reports: {
      introParagraphs: [
        "96 年起於醒吾科大資管系服務擔任系助理共 9 年時間，歷經 96 年、100 年之大專校院評鑑，101 升科大評鑑、102 訪視、103 科大評鑑等，幾次評鑑中分別負責評鑑報告之彙整及編排，在格式要求較為嚴謹的評鑑報告中，習得報告文件格式、樣式熟練技巧，並具備快速精準掌握文章邏輯架構之能力。",
        "除了上述評鑑報告之外，亦參與 97 年教育部補助重要特色領域人才培育改進計畫，98-99 年教育部 RFID 科技及應用人才培育先導計畫、教學卓越計畫、高教深耕計畫等校內幾項大型計畫的彙整與編排。105 年 8 月調任至研發處計畫管考中心後，陸續主導經手計畫之彙整，養成我對報告撰寫具有清楚的邏輯架構，亦已具備撰寫研究報告的能力，主要負責完成之計畫書如下："
      ],
      items: [
        "114-116 年度醒吾科技大學第二期高教深耕計畫書",
        "112-113 年度醒吾科技大學第二期高教深耕計畫書（及期末報告）",
        "107-111 年度醒吾科技大學高教深耕計畫書（及期末報告）",
        "108-110 年度優化實作環境計畫書（及期末報告）",
        "108 年前瞻人才跨領域課群發展計畫書（及期末報告）",
        "107 年教學創新先導計畫書（及期末報告）",
        "106 年度醒吾科技大學教學卓越計畫書（及期末報告）",
        "104-105 年度醒吾科技大學教學卓越計畫期末報告",
        "105 學年度技職再造計畫-系(科)實務課程發展計畫期中報告",
        "104-105 年度北區技專校院教學資源中心期末成果報告",
        "104 學年度技職再造計畫期末報告"
      ]
    },
    workshopsUrl: "https://teacher.tku.edu.tw/PsnCat.aspx?t=psh_a_author_data&u=t952085",
    speeches: [
      {
        title: "5G 新科技學習示範學校輔導計畫 - 輔導專家學者",
        period: "2024/2/1 - 迄今",
        unit: "教育部"
      },
      {
        title: "VR 教材開發與教學應用",
        period: "2025/4/28",
        unit: "國立暨南大學"
      },
      {
        title: "智慧科技與教學",
        period: "2025/3/11",
        unit: "勞動部勞動力發展署"
      },
      {
        title: "沉浸式虛擬實境教材相關經驗與見解",
        period: "2024/4/24",
        unit: "臺北科技大學"
      },
      {
        title: "從專案實戰中談教科專業的助力",
        period: "2023/12/4",
        unit: "淡江大學"
      }
    ]
  }
};
