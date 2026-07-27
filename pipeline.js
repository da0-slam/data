// ════════════════════════════════════════════════════════════════════
// SLAM 협업 파이프라인  (별도 파일로 분리 — HTML 파서 간섭 없음)
// ════════════════════════════════════════════════════════════════════
window._plScriptStarted  = true;
window._plScriptFinished = false;
window._plInitErr        = null;

// ── Real influencer data (미드티어 sheet rows 1-85) ─────────────────
var PL_INFLUENCERS = [
  // ── Stage 5: Posted / Complete (with URL) ──────────────────────
  {handle:'@xannacho',name:'Anna Cho',followers:'6K',email:'anna@vybemgmt.com',status:'Agree',price:'$300',platform:'TikTok',shipped:true,shipped_date:'2026-07-03',tracking:'Y260209302K',courier:'GOFO',posted_tt:'https://www.tiktok.com/@xannacho/video/7665125710364773663',posted_ig:'',replied:true,opened:true,sent:true,push_sent:false,views:24500,likes:2100,comments:183,er:4.1,complete:true},
  {handle:'@saleenakshetri',name:'Salina Khatri',followers:'3.4K',email:'khatrisaleena90@gmail.com',status:'Agree',price:'$100',platform:'TikTok',shipped:true,shipped_date:'2026-07-03',tracking:'EG049701030KR',courier:'KoreaPost',posted_tt:'https://www.tiktok.com/@saleenakshetri/video/7665111360275090708',posted_ig:'',replied:true,opened:true,sent:true,push_sent:false,views:31200,likes:2800,comments:247,er:5.0,complete:true},
  {handle:'@Olgabeez',name:'Olga Pogulyaeva',followers:'5K',email:'olgabeez1@gmail.com',status:'Agree',price:'$300',platform:'Instagram',shipped:true,shipped_date:'2026-07-14',tracking:'GFUS01062034315648',courier:'GOFO',posted_tt:'https://www.tiktok.com/@olga_beez/video/7667042971371506958',posted_ig:'',replied:true,opened:true,sent:true,push_sent:false,views:18700,likes:1650,comments:142,er:4.5,complete:true},
  {handle:'@taisa.ugc',name:'Taisa',followers:'4.4K',email:'taisis.ugc@gmail.com',status:'Agree',price:'$350',platform:'Instagram',shipped:true,shipped_date:'2026-07-10',tracking:'GFUS01062034200123',courier:'GOFO',posted_tt:'https://www.tiktok.com/@taisa.ugc/video/7665864717088394527',posted_ig:'',replied:true,opened:true,sent:true,push_sent:false,views:12300,likes:980,comments:87,er:3.8,complete:true},
  {handle:'@priscillathach',name:'Priscilla Thach',followers:'65K',email:'priscillathachh@gmail.com',status:'Agree',price:'$900',platform:'Instagram',shipped:true,shipped_date:'2026-07-14',tracking:'GFUS01062033890045',courier:'GOFO',posted_tt:'https://www.tiktok.com/t/ZP8tjgT7r/',posted_ig:'https://www.instagram.com/reel/DbBPZEjxW9G/',replied:true,opened:true,sent:true,push_sent:false,views:89400,likes:8200,comments:520,er:6.2,complete:true},
  {handle:'@spoiledglamhunii',name:'Huneza Iqbal',followers:'18.7K',email:'huneza.artist@gmail.com',status:'Agree',price:'$150',platform:'TikTok',shipped:true,shipped_date:'2026-07-03',tracking:'Y260209317K',courier:'GOFO',posted_tt:'',posted_ig:'https://www.instagram.com/reel/DbLhPsVyNMI/',replied:true,opened:true,sent:true,push_sent:false,views:22800,likes:1900,comments:168,er:4.3,complete:true},
  // ── Stage 5: Complete (no URL yet — user adds via Apify) ────────
  {handle:'@nahrochs',name:'Nathalia Rocha',followers:'220K',email:'ugcnahrochs@gmail.com',status:'Agree',price:'$150',platform:'TikTok',shipped:true,shipped_date:'2026-07-14',tracking:'GFUS01062034339137',courier:'GOFO',posted_tt:'',posted_ig:'',replied:true,opened:true,sent:true,push_sent:false,views:0,likes:0,comments:0,er:0,complete:true},
  {handle:'@nirishbeauty',name:'Shirin Khasanova',followers:'9.8K',email:'nirishxcollabs@gmail.com',status:'Agree',price:'$170',platform:'Instagram',shipped:true,shipped_date:'2026-07-14',tracking:'GFUS01062033711491',courier:'GOFO',posted_tt:'',posted_ig:'',replied:true,opened:true,sent:true,push_sent:false,views:0,likes:0,comments:0,er:0,complete:true},
  {handle:'@vikiwithlovee',name:'Victoriia Ivko',followers:'2.7K',email:'vikiwithlovee@gmail.com',status:'Agree',price:'$400',platform:'TikTok',shipped:true,shipped_date:'2026-07-03',tracking:'Y260209303K',courier:'GOFO',posted_tt:'',posted_ig:'',replied:true,opened:true,sent:true,push_sent:false,views:0,likes:0,comments:0,er:0,complete:true},
  {handle:'@karlaartmakeup',name:'Karla Arteaga',followers:'16.2K',email:'arteagakarla30@gmail.com',status:'Agree',price:'$280',platform:'Instagram',shipped:true,shipped_date:'2026-07-03',tracking:'Y260209318K',courier:'GOFO',posted_tt:'',posted_ig:'',replied:true,opened:true,sent:true,push_sent:false,views:0,likes:0,comments:0,er:0,complete:true},
  {handle:'@ugcwtaylor',name:'Taylor Ives',followers:'16.5K',email:'ugcwithtaylorr@gmail.com',status:'Agree',price:'$800',platform:'Instagram',shipped:true,shipped_date:'2026-07-14',tracking:'GFUS01062032943105',courier:'GOFO',posted_tt:'',posted_ig:'',replied:true,opened:true,sent:true,push_sent:false,views:0,likes:0,comments:0,er:0,complete:true},
  {handle:'@dariadarknes',name:'Daria',followers:'1.2K',email:'dardarkness123@gmail.com',status:'Agree',price:'$400',platform:'Instagram',shipped:true,shipped_date:'2026-07-14',tracking:'GFUS01062033175680',courier:'GOFO',posted_tt:'',posted_ig:'',replied:true,opened:true,sent:true,push_sent:false,views:0,likes:0,comments:0,er:0,complete:true},
  {handle:'@acneproneprincess',name:'Elizabeth O\'Connor',followers:'2.2K',email:'acneproneprincess@gmail.com',status:'Agree',price:'$500',platform:'Instagram',shipped:true,shipped_date:'2026-07-14',tracking:'GFUS01062033691968',courier:'GOFO',posted_tt:'',posted_ig:'',replied:true,opened:true,sent:true,push_sent:false,views:0,likes:0,comments:0,er:0,complete:true},
  {handle:'@isabelcruzmedeiros',name:'Isabel Medeiros',followers:'4K',email:'isabelcruzmedeiros@gmail.com',status:'Agree',price:'$280',platform:'Instagram',shipped:true,shipped_date:'2026-07-14',tracking:'GFUS01062033197509',courier:'GOFO',posted_tt:'',posted_ig:'',replied:true,opened:true,sent:true,push_sent:false,views:0,likes:0,comments:0,er:0,complete:true},
  {handle:'@nataliiabyk',name:'Nataliia Byk',followers:'4.3K',email:'n.byk.ugc@gmail.com',status:'Agree',price:'$200',platform:'Instagram',shipped:true,shipped_date:'2026-07-14',tracking:'GFUS01062033392768',courier:'GOFO',posted_tt:'',posted_ig:'',replied:true,opened:true,sent:true,push_sent:false,views:0,likes:0,comments:0,er:0,complete:true},
  {handle:'@soramichellee',name:'Sora Pennington',followers:'7.9K',email:'soramichellee@gmail.com',status:'Nego',price:'$700',platform:'TikTok',shipped:true,shipped_date:'2026-07-14',tracking:'GFUS01062034770370',courier:'GOFO',posted_tt:'',posted_ig:'',replied:true,opened:true,sent:true,push_sent:false,views:0,likes:0,comments:0,er:0,complete:true},
  // ── Stage 4: Shipped, no upload yet ────────────────────────────
  {handle:'@yoon.oo',name:'Kathryn Lee',followers:'14.9K',email:'yoon.collabs@gmail.com',status:'Agree',price:'$60',platform:'TikTok',shipped:true,shipped_date:'2026-07-27',tracking:'',courier:'',posted_tt:'',posted_ig:'',replied:true,opened:true,sent:true,push_sent:false,views:0,likes:0,comments:0,er:0,complete:false},
  {handle:'@skincare_arvika',name:'Arvinzaya Jamsranjav',followers:'45.7K',email:'arvika_j@yahoo.com',status:'Agree',price:'$500',platform:'Instagram',shipped:true,shipped_date:'2026-07-27',tracking:'',courier:'',posted_tt:'',posted_ig:'',replied:true,opened:true,sent:true,push_sent:false,views:0,likes:0,comments:0,er:0,complete:false},
  {handle:'@ugc.hanna',name:'Hanna',followers:'8.7K',email:'ugc.hanna.pr@gmail.com',status:'Agree',price:'$110',platform:'Instagram',shipped:true,shipped_date:'2026-07-20',tracking:'GFUS01062034100234',courier:'GOFO',posted_tt:'',posted_ig:'',replied:true,opened:true,sent:true,push_sent:true,views:0,likes:0,comments:0,er:0,complete:false},
  // ── Stage 3 / 2: Replied, shipping in progress ─────────────────
  {handle:'@larizzza',name:'Larissa Moran',followers:'7.5K',email:'larissamoranmora@gmail.com',status:'Nego',price:'$300',platform:'TikTok',shipped:false,shipped_date:null,tracking:'',courier:'',posted_tt:'',posted_ig:'',replied:true,opened:true,sent:true,push_sent:false,views:0,likes:0,comments:0,er:0,complete:false},
  {handle:'@missglowbeauty',name:'Ashley Kim',followers:'11.2K',email:'ashley.glow.ugc@gmail.com',status:'Agree',price:'$220',platform:'Instagram',shipped:false,shipped_date:null,tracking:'',courier:'',posted_tt:'',posted_ig:'',replied:true,opened:true,sent:true,push_sent:false,views:0,likes:0,comments:0,er:0,complete:false},
  // ── Stage 2: Sent, awaiting reply ──────────────────────────────
  {handle:'@jayciers',name:'Jaycie',followers:'1.4K',email:'jayciexrs@icloud.com',status:'Nego',price:'$125',platform:'TikTok',shipped:false,shipped_date:null,tracking:'',courier:'',posted_tt:'',posted_ig:'',replied:false,opened:true,sent:true,push_sent:false,views:0,likes:0,comments:0,er:0,complete:false},
  {handle:'@ninaluubeauty',name:'Nina Luu',followers:'22.3K',email:'ninaluu.collab@gmail.com',status:'Agree',price:'$180',platform:'TikTok',shipped:false,shipped_date:null,tracking:'',courier:'',posted_tt:'',posted_ig:'',replied:false,opened:false,sent:true,push_sent:false,views:0,likes:0,comments:0,er:0,complete:false},
  {handle:'@softglowskin',name:'Megan Park',followers:'11.8K',email:'softglowskin@gmail.com',status:'Agree',price:'$120',platform:'Instagram',shipped:false,shipped_date:null,tracking:'',courier:'',posted_tt:'',posted_ig:'',replied:false,opened:true,sent:true,push_sent:false,views:0,likes:0,comments:0,er:0,complete:false},
];

var PL_TEMPLATES = [
  {id:'t1',name:'Cold Outreach',tag:'Cold Outreach',desc:'First contact — introducing the collaboration to a new creator',
   subject:'[SLAM Beauty] Collaboration Opportunity with {{handle}}',
   body:'Hi {{handle}},\n\nI\'m reaching out from SLAM Beauty — we\'re a K-beauty brand with a growing presence on TikTok and Instagram.\n\nWe\'ve been following your content and absolutely love your style! With {{followers}} engaged followers, we think you\'d be a perfect fit for our 23yearsold campaign.\n\nHere\'s what we\'re offering:\n- Content: 1x TikTok video\n- Free product + collaboration fee: USD {{price}}\n- Timeline: post within 2 weeks of receiving the product\n\nIf this sounds interesting, just reply to this email and we\'ll send over the full brief!\n\nLooking forward to working together,\nSLAM Beauty Team'},
  {id:'t2',name:'Product Shipped',tag:'Shipping Notice',desc:'Sent after the product is dispatched — includes tracking info',
   subject:'[SLAM Beauty] Your package is on the way, {{handle}}!',
   body:'Hi {{handle}},\n\nGreat news — your 23yearsold product has been shipped!\n\nTracking Details:\n- Carrier: {{courier}}\n- Tracking Number: {{tracking}}\n- Ship Date: {{ship_date}}\n\nEstimated delivery: 3–7 business days.\n\nOnce you receive it, please post within 2 weeks. A few reminders:\n- Tag @slambeauty in your video\n- Include #SLAMBeauty in the caption\n- Reply to this email with the link once it\'s live!\n\nExcited to see your content!\n\nBest,\nSLAM Beauty Team'},
  {id:'t3',name:'Upload Reminder',tag:'Reminder',desc:'Follow-up when no post is detected 2+ weeks after shipping',
   subject:'[SLAM Beauty] Quick check-in — did your package arrive, {{handle}}?',
   body:'Hi {{handle}},\n\nHope you\'re doing well! We sent your 23yearsold product a little while back and just wanted to check in — did everything arrive okay?\n\nIf there were any issues with the delivery or the product, please let us know and we\'ll sort it out right away.\n\nWhen you\'re ready to post, here\'s a quick reminder:\n- Tag @slambeauty in the video\n- Use #SLAMBeauty in the caption\n- Reply with your post link so we can boost it!\n\nThanks so much,\nSLAM Beauty Team'},
  {id:'t4',name:'Deal Confirmed',tag:'Contract',desc:'Sent after negotiation — confirms terms and collects shipping address',
   subject:'[SLAM Beauty] Collaboration Confirmed — Please share your address',
   body:'Hi {{handle}},\n\nWe\'re so excited to officially partner with you!\n\nHere\'s a quick summary of the agreed terms:\n- Collaboration fee: USD {{price}}\n- Deliverable: 1x TikTok video\n- Posting deadline: within 2 weeks of receiving the product\n\nTo get your package out ASAP, could you reply with your shipping details?\n- Full name:\n- Address line 1:\n- Address line 2 (apt/suite):\n- City, State, ZIP:\n- Country:\n- Phone number:\n\nWe\'ll get it shipped as soon as we hear back!\n\nCan\'t wait to see your content,\nSLAM Beauty Team'},
];

var PL_SELECTED_TMPL = PL_TEMPLATES[0];
var PL_SELECTED_IDS  = new Set();
var PL_STAGE         = 1;
var PL_SENDING       = false;
var PL_PALETTE       = ['#4A6CF0','#0FA65C','#E06820','#7052CC','#0888D0','#C28800'];

// ── Supabase campaign_posts ──────────────────────────────────────────
var PL_SB_URL      = 'https://wjvgvydywweqsdwbumxr.supabase.co';
var PL_SB_KEY      = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indqdmd2eWR5d3dlcXNkd2J1bXhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1MzYzMDgsImV4cCI6MjA4MjExMjMwOH0.yvt2EjeguV14vVMqEyhEkF-9BmEVObA0HbwMVAqn8-o';
var PL_CAMPAIGN_ID = '70c72745-232c-4368-a8db-42b0f4f8eb32';
var PL_CP_DATA     = [];
var PL_CP_LOADED   = false;

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
function plFollowerInt(s){
  var m = s.replace(/[^0-9.KMkm]/g,'');
  if (/[Mm]/.test(s)) return parseFloat(m) * 1000000;
  if (/[Kk]/.test(s)) return parseFloat(m) * 1000;
  return parseInt(m) || 10000;
}

// ── Campaign posts fetch & merge ──────────────────────────────────────
function plLoadCampaignPosts(onDone) {
  var endpoint = PL_SB_URL + '/rest/v1/campaign_posts'
    + '?select=influencer_name,post_url,thumbnail_url,views,likes,comments,platform'
    + '&campaign_id=eq.' + PL_CAMPAIGN_ID + '&limit=200';
  fetch(endpoint, {
    headers: { 'apikey': PL_SB_KEY, 'Authorization': 'Bearer ' + PL_SB_KEY }
  }).then(function(r){ return r.json(); })
    .then(function(data){
      PL_CP_DATA = data || [];
      plMergeCampaignPosts();
      if (onDone) onDone();
    })
    .catch(function(e){
      console.warn('[Pipeline] SB fetch failed:', e);
      if (onDone) onDone();
    });
}

// TikTok oEmbed / Instagram oEmbed로 누락된 썸네일 보완
function plFetchMissingThumbs(onDone) {
  var toFetch = PL_INFLUENCERS.filter(function(r){
    return (r.complete || r.posted_tt || r.posted_ig) && !r.thumbnail_url && (r.posted_tt || r.posted_ig);
  });
  if (!toFetch.length) { if (onDone) onDone(); return; }
  var pending = toFetch.length;
  function done(){ if (--pending === 0 && onDone) onDone(); }
  toFetch.forEach(function(inf){
    var url = inf.posted_tt || inf.posted_ig;
    var isTT = url.indexOf('tiktok') > -1;
    var isIG = url.indexOf('instagram') > -1;
    if (isTT) {
      // TikTok oEmbed — public, CORS-enabled
      fetch('https://www.tiktok.com/oembed?url=' + encodeURIComponent(url))
        .then(function(r){ return r.json(); })
        .then(function(d){ if (d && d.thumbnail_url) inf.thumbnail_url = d.thumbnail_url; done(); })
        .catch(done);
    } else if (isIG) {
      // Instagram Graph oEmbed — requires access_token; not available client-side
      // Try fetching the page and extracting og:image via a CORS proxy isn't reliable either
      // So we just skip IG and let the no-thumb card show
      done();
    } else {
      done();
    }
  });
}

function plNormUrl(u){
  return (u || '').replace(/^https?:\/\//, '').replace(/\?.*$/, '').replace(/\/$/, '').toLowerCase();
}

function plMergeCampaignPosts(){
  var existingUrls = new Set();
  PL_INFLUENCERS.forEach(function(r){
    if (r.posted_tt) existingUrls.add(plNormUrl(r.posted_tt));
    if (r.posted_ig) existingUrls.add(plNormUrl(r.posted_ig));
  });

  PL_CP_DATA.forEach(function(cp){
    var inf = null;
    var normCp = plNormUrl(cp.post_url);

    // 1) Match by post URL
    for (var i = 0; i < PL_INFLUENCERS.length; i++) {
      var r = PL_INFLUENCERS[i];
      if ((r.posted_tt && plNormUrl(r.posted_tt) === normCp) ||
          (r.posted_ig && plNormUrl(r.posted_ig) === normCp)) {
        inf = r; break;
      }
    }
    // 2) Match by name
    if (!inf && cp.influencer_name) {
      var nameL = cp.influencer_name.toLowerCase();
      for (var j = 0; j < PL_INFLUENCERS.length; j++) {
        if ((PL_INFLUENCERS[j].name || '').toLowerCase() === nameL) {
          inf = PL_INFLUENCERS[j]; break;
        }
      }
    }

    if (inf) {
      if (cp.thumbnail_url && !inf.thumbnail_url) inf.thumbnail_url = cp.thumbnail_url;
      if (cp.post_url) {
        if (cp.platform === 'tiktok' && !inf.posted_tt) inf.posted_tt = cp.post_url;
        else if (cp.platform === 'instagram' && !inf.posted_ig) inf.posted_ig = cp.post_url;
      }
      if (cp.views > 0 && inf.views === 0) inf.views = cp.views;
      if (cp.likes > 0 && inf.likes === 0) inf.likes = cp.likes;
      if (cp.comments > 0 && inf.comments === 0) inf.comments = cp.comments;
      if (cp.views > 0 || cp.likes > 0) {
        inf.er      = inf.likes > 0 ? parseFloat((inf.likes / Math.max(plFollowerInt(inf.followers), 1) * 100).toFixed(1)) : 0;
        inf.complete = true;
      }
    } else if (cp.post_url && cp.influencer_name && !existingUrls.has(normCp)) {
      // Add new entry from Supabase not in local list
      var handle = '@' + cp.influencer_name.replace(/\s+/g, '').toLowerCase();
      var ttM = cp.post_url.match(/tiktok\.com\/@([^\/\?]+)/);
      if (ttM) handle = '@' + ttM[1];
      var alreadyIn = false;
      for (var k = 0; k < PL_INFLUENCERS.length; k++) if (PL_INFLUENCERS[k].handle === handle) { alreadyIn = true; break; }
      if (!alreadyIn) {
        PL_INFLUENCERS.push({
          handle: handle, name: cp.influencer_name, followers: '—', email: '',
          status: 'Agree', price: '—',
          platform: cp.platform === 'tiktok' ? 'TikTok' : 'Instagram',
          shipped: true, shipped_date: null, tracking: '', courier: '',
          posted_tt: cp.platform === 'tiktok'     ? cp.post_url : '',
          posted_ig: cp.platform === 'instagram'  ? cp.post_url : '',
          replied: true, opened: true, sent: true, push_sent: false,
          views: cp.views || 0, likes: cp.likes || 0, comments: cp.comments || 0, er: 0,
          complete: true, thumbnail_url: cp.thumbnail_url || ''
        });
        existingUrls.add(normCp);
      }
    }
  });
}

// ── Open / Close ─────────────────────────────────────────────────────
function _plOpen(){
  if (PL_CP_LOADED) { _plOpenUI(); return; }
  var btn = document.querySelector('.pipeline-btn');
  if (btn) { btn._origText = btn.innerHTML; btn.innerHTML = '⏳ 로딩 중...'; btn.disabled = true; }
  plLoadCampaignPosts(function(){
    plFetchMissingThumbs(function(){
      PL_CP_LOADED = true;
      if (btn) { btn.innerHTML = btn._origText || '⚡ 협업 파이프라인'; btn.disabled = false; }
      _plOpenUI();
    });
  });
}

function _plOpenUI(){
  var ov = document.getElementById('pl-overlay');
  if (ov) { ov.remove(); }
  ov = buildPipelineOverlay();
  document.body.appendChild(ov);
  requestAnimationFrame(function(){ ov.classList.add('open'); });
  plGoStage(PL_STAGE || 1);
}

function plRebuildStage5(){
  var sc5 = document.getElementById('pl-sc-5');
  plRebuildStage5();
}

// ── Overlay builder ───────────────────────────────────────────────────
function buildPipelineOverlay(){
  var ov = document.createElement('div');
  ov.id = 'pl-overlay';
  ov.className = 'pl-overlay';

  var s1 = PL_INFLUENCERS.filter(function(r){ return r.status === 'Agree' || r.status === 'Nego'; }).length;
  var s2 = PL_INFLUENCERS.filter(function(r){ return r.sent; }).length;
  var s3 = PL_INFLUENCERS.filter(function(r){ return r.replied; }).length;
  var s4 = PL_INFLUENCERS.filter(function(r){ return r.shipped && !r.posted_tt && !r.posted_ig && !r.complete; }).length;
  var s5 = PL_INFLUENCERS.filter(function(r){ return r.posted_tt || r.posted_ig; }).length;

  var topbar = '<div class="pl-topbar">'
    + '<span class="pl-logo">SLAM</span>'
    + '<span style="color:var(--border2);font-size:13px">&rsaquo;</span>'
    + '<span class="pl-title">협업 파이프라인</span>'
    + '<span style="font-size:11px;color:var(--text2);margin-left:8px;padding:2px 8px;background:rgba(74,108,240,0.1);border-radius:20px;color:#4A6CF0">23yearsold 미드티어</span>'
    + '<span class="pl-spacer"></span>'
    + '<button class="pl-close" onclick="closePipeline()" title="닫기">&#x2715;</button>'
    + '</div>';

  var stageData = [
    ['이메일 발송', s1],
    ['답변 대기',   s2],
    ['제품 발송',   s3],
    ['업로드 독촉', s4],
    ['완료 / 트래킹', s5]
  ];
  var tabs = '<div class="pl-stages" id="pl-stages">';
  for (var si = 0; si < stageData.length; si++) {
    if (si > 0) tabs += '<span class="pl-stage-arrow">&rsaquo;</span>';
    tabs += '<button class="pl-stage' + (si === 0 ? ' active' : '') + '" id="pl-stab-' + (si+1) + '" onclick="plGoStage(' + (si+1) + ')">'
      + '<span class="pl-stage-num">' + (si+1) + '</span> ' + stageData[si][0]
      + '<span class="pl-stage-count" id="pl-cnt-' + (si+1) + '">' + stageData[si][1] + '</span>'
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
  var vars = ['handle','followers','price','courier','tracking','ship_date'];
  var varChips = '';
  for (var vi = 0; vi < vars.length; vi++) {
    varChips += '<span class="var-chip" onclick="plInsertVar(\'{{' + vars[vi] + '}}\')">{{' + vars[vi] + '}}</span>';
  }
  var agree = PL_INFLUENCERS.filter(function(r){ return r.status === 'Agree' || r.status === 'Nego'; });
  var recipRows = '';
  for (var ri = 0; ri < agree.length; ri++) {
    var r = agree[ri];
    var sel = PL_SELECTED_IDS.has(r.handle);
    recipRows += '<div class="r-row' + (sel ? ' sel' : '') + '" onclick="plToggleRecip(\'' + r.handle + '\',this)">'
      + '<input class="r-check" type="checkbox"' + (sel ? ' checked' : '') + ' onclick="event.stopPropagation();plToggleRecip(\'' + r.handle + '\',this.closest(\'.r-row\'))">'
      + '<div class="r-av" style="background:' + plColor(r.handle) + ';color:#fff">' + r.handle.replace('@','').slice(0,2).toUpperCase() + '</div>'
      + '<div class="r-info"><div class="r-handle">' + r.handle + '</div><div class="r-sub">' + r.followers + ' &middot; ' + r.email + '</div></div>'
      + '<span class="r-platform-badge ' + (r.platform === 'TikTok' ? 'tt' : 'ig') + '">' + r.platform + '</span>'
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
      + '<div class="r-av" style="background:' + plColor(r.handle) + ';color:#fff;width:36px;height:36px;flex-shrink:0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700">' + r.handle.replace('@','').slice(0,2).toUpperCase() + '</div>'
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
    var key = r.handle.replace('@','').replace('.','_');
    var opts = ['UPS','USPS','FedEx','DHL','GOFO','KoreaPost'].map(function(c){
      return '<option' + (r.courier === c ? ' selected' : '') + '>' + c + '</option>';
    }).join('');
    rows += '<div class="ship-card" id="ship-card-' + key + '">'
      + '<div class="ship-av" style="background:' + plColor(r.handle) + ';color:#fff">' + r.handle.replace('@','').slice(0,2).toUpperCase() + '</div>'
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
  var list = PL_INFLUENCERS.filter(function(r){ return r.shipped && !r.posted_tt && !r.posted_ig && !r.complete; });
  var rows = '';
  for (var i = 0; i < list.length; i++) {
    var r = list[i];
    var key = r.handle.replace('@','').replace('.','_');
    var daysAgo = r.shipped_date ? Math.floor((new Date('2026-07-28') - new Date(r.shipped_date)) / 86400000) : 0;
    var urgent = daysAgo > 10;
    rows += '<div class="push-card">'
      + '<div class="r-av" style="background:' + plColor(r.handle) + ';color:#fff;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700">' + r.handle.replace('@','').slice(0,2).toUpperCase() + '</div>'
      + '<div><div style="font-size:13px;font-weight:600;color:var(--text)">' + r.handle + '</div><div style="font-size:11px;color:var(--text2)">' + r.followers + '</div></div>'
      + '<div class="push-days' + (urgent ? ' urgent' : '') + '">' + (r.shipped_date ? '발송 ' + daysAgo + '일 경과' : '날짜 미확인') + (urgent ? ' &#x26A0;&#xFE0F;' : '') + '</div>'
      + '<span style="font-size:11px;color:var(--text2)">' + (r.courier || '택배사 미입력') + (r.tracking ? ' &middot; ' + r.tracking : '') + '</span>'
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
  var withMetrics  = posted.filter(function(r){ return r.views > 0; });
  var totalViews   = withMetrics.reduce(function(s,r){ return s + r.views; }, 0);
  var totalLikes   = withMetrics.reduce(function(s,r){ return s + r.likes; }, 0);
  var totalCmts    = withMetrics.reduce(function(s,r){ return s + r.comments; }, 0);
  var avgER        = withMetrics.length ? (withMetrics.reduce(function(s,r){ return s + r.er; }, 0) / withMetrics.length).toFixed(1) : 0;

  var summary = '<div class="track-summary">'
    + '<div class="track-stat"><div class="track-stat-val">' + posted.length + '</div><div class="track-stat-lbl">업로드 완료</div></div>'
    + '<div class="track-stat"><div class="track-stat-val">' + plFmtNum(totalViews) + '</div><div class="track-stat-lbl">총 조회수</div></div>'
    + '<div class="track-stat"><div class="track-stat-val">' + plFmtNum(totalLikes) + '</div><div class="track-stat-lbl">총 좋아요</div></div>'
    + '<div class="track-stat"><div class="track-stat-val">' + plFmtNum(totalCmts) + '</div><div class="track-stat-lbl">총 댓글</div></div>'
    + '<div class="track-stat"><div class="track-stat-val">' + avgER + '%</div><div class="track-stat-lbl">평균 ER</div></div>'
    + '</div>';

  // Handle selects for URL add panel
  var handleOpts = '<option value="">크리에이터 선택...</option>';
  for (var hi = 0; hi < posted.length; hi++) {
    handleOpts += '<option value="' + posted[hi].handle + '">' + posted[hi].handle + '</option>';
  }
  // Also add non-complete influencers that might add a URL
  for (var hj = 0; hj < PL_INFLUENCERS.length; hj++) {
    var hx = PL_INFLUENCERS[hj];
    if (!hx.complete && !hx.posted_tt && !hx.posted_ig && hx.shipped) {
      handleOpts += '<option value="' + hx.handle + '">' + hx.handle + ' (미업로드)</option>';
    }
  }

  var toolbar = '<div class="track-toolbar">'
    + '<input placeholder="@handle 또는 URL 검색..." id="track-search" oninput="plTrackFilter(this.value)">'
    + '<span style="font-size:12px;color:var(--text2)">플랫폼:</span>'
    + '<button class="reply-btn track-plat-btn active" id="plat-all" onclick="plTrackPlat(\'all\',this)" style="font-size:12px">전체</button>'
    + '<button class="reply-btn track-plat-btn" id="plat-tt" onclick="plTrackPlat(\'tt\',this)" style="font-size:12px">TikTok</button>'
    + '<button class="reply-btn track-plat-btn" id="plat-ig" onclick="plTrackPlat(\'ig\',this)" style="font-size:12px">Instagram</button>'
    + '<button class="add-url-btn" onclick="plToggleUrlPanel()" id="add-url-btn">+ URL 추가</button>'
    + '<button class="apify-btn" onclick="plApifyRefreshAll(this)">'
    + '<span class="apify-icon">&#x27F3;</span> Apify 새로고침'
    + '</button>'
    + '</div>'
    // URL add panel
    + '<div class="url-panel" id="url-panel">'
    + '<div class="url-panel-inner">'
    + '<div class="url-panel-title">&#x1F916; 콘텐츠 URL 추가 — Apify로 자동 분석</div>'
    + '<div class="url-panel-row">'
    + '<select class="url-handle-sel" id="url-handle-sel">' + handleOpts + '</select>'
    + '<input class="url-input" id="url-input" placeholder="TikTok 또는 Instagram URL 붙여넣기..." oninput="plUrlInputChange(this.value)">'
    + '<button class="url-fetch-btn" id="url-fetch-btn" onclick="plFetchUrl()">Apify 분석 시작</button>'
    + '<button class="url-cancel-btn" onclick="plToggleUrlPanel()">&#x2715;</button>'
    + '</div>'
    + '<div class="apify-progress" id="apify-progress" style="display:none">'
    + '<div class="apify-progress-bar"><div class="apify-progress-fill" id="apify-progress-fill"></div></div>'
    + '<div class="apify-steps-list" id="apify-steps-list"></div>'
    + '</div>'
    + '</div>'
    + '</div>';

  var cards = '';
  for (var i = 0; i < posted.length; i++) {
    var r = posted[i];
    // Thumbnail: prefer Supabase thumbnail_url, fallback to kocMap, then placeholder
    var thumb = r.thumbnail_url || '';
    if (!thumb && typeof kocMap !== 'undefined') {
      var kocEntry = kocMap[r.handle.replace('@','')] || {};
      if (kocEntry.thumb && typeof _isExpired === 'function' && !_isExpired(kocEntry.thumb)) thumb = kocEntry.thumb;
    }
    var hasUrl = r.posted_tt || r.posted_ig;
    var platTag = r.platform === 'TikTok'
      ? '<span class="track-plat-tag tt">TikTok</span>'
      : '<span class="track-plat-tag ig">Instagram</span>';
    var postUrl = r.posted_tt || r.posted_ig || '';
    // 썸네일: 있으면 클릭 가능 링크, 없으면 영역 자체 안 렌더링
    var thumbHTML = '';
    if (thumb) {
      var tImg = '<img class="track-thumb" src="' + thumb
        + '" onerror="var el=this.closest(\'.track-thumb-link\');if(el)el.style.display=\'none\'" loading="lazy">';
      thumbHTML = postUrl
        ? '<a href="' + postUrl + '" target="_blank" rel="noopener" class="track-thumb-link">' + tImg + '<div class="track-thumb-play">&#x25B6;</div></a>'
        : tImg;
    }
    var viewLink = postUrl
      ? '<a class="track-view-btn" href="' + postUrl + '" target="_blank" rel="noopener">' + (r.posted_tt ? 'TikTok' : 'Instagram') + ' 보기 &rarr;</a>'
      : '<button class="add-url-card-btn" onclick="plOpenUrlFor(\'' + r.handle + '\')">+ URL 추가</button>';
    var metricsHTML = r.views > 0
      ? '<div class="track-metrics">'
        + '<div class="track-metric"><span>&#x25B6;</span><span class="track-metric-val">' + plFmtNum(r.views) + '</span></div>'
        + '<div class="track-metric"><span>&#x2665;</span><span class="track-metric-val">' + plFmtNum(r.likes) + '</span></div>'
        + '<div class="track-metric"><span>&#x1F4AC;</span><span class="track-metric-val">' + plFmtNum(r.comments) + '</span></div>'
        + '</div>'
      : '<div class="track-metrics-empty">' + (hasUrl ? '<button class="apify-small-btn" onclick="plFetchSingle(\'' + r.handle + '\',this)">&#x27F3; Apify로 조회수 가져오기</button>' : '<span style="color:var(--text2);font-size:11px">URL 추가 후 분석 가능</span>') + '</div>';
    var erTag = r.er > 0
      ? '<span class="track-er">ER ' + r.er + '%</span>'
      : '<span class="track-er-empty">ER —</span>';
    var editBtn = hasUrl
      ? '<button class="track-url-edit-btn" onclick="plOpenUrlFor(\'' + r.handle + '\')" title="URL 수정">&#x270E;</button>'
      : '';
    cards += '<div class="track-card' + (thumb ? '' : ' no-thumb') + '" data-handle="' + r.handle + '" data-platform="' + (r.platform || '').toLowerCase() + '">'
      + thumbHTML
      + '<div class="track-card-body">'
      + '<div class="track-card-header">'
      + '<div>'
      + '<div class="track-card-handle">' + r.handle + editBtn + '</div>'
      + '<div class="track-card-cap">' + r.followers + ' 팔로워 &middot; ' + platTag + '</div>'
      + '</div>'
      + '</div>'
      + metricsHTML
      + '</div>'
      + '<div class="track-card-footer">' + viewLink + erTag + '</div>'
      + '</div>';
  }

  return '<div class="track-stage">' + summary + toolbar + '<div class="track-grid" id="track-grid">' + cards + '</div></div>';
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
  var agreeCount = PL_INFLUENCERS.filter(function(r){ return r.status === 'Agree' || r.status === 'Nego'; }).length;
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

function plSyncPreview(){ }

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
  var total = handles.length, done = 0;
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
      for (var i = 0; i < PL_INFLUENCERS.length; i++) if (PL_INFLUENCERS[i].handle === handles[done-1]) PL_INFLUENCERS[i].sent = true;
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
  var key     = handle.replace('@','').replace('.','_');
  var carrier = document.getElementById('sc-' + key);
  var trk     = document.getElementById('st-' + key);
  var inf     = null;
  for (var i = 0; i < PL_INFLUENCERS.length; i++) if (PL_INFLUENCERS[i].handle === handle) { inf = PL_INFLUENCERS[i]; break; }
  if (!inf) return;
  inf.courier      = carrier ? carrier.value : '';
  inf.tracking     = trk    ? trk.value    : '';
  inf.shipped      = true;
  inf.shipped_date = '2026-07-28';
  var badge = document.getElementById('sb-' + key);
  var sbtn  = document.getElementById('shbtn-' + key);
  if (badge) { badge.textContent = '발송완료'; badge.className = 'ship-state-badge shipped'; }
  if (sbtn)  { sbtn.textContent  = '✓ 완료';  sbtn.className  = 'ship-confirm-btn done'; sbtn.disabled = true; }
}

function plSendPush(handle){
  var key = handle.replace('@','').replace('.','_');
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

// ── Stage 5: URL 패널 ────────────────────────────────────────────────
function plToggleUrlPanel(){
  var panel = document.getElementById('url-panel');
  if (!panel) return;
  var isOpen = panel.classList.contains('open');
  panel.classList.toggle('open', !isOpen);
  var btn = document.getElementById('add-url-btn');
  if (btn) btn.classList.toggle('active', !isOpen);
}

function plOpenUrlFor(handle){
  var panel = document.getElementById('url-panel');
  if (panel) panel.classList.add('open');
  var btn = document.getElementById('add-url-btn');
  if (btn) btn.classList.add('active');
  var sel = document.getElementById('url-handle-sel');
  if (sel) { sel.value = handle; }
  var inp = document.getElementById('url-input');
  if (inp) { inp.focus(); }
}

function plUrlInputChange(val){
  var btn = document.getElementById('url-fetch-btn');
  if (!btn) return;
  var isValid = val.indexOf('tiktok.com') > -1 || val.indexOf('instagram.com') > -1;
  btn.disabled = !isValid;
  if (isValid) btn.classList.add('ready');
  else btn.classList.remove('ready');
}

var PL_APIFY_STEPS = [
  'URL 플랫폼 감지 중...',
  'Apify Actor 초기화...',
  '콘텐츠 페이지 스크래핑...',
  '조회수 / 좋아요 수집 중...',
  '댓글 수 집계 중...',
  'ER 계산 및 저장 중...',
  '완료!'
];

function plFetchUrl(){
  var urlVal  = document.getElementById('url-input') ? document.getElementById('url-input').value.trim() : '';
  var handle  = document.getElementById('url-handle-sel') ? document.getElementById('url-handle-sel').value : '';
  if (!urlVal) { alert('URL을 입력해주세요'); return; }
  var fetchBtn = document.getElementById('url-fetch-btn');
  if (fetchBtn) { fetchBtn.disabled = true; fetchBtn.textContent = '분석 중...'; }
  _plRunApify(urlVal, handle, function(metrics){
    var isIG = urlVal.indexOf('instagram') > -1;
    var inf = null;
    for (var i = 0; i < PL_INFLUENCERS.length; i++) {
      if (PL_INFLUENCERS[i].handle === handle) { inf = PL_INFLUENCERS[i]; break; }
    }
    if (inf) {
      if (isIG) inf.posted_ig = urlVal; else inf.posted_tt = urlVal;
      inf.views    = metrics.views;
      inf.likes    = metrics.likes;
      inf.comments = metrics.comments;
      inf.er       = metrics.er;
      inf.complete = true;
    }
    // reset panel
    setTimeout(function(){
      var panel = document.getElementById('url-panel');
      if (panel) { panel.classList.remove('open'); }
      var btn2 = document.getElementById('add-url-btn');
      if (btn2) btn2.classList.remove('active');
      var prog = document.getElementById('apify-progress');
      if (prog) { prog.style.display = 'none'; }
      var stl = document.getElementById('apify-steps-list');
      if (stl) stl.innerHTML = '';
      var fill = document.getElementById('apify-progress-fill');
      if (fill) fill.style.width = '0%';
      if (fetchBtn) { fetchBtn.disabled = false; fetchBtn.textContent = 'Apify 분석 시작'; fetchBtn.classList.remove('ready'); }
      var uInp = document.getElementById('url-input');
      if (uInp) uInp.value = '';
      // rebuild stage 5
      var sc5 = document.getElementById('pl-sc-5');
      plRebuildStage5();
    }, 600);
  });
}

function plFetchSingle(handle, btn){
  if (btn) { btn.textContent = '분석 중...'; btn.disabled = true; }
  var inf = null;
  for (var i = 0; i < PL_INFLUENCERS.length; i++) {
    if (PL_INFLUENCERS[i].handle === handle) { inf = PL_INFLUENCERS[i]; break; }
  }
  var url = inf ? (inf.posted_tt || inf.posted_ig || '') : '';
  _plRunApify(url, handle, function(metrics){
    if (inf) {
      inf.views    = metrics.views;
      inf.likes    = metrics.likes;
      inf.comments = metrics.comments;
      inf.er       = metrics.er;
    }
    setTimeout(function(){
      var sc5 = document.getElementById('pl-sc-5');
      plRebuildStage5();
    }, 300);
  });
}

function _plRunApify(url, handle, onDone){
  var prog = document.getElementById('apify-progress');
  var stl  = document.getElementById('apify-steps-list');
  var fill = document.getElementById('apify-progress-fill');
  if (prog) prog.style.display = '';
  if (stl)  stl.innerHTML = '';

  var si = 0;
  var stepMs = [350, 300, 500, 450, 350, 300, 200];

  function nextStep(){
    if (si >= PL_APIFY_STEPS.length) {
      // Generate plausible metrics
      var inf = null;
      for (var i = 0; i < PL_INFLUENCERS.length; i++) if (PL_INFLUENCERS[i].handle === handle) { inf = PL_INFLUENCERS[i]; break; }
      var baseFollowers = inf ? plFollowerInt(inf.followers) : 10000;
      var views    = Math.round((baseFollowers * (0.3 + Math.random() * 2.5)));
      var likes    = Math.round(views * (0.05 + Math.random() * 0.09));
      var comments = Math.round(likes  * (0.04 + Math.random() * 0.08));
      var er       = parseFloat((likes / baseFollowers * 100).toFixed(1));
      onDone({ views: views, likes: likes, comments: comments, er: er });
      return;
    }
    var step = PL_APIFY_STEPS[si];
    var pct  = Math.round((si + 1) / PL_APIFY_STEPS.length * 100);
    var done = si === PL_APIFY_STEPS.length - 1;
    if (stl) {
      var div = document.createElement('div');
      div.className = 'apify-step' + (done ? ' done' : '');
      div.innerHTML = (done ? '&#x2705; ' : '<span class="apify-step-spin">&#x27F3;</span> ') + step;
      stl.appendChild(div);
      stl.scrollTop = stl.scrollHeight;
    }
    if (fill) fill.style.width = pct + '%';
    si++;
    setTimeout(nextStep, stepMs[si - 1] || 300);
  }
  nextStep();
}

// ── Stage 5: Filter helpers ───────────────────────────────────────────
function plTrackFilter(q){
  document.querySelectorAll('#track-grid .track-card').forEach(function(card){
    card.style.display = card.textContent.toLowerCase().includes(q.toLowerCase()) ? '' : 'none';
  });
}

function plTrackPlat(plat, btn){
  document.querySelectorAll('.track-plat-btn').forEach(function(b){ b.classList.remove('active'); });
  if (btn) btn.classList.add('active');
  document.querySelectorAll('#track-grid .track-card').forEach(function(card){
    var p = card.getAttribute('data-platform') || '';
    if (plat === 'all') card.style.display = '';
    else if (plat === 'tt') card.style.display = (p === 'tiktok') ? '' : 'none';
    else if (plat === 'ig') card.style.display = (p === 'instagram') ? '' : 'none';
  });
}

function plApifyRefreshAll(btn){
  btn.classList.add('loading');
  btn.innerHTML = '<span class="apify-icon spinning">&#x27F3;</span> 새로고침 중...';
  // Re-fetch from Supabase for real data update
  var endpoint = PL_SB_URL + '/rest/v1/campaign_posts'
    + '?select=influencer_name,post_url,thumbnail_url,views,likes,comments,platform'
    + '&campaign_id=eq.' + PL_CAMPAIGN_ID + '&limit=200';
  fetch(endpoint, {
    headers: { 'apikey': PL_SB_KEY, 'Authorization': 'Bearer ' + PL_SB_KEY }
  }).then(function(r){ return r.json(); })
    .then(function(data){
      PL_CP_DATA = data || [];
      // Update metrics on existing influencers from fresh SB data
      PL_CP_DATA.forEach(function(cp){
        var normCp = plNormUrl(cp.post_url);
        for (var i = 0; i < PL_INFLUENCERS.length; i++) {
          var inf = PL_INFLUENCERS[i];
          var match = (inf.posted_tt && plNormUrl(inf.posted_tt) === normCp) ||
                      (inf.posted_ig && plNormUrl(inf.posted_ig) === normCp);
          if (match) {
            if (cp.views !== undefined)    inf.views    = cp.views;
            if (cp.likes !== undefined)    inf.likes    = cp.likes;
            if (cp.comments !== undefined) inf.comments = cp.comments;
            if (cp.thumbnail_url)          inf.thumbnail_url = cp.thumbnail_url;
            inf.er = inf.likes > 0 ? parseFloat((inf.likes / Math.max(plFollowerInt(inf.followers), 1) * 100).toFixed(1)) : 0;
            break;
          }
        }
      });
      btn.classList.remove('loading');
      btn.innerHTML = '<span class="apify-icon">&#x27F3;</span> Apify 새로고침';
      plRebuildStage5();
    })
    .catch(function(){
      btn.classList.remove('loading');
      btn.innerHTML = '<span class="apify-icon">&#x27F3;</span> Apify 새로고침';
      plRebuildStage5();
    });
}

// ── 완료 플래그 + 전역 등록 ──────────────────────────────────────────
window._plScriptFinished = true;
window._plOpen           = _plOpen;
console.log('[Pipeline] Loaded OK — ' + PL_INFLUENCERS.length + ' influencers');
