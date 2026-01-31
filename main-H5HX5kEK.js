import{i as w,a as te}from"./vendor-CK1Rzdhu.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(i){if(i.ep)return;i.ep=!0;const a=n(i);fetch(i.href,a)}})();const ne="modulepreload",re=function(e){return"/You_Energy_App/"+e},_={},ie=function(t,n,r){let i=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),c=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));i=Promise.allSettled(n.map(l=>{if(l=re(l),l in _)return;_[l]=!0;const u=l.endsWith(".css"),m=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${m}`))return;const d=document.createElement("link");if(d.rel=u?"stylesheet":ne,u||(d.as="script"),d.crossOrigin="",d.href=l,c&&d.setAttribute("nonce",c),document.head.appendChild(d),u)return new Promise((b,O)=>{d.addEventListener("load",b),d.addEventListener("error",()=>O(new Error(`Unable to preload CSS for ${l}`)))})}))}function a(s){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=s,window.dispatchEvent(c),!c.defaultPrevented)throw s}return i.then(s=>{for(const c of s||[])c.status==="rejected"&&a(c.reason);return t().catch(a)})},x=()=>{const e=document.querySelector("dialog[open]");return e?e.id?`#${e.id}`:e.className?`dialog.${e.className.split(" ")[0]}`:"dialog[open]":""},L={position:"topRight",timeout:5e3},v={success(e){w.success({...L,title:"Success",message:e,target:x()})},error(e){w.error({...L,title:"Error",message:e,target:x()})},warning(e){w.warning({...L,title:"Warning",message:e,target:x()})},info(e){w.info({...L,title:"Info",message:e,target:x()})}},ae="https://your-energy.b.goit.study/api",p=te.create({baseURL:ae}),$={400:"Bad request. Please check your input.",401:"Unauthorized. Please log in.",404:"Resource not found.",409:"This email has already been used.",500:"Server error. Please try again later.",default:"Something went wrong. Please try again."};p.interceptors.response.use(e=>e,e=>{var i;if(!e.response){const s=!navigator.onLine?"No internet connection. Please check your network.":"Unable to connect to server. Please try again later.";return v.error(s),Promise.reject(e)}const t=e.response.status,r=((i=e.response.data)==null?void 0:i.message)||$[t]||$.default;return v.error(r),Promise.reject(e)});const se=async()=>{const{data:e}=await p.get("/quote");return e},oe=async({filter:e,page:t=1,limit:n=12})=>{const{data:r}=await p.get("/filters",{params:{filter:e,page:t,limit:n}});return r},ce=async({bodypart:e,muscles:t,equipment:n,keyword:r,page:i=1,limit:a=10})=>{const s={page:i,limit:a};e&&(s.bodypart=e),t&&(s.muscles=t),n&&(s.equipment=n),r&&(s.keyword=r);const{data:c}=await p.get("/exercises",{params:s});return c},q=async e=>{const{data:t}=await p.get(`/exercises/${e}`);return t},z=async(e,t,n,r="")=>{const i={rate:t,email:n};r&&(i.review=r);const{data:a}=await p.patch(`/exercises/${e}/rating`,i);return a},le=async e=>{const{data:t}=await p.post("/subscription",{email:e});return t},de=`<li class="exercise-card {{cardClass}}" data-id="{{id}}">
  <div class="exercise-card-header">
    <div class="exercise-card-left">
      <span class="exercise-workout-badge">WORKOUT</span>
      <span class="exercise-rating" aria-label="Rating: {{ratingFormatted}} out of 5">
        {{ratingFormatted}}
        <svg width="18" height="18" class="exercise-rating-star" aria-hidden="true">
          <use href="#icon-star"></use>
        </svg>
      </span>
      <button type="button" class="favorite-delete-btn" data-id="{{id}}" aria-label="Remove {{name}} from favorites">
        <svg width="20" height="20" aria-hidden="true">
          <use href="#icon-trash"></use>
        </svg>
      </button>
    </div>
    <button class="exercise-start-btn" data-id="{{id}}" aria-label="Start exercise {{name}}">
      Start
      <svg width="16" height="16" aria-hidden="true">
        <use href="#icon-arrow"></use>
      </svg>
    </button>
  </div>

  <div class="exercise-card-body">
    <span class="exercise-icon">
      <svg width="16px" height="16px" aria-hidden="true">
        <use href="#icon-quote"></use>
      </svg>
    </span>
    <h3 class="exercise-card-title">{{name}}</h3>
  </div>

  <ul class="exercise-card-meta">
    <li class="meta-item">
      <span class="meta-label">Burned calories:</span>
      <span class="meta-value">{{burnedCalories}} / {{time}} min</span>
    </li>
    <li class="meta-item">
      <span class="meta-label">Body part:</span>
      <span class="meta-value">{{bodyPart}}</span>
    </li>
    <li class="meta-item">
      <span class="meta-label">Target:</span>
      <span class="meta-value">{{target}}</span>
    </li>
  </ul>
</li>
`,ue=`<li class="category-card" data-filter="{{filter}}" data-name="{{name}}">
  <img src="{{imgURL}}" alt="" class="category-card-bg">
  <div class="category-card-overlay"></div>
  <div class="category-card-content">
    <h3 class="category-name">
      <a href="#" class="category-link">{{name}}</a>
    </h3>
    <p class="category-filter">{{filter}}</p>
  </div>
</li>
`,me=`<div class="favorites-empty">
  <p class="favorites-empty-text">
    It appears that you haven't added any exercises to your favorites yet. To get started, you can
    add exercises that you like to your favorites for easier access in the future.
  </p>
</div>
`,ge=`<ul class="pagination-list">
  <li>
    <a href="#" class="pagination-btn pagination-first" data-page="1" aria-label="Go to first page">
      <svg width="13" height="12" class="pagination-icon flip" aria-hidden="true">
        <use href="#icon-double-arrow-right"></use>
      </svg>
    </a>
  </li>
  <li>
    <a href="#" class="pagination-btn pagination-prev" aria-label="Go to previous page">
      <svg width="20" height="20" class="pagination-icon flip" aria-hidden="true">
        <use href="#icon-arrow-right"></use>
      </svg>
    </a>
  </li>
  <li>
    <ul class="pagination-numbers"></ul>
  </li>
  <li>
    <a href="#" class="pagination-btn pagination-next" aria-label="Go to next page">
      <svg width="20" height="20" class="pagination-icon" aria-hidden="true">
        <use href="#icon-arrow-right"></use>
      </svg>
    </a>
  </li>
  <li>
    <a href="#" class="pagination-btn pagination-last" aria-label="Go to last page">
      <svg width="13" height="12" class="pagination-icon" aria-hidden="true">
        <use href="#icon-double-arrow-right"></use>
      </svg>
    </a>
  </li>
</ul>
`,fe={"exercise-card":de,"category-card":ue,"favorites-empty":me,pagination:ge},U={...fe},y=async e=>U[e]?U[e]:(console.warn(`Template not found in bundle: ${e}`),""),S=(e,t)=>e.replace(/\{\{(\w+)\}\}/g,(n,r)=>t[r]!==void 0?t[r]:""),V=e=>{const t=document.getElementById("quote-text"),n=document.getElementById("quote-author");t&&e.quote&&(t.textContent=e.quote),n&&e.author&&(n.textContent=e.author)},W=async(e,t)=>{const n=document.getElementById(t);if(!n)return;if(e.length===0){n.innerHTML='<p class="no-results">No exercises found. Try another filter.</p>';return}const r=await y("exercise-card"),i=e.map(a=>S(r,{id:a._id,rating:a.rating||0,ratingFormatted:a.rating?a.rating.toFixed(1):"0.0",cardClass:"",name:a.name,burnedCalories:a.burnedCalories||0,time:a.time||0,bodyPart:a.bodyPart||"N/A",target:a.target||"N/A"})).join("");n.className="exercises-grid",n.innerHTML=i},Q=async(e,t)=>{const n=document.getElementById(t);if(!n)return;if(e.length===0){n.innerHTML='<p class="no-results">No categories found.</p>';return}const r=await y("category-card"),i=e.map(a=>S(r,{filter:a.filter,name:a.name,imgURL:a.imgURL||""})).join("");n.className="categories-grid",n.innerHTML=i},N=(e,t,n=9)=>{const r=document.getElementById(t);if(!r)return;let i="";e==="categories"?(i=Array(n).fill('<li class="category-skeleton skeleton-shimmer"></li>').join(""),r.className="categories-grid",r.innerHTML=i):(i=Array(n).fill(`
      <li class="exercise-skeleton">
        <div class="shimmer-header">
           <div class="shimmer-badge skeleton-shimmer"></div>
           <div class="shimmer-badge skeleton-shimmer"></div>
        </div>
        <div class="shimmer-title skeleton-shimmer"></div>
        <div class="shimmer-line skeleton-shimmer"></div>
        <div class="shimmer-line skeleton-shimmer"></div>
      </li>
    `).join(""),r.className="exercises-grid",r.innerHTML=i)},pe=()=>{const e=document.getElementById("modal-exercise-gif"),t=document.getElementById("modal-exercise-title"),n=document.getElementById("modal-exercise-rating"),r=document.getElementById("modal-target"),i=document.getElementById("modal-bodypart"),a=document.getElementById("modal-equipment"),s=document.getElementById("modal-popular"),c=document.getElementById("modal-calories"),l=document.getElementById("modal-description");e&&(e.src="data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%3E%3C/svg%3E"),t&&(t.textContent="Loading..."),n&&(n.innerHTML='<div class="skeleton-shimmer" style="width: 100px; height: 20px; border-radius: 4px;"></div>');const u='<span class="skeleton-shimmer" style="display: inline-block; width: 60px; height: 14px; border-radius: 2px;"></span>';r&&(r.innerHTML=u),i&&(i.innerHTML=u),a&&(a.innerHTML=u),s&&(s.innerHTML=u),c&&(c.innerHTML=u),l&&(l.innerHTML=`
      <div class="skeleton-shimmer" style="width: 100%; height: 14px; border-radius: 2px; margin-bottom: 8px;"></div>
      <div class="skeleton-shimmer" style="width: 90%; height: 14px; border-radius: 2px; margin-bottom: 8px;"></div>
      <div class="skeleton-shimmer" style="width: 40%; height: 14px; border-radius: 2px;"></div>
    `)},he=Object.freeze(Object.defineProperty({__proto__:null,loadTemplate:y,renderCategories:Q,renderExerciseSkeleton:pe,renderExercises:W,renderQuote:V,renderSkeleton:N,replacePlaceholders:S},Symbol.toStringTag,{value:"Module"})),I=async(e,t,n="pagination-container")=>{const r=document.getElementById(n);if(!r)return;if(t<=1){r.innerHTML="";return}if(!r.querySelector(".pagination-list")){const d=await y("pagination");r.innerHTML=d}const i=r.querySelector(".pagination-first"),a=r.querySelector(".pagination-prev"),s=r.querySelector(".pagination-next"),c=r.querySelector(".pagination-last"),l=r.querySelector(".pagination-numbers");B(i,e===1,1),B(a,e===1,e-1),B(s,e===t,e+1),B(c,e===t,t);const m=ye(e,t).map(d=>d==="..."?'<li aria-hidden="true"><span class="pagination-dots">...</span></li>':d===e?`<li><a href="#" class="pagination-number current" aria-current="page">${d}</a></li>`:`<li><a href="#" class="pagination-number" data-page="${d}">${d}</a></li>`).join("");l.innerHTML=m};function B(e,t,n){t?(e.classList.add("disabled"),e.setAttribute("aria-disabled","true"),e.removeAttribute("data-page")):(e.classList.remove("disabled"),e.removeAttribute("aria-disabled"),e.dataset.page=n)}function ye(e,t){const n=[];if(t<=3){for(let a=1;a<=t;a++)n.push(a);return n}let r,i;e===1?(r=1,i=3):e===t?(r=t-2,i=t):(r=e-1,i=e+1),r>1&&n.push("...");for(let a=r;a<=i;a++)n.push(a);return i<t&&n.push("..."),n}function G(e,t="pagination-container"){const n=document.getElementById(t);n&&n.dataset.listenerAttached!=="true"&&(n.dataset.listenerAttached="true",n.addEventListener("click",r=>{const i=r.target.closest(".pagination-number, .pagination-btn");if(!i||i.classList.contains("disabled")||i.classList.contains("current"))return;r.preventDefault();const a=Number(i.dataset.page);a&&!isNaN(a)&&e(a)}))}function ve(e="exercises-header"){var n;const t=document.getElementById(e);t?t.scrollIntoView({behavior:"smooth"}):(n=document.querySelector(".exercises-section"))==null||n.scrollIntoView({behavior:"smooth"})}const R=e=>{const t=document.getElementById(e);t&&(t.showModal(),t.dataset.backdropListener!=="true"&&(t.addEventListener("click",n=>{n.target===t&&t.close()}),t.dataset.backdropListener="true"))},h=e=>{const t=document.getElementById(e);t&&t.close()},J=e=>{if(!e)return;const t=document.getElementById("modal-exercise-gif");t&&(t.src=e.gifUrl||"",t.alt=e.name||"Exercise");const n=document.getElementById("modal-exercise-title");n&&(n.textContent=e.name||"Exercise");const r=document.getElementById("modal-exercise-rating");if(r){const d=e.rating||0,b=Math.floor(d);r.innerHTML=`
      <span class="rating-value">${d.toFixed(1)}</span>
      <div class="rating-stars">
        ${Array.from({length:5},(O,ee)=>`<svg class="star ${ee<b?"filled":""}" width="18" height="18" aria-hidden="true">
            <use href="#icon-star"></use>
          </svg>`).join("")}
      </div>
    `}const i=document.getElementById("modal-target");i&&(i.textContent=e.target||"N/A");const a=document.getElementById("modal-bodypart");a&&(a.textContent=e.bodyPart||"N/A");const s=document.getElementById("modal-equipment");s&&(s.textContent=e.equipment||"N/A");const c=document.getElementById("modal-popular");c&&(c.textContent=e.popularity||"0");const l=document.getElementById("modal-calories");l&&(l.textContent=`${e.burnedCalories||0}/${e.time||0} min`);const u=document.getElementById("modal-description");u&&(u.textContent=e.description||"No description available.");const m=document.getElementById("exercise-modal");m&&(m.dataset.exerciseId=e._id)},K=()=>{h("exercise-modal");const e=document.getElementById("rating-modal");e&&e.dataset.closeListener!=="true"&&(e.addEventListener("close",j),e.dataset.closeListener="true"),R("rating-modal"),j(),Ee()},k=()=>{h("rating-modal")},j=()=>{const e=document.getElementById("rating-form"),t=document.getElementById("rating-display-value");e&&e.reset(),t&&(t.textContent="0.0")},Ee=()=>{const e=document.getElementById("rating-stars"),t=document.getElementById("rating-display-value");e&&e.dataset.listenerAttached!=="true"&&(e.dataset.listenerAttached="true",e.addEventListener("change",n=>{if(n.target.type==="radio"){const r=parseFloat(n.target.value);t&&(t.textContent=r.toFixed(1))}}))},Y=()=>{const e=document.querySelector('#rating-stars input[name="rating"]:checked');return e?parseFloat(e.value):0},C="quote-of-the-day";function Z(){return new Date().toISOString().split("T")[0]}function be(){try{const e=localStorage.getItem(C);if(!e)return null;const{quote:t,author:n,date:r}=JSON.parse(e),i=Z();return r===i?{quote:t,author:n}:(localStorage.removeItem(C),null)}catch(e){return console.error("Error reading cached quote:",e),null}}function we(e,t){try{const n={quote:e,author:t,date:Z()};localStorage.setItem(C,JSON.stringify(n))}catch(n){console.error("Error caching quote:",n)}}async function X(){try{let e=be();e||(e=await se(),we(e.quote,e.author)),V(e)}catch(e){console.error("Failed to initialize quote:",e)}}const P="favoriteExercises";function M(){try{const e=localStorage.getItem(P);return e?JSON.parse(e):[]}catch(e){return console.error("Failed to get favorites:",e),[]}}function xe(e){try{const t=M();return t.some(n=>n._id===e._id)?!1:(t.push(e),localStorage.setItem(P,JSON.stringify(t)),!0)}catch(t){return console.error("Failed to add favorite:",t),!1}}function H(e){try{const n=M().filter(r=>r._id!==e);return localStorage.setItem(P,JSON.stringify(n)),!0}catch(t){return console.error("Failed to remove favorite:",t),!1}}function D(e){return M().some(n=>n._id===e)}const g={page:1,perPage:8};function A(){const e=window.innerWidth;return e>=1440?1/0:e>=768?10:8}function Le(){return window.innerWidth<1440}async function Be(){const e=document.getElementById("favorites-container");if(!e)return;const t=await y("favorites-empty");e.innerHTML=t}async function E(){const e=document.getElementById("favorites-container");if(!e)return;const t=M();if(t.length===0){await Be(),I(1,1,"favorites-pagination");return}const n=A(),r=Le(),i=r?Math.ceil(t.length/n):1;g.page>i&&(g.page=i);const a=r?(g.page-1)*n:0,s=r?a+n:t.length,c=t.slice(a,s),l=await y("exercise-card"),u=c.map(m=>S(l,{id:m._id,name:m.name,burnedCalories:m.burnedCalories||0,time:m.time||0,bodyPart:m.bodyPart||"N/A",target:m.target||"N/A",rating:m.rating||0,ratingFormatted:m.rating?m.rating.toFixed(1):"0.0",cardClass:"is-favorite"})).join("");e.className="favorites-grid",e.innerHTML=u,r&&I(g.page,i,"favorites-pagination")}function Ie(e){const t=document.getElementById("modal-close-btn");t&&(t.onclick=()=>h("exercise-modal"));const n=document.getElementById("give-rating-btn");n&&(n.onclick=()=>{K(),ke(e)});const r=document.getElementById("add-to-favorites-btn");r&&(r.innerHTML=`
      <span class="btn-text">Remove from favorites</span>
      <svg width="20" height="20" aria-hidden="true">
        <use href="#icon-trash"></use>
      </svg>
    `,r.onclick=async()=>{H(e),h("exercise-modal"),await E()})}function ke(e){const t=document.getElementById("rating-modal-close-btn");t&&(t.onclick=()=>k());const n=document.getElementById("rating-form");n&&(n.onsubmit=async r=>{var c;if(r.preventDefault(),!n.checkValidity()){n.reportValidity();return}const i=Y(),a=n.email.value.trim(),s=((c=n.review)==null?void 0:c.value.trim())||"";try{await z(e,i,a,s),k(),v.success("Rating submitted successfully!")}catch(l){console.error("Failed to submit rating:",l)}})}function Te(e){e&&e!==g.page&&(g.page=e,E())}function Se(){let e,t=A();window.addEventListener("resize",()=>{clearTimeout(e),e=setTimeout(()=>{const n=A();n!==t&&(t=n,g.page=1,E())},300)})}async function Me(){const e=document.querySelector(".favorites-page");try{await X(),await E(),Fe(),G(Te,"favorites-pagination"),Se()}catch(t){console.error("Error initializing favorites page:",t)}finally{e&&e.classList.add("loaded")}}function Fe(){const e=document.getElementById("favorites-container");e&&e.dataset.listenerAttached!=="true"&&(e.dataset.listenerAttached="true",e.addEventListener("click",async t=>{const n=t.target.closest(".favorite-delete-btn");if(n){t.stopPropagation();const i=n.dataset.id;if(i){H(i);try{await E()}catch(a){console.error("Failed to render favorites:",a)}}return}const r=t.target.closest(".exercise-start-btn");if(r){t.stopPropagation();const i=r.dataset.id;if(!i)return;try{const a=await q(i);J(a),R("exercise-modal"),Ie(i)}catch(a){console.error("Failed to fetch exercise details:",a)}}}))}const o={view:"categories",filter:"Muscles",category:null,categoryFilter:null,keyword:"",page:1},T=()=>{const e=window.innerWidth;return o.view==="categories"?e<768?9:12:e<768?8:10};async function Ce(){const e=document.querySelector(".main-content"),t=T();N(o.view,"exercises-container",t);try{await X(),await f()}catch(n){console.error("Error initializing home page:",n)}finally{e&&e.classList.add("loaded")}Ne(),Re(),G(qe),Ae()}function Ae(){let e,t=T();window.addEventListener("resize",()=>{clearTimeout(e),e=setTimeout(()=>{const n=T();n!==t&&(t=n,o.page=1,f())},300)})}async function f(){const e=document.getElementById("exercises-container");try{const t=T();if(N(o.view,"exercises-container",t),o.view==="categories"){const n=await oe({filter:o.filter,page:o.page,limit:t});Q(n.results,"exercises-container"),I(n.page?Number(n.page):1,n.totalPages||1)}else{const n={limit:t,page:o.page};o.categoryFilter==="Muscles"?n.muscles=o.category.toLowerCase():o.categoryFilter==="Body parts"?n.bodypart=o.category.toLowerCase():o.categoryFilter==="Equipment"&&(n.equipment=o.category.toLowerCase()),o.keyword&&(n.keyword=o.keyword);const r=await ce(n);W(r.results,"exercises-container"),I(r.page?Number(r.page):1,r.totalPages||1)}}catch(t){console.error("Fetch error:",t),e&&(e.innerHTML='<p class="error-message">Failed to load data. Please try again.</p>')}}function qe(e){e&&e!==o.page&&(o.page=e,f(),ve())}function Ne(){const e=document.getElementById("filter-tabs");e&&e.dataset.listenerAttached!=="true"&&(e.dataset.listenerAttached="true",e.addEventListener("click",async t=>{const n=t.target.closest(".filter-tab");if(n){document.querySelectorAll(".filter-tab").forEach(r=>{r.classList.remove("active")}),n.classList.add("active"),o.filter=n.dataset.filter,o.view="categories",o.page=1,o.keyword="",o.category=null,He();try{await f()}catch(r){console.error("Failed to fetch data:",r)}}}))}function Re(){const e=document.getElementById("exercises-container");e&&e.dataset.listenerAttached!=="true"&&(e.dataset.listenerAttached="true",e.addEventListener("click",async t=>{const n=t.target.closest(".category-card");if(n){t.preventDefault();const i=n.dataset.name,a=n.dataset.filter;if(!i)return;o.view="exercises",o.category=i,o.categoryFilter=a,o.page=1,o.keyword="",Pe(i),Oe();try{await f()}catch(s){console.error("Failed to fetch exercises:",s)}return}const r=t.target.closest(".exercise-start-btn");if(r){const i=r.dataset.id;if(!i)return;R("exercise-modal"),ie(()=>Promise.resolve().then(()=>he),void 0).then(a=>a.renderExerciseSkeleton());try{const a=await q(i);J(a),_e(i)}catch(a){console.error(`Failed to fetch exercise details for ${i}:`,a),h("exercise-modal")}}}))}function Pe(e){const t=document.getElementById("section-title"),n=document.getElementById("exercise-search-form");t&&(t.innerHTML=`Exercises / <span class="category-name">${e}</span>`),n&&n.classList.remove("hidden")}function He(){const e=document.getElementById("section-title"),t=document.getElementById("exercise-search-form"),n=document.getElementById("exercise-search-input"),r=document.getElementById("exercise-clear-btn");e&&(e.textContent="Exercises"),t&&t.classList.add("hidden"),n&&(n.value=""),r&&r.classList.add("hidden")}function Oe(){const e=document.getElementById("exercise-search-form"),t=document.getElementById("exercise-search-input"),n=document.getElementById("exercise-clear-btn");!e||!t||e.dataset.listenerAttached!=="true"&&(e.dataset.listenerAttached="true",t.addEventListener("input",()=>{t.value.trim()?n.classList.remove("hidden"):n.classList.add("hidden")}),n.addEventListener("click",async()=>{t.value="",n.classList.add("hidden"),t.focus(),o.keyword="",o.page=1;try{await f()}catch(r){console.error("Failed to fetch exercises:",r)}}),e.addEventListener("submit",async r=>{r.preventDefault();const i=t.value.trim();o.keyword=i,o.page=1;try{await f()}catch(a){console.error("Failed to search exercises:",a)}}))}function _e(e){const t=document.getElementById("modal-close-btn");t&&(t.onclick=()=>h("exercise-modal"));const n=document.getElementById("give-rating-btn");n&&(n.onclick=()=>{K(),$e(e)});const r=document.getElementById("add-to-favorites-btn");if(r){const i=()=>{D(e)?r.innerHTML=`
          <span class="btn-text">Remove from favorites</span>
          <svg width="20" height="20" aria-hidden="true">
            <use href="#icon-trash"></use>
          </svg>
        `:r.innerHTML=`
          <span class="btn-text">Add to favorites</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M10 3.5C10 3.5 6.5 1 3.5 3.5C0.5 6 2 10 10 16.5C18 10 19.5 6 16.5 3.5C13.5 1 10 3.5 10 3.5Z" stroke="currentColor" stroke-width="1.5"/>
          </svg>
        `};r.onclick=async()=>{if(D(e))H(e);else{const a=await q(e);xe(a)}i()},i()}}function $e(e){const t=document.getElementById("rating-modal-close-btn");t&&(t.onclick=()=>k());const n=document.getElementById("rating-form");n&&(n.onsubmit=async r=>{var c;if(r.preventDefault(),!n.checkValidity()){n.reportValidity();return}const i=Y(),a=n.email.value.trim(),s=((c=n.review)==null?void 0:c.value.trim())||"";try{await z(e,i,a,s),k(),v.success("Rating submitted successfully!")}catch(l){console.error("Failed to submit rating:",l)}})}function Ue(){const e=document.getElementById("burger-btn"),t=document.getElementById("mobile-menu"),n=document.getElementById("mobile-close-btn");if(!e||!t||!n)return;e.addEventListener("click",je),n.addEventListener("click",F),t.addEventListener("click",i=>{i.target===t&&F()}),t.querySelectorAll(".mobile-nav-link").forEach(i=>{i.addEventListener("click",()=>{F()})}),t.addEventListener("close",()=>{e.setAttribute("aria-expanded","false"),document.body.style.overflow=""})}function je(){const e=document.getElementById("mobile-menu"),t=document.getElementById("burger-btn");e&&(e.showModal(),document.body.style.overflow="hidden"),t&&t.setAttribute("aria-expanded","true")}function F(){const e=document.getElementById("mobile-menu");e&&e.close()}function De(){const e=window.location.pathname;document.querySelectorAll(".nav-link, .mobile-nav-link").forEach(n=>{const r=n.getAttribute("href");e.endsWith(r.replace("./","/"))||e.endsWith("/")&&r.includes("index.html")||e.endsWith("/index.html")&&r.includes("index.html")||e.includes("favorites")&&r.includes("favorites")?(n.setAttribute("aria-current","page"),n.classList.add("active")):(n.removeAttribute("aria-current"),n.classList.remove("active"))})}document.addEventListener("DOMContentLoaded",()=>{Ue(),De()});function ze(){const e=window.location.pathname,t=document.getElementById("nav-home"),n=document.getElementById("nav-favorites");e.includes("favorites")?n==null||n.classList.add("active"):t==null||t.classList.add("active")}function Ve(){const e=document.querySelector(".header");if(!e)return;const t=()=>window.innerWidth<768,n=()=>{t()&&window.scrollY>0?e.classList.add("scrolled"):e.classList.remove("scrolled")};window.addEventListener("scroll",n,{passive:!0}),window.addEventListener("resize",n,{passive:!0}),n()}function We(){const e=document.getElementById("subscription-form");e&&e.addEventListener("submit",async t=>{t.preventDefault();const n=e.email.value;try{await le(n),v.success("Successfully subscribed!"),e.reset()}catch{}})}document.addEventListener("DOMContentLoaded",()=>{ze(),We(),Ve(),document.getElementById("exercises-container")&&Ce(),document.getElementById("favorites-container")&&Me()});
//# sourceMappingURL=main-H5HX5kEK.js.map
