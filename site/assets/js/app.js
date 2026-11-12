
(()=>{ // ================= núcleo demo original =================
  const qs=(s,c=document)=>c.querySelector(s);
  const qsa=(s,c=document)=>[...c.querySelectorAll(s)];
  qsa('[data-demo]').forEach(el=>el.addEventListener('click',()=>{
    const msg=el.getAttribute('data-demo')||'Interacción demostrativa';
    let n=qs('#demo-toast');
    if(!n){n=document.createElement('div');n.id='demo-toast';n.setAttribute('role','status');n.style.cssText='position:fixed;right:16px;bottom:16px;background:#15324A;color:white;padding:12px 16px;border-radius:10px;box-shadow:0 8px 24px rgba(15,23,42,.2);z-index:999';document.body.appendChild(n)}
    n.textContent=msg;setTimeout(()=>n.remove(),2200);
  }));
  const roleForm=qs('#role-form');
  if(roleForm){roleForm.addEventListener('submit',e=>{e.preventDefault();const v=new FormData(roleForm).get('role');location.href=v==='proveedor'?'dashboard-proveedor.html':'dashboard-propietario.html'})}
})();

(()=>{ // ================= MVP Actividad 3 · reserva con estados (localStorage) =================
  const qs=(s,c=document)=>c.querySelector(s);
  const qsa=(s,c=document)=>[...c.querySelectorAll(s)];
  const DB_KEY='petcare_db_v1', DRAFT_KEY='petcare_draft_v1';
  const h=t=>String(t??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const iso=d=>d.toISOString().slice(0,10);
  const addDays=(d,n)=>{const x=new Date(d);x.setDate(x.getDate()+n);return x};
  const fmtFecha=d=>new Date(d+'T12:00:00').toLocaleDateString('es-CO',{day:'2-digit',month:'short',weekday:'short'});
  const fmtHora=t=>t;
  const money=n=>new Intl.NumberFormat('es-CO',{style:'currency',currency:'COP',maximumFractionDigits:0}).format(n);
  const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7);
  const nowStamp=()=>new Date().toLocaleString('es-CO',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'});

  function seed(){
    const hoy=new Date(), man=addDays(hoy,1), yesterday=addDays(hoy,-1);
    return {
      v:1,
      mascotas:[{id:'m1',nombre:'Luna',tipo:'Perro',edad:'4 años'},{id:'m2',nombre:'Nala',tipo:'Perro',edad:'2 años'},{id:'m3',nombre:'Rocky',tipo:'Gato',edad:'6 años'},{id:'m4',nombre:'Milo',tipo:'Gato',edad:'3 años'}],
      catalogo:[
        {id:'s1',servicio:'Consulta general',proveedor:'Centro Huellas',precio:65000},
        {id:'s2',servicio:'Valoración integral',proveedor:'Centro Huellas',precio:55000},
        {id:'s3',servicio:'Paseo 45 min',proveedor:'Paseos Envigado',precio:40000},
        {id:'s4',servicio:'Peluquería',proveedor:'Pet Style',precio:70000},
        {id:'s5',servicio:'Consulta veterinaria',proveedor:'Vet Sabaneta',precio:80000}
      ],
      slots:['09:00','10:30','14:00','16:00'],
      reservas:[
        {id:'r-seed1',servicio:'Consulta general',proveedor:'Centro Huellas',precio:65000,mascota:'Luna · Perro',nota:'Control de rutina.',fecha:iso(man),hora:'10:30',estado:'Confirmada',creado:nowStamp(),actualizado:nowStamp()},
        {id:'r-seed2',servicio:'Valoración integral',proveedor:'Centro Huellas',precio:55000,mascota:'Nala · Perro',nota:'Primera valoración.',fecha:iso(man),hora:'14:00',estado:'Solicitada',creado:nowStamp(),actualizado:nowStamp()},
        {id:'r-seed3',servicio:'Peluquería',proveedor:'Pet Style',precio:70000,mascota:'Rocky · Gato',nota:'',fecha:iso(yesterday),hora:'09:00',estado:'Completada',creado:nowStamp(),actualizado:nowStamp()}
      ]
    };
  }
  const db=()=>{ try{ let d=JSON.parse(localStorage.getItem(DB_KEY)); if(!d||d.v!==1){d=seed();localStorage.setItem(DB_KEY,JSON.stringify(d))} return d }catch(e){ const d=seed(); localStorage.setItem(DB_KEY,JSON.stringify(d)); return d } };
  const save=d=>localStorage.setItem(DB_KEY,JSON.stringify(d));
  const draft=()=>{ try{return JSON.parse(sessionStorage.getItem(DRAFT_KEY))||null}catch(e){return null} };
  const setDraft=x=>sessionStorage.setItem(DRAFT_KEY,JSON.stringify(x));
  const clearDraft=()=>sessionStorage.removeItem(DRAFT_KEY);
  const badge=st=>({'Solicitada':'badge-requested','Confirmada':'badge-confirmed','Rechazada':'badge-rejected','Cancelada':'badge-cancelled','Completada':'badge-completed'}[st]||'badge-requested');
  function toast(msg){let n=qs('#demo-toast');if(!n){n=document.createElement('div');n.id='demo-toast';n.setAttribute('role','status');n.style.cssText='position:fixed;right:16px;bottom:16px;background:#15324A;color:white;padding:12px 16px;border-radius:10px;box-shadow:0 8px 24px rgba(15,23,42,.2);z-index:999';document.body.appendChild(n)}n.textContent=msg;setTimeout(()=>n.remove(),2600)}
  const page=location.pathname.split('/').pop()||'index.html';
  const params=new URLSearchParams(location.search);
  const conflict=(d,r)=>d.reservas.some(x=>x.id!==r.id&&x.estado==='Confirmada'&&x.fecha===r.fecha&&x.hora===r.hora);

  // ---------- servicio.html: guardar contexto elegido ----------
  if(page==='servicio.html'){
    const prov=qs('main h2'), svc=qs('main h3');
    qsa('main a[href="reservar.html"]').forEach(a=>a.addEventListener('click',()=>{
      const d=db();
      const cat=d.catalogo.find(c=>svc&&c.servicio===svc.textContent.trim())||d.catalogo[0];
      const hora=/^\d{2}:\d{2}$/.test(a.textContent.trim())?a.textContent.trim():'10:30';
      setDraft({catId:cat.id,servicio:cat.servicio,proveedor:prov?prov.textContent.trim():cat.proveedor,precio:cat.precio,hora});
    }));
  }

  // ---------- reservar.html: selección real de servicio, mascota y horario ----------
  if(page==='reservar.html'){
    const d=db();
    const petSel=qs('#pet'), slotSel=qs('#slot');
    if(petSel){ petSel.innerHTML=d.mascotas.map(m=>`<option value="${h(m.id)}">${h(m.nombre)} · ${h(m.tipo)} · ${h(m.edad)}</option>`).join(''); }
    if(slotSel){
      const days=[0,1,2].map(n=>iso(addDays(new Date(),n)));
      slotSel.innerHTML=days.map(f=>d.slots.map(s=>{
        const occ=d.reservas.some(r=>r.estado==='Confirmada'&&r.fecha===f&&r.hora===s);
        return `<option value="${f} ${s}"${occ?' disabled':''}>${fmtFecha(f)} · ${s}${occ?' · ocupado':''}</option>`;
      }).join('')).join('');
      const dr0=draft(); if(dr0&&dr0.fecha&&dr0.hora) slotSel.value=`${dr0.fecha} ${dr0.hora}`;
    }
    // Nota sincronizada con la mascota: si la nota está vacía o es una nota
    // por defecto de otra mascota, se actualiza al cambiar de mascota (evita
    // que quede información operativa de una mascota aplicada a otra).
    const NOTAS={Luna:'Luna se estresa con secadores fuertes.'};
    const notaEl=qs('#note');
    const syncNota=()=>{ if(!notaEl||!petSel) return; const v=notaEl.value.trim();
      const pet=d.mascotas.find(m=>m.id===petSel.value)||d.mascotas[0];
      const def=NOTAS[pet.nombre]||'';
      if(!v||Object.values(NOTAS).includes(v)) notaEl.value=def; };
    petSel&&petSel.addEventListener('change',syncNota);
    syncNota();
    const form=qs('main form');
    if(form){
      const field=document.createElement('div'); field.className='field';
      field.innerHTML=`<label for="svc">Servicio</label><select class="select" id="svc">${d.catalogo.map(c=>`<option value="${h(c.id)}">${h(c.servicio)} · ${h(c.proveedor)} · ${money(c.precio)}</option>`).join('')}</select>`;
      form.querySelector('.form-grid')?form.querySelector('.form-grid').prepend(field):form.prepend(field);
      if(draft()){const dr=draft(); if(dr.catId){qs('#svc').value=dr.catId}}
    }
    const persist=()=>{ const catId=qs('#svc')?qs('#svc').value:null; const cat=d.catalogo.find(c=>c.id===catId)||d.catalogo[0];
      const pet=d.mascotas.find(m=>m.id===(qs('#pet')?qs('#pet').value:null))||d.mascotas[0];
      const [fecha,hora]=(qs('#slot')?qs('#slot').value:'').split(' ');
      setDraft({catId:cat.id,servicio:cat.servicio,proveedor:cat.proveedor,precio:cat.precio,mascota:`${pet.nombre} · ${pet.tipo}`,fecha,hora:hora||'10:30',nota:qs('#note')?qs('#note').value:''});
    };
    form&&form.addEventListener('change',persist);
    form&&form.addEventListener('submit',e=>{e.preventDefault();persist();});
    qsa('main a[href="revisar.html"]').forEach(a=>a.addEventListener('click',persist));
  }

  // ---------- revisar.html: resumen real y creación de la reserva ----------
  if(page==='revisar.html'){
    const dr=draft();
    if(!dr){ toast('No hay datos de reserva; empieza de nuevo.'); setTimeout(()=>location.href='servicio.html',900); }
    else{
      const dd=qsa('main dl dd');
      const vals=[dr.servicio,dr.proveedor,dr.mascota,`${fmtFecha(dr.fecha)} · ${dr.hora}`,money(dr.precio)];
      dd.forEach((el,i)=>{ if(vals[i]!==undefined) el.textContent=vals[i]; });
    }
    qsa('main a[href="estado.html"]').forEach(a=>a.addEventListener('click',e=>{
      const d2=db(); const dr2=draft();
      if(!dr2){ e.preventDefault(); toast('No hay datos de reserva; empieza de nuevo.'); return; }
      const chk=qs('main input[type="checkbox"]');
      if(chk&&!chk.checked){ e.preventDefault(); toast('Confirma la casilla de revisión antes de enviar.'); return; }
      if(conflict(d2,{id:'new',fecha:dr2.fecha,hora:dr2.hora})){ e.preventDefault(); toast('Ese horario acaba de quedar ocupado; elige otro.'); return; }
      d2.reservas.push({id:uid(),servicio:dr2.servicio,proveedor:dr2.proveedor,precio:dr2.precio,mascota:dr2.mascota,nota:dr2.nota||'',fecha:dr2.fecha,hora:dr2.hora,estado:'Solicitada',creado:nowStamp(),actualizado:nowStamp()});
      save(d2); clearDraft(); toast('Solicitud enviada; quedó en estado Solicitada.');
    }));
  }

  // ---------- estado.html: reservas propias con estados reales ----------
  if(page==='estado.html'){
    const grid=qs('main .grid.grid-2');
    if(grid){
      const d=db();
      const list=[...d.reservas].sort((a,b)=>(b.fecha+b.hora).localeCompare(a.fecha+a.hora));
      const ref=params.get('ref');
      if(!list.length){ grid.innerHTML=`<section class="card"><div class="notice notice-info">Aún no hay solicitudes. <a href="buscar.html">Busca un servicio</a> para crear la primera.</div></section>`; }
      else grid.innerHTML=list.map(r=>`
        <section class="card" id="res-${h(r.id)}" style="${ref===r.id?'outline:2px solid #0B6B61;outline-offset:2px;':''}">
          <div class="eyebrow">${h(r.servicio)} · ${h(r.mascota)} · ${fmtFecha(r.fecha)} · ${h(r.hora)}</div>
          <h2>${h(r.proveedor)} <span class="badge ${badge(r.estado)}">${h(r.estado)}</span></h2>
          ${r.nota?`<div class="notice notice-info"><strong>Nota:</strong> ${h(r.nota)}</div>`:''}
          <div class="timeline">
            <div class="timeline-step active"><div><strong>Solicitada</strong><div class="muted">${h(r.creado)}</div></div></div>
            <div class="timeline-step ${r.estado==='Confirmada'||r.estado==='Completada'?'active':''}"><div><strong>Confirmada</strong><div class="muted">${r.estado==='Confirmada'||r.estado==='Completada'?'Aceptada por el proveedor':'Pendiente de decisión del proveedor'}</div></div></div>
            ${r.estado==='Completada'?'<div class="timeline-step active"><div><strong>Completada</strong></div></div>':''}
          </div>
          <div class="btn-row">
            <a class="btn btn-secondary" href="historial.html">Ver historial</a>
            ${(r.estado==='Solicitada'||r.estado==='Confirmada')?`<button class="btn btn-danger" data-cancel="${h(r.id)}">Cancelar solicitud</button>`:''}
          </div>
        </section>`).join('');
      qsa('[data-cancel]').forEach(b=>b.addEventListener('click',()=>{
        const d2=db(); const r=d2.reservas.find(x=>x.id===b.dataset.cancel);
        if(!r) return;
        // Prevención de errores en acción destructiva: primer clic arma, segundo confirma.
        if(b.dataset.armed!=='1'){ b.dataset.armed='1'; const orig=b.textContent; b.textContent='Confirmar cancelación'; setTimeout(()=>{b.dataset.armed='0';b.textContent=orig;},2600); return; }
        r.estado='Cancelada'; r.actualizado=nowStamp(); save(d2); toast('Solicitud cancelada.'); setTimeout(()=>location.reload(),700);
      }));
    }
  }

  // ---------- historial.html: tabla real de reservas ----------
  if(page==='historial.html'){
    const tbody=qs('main table tbody');
    if(tbody){
      const d=db();
      const list=[...d.reservas].sort((a,b)=>(b.fecha+b.hora).localeCompare(a.fecha+a.hora));
      tbody.innerHTML=list.length?list.map(r=>`<tr><td data-label="Fecha">${fmtFecha(r.fecha)}</td><td data-label="Servicio">${h(r.servicio)}</td><td data-label="Proveedor">${h(r.proveedor)}</td><td data-label="Mascota">${h(r.mascota)}</td><td data-label="Estado"><span class="badge ${badge(r.estado)}">${h(r.estado)}</span></td></tr>`).join(''):'<tr><td colspan="5">Sin reservas registradas.</td></tr>';
    }
  }

  // ---------- solicitudes.html: bandeja real del proveedor ----------
  if(page==='solicitudes.html'){
    const tbody=qs('main table tbody');
    if(tbody){
      const d=db();
      const list=d.reservas.filter(r=>r.estado==='Solicitada');
      tbody.innerHTML=list.length?list.map(r=>`<tr><td data-label="Hora">${h(r.hora)}</td><td data-label="Servicio">${h(r.servicio)}</td><td data-label="Mascota">${h(r.mascota)}</td><td data-label="Estado"><span class="badge badge-requested">Solicitada</span></td><td data-label="Acción"><a class="btn btn-primary" href="solicitud.html?id=${encodeURIComponent(r.id)}">Revisar</a></td></tr>`).join(''):'<tr><td colspan="5">No hay solicitudes pendientes.</td></tr>';
    }
  }

  // ---------- solicitud.html: decisión real con guarda BR-06 ----------
  if(page==='solicitud.html'){
    const d=db(); const r=d.reservas.find(x=>x.id===params.get('id'));
    if(r){
      const head=qs('main .card .eyebrow'); if(head) head.textContent=`${r.estado==='Solicitada'?'Nueva solicitud':'Solicitud'} · ${fmtFecha(r.fecha)} · ${r.hora}`;
      const h2=qs('main section.card h2'); if(h2) h2.textContent=r.servicio;
      const h3=qs('main section.card h3'); if(h3) h3.textContent=r.mascota;
      const note=qs('main .notice-info'); if(note) note.innerHTML=`<strong>Nota del propietario:</strong> ${h(r.nota||'Sin notas adicionales.')}`;
      const stBadge=qs('main aside .badge'); if(stBadge){stBadge.textContent=r.estado;stBadge.className=`badge ${badge(r.estado)}`}
      const [btnOk,btnNo]=[...qsa('main aside button')].slice(0,2);
      const decide=(estado,okMsg)=>{ const d2=db(); const r2=d2.reservas.find(x=>x.id===r.id);
        if(!r2){toast('La solicitud ya no existe.');return}
        if(estado==='Confirmada'&&conflict(d2,r2)){toast('Guarda BR-06: ya existe una reserva confirmada en ese horario.');return}
        r2.estado=estado; r2.actualizado=nowStamp(); save(d2); toast(okMsg); setTimeout(()=>location.href='solicitudes.html',800); };
      btnOk&&btnOk.addEventListener('click',()=>decide('Confirmada','Solicitud confirmada; visible en agenda.'));
      btnNo&&btnNo.addEventListener('click',()=>decide('Rechazada','Solicitud rechazada.'));
    }
  }

  // ---------- agenda.html: calendario real desde disponibilidad + confirmadas ----------
  if(page==='agenda.html'){
    const cal=qs('main .calendar');
    if(cal){
      const d=db();
      let html='';
      for(let n=1;n<=5;n++){
        const f=iso(addDays(new Date(),n));
        const slots=d.slots.map(s=>{
          const conf=d.reservas.find(r=>r.estado==='Confirmada'&&r.fecha===f&&r.hora===s);
          const sol=d.reservas.find(r=>r.estado==='Solicitada'&&r.fecha===f&&r.hora===s);
          if(conf) return `<div class="slot busy">${s} Confirmada · ${h(conf.servicio)} (${h(conf.mascota.split(' · ')[0])})</div>`;
          if(sol) return `<div class="slot blocked">${s} En revisión · ${h(sol.servicio)}</div>`;
          return `<div class="slot free">${s} Disponible</div>`;
        }).join('');
        html+=`<div class="day"><strong>${fmtFecha(f)}</strong>${slots}</div>`;
      }
      cal.innerHTML=html;
    }
  }

  // ---------- honestidad del pie de página: el MVP ya persiste datos ----------
  qsa('footer .footer-inner span').forEach(el=>{ if(el.textContent.includes('Sin backend')) el.textContent='MVP local · datos persistidos en este navegador'; });

  // ---------- utilidades expuestas para QA y depuración ----------
  window.__petcare={db,draft,seed,reset:()=>{localStorage.removeItem(DB_KEY);clearDraft();}};
})();
