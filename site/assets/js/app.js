
(()=>{
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
