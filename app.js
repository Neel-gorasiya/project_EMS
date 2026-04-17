/* =============================================
   EMS PRO — APPLICATION LOGIC
   Vanilla JS · localStorage persistence
============================================= */

/* ── SEED DATA ─────────────────────────────── */
const SEED_DEPARTMENTS = [
  { id: 'd1', name: 'Engineering',  color: '#2980b9', head: 'e1' },
  { id: 'd2', name: 'Marketing',    color: '#8e44ad', head: 'e3' },
  { id: 'd3', name: 'HR',           color: '#27ae60', head: 'e5' },
  { id: 'd4', name: 'Design',       color: '#e67e22', head: 'e2' },
  { id: 'd5', name: 'Finance',      color: '#c0392b', head: 'e6' },
];

const SEED_EMPLOYEES = [
  { id:'e1', name:'Neel',          email:'neel@ems.io',     phone:'+91 98765-43210', dept:'d1', role:'Admin',    position:'CEO',               hireDate:'2019-03-15', status:'Active',   supervisor:'',  salary:120000, createdAt: new Date().toISOString() },
  { id:'e2', name:'Sarah Jenkins',  email:'sarah@ems.io',    phone:'+1 555-0102', dept:'d4', role:'Manager',  position:'Design Lead',       hireDate:'2020-07-01', status:'Active',   supervisor:'e1',salary:95000,  createdAt: new Date().toISOString() },
  { id:'e3', name:'Alex Morgan',    email:'alex@ems.io',     phone:'+1 555-0103', dept:'d2', role:'Manager',  position:'Marketing Manager', hireDate:'2021-01-20', status:'Active',   supervisor:'e1',salary:88000,  createdAt: new Date().toISOString() },
  { id:'e4', name:'David Kim',      email:'david@ems.io',    phone:'+1 555-0104', dept:'d1', role:'Employee', position:'Senior Developer',  hireDate:'2022-04-10', status:'Active',   supervisor:'e1',salary:75000,  createdAt: new Date().toISOString() },
  { id:'e5', name:'Priya Sharma',   email:'priya@ems.io',    phone:'+1 555-0105', dept:'d3', role:'Manager',  position:'HR Manager',        hireDate:'2020-11-05', status:'Active',   supervisor:'e1',salary:82000,  createdAt: new Date().toISOString() },
  { id:'e6', name:'James Carter',   email:'james@ems.io',    phone:'+1 555-0106', dept:'d5', role:'Employee', position:'Financial Analyst', hireDate:'2021-09-12', status:'On Leave', supervisor:'e1',salary:70000,  createdAt: new Date().toISOString() },
  { id:'e7', name:'Olivia Nguyen',  email:'olivia@ems.io',   phone:'+1 555-0107', dept:'d2', role:'Employee', position:'Content Strategist',hireDate:'2023-02-28', status:'Active',   supervisor:'e3',salary:62000,  createdAt: new Date().toISOString() },
  { id:'e8', name:'Ethan Brooks',   email:'ethan@ems.io',    phone:'+1 555-0108', dept:'d4', role:'Employee', position:'UI Designer',       hireDate:'2022-08-15', status:'Inactive', supervisor:'e2',salary:65000,  createdAt: new Date().toISOString() },
];

const SEED_TASKS = [
  { id:'t1', title:'Q2 Performance Report',    desc:'Compile Q2 performance metrics',          assigneeId:'e1', dueDate:'2026-04-25', priority:'High',   status:'In Progress', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id:'t2', title:'Website Redesign',          desc:'Redesign company marketing site',          assigneeId:'e2', dueDate:'2026-05-10', priority:'High',   status:'Pending',     createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id:'t3', title:'Onboarding Documents',      desc:'Prepare new hire onboarding docs',         assigneeId:'e5', dueDate:'2026-04-20', priority:'Medium', status:'Completed',   createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id:'t4', title:'Social Media Campaign',     desc:'Plan Q3 social media campaign',            assigneeId:'e7', dueDate:'2026-05-01', priority:'Medium', status:'Pending',     createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id:'t5', title:'Budget Forecast',           desc:'Prepare annual budget forecast',           assigneeId:'e6', dueDate:'2026-04-30', priority:'High',   status:'Pending',     createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id:'t6', title:'UI Component Library',      desc:'Build reusable UI component system',       assigneeId:'e8', dueDate:'2026-05-20', priority:'Low',    status:'In Progress', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id:'t7', title:'Code Review – Auth Module', desc:'Review authentication module code',        assigneeId:'e4', dueDate:'2026-04-18', priority:'High',   status:'Pending',     createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id:'t8', title:'Employee Satisfaction Survey', desc:'Send and collect survey results',       assigneeId:'e5', dueDate:'2026-04-22', priority:'Low',    status:'Completed',   createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

const SEED_LEAVES = [
  { id:'l1', employeeId:'e6', type:'Sick',     from:'2026-04-15', to:'2026-04-19', days:5, reason:'Medical procedure', status:'Approved',  createdAt: new Date().toISOString() },
  { id:'l2', employeeId:'e7', type:'Annual',   from:'2026-05-01', to:'2026-05-05', days:5, reason:'Family vacation',   status:'Pending',   createdAt: new Date().toISOString() },
  { id:'l3', employeeId:'e4', type:'Personal', from:'2026-04-20', to:'2026-04-20', days:1, reason:'Personal errand',   status:'Pending',   createdAt: new Date().toISOString() },
  { id:'l4', employeeId:'e3', type:'Annual',   from:'2026-03-10', to:'2026-03-14', days:5, reason:'Holiday',           status:'Rejected',  createdAt: new Date().toISOString() },
];

const SEED_SHIFTS = [
  { id:'s1', employeeId:'e1', date:'2026-04-17', clockIn:'09:00', clockOut:'', location:'Downtown HQ',   status:'Active' },
  { id:'s2', employeeId:'e2', date:'2026-04-17', clockIn:'08:30', clockOut:'', location:'Remote',        status:'Active' },
  { id:'s3', employeeId:'e4', date:'2026-04-17', clockIn:'10:00', clockOut:'', location:'Downtown HQ',   status:'Active' },
  { id:'s4', employeeId:'e3', date:'2026-04-16', clockIn:'09:00', clockOut:'18:00', location:'Branch B', status:'Completed' },
  { id:'s5', employeeId:'e5', date:'2026-04-16', clockIn:'08:00', clockOut:'17:30', location:'HQ',        status:'Completed' },
];

/* ── STATE ──────────────────────────────────── */
let state = { departments:[], employees:[], tasks:[], leaves:[], shifts:[] };
let deleteCallback = null;
let clockedIn = false;
let clockInterval = null;
let clockSeconds = 0;

/* ── STORAGE ────────────────────────────────── */
function loadState() {
  try {
    const saved = localStorage.getItem('ems_pro_v2');
    if (saved) {
      state = JSON.parse(saved);
    } else {
      state = { departments: SEED_DEPARTMENTS, employees: SEED_EMPLOYEES, tasks: SEED_TASKS, leaves: SEED_LEAVES, shifts: SEED_SHIFTS };
      saveState();
    }
  } catch(e) {
    state = { departments: SEED_DEPARTMENTS, employees: SEED_EMPLOYEES, tasks: SEED_TASKS, leaves: SEED_LEAVES, shifts: SEED_SHIFTS };
  }
}

function saveState() {
  localStorage.setItem('ems_pro_v2', JSON.stringify(state));
}

/* ── UTILITIES ──────────────────────────────── */
const uid = () => '_' + Math.random().toString(36).slice(2, 9);

function getEmployee(id) { return state.employees.find(e => e.id === id); }
function getDept(id) { return state.departments.find(d => d.id === id); }

function getEmpName(id) {
  const e = getEmployee(id);
  return e ? e.name : '—';
}

function getDeptName(id) {
  const d = getDept(id);
  return d ? d.name : '—';
}

function avatarColor(name) {
  const colors = ['#2980b9','#8e44ad','#27ae60','#e67e22','#c0392b','#16a085','#d35400','#2c3e50'];
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return colors[Math.abs(h) % colors.length];
}

function initials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
}

function fmtDate(d) {
  if (!d) return '—';
  const dt = new Date(d);
  return isNaN(dt) ? d : dt.toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' });
}

function statusBadge(status) {
  const map = {
    'Active':      'badge--active',
    'Inactive':    'badge--inactive',
    'On Leave':    'badge--onleave',
    'Pending':     'badge--pending',
    'In Progress': 'badge--inprogress',
    'Completed':   'badge--completed',
    'Approved':    'badge--approved',
    'Rejected':    'badge--rejected',
  };
  return `<span class="badge ${map[status]||'badge--inactive'}">${status}</span>`;
}

function priorityBadge(p) {
  return `<span class="priority-badge ${p.toLowerCase()}">${p}</span>`;
}

function actionBtns(type, id) {
  const profileBtn = type === 'employee' ? `<button class="action-btn action-btn-profile" title="View Profile" onclick="openProfilePanel('${id}')">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    </button>` : '';
  return `<div class="action-btns">
    ${profileBtn}
    <button class="action-btn action-btn-edit" title="Edit" onclick="openEdit('${type}','${id}')">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
    </button>
    <button class="action-btn action-btn-delete" title="Delete" onclick="confirmDelete('${type}','${id}')">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
    </button>
  </div>`;
}

function empCell(emp) {
  const color = avatarColor(emp.name);
  return `<div class="emp-cell">
    <div class="emp-avatar" style="background:${color}">${initials(emp.name)}</div>
    <div><div class="emp-name">${emp.name}</div><div class="emp-email">${emp.email}</div></div>
  </div>`;
}

/* ── TOAST ──────────────────────────────────── */
function showToast(title, msg='', type='success') {
  const icons = {
    success: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`,
    error:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    info:    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  };
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<div class="toast-icon">${icons[type]||icons.info}</div>
    <div class="toast-content"><div class="toast-title">${title}</div>${msg ? `<div class="toast-msg">${msg}</div>` : ''}</div>`;
  document.getElementById('toastContainer').appendChild(t);
  setTimeout(() => { t.classList.add('removing'); setTimeout(() => t.remove(), 300); }, 3200);
}

/* ── NAVIGATION ─────────────────────────────── */
function navigateTo(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const pg = document.getElementById(`page-${page}`);
  if (pg) pg.classList.add('active');
  const nav = document.getElementById(`nav-${page}`);
  if (nav) nav.classList.add('active');
  const titles = { dashboard:'Dashboard', directory:'Employee Directory', tasks:'Tasks', leave:'Leave Requests', shifts:'Shifts', departments:'Departments', reports:'Reports' };
  document.getElementById('currentPageTitle').textContent = titles[page] || page;
  // Render page
  const renderers = { directory: renderDirectory, tasks: renderTasks, leave: renderLeave, shifts: renderShifts, departments: renderDepartments, reports: renderReports, dashboard: renderDashboard };
  if (renderers[page]) renderers[page]();
  // Close mobile sidebar
  document.getElementById('sidebar').classList.remove('mobile-open');
}

/* ── MODALS ─────────────────────────────────── */
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

/* ── CLOCK ──────────────────────────────────── */
function startClock() {
  clockInterval = setInterval(() => {
    clockSeconds++;
    const h = String(Math.floor(clockSeconds/3600)).padStart(2,'0');
    const m = String(Math.floor((clockSeconds%3600)/60)).padStart(2,'0');
    const s = String(clockSeconds%60).padStart(2,'0');
    document.getElementById('timerDisplay').textContent = `${h}:${m}:${s}`;
  }, 1000);
}

function stopClock() { clearInterval(clockInterval); clockInterval = null; }

/* ── DASHBOARD ──────────────────────────────── */
function renderDashboard() {
  // Stats
  document.getElementById('statTotalEmployees').textContent = state.employees.length;
  document.getElementById('statActiveShifts').textContent = state.shifts.filter(s=>s.status==='Active').length;
  document.getElementById('statPendingTasks').textContent = state.tasks.filter(t=>t.status!=='Completed').length;
  document.getElementById('statLeaveRequests').textContent = state.leaves.filter(l=>l.status==='Pending').length;

  // Employee preview table (first 5)
  const tbody = document.getElementById('dashboardEmployeeTbody');
  const slice = state.employees.slice(0,5);
  tbody.innerHTML = slice.map(emp => {
    const empTasks = state.tasks.filter(t=>t.assigneeId===emp.id && t.status!=='Completed').length;
    return `<tr>
      <td>${empCell(emp)}</td>
      <td>${getDeptName(emp.dept)}</td>
      <td>${emp.position||emp.role}</td>
      <td>${statusBadge(emp.status)}</td>
      <td><span class="badge ${empTasks>0?'badge--pending':'badge--completed'}">${empTasks} pending</span></td>
    </tr>`;
  }).join('') || `<tr><td colspan="5"><div class="empty-state"><p>No employees found</p></div></td></tr>`;
}

/* ── DIRECTORY ──────────────────────────────── */
function renderDirectory() {
  populateDeptFilter();
  filterDirectory();
}

function filterDirectory() {
  const q    = (document.getElementById('empSearch')?.value||'').toLowerCase();
  const dept = document.getElementById('deptFilter')?.value||'';
  const stat = document.getElementById('statusFilter')?.value||'';
  const role = document.getElementById('roleFilter')?.value||'';

  let list = state.employees.filter(e => {
    return (!q || e.name.toLowerCase().includes(q) || e.email.toLowerCase().includes(q)) &&
           (!dept || e.dept === dept) &&
           (!stat || e.status === stat) &&
           (!role || e.role === role);
  });

  document.getElementById('directoryCount').textContent = `Showing ${list.length} employee${list.length!==1?'s':''}`;

  document.getElementById('directoryTbody').innerHTML = list.map(emp => `<tr>
    <td>${empCell(emp)}</td>
    <td><span style="display:inline-flex;align-items:center;gap:6px"><span style="width:8px;height:8px;border-radius:50%;background:${getDept(emp.dept)?.color||'#ccc'};display:inline-block"></span>${getDeptName(emp.dept)}</span></td>
    <td>${emp.role}</td>
    <td>${fmtDate(emp.hireDate)}</td>
    <td>${statusBadge(emp.status)}</td>
    <td>${actionBtns('employee', emp.id)}</td>
  </tr>`).join('') || `<tr><td colspan="6"><div class="empty-state"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20a8 8 0 0 1 16 0"/></svg><p>No employees found</p></div></td></tr>`;
}

/* ── TASKS ──────────────────────────────────── */
function renderTasks() {
  populateAssigneeFilter();
  filterTasks();
}

function filterTasks() {
  const q    = (document.getElementById('taskSearch')?.value||'').toLowerCase();
  const stat = document.getElementById('taskStatusFilter')?.value||'';
  const pri  = document.getElementById('taskPriorityFilter')?.value||'';
  const ass  = document.getElementById('taskAssigneeFilter')?.value||'';

  let list = state.tasks.filter(t => {
    return (!q  || t.title.toLowerCase().includes(q)) &&
           (!stat|| t.status === stat) &&
           (!pri || t.priority === pri) &&
           (!ass || t.assigneeId === ass);
  });

  // LIST VIEW
  document.getElementById('tasksTbody').innerHTML = list.map(t => `<tr>
    <td><div style="font-weight:600">${t.title}</div><div style="font-size:.72rem;color:var(--text-muted)">${t.desc||''}</div></td>
    <td>${empCell(getEmployee(t.assigneeId)||{name:'Unassigned',email:''})}</td>
    <td>${fmtDate(t.dueDate)}</td>
    <td>${priorityBadge(t.priority)}</td>
    <td>${statusBadge(t.status)}</td>
    <td>${actionBtns('task', t.id)}</td>
  </tr>`).join('') || `<tr><td colspan="6"><div class="empty-state"><p>No tasks found</p></div></td></tr>`;

  // KANBAN VIEW
  ['Pending','In Progress','Completed'].forEach(col => {
    const el = document.getElementById(`kanban-${col}`);
    if (!el) return;
    const cards = list.filter(t=>t.status===col);
    el.innerHTML = cards.map(t => {
      const emp = getEmployee(t.assigneeId);
      return `<div class="kanban-card">
        <div class="kanban-card-title">${t.title}</div>
        <div class="kanban-card-meta">
          ${priorityBadge(t.priority)}
          <span>${emp?emp.name:'?'}</span>
          <span>${fmtDate(t.dueDate)}</span>
        </div>
      </div>`;
    }).join('') || '<div style="font-size:.78rem;color:var(--text-muted);text-align:center;padding:20px 0">No tasks</div>';
  });
  document.getElementById('pendingCount').textContent    = state.tasks.filter(t=>t.status==='Pending').length;
  document.getElementById('inProgressCount').textContent = state.tasks.filter(t=>t.status==='In Progress').length;
  document.getElementById('completedCount').textContent  = state.tasks.filter(t=>t.status==='Completed').length;
  // Update nav badge
  document.getElementById('taskBadge').textContent = state.tasks.filter(t=>t.status==='Pending').length;
}

/* ── LEAVE ──────────────────────────────────── */
function renderLeave() {
  document.getElementById('statPendingLeave').textContent  = state.leaves.filter(l=>l.status==='Pending').length;
  document.getElementById('statApprovedLeave').textContent = state.leaves.filter(l=>l.status==='Approved').length;
  document.getElementById('statRejectedLeave').textContent = state.leaves.filter(l=>l.status==='Rejected').length;

  document.getElementById('leaveTbody').innerHTML = state.leaves.map(l => {
    const emp = getEmployee(l.employeeId);
    return `<tr>
      <td>${emp ? empCell(emp) : '—'}</td>
      <td>${l.type}</td>
      <td>${fmtDate(l.from)}</td>
      <td>${fmtDate(l.to)}</td>
      <td>${l.days}</td>
      <td style="max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${l.reason||'—'}</td>
      <td>${statusBadge(l.status)}</td>
      <td>
        ${l.status==='Pending'?`
          <div class="action-btns">
            <button class="action-btn action-btn-edit" title="Approve" onclick="approveLeave('${l.id}')">✓</button>
            <button class="action-btn action-btn-delete" title="Reject" onclick="rejectLeave('${l.id}')">✗</button>
          </div>` : actionBtns('leave', l.id)}
      </td>
    </tr>`;
  }).join('') || `<tr><td colspan="8"><div class="empty-state"><p>No leave requests</p></div></td></tr>`;
}

function approveLeave(id) {
  const l = state.leaves.find(x=>x.id===id);
  if(l){ l.status='Approved'; saveState(); renderLeave(); showToast('Leave Approved','Leave request approved successfully.'); }
}
function rejectLeave(id) {
  const l = state.leaves.find(x=>x.id===id);
  if(l){ l.status='Rejected'; saveState(); renderLeave(); showToast('Leave Rejected','Leave request rejected.','info'); }
}

/* ── SHIFTS ─────────────────────────────────── */
function renderShifts() {
  document.getElementById('shiftsTbody').innerHTML = state.shifts.map(s => {
    const emp = getEmployee(s.employeeId);
    const hrs = s.clockOut ? calcHours(s.clockIn, s.clockOut) : '—';
    return `<tr>
      <td>${emp ? empCell(emp) : '—'}</td>
      <td>${fmtDate(s.date)}</td>
      <td>${s.clockIn||'—'}</td>
      <td>${s.clockOut||'<span class="badge badge--active">Active</span>'}</td>
      <td>${hrs}</td>
      <td>${s.location||'—'}</td>
      <td>${statusBadge(s.status)}</td>
    </tr>`;
  }).join('') || `<tr><td colspan="7"><div class="empty-state"><p>No shifts recorded</p></div></td></tr>`;
}

function calcHours(tin, tout) {
  if (!tin||!tout) return '—';
  const [h1,m1]=tin.split(':').map(Number);
  const [h2,m2]=tout.split(':').map(Number);
  const diff=(h2*60+m2)-(h1*60+m1);
  if(diff<=0) return '—';
  return `${Math.floor(diff/60)}h ${diff%60}m`;
}

/* ── DEPARTMENTS ────────────────────────────── */
function renderDepartments() {
  const grid = document.getElementById('deptGrid');
  grid.innerHTML = state.departments.map(d => {
    const count = state.employees.filter(e=>e.dept===d.id).length;
    const head  = getEmployee(d.head);
    return `<div class="dept-card" style="--dept-color:${d.color}">
      <div class="dept-card-header">
        <div>
          <div class="dept-name">${d.name}</div>
          <div class="dept-count">${count} employee${count!==1?'s':''}</div>
        </div>
        ${actionBtns('dept', d.id)}
      </div>
      <div class="dept-head">Head: ${head?head.name:'Unassigned'}</div>
    </div>`;
  }).join('') || '<p style="color:var(--text-muted)">No departments added.</p>';
}

/* ── REPORTS ────────────────────────────────── */
function renderReports() {
  renderDeptChart();
  renderTaskChart();
}

function renderDeptChart() {
  const el = document.getElementById('deptChart');
  const max = Math.max(...state.departments.map(d=>state.employees.filter(e=>e.dept===d.id).length), 1);
  el.innerHTML = `<div class="bar-chart">` +
    state.departments.map(d => {
      const c = state.employees.filter(e=>e.dept===d.id).length;
      return `<div class="bar-item">
        <div class="bar-value">${c}</div>
        <div class="bar" style="height:${Math.max(c/max*140,8)}px;background:${d.color}"></div>
        <div class="bar-label">${d.name}</div>
      </div>`;
    }).join('') + `</div>`;
}

function renderTaskChart() {
  const el = document.getElementById('taskChart');
  const pending  = state.tasks.filter(t=>t.status==='Pending').length;
  const inprog   = state.tasks.filter(t=>t.status==='In Progress').length;
  const done     = state.tasks.filter(t=>t.status==='Completed').length;
  const total    = state.tasks.length||1;

  const slices = [
    { label:'Pending',     val: pending, color:'#e67e22' },
    { label:'In Progress', val: inprog,  color:'#2980b9' },
    { label:'Completed',   val: done,    color:'#27ae60' },
  ];

  let cum = 0;
  const paths = slices.map(s => {
    const pct = s.val/total;
    const start = cum;
    cum += pct;
    const x1 = 70 + 60*Math.cos(2*Math.PI*start - Math.PI/2);
    const y1 = 70 + 60*Math.sin(2*Math.PI*start - Math.PI/2);
    const x2 = 70 + 60*Math.cos(2*Math.PI*cum - Math.PI/2);
    const y2 = 70 + 60*Math.sin(2*Math.PI*cum - Math.PI/2);
    const large = pct > 0.5 ? 1 : 0;
    if (pct===0) return '';
    return `<path d="M70,70 L${x1.toFixed(1)},${y1.toFixed(1)} A60,60 0 ${large},1 ${x2.toFixed(1)},${y2.toFixed(1)} Z" fill="${s.color}" opacity="0.85"/>`;
  }).join('');

  el.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;gap:20px">
    <div class="donut-chart">
      <svg width="140" height="140" viewBox="0 0 140 140">
        ${paths}
        <circle cx="70" cy="70" r="35" fill="white"/>
        <text x="70" y="74" text-anchor="middle" font-size="13" font-weight="800" fill="#0f1c30">${total}</text>
      </svg>
    </div>
    <div class="donut-legend">
      ${slices.map(s=>`<div class="legend-item"><span class="legend-dot" style="background:${s.color}"></span>${s.label}<span class="legend-value">${s.val}</span></div>`).join('')}
    </div>
  </div>`;
}

/* ── POPULATE SELECTS ───────────────────────── */
function populateDeptFilter() {
  const sel = document.getElementById('deptFilter');
  if(!sel) return;
  const cur = sel.value;
  sel.innerHTML = '<option value="">All Departments</option>' +
    state.departments.map(d=>`<option value="${d.id}">${d.name}</option>`).join('');
  if(cur) sel.value = cur;
}

function populateAssigneeFilter() {
  const sel = document.getElementById('taskAssigneeFilter');
  if(!sel) return;
  sel.innerHTML = '<option value="">All Assignees</option>' +
    state.employees.map(e=>`<option value="${e.id}">${e.name}</option>`).join('');
}

function populateEmpSelects() {
  const selects = ['empSupervisor','taskAssignee','leaveEmployee','shiftEmployee','deptHead'];
  selects.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = (id==='empSupervisor'||id==='deptHead' ? '<option value="">None</option>' : '<option value="">Select employee</option>') +
      state.employees.map(e=>`<option value="${e.id}">${e.name}</option>`).join('');
  });
}

function populateDeptSelect() {
  const el = document.getElementById('empDept');
  if(!el) return;
  el.innerHTML = '<option value="">Select department</option>' +
    state.departments.map(d=>`<option value="${d.id}">${d.name}</option>`).join('');
}

function populateDeptHeadSelect() {
  const el = document.getElementById('deptHead');
  if(!el) return;
  el.innerHTML = '<option value="">None</option>' +
    state.employees.map(e=>`<option value="${e.id}">${e.name}</option>`).join('');
}

/* ── EMPLOYEE CRUD ──────────────────────────── */
function openAddEmployee() {
  document.getElementById('employeeModalTitle').textContent = 'Add Employee';
  document.getElementById('employeeForm').reset();
  document.getElementById('empId').value = '';
  populateDeptSelect();
  populateEmpSelects();
  clearFormErrors(['empName','empEmail','empDept','empRole']);
  openModal('employeeModal');
}

function openEdit(type, id) {
  if (type==='employee') {
    const emp = getEmployee(id);
    if(!emp) return;
    document.getElementById('employeeModalTitle').textContent = 'Edit Employee';
    populateDeptSelect();
    populateEmpSelects();
    document.getElementById('empId').value      = emp.id;
    document.getElementById('empName').value    = emp.name;
    document.getElementById('empEmail').value   = emp.email;
    document.getElementById('empPhone').value   = emp.phone||'';
    document.getElementById('empDept').value    = emp.dept;
    document.getElementById('empRole').value    = emp.role;
    document.getElementById('empPosition').value= emp.position||'';
    document.getElementById('empHireDate').value= emp.hireDate||'';
    document.getElementById('empStatus').value  = emp.status;
    document.getElementById('empSupervisor').value = emp.supervisor||'';
    document.getElementById('empSalary').value  = emp.salary||'';
    clearFormErrors(['empName','empEmail','empDept','empRole']);
    openModal('employeeModal');
  } else if (type==='task') {
    const t = state.tasks.find(x=>x.id===id);
    if(!t) return;
    document.getElementById('taskModalTitle').textContent = 'Edit Task';
    document.getElementById('taskId').value       = t.id;
    document.getElementById('taskTitle').value    = t.title;
    document.getElementById('taskDesc').value     = t.desc||'';
    document.getElementById('taskAssignee').value = t.assigneeId;
    document.getElementById('taskDueDate').value  = t.dueDate;
    document.getElementById('taskPriority').value = t.priority;
    document.getElementById('taskStatus').value   = t.status;
    clearFormErrors(['taskTitle','taskAssignee','taskDueDate']);
    openModal('taskModal');
  } else if (type==='leave') {
    const l = state.leaves.find(x=>x.id===id);
    if(!l) return;
    document.getElementById('leaveModalTitle').textContent = 'Edit Leave';
    document.getElementById('leaveId').value       = l.id;
    document.getElementById('leaveEmployee').value = l.employeeId;
    document.getElementById('leaveType').value     = l.type;
    document.getElementById('leaveFrom').value     = l.from;
    document.getElementById('leaveTo').value       = l.to;
    document.getElementById('leaveReason').value   = l.reason||'';
    populateEmpSelects();
    openModal('leaveModal');
  } else if (type==='dept') {
    const d = getDept(id);
    if(!d) return;
    document.getElementById('deptModalTitle').textContent = 'Edit Department';
    document.getElementById('deptId').value    = d.id;
    document.getElementById('deptName').value  = d.name;
    document.getElementById('deptColor').value = d.color;
    populateDeptHeadSelect();
    document.getElementById('deptHead').value  = d.head||'';
    openModal('deptModal');
  }
}

function saveEmployee() {
  const id     = document.getElementById('empId').value;
  const name   = document.getElementById('empName').value.trim();
  const email  = document.getElementById('empEmail').value.trim();
  const dept   = document.getElementById('empDept').value;
  const role   = document.getElementById('empRole').value;
  let valid = true;
  clearFormErrors(['empName','empEmail','empDept','empRole']);
  if (!name)  { setError('empName','Name is required'); valid=false; }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('empEmail','Valid email required'); valid=false; }
  if (!dept)  { setError('empDept','Department is required'); valid=false; }
  if (!role)  { setError('empRole','Role is required'); valid=false; }
  if (!valid) return;

  const data = {
    name, email, dept, role,
    phone:      document.getElementById('empPhone').value.trim(),
    position:   document.getElementById('empPosition').value.trim(),
    hireDate:   document.getElementById('empHireDate').value,
    status:     document.getElementById('empStatus').value,
    supervisor: document.getElementById('empSupervisor').value,
    salary:     Number(document.getElementById('empSalary').value)||0,
  };

  if (id) {
    const idx = state.employees.findIndex(e=>e.id===id);
    if (idx>-1) state.employees[idx] = { ...state.employees[idx], ...data };
    showToast('Employee Updated', `${name} has been updated.`);
  } else {
    state.employees.push({ id: uid(), ...data, createdAt: new Date().toISOString() });
    showToast('Employee Added', `${name} has been added.`);
  }
  saveState();
  closeModal('employeeModal');
  renderDashboard();
  if (document.getElementById('page-directory').classList.contains('active')) renderDirectory();
}

/* ── TASK CRUD ──────────────────────────────── */
function openAddTask() {
  document.getElementById('taskModalTitle').textContent = 'New Task';
  document.getElementById('taskForm').reset();
  document.getElementById('taskId').value = '';
  document.getElementById('taskAssignee').innerHTML = '<option value="">Select employee</option>' +
    state.employees.map(e=>`<option value="${e.id}">${e.name}</option>`).join('');
  clearFormErrors(['taskTitle','taskAssignee','taskDueDate']);
  openModal('taskModal');
}

function saveTask() {
  const id    = document.getElementById('taskId').value;
  const title = document.getElementById('taskTitle').value.trim();
  const ass   = document.getElementById('taskAssignee').value;
  const due   = document.getElementById('taskDueDate').value;
  let valid = true;
  clearFormErrors(['taskTitle','taskAssignee','taskDueDate']);
  if (!title) { setError('taskTitle','Title is required'); valid=false; }
  if (!ass)   { setError('taskAssignee','Assignee is required'); valid=false; }
  if (!due)   { setError('taskDueDate','Due date is required'); valid=false; }
  if (!valid) return;

  const data = {
    title, assigneeId: ass, dueDate: due,
    desc:     document.getElementById('taskDesc').value.trim(),
    priority: document.getElementById('taskPriority').value,
    status:   document.getElementById('taskStatus').value,
    updatedAt: new Date().toISOString(),
  };
  if (id) {
    const idx = state.tasks.findIndex(t=>t.id===id);
    if (idx>-1) state.tasks[idx] = { ...state.tasks[idx], ...data };
    showToast('Task Updated', data.title);
  } else {
    state.tasks.push({ id: uid(), ...data, createdAt: new Date().toISOString() });
    showToast('Task Created', data.title);
  }
  saveState();
  closeModal('taskModal');
  if (document.getElementById('page-tasks').classList.contains('active')) renderTasks();
  if (document.getElementById('page-dashboard').classList.contains('active')) renderDashboard();
}

/* ── LEAVE CRUD ─────────────────────────────── */
function saveLeave() {
  const id  = document.getElementById('leaveId').value;
  const emp = document.getElementById('leaveEmployee').value;
  const frm = document.getElementById('leaveFrom').value;
  const to  = document.getElementById('leaveTo').value;
  if (!emp||!frm||!to) { showToast('Validation Error','Fill required fields','error'); return; }
  const d1 = new Date(frm), d2 = new Date(to);
  const days = Math.max(1, Math.ceil((d2-d1)/(1000*60*60*24))+1);
  const data = { employeeId:emp, type:document.getElementById('leaveType').value, from:frm, to, days, reason:document.getElementById('leaveReason').value.trim(), status:'Pending' };
  if (id) {
    const idx = state.leaves.findIndex(l=>l.id===id);
    if(idx>-1) state.leaves[idx] = { ...state.leaves[idx], ...data };
    showToast('Leave Updated');
  } else {
    state.leaves.push({ id: uid(), ...data, createdAt: new Date().toISOString() });
    showToast('Leave Request Submitted');
  }
  saveState();
  closeModal('leaveModal');
  renderLeave();
}

/* ── DEPT CRUD ──────────────────────────────── */
function saveDept() {
  const id   = document.getElementById('deptId').value;
  const name = document.getElementById('deptName').value.trim();
  if (!name) { showToast('Name required','','error'); return; }
  const data = { name, color: document.getElementById('deptColor').value, head: document.getElementById('deptHead').value };
  if (id) {
    const idx = state.departments.findIndex(d=>d.id===id);
    if(idx>-1) state.departments[idx] = { ...state.departments[idx], ...data };
    showToast('Department Updated', name);
  } else {
    state.departments.push({ id: uid(), ...data });
    showToast('Department Added', name);
  }
  saveState();
  closeModal('deptModal');
  renderDepartments();
}

/* ── SHIFT CRUD ─────────────────────────────── */
function saveShift() {
  const emp  = document.getElementById('shiftEmployee').value;
  const date = document.getElementById('shiftDate').value;
  const tin  = document.getElementById('shiftIn').value;
  if (!emp||!date||!tin) { showToast('Fill required fields','','error'); return; }
  const tout = document.getElementById('shiftOut').value;
  state.shifts.unshift({ id: uid(), employeeId:emp, date, clockIn:tin, clockOut:tout, location:document.getElementById('shiftLocation').value.trim(), status: tout?'Completed':'Active' });
  saveState();
  closeModal('shiftModal');
  renderShifts();
  showToast('Shift Logged');
}

/* ── DELETE ─────────────────────────────────── */
function confirmDelete(type, id) {
  const names = { employee:'employee', task:'task', leave:'leave request', dept:'department' };
  document.getElementById('deleteMessage').textContent = `Are you sure you want to delete this ${names[type]||'record'}? This action cannot be undone.`;
  deleteCallback = () => doDelete(type, id);
  openModal('deleteModal');
}

function doDelete(type, id) {
  if (type==='employee') {
    state.employees = state.employees.filter(e=>e.id!==id);
    showToast('Employee Deleted','','info');
    saveState(); closeModal('deleteModal');
    renderDashboard();
    if (document.getElementById('page-directory').classList.contains('active')) renderDirectory();
  } else if (type==='task') {
    state.tasks = state.tasks.filter(t=>t.id!==id);
    showToast('Task Deleted','','info');
    saveState(); closeModal('deleteModal');
    if (document.getElementById('page-tasks').classList.contains('active')) renderTasks();
  } else if (type==='leave') {
    state.leaves = state.leaves.filter(l=>l.id!==id);
    showToast('Record Deleted','','info');
    saveState(); closeModal('deleteModal'); renderLeave();
  } else if (type==='dept') {
    state.departments = state.departments.filter(d=>d.id!==id);
    showToast('Department Deleted','','info');
    saveState(); closeModal('deleteModal'); renderDepartments();
  }
}

/* ── FORM HELPERS ───────────────────────────── */
function setError(fieldId, msg) {
  const el = document.getElementById(fieldId);
  const err= document.getElementById(fieldId + 'Error');
  if(el)  el.classList.add('error');
  if(err) err.textContent = msg;
}

function clearFormErrors(ids) {
  ids.forEach(id => {
    const el   = document.getElementById(id);
    const err  = document.getElementById(id+'Error');
    if(el)  el.classList.remove('error');
    if(err) err.textContent = '';
  });
}

/* ── GLOBAL SEARCH ──────────────────────────── */
function handleGlobalSearch(q) {
  q = q.toLowerCase().trim();
  if (!q) return;
  const emp = state.employees.filter(e=>e.name.toLowerCase().includes(q)||e.email.toLowerCase().includes(q));
  const tsk = state.tasks.filter(t=>t.title.toLowerCase().includes(q));
  if (emp.length) {
    navigateTo('directory');
    setTimeout(()=>{ document.getElementById('empSearch').value=q; filterDirectory(); }, 100);
  } else if (tsk.length) {
    navigateTo('tasks');
    setTimeout(()=>{ document.getElementById('taskSearch').value=q; filterTasks(); }, 100);
  } else {
    showToast('No results','No matching employees or tasks found.','info');
  }
}

/* ── INIT ───────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  renderDashboard();

  /* Greeting time */
  const h = new Date().getHours();
  const greet = h<12?'Good Morning.':h<17?'Good Afternoon.':'Good Evening.';
  document.querySelector('.page-title') && (document.querySelector('#page-dashboard .page-title').textContent = greet + ' 👋');

  /* SIDEBAR TOGGLE */
  document.getElementById('sidebarToggle').addEventListener('click', () => {
    const sb = document.getElementById('sidebar');
    const mc = document.getElementById('mainContent');
    sb.classList.toggle('collapsed');
    mc.classList.toggle('expanded');
  });

  /* MOBILE MENU */
  document.getElementById('mobileMenuBtn').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('mobile-open');
  });

  /* NAV ITEMS */
  document.querySelectorAll('.nav-item[data-page]').forEach(a => {
    a.addEventListener('click', e => { e.preventDefault(); navigateTo(a.dataset.page); });
  });

  /* "View All" button on dashboard */
  document.querySelectorAll('[data-page]').forEach(el => {
    if (el.tagName==='BUTTON') el.addEventListener('click', ()=> navigateTo(el.dataset.page));
  });

  /* ADD EMPLOYEE BUTTONS */
  document.getElementById('addEmployeeBtn').addEventListener('click', openAddEmployee);
  document.getElementById('addEmployeeBtn2').addEventListener('click', openAddEmployee);
  document.getElementById('saveEmployeeBtn').addEventListener('click', saveEmployee);

  /* ADD TASK */
  document.getElementById('addTaskBtn').addEventListener('click', openAddTask);
  document.getElementById('saveTaskBtn').addEventListener('click', saveTask);

  /* ADD LEAVE */
  document.getElementById('addLeaveBtn').addEventListener('click', () => {
    document.getElementById('leaveForm').reset();
    document.getElementById('leaveId').value = '';
    document.getElementById('leaveModalTitle').textContent = 'New Leave Request';
    populateEmpSelects();
    openModal('leaveModal');
  });
  document.getElementById('saveLeaveBtn').addEventListener('click', saveLeave);

  /* ADD DEPT */
  document.getElementById('addDeptBtn').addEventListener('click', () => {
    document.getElementById('deptForm').reset();
    document.getElementById('deptId').value = '';
    document.getElementById('deptModalTitle').textContent = 'Add Department';
    populateDeptHeadSelect();
    openModal('deptModal');
  });
  document.getElementById('saveDeptBtn').addEventListener('click', saveDept);

  /* ADD SHIFT */
  document.getElementById('addShiftBtn').addEventListener('click', () => {
    document.getElementById('shiftForm').reset();
    document.getElementById('shiftDate').value = new Date().toISOString().split('T')[0];
    populateEmpSelects();
    openModal('shiftModal');
  });
  document.getElementById('saveShiftBtn').addEventListener('click', saveShift);

  /* DELETE CONFIRM */
  document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
    if (deleteCallback) { deleteCallback(); deleteCallback=null; }
  });

  /* CLOSE MODALS */
  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => closeModal(btn.dataset.close));
  });
  document.querySelectorAll('.modal-overlay').forEach(ov => {
    ov.addEventListener('click', e => { if(e.target===ov) closeModal(ov.id); });
  });

  /* CLOCK IN/OUT */
  document.getElementById('clockBtn').addEventListener('click', () => {
    const btn = document.getElementById('clockBtn');
    const badge = document.getElementById('shiftStatusBadge');
    if (!clockedIn) {
      clockedIn = true;
      clockSeconds = 0;
      startClock();
      btn.textContent = '';
      btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg> Clock Out`;
      btn.classList.add('clocked-in');
      badge.textContent = 'ACTIVE NOW';
      badge.className = 'badge badge--active';
      showToast('Clocked In','Your shift has started.');
    } else {
      clockedIn = false;
      stopClock();
      btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg> Clock In`;
      btn.classList.remove('clocked-in');
      badge.textContent = 'INACTIVE';
      badge.className = 'badge badge--inactive';
      showToast('Clocked Out','Your shift has ended.','info');
    }
  });

  /* FILTERS */
  ['empSearch','deptFilter','statusFilter','roleFilter'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', filterDirectory);
    document.getElementById(id)?.addEventListener('change', filterDirectory);
  });
  ['taskSearch','taskStatusFilter','taskPriorityFilter','taskAssigneeFilter'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', filterTasks);
    document.getElementById(id)?.addEventListener('change', filterTasks);
  });

  /* VIEW TOGGLE */
  document.getElementById('listViewBtn').addEventListener('click', () => {
    document.getElementById('taskListView').classList.remove('hidden');
    document.getElementById('taskKanbanView').classList.add('hidden');
    document.getElementById('listViewBtn').classList.add('active');
    document.getElementById('kanbanViewBtn').classList.remove('active');
  });
  document.getElementById('kanbanViewBtn').addEventListener('click', () => {
    document.getElementById('taskKanbanView').classList.remove('hidden');
    document.getElementById('taskListView').classList.add('hidden');
    document.getElementById('kanbanViewBtn').classList.add('active');
    document.getElementById('listViewBtn').classList.remove('active');
    filterTasks();
  });


  /* GLOBAL SEARCH — live dropdown */
  const searchInput = document.getElementById('globalSearch');
  const searchDrop  = document.getElementById('searchDropdown');

  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    if (!q) { searchDrop.classList.remove('open'); return; }

    const emps = state.employees.filter(e =>
      e.name.toLowerCase().includes(q) || e.email.toLowerCase().includes(q) || (e.position||'').toLowerCase().includes(q)
    ).slice(0, 4);

    const tasks = state.tasks.filter(t => t.title.toLowerCase().includes(q)).slice(0, 3);

    if (!emps.length && !tasks.length) {
      searchDrop.innerHTML = `<div class="search-no-results">No results for "${searchInput.value}"</div>`;
      searchDrop.classList.add('open');
      return;
    }

    let html = '';
    if (emps.length) {
      html += `<div class="search-dropdown-section"><div class="search-dropdown-label">Employees</div>`;
      html += emps.map(e => {
        const color = avatarColor(e.name);
        return `<div class="search-result-item" onclick="openProfilePanel('${e.id}');document.getElementById('globalSearch').value='';document.getElementById('searchDropdown').classList.remove('open')">
          <div class="emp-avatar" style="background:${color};width:28px;height:28px;font-size:.7rem">${initials(e.name)}</div>
          <div><div class="search-result-name">${e.name}</div><div class="search-result-sub">${e.position||e.role} · ${getDeptName(e.dept)}</div></div>
        </div>`;
      }).join('');
      html += '</div>';
    }
    if (tasks.length) {
      html += `<div class="search-dropdown-section"><div class="search-dropdown-label">Tasks</div>`;
      html += tasks.map(t => `<div class="search-result-item" onclick="navigateTo('tasks');document.getElementById('globalSearch').value='';document.getElementById('searchDropdown').classList.remove('open');setTimeout(()=>{document.getElementById('taskSearch').value='${t.title.replace(/'/g,"\\'")}';filterTasks();},100)">
        <div><div class="search-result-name">${t.title}</div><div class="search-result-sub">${t.status} · Due ${fmtDate(t.dueDate)}</div></div>
      </div>`).join('');
      html += '</div>';
    }
    searchDrop.innerHTML = html;
    searchDrop.classList.add('open');
  });

  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const q = searchInput.value.trim();
      if (q) handleGlobalSearch(q);
      searchDrop.classList.remove('open');
    }
    if (e.key === 'Escape') { searchDrop.classList.remove('open'); searchInput.blur(); }
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('#globalSearchWrapper')) searchDrop.classList.remove('open');
  });

  /* EXPORT BUTTON */
  document.getElementById('exportBtn')?.addEventListener('click', () => {
    const headers = ['ID','Name','Email','Phone','Department','Role','Position','Hire Date','Status','Salary'];
    const rows = state.employees.map(e => [e.id,e.name,e.email,e.phone||'',getDeptName(e.dept),e.role,e.position||'',e.hireDate||'',e.status,e.salary||'']);
    const csv = [headers, ...rows].map(r=>r.map(c=>`"${c}"`).join(',')).join('\n');
    const a = document.createElement('a');
    a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    a.download = 'employees.csv';
    a.click();
    showToast('Export Complete','employees.csv downloaded');
  });

  /* ESC to close modals */
  document.addEventListener('keydown', e => {
    if (e.key==='Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(m=>m.classList.remove('open'));
      closeProfilePanel();
      document.getElementById('notifPanel').classList.remove('open');
    }
  });

  /* ── DARK MODE ──────────────────────────────── */
  const darkToggle = document.getElementById('darkToggle');
  const isDark = localStorage.getItem('ems_dark') === '1';
  if (isDark) document.body.classList.add('dark');

  darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('ems_dark', document.body.classList.contains('dark') ? '1' : '0');
  });

  /* ── NOTIFICATION PANEL ─────────────────────── */
  const notifBtn   = document.getElementById('notificationBtn');
  const notifPanel = document.getElementById('notifPanel');
  const notifDot   = document.getElementById('notifDot');

  const NOTIFS = [
    { text: 'Alex M. submitted a leave request', time: '5 min ago', color: '#e67e22', unread: true },
    { text: 'Task "Code Review – Auth" is overdue', time: '1 hr ago', color: '#e74c3c', unread: true },
    { text: 'David K. clocked in', time: '2 hrs ago', color: '#2980b9', unread: false },
    { text: 'New employee Ethan Brooks added', time: '3 hrs ago', color: '#27ae60', unread: false },
    { text: 'Q2 Performance Report updated to In Progress', time: 'Yesterday', color: '#8e44ad', unread: false },
  ];

  function renderNotifPanel() {
    const list = document.getElementById('notifList');
    list.innerHTML = NOTIFS.map(n => `
      <div class="notif-item ${n.unread?'unread':''}">
        <span class="notif-dot-sm" style="background:${n.color}"></span>
        <div class="notif-item-content">
          <div class="notif-item-text">${n.text}</div>
          <div class="notif-item-time">${n.time}</div>
        </div>
      </div>`).join('') || '<div class="notif-empty">No notifications</div>';
  }

  renderNotifPanel();
  const unreadCount = NOTIFS.filter(n=>n.unread).length;
  if (!unreadCount) notifDot.style.display = 'none';

  notifBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    notifPanel.classList.toggle('open');
    // Mark all read after opening
    notifDot.style.display = 'none';
    NOTIFS.forEach(n => n.unread = false);
    renderNotifPanel();
  });

  document.getElementById('clearNotifs').addEventListener('click', () => {
    NOTIFS.length = 0;
    renderNotifPanel();
    notifPanel.classList.remove('open');
    showToast('Cleared','All notifications cleared.','info');
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.notif-wrapper')) notifPanel.classList.remove('open');
  });

  /* ── PROFILE PANEL ──────────────────────────── */
  document.getElementById('closeProfilePanel').addEventListener('click', closeProfilePanel);
  document.getElementById('profilePanelOverlay').addEventListener('click', closeProfilePanel);
  document.getElementById('profileEditBtn').addEventListener('click', () => {
    const id = document.getElementById('profilePanel').dataset.empId;
    if (id) { closeProfilePanel(); openEdit('employee', id); }
  });
});

/* ── PROFILE PANEL FUNCTIONS ────────────────── */
function openProfilePanel(empId) {
  const emp = state.employees.find(e => e.id === empId);
  if (!emp) return;

  const panel = document.getElementById('profilePanel');
  panel.dataset.empId = empId;

  // Avatar & hero
  const color = avatarColor(emp.name);
  const av = document.getElementById('profileAvatarLg');
  av.textContent = initials(emp.name);
  av.style.background = color;

  document.getElementById('profileName').textContent     = emp.name;
  document.getElementById('profilePosition').textContent = [emp.position, getDeptName(emp.dept)].filter(Boolean).join(' · ');
  document.getElementById('profileStatusBadge').innerHTML = statusBadge(emp.status);

  // Info
  document.getElementById('profileEmail').textContent    = emp.email || '—';
  document.getElementById('profilePhone').textContent    = emp.phone || '—';
  document.getElementById('profileHireDate').textContent = fmtDate(emp.hireDate);
  document.getElementById('profileRole').textContent     = emp.role;
  document.getElementById('profileSupervisor').textContent = emp.supervisor ? getEmpName(emp.supervisor) : 'None';
  document.getElementById('profileSalary').textContent   = emp.salary ? '$' + Number(emp.salary).toLocaleString() : '—';

  // Tasks
  const empTasks = state.tasks.filter(t => t.assigneeId === empId);
  const done  = empTasks.filter(t => t.status === 'Completed').length;
  const pct   = empTasks.length ? Math.round(done/empTasks.length*100) : 0;

  document.getElementById('profileTaskStats').innerHTML = `
    <div class="profile-stat-chip"><div class="profile-stat-chip-value">${empTasks.length}</div><div class="profile-stat-chip-label">Total</div></div>
    <div class="profile-stat-chip"><div class="profile-stat-chip-value">${done}</div><div class="profile-stat-chip-label">Done</div></div>
    <div class="profile-stat-chip"><div class="profile-stat-chip-value">${pct}%</div><div class="profile-stat-chip-label">Complete</div></div>
  `;

  document.getElementById('profileTaskList').innerHTML = empTasks.slice(0,5).map(t => `
    <div class="profile-task-item">
      <div class="profile-item-main">${t.title}<div class="profile-item-sub">${t.dueDate ? 'Due ' + fmtDate(t.dueDate) : ''}</div></div>
      ${priorityBadge(t.priority)}
      ${statusBadge(t.status)}
    </div>`).join('') || '<div class="profile-empty">No tasks assigned</div>';

  // Leave
  const empLeaves = state.leaves.filter(l => l.employeeId === empId);
  document.getElementById('profileLeaveList').innerHTML = empLeaves.slice(0,4).map(l => `
    <div class="profile-leave-item">
      <div class="profile-item-main">${l.type} Leave<div class="profile-item-sub">${fmtDate(l.from)} → ${fmtDate(l.to)} (${l.days}d)</div></div>
      ${statusBadge(l.status)}
    </div>`).join('') || '<div class="profile-empty">No leave history</div>';

  // Shifts
  const empShifts = state.shifts.filter(s => s.employeeId === empId);
  document.getElementById('profileShiftList').innerHTML = empShifts.slice(0,4).map(s => `
    <div class="profile-shift-item">
      <div class="profile-item-main">${fmtDate(s.date)}<div class="profile-item-sub">${s.clockIn||'—'} → ${s.clockOut||'Active'} · ${s.location||'—'}</div></div>
      ${statusBadge(s.status)}
    </div>`).join('') || '<div class="profile-empty">No shifts recorded</div>';

  // Open
  document.getElementById('profilePanelOverlay').classList.add('open');
  panel.classList.add('open');
}

function closeProfilePanel() {
  document.getElementById('profilePanelOverlay').classList.remove('open');
  document.getElementById('profilePanel').classList.remove('open');
}

