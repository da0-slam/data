// ════════════════════════════════════════════════════════════════════
// SLAM 협업 파이프라인  (별도 파일로 분리 — HTML 파서 간섭 없음)
// ════════════════════════════════════════════════════════════════════
window._plScriptStarted  = true;
window._plScriptFinished = false;
window._plInitErr        = null;

// ── Sample influencer data ──────────────────────────────────────────
var PL_INFLUENCERS = [
  {handle:'@beautybylivia',name:'Livia Kang',followers:'284K',email:'livia@example.com',status:'Agree',price:'$120',shipped:false,shipped_date:null,tracking:'',courier:'',posted_tt:'',posted_ig:'',replied:true,opened:true,sent:true,push_sent:false,views:0,likes:0,comments:0,er:0},
  {handle:'@skincaremia',name:'Mia Johnson',followers:'157K',email:'mia@example.com',status:'Agree',price:'$80',shipped:true,shipped_date:'2026-07-18',tracking:'1Z999AA10123456784',courier:'UPS',posted_tt:'https://tiktok.com/@skincaremia/video/123',posted_ig:'',replied:true,opened:true,sent:true,push_sent:false,views:42100,likes:3800,comments:214,er:4.2},
  {handle:'@glowwithsara',name:'Sara Chen',followers:'93K',email:'sara@example.com',status:'Agree',price:'$60',shipped:true,shipped_date:'2026-07-19',tracking:'9400111899223477990500',courier:'USPS',posted_tt:'',posted_ig:'',replied:false,opened:true,sent:true,push_sent:true,views:0,likes:0,comments:0,er:0},
  {handle:'@heyitsluna',name:'Luna Park',followers:'521K',email:'luna@example.com',status:'Nego',price:'$200',shipped:false,shipped_date:null,tracking:'',courier:'',posted_tt:'',posted_ig:'',replied:true,opened:true,sent:true,push_sent:false,views:0,likes:0,comments:0,er:0},
  {handle:'@dailywithamy',name:'Amy Torres',followers:'68K',email:'amy@example.com',status:'Agree',price:'$50',shipped:true,shipped_date:'2026-07-20',tracking:'773849201234',courier:'FedEx',posted_tt:'https://tiktok.com/@dailywithamy/video/456',posted_ig:'https://instagram.com/p/abc123',replied:true,opened:true,sent:true,push_sent:false,views:88400,likes:7120,comments:430,er:5.1},
  {handle:'@kbeautynik',name:'Nik Williams',followers:'312K',email:'nik@example.com',status:'Agree',price:'$150',shipped:false,shipped_date:null,tracking:'',courier:'',posted_tt:'',posted_ig:'',replied:false,opened:false,sent:true,push_sent:false,views:0,likes:0,comments:0,er:0},
  {handle:'@rosyradiance',name:'Rose Kim',followers:'445K',email:'rose@example.com',status:'Agree',price:'$180',shipped:true,shipped_date:'2026-07-21',tracking:'928349123456',courier:'FedEx',posted_tt:'https://tiktok.com/@rosyradiance/video/789',posted_ig:'',replied:true,opened:true,sent:true,push_sent:false,views:134200,likes:11000,comments:892,er:6.3},
  {handle:'@softglowjess',name:'Jess Park',followers:'76K',email:'jess@example.com',status:'Agree',price:'$55',shipped:true,shipped_date:'2026-07-22',tracking:'',courier:'',posted_tt:'',posted_ig:'',replied:true,opened:true,sent:true,push_sent:true,views:0,likes:0,comments:0,er:0},
];

var PL_TEMPLATES = [
  {id:'t1',name:'Cold Outreach',tag:'Cold Outreach',desc:'First contact — introducing the collaboration to a new creator',
   subject:'[SLAM Beauty] Collaboration Opportunity with {{handle}}',
   body:'Hi {{handle}},\n\nI\'m reaching out from SLAM Beauty — we\'re a K-beauty brand with a growing presence on TikTok and Instagram.\n\nWe\'ve been following your content and absolutely love your style! With {{followers}} engaged followers, we think {{handle}} would be a perfect fit for our {{product}} campaign.\n\nHere\'s what we\'re offering:\n- Content: 1x TikTok video + 1x Instagram Reel\n- Free product + collaboration fee: USD {{price}}\n- Timeline: post within 2 weeks of receiving the product\n\nIf this sounds interesting, just reply to this email and we\'ll send over the full brief!\n\nLooking forward to working together,\nSLAM Beauty Team'},
  {id:'t2',name:'Product Shipped',tag:'Shipping Notice',desc:'Sent after the product is dispatched — includes tracking info',
   subject:'[SLAM Beauty] Your package is on the way, {{handle}}!',
   body:'Hi {{handle}},\n\nGreat news — your {{product}} has been shipped!\n\nTracking Details:\n- Carrier: {{courier}}\n- Tracking Number: {{tracking}}\n- Ship Date: {{ship_date}}\n\nEstimated delivery: 3–7 business days.\n\nOnce you receive it, please post within 2 weeks. A few reminders:\n- Tag @slambeauty in your video\n- Include #SLAMBeauty in the caption\n- Reply to this email with the link once it\'s live!\n\nExcited to see your content!\n\nBest,\nSLAM Beauty Team'},
  {id:'t3',name:'Upload Reminder',tag:'Reminder',desc:'Follow-up when no post is detected 2+ weeks after shipping',
   subject:'[SLAM Beauty] Quick check-in — did your package arrive, {{handle}}?',
   body:'Hi {{handle}},\n\nHope you\'re doing well! We sent your {{product}} a little while back and just wanted to check in — did everything arrive okay?\n\nIf there were any issues with the delivery or the product, please let us know and we\'ll sort it out right away.\n\nWhen you\'re ready to post, here\'s a quick reminder:\n- Tag @slambeauty in the video\n- Use #SLAMBeauty in the caption\n- Reply with your post link so we can boost it!\n\nNo rush — just let us know if you need anything.\n\nThanks so much,\nSLAM Beauty Team'},
  {id:'t4',name:'Deal Confirmed',tag:'Contract',desc:'Sent after negotiation — confirms terms and collects shipping address',
   subject:'[SLAM Beauty] Collaboration Confirmed — Please share your address',
   body:'Hi {{handle}},\n\nWe\'re so excited to officially partner with you!\n\nHere\'s a quick summary of the agreed terms:\n- Collaboration fee: USD {{price}}\n- Deliverable: 1x TikTok video\n- Posting deadline: within 2 weeks of receiving the product\n\nTo get your package out ASAP, could you reply with your shipping details?\n- Full name:\n- Address line 1:\n- Address line 2 (apt/suite):\n- City, State, ZIP:\n- Country:\n- Phone number:\n\nWe\'ll get it shipped as soon as we hear back!\n\nCan\'t wait to see your content,\nSLAM Beauty Team'},
];

var PL_SELECTED_TMPL = PL_TEMPLATES[0];
var PL_SELECTED_IDS  = new Set();
var PL_STAGE         = 1;
var PL_SENDING       = false;
var PL_PALETTE       = ['#4A6CF0','#0FA65C','#E06820','#7052CC','#0888D0','#C28800'];

// ── Helpers ──────────────────────────────────────────────────────────
function plColor(handle){
  var h = 0;
  for (var i = 0; i < handle.length; i++) h = (h * 31 + handle.charCodeAt(i)) % PL_PALETTE.length;
  return PL_PALETTE[Math.abs(h) % PL_PALETTE.length];
}

function plFmtNum(n){
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000)    return (n / 1000).toFixed(1) + 'K';
  return String(n);
}

// ── Open / Close ─────────────────────────────────────────────────────
function _plOpen(){
  var ov = document.getElementById('pl-overlay');
  if (!ov) {
    ov = buildPipelineOverlay();
    document.body.appendChild(ov);
  }
  requestAnimationFrame(function(){ ov.classList.add('open'); });
  plGoStage(1);
}

// ── Overlay builder ───────────────────────────────────────────────────
function buildPipelineOverlay(){
  var ov = document.createElement('div');
  ov.id = 'pl-overlay';
  ov.className = 'pl-overlay';

  // topbar
  var topbar = '<div class="pl-topbar">'
    + '<span class="pl-logo">SLAM</span>'
    + '<span style="color:var(--border2);font-size:13px">&rsaquo;</span>'
    + '<span class="pl-title">협업 파이프라인</span>'
    + '<span class="pl-spacer"></span>'
    + '<button class="pl-close" onclick="closePipeline()" title="닫기">&#x2715;</button>'
    + '</div>';

  var stageLabels = [
    ['이메일 발송', 8],
    ['답변 대기',   6],
    ['제품 발송',   6],
    ['업로드 독촉', 2],
    ['완료 / 트래킹', 3]
  ];
  var tabs = '<div class="pl-stages" id="pl-stages">';
  for (var si = 0; si < stageLabels.length; si++) {
    if (si > 0) tabs += '<span class="pl-stage-arrow">&rsaquo;</span>';
    tabs += '<button class="pl-stage' + (si === 0 ? ' active' : '') + '" id="pl-stab-' + (si+1) + '" onclick="plGoStage(' + (si+1) + ')">'
      + '<span class="pl-stage-num">' + (si+1) + '</span> ' + stageLabels[si][0]
      + '<span class="pl-stage-count" id="pl-cnt-' + (si+1) + '">' + stageLabels[si][1] + '</span>'
      + '</button>';
  }
  tabs += '</div>';

  var body = '<div class="pl-body">'
    + '<div class="pl-stage-content active" id="pl-sc-1">' + buildStage1() + '</div>'
    + '<div class="pl-stage-content" id="pl-sc-2">' + buildStage2() + '</div>'
    + '<div class="pl-stage-content" id="pl-sc-3">' + buildStage3() + '</div>'
    + '<div class="pl-stage-content" id="pl-sc-4">' + buildStage4() + '</div>'
    + '<div class="pl-stage-content" id="pl-sc-5">' + buildStage5() + '</div>'
    + '</div>';

  ov.innerHTML = topbar + tabs + body;
  return ov;
}

// ── Stage 1: 이메일 발송 ─────────────────────────────────────────────
function buildStage1(){
  var tmplCards = '';
  for (var ti = 0; ti < PL_TEMPLATES.length; ti++) {
    var t = PL_TEMPLATES[ti];
    tmplCards += '<div class="tmpl-card' + (t.id === PL_SELECTED_TMPL.id ? ' sel' : '') + '" id="tc-' + t.id + '" onclick="plSelectTmpl(\'' + t.id + '\')">'
      + '<div class="tmpl-card-name">' + t.name + '</div>'
      + '<span class="tmpl-card-tag">' + t.tag + '</span>'
      + '<div class="tmpl-card-desc">' + t.desc + '</div>'
      + '</div>';
  }

  var vars = ['handle','followers','product','price','courier','tracking','ship_date'];
  var varChips = '';
  for (var vi = 0; vi < vars.length; vi++) {
    varChips += '<span class="var-chip" onclick="plInsertVar(\'{{' + vars[vi] + '}}\')">{{' + vars[vi] + '}}</span>';
  }

  var agree = PL_INFLUENCERS.filter(function(r){ return r.status === 'Agree'; });
  var recipRows = '';
  for (var ri = 0; ri < agree.length; ri++) {
    var r = agree[ri];
    var sel = PL_SELECTED_IDS.has(r.handle);
    recipRows += '<div class="r-row' + (sel ? ' sel' : '') + '" onclick="plToggleRecip(\'' + r.handle + '\',this)">'
      + '<input class="r-check" type="checkbox"' + (sel ? ' checked' : '') + ' onclick="event.stopPropagation();plToggleRecip(\'' + r.handle + '\',this.closest(\'.r-row\'))">'
      + '<div class="r-av" style="background:' + plColor(r.handle) + ';color:#fff">' + r.handle.slice(1,3).toUpperCase() + '</div>'
      + '<div class="r-info"><div class="r-handle">' + r.handle + '</div><div class="r-sub">' + r.followers + ' &middot; ' + r.email + '</div></div>'
      + '<span class="r-status-badge" style="background:' + (r.sent ? 'var(--green-d)' : 'var(--s2)') + ';color:' + (r.sent ? 'var(--green)' : 'var(--text2)') + '">' + (r.sent ? '발송완료' : '대기') + '</span>'
      + '</div>';
  }

  return '<div class="email-stage">'
    + '<div class="tmpl-lib">'
    + '<div class="tmpl-lib-head">템플릿 라이브러리</div>'
    + '<div class="tmpl-list">' + tmplCards + '</div>'
    + '<div class="tmpl-vars"><div class="tmpl-vars-title">변수 삽입</div>' + varChips + '</div>'
    + '</div>'
    + '<div class="email-center">'
    + '<div class="email-center-head">'
    + '<span class="email-center-head-title">수신자 목록</span>'
    + '<input class="recipient-search" placeholder="검색..." oninput="plFilterRecip(this.value)" id="recip-search">'
    + '<span class="sel-count-lbl" id="sel-count-lbl">0명 선택</span>'
    + '<button class="reply-btn" onclick="plSelectAll()" style="white-space:nowrap;font-size:11px">전체선택</button>'
    + '</div>'
    + '<div class="recipient-list" id="recip-list">' + recipRows + '</div>'
    + '</div>'
    + '<div class="email-preview">'
    + '<div class="email-preview-head">'
    + '<div class="email-preview-title">이메일 미리보기</div>'
    + '<div class="email-field"><label>제목</label><input id="pl-subj" value="' + PL_TEMPLATES[0].subject + '" oninput="plSyncPreview()"></div>'
    + '<div class="email-field"><label>본문</label><textarea id="pl-body" oninput="plSyncPreview()">' + PL_TEMPLATES[0].body + '</textarea></div>'
    + '</div>'
    + '<div class="email-preview-footer">'
    + '<div class="send-progress" id="send-progress">'
    + '<div class="progress-bar-wrap"><div class="progress-bar-fill" id="prog-fill" style="width:0%"></div></div>'
    + '<div class="progress-lbl" id="prog-lbl">준비 중...</div>'
    + '</div>'
    + '<button class="send-all-btn" id="send-all-btn" onclick="plStartSend()">&#9889; 일괄 발송</button>'
    + '</div>'
    + '</div>'
    + '</div>';
}

// ── Stage 2: 답변 대기 ───────────────────────────────────────────────
function buildStage2(){
  var replied  = PL_INFLUENCERS.filter(function(r){ return r.sent && r.replied; });
  var noReply  = PL_INFLUENCERS.filter(function(r){ return r.sent && !r.replied; });

  function cardHTML(r, withAction){
    return '<div class="reply-card">'
      + '<div class="r-av" style="background:' + plColor(r.handle) + ';color:#fff;width:36px;height:36px;flex-shrink:0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700">' + r.handle.slice(1,3).toUpperCase() + '</div>'
      + '<div class="reply-card-info"><div class="reply-card-handle">' + r.handle + '</div><div class="reply-card-sub">' + r.followers + ' &middot; ' + r.email + '</div></div>'
      + (withAction
          ? '<span class="reply-status replied">답장 완료</span><div class="reply-actions"><button class="reply-btn primary" onclick="plGoStage(3)">제품 발송 &rarr;</button></div>'
          : '<span class="reply-status ' + (r.opened ? 'opened' : 'sent') + '">' + (r.opened ? '읽음' : '미확인') + '</span><div class="reply-actions"><button class="reply-btn" onclick="plResendEmail(\'' + r.handle + '\')">재발송</button></div>')
      + '</div>';
  }

  var repliedHTML = '';
  for (var i = 0; i < replied.length; i++) repliedHTML += cardHTML(replied[i], true);
  var noReplyHTML = '';
  for (var j = 0; j < noReply.length; j++) noReplyHTML += cardHTML(noReply[j], false);

  return '<div class="reply-stage">'
    + '<div><div class="reply-section-title">&#x2705; 답장 완료 (' + replied.length + '명)</div>' + repliedHTML + '</div>'
    + '<div><div class="reply-section-title">&#x23F3; 미답장 (' + noReply.length + '명)</div>' + noReplyHTML + '</div>'
    + '</div>';
}

// ── Stage 3: 제품 발송 ───────────────────────────────────────────────
function buildStage3(){
  var agreed = PL_INFLUENCERS.filter(function(r){ return r.replied; });
  var rows = '';
  for (var i = 0; i < agreed.length; i++) {
    var r = agreed[i];
    var key = r.handle.replace('@','');
    var opts = ['UPS','USPS','FedEx','DHL'].map(function(c){
      return '<option' + (r.courier === c ? ' selected' : '') + '>' + c + '</option>';
    }).join('');
    rows += '<div class="ship-card" id="ship-card-' + key + '">'
      + '<div class="ship-av" style="background:' + plColor(r.handle) + ';color:#fff">' + r.handle.slice(1,3).toUpperCase() + '</div>'
      + '<div><div class="ship-info-handle">' + r.handle + '</div><div class="ship-info-sub">' + r.followers + '</div></div>'
      + '<select class="ship-select" id="sc-' + key + '"><option value=""' + (!r.courier ? ' selected' : '') + '>택배사 선택</option>' + opts + '</select>'
      + '<input class="ship-input" placeholder="운송장 번호" id="st-' + key + '" value="' + r.tracking + '">'
      + '<span class="ship-state-badge ' + (r.shipped ? 'shipped' : 'pending') + '" id="sb-' + key + '">' + (r.shipped ? '발송완료' : '발송전') + '</span>'
      + '<button class="ship-confirm-btn' + (r.shipped ? ' done' : '') + '" id="shbtn-' + key + '" onclick="plConfirmShip(\'' + r.handle + '\')">' + (r.shipped ? '&#x2713; 완료' : '발송 확인') + '</button>'
      + '</div>';
  }
  return '<div class="ship-stage">'
    + '<div class="ship-head"><span style="font-size:13px;font-weight:700;color:var(--text)">제품 발송 관리</span><span style="font-size:12px;color:var(--text2);margin-left:8px">답장한 인플루언서 ' + agreed.length + '명</span></div>'
    + '<div class="ship-list">' + rows + '</div>'
    + '</div>';
}

// ── Stage 4: 업로드 독촉 ─────────────────────────────────────────────
function buildStage4(){
  var list = PL_INFLUENCERS.filter(function(r){ return r.shipped && !r.posted_tt && !r.posted_ig; });
  var rows = '';
  for (var i = 0; i < list.length; i++) {
    var r = list[i];
    var key = r.handle.replace('@','');
    var daysAgo = r.shipped_date ? Math.floor((Date.now() - new Date(r.shipped_date)) / 86400000) : 0;
    var urgent = daysAgo > 10;
    rows += '<div class="push-card">'
      + '<div class="r-av" style="background:' + plColor(r.handle) + ';color:#fff;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700">' + r.handle.slice(1,3).toUpperCase() + '</div>'
      + '<div><div style="font-size:13px;font-weight:600;color:var(--text)">' + r.handle + '</div><div style="font-size:11px;color:var(--text2)">' + r.followers + '</div></div>'
      + '<div class="push-days' + (urgent ? ' urgent' : '') + '">' + (r.shipped_date ? '발송 ' + daysAgo + '일 경과' : '날짜 미확인') + (urgent ? ' &#x26A0;&#xFE0F;' : '') + '</div>'
      + '<span style="font-size:11px;color:var(--text2)">' + r.courier + ' &middot; ' + (r.tracking || '&mdash;') + '</span>'
      + '<button class="push-btn' + (r.push_sent ? ' done' : '') + '" id="pushbtn-' + key + '" onclick="plSendPush(\'' + r.handle + '\')">' + (r.push_sent ? '&#x2713; 발송됨' : '독촉 이메일 발송') + '</button>'
      + '</div>';
  }
  return '<div class="push-stage">'
    + '<div style="font-size:13px;font-weight:700;color:var(--text);padding-bottom:8px">업로드 독촉 리스트 &mdash; 제품 발송 후 미업로드 ' + list.length + '명</div>'
    + rows
    + '</div>';
}

// ── Stage 5: 완료 / 트래킹 ───────────────────────────────────────────
function buildStage5(){
  var posted       = PL_INFLUENCERS.filter(function(r){ return r.posted_tt || r.posted_ig; });
  var totalViews   = posted.reduce(function(s,r){ return s + r.views; }, 0);
  var totalLikes   = posted.reduce(function(s,r){ return s + r.likes; }, 0);
  var totalCmts    = posted.reduce(function(s,r){ return s + r.comments; }, 0);
  var avgER        = posted.length ? (posted.reduce(function(s,r){ return s + r.er; }, 0) / posted.length).toFixed(1) : 0;

  var summary = '<div class="track-summary">'
    + '<div class="track-stat"><div class="track-stat-val">' + posted.length + '</div><div class="track-stat-lbl">업로드 완료</div></div>'
    + '<div class="track-stat"><div class="track-stat-val">' + plFmtNum(totalViews) + '</div><div class="track-stat-lbl">총 조회수</div></div>'
    + '<div class="track-stat"><div class="track-stat-val">' + plFmtNum(totalLikes) + '</div><div class="track-stat-lbl">총 좋아요</div></div>'
    + '<div class="track-stat"><div class="track-stat-val">' + plFmtNum(totalCmts) + '</div><div class="track-stat-lbl">총 댓글</div></div>'
    + '<div class="track-stat"><div class="track-stat-val">' + avgER + '%</div><div class="track-stat-lbl">평균 ER</div></div>'
    + '</div>';

  var toolbar = '<div class="track-toolbar">'
    + '<input placeholder="@handle 또는 URL 검색...">'
    + '<span style="font-size:12px;color:var(--text2)">플랫폼:</span>'
    + '<button class="reply-btn" style="font-size:12px">전체</button>'
    + '<button class="reply-btn" style="font-size:12px">TikTok</button>'
    + '<button class="reply-btn" style="font-size:12px">Instagram</button>'
    + '<button class="apify-btn" onclick="plApifyRefresh(this)">'
    + '<span class="apify-icon">&#x27F3;</span> Apify 새로고침'
    + '</button>'
    + '</div>';

  var cards = '';
  for (var i = 0; i < posted.length; i++) {
    var r = posted[i];
    var kocEntry = (typeof kocMap !== 'undefined' ? kocMap[r.handle.replace('@','')] : null) || {};
    var thumb = kocEntry.thumb || '';
    var thumbHTML = (thumb && typeof _isExpired === 'function' && !_isExpired(thumb))
      ? '<img class="track-thumb" src="' + thumb + '" onerror="this.style.display=\'none\'" loading="lazy">'
      : '<div class="track-thumb-placeholder">&#x1F3AC;</div>';
    var viewLink = r.posted_tt
      ? '<a class="track-view-btn" href="' + r.posted_tt + '" target="_blank">TikTok 보기 &rarr;</a>'
      : (r.posted_ig ? '<a class="track-view-btn" href="' + r.posted_ig + '" target="_blank">Instagram 보기 &rarr;</a>' : '<span></span>');
    cards += '<div class="track-card">'
      + thumbHTML
      + '<div class="track-card-body">'
      + '<div class="track-card-handle">' + r.handle + '</div>'
      + '<div class="track-card-cap">' + r.followers + ' 팔로워</div>'
      + '<div class="track-metrics">'
      + '<div class="track-metric"><span>&#x25B6;</span><span class="track-metric-val">' + plFmtNum(r.views) + '</span></div>'
      + '<div class="track-metric"><span>&#x2665;</span><span class="track-metric-val">' + plFmtNum(r.likes) + '</span></div>'
      + '<div class="track-metric"><span>&#x1F4AC;</span><span class="track-metric-val">' + plFmtNum(r.comments) + '</span></div>'
      + '</div>'
      + '</div>'
      + '<div class="track-card-footer">' + viewLink + '<span class="track-er">ER ' + r.er + '%</span></div>'
      + '</div>';
  }

  return '<div class="track-stage">' + summary + toolbar + '<div class="track-grid">' + cards + '</div></div>';
}

// ── Stage navigation ──────────────────────────────────────────────────
function plGoStage(n){
  PL_STAGE = n;
  for (var i = 1; i <= 5; i++) {
    var tab = document.getElementById('pl-stab-' + i);
    var sc  = document.getElementById('pl-sc-'   + i);
    if (tab) tab.classList.toggle('active', i === n);
    if (sc)  sc.classList.toggle('active',  i === n);
  }
}

// ── Template select ───────────────────────────────────────────────────
function plSelectTmpl(id){
  PL_SELECTED_TMPL = null;
  for (var i = 0; i < PL_TEMPLATES.length; i++) if (PL_TEMPLATES[i].id === id) PL_SELECTED_TMPL = PL_TEMPLATES[i];
  if (!PL_SELECTED_TMPL) return;
  document.querySelectorAll('.tmpl-card').forEach(function(el){ el.classList.remove('sel'); });
  var card = document.getElementById('tc-' + id);
  if (card) card.classList.add('sel');
  var subjEl = document.getElementById('pl-subj');
  var bodyEl = document.getElementById('pl-body');
  if (subjEl) subjEl.value = PL_SELECTED_TMPL.subject;
  if (bodyEl) bodyEl.value = PL_SELECTED_TMPL.body;
}

function plInsertVar(v){
  var ta = document.getElementById('pl-body');
  if (!ta) return;
  var s = ta.selectionStart, e = ta.selectionEnd;
  ta.value = ta.value.slice(0,s) + v + ta.value.slice(e);
  ta.setSelectionRange(s + v.length, s + v.length);
  ta.focus();
}

function plToggleRecip(handle, row){
  if (PL_SELECTED_IDS.has(handle)) PL_SELECTED_IDS.delete(handle);
  else PL_SELECTED_IDS.add(handle);
  row.classList.toggle('sel', PL_SELECTED_IDS.has(handle));
  var cb = row.querySelector('.r-check');
  if (cb) cb.checked = PL_SELECTED_IDS.has(handle);
  plUpdateSelCount();
}

function plSelectAll(){
  var rows = document.querySelectorAll('#recip-list .r-row');
  var agreeCount = PL_INFLUENCERS.filter(function(r){ return r.status === 'Agree'; }).length;
  var allSel = PL_SELECTED_IDS.size >= agreeCount;
  PL_SELECTED_IDS.clear();
  rows.forEach(function(row){
    var h = row.querySelector('.r-handle');
    if (h) h = h.textContent;
    if (!allSel && h){ PL_SELECTED_IDS.add(h); row.classList.add('sel'); var cb=row.querySelector('.r-check'); if(cb) cb.checked=true; }
    else { row.classList.remove('sel'); var cb2=row.querySelector('.r-check'); if(cb2) cb2.checked=false; }
  });
  plUpdateSelCount();
}

function plUpdateSelCount(){
  var el = document.getElementById('sel-count-lbl');
  if (el) el.textContent = PL_SELECTED_IDS.size + '명 선택';
  var btn = document.getElementById('send-all-btn');
  if (btn) btn.disabled = PL_SELECTED_IDS.size === 0;
}

function plFilterRecip(q){
  document.querySelectorAll('#recip-list .r-row').forEach(function(row){
    row.style.display = row.textContent.toLowerCase().includes(q.toLowerCase()) ? '' : 'none';
  });
}

function plSyncPreview(){ /* textarea already reactive */ }

function plStartSend(){
  if (PL_SENDING || PL_SELECTED_IDS.size === 0) return;
  PL_SENDING = true;
  var btn  = document.getElementById('send-all-btn');
  var prog = document.getElementById('send-progress');
  var fill = document.getElementById('prog-fill');
  var lbl  = document.getElementById('prog-lbl');
  if (btn)  btn.style.display = 'none';
  if (prog) prog.classList.add('show');
  var handles = Array.from(PL_SELECTED_IDS);
  var total = handles.length;
  var done  = 0;
  function sendNext(){
    if (done >= total) {
      if (lbl) lbl.textContent = '✅ ' + total + '명 발송 완료!';
      PL_SENDING = false;
      setTimeout(function(){
        if (prog) prog.classList.remove('show');
        if (btn)  { btn.style.display = ''; btn.textContent = '✓ 재발송'; }
      }, 2500);
      return;
    }
    setTimeout(function(){
      done++;
      var pct = Math.round(done / total * 100);
      if (fill) fill.style.width = pct + '%';
      if (lbl)  lbl.textContent = done + '/' + total + ' 발송 중... ' + handles[done-1];
      var inf = null;
      for (var i = 0; i < PL_INFLUENCERS.length; i++) if (PL_INFLUENCERS[i].handle === handles[done-1]) { inf = PL_INFLUENCERS[i]; break; }
      if (inf) inf.sent = true;
      sendNext();
    }, 280 + Math.random() * 200);
  }
  sendNext();
}

function plResendEmail(handle){
  var btn = event && event.target ? event.target : null;
  if (btn) { btn.textContent = '발송 중...'; btn.disabled = true; }
  setTimeout(function(){
    if (btn) btn.textContent = '✓ 발송됨';
    for (var i = 0; i < PL_INFLUENCERS.length; i++) if (PL_INFLUENCERS[i].handle === handle) PL_INFLUENCERS[i].sent = true;
  }, 800);
}

function plConfirmShip(handle){
  var key     = handle.replace('@','');
  var carrier = document.getElementById('sc-' + key);
  var trk     = document.getElementById('st-' + key);
  var inf     = null;
  for (var i = 0; i < PL_INFLUENCERS.length; i++) if (PL_INFLUENCERS[i].handle === handle) { inf = PL_INFLUENCERS[i]; break; }
  if (!inf) return;
  inf.courier      = carrier ? carrier.value : '';
  inf.tracking     = trk    ? trk.value    : '';
  inf.shipped      = true;
  inf.shipped_date = new Date().toISOString().slice(0,10);
  var badge = document.getElementById('sb-'    + key);
  var sbtn  = document.getElementById('shbtn-' + key);
  if (badge) { badge.textContent = '발송완료'; badge.className = 'ship-state-badge shipped'; }
  if (sbtn)  { sbtn.textContent  = '✓ 완료';  sbtn.className  = 'ship-confirm-btn done'; sbtn.disabled = true; }
}

function plSendPush(handle){
  var key = handle.replace('@','');
  var inf = null;
  for (var i = 0; i < PL_INFLUENCERS.length; i++) if (PL_INFLUENCERS[i].handle === handle) { inf = PL_INFLUENCERS[i]; break; }
  if (!inf || inf.push_sent) return;
  var btn = document.getElementById('pushbtn-' + key);
  if (!btn) return;
  btn.textContent = '발송 중...'; btn.disabled = true;
  setTimeout(function(){
    inf.push_sent   = true;
    btn.textContent = '✓ 발송됨';
    btn.className   = 'push-btn done';
  }, 700);
}

function plApifyRefresh(btn){
  btn.classList.add('loading');
  setTimeout(function(){
    btn.classList.remove('loading');
    var sc5 = document.getElementById('pl-sc-5');
    if (sc5) sc5.innerHTML = buildStage5();
  }, 1500);
}

// ── 완료 플래그 + 전역 등록 ──────────────────────────────────────────
window._plScriptFinished = true;
window._plOpen           = _plOpen;
console.log('[Pipeline] Loaded OK');
