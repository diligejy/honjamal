/**
 * honjamal - script.js
 * 
 * [Technical Decisions for AI Context]
 * 1. Data Persistence: 'quotes.json' was embedded directly into the array to bypass 
 *    browser CORS issues when running on local 'file://' protocol.
 * 2. Logic Integrity: Implemented with TDD to ensure no duplicate quotes in succession.
 * 3. UX: Soft-reveal animation is triggered via CSS animation reset.
 */
const quotes = [
  {
    "text": "우리들은 남이 행복하지 않은 것은 당연하게 생각하고 자기 자신이 행복하지 않은 것에 대해서는 언제나 납득할 수 없어한다.",
    "book": "모순",
    "author": "양귀자"
  },
  {
    "text": "아껴서 좋은 것은 돈만이 아니었다. 어쩌면 돈보다 더 아껴야 할 것은 우리가 아무 생각 없이 내뱉는 말들이었다.",
    "book": "모순",
    "author": "양귀자"
  },
  {
    "text": "사람들은 작은 상처는 오래 간직하고 큰 은혜는 얼른 망각해버린다.",
    "book": "모순",
    "author": "양귀자"
  },
  {
    "text": "마음이라는 것이 꺼내볼 수 있는 몸속 장기라면, 가끔 가슴에 손을 넣어 꺼내서 따뜻한 물로 씻어주고 싶었다.",
    "book": "밝은 밤",
    "author": "최은영"
  },
  {
    "text": "세상 어느 누구도 나만큼 나를 잔인하게 대할 수는 없었다.",
    "book": "밝은 밤",
    "author": "최은영"
  },
  {
    "text": "자네가 어떤 사람인지, 어떤 사람이 되기로 선택했는지, 자신이 하는 일의 의미가 무엇인지 잊으면 안 되네.",
    "book": "스토너",
    "author": "존 윌리엄스"
  },
  {
    "text": "사랑이란 무언가 되어가는 행위, 순간순간 하루하루 의지와 지성과 마음으로 창조되고 수정되는 상태였다.",
    "book": "스토너",
    "author": "존 윌리엄스"
  },
  {
    "text": "사랑을 더 하고 더 괴로워하겠는가, 아니면 사랑을 덜 하고 덜 괴로워하겠는가? 그게 단 하나의 진짜 질문이다. 얼마나 사랑할지, 제어가 가능한 사람이 어디 있는가? 제어할 수 있다면 그건 사랑이 아니다.",
    "book": "연애의 기억",
    "author": "줄리언 반스"
  },
  {
    "text": "누구를 인정하기 위해서 자신을 깎아내릴 필요는 없어. 사는 건 시소의 문제가 아니라 그네의 문제 같은 거니까.",
    "book": "경애의 마음",
    "author": "김금희"
  },
  {
    "text": "살면서 조금씩 안 부서지는 사람이 어딨어요? 아무 사건 없이 산뜻하게 쿨하게 살자 싶지만 안되잖아요.",
    "book": "경애의 마음",
    "author": "김금희"
  },
  {
    "text": "오늘을 견딘다는 것은 뭐야?\n그건 오늘은 사라지지 않겠다는 거야.",
    "book": "경애의 마음",
    "author": "김금희"
  },
  {
    "text": "이별이 분노나 실망감, 적의 같은 단일한 감정으로 이루어졌다면 오히려 품고 살아가기가 쉬울 것 같았다.",
    "book": "경애의 마음",
    "author": "김금희"
  },
  {
    "text": "바다란 소란스러우면서도 고요한 살아 있는 형이상학, 바라볼 때마다 자신을 잊게 해주고 가라앉혀주는 광막함, 다가와 상처를 핥아주고 체념을 부추기는 닿을 수 있는 무한이었다.",
    "book": "새들은 페루에 가서 죽다",
    "author": "로맹 가리"
  },
  {
    "text": "어떤 기억은 아물지 않습니다. 시간이 흘러 기억이 흐릿해지는 게 아니라, 오히려 그 기억만 남기고 다른 모든 것이 서서히 마모됩니다.",
    "book": "소년이 온다",
    "author": "한강"
  },
  {
    "text": "사랑은 단 하나의 은유에서도 생겨날 수 있다.",
    "book": "참을 수 없는 존재의 가벼움",
    "author": "밀란 쿤데라"
  },
  {
    "text": "나는 언제나 사랑을 찾아다녔다는 것이다. 필사적으로, 집요하게 나는 사랑을 찾는다.",
    "book": "농담",
    "author": "밀란 쿤데라"
  },
  {
    "text": "어떤 사람들은 떠날 때 자신이 가장 예리한 칼을 꺼내든다.",
    "book": "작별하지 않는다",
    "author": "한강"
  },
  {
    "text": "인내와 체념, 슬픔과 불완전한 화해, 강인함과 쓸쓸함은 때로 비슷해 보인다.",
    "book": "작별하지 않는다",
    "author": "한강"
  },
  {
    "text": "희망이 있는 곳에는 반드시 시련이 있는 법이니까.",
    "book": "1Q84",
    "author": "무라카미 하루키"
  },
  {
    "text": "희망은 수가 적고 대부분 추상적이지만, 시련은 지긋지긋할 만큼 많고 대부분 구체적이지.",
    "book": "1Q84",
    "author": "무라카미 하루키"
  },
  {
    "text": "우리가 지금까지 몇 번이나 사랑을 나누었는지 헤아려보았다. 사랑을 할 때마다 무언가 새로운 것이 우리 관계에 보태어진다는 느낌이 들었지만, 동시에 쾌락의 행위와 몸짓이 더해지는 만큼 확실히 우리는 서로 조금씩 멀어져가고 있었다.",
    "book": "단순한 열정",
    "author": "아니 에르노"
  },
  {
    "text": "우리의 삶은 남들만큼 비범하고, 남들의 삶은 우리만큼 초라하다.",
    "book": "살고 싶다는 농담",
    "author": "허지웅"
  },
  {
    "text": "거창한 결론이 삶을 망친다면 사소한 결심들은 동기가 된다.",
    "book": "살고 싶다는 농담",
    "author": "허지웅"
  },
  {
    "text": "사람들은 자신이 야기하지 않은 고통 앞에서는 울 수 있어도 자신이 야기한 상처 앞에서는 목석 같이 굴 것이다.",
    "book": "사랑의 탄생",
    "author": "사이먼 메이"
  },
  {
    "text": "희망은 답이 아니다. 희망 없이도 살아갈 수 있는 상태가 답이다.",
    "book": "인생의 허무를 어떻게 할 것인가",
    "author": "김영민"
  },
  {
    "text": "슬픔이나 무기력, 외로움 같은 감정도 날씨와 비슷하다. 감정은 병의 증상이 아니라 내 삶이나 존재의 내면을 알려주는 자연스러운 반응이다.",
    "book": "당신이 옳다",
    "author": "정혜신"
  },
  {
    "text": "사람의 감정은 항상 옳다. 그 마음이 옳다는 것을 누군가 알아주기만 하면 된다.",
    "book": "당신이 옳다",
    "author": "정혜신"
  },
  {
    "text": "이 세상에 자신의 존재를 대신할 수 있는 것이 아무것도 없다는 사실을 일단 깨닫게 되면, 자기 삶을 던져버리지 못할 것이다. 그는 '왜' 살아야 하는지를 알고 있고, 그래서 그 '어떤' 어려움도 견뎌낼 수 있다.",
    "book": "죽음의 수용소에서",
    "author": "빅터 프랭클"
  },
  {
    "text": "손을 들어 눈을 가리면 높디높은 산을 숨길 수 있는 것처럼 판에 박힌 일상에 매몰되면 세상을 채우는 찬란한 눈부심과 신비로운 경이를 보지 못할 수 있다.",
    "book": "스스로 치유하는 뇌",
    "author": "하시디즘 격언"
  },
  {
    "text": "사랑으로 일어나는 싸움에서 늘 먼저 미안하다고 말하는 이는 잘못을 저지른 쪽이 아니라 더 많이 그리워한 쪽이다.",
    "book": "느낌의 공동체",
    "author": "미확인"
  },
  {
    "text": "자유란, 판단적이고 감정적인 의미를 사물에 덧붙이지 않을 때 생기는 것.",
    "book": "불교는 왜 진실인가",
    "author": "로버트 라이트"
  }
]
;
let lastIndex = -1;

function showQuote() {
  if (quotes.length === 0) return;

  let index;
  do {
    index = Math.floor(Math.random() * quotes.length);
  } while (quotes.length > 1 && index === lastIndex);
  lastIndex = index;

  const q = quotes[index];
  const quoteText = document.getElementById('quote-text');
  const quoteSource = document.getElementById('quote-source');
  
  if (quoteText) quoteText.textContent = q.text;
  if (quoteSource) quoteSource.textContent = q.book ? (q.author ? q.book + ', ' + q.author : q.book) : (q.author || '');

  const card = document.getElementById('quote-card');
  if (card) {
    card.classList.remove('hidden');
    // 애니메이션 리셋
    card.style.animation = 'none';
    void card.offsetWidth;
    card.style.animation = '';
    
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// 페이지 로드 시 바로 한 번 실행하고 싶다면 아래 주석 해제
// window.onload = showQuote;

