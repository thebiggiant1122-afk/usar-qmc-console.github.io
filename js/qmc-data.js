/* ---------------------------------------------------------------
   DATA
---------------------------------------------------------------- */
const BADGES = {
  1:[{id:'cib',name:'Combat Infantryman Badge'},{id:'cmb',name:'Combat Medical Badge'},{id:'cab',name:'Combat Action Badge'}],
  2:[{id:'eib',name:'Expert Infantryman Badge'},{id:'efmb',name:'Expert Field Medical Badge'},{id:'esb',name:'Expert Soldier Badge'}],
  3:[{id:'aab',name:'Aviator Badge'},{id:'afsb',name:'Flight Surgeon Badge'},{id:'avnb',name:'Aviation Badge'},{id:'aad',name:'Army Astronaut Device'},{id:'eod',name:'Explosive Ordnance Disposal Badge'}],
  4:[{id:'apb',name:'Army Parachutist Badge'},{id:'apfb',name:'Army Pathfinder Badge'},{id:'aaab',name:'Army Air Assault Badge'},{id:'mfb',name:'Military Freefall Badge'},{id:'mtnb',name:'Mountaineering Badge'},{id:'sob',name:'Space Operations Badge'},{id:'sodb',name:'Special Operations Diver Badge'}],
  5:[{id:'dmb',name:'Driver and Mechanic Badge'},{id:'mksb',name:'Marksmanship Badge'}]
};
const BADGE_GROUP = {};
Object.entries(BADGES).forEach(([g,list])=>list.forEach(b=>BADGE_GROUP[b.id]=Number(g)));
const BADGE_NAME = {};
Object.values(BADGES).flat().forEach(b=>BADGE_NAME[b.id]=b.name);

const SKILL_TABS = [
  {id:'ranger',name:'Ranger Tab'},{id:'sf',name:'Special Forces Tab'},{id:'sapper',name:'Sapper Tab'},
  {id:'jungle',name:'Jungle Tab'},{id:'arctic',name:'Arctic Tab'},{id:'p100',name:"President's Hundred Tab"}
];
const TAB_NAME = {}; SKILL_TABS.forEach(t=>TAB_NAME[t.id]=t.name);
const COMBAT_TABS = ['ranger','sf','sapper','jungle','arctic','p100'];

const ID_BADGES = [
  {id:'ds',name:'Drill Sergeant Identification Badge'},
  {id:'instr',name:'Army Instructor Identification Badge'},
  {id:'rec',name:'Recruiter Badge'},
  {id:'mg',name:'Master Gunner Identification Badge'},
  {id:'mp',name:'Military Police Identification Badge'},
  {id:'cid',name:'Criminal Investigation Division Identification Badge'},
  {id:'as',name:'Army Staff Identification Badge'},
  {id:'jcs',name:'Joint Chiefs Identification Badge'}
];
const ID_NAME = {}; ID_BADGES.forEach(b=>ID_NAME[b.id]=b.name);

const RIBBONS = [
  // Achievement / Combat Awards
  {id:'adsc',name:'Army Distinguished Service Cross',cat:'Achievement/Combat Awards'},
  {id:'ddsm',name:'Defense Distinguished Service',cat:'Achievement/Combat Awards'},
  {id:'adsm',name:'Army Distinguished Service',cat:'Achievement/Combat Awards'},
  {id:'ss',name:'Silver Star',cat:'Achievement/Combat Awards'},
  {id:'dss',name:'Defense Superior Service',cat:'Achievement/Combat Awards'},
  {id:'lom',name:'Legion of Merit',cat:'Achievement/Combat Awards'},
  {id:'dfc',name:'Distinguished Flying Cross',cat:'Achievement/Combat Awards'},
  {id:'sm',name:"Soldier's Medal",cat:'Achievement/Combat Awards'},
  {id:'bs',name:'Bronze Star',cat:'Achievement/Combat Awards'},
  {id:'dmsm',name:'Defense Meritorious Service',cat:'Achievement/Combat Awards'},
  {id:'msm',name:'Meritorious Service',cat:'Achievement/Combat Awards'},
  {id:'am',name:'Air Medal',cat:'Achievement/Combat Awards'},
  {id:'jsc',name:'Joint Service Commendation',cat:'Achievement/Combat Awards'},
  {id:'acm',name:'Army Commendation',cat:'Achievement/Combat Awards'},
  {id:'jsa',name:'Joint Service Achievement',cat:'Achievement/Combat Awards'},
  {id:'aam',name:'Army Achievement',cat:'Achievement/Combat Awards'},
  {id:'pscm',name:'Public Service Commendation Medal',cat:'Achievement/Combat Awards'},
  {id:'wgm',name:'Wargames Medal',cat:'Achievement/Combat Awards'},
  {id:'agcm',name:'Army Good Conduct',cat:'Achievement/Combat Awards'},
  {id:'aoom',name:'Army of Occupation Medal',cat:'Achievement/Combat Awards'},
  {id:'ovsm',name:'Outstanding Volunteer',cat:'Achievement/Combat Awards'},
  // Service Awards
  {id:'ndsm',name:'National Defense Service',cat:'Service Awards',freeDefault:true},
  {id:'gwotS',name:'Global War on Terrorism Service',cat:'Service Awards',freeDefault:true},
  {id:'ncopd',name:'NCO Professional Development',cat:'Service Awards'},
  {id:'asm',name:'Army Service',cat:'Service Awards',freeDefault:true},
  {id:'mj',name:'Military Justice',cat:'Service Awards'},
  {id:'arr',name:'Army Recruiting Ribbon',cat:'Service Awards'},
  {id:'unm',name:'United Nations Medal',cat:'Service Awards'},
  // Campaign / Deployment Awards
  {id:'ants',name:'Antarctica Service',cat:'Campaign/Deployment Awards'},
  {id:'afem',name:'Armed Forces Expeditionary Medal',cat:'Campaign/Deployment Awards'},
  {id:'swas',name:'Southwest Asia Service',cat:'Campaign/Deployment Awards'},
  {id:'kosovo',name:'Kosovo Campaign',cat:'Campaign/Deployment Awards'},
  {id:'kuwait',name:'Kuwait Liberation Medal',cat:'Campaign/Deployment Awards'},
  {id:'afghan',name:'Afghanistan Campaign',cat:'Campaign/Deployment Awards'},
  {id:'iraq',name:'Iraq Campaign',cat:'Campaign/Deployment Awards'},
  {id:'jsoc',name:'Joint Special Operations Campaign',cat:'Campaign/Deployment Awards'},
  {id:'gwotE',name:'Global War on Terrorism Expeditionary',cat:'Campaign/Deployment Awards'},
  {id:'afsm',name:'Armed Forces Service Medal',cat:'Campaign/Deployment Awards'},
  {id:'asdm',name:'Army Sea Duty',cat:'Campaign/Deployment Awards'},
  {id:'aosm',name:'Army Overseas Service',cat:'Campaign/Deployment Awards'},
  {id:'natoNA5',name:'NATO Non-Article 5',cat:'Campaign/Deployment Awards'},
  {id:'natoISAF',name:'NATO ISAF',cat:'Campaign/Deployment Awards'}
];
const RIBBON_NAME = {}; RIBBONS.forEach(r=>RIBBON_NAME[r.id]=r.name);
const RIBBON_CATS = ['Achievement/Combat Awards','Service Awards','Campaign/Deployment Awards'];
const FREE_DEFAULT_RIBBON_IDS = RIBBONS.filter(r=>r.freeDefault).map(r=>r.id);
const FREE_DEFAULT_RIBBONS = RIBBONS.filter(r=>r.freeDefault).map(r=>r.name);

const FOREIGN = [
  {id:'fd1',name:'Queens Dedication Medal'},{id:'fd2',name:'Combat Readiness Medal'},
  {id:'fd3',name:'Turkish Marksmanship Medal'},{id:'fd4',name:"Chief's Fifty Marksmanship Badge"},
  {id:'fd11',name:'Air Battle Manager Badge'},
  {id:'fd5',name:'Marine Special Operations Badge'},{id:'fd6',name:'Marine Combat Aircrew Badge'},
  {id:'fd7',name:'Republic of Korea Jump Wings'},{id:'fd8',name:'Royal Air Force Parachute Wings'},
  {id:'fd12',name:'Special Air Service Parachute Wings'},
  {id:'fd9',name:'Royal Air Force Aviator Wings'},{id:'fd10',name:'Armed Forces of the Philippines Airborne Badge'}
];
const FOREIGN_NAME = {}; FOREIGN.forEach(f=>FOREIGN_NAME[f.id]=f.name);

const UNIT_CITATIONS = [
  {id:'apuc',name:'Army Presidential Unit Citation'},
  {id:'jsmu',name:'Joint Service Meritorious Unit'},
  {id:'avua',name:'Army Valorous Unit Award'},
  {id:'amuc',name:'Army Meritorious Unit Commendation'},
  {id:'asua',name:'Army Superior Unit Award'}
];
const CITATION_NAME = {}; UNIT_CITATIONS.forEach(c=>CITATION_NAME[c.id]=c.name);

const WATCH_SIDES = ['Left','Right'];
const WATCH_COLORS = ['Black','Brown','Grey','Tan'];

/* ---------------------------------------------------------------
   RANKS
---------------------------------------------------------------- */
const PAYGRADES = ['E2','E3','E4A','E4B','E5','E6','E7','E8A','E8B','E9A','E9B','E9C',
  'O1','O2','O3','O4','O5','O6','O7','O8','O9','O10'];
const RANK_NAMES = {
  E2:'Private Second Class', E3:'Private First Class', E4A:'Specialist', E4B:'Corporal',
  E5:'Sergeant', E6:'Staff Sergeant', E7:'Sergeant First Class', E8A:'Master Sergeant', E8B:'First Sergeant',
  E9A:'Sergeant Major', E9B:'Command Sergeant Major', E9C:'Sergeant Major of the Army',
  O1:'Second Lieutenant', O2:'First Lieutenant', O3:'Captain', O4:'Major', O5:'Lieutenant Colonel',
  O6:'Colonel', O7:'Brigadier General', O8:'Major General', O9:'Lieutenant General', O10:'General'
};

/* ---------------------------------------------------------------
   BADGE / ID BADGE CLASSES (Basic → Master progressions)
---------------------------------------------------------------- */
const TIERED_BADGES = {
  aab:['Basic','Senior','Master'],
  avnb:['Basic','Senior','Master'],
  sob:['Basic','Senior','Master'],
  apb:['Basic','Senior','Master'],
  mfb:['Basic','Master'],
  sodb:['Basic','Diving Supervisor']
};
const TIERED_ID_BADGES = {
  rec:['Basic','Gold','Master'],
  instr:['Basic','Senior','Master']
};

/* ---------------------------------------------------------------
   DIVISION / BRIGADE / COMPANY ORG TREE
   Command is kept as the first dropdown level for faster navigation, but it is
   stripped back out when building the format text (formatDivisionPath drops it).
   role = the parenthetical unit-type tag from the org chart
   badge = auto-logged Group 1 badge id for that unit ('cib'|'cmb'|'cab')
---------------------------------------------------------------- */
const NC_NOTE = 'Combative division has to be present for deployment credit.';
const UNIT_TREE = [
  {name:'Forces Command', children:[
    {name:'1st Infantry Division', combative:'Combative', children:[
      {name:'Raven Brigade', role:'Infantry', children:[
        {name:'Phoenix Company', role:'Infantry', badge:'cib'},
        {name:'Dagger Company', role:'Infantry', badge:'cib'}
      ]},
      {name:'Demon Brigade', role:'Mixed', children:[
        {name:'Reaper Company', role:'Infantry', badge:'cib'},
        {name:'Phantom Company', role:'Cavalry', badge:'cab'}
      ]},
      {name:'Army Infantry School Brigade', role:'Infantry-TU', children:[
        {name:'Golf Company', role:'Infantry-TU', badge:'cib'},
        {name:'Viper Company', role:'Infantry-TU', badge:'cib'}
      ]},
      {name:'Vanguard Brigade', role:'Mixed', children:[
        {name:'Legion Company', role:'Infantry', badge:'cib'},
        {name:'Lifeline Company', role:'Medical', badge:'cmb'}
      ]}
    ]},
    {name:'1st Cavalry Division', combative:'Combative',
      note:"Tankers/Operators may only earn a CAB while engaged in ground combat — operating a vehicle during a deployment doesn't qualify for a combat device.",
      children:[
        {name:'Ironhorse Brigade', role:'Infantry', badge:'cib'},
        {name:'Greywolf Brigade', role:'Mixed', children:[
          {name:'Warhorse Company', role:'Armored', badge:'cab'},
          {name:'Nighthawks Company', role:'Cavalry', badge:'cab'},
          {name:'Wrangler Company', role:'Cavalry-TU', badge:'cab'}
        ]},
        {name:'Spearhead Brigade', role:'Mixed', children:[
          {name:'Garryowen Company', role:'Infantry', badge:'cib'},
          {name:'Palehorse Company', role:'Aviation', badge:'cab'}
        ]},
        {name:'194th Armored Brigade', role:'Cavalry-TU', badge:'cab'}
      ]},
    {name:'82nd Airborne Division', combative:'Combative', children:[
      {name:'Panther Brigade', role:'Mixed', children:[
        {name:'173rd Mountaineering Company', role:'Mixed', badge:'cab', platoons: [{ name: 'Summit Platoon', role: 'Infantry' },{ name: 'Jaguar Platoon', role: 'Light-Cavalry', dmbEligible: true }]},
        {name:'Angel Company', role:'Medical', badge:'cmb'}
      ]},
      {name:'Falcon Brigade', role:'Mixed', children:[
        {name:'Hawk Company', role:'Infantry', badge:'cib'},
        {name:'Eagle Company', role:'Infantry', badge:'cib'}
      ]},
      {name:'Black Hats Brigade', role:'Infantry-TU', children:[
        {name:'Orpheus Company', role:'Infantry-TU', badge:'cib'}
      ]}
    ]},
    {name:'101st Airborne Division', combative:'Combative', children:[
      {name:'Strike Brigade', role:'Mixed', children:[
        {name:'Raptor Company', role:'Cavalry', badge:'cab'},
        {name:'Assurgam Company', role:'Medical', badge:'cmb'},
        {name:'Bulldog Company', role:'Infantry', badge:'cib'}
      ]},
      {name:'Wings Brigade', role:'Aviation', children:[
        {name:'Air Assault Company', role:'Aviation', badge:'cab'},
        {name:'Air Logistics Company', role:'Aviation', badge:'cab'},
        {name:'Aviation Qualification Company', role:'Aviation-TU', badge:'cab'}
      ]},
      {name:'Black Hats Brigade', role:'Infantry-TU', children:[
        {name:'Aurora Company', role:'Infantry-TU', badge:'cib'},
        {name:'Titan Company', role:'Infantry-TU', badge:'cib'}
      ]}
    ]}
  ]},
  {name:'Army Special Operations Command', children:[
    {name:'75th Ranger Regiment', combative:'Combative', children:[
      {name:'1st Ranger Battalion', role:'Infantry', children:[
        {name:'Ares Company', role:'Infantry', badge:'cib'},
        {name:'Hades Company', role:'Infantry', badge:'cib'}
      ]},
      {name:'2nd Ranger Battalion', role:'Infantry', children:[
        {name:'Odin Company', role:'Infantry', badge:'cib'},
        {name:'Sentinel Company', role:'Infantry-TU', badge:'cib'}
      ]}
    ]},
    {name:'Army Special Forces', combative:'Combative', children:[
      {name:'1st Special Forces Group', role:'Special Forces', children:[
        {name:'Alpha Company', role:'Special Forces', badge:'cib'},
        {name:'Bravo Company', role:'Special Forces', badge:'cib'}
      ]},
      {name:'7th Special Forces Group', role:'Mixed', children:[
        {name:'Helios Company', role:'Special Forces', badge:'cib'},
        {name:'Yankee Company', role:'Special Forces-TU', badge:'cib'}
      ]}
    ]},
    {name:'John F. Kennedy Special Warfare Center and School', combative:'Non-combative', note:NC_NOTE, children:[
      {name:'1st Special Warfare Training Group', role:'Special Forces-TU', children:[
        {name:'Artemis Company', role:'Special Forces-TU', badge:'cib'},
        {name:'Spartan Company', role:'Special Forces-TU', badge:'cib'}
      ]},
      {name:'2nd Special Warfare Training Group', role:'Special Forces-TU', children:[
        {name:'Hestia Company', role:'Special Forces-TU', badge:'cib'},
        {name:'Cyrus Company', role:'Special Forces-TU', badge:'cib'}
      ]}
    ]},
    {name:'Task Force Dagger', combative:'Combative', children:[
      {name:'5th Special Forces Group', role:'Special Forces', badge:'cib'},
      {name:'Joint Assault Group', role:'Mixed', children:[
        {name:'Ranger Element', role:'Infantry', badge:'cib'},
        {name:'Aviation Element', role:'Aviation', badge:'cab'}
      ]},
      {name:'Special Operations Support Company', role:'Special Forces-TU', badge:'cib'}
    ]}
  ]},
  {name:'Training and Doctrine Command', children:[
    {name:'165th Infantry Brigade', role:'Adjutant', combative:'Non-combative', badge:'cab', note:NC_NOTE, children:[
      {name:'Drill Sergeant Academy', role:'Adjutant-TU', combative:'Non-combative', badge:'cab', note:NC_NOTE}
    ]},
    {name:'Army University', role:'Adjutant', combative:'Non-combative', badge:'cab', note:NC_NOTE, children:[
      {name:'Officer Candidate School', role:'Adjutant-TU', combative:'Non-combative', badge:'cab', note:NC_NOTE},
      {name:'Sergeant Major Academy', role:'Adjutant-TU', combative:'Non-combative', badge:'cab', note:NC_NOTE}
    ]},
    {name:'Recruiting and Retention College', role:'Adjutant', combative:'Non-combative', badge:'cab', note:NC_NOTE, children:[
      {name:'Army Instructor Course', role:'Adjutant-TU', combative:'Non-combative', badge:'cab', note:NC_NOTE},
      {name:'Army Recruiter Course', role:'Adjutant-TU', combative:'Non-combative', badge:'cab', note:NC_NOTE},
      {name:'Expert Soldier Badge Course', role:'Adjutant-TU', combative:'Non-combative', badge:'cab', note:NC_NOTE},
      {name:'Combat Readiness Course', role:'Adjutant-TU', combative:'Non-combative', badge:'cab', note:NC_NOTE}
    ]}
  ]},
  {name:'Military Police Corps', children:[
    {name:'Criminal Investigations Division', role:'Military Police', combative:'Non-combative', badge:'cab', note:NC_NOTE, children:[
      {name:'Office of Criminal Investigations', role:'Military Police', combative:'Non-combative', badge:'cab', note:NC_NOTE},
      {name:'Office of Special Investigations', role:'Military Police', combative:'Non-combative', badge:'cab', note:NC_NOTE}
    ]},
    {name:'Judge Advocate General Corps', role:'Military Police', combative:'Non-combative', badge:'cab', note:NC_NOTE},
    {name:'14th Battalion', role:'Military Police', combative:'Non-combative', badge:'cab', note:NC_NOTE, children:[
      {name:'Alpha Company', role:'Military Police-TU', combative:'Non-combative', badge:'cab', note:NC_NOTE},
      {name:'Bravo Company', role:'Military Police', combative:'Non-combative', badge:'cab', note:NC_NOTE}
    ]},
    {name:'503rd Battalion', role:'Military Police', combative:'Non-combative', badge:'cab', note:NC_NOTE, children:[
      {name:'Special Reaction Team', role:'Military Police', combative:'Non-combative', badge:'cab', note:NC_NOTE},
      {name:'Executive Protection Detail', role:'Military Police', combative:'Non-combative', badge:'cab', note:NC_NOTE}
    ]}
  ]},
  {name:'Army Administrative Command', children:[
    {name:'Army Foreign Affairs'},
    {name:'Quartermaster Corps'},
    {name:'Community Staff'}
  ]}
];
const LEVEL_LABELS = ['Command','Division / Group','Brigade / Battalion','Company','Platoon'];

function formatDivisionPath(path){
  if (!path.length) return '';

  const command = path[0];
  const sub = path.slice(1);

  // Headquarters stops at the command level and reports the main command.
  if (sub.length === 1 && sub[0] === 'Headquarters'){
    return command;
  }

  // Normal units omit the top-level command from the format.
  if (!sub.length) return '';
  if (sub.length >= 4) return sub.slice(0,3).join(', ')+' ('+sub[3]+')';
  return sub.join(', ');
}

function getNodeByPath(path){
  let nodes = UNIT_TREE, node = null;
  for (const name of path){
    node = (nodes||[]).find(n=>n.name===name);
    if (!node) return null;
    nodes = node.children;
  }
  return node;
}

function isDmbEligible(){
  if (state.divisionPath[1] === 'Headquarters'){
    return true;
  }

  const node = getNodeByPath(state.divisionPath);

  if (node?.platoons?.length){
    const platoon = node.platoons.find(p => p.name === state.platoon);

    if (platoon){
      return !!platoon.dmbEligible;
    }
  }

  return !!(
    node?.role?.startsWith('Cavalry') ||
    node?.role?.startsWith('Armored') ||
    node?.role?.startsWith('Military Police')
  );
}

/* Uniform configs, derived from the QMC Uniform Guide v1.0 */
const UNIFORMS = {
  ocp:{
    label:'OCP (Standard)',
    base:150,
    rollable:true,

    skillTabs:{max:2, allowed:COMBAT_TABS},
    csib:true,
    foreignAward:{max:1},

    skillBadges:{
      max:4,
      comboGroups:[[1,2],[3]]
    },

    idBadges:{
      max:2,
      allowed:['ds','instr','rec','mg']
    },

    watch:true,

    rules:[
      'Divisional Patch, Ranktab & Nametape included free',
      'Skill Tabs — max 2',
      'CSIB authorized',
      '1 Foreign Award slot',
      'Skill Badges — max 4 total, only 1 from Groups 1–2 combined, 1 from Group 3',
      'Group 5 Skill Badges (Driver and Mechanic / Marksmanship) are not authorized on OCP',
      'Driver and Mechanic Badge otherwise requires a Cavalry-designated unit',
      'ID Badges — max 2 (Drill Sergeant, Instructor, Recruiter, Master Gunner)',
      'Watch authorized when sleeves are rolled'
    ]
  },

  acs:{
    label:'Army Combat Shirt (ACS)',
    base:150,
    rollable:true,

    skillTabs:{max:2, allowed:COMBAT_TABS},
    csib:true,
    watch:true,

    rules:[
      'Divisional Patch &amp; CSIB authorized',
      'Skill Tabs — max 2',
      'Watch authorized if sleeves rolled',
      'No ribbons, skill badges, or ID badges on this uniform'
    ]
  },

  blackouts:{
    label:'ASOC Blackouts',
    base:150,

    skillTabs:{max:2, allowed:COMBAT_TABS},
    csib:true,

    rules:[
      'Divisional Patch &amp; CSIB authorized',
      'Skill Tabs — max 2',
      'No watch, ribbons, skill badges, or ID badges'
    ]
  },

  fleece:{
    label:'Army Fleece (Winter Only)',
    base:150,

    rules:[
      'Ranktab &amp; Nametape only — no other items authorized'
    ]
  },

  tigerstripes:{
    label:'ASF Tiger Stripes',
    base:150,

    skillTabs:{max:2, allowed:'all'},
    skillBadges:{max:2, comboGroups:null},

    rules:[
      'Divisional Patch &amp; Nametape included free',
      'Skill Tabs — max 2',
      'Skill Badges — max 2 (Groups 1–5 all eligible)'
    ]
  },

  agsu:{
    label:'AGSU (Class A)',
    base:150,

    skillTabs:{max:2, allowed:COMBAT_TABS},
    csib:true,
    foreignUnlimited:true,

    skillBadges:{
      max:4,
      comboGroups:[[1,2,3]]
    },

    idBadges:{
      max:2,
      allowed:['mp','cid','as','jcs','rec','instr']
    },

    ribbons:{
      max:null,
      offsetRows:2,
      offsetPerRow:2
    },

    unitCitations:true,
    stripesBars:true,

    rules:[
      'Divisional Patch, Officer Branch Insignia, RDI &amp; Shoulderloop RDI, ROKA Jump Wings all included per guide (free)',
      'Skill Tabs — max 2',
      'CSIB authorized',
      'Skill Badges — max 4, only 1 combined from Groups 1–3 (Groups 4–5 not restricted by this combo rule)',
      'ID Badges — max 2',
      'Ribbons — unlimited (space permitting); max 2 rows offset, 2 ribbons per offset row',
      'Service Stripes (enlisted only, max 8) &amp; Overseas Bars (max 8) — R$3 each',
      'Unit Citations correlated to current division — free'
    ]
  },

  classB:{
    label:'Class B',
    base:150,
    rollable:true,

    comboSkill:true,
    ribbons:{max:6},
    watch:true,

    rules:[
      'RDI included per guide (free)',
      'Ribbons — max 6, your choice of which',
      '1 combined Skill Badge OR Skill Tab (metal replica variation)',
      'Watch authorized if short sleeve'
    ]
  },

  classBSweater:{
    label:'Class B Sweater (Winter Only)',
    base:150,

    rules:[
      'Nametape &amp; Shoulderloop Ranktabs only — no other items authorized'
    ]
  },

  classC:{
    label:'Class C',
    base:150,

    skillTabsMetal:{
      max:1,
      allowed:'all'
    },

    csib:true,
    foreignUnlimited:true,

    skillBadges:{
      max:4,
      comboGroups:[[1,2,3]]
    },

    unitCitations:true,

    idBadgesConditional:{
      max:2,
      allowed:['mp','cid','as','jcs','rec','instr']
    },

    ribbons:{
      max:null,
      offsetRows:2,
      offsetPerRow:2
    },

    rules:[
      'RDI &amp; Unit Citations included per guide (free)',
      'Skill Tab — max 1 (metal replica variation)',
      'CSIB authorized',
      'Skill Badges — max 4, only 1 combined from Groups 1–3 (Groups 4–5 not restricted by this combo rule)',
      'ID Badges — max 2 ONLY IF no CSIB is worn',
      'Ribbons — unlimited (space permitting); max 2 rows offset, 2 ribbons per offset row'
    ]
  },

  icvcTanker:{
    label:'ICVC — Tanker',
    base:150,

    rules:[
      'Nametape &amp; Ranktab only — no other items authorized'
    ]
  },

  icvcPilot:{
    label:'ICVC — Pilot',
    base:150,
    aviatorOnly:true,

    rules:[
      'Nametape &amp; Ranktab included free',
      'Only Army Aviator Badge or Army Aviation Badge (Group 3) authorized'
    ]
  }
};

/* ---------------------------------------------------------------
   STATE
---------------------------------------------------------------- */
const state = {
  uniform:'ocp', rolled:false, gender:'Male', name:'', paygrade:'', division:'', nametape:'', robuxProof:'',
  discountAmt:0, discountBy:'',
  watch:false, watchSide:'Left', watchColor:'Black', tattoos:0, offsetRibbon:false, offsetBadge:false, offsetRdi:false,
  csib:false, csibType:'',
  skillTabs:new Set(), skillBadges:new Set(), idBadges:new Set(), ribbons:new Set(), foreign:new Set(),
  unitCitations:new Set(), serviceStripes:0, overseasBars:0,
  badgeTiers:{}, idBadgeTiers:{},
  divisionPath:[],
  platoon:'',
  classBItem:'', activeTab:'badges'
};

/* ---------------------------------------------------------------
   VALIDATION
---------------------------------------------------------------- */
function validate(){
  const cfg = UNIFORMS[state.uniform];
  const issues = [];
  const invalid = {tabs:new Set(), badges:new Set(), idBadges:new Set(), ribbons:new Set(), foreign:new Set()};

  // Skill tabs (chip-style, non classB uniforms)
  if (cfg.skillTabs){
    const chosen = [...state.skillTabs];
    chosen.forEach(id=>{
      if (cfg.skillTabs.allowed!=='all' && !cfg.skillTabs.allowed.includes(id)){
        invalid.tabs.add(id);
        issues.push(TAB_NAME[id]+' is not an authorized skill tab for '+cfg.label+'.');
      }
    });
    const validChosen = chosen.filter(id=>cfg.skillTabs.allowed==='all' || cfg.skillTabs.allowed.includes(id));
    if (validChosen.length > cfg.skillTabs.max){
      validChosen.forEach(id=>invalid.tabs.add(id));
      issues.push('Skill Tabs: '+validChosen.length+'/'+cfg.skillTabs.max+' — exceeds max for '+cfg.label+'.');
    }
  } else if (!cfg.comboSkill && !cfg.skillTabsMetal && state.skillTabs.size>0){
    state.skillTabs.forEach(id=>invalid.tabs.add(id));
    issues.push('Skill Tabs are not authorized on '+cfg.label+'.');
  }

  // Class C metal skill tab (single, max1)
  if (cfg.skillTabsMetal){
    const chosen=[...state.skillTabs];
    if (chosen.length > cfg.skillTabsMetal.max){
      chosen.forEach(id=>invalid.tabs.add(id));
      issues.push('Skill Tab: '+chosen.length+'/'+cfg.skillTabsMetal.max+' — exceeds max for '+cfg.label+'.');
    }
  }

  // Skill badges
  if (cfg.skillBadges){
    const chosen = [...state.skillBadges];
    if (chosen.length > cfg.skillBadges.max){
      chosen.forEach(id=>invalid.badges.add(id));
      issues.push('Skill Badges: '+chosen.length+'/'+cfg.skillBadges.max+' — exceeds max for '+cfg.label+'.');
    }
    if (cfg.skillBadges.comboGroups){
      cfg.skillBadges.comboGroups.forEach(groupList=>{
        const inCombo = chosen.filter(id=>groupList.includes(BADGE_GROUP[id]));
        if (inCombo.length>1){
          inCombo.forEach(id=>invalid.badges.add(id));
          issues.push('Only 1 badge allowed combined from Group'+(groupList.length>1?'s ':' ')+groupList.join('–')+' on '+cfg.label+' (currently '+inCombo.length+').');
        }
      });
    }
  } else if (!cfg.comboSkill && !cfg.aviatorOnly && state.skillBadges.size>0){
    state.skillBadges.forEach(id=>invalid.badges.add(id));
    issues.push('Skill Badges are not authorized on '+cfg.label+'.');
  }
  
    // OCPs prohibit all Group 5 skill badges.
  if (state.uniform === 'ocp'){
    const group5 = [...state.skillBadges].filter(id => BADGE_GROUP[id] === 5);

    if (group5.length){
      group5.forEach(id => invalid.badges.add(id));
      issues.push(
        'Group 5 Skill Badges (Driver and Mechanic / Marksmanship) are not authorized on OCP.'
      );
    }
  }

  // Driver and Mechanic Badge — cavalry-designated units only
  if (state.skillBadges.has('dmb') && !isDmbEligible()){
    invalid.badges.add('dmb');
    issues.push('The Driver and Mechanic Badge is only authorized for those who are qualified drivers, if you are not certified remove this badge.');
  }

  // ICVC Pilot: only aviator/aviation badges
  if (cfg.aviatorOnly){
    [...state.skillBadges].forEach(id=>{
      if (id!=='aab' && id!=='avnb'){ invalid.badges.add(id); }
    });
    if ([...state.skillBadges].some(id=>id!=='aab' && id!=='avnb')){
      issues.push('Only Army Aviator Badge or Army Aviation Badge is authorized on '+cfg.label+'.');
    }
  }

  // ID badges (fixed list uniforms)
  if (cfg.idBadges){
    const chosen=[...state.idBadges];
    chosen.forEach(id=>{
      if (!cfg.idBadges.allowed.includes(id)){ invalid.idBadges.add(id); issues.push(ID_NAME[id]+' is not authorized on '+cfg.label+'.'); }
    });
    const validChosen = chosen.filter(id=>cfg.idBadges.allowed.includes(id));
    if (validChosen.length>cfg.idBadges.max){
      validChosen.forEach(id=>invalid.idBadges.add(id));
      issues.push('Identification Badges: '+validChosen.length+'/'+cfg.idBadges.max+' — exceeds max.');
    }
  } else if (cfg.idBadgesConditional){
    if (state.csib){
      if (state.idBadges.size>0){
        state.idBadges.forEach(id=>invalid.idBadges.add(id));
        issues.push('Identification Badges are not authorized while a CSIB is worn on '+cfg.label+'.');
      }
    } else {
      const chosen=[...state.idBadges];
      chosen.forEach(id=>{
        if (!cfg.idBadgesConditional.allowed.includes(id)){ invalid.idBadges.add(id); issues.push(ID_NAME[id]+' is not authorized on '+cfg.label+'.'); }
      });
      const validChosen = chosen.filter(id=>cfg.idBadgesConditional.allowed.includes(id));
      if (validChosen.length>cfg.idBadgesConditional.max){
        validChosen.forEach(id=>invalid.idBadges.add(id));
        issues.push('Identification Badges: '+validChosen.length+'/'+cfg.idBadgesConditional.max+' — exceeds max.');
      }
    }
  } else if (state.idBadges.size>0){
    state.idBadges.forEach(id=>invalid.idBadges.add(id));
    issues.push('Identification Badges are not authorized on '+cfg.label+'.');
  }

  // CSIB type is mandatory when CSIB is worn.
  if (cfg.csib && state.csib){
    if (!state.csibType.trim()){
      issues.push('CSIB Type is required when a CSIB is worn.');
    }
  }

  // Ribbons
  if (cfg.ribbons){
    if (cfg.ribbons.max!=null && state.ribbons.size>cfg.ribbons.max){
      state.ribbons.forEach(id=>invalid.ribbons.add(id));
      issues.push('Ribbons: '+state.ribbons.size+'/'+cfg.ribbons.max+' — exceeds max for '+cfg.label+'.');
    }
  } else if (state.ribbons.size>0){
    state.ribbons.forEach(id=>invalid.ribbons.add(id));
    issues.push('Ribbons are not authorized on '+cfg.label+'.');
  }

  // Foreign devices
  if (cfg.foreignAward){
    if (state.foreign.size>cfg.foreignAward.max){
      state.foreign.forEach(id=>invalid.foreign.add(id));
      issues.push('Foreign Award: '+state.foreign.size+'/'+cfg.foreignAward.max+' slot — exceeds max for '+cfg.label+'.');
    }
  } else if (cfg.foreignUnlimited){
    // no cap stated
  } else if (state.foreign.size>0){
    state.foreign.forEach(id=>invalid.foreign.add(id));
    issues.push('Foreign Devices are not authorized on '+cfg.label+' per the Uniform Guide.');
  }

  // Unit citations
  if (!cfg.unitCitations && state.unitCitations.size>0){
    issues.push('Unit Citations are not authorized on '+cfg.label+'.');
  }

  // Service stripes / overseas bars
  if (!cfg.stripesBars && (state.serviceStripes>0 || state.overseasBars>0)){
    issues.push('Service Stripes / Overseas Bars are not authorized on '+cfg.label+'.');
  }
  if (state.serviceStripes>8) issues.push('Service Stripes: max 8.');
  if (state.overseasBars>8) issues.push('Overseas Bars: max 8.');

  // Watch
  if (!canWearWatch() && state.watch){
    issues.push('A watch is not authorized on '+getUniformDisplayLabel(state.uniform)+'.');
  }

  return {issues, invalid};
}

/* ---------------------------------------------------------------
   PRICE
---------------------------------------------------------------- */
function computePrice(){
  const cfg = UNIFORMS[state.uniform];
  let total = cfg.base;
  const lines = [{label:cfg.label+' (base uniform)', amt:cfg.base}];
  const add=(label,n)=>{ if(n>0){ total+=n; lines.push({label,amt:n}); } };

  add('Skill Tabs ('+state.skillTabs.size+')', state.skillTabs.size*3);
  add('Skill Badges ('+state.skillBadges.size+')', state.skillBadges.size*3);
  if (state.csib) add('Combat Service Identification Badge', 3);
  add('Identification Badges ('+state.idBadges.size+')', state.idBadges.size*3);

  let ribbonCost=0, ribbonFreeDeployment=false;
  const hasDeploymentBadge = state.csib || [...state.skillBadges].some(b=>['cib','cmb','cab'].includes(b));
  state.ribbons.forEach(id=>{
    if (id==='gwotE' && hasDeploymentBadge){ ribbonFreeDeployment=true; return; }
    ribbonCost+=3;
  });
  add('Ribbons', ribbonCost);
  if (ribbonFreeDeployment) lines.push({label:'GWOT Expeditionary (free — deployment badge attached)', amt:0, free:true});

  add('Foreign Devices ('+state.foreign.size+')', state.foreign.size*3);
  if (state.uniform==='classB' && state.classBItem) add('Skill Badge/Tab (metal, combined)', 3);
  if (state.watch) add('Watch', 3);
  if (state.tattoos>0) add('Tattoo'+(state.tattoos>1?'s':''), state.tattoos*3);
  if (state.serviceStripes>0) add('Service Stripes ('+state.serviceStripes+')', state.serviceStripes*3);
  if (state.overseasBars>0) add('Overseas Bars ('+state.overseasBars+')', state.overseasBars*3);

  let offsetCount = (state.offsetRibbon?1:0)+(state.offsetBadge?1:0)+(state.offsetRdi?1:0);
  if (offsetCount>0) add('Offsetting ('+offsetCount+')', offsetCount*3);

  const discount = Math.min(Number(state.discountAmt)||0, total);
  if (discount>0){ total-=discount; lines.push({label:'Discount applied', amt:-discount, disc:true}); }

  return {total, lines};
}

/* ---------------------------------------------------------------
   FORMAT TEXT
---------------------------------------------------------------- */
function csibDisplayName(){
  let type = state.csibType.trim();
  type = type.replace(/\s*CSIB\s*$/i, '').trim();
  return type ? type+' CSIB' : 'CSIB';
}

function classBItemName(id){
  if (TAB_NAME[id]) return TAB_NAME[id]+' (metal)';
  if (BADGE_NAME[id]) return BADGE_NAME[id]+' (metal)';
  return '';
}

function badgeDisplayName(id){
  const base = BADGE_NAME[id];
  if (TIERED_BADGES[id] && state.badgeTiers[id]) return base+' ('+state.badgeTiers[id]+')';
  return base;
}
function idBadgeDisplayName(id){
  const base = ID_NAME[id];
  if (TIERED_ID_BADGES[id] && state.idBadgeTiers[id]) return base+' ('+state.idBadgeTiers[id]+')';
  return base;
}

function generateFormat(){
  const cfg = UNIFORMS[state.uniform];
  const tabsList = [...state.skillTabs].map(id=>TAB_NAME[id]);
  const badgesList = [...state.skillBadges].map(id=>badgeDisplayName(id));
  if (state.csib) badgesList.unshift(csibDisplayName());
  const idList = [...state.idBadges].map(id=>idBadgeDisplayName(id));
  if (state.uniform==='classB' && state.classBItem) badgesList.push(classBItemName(state.classBItem));
  const allBadges = [...tabsList, ...badgesList, ...idList];

  const chosenRibbons = [...state.ribbons].map(id=>RIBBON_NAME[id]);
  const automaticRibbons = cfg.ribbons && cfg.ribbons.max == null ? FREE_DEFAULT_RIBBONS: [];
  const ribbonsList = [...automaticRibbons, ...chosenRibbons];

  const miscItems=[];
  if (state.watch) miscItems.push('Watch ('+state.watchSide+', '+state.watchColor+')');
  if (state.tattoos>0) miscItems.push(state.tattoos+' Tattoo'+(state.tattoos>1?'s':''));
  if (state.serviceStripes>0) miscItems.push(state.serviceStripes+' Service Stripe'+(state.serviceStripes>1?'s':''));
  if (state.overseasBars>0) miscItems.push(state.overseasBars+' Overseas Bar'+(state.overseasBars>1?'s':''));
  [...state.foreign].forEach(id=>miscItems.push(FOREIGN_NAME[id]));
  [...state.unitCitations].forEach(id=>miscItems.push(CITATION_NAME[id]));

  const offsetParts=[];
  if (state.offsetRibbon) offsetParts.push('Ribbon');
  if (state.offsetBadge) offsetParts.push('Badge');
  if (state.offsetRdi) offsetParts.push('RDI');

  const {total} = computePrice();

  let txt = '';
  txt += '**Name:** <@'+(state.name||'[Discord ID]')+'>'+'\n';
  txt += '**Rank:** '+(state.paygrade||'[Paygrade]')+', '+(RANK_NAMES[state.paygrade]||'[Rank]')+'\n';
  txt += '**Type:** '+getUniformDisplayLabel(state.uniform)+'\n';
  txt += '**Gender:** '+state.gender+'\n';
  txt += '**Badges:**\n\n';
  txt += (allBadges.length ? allBadges.map(b=>'* '+b).join('\n') : '* None') + '\n';
  txt += '\n**Ribbons:**\n\n';
  txt += ribbonsList.map(r=>'* '+r).join('\n') + '\n';
  txt += '\n**Misc:**\n\n';
  txt += (miscItems.length ? miscItems.map(m=>'* '+m).join('\n') : '* None') + '\n';
  txt += '\n**Current Division/Brigade/Company:** '+(state.division||'')+'\n';
  txt += '**Nametape:** '+(state.nametape||'')+'\n';
  txt += '**Offset:** '+(offsetParts.length?offsetParts.join(', '):'None')+'\n';
  let priceLine = '**Price:** R$'+total;
  if (Number(state.discountAmt)>0) priceLine += ' (Discounted — ping @'+(state.discountBy||'[QM]')+')';
  txt += priceLine+'\n';
  txt += '**Robux Proof Sent to:** @'+(state.robuxProof||'[LC]')+'\n';
  return txt;
}