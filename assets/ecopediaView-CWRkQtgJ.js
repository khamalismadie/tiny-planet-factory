import{s as O,h as ea,w as ia,d as sa,e as ta,r as na}from"./index-DJTYXXt9.js";import"./pixi-core-DXQFmL6O.js";import"./planet-configs-Ck2M5Dpi.js";import"./pixi-3d-txJ64NjT.js";function k(e,i,d,o,n){return{id:e,label:i,detail:d,achieved:o>=n,value:o,target:n}}function oa(e){const i=e.environment,d=e.objects.length,o=e.fauna?.discovered.length??0,n=Object.values(e.events??{}).filter(c=>c.status==="complete").length;return[k("first-object","Langkah Pertama","Letakkan objek pertama di permukaan planet.",d,1),k("green-corner","Sudut Hijau","Capai vegetasi 20 untuk memulihkan tutupan hijau.",e.ecosystem.vegetation,20),k("water-keeper","Penjaga Air","Jaga ketersediaan air minimal 45.",i.water,45),k("clean-air","Udara Bersih","Capai oksigen minimal 45.",i.oxygen,45),k("species-spotter","Pengamat Spesies","Temukan 3 spesies fauna.",o,3),k("web-of-life","Jaring Kehidupan","Capai biodiversitas minimal 40.",i.biodiversity,40),k("steady-ground","Tapak Kokoh","Jaga stabilitas minimal 60.",i.stability,60),k("small-architect","Arsitek Kecil","Bangun 25 objek di planet ini.",d,25),k("new-stage","Fase Baru","Majukan planet ke tahap 2.",e.stage,2),k("mission-done","Misi Selesai","Selesaikan misi aktif saat ini.",e.mission.status==="complete"?1:0,1),k("event-experienced","Pengalaman Alam","Selesaikan satu event opsional.",n,1)]}const da=e=>Math.max(0,Math.min(100,e));function ca(e){const i=e.environment,d=e.ecosystem,n=[{id:"health",label:"Kesehatan ekosistem",value:d.health,weight:25},{id:"water",label:"Air",value:i.water,weight:15},{id:"oxygen",label:"Oksigen",value:i.oxygen,weight:15},{id:"fertility",label:"Kesuburan",value:i.fertility,weight:15},{id:"biodiversity",label:"Biodiversitas",value:i.biodiversity,weight:15},{id:"stability",label:"Stabilitas",value:i.stability,weight:10},{id:"vegetation",label:"Vegetasi",value:d.vegetation,weight:5}].map(v=>{const r=da(v.value);return{id:v.id,label:v.label,value:r,weight:v.weight,contribution:r*v.weight/100}}),c=Math.round(n.reduce((v,r)=>v+r.contribution,0)),u=c<35?"Kritis":c<55?"Pemulihan":c<75?"Stabil":"Sejahtera",l=c<55?"warn":"ok",y=c<35?"Indikator utama masih lemah. Fokus pada air, vegetasi, dan stabilitas sebelum ekspansi.":c<55?"Pemulihan berjalan. Lanjutkan aksi restorasi yang menaikkan indikator terbobot terendah.":c<75?"Kondisi stabil. Pertahankan keseimbangan dan pantau cuaca ekstrem.":"Ekosistem sejahtera. Jaga variasi habitat dan hindari perubahan ekstrem.",x=["water","oxygen","fertility","biodiversity","stability"],h=x.reduce((v,r)=>v+(e.environment[r]-(e.startingEnvironment?.[r]??e.environment[r])),0)/x.length;return{score:c,label:u,tone:l,summary:y,components:n,deltaFromStart:h}}const J=e=>Math.max(0,Math.min(100,e));function R(e,i){return e.objects.reduce((d,o)=>d+(o.type===i?1:0),0)}function ra(e){const i=R(e,"flower"),d=new Set(e.progression.unlockedObjects),o=Math.round(J(i*15+e.environment.biodiversity*.25)),n=i===0?"Belum ada":i<3?"Awal":i<6?"Berkembang":"Stabil",c=i>=3?"ok":"warn",u=`Bunga ${i} · biodiversitas ${Math.round(e.environment.biodiversity)} · skor turunan ${o}/100.`,l=i===0?d.has("flower")?"Tanam beberapa bunga untuk memulai habitat penyerbuk.":"Bunga belum terbuka; fokus dulu pada vegetasi dasar.":i<3?"Tambah bunga sampai minimal 3 agar dukungan penyerbuk lebih merata.":e.environment.biodiversity<40?"Bunga sudah cukup; tingkatkan variasi tanaman untuk menguatkan biodiversitas.":"Kebun penyerbuk cukup stabil. Pertahankan variasi bunga dan jaga air.";return{id:"pollinator",label:"Kebun Penyerbuk (#34)",score:o,status:n,tone:c,detail:u,advice:l}}function la(e){const i=R(e,"tree"),d=R(e,"bush"),o=new Set(e.progression.unlockedObjects),n=Math.round(J(i*10+d*4+e.environment.stability*.2)),c=i===0?"Belum ada":i<3?"Jarang":i<8?"Bertumbuh":i<15?"Stabil":"Rapat",u=i>=3&&e.environment.stability>=45?"ok":"warn",l=`Pohon ${i} · semak ${d} · stabilitas ${Math.round(e.environment.stability)} · skor turunan ${n}/100.`,y=i===0?o.has("tree")?"Mulai tanam pohon sebagai kerangka hutan.":"Pohon belum terbuka; tanam rumput/semak dulu untuk menyiapkan tanah.":i<3?"Tambah pohon sampai minimal 3 untuk membentuk kanopi awal.":d<2&&o.has("bush")?"Tambah semak untuk mengisi lapisan bawah hutan.":e.environment.stability<45?"Kanopi mulai terbentuk; tambah vegetasi penstabil atau bukit sebelum ekspansi.":"Struktur hutan cukup seimbang. Pantau kesehatan dan biodiversitas.";return{id:"forest",label:"Pengelolaan Hutan (#3)",score:n,status:c,tone:u,detail:l,advice:y}}const I=e=>Math.max(0,Math.min(100,e));function va(e){const o=O(e).filter(t=>t.discovered||t.agents>0||t.extinct).map(t=>{const w=Math.max(1,t.capacity),B=t.estimate/w*100,K=t.limitingFactor?8:0,L=t.extinct?0:I(B*.55+t.foodFactor*100*.45-K);return{entry:t,score:L}}),n=o.length?Math.round(o.reduce((t,w)=>t+w.score,0)/o.length):0,c=o.filter(t=>t.entry.extinct||t.score<45),u=[...o].sort((t,w)=>t.score-w.score)[0]?.entry,l=!o.length||n<50||c.length>0?"warn":"ok",y=o.length?c.length>0?`${c.length} perlu perhatian`:n>=75?"Stabil":"Berkembang":"Belum ada satwa",x=u?`${u.label}: ${u.suggestion}`:"Belum ada spesies aktif. Tempatkan objek habitat dasar seperti rumput, semak, atau air untuk menarik satwa.",h=e.environment,v=e.ecosystem,r=Math.round(I(v.vegetation*.3+h.water*.2+h.biodiversity*.3+h.stability*.2)),j=r>=55?"ok":"warn",M=r<35?"Dasar":r<55?"Berkembang":r<75?"Layak":"Kuat",A=r<45?"Perkuat dukungan area: tambah vegetasi, jaga air, dan naikkan stabilitas sebelum menambah satwa.":r<70?"Area konservasi cukup. Lanjutkan variasi habitat dan pantau faktor pembatas spesies.":"Dukungan habitat kuat. Pertahankan keseimbangan air, vegetasi, biodiversitas, dan stabilitas.";return[{id:"protection",label:"Perlindungan Satwa (#6)",score:n,status:y,tone:l,detail:`${o.length} spesies relevan · ${c.length} perlu perhatian · skor turunan dari kapasitas dan pangan.`,advice:x},{id:"sanctuary",label:"Area Konservasi (#45)",score:r,status:M,tone:j,detail:`Vegetasi ${Math.round(v.vegetation)} · air ${Math.round(h.water)} · biodiversitas ${Math.round(h.biodiversity)} · stabilitas ${Math.round(h.stability)}.`,advice:`${A} Ini advisori; tidak ada zona konservasi fisik baru.`}]}function s(e){return e.replace(/[&<>"']/g,i=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[i]??i)}function ha(e,i,d,o,n){const c=ea(e),u=O(e),l=ia(e),y=u.map(a=>{const g=a.extinct?'<span class="ecopedia-pill warn">punah</span>':a.discovered?'<span class="ecopedia-pill ok">ditemukan</span>':'<span class="ecopedia-pill">belum terlihat</span>',p=a.limitingFactor?sa(a.limitingFactor):"stabil",S=Math.max(1,a.capacity),z=Math.max(0,Math.min(100,a.estimate/S*100));return`<div class="ecopedia-item">
      <div class="ecopedia-kv"><strong>${s(a.label)}</strong><span>${g}</span></div>
      <div class="ecopedia-kv"><span>Agen ${a.agents} · Pop ${Math.round(a.estimate)}/${Math.round(a.capacity)}</span><span>Pangan ${Math.round(a.foodFactor*100)}%</span></div>
      <div class="ecopedia-bar"><i style="width:${z.toFixed(0)}%"></i></div>
      <div style="font-size:11px;color:var(--muted)">Faktor pembatas: ${s(p)}</div>
      <div style="font-size:11px">${s(a.suggestion)}</div>
    </div>`}).join(""),x=c.length?c.map(a=>{const g=a.severity==="high"||a.severity==="medium"?"warn":"ok";return`<div class="ecopedia-item">
          <div class="ecopedia-kv"><strong>${s(a.label)}</strong><span class="ecopedia-pill ${g}">${a.severity}</span></div>
          <div style="font-size:11px">${s(a.suggestion)}</div>
        </div>`}).join(""):'<div class="ecopedia-item"><strong>Stabil</strong><div style="font-size:11px">Tidak ada faktor pembatas kritis yang terdeteksi. Pertahankan keseimbangan saat ini.</div></div>',h=l.tendencies.map(a=>`<div class="ecopedia-kv"><span>${s(a.label)}</span><span>${a.percent.toFixed(0)}%</span></div>`).join(""),v=d.length>1?d[0]:null,r=d.length?d[d.length-1]:null,j=a=>v&&r?r[a]-v[a]:0,M=(a,g,p,S)=>{const z=p>.05?"+":p<-.05?"":"±",P=p>.05?"var(--good)":p<-.05?"var(--warn)":"var(--muted)",H=Math.abs(p)<=.05?"stabil":`${z}${p.toFixed(1)}`;return`<div class="ecopedia-item">
      <div class="ecopedia-kv"><strong>${s(a)}</strong><span style="color:${P}">${Math.round(g)} · ${H}</span></div>
      <div style="font-size:11px">${s(S)}</div>
    </div>`},A=[M("Kesuburan tanah",e.environment.fertility,j("fertility"),e.environment.fertility<45?"Pulihkan dengan rumput, semak, pohon, atau bunga untuk menambah nutrisi.":"Kesuburan cukup baik; jaga vegetasi agar tidak turun."),M("Ketersediaan air",e.environment.water,j("water"),e.environment.water<35?"Konservasi air: tambah danau/laut dan jaga vegetasi penahan kelembapan.":"Air cukup; pantau saat cuaca panas/badai."),M("Biodiversitas",e.environment.biodiversity,j("biodiversity"),e.environment.biodiversity<35?"Tingkatkan dengan variasi tanaman dan habitat satwa.":"Biodiversitas berkembang; hindari menekan satu parameter saja."),M("Kesehatan ekosistem",e.ecosystem.health,j("health"),e.ecosystem.health<55?"Fokus pada stabilitas, oksigen, dan vegetasi untuk menaikkan kesehatan.":"Kesehatan baik; pertahankan keseimbangan.")].join(""),t=ca(e),w=t.components.map(a=>`<div class="ecopedia-kv"><span>${s(a.label)} · ${a.weight}%</span><span>${Math.round(a.value)} → +${a.contribution.toFixed(1)}</span></div>`).join(""),B=Math.abs(t.deltaFromStart)<=.05?"stabil":`${t.deltaFromStart>0?"+":""}${t.deltaFromStart.toFixed(1)}`,K=`
    <div class="ecopedia-item">
      <div class="ecopedia-kv">
        <strong>${t.score}/100 · ${s(t.label)}</strong>
        <span class="ecopedia-pill ${t.tone}">indeks</span>
      </div>
      <div class="ecopedia-bar"><i style="width:${t.score}%"></i></div>
      <div style="font-size:11px">${s(t.summary)}</div>
      <div style="font-size:11px;color:var(--muted);margin-top:6px">Rata-rata perubahan indikator lingkungan dari kondisi awal: ${B}.</div>
    </div>
    <div class="ecopedia-item">
      <strong>Komponen penilaian</strong>
      <div style="font-size:11px;color:var(--muted);margin:4px 0">Bobot lokal, dihitung dari state yang sudah ada. Tidak memengaruhi simulasi atau gate QA.</div>
      ${w}
    </div>`,E=[ra(e),la(e)].map(a=>`
    <div class="ecopedia-item">
      <div class="ecopedia-kv">
        <strong>${s(a.label)}</strong>
        <span class="ecopedia-pill ${a.tone}">${s(a.status)}</span>
      </div>
      <div class="ecopedia-bar"><i style="width:${a.score}%"></i></div>
      <div style="font-size:11px;color:var(--muted)">${s(a.detail)}</div>
      <div style="font-size:11px">${s(a.advice)}</div>
    </div>`).join(""),q=va(e).map(a=>`
    <div class="ecopedia-item">
      <div class="ecopedia-kv">
        <strong>${s(a.label)}</strong>
        <span class="ecopedia-pill ${a.tone}">${s(a.status)}</span>
      </div>
      <div class="ecopedia-bar"><i style="width:${a.score}%"></i></div>
      <div style="font-size:11px;color:var(--muted)">${s(a.detail)}</div>
      <div style="font-size:11px">${s(a.advice)}</div>
    </div>`).join(""),$=e.environment,G=new Set(e.progression.unlockedObjects),f=a=>G.has(a),m=[];$.water<35&&f("lake")&&m.push({label:"Danau",why:"Menaikkan air dan kelembapan dengan cepat."}),$.water<35&&f("ocean")&&m.push({label:"Laut",why:"Cadangan air besar untuk area kering."}),$.fertility<45&&f("grass")&&m.push({label:"Rumput",why:"Memulihkan kesuburan dan dasar vegetasi."}),$.fertility<45&&f("tree")&&m.push({label:"Pohon",why:"Meningkatkan oksigen, kesuburan, dan stabilitas jangka panjang."}),$.biodiversity<35&&f("flower")&&m.push({label:"Bunga",why:"Menaikkan biodiversitas dan mendukung penyerbuk."}),$.oxygen<30&&f("tree")&&m.push({label:"Pohon",why:"Sumber oksigen paling kuat."}),$.stability<45&&f("hill")&&m.push({label:"Bukit",why:"Membantu menstabilkan bentuk medan."}),$.temperature>35&&f("lake")&&m.push({label:"Danau",why:"Membantu mendinginkan area panas."}),m.length||m.push({label:"Pertahankan",why:"Parameter utama cukup stabil. Lanjutkan misi aktif dan pantau cuaca."});const C=new Set,Q=m.filter(a=>C.has(a.label)?!1:(C.add(a.label),!0)).slice(0,4).map(a=>`<div class="ecopedia-item"><div class="ecopedia-kv"><strong>${s(a.label)}</strong><span class="ecopedia-pill ok">aksi cepat</span></div><div style="font-size:11px">${s(a.why)}</div></div>`).join(""),D=ta(e),V=D.length?D.map(a=>`<div class="ecopedia-item">
        <div class="ecopedia-kv"><strong>${s(a.label)}</strong><span class="ecopedia-pill warn">${a.severity}</span></div>
        <div style="font-size:11px;color:var(--muted)">${s(a.signal)}</div>
        <div style="font-size:11px">${s(a.response)}</div>
      </div>`).join(""):'<div class="ecopedia-item"><div class="ecopedia-kv"><strong>Risiko rendah</strong><span class="ecopedia-pill ok">stabil</span></div><div style="font-size:11px">Tidak ada sinyal kekeringan, banjir, panas/dingin ekstrem, atau degradasi kritis saat ini.</div></div>',F=na(e),W=F.filter(a=>a.achieved).length,N=F.map(a=>`
    <div class="ecopedia-item">
      <div class="ecopedia-kv"><strong>${s(a.label)}</strong><span class="ecopedia-pill ${a.achieved?"ok":""}">${a.achieved?"tercapai":"belum"}</span></div>
      <div style="font-size:11px">${s(a.detail)}</div>
    </div>`).join(""),b=i,U=b?(()=>{const a=(g,p,S,z="")=>{const P=S-p,H=P>0?"+":"",aa=P>0?"var(--good)":P<0?"var(--warn)":"var(--muted)";return`<div class="ecopedia-kv"><span>${s(g)}</span><span>${p.toFixed(0)}${z} → ${S.toFixed(0)}${z} <span style="color:${aa}">(${H}${P.toFixed(0)})</span></span></div>`};return`<div class="ecopedia-item">
      <div style="font-size:11px;color:var(--muted);margin-bottom:6px">Snapshot tick ${b.tick} · stage ${b.stage} · Lv ${b.level}</div>
      ${a("Kesuburan",b.fertility,e.environment.fertility)}
      ${a("Air",b.water,e.environment.water)}
      ${a("Biodiversitas",b.biodiversity,e.environment.biodiversity)}
      ${a("Kesehatan",b.health,e.ecosystem.health)}
      ${a("Objek",b.objects,e.objects.length)}
      ${a("Spesies ditemukan",b.species,e.fauna?.discovered.length??0)}
    </div>`})():'<div class="ecopedia-item"><div style="font-size:11px">Belum ada snapshot. Tekan “Simpan snapshot” untuk membandingkan kondisi sebelum/sesudah aksi restorasi.</div></div>',X=o.length?o.slice(-8).reverse().map(a=>`<div class="ecopedia-item"><div class="ecopedia-kv"><span>${s(a.text)}</span><span style="color:var(--muted)">tick ${a.tick}</span></div></div>`).join(""):'<div class="ecopedia-item"><div style="font-size:11px">Belum ada catatan. Jurnal akan mencatat milestone, level, tahap, dan penemuan spesies.</div></div>',T=oa(e),Y=T.filter(a=>a.achieved).length,Z=T.map(a=>{const g=Math.min(a.value,a.target),p=Math.max(0,Math.min(100,g/a.target*100));return`<div class="ecopedia-item">
      <div class="ecopedia-kv"><strong>${s(a.label)}</strong><span class="ecopedia-pill ${a.achieved?"ok":""}">${a.achieved?"diraih":"belum"}</span></div>
      <div class="ecopedia-bar"><i style="width:${p.toFixed(0)}%"></i></div>
      <div class="ecopedia-kv"><span style="font-size:11px;color:var(--muted)">${s(a.detail)}</span><span style="font-size:11px">${Math.round(g)}/${a.target}</span></div>
    </div>`}).join(""),_=`
    <div class="ecopedia-item">
      <div class="ecopedia-kv">
        <strong>Koneksi</strong>
        <span class="ecopedia-pill ${n.online?"ok":"warn"}">${n.online?"daring":"luring"}</span>
      </div>
      <div style="font-size:11px">${n.online?"Browser terhubung. App shell dan chunk tetap tersimpan untuk pemakaian luring.":"Sedang luring. Buka planet yang sudah tersimpan; tidak ada permintaan data baru yang diperlukan untuk bermain."}</div>
    </div>
    <div class="ecopedia-item">
      <div class="ecopedia-kv">
        <strong>Service worker</strong>
        <span class="ecopedia-pill ${n.swController?"ok":"warn"}">${n.swController?"aktif":"belum aktif"}</span>
      </div>
      <div style="font-size:11px">${n.swController?"App shell dikendalikan service worker dan bisa melayani reload offline.":"Service worker belum mengendalikan halaman ini; instalasi/PWA perlu diverifikasi terpisah."}</div>
    </div>
    <div class="ecopedia-item">
      <div class="ecopedia-kv">
        <strong>Penyimpanan save</strong>
        <span class="ecopedia-pill ${n.persistentSave?"ok":"warn"}">${n.persistentSave?"lokal":"memori"}</span>
      </div>
      <div style="font-size:11px">${n.persistentSave?"Save ditulis ke IndexedDB pada perangkat ini.":"IndexedDB tidak tersedia; save hanya bertahan di memori sesi ini."}</div>
    </div>`;return`
    <section class="ecopedia-section">
      <h3>Kompendium Spesies</h3>
      <div class="ecopedia-list">${y}</div>
    </section>
    <section class="ecopedia-section">
      <h3>Faktor Pembatas &amp; Saran Habitat</h3>
      <div class="ecopedia-list">${x}</div>
    </section>
    <section class="ecopedia-section">
      <h3>Status Pemulihan</h3>
      <div style="font-size:11px;color:var(--muted);margin-bottom:8px">Delta dibanding sampel awal riwayat sesi ini (maks. ~2 menit).</div>
      <div class="ecopedia-list">${A}</div>
    </section>
    <section class="ecopedia-section">
      <h3>Indeks Kesehatan Planet</h3>
      <div class="ecopedia-list">${K}</div>
    </section>
    <section class="ecopedia-section">
      <h3>Kebun Penyerbuk &amp; Hutan</h3>
      <div style="font-size:11px;color:var(--muted);margin-bottom:8px">Advisory dari jumlah objek existing. Tidak ada mekanik pemangkasan, resource, atau objek baru.</div>
      <div class="ecopedia-list">${E}</div>
    </section>
    <section class="ecopedia-section">
      <h3>Perlindungan Satwa &amp; Konservasi</h3>
      <div style="font-size:11px;color:var(--muted);margin-bottom:8px">Advisory dari kapasitas, pangan, dan kualitas habitat. Tidak ada zona konservasi fisik atau misi baru.</div>
      <div class="ecopedia-list">${q}</div>
    </section>
    <section class="ecopedia-section">
      <h3>Aksi Restorasi Cepat</h3>
      <div class="ecopedia-list">${Q}</div>
    </section>
    <section class="ecopedia-section">
      <h3>Risiko &amp; Respons</h3>
      <div class="ecopedia-list">${V}</div>
    </section>
    <section class="ecopedia-section">
      <h3>Milestone Restorasi</h3>
      <div style="font-size:11px;color:var(--muted);margin-bottom:8px">${W}/${F.length} tercapai. Milestone bersifat lokal dan non-punitif.</div>
      <div class="ecopedia-list">${N}</div>
    </section>
    <section class="ecopedia-section">
      <h3>Before / After Snapshot</h3>
      <div class="ecopedia-list">${U}</div>
    </section>
    <section class="ecopedia-section">
      <h3>Jurnal Ekologi</h3>
      <div style="font-size:11px;color:var(--muted);margin-bottom:8px">Lokal di perangkat ini. Maks. 50 catatan, menampilkan 8 terbaru.</div>
      <div class="ecopedia-list">${X}</div>
    </section>
    <section class="ecopedia-section">
      <h3>Lencana Ekologi</h3>
      <div style="font-size:11px;color:var(--muted);margin-bottom:8px">${Y}/${T.length} diraih. Lencana hanya indikator lokal; tidak memberi reward, poin, atau hukuman.</div>
      <div class="ecopedia-list">${Z}</div>
    </section>
    <section class="ecopedia-section">
      <h3>Kesiapan Offline</h3>
      <div style="font-size:11px;color:var(--muted);margin-bottom:8px">Snapshot kondisi browser saat kompendium dibuka. Bukan bukti QA perangkat nyata.</div>
      <div class="ecopedia-list">${_}</div>
    </section>
    <section class="ecopedia-section">
      <h3>Cuaca &amp; Dampak</h3>
      <div class="ecopedia-list">
        <div class="ecopedia-item">
          <div class="ecopedia-kv"><strong>${s(l.currentLabel)}</strong><span>${l.intensityPercent}% · ${l.remainingTicks} tick</span></div>
          <div style="font-size:11px">${s(l.effects.join(" · ")||"Tidak ada efek khusus.")}</div>
          ${l.caution?`<div style="font-size:11px;color:var(--warn)">${s(l.caution)}</div>`:""}
        </div>
        <div class="ecopedia-item">
          <strong>Kecenderungan cuaca berikutnya</strong>
          <div style="font-size:11px;color:var(--muted);margin:4px 0">Persentase dihitung dari kondisi lingkungan saat ini, bukan jaminan RNG.</div>
          ${h}
        </div>
      </div>
    </section>`}export{ha as renderEcopediaHtml};
