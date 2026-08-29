/* ---------------------------------------------------------------
   RENDER
---------------------------------------------------------------- */
function chip(idOrKey, label, selected, isInvalid, priceLabel, locked){
  const cls = ['chip'];
  if (selected) cls.push('selected');
  if (isInvalid) cls.push('invalid');
  if (locked) cls.push('locked');
  return '<div class="'+cls.join(' ')+'" data-id="'+idOrKey+'">'+label+(priceLabel?'<span class="price-tag">'+priceLabel+'</span>':'')+'</div>';
}

function renderUniformSelect(){
  const sel = document.getElementById('uniformSelect');
  sel.innerHTML = Object.entries(UNIFORMS).map(([k,v])=>'<option value="'+k+'"'+(k===state.uniform?' selected':'')+'>'+v.label+'</option>').join('');
}

function renderPrice(){
  const {total, lines} = computePrice();
  document.getElementById('priceTotal').textContent = total;
  document.getElementById('priceLines').innerHTML = lines.map(l=>{
    if (l.free) return '<div><span>'+l.label+'</span><span class="amt" style="color:var(--olive)">R$0</span></div>';
    if (l.disc) return '<div><span>'+l.label+'</span><span class="disc">-R$'+(-l.amt)+'</span></div>';
    return '<div><span>'+l.label+'</span><span class="amt">R$'+l.amt+'</span></div>';
  }).join('');
}

function renderAccessories(){
  const cfg = UNIFORMS[state.uniform];
  const wt = document.getElementById('watchToggle');
  wt.classList.toggle('on', state.watch);
  wt.classList.toggle('disabled', !cfg.watch);
  document.querySelectorAll('#tattooSelect button').forEach(b=>b.classList.toggle('active', Number(b.dataset.n)===state.tattoos));
  document.getElementById('offsetRibbon').classList.toggle('on', state.offsetRibbon);
  document.getElementById('offsetBadge').classList.toggle('on', state.offsetBadge);
  document.getElementById('offsetRdi').classList.toggle('on', state.offsetRdi);
}

function renderFormat(){
  const {issues} = validate();
  const stamp = document.getElementById('stampBadge');
  if (issues.length){ stamp.textContent='Hold — QM Review'; stamp.className='stamp hold'; }
  else { stamp.textContent='Ready'; stamp.className='stamp ready'; }
  const txt = generateFormat();
  document.getElementById('formatOutput').textContent = txt;
  document.getElementById('discByLabel').style.display = Number(state.discountAmt)>0 ? 'block':'none';
  document.getElementById('fDiscBy').style.display = Number(state.discountAmt)>0 ? 'block':'none';
}

function renderViolations(){
  const {issues} = validate();
  const box = document.getElementById('violationsBox');
  if (!issues.length){ box.innerHTML=''; return; }
  box.innerHTML = '<div class="violations"><h3>⚠ Not Authorized — Correct Before Submitting</h3><ul>'+issues.map(i=>'<li>'+i+'</li>').join('')+'</ul></div>';
}

function renderRuleRef(){
  const cfg = UNIFORMS[state.uniform];
  document.getElementById('ruleRef').innerHTML = '<div class="rr-title">Uniform Guide — '+cfg.label+'</div><ul>'+cfg.rules.map(r=>'<li>'+r+'</li>').join('')+'</ul>';
}

function renderBadgesTab(){
  const cfg = UNIFORMS[state.uniform];
  const {invalid} = validate();
  let html='';

  // Skill Tabs
  if (cfg.skillTabs || cfg.skillTabsMetal){
    const maxN = cfg.skillTabs ? cfg.skillTabs.max : cfg.skillTabsMetal.max;
    const allowedSet = cfg.skillTabs ? cfg.skillTabs.allowed : cfg.skillTabsMetal.allowed;
    html += '<div class="group-block"><h4>Skill Tabs <span class="cnt">'+state.skillTabs.size+' / '+maxN+'</span></h4><div class="chip-wrap">';
    SKILL_TABS.forEach(t=>{
      const notAllowed = allowedSet!=='all' && !allowedSet.includes(t.id);
      html += chip('tab:'+t.id, t.name, state.skillTabs.has(t.id), invalid.tabs.has(t.id), 'R$3', false)
        .replace('data-id="tab:'+t.id+'"', 'data-id="tab:'+t.id+'"'+(notAllowed?' title="Not authorized on this uniform"':''));
    });
    html += '</div></div>';
  } else if (cfg.comboSkill){
    html += '<div class="group-block"><h4>Skill Badge / Tab <span class="cnt">metal · max 1</span></h4>';
    html += '<select id="classBItemSelect"><option value="">— None —</option>';
    html += '<optgroup label="Skill Tabs">'+SKILL_TABS.map(t=>'<option value="'+t.id+'"'+(state.classBItem===t.id?' selected':'')+'>'+t.name+'</option>').join('')+'</optgroup>';
    [1,2,3,4].forEach(g=>{
      html += '<optgroup label="Group '+g+' Badges">'+BADGES[g].map(b=>'<option value="'+b.id+'"'+(state.classBItem===b.id?' selected':'')+'>'+b.name+'</option>').join('')+'</optgroup>';
    });
    html += '</select></div>';
  }

  // CSIB
  if (cfg.csib){
    html += '<div class="group-block"><h4>Combat Service Identification Badge</h4><div class="chip-wrap">'+
      chip('csib','Combat Service Identification Badge (CSIB)', state.csib, false, 'R$3', false)+'</div></div>';
  }

  // Skill Badges by group (Marksmanship is open to anyone; Driver/Mechanic is Cavalry-only)
  if (cfg.skillBadges || cfg.aviatorOnly){
    const maxN = cfg.skillBadges ? cfg.skillBadges.max : 1;
    html += '<div class="group-block"><h4>Skill Badges <span class="cnt">'+state.skillBadges.size+' / '+maxN+'</span></h4>';
    [1,2,3,4,5].forEach(g=>{
      html += '<div style="margin-bottom:8px;"><div style="font-size:10px;color:var(--tan-dim);text-transform:uppercase;letter-spacing:.06em;margin-bottom:5px;">Group '+g+'</div><div class="chip-wrap">';
      BADGES[g].forEach(b=>{
        const notCavalry = b.id==='dmb' && !isDmbEligible();
        const locked = (cfg.aviatorOnly && b.id!=='aab' && b.id!=='avnb') || notCavalry;
        html += chip('badge:'+b.id, b.name+(notCavalry?' <span style="opacity:.7">(Drivers only)</span>':''), state.skillBadges.has(b.id), invalid.badges.has(b.id), 'R$3', locked);
      });
      html += '</div></div>';
    });
    const tieredSelected = [...state.skillBadges].filter(id=>TIERED_BADGES[id]);
    if (tieredSelected.length){
      html += '<div class="tier-block">';
      tieredSelected.forEach(id=>{
        html += '<div class="tier-row"><span class="tr-name">'+BADGE_NAME[id]+' class</span><select class="tier-select" data-tier-kind="badge" data-tier-id="'+id+'">'+
          TIERED_BADGES[id].map(t=>'<option value="'+t+'"'+(state.badgeTiers[id]===t?' selected':'')+'>'+t+'</option>').join('')+
          '</select></div>';
      });
      html += '</div>';
    }
  } else if (!cfg.comboSkill){
    html += '<div class="group-block"><h4>Skill Badges</h4><div class="empty-note">Not authorized on this uniform per the Uniform Guide.</div></div>';
  }

  // ID Badges
  if (cfg.idBadges || cfg.idBadgesConditional){
    const conf = cfg.idBadges || cfg.idBadgesConditional;
    const disabledByCsib = cfg.idBadgesConditional && state.csib;
    html += '<div class="group-block"><h4>Identification Badges <span class="cnt">'+state.idBadges.size+' / '+conf.max+(disabledByCsib?' — locked (CSIB worn)':'')+'</span></h4><div class="chip-wrap">';
    ID_BADGES.filter(b=>conf.allowed.includes(b.id)).forEach(b=>{
      html += chip('id:'+b.id, b.name, state.idBadges.has(b.id), invalid.idBadges.has(b.id), 'R$3', disabledByCsib);
    });
    html += '</div></div>';
    const tieredIdSelected = [...state.idBadges].filter(id=>TIERED_ID_BADGES[id]);
    if (tieredIdSelected.length){
      html += '<div class="tier-block">';
      tieredIdSelected.forEach(id=>{
        html += '<div class="tier-row"><span class="tr-name">'+ID_NAME[id]+' class</span><select class="tier-select" data-tier-kind="id" data-tier-id="'+id+'">'+
          TIERED_ID_BADGES[id].map(t=>'<option value="'+t+'"'+(state.idBadgeTiers[id]===t?' selected':'')+'>'+t+'</option>').join('')+
          '</select></div>';
      });
      html += '</div>';
    }
  } else {
    html += '<div class="group-block"><h4>Identification Badges</h4><div class="empty-note">Not authorized on this uniform per the Uniform Guide.</div></div>';
  }

  // Unit Citations
  if (cfg.unitCitations){
    html += '<div class="group-block"><h4>Unit Citations <span class="cnt">free — correlated to current division</span></h4><div class="chip-wrap">';
    UNIT_CITATIONS.forEach(c=>{
      html += chip('uc:'+c.id, c.name, state.unitCitations.has(c.id), false, 'FREE', false);
    });
    html += '</div></div>';
  }

  // Service Stripes / Overseas Bars
  if (cfg.stripesBars){
    html += '<div class="group-block"><h4>Service Stripes &amp; Overseas Bars <span class="cnt">R$3 each — max 8 each</span></h4>';
    html += '<div class="row2">';
    html += '<div><label>Service Stripes (enlisted only)</label><input type="number" id="stripesInput" min="0" max="8" value="'+state.serviceStripes+'"></div>';
    html += '<div><label>Overseas Bars</label><input type="number" id="barsInput" min="0" max="8" value="'+state.overseasBars+'"></div>';
    html += '</div></div>';
  }

  document.getElementById('tabContent').innerHTML = html;

  if (cfg.comboSkill){
    document.getElementById('classBItemSelect').addEventListener('change', e=>{
      state.classBItem = e.target.value; renderAll();
    });
  }
  if (cfg.stripesBars){
    document.getElementById('stripesInput').addEventListener('change', e=>{
      state.serviceStripes = Math.max(0, Math.min(8, Number(e.target.value)||0)); renderAll();
    });
    document.getElementById('barsInput').addEventListener('change', e=>{
      state.overseasBars = Math.max(0, Math.min(8, Number(e.target.value)||0)); renderAll();
    });
  }
}

function renderRankSelect(){
  const sel = document.getElementById('fPaygrade');
  if (!sel.options.length){
    sel.innerHTML = '<option value="">—</option>'+PAYGRADES.map(p=>'<option value="'+p+'">'+p+'</option>').join('');
  }
  sel.value = state.paygrade;
  const rankInput = document.getElementById('fRank');
  rankInput.readOnly = true;
  rankInput.value = RANK_NAMES[state.paygrade] || '';
}

function renderDivisionSelects(){
  const container = document.getElementById('divisionSelects');
  let html = '';
  let levelOptions = UNIT_TREE;
  let i = 0;

  while (levelOptions && levelOptions.length){
    const selectedName = state.divisionPath[i] || '';
    const label = LEVEL_LABELS[i] || 'Sub-unit';

    let options = levelOptions.map(n =>
      '<option value="'+n.name.replace(/"/g,'&quot;')+'"'+
      (n.name===selectedName?' selected':'')+'>'+
      n.name+(n.role?' ('+n.role+')':'')+
      '</option>'
    ).join('');

    // Once a command is selected, allow Headquarters at the next level.
    // Headquarters is terminal: it does not expose lower organizational levels.
    if (i === 1 && state.divisionPath[0]){
      options += '<option value="Headquarters"'+
        (selectedName==='Headquarters'?' selected':'')+
        '>Headquarters</option>';
    }

    html += '<select class="division-level" data-level="'+i+'"><option value="">— Select '+label+' —</option>'+
      options+
      '</select>';

    if (!selectedName || selectedName === 'Headquarters') break;

    const node = levelOptions.find(n=>n.name===selectedName);
    levelOptions = node ? node.children : null;
    i++;
  }

  container.innerHTML = html;

  const infoBox = document.getElementById('divisionInfo');
  const deepest = getNodeByPath(state.divisionPath);

  if (deepest && (deepest.combative || deepest.badge || deepest.note)){
    const lines = [];

    if (deepest.combative){
      lines.push('<div><b>Classification:</b> '+deepest.combative+'</div>');
    }

    if (deepest.badge){
      const has = state.skillBadges.has(deepest.badge);

      lines.push(
        '<div class="ui-badge-row"><span><b>Auto Deployment Badge:</b> '+
        '<span class="ui-badge">'+BADGE_NAME[deepest.badge]+'</span></span>'+
        '<div class="badge-toggle-box '+(has?'on':'off')+'" '+
        'data-badge-toggle="'+deepest.badge+'" '+
        'title="Click to '+(has?'remove':'add')+' to your Skill Badges"></div></div>'
      );
    }

    if (deepest.note){
      lines.push('<div class="ui-note">'+deepest.note+'</div>');
    }

    infoBox.innerHTML = lines.join('');
    infoBox.style.display = 'block';
  } else {
    infoBox.style.display = 'none';
  }

  state.division = formatDivisionPath(state.divisionPath);
}

function renderRibbonsTab(){
  const cfg = UNIFORMS[state.uniform];
  let html='';
  if (!cfg.ribbons){
    html = '<div class="group-block"><h4>Ribbons</h4><div class="empty-note">Not authorized on this uniform per the Uniform Guide.</div></div>';
    document.getElementById('tabContent').innerHTML = html;
    return;
  }
  const {invalid} = validate();

  if (cfg.ribbons.max == null){
    html += '<div class="group-block"><h4>Included Automatically <span class="cnt">free — default E2+ ribbons</span></h4><div class="free-row">'+
      FREE_DEFAULT_RIBBONS.map(n=>'<div class="free-chip">'+n+'</div>').join('')+
      '</div></div>';
  } else {
    html += '<div class="group-block"><h4>Automatic Ribbons <span class="cnt">not counted toward the '+cfg.ribbons.max+' ribbon maximum</span></h4>'+
      '<div class="empty-note">Default E2+ ribbons are not automatically included on this uniform. Select any of them manually below if authorized.</div></div>';
  }

  const maxLabel = cfg.ribbons.max!=null ? (' / '+cfg.ribbons.max) : '';
  html += '<div class="group-block"><h4>Selectable Ribbons <span class="cnt">'+state.ribbons.size+maxLabel+'</span></h4>';
  RIBBON_CATS.forEach(cat=>{
    const items = RIBBONS.filter(r=>{
    if (r.cat !== cat) return false;
    if (cfg.ribbons.max != null) return true;
    return !r.freeDefault;
    });

    if (!items.length) return;
    html += '<div style="margin-bottom:8px;"><div style="font-size:10px;color:var(--tan-dim);text-transform:uppercase;letter-spacing:.06em;margin-bottom:5px;">'+cat+'</div><div class="chip-wrap">';
    items.forEach(r=>{
      const isDeploymentFree =
        r.id === 'gwotE' &&
        (state.csib || [...state.skillBadges].some(b=>['cib','cmb','cab'].includes(b)));

      const isAutomaticDefault =
        r.freeDefault && cfg.ribbons.max == null;

      const priceLabel =
        isAutomaticDefault ? 'FREE' :
        isDeploymentFree ? 'FREE' :
        'R$3';

      html += chip(
        'ribbon:'+r.id,
        r.name,
        state.ribbons.has(r.id),
        invalid.ribbons.has(r.id),
        priceLabel,
        false
      );
    });
    html += '</div></div>';
  });
  html += '</div>';
  if (cfg.ribbons.offsetRows){
    html += '<div class="acc-note" style="margin-top:4px;">Offsetting limit: max '+cfg.ribbons.offsetRows+' rows offset, '+cfg.ribbons.offsetPerRow+' ribbons per offset row.</div>';
  }
  document.getElementById('tabContent').innerHTML = html;
}

function renderForeignTab(){
  const cfg = UNIFORMS[state.uniform];
  let html='';
  if (!cfg.foreignAward && !cfg.foreignUnlimited){
    html = '<div class="group-block"><h4>Foreign Devices</h4><div class="empty-note">Not authorized on this uniform per the Uniform Guide.</div></div>';
    document.getElementById('tabContent').innerHTML = html;
    return;
  }
  const {invalid} = validate();
  const capLabel = cfg.foreignAward ? (' / '+cfg.foreignAward.max+' slot') : ' / unlimited';
  html += '<div class="group-block"><h4>Foreign Devices <span class="cnt">'+state.foreign.size+capLabel+'</span></h4><div class="chip-wrap">';
  FOREIGN.forEach(f=>{
    html += chip('foreign:'+f.id, f.name, state.foreign.has(f.id), invalid.foreign.has(f.id), 'R$3', false);
  });
  html += '</div></div>';
  document.getElementById('tabContent').innerHTML = html;
}

function renderTabContent(){
  if (state.activeTab==='badges') renderBadgesTab();
  else if (state.activeTab==='ribbons') renderRibbonsTab();
  else renderForeignTab();
}

/* ---------------------------------------------------------------
   UNIFORM CHANGE CLEANUP
   Keeps anything still authorized on the newly selected uniform,
   while removing items that are no longer authorized.
---------------------------------------------------------------- */
function sanitizeForUniform(){
  const cfg = UNIFORMS[state.uniform];

  // Skill Tabs
  if (cfg.skillTabs){
    if (cfg.skillTabs.allowed !== 'all'){
      state.skillTabs = new Set(
        [...state.skillTabs].filter(id => cfg.skillTabs.allowed.includes(id))
      );
    }
    // Remove excess tabs when the new uniform has a lower maximum.
    if (state.skillTabs.size > cfg.skillTabs.max){
      state.skillTabs = new Set([...state.skillTabs].slice(0, cfg.skillTabs.max));
    }
  } else if (cfg.skillTabsMetal){
    if (state.skillTabs.size > cfg.skillTabsMetal.max){
      state.skillTabs = new Set([...state.skillTabs].slice(0, cfg.skillTabsMetal.max));
    }
  } else if (!cfg.comboSkill){
    state.skillTabs.clear();
  }

  // Skill Badges
  if (cfg.skillBadges){
    state.skillBadges = new Set(
      [...state.skillBadges].filter(id => BADGE_NAME[id])
    );

    // ICVC Pilot restriction
    if (cfg.aviatorOnly){
      state.skillBadges = new Set(
        [...state.skillBadges].filter(id => id === 'aab' || id === 'avnb')
      );
    }

    // DMB restriction
    if (!isDmbEligible()){
      state.skillBadges.delete('dmb');
    }

    // Remove badges that exceed the new uniform's maximum.
    if (state.skillBadges.size > cfg.skillBadges.max){
      state.skillBadges = new Set(
        [...state.skillBadges].slice(0, cfg.skillBadges.max)
      );
    }

    // Enforce combined group restrictions.
    if (cfg.skillBadges.comboGroups){
      cfg.skillBadges.comboGroups.forEach(groupList=>{
        const matches = [...state.skillBadges]
          .filter(id => groupList.includes(BADGE_GROUP[id]));

        // Keep the first selected badge and remove the rest.
        matches.slice(1).forEach(id => {
          state.skillBadges.delete(id);
          delete state.badgeTiers[id];
        });
      });
    }
  } else if (!cfg.comboSkill && !cfg.aviatorOnly){
    state.skillBadges.clear();
    state.badgeTiers = {};
  }

  // ICVC Pilot — still keep only valid badges
  if (cfg.aviatorOnly){
    [...state.skillBadges].forEach(id=>{
      if (id !== 'aab' && id !== 'avnb'){
        state.skillBadges.delete(id);
        delete state.badgeTiers[id];
      }
    });
  }

  // ID Badges
  if (cfg.idBadges){
    state.idBadges = new Set(
      [...state.idBadges].filter(id => cfg.idBadges.allowed.includes(id))
    );

    if (state.idBadges.size > cfg.idBadges.max){
      state.idBadges = new Set(
        [...state.idBadges].slice(0, cfg.idBadges.max)
      );
    }
  } else if (cfg.idBadgesConditional){
    if (state.csib){
      // CSIB and conditional ID badges cannot coexist.
      state.idBadges.clear();
      state.idBadgeTiers = {};
    } else {
      state.idBadges = new Set(
        [...state.idBadges].filter(id =>
          cfg.idBadgesConditional.allowed.includes(id)
        )
      );

      if (state.idBadges.size > cfg.idBadgesConditional.max){
        state.idBadges = new Set(
          [...state.idBadges].slice(0, cfg.idBadgesConditional.max)
        );
      }
    }
  } else {
    state.idBadges.clear();
    state.idBadgeTiers = {};
  }

  // CSIB — preserve it if the new uniform still allows it.
  if (!cfg.csib){
    state.csib = false;
  }

  // Ribbons
  // IMPORTANT: manually selected ribbons are preserved if the new
  // uniform allows ribbons. Automatic/default ribbons are handled
  // separately by generateFormat().
  if (!cfg.ribbons){
    state.ribbons.clear();
  } else if (cfg.ribbons.max != null && state.ribbons.size > cfg.ribbons.max){
    state.ribbons = new Set(
      [...state.ribbons].slice(0, cfg.ribbons.max)
    );
  }

  // Foreign Devices
  if (!cfg.foreignAward && !cfg.foreignUnlimited){
    state.foreign.clear();
  } else if (cfg.foreignAward && state.foreign.size > cfg.foreignAward.max){
    state.foreign = new Set(
      [...state.foreign].slice(0, cfg.foreignAward.max)
    );
  }

  // Unit Citations
  if (!cfg.unitCitations){
    state.unitCitations.clear();
  }

  // Service / Overseas bars
  if (!cfg.stripesBars){
    state.serviceStripes = 0;
    state.overseasBars = 0;
  }

  // Watch
  if (!cfg.watch){
    state.watch = false;
  }

  // Class B's combined metal item only exists on Class B.
  if (state.uniform !== 'classB'){
    state.classBItem = '';
  }

  // Remove stale tier information.
  Object.keys(state.badgeTiers).forEach(id=>{
    if (!state.skillBadges.has(id)) delete state.badgeTiers[id];
  });

  Object.keys(state.idBadgeTiers).forEach(id=>{
    if (!state.idBadges.has(id)) delete state.idBadgeTiers[id];
  });
}

function renderAll(){
  renderPrice();
  renderAccessories();
  renderRankSelect();
  renderDivisionSelects();
  renderFormat();
  renderViolations();
  renderRuleRef();
  renderTabContent();
}

/* ---------------------------------------------------------------
   EVENTS
---------------------------------------------------------------- */
document.getElementById('uniformSelect').addEventListener('change', e=>{
  state.uniform = e.target.value;
  sanitizeForUniform();
  renderAll();
});


document.getElementById('watchToggle').addEventListener('click', ()=>{
  const cfg = UNIFORMS[state.uniform];
  if (!cfg.watch) return;
  state.watch = !state.watch; renderAll();
});
document.getElementById('tattooSelect').addEventListener('click', e=>{
  if (e.target.tagName!=='BUTTON') return;
  state.tattoos = Number(e.target.dataset.n); renderAll();
});
document.getElementById('offsetRibbon').addEventListener('click', ()=>{ state.offsetRibbon=!state.offsetRibbon; renderAll(); });
document.getElementById('offsetBadge').addEventListener('click', ()=>{ state.offsetBadge=!state.offsetBadge; renderAll(); });
document.getElementById('offsetRdi').addEventListener('click', ()=>{ state.offsetRdi=!state.offsetRdi; renderAll(); });

['fName','fGender','fNametape','fProof','fDiscAmt','fDiscBy'].forEach(id=>{
  document.getElementById(id).addEventListener('input', e=>{
    const map = {fName:'name',fGender:'gender',fNametape:'nametape',fProof:'robuxProof',fDiscAmt:'discountAmt',fDiscBy:'discountBy'};
    state[map[id]] = e.target.value;
    renderAll();
  });
  document.getElementById(id).addEventListener('change', e=>{
    const map = {fName:'name',fGender:'gender',fNametape:'nametape',fProof:'robuxProof',fDiscAmt:'discountAmt',fDiscBy:'discountBy'};
    state[map[id]] = e.target.value;
    renderAll();
  });
});

document.getElementById('fPaygrade').addEventListener('change', e=>{
  state.paygrade = e.target.value;
  renderAll();
});

document.getElementById('divisionInfo').addEventListener('click', e=>{
  const box = e.target.closest('.badge-toggle-box');
  if (!box) return;
  const id = box.dataset.badgeToggle;
  if (state.skillBadges.has(id)) state.skillBadges.delete(id);
  else state.skillBadges.add(id);
  renderAll();
});

document.getElementById('divisionSelects').addEventListener('change', e=>{
  const sel = e.target.closest('.division-level');
  if (!sel) return;

  const level = Number(sel.dataset.level);

  state.divisionPath = state.divisionPath.slice(0, level);

  if (sel.value){
    state.divisionPath.push(sel.value);
  }

  // Headquarters is terminal and represents the selected main command.
  // No lower-level unit can remain selected beneath it.
  if (sel.value === 'Headquarters'){
    state.divisionPath = state.divisionPath.slice(0, 2);
    state.divisionPath[1] = 'Headquarters';
  }

  if (!isDmbEligible() && state.skillBadges.has('dmb')){
    state.skillBadges.delete('dmb');
  }

  renderAll();
});

document.querySelectorAll('.tab-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    state.activeTab = btn.dataset.tab;
    renderTabContent();
  });
});

document.getElementById('tabContent').addEventListener('click', e=>{
  const el = e.target.closest('.chip');
  if (!el || el.classList.contains('locked')) return;
  const id = el.dataset.id;
  const [kind, key] = id.split(':');
  if (kind==='tab'){
    const cfg = UNIFORMS[state.uniform];
    const maxN = cfg.skillTabs ? cfg.skillTabs.max : (cfg.skillTabsMetal ? cfg.skillTabsMetal.max : 99);
    if (state.skillTabs.has(key)) state.skillTabs.delete(key);
    else state.skillTabs.add(key);
  } else if (kind==='badge'){
    if (state.skillBadges.has(key)){ state.skillBadges.delete(key); delete state.badgeTiers[key]; }
    else { state.skillBadges.add(key); if (TIERED_BADGES[key]) state.badgeTiers[key] = TIERED_BADGES[key][0]; }
  } else if (kind==='csib'){
    state.csib = !state.csib;
  } else if (kind==='id'){
    if (state.idBadges.has(key)){ state.idBadges.delete(key); delete state.idBadgeTiers[key]; }
    else { state.idBadges.add(key); if (TIERED_ID_BADGES[key]) state.idBadgeTiers[key] = TIERED_ID_BADGES[key][0]; }
  } else if (kind==='ribbon'){
    if (state.ribbons.has(key)) state.ribbons.delete(key);
    else state.ribbons.add(key);
  } else if (kind==='foreign'){
    if (state.foreign.has(key)) state.foreign.delete(key);
    else state.foreign.add(key);
  } else if (kind==='uc'){
    if (state.unitCitations.has(key)) state.unitCitations.delete(key);
    else state.unitCitations.add(key);
  }
  renderAll();
});

document.getElementById('tabContent').addEventListener('change', e=>{
  const sel = e.target.closest('.tier-select');
  if (!sel) return;
  const id = sel.dataset.tierId;
  if (sel.dataset.tierKind==='badge') state.badgeTiers[id] = sel.value;
  else state.idBadgeTiers[id] = sel.value;
  renderAll();
});

document.getElementById('copyBtn').addEventListener('click', ()=>{
  const txt = document.getElementById('formatOutput').textContent;
  navigator.clipboard.writeText(txt).then(()=>{
    const btn = document.getElementById('copyBtn');
    btn.textContent='Copied ✓'; btn.classList.add('copied');
    setTimeout(()=>{ btn.textContent='Copy Format'; btn.classList.remove('copied'); }, 1400);
  });
});

/* ---------------------------------------------------------------
   INIT
---------------------------------------------------------------- */
renderUniformSelect();
renderAll();