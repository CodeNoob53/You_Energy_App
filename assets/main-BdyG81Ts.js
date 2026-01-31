import{i as E,a as Y}from"./vendor-CK1Rzdhu.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();const w=()=>{const e=document.querySelector("dialog[open]");return e?e.id?`#${e.id}`:e.className?`dialog.${e.className.split(" ")[0]}`:"dialog[open]":""},L={position:"topRight",timeout:5e3},h={success(e){E.success({...L,title:"Success",message:e,target:w()})},error(e){E.error({...L,title:"Error",message:e,target:w()})},warning(e){E.warning({...L,title:"Warning",message:e,target:w()})},info(e){E.info({...L,title:"Info",message:e,target:w()})}},K="https://your-energy.b.goit.study/api",f=Y.create({baseURL:K}),P={400:"Bad request. Please check your input.",401:"Unauthorized. Please log in.",404:"Resource not found.",409:"This email has already been used.",500:"Server error. Please try again later.",default:"Something went wrong. Please try again."};f.interceptors.response.use(e=>e,e=>{var i;if(!e.response){const o=!navigator.onLine?"No internet connection. Please check your network.":"Unable to connect to server. Please try again later.";return h.error(o),Promise.reject(e)}const t=e.response.status,a=((i=e.response.data)==null?void 0:i.message)||P[t]||P.default;return h.error(a),Promise.reject(e)});const X=async()=>{const{data:e}=await f.get("/quote");return e},Z=async({filter:e,page:t=1,limit:n=12})=>{const{data:a}=await f.get("/filters",{params:{filter:e,page:t,limit:n}});return a},ee=async({bodypart:e,muscles:t,equipment:n,keyword:a,page:i=1,limit:r=10})=>{const o={page:i,limit:r};e&&(o.bodypart=e),t&&(o.muscles=t),n&&(o.equipment=n),a&&(o.keyword=a);const{data:c}=await f.get("/exercises",{params:o});return c},A=async e=>{const{data:t}=await f.get(`/exercises/${e}`);return t},D=async(e,t,n,a="")=>{const i={rate:t,email:n};a&&(i.review=a);const{data:r}=await f.patch(`/exercises/${e}/rating`,i);return r},te=async e=>{const{data:t}=await f.post("/subscription",{email:e});return t},ne=`<li class="exercise-card {{cardClass}}" data-id="{{id}}">
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
`,ae=`<li class="category-card" data-filter="{{filter}}" data-name="{{name}}">
  <img src="{{imgURL}}" alt="" class="category-card-bg">
  <div class="category-card-overlay"></div>
  <div class="category-card-content">
    <h3 class="category-name">
      <a href="#" class="category-link">{{name}}</a>
    </h3>
    <p class="category-filter">{{filter}}</p>
  </div>
</li>
`,ie=`<div class="favorites-empty">
  <p class="favorites-empty-text">
    It appears that you haven't added any exercises to your favorites yet. To get started, you can
    add exercises that you like to your favorites for easier access in the future.
  </p>
</div>
`,re=`<ul class="pagination-list">
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
`,se={"exercise-card":ne,"category-card":ae,"favorites-empty":ie,pagination:re},O={...se},v=async e=>O[e]?O[e]:(console.warn(`Template not found in bundle: ${e}`),""),C=(e,t)=>e.replace(/\{\{(\w+)\}\}/g,(n,a)=>t[a]!==void 0?t[a]:""),oe=e=>{const t=document.getElementById("quote-text"),n=document.getElementById("quote-author");t&&e.quote&&(t.textContent=e.quote),n&&e.author&&(n.textContent=e.author)},ce=async(e,t)=>{const n=document.getElementById(t);if(!n)return;if(e.length===0){n.innerHTML='<p class="no-results">No exercises found. Try another filter.</p>';return}const a=await v("exercise-card"),i=e.map(r=>C(a,{id:r._id,rating:r.rating||0,ratingFormatted:r.rating?r.rating.toFixed(1):"0.0",cardClass:"",name:r.name,burnedCalories:r.burnedCalories||0,time:r.time||0,bodyPart:r.bodyPart||"N/A",target:r.target||"N/A"})).join("");n.className="exercises-grid",n.innerHTML=i},le=async(e,t)=>{const n=document.getElementById(t);if(!n)return;if(e.length===0){n.innerHTML='<p class="no-results">No categories found.</p>';return}const a=await v("category-card"),i=e.map(r=>C(a,{filter:r.filter,name:r.name,imgURL:r.imgURL||""})).join("");n.className="categories-grid",n.innerHTML=i},z=(e,t,n=9)=>{const a=document.getElementById(t);if(!a)return;let i="";e==="categories"?(i=Array(n).fill('<li class="category-skeleton skeleton-shimmer"></li>').join(""),a.className="categories-grid",a.innerHTML=i):(i=Array(n).fill(`
      <li class="exercise-skeleton">
        <div class="shimmer-header">
           <div class="shimmer-badge skeleton-shimmer"></div>
           <div class="shimmer-badge skeleton-shimmer"></div>
        </div>
        <div class="shimmer-title skeleton-shimmer"></div>
        <div class="shimmer-line skeleton-shimmer"></div>
        <div class="shimmer-line skeleton-shimmer"></div>
      </li>
    `).join(""),a.className="exercises-grid",a.innerHTML=i)},x=async(e,t,n="pagination-container")=>{const a=document.getElementById(n);if(!a)return;if(t<=1){a.innerHTML="";return}if(!a.querySelector(".pagination-list")){const u=await v("pagination");a.innerHTML=u}const i=a.querySelector(".pagination-first"),r=a.querySelector(".pagination-prev"),o=a.querySelector(".pagination-next"),c=a.querySelector(".pagination-last"),d=a.querySelector(".pagination-numbers");B(i,e===1,1),B(r,e===1,e-1),B(o,e===t,e+1),B(c,e===t,t);const l=de(e,t).map(u=>u==="..."?'<li aria-hidden="true"><span class="pagination-dots">...</span></li>':u===e?`<li><a href="#" class="pagination-number current" aria-current="page">${u}</a></li>`:`<li><a href="#" class="pagination-number" data-page="${u}">${u}</a></li>`).join("");d.innerHTML=l};function B(e,t,n){t?(e.classList.add("disabled"),e.setAttribute("aria-disabled","true"),e.removeAttribute("data-page")):(e.classList.remove("disabled"),e.removeAttribute("aria-disabled"),e.dataset.page=n)}function de(e,t){const n=[];if(t<=3){for(let r=1;r<=t;r++)n.push(r);return n}let a,i;e===1?(a=1,i=3):e===t?(a=t-2,i=t):(a=e-1,i=e+1),a>1&&n.push("...");for(let r=a;r<=i;r++)n.push(r);return i<t&&n.push("..."),n}function U(e,t="pagination-container"){const n=document.getElementById(t);n&&n.dataset.listenerAttached!=="true"&&(n.dataset.listenerAttached="true",n.addEventListener("click",a=>{const i=a.target.closest(".pagination-number, .pagination-btn");if(!i||i.classList.contains("disabled")||i.classList.contains("current"))return;a.preventDefault();const r=Number(i.dataset.page);r&&!isNaN(r)&&e(r)}))}function ue(e="exercises-header"){var n;const t=document.getElementById(e);t?t.scrollIntoView({behavior:"smooth"}):(n=document.querySelector(".exercises-section"))==null||n.scrollIntoView({behavior:"smooth"})}const N=e=>{const t=document.getElementById(e);t&&(t.showModal(),t.dataset.backdropListener!=="true"&&(t.addEventListener("click",n=>{const a=t.getBoundingClientRect();a.top<=n.clientY&&n.clientY<=a.top+a.height&&a.left<=n.clientX&&n.clientX<=a.left+a.width||t.close()}),t.dataset.backdropListener="true"))},y=e=>{const t=document.getElementById(e);t&&t.close()},j=e=>{if(!e)return;const t=document.getElementById("modal-exercise-gif");t&&(t.src=e.gifUrl||"",t.alt=e.name||"Exercise");const n=document.getElementById("modal-exercise-title");n&&(n.textContent=e.name||"Exercise");const a=document.getElementById("modal-exercise-rating");if(a){const u=e.rating||0,H=Math.floor(u);a.innerHTML=`
      <span class="rating-value">${u.toFixed(1)}</span>
      <div class="rating-stars">
        ${Array.from({length:5},(_e,J)=>`<svg class="star ${J<H?"filled":""}" width="18" height="18" aria-hidden="true">
            <use href="#icon-star"></use>
          </svg>`).join("")}
      </div>
    `}const i=document.getElementById("modal-target");i&&(i.textContent=e.target||"N/A");const r=document.getElementById("modal-bodypart");r&&(r.textContent=e.bodyPart||"N/A");const o=document.getElementById("modal-equipment");o&&(o.textContent=e.equipment||"N/A");const c=document.getElementById("modal-popular");c&&(c.textContent=e.popularity||"0");const d=document.getElementById("modal-calories");d&&(d.textContent=`${e.burnedCalories||0}/${e.time||0} min`);const p=document.getElementById("modal-description");p&&(p.textContent=e.description||"No description available.");const l=document.getElementById("exercise-modal");l&&(l.dataset.exerciseId=e._id)},V=()=>{y("exercise-modal");const e=document.getElementById("rating-modal");e&&e.dataset.closeListener!=="true"&&(e.addEventListener("close",$),e.dataset.closeListener="true"),N("rating-modal"),$(),me()},I=()=>{y("rating-modal")},$=()=>{const e=document.getElementById("rating-form"),t=document.getElementById("rating-display-value");e&&e.reset(),t&&(t.textContent="0.0")},me=()=>{const e=document.getElementById("rating-stars"),t=document.getElementById("rating-display-value");e&&e.dataset.listenerAttached!=="true"&&(e.dataset.listenerAttached="true",e.addEventListener("change",n=>{if(n.target.type==="radio"){const a=parseFloat(n.target.value);t&&(t.textContent=a.toFixed(1))}}))},W=()=>{const e=document.querySelector('#rating-stars input[name="rating"]:checked');return e?parseFloat(e.value):0},S="quote-of-the-day";function Q(){return new Date().toISOString().split("T")[0]}function ge(){try{const e=localStorage.getItem(S);if(!e)return null;const{quote:t,author:n,date:a}=JSON.parse(e),i=Q();return a===i?{quote:t,author:n}:(localStorage.removeItem(S),null)}catch(e){return console.error("Error reading cached quote:",e),null}}function fe(e,t){try{const n={quote:e,author:t,date:Q()};localStorage.setItem(S,JSON.stringify(n))}catch(n){console.error("Error caching quote:",n)}}async function G(){try{let e=ge();e||(e=await X(),fe(e.quote,e.author)),oe(e)}catch(e){console.error("Failed to initialize quote:",e)}}const q="favoriteExercises";function k(){try{const e=localStorage.getItem(q);return e?JSON.parse(e):[]}catch(e){return console.error("Failed to get favorites:",e),[]}}function pe(e){try{const t=k();return t.some(n=>n._id===e._id)?!1:(t.push(e),localStorage.setItem(q,JSON.stringify(t)),!0)}catch(t){return console.error("Failed to add favorite:",t),!1}}function R(e){try{const n=k().filter(a=>a._id!==e);return localStorage.setItem(q,JSON.stringify(n)),!0}catch(t){return console.error("Failed to remove favorite:",t),!1}}function _(e){return k().some(n=>n._id===e)}const m={page:1,perPage:8};function T(){const e=window.innerWidth;return e>=1440?1/0:e>=768?10:8}function he(){return window.innerWidth<1440}async function ye(){const e=document.getElementById("favorites-container");if(!e)return;const t=await v("favorites-empty");e.innerHTML=t}async function b(){const e=document.getElementById("favorites-container");if(!e)return;const t=k();if(t.length===0){await ye(),x(1,1,"favorites-pagination");return}const n=T(),a=he(),i=a?Math.ceil(t.length/n):1;m.page>i&&(m.page=i);const r=a?(m.page-1)*n:0,o=a?r+n:t.length,c=t.slice(r,o),d=await v("exercise-card"),p=c.map(l=>C(d,{id:l._id,name:l.name,burnedCalories:l.burnedCalories||0,time:l.time||0,bodyPart:l.bodyPart||"N/A",target:l.target||"N/A",rating:l.rating||0,ratingFormatted:l.rating?l.rating.toFixed(1):"0.0",cardClass:"is-favorite"})).join("");e.className="favorites-grid",e.innerHTML=p,a&&x(m.page,i,"favorites-pagination")}function ve(e){const t=document.getElementById("modal-close-btn");t&&(t.onclick=()=>y("exercise-modal"));const n=document.getElementById("give-rating-btn");n&&(n.onclick=()=>{V(),be(e)});const a=document.getElementById("add-to-favorites-btn");a&&(a.innerHTML=`
      <span class="btn-text">Remove from favorites</span>
      <svg width="20" height="20" aria-hidden="true">
        <use href="#icon-trash"></use>
      </svg>
    `,a.onclick=async()=>{R(e),y("exercise-modal"),await b()})}function be(e){const t=document.getElementById("rating-modal-close-btn");t&&(t.onclick=()=>I());const n=document.getElementById("rating-form");n&&(n.onsubmit=async a=>{var c;if(a.preventDefault(),!n.checkValidity()){n.reportValidity();return}const i=W(),r=n.email.value.trim(),o=((c=n.review)==null?void 0:c.value.trim())||"";try{await D(e,i,r,o),I(),h.success("Rating submitted successfully!")}catch(d){console.error("Failed to submit rating:",d)}})}function Ee(e){e&&e!==m.page&&(m.page=e,b())}function we(){let e,t=T();window.addEventListener("resize",()=>{clearTimeout(e),e=setTimeout(()=>{const n=T();n!==t&&(t=n,m.page=1,b())},300)})}async function Le(){const e=document.querySelector(".favorites-page");try{await G(),await b(),Be(),U(Ee,"favorites-pagination"),we()}catch(t){console.error("Error initializing favorites page:",t)}finally{e&&e.classList.add("loaded")}}function Be(){const e=document.getElementById("favorites-container");e&&e.dataset.listenerAttached!=="true"&&(e.dataset.listenerAttached="true",e.addEventListener("click",async t=>{const n=t.target.closest(".favorite-delete-btn");if(n){t.stopPropagation();const i=n.dataset.id;if(i){R(i);try{await b()}catch(r){console.error("Failed to render favorites:",r)}}return}const a=t.target.closest(".exercise-start-btn");if(a){t.stopPropagation();const i=a.dataset.id;if(!i)return;try{const r=await A(i);j(r),N("exercise-modal"),ve(i)}catch(r){console.error("Failed to fetch exercise details:",r)}}}))}const s={view:"categories",filter:"Muscles",category:null,categoryFilter:null,keyword:"",page:1},F=()=>{const e=window.innerWidth;return s.view==="categories"?e<768?9:12:e<768?8:10};async function xe(){const e=document.querySelector(".main-content"),t=F();z(s.view,"exercises-container",t);try{await G(),await g()}catch(n){console.error("Error initializing home page:",n)}finally{e&&e.classList.add("loaded")}ke(),Me(),U(Fe),Ie()}function Ie(){let e,t=F();window.addEventListener("resize",()=>{clearTimeout(e),e=setTimeout(()=>{const n=F();n!==t&&(t=n,s.page=1,g())},300)})}async function g(){const e=document.getElementById("exercises-container");try{const t=F();if(z(s.view,"exercises-container",t),s.view==="categories"){const n=await Z({filter:s.filter,page:s.page,limit:t});le(n.results,"exercises-container"),x(n.page?Number(n.page):1,n.totalPages||1)}else{const n={limit:t,page:s.page};s.categoryFilter==="Muscles"?n.muscles=s.category.toLowerCase():s.categoryFilter==="Body parts"?n.bodypart=s.category.toLowerCase():s.categoryFilter==="Equipment"&&(n.equipment=s.category.toLowerCase()),s.keyword&&(n.keyword=s.keyword);const a=await ee(n);ce(a.results,"exercises-container"),x(a.page?Number(a.page):1,a.totalPages||1)}}catch(t){console.error("Fetch error:",t),e&&(e.innerHTML='<p class="error-message">Failed to load data. Please try again.</p>')}}function Fe(e){e&&e!==s.page&&(s.page=e,g(),ue())}function ke(){const e=document.getElementById("filter-tabs");e&&e.dataset.listenerAttached!=="true"&&(e.dataset.listenerAttached="true",e.addEventListener("click",async t=>{const n=t.target.closest(".filter-tab");if(n){document.querySelectorAll(".filter-tab").forEach(a=>{a.classList.remove("active"),a.setAttribute("aria-selected","false")}),n.classList.add("active"),n.setAttribute("aria-selected","true"),s.filter=n.dataset.filter,s.view="categories",s.page=1,s.keyword="",s.category=null,Te();try{await g()}catch(a){console.error("Failed to fetch data:",a)}}}))}function Me(){const e=document.getElementById("exercises-container");e&&e.dataset.listenerAttached!=="true"&&(e.dataset.listenerAttached="true",e.addEventListener("click",async t=>{const n=t.target.closest(".category-card");if(n){t.preventDefault();const i=n.dataset.name,r=n.dataset.filter;if(!i)return;s.view="exercises",s.category=i,s.categoryFilter=r,s.page=1,s.keyword="",Se(i),Ae();try{await g()}catch(o){console.error("Failed to fetch exercises:",o)}return}const a=t.target.closest(".exercise-start-btn");if(a){const i=a.dataset.id;if(!i)return;try{const r=await A(i);j(r),N("exercise-modal"),Ce(i)}catch(r){console.error(`Failed to fetch exercise details for ${i}:`,r)}}}))}function Se(e){const t=document.getElementById("section-title"),n=document.getElementById("exercise-search-form");t&&(t.innerHTML=`Exercises / <span class="category-name">${e}</span>`),n&&n.classList.remove("hidden")}function Te(){const e=document.getElementById("section-title"),t=document.getElementById("exercise-search-form"),n=document.getElementById("exercise-search-input"),a=document.getElementById("exercise-clear-btn");e&&(e.textContent="Exercises"),t&&t.classList.add("hidden"),n&&(n.value=""),a&&a.classList.add("hidden")}function Ae(){const e=document.getElementById("exercise-search-form"),t=document.getElementById("exercise-search-input"),n=document.getElementById("exercise-clear-btn");!e||!t||e.dataset.listenerAttached!=="true"&&(e.dataset.listenerAttached="true",t.addEventListener("input",()=>{t.value.trim()?n.classList.remove("hidden"):n.classList.add("hidden")}),n.addEventListener("click",async()=>{t.value="",n.classList.add("hidden"),t.focus(),s.keyword="",s.page=1;try{await g()}catch(a){console.error("Failed to fetch exercises:",a)}}),e.addEventListener("submit",async a=>{a.preventDefault();const i=t.value.trim();s.keyword=i,s.page=1;try{await g()}catch(r){console.error("Failed to search exercises:",r)}}))}function Ce(e){const t=document.getElementById("modal-close-btn");t&&(t.onclick=()=>y("exercise-modal"));const n=document.getElementById("give-rating-btn");n&&(n.onclick=()=>{V(),Ne(e)});const a=document.getElementById("add-to-favorites-btn");if(a){const i=()=>{_(e)?a.innerHTML=`
          <span class="btn-text">Remove from favorites</span>
          <svg width="20" height="20" aria-hidden="true">
            <use href="#icon-trash"></use>
          </svg>
        `:a.innerHTML=`
          <span class="btn-text">Add to favorites</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M10 3.5C10 3.5 6.5 1 3.5 3.5C0.5 6 2 10 10 16.5C18 10 19.5 6 16.5 3.5C13.5 1 10 3.5 10 3.5Z" stroke="currentColor" stroke-width="1.5"/>
          </svg>
        `};a.onclick=async()=>{if(_(e))R(e);else{const r=await A(e);pe(r)}i()},i()}}function Ne(e){const t=document.getElementById("rating-modal-close-btn");t&&(t.onclick=()=>I());const n=document.getElementById("rating-form");n&&(n.onsubmit=async a=>{var c;if(a.preventDefault(),!n.checkValidity()){n.reportValidity();return}const i=W(),r=n.email.value.trim(),o=((c=n.review)==null?void 0:c.value.trim())||"";try{await D(e,i,r,o),I(),h.success("Rating submitted successfully!")}catch(d){console.error("Failed to submit rating:",d)}})}function qe(){const e=document.getElementById("burger-btn"),t=document.getElementById("mobile-menu"),n=document.getElementById("mobile-close-btn");if(!e||!t||!n)return;e.addEventListener("click",Re),n.addEventListener("click",M),t.addEventListener("click",i=>{i.target===t&&M()}),t.querySelectorAll(".mobile-nav-link").forEach(i=>{i.addEventListener("click",()=>{M()})}),t.addEventListener("close",()=>{e.setAttribute("aria-expanded","false"),document.body.style.overflow=""})}function Re(){const e=document.getElementById("mobile-menu"),t=document.getElementById("burger-btn");e&&(e.showModal(),document.body.style.overflow="hidden"),t&&t.setAttribute("aria-expanded","true")}function M(){const e=document.getElementById("mobile-menu");e&&e.close()}function He(){const e=window.location.pathname;document.querySelectorAll(".nav-link, .mobile-nav-link").forEach(n=>{const a=n.getAttribute("href");e.endsWith(a.replace("./","/"))||e.endsWith("/")&&a.includes("index.html")||e.endsWith("/index.html")&&a.includes("index.html")||e.includes("favorites")&&a.includes("favorites")?(n.setAttribute("aria-current","page"),n.classList.add("active")):(n.removeAttribute("aria-current"),n.classList.remove("active"))})}document.addEventListener("DOMContentLoaded",()=>{qe(),He()});function Pe(){const e=window.location.pathname,t=document.getElementById("nav-home"),n=document.getElementById("nav-favorites");e.includes("favorites")?n==null||n.classList.add("active"):t==null||t.classList.add("active")}function Oe(){const e=document.querySelector(".header");if(!e)return;const t=()=>window.innerWidth<768,n=()=>{t()&&window.scrollY>0?e.classList.add("scrolled"):e.classList.remove("scrolled")};window.addEventListener("scroll",n,{passive:!0}),window.addEventListener("resize",n,{passive:!0}),n()}function $e(){const e=document.getElementById("subscription-form");e&&e.addEventListener("submit",async t=>{t.preventDefault();const n=e.email.value;try{await te(n),h.success("Successfully subscribed!"),e.reset()}catch{}})}document.addEventListener("DOMContentLoaded",()=>{Pe(),$e(),Oe(),document.getElementById("exercises-container")&&xe(),document.getElementById("favorites-container")&&Le()});
//# sourceMappingURL=main-BdyG81Ts.js.map
